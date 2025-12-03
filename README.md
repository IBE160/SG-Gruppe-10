# FitTrack

Personal fitness tracking app for logging workouts, managing goals, and tracking progress.

**🚀 Live Demo:** [https://ibe160-fittrack.vercel.app/signup](https://ibe160-fittrack.vercel.app/signup)

**📊 Status:** MVP Complete + Polished (16/16 stories, 4/4 epics) | Zero technical debt | Live on Vercel

## Tech Stack

Next.js 16 (App Router) · TypeScript 5 · Supabase (PostgreSQL + Auth) · TanStack Query v5 · shadcn/ui · Tailwind CSS v4 · React Hook Form + Zod

## Features

**✅ Authentication:** Email/password signup & login, protected routes, session management  
**✅ Workouts:** Create, view, edit, delete workouts with type, duration, date, and notes  
**✅ Goals:** Create and view fitness goals with progress tracking  
**✅ UX Polish:** Mobile-first navigation, Green & Graphite theme, Material Icons, WCAG AA compliant  

**📋 Planned (Epic 5):** AI-powered natural language input, smart workout suggestions, progress insights

## Quick Start

```bash
# Clone and install
git clone https://github.com/IBE160/SG-Gruppe-10.git
cd SG-Gruppe-10
pnpm install

# Configure environment (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run migrations in Supabase SQL Editor (supabase/migrations/*.sql)

# Start dev server
pnpm dev  # http://localhost:3000
```

**Requirements:** Node.js ≥18.17.0, pnpm, Supabase account (free tier)

## Scripts

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint

## Project Structure

```
app/              # Next.js pages (auth, dashboard, workouts, goals)
components/       # React components (ui, auth, workouts, goals, layout)
hooks/            # Custom hooks (useWorkouts, useGoals)
lib/              # Supabase client, types, utilities
docs/             # PRD, architecture, sprint artifacts, retrospectives
supabase/         # Database migrations
```

## Documentation

- **Planning:** `docs/fase-2-plan/` (PRD, epics, UX specs)
- **Architecture:** `docs/fase-3-solutioning/architecture.md`
- **Sprint Status:** `docs/sprint-artifacts/sprint-status.yaml`
- **Retrospectives:** `docs/sprint-artifacts/epic-*-retro-*.md`

---

**Course:** IBE160 - HiMolde | **Team:** SG-Gruppe-10 | **Updated:** Dec 3, 2025
