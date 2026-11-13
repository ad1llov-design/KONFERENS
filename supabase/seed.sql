-- =============================================================================
-- Kivora MVP — Seed Data
-- =============================================================================

-- Courses catalog reference table (optional reference cache)
create table if not exists public.courses (
  id text primary key,
  title text not null,
  tagline text not null,
  description text not null,
  level text not null,
  category text not null,
  estimated_hours integer not null,
  created_at timestamptz default now() not null
);

alter table public.courses enable row level security;
create policy "Allow public read-only access to courses"
  on public.courses for select
  using (true);

insert into public.courses (id, title, tagline, description, level, category, estimated_hours)
values
  (
    'python-fundamentals',
    'Python Fundamentals',
    'Write your first real programs.',
    'Start from zero and build a solid foundation in Python. You will understand how programs work, write readable code, and solve small real-world problems — step by step.',
    'Beginner — no experience needed',
    'programming',
    8
  ),
  (
    'english-a1-a2',
    'English A1–A2',
    'From your first words to confident conversations.',
    'Build a practical foundation in English. You will learn everyday vocabulary, essential grammar, and real phrases you can use from day one.',
    'A1 Beginner to A2 Elementary',
    'languages',
    10
  )
on conflict (id) do nothing;
