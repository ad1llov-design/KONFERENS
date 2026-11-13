# Kivora — Personal Gamified Learning Platform (MVP)

> **Status:** Working MVP for IT Conference Demonstration  
> **Brand:** Kivora (temporary working brand name)  
> **Target Audience:** International students, independent learners, junior specialists

---

## 🌟 Overview

Kivora is an educational platform designed around an interactive, gamified learning path:
1. **Choose a goal & track:** Python Fundamentals or English A1–A2.
2. **Diagnostic test:** 8 targeted questions that deterministically assess current level (Beginner, Elementary, Pre-Intermediate).
3. **Structured Personal Study Plan:** Generated based on level and study time (AI-assisted with deterministic fallback).
4. **Learning Path & Interactive Lessons:** Step-by-step stages with concise reading, practice exercises (multiple-choice, code output, fill-in-the-blank, translation), instant explanations, hints, and progress tracking.
5. **AI Tutor:** Server-side LLM tutor with course/lesson context that guides and provides hints without giving away answers immediately.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5 (Strict mode)
- **Styling:** Tailwind CSS v4 + Centralised CSS Custom Properties (`--bg`, `--accent`, `--glass-bg`)
- **Icons:** Lucide React
- **Auth & Storage:** Supabase (PostgreSQL, Auth, RLS policies) with seamless local Demo Mode fallback
- **AI Integration:** OpenAI API (`gpt-4o-mini`, server-side only) with clearly labelled Demo AI fallback

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally (Demo Mode — zero setup required)
The platform is designed to run immediately without external credentials:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- In **Demo Mode**, authentication and progress are stored safely in `localStorage`.
- The AI Tutor provides realistic pre-written demo responses clearly marked with a `Demo AI` badge.

### 3. Build & Typecheck
```bash
npm run build
npm run lint
```

---

## 🔑 Environment Variables & Production Setup

To enable real Supabase Authentication and live OpenAI responses, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your keys:
```ini
# Supabase (Auth & Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI (AI Tutor & Structured Plans - SERVER ONLY)
OPENAI_API_KEY=sk-...
```

### Supabase Database Setup
Run the SQL migration in `supabase/schema.sql` inside the Supabase SQL Editor. It creates all tables and Row Level Security (RLS) policies ensuring users can only read and write their own data.

---

## 🎭 Conference Live Demo Script (Step-by-Step)

1. **Landing Page (`/`):**
   - Show value proposition, design tokens (calm palette, warm background `#F5F4F0`, glass panels).
   - Point out the preview learning path widget.
2. **Catalog (`/courses`):**
   - View available tracks: **Python Fundamentals** (8h) and **English A1–A2** (10h), plus upcoming tracks.
3. **Course Overview (`/courses/python-fundamentals`):**
   - Review 3 stages and 9 structured lessons.
4. **Diagnostic (`/courses/python-fundamentals/diagnostic`):**
   - Click "Start Diagnostic".
   - Answer the 8 questions.
   - Review deterministic score calculation, assigned level badge, and personalized study plan.
5. **Interactive Lesson (`/courses/python-fundamentals/learn/py-s1-l1`):**
   - Switch between **Reading** and **Exercise** tabs.
   - Try an incorrect answer → see explanation & "Try again".
   - Try the correct answer → green feedback, progress recorded.
   - Click "Next lesson" to advance along the path.
6. **AI Tutor (`/tutor?course=python-fundamentals&lesson=py-s1-l1`):**
   - Open AI Tutor from the lesson link.
   - Notice context badges (Course + Current Lesson).
   - Ask a question (e.g. *"Can variable names start with a number?"*).
   - See clear pedagogical explanation with demo indicator when keys are absent.
7. **Dashboard (`/dashboard`):**
   - View enrolled courses with live percentage calculation derived from completed lessons.

---

## 📋 Readiness Criteria Verification

- [x] **Clear Landing Page:** Explains value proposition without fake statistics or unverified claims.
- [x] **Goal & Track Selection:** User can select Python Fundamentals or English A1–A2.
- [x] **Auth & Demo Mode:** Local demo session + Supabase Auth integration with explicit status banner.
- [x] **Deterministic Diagnostic:** Predictable scoring algorithm assigning Beginner / Elementary / Pre-Intermediate.
- [x] **Structured Learning Plan:** AI-generated or verified curriculum schedule with week-by-week goals.
- [x] **Complete Demo Course:** Python Fundamentals (3 stages, 9 lessons with exercises) and English A1–A2 (3 stages, 9 lessons).
- [x] **Actionable Lessons & Feedback:** Exercises with explanations, hints, and retry capabilities.
- [x] **Real Progress Calculation:** Progress percentage strictly calculated from completed lesson IDs.
- [x] **Secure AI Tutor:** Server-side route handler with token bounds, input sanitization, and honest Demo AI badge when unconfigured.
- [x] **Responsive & Accessible Design:** Works on mobile and desktop, accessible contrast, no non-functional dummy buttons.
- [x] **Zero Build / Lint Errors:** Verified with `next build` and `eslint`.
