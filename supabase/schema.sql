-- =============================================================================
-- Kivora MVP — Supabase PostgreSQL Schema & Security Policies (RLS)
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES (Extends auth.users)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to create profile upon signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 2. ENROLLMENTS
-- -----------------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text not null,
  level text default 'beginner' not null,
  enrolled_at timestamptz default now() not null,
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Users can manage own enrollments"
  on public.enrollments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 3. DIAGNOSTIC ATTEMPTS
-- -----------------------------------------------------------------------------
create table if not exists public.diagnostic_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text not null,
  score integer not null check (score >= 0 and score <= 100),
  level text not null,
  correct_count integer not null,
  total_count integer not null,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz default now() not null
);

alter table public.diagnostic_attempts enable row level security;

create policy "Users can manage own diagnostic attempts"
  on public.diagnostic_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 4. LESSON COMPLETIONS
-- -----------------------------------------------------------------------------
create table if not exists public.lesson_completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text not null,
  lesson_id text not null,
  score integer check (score >= 0 and score <= 100),
  correct boolean default true,
  completed_at timestamptz default now() not null,
  unique (user_id, course_id, lesson_id)
);

alter table public.lesson_completions enable row level security;

create policy "Users can manage own lesson completions"
  on public.lesson_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. LEARNING PLANS
-- -----------------------------------------------------------------------------
create table if not exists public.learning_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text not null,
  level text not null,
  weekly_minutes integer default 60 not null,
  total_weeks integer not null,
  plan_data jsonb not null,
  is_ai_generated boolean default false not null,
  created_at timestamptz default now() not null,
  unique (user_id, course_id)
);

alter table public.learning_plans enable row level security;

create policy "Users can manage own learning plans"
  on public.learning_plans for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 6. AI TUTOR CONVERSATIONS & MESSAGES
-- -----------------------------------------------------------------------------
create table if not exists public.tutor_conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text not null,
  lesson_id text,
  created_at timestamptz default now() not null
);

alter table public.tutor_conversations enable row level security;

create policy "Users can view own conversations"
  on public.tutor_conversations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.tutor_messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.tutor_conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now() not null
);

alter table public.tutor_messages enable row level security;

create policy "Users can view and add messages to own conversations"
  on public.tutor_messages for all
  using (
    exists (
      select 1 from public.tutor_conversations
      where id = conversation_id and user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.tutor_conversations
      where id = conversation_id and user_id = auth.uid()
    )
  );
