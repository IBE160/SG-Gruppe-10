# FitTrack

A personal fitness tracking application built as part of the IBE160 course at HiMolde. FitTrack helps users log workouts, track progress, and manage fitness goals.

**Live Demo:** [https://ibe160-fittrack.vercel.app/signup](https://ibe160-fittrack.vercel.app/signup)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** TypeScript 5
- **Database & Auth:** [Supabase](https://supabase.com) (PostgreSQL + Auth)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query) + Server Actions
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Styling:** Tailwind CSS v4 + Lexend font
- **Icons:** Google Material Symbols + Lucide React
- **Forms:** React Hook Form + Zod validation
- **Date Handling:** date-fns v4
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Features

### ✅ Completed

#### Epic 1: Foundation & User Authentication
- User registration with email/password
- Login/logout functionality
- Protected routes with middleware
- Session management via Supabase Auth

#### Epic 2: Core Workout Management
- Create workouts (date, type, duration, notes)
- View workout history in reverse chronological order
- View individual workout details
- Update/edit existing workouts
- Delete workouts with confirmation
- Responsive workout cards with formatted dates
- Empty and loading states

#### Epic 3: Personal Goal Setting
- Create fitness goals with title and target
- View all personal goals
- Goal tracking foundation

### 🚧 In Progress (Epic 4)

#### Epic 4: UX Visual Polish
- **Story 4.1** (Ready for Dev): Navigation & Layout Foundation
  - Mobile-first bottom navigation with 4 tabs
  - Sticky header with back button support
  - Material Icons integration
  - Green & Graphite theme application
- **Stories 4.2-4.5** (Planned): Dashboard polish, auth pages polish, workouts visual polish, goals visual polish

### 📋 Future Enhancements

- Progress visualization and statistics
- Workout templates
- Goal achievement tracking with badges
- Advanced filtering and search

## Prerequisites

- **Node.js:** >= 18.17.0
- **pnpm:** Latest version
- **Supabase Account:** Free tier sufficient

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IBE160/SG-Gruppe-10.git
cd SG-Gruppe-10
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your [Supabase project settings](https://supabase.com/dashboard).

### 4. Set up the database

Run the SQL migrations found in `supabase/migrations/` in your Supabase SQL Editor to create the required tables.

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── goals/        # Goal management pages
│   │   ├── workouts/     # Workout pages (list, details, new, edit)
│   │   └── page.tsx      # Dashboard home
│   └── actions/           # Server Actions for mutations
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── goals/            # Goal-specific components
│   ├── workouts/         # Workout-specific components
│   ├── layout/           # Layout components (nav, header)
│   └── providers/        # Context providers (TanStack Query)
├── hooks/                # Custom React hooks (useWorkouts, useGoals)
├── lib/                  # Utility functions and configs
│   ├── supabase/        # Supabase client and queries
│   ├── types/           # TypeScript type definitions
│   └── utils.ts         # Helper functions
├── docs/                 # Project documentation
│   ├── fase-1-analysis/ # Analysis phase outputs
│   ├── fase-2-plan/     # PRD and Epic breakdown
│   ├── fase-2-ux/       # UX design specifications
│   ├── fase-3-solutioning/ # Architecture documents
│   └── sprint-artifacts/ # Story files, tech specs, retrospectives
├── supabase/            # Database migrations and config
│   └── migrations/      # SQL migration files
└── .bmad/               # BMAD workflow configuration
    ├── bmm/             # BMM module (Scrum Master, PM, etc.)
    └── core/            # Core workflows and tasks
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Run production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Documentation

### Planning & Design
- **Product Brief:** `docs/product-brief.md`
- **PRD:** `docs/fase-2-plan/PRD.md`
- **Epic Breakdown:** `docs/fase-2-plan/epics.md`
- **UX Design Specification:** `docs/fase-2-ux/ux-design-specification.md`
- **Architecture:** `docs/fase-3-solutioning/architecture.md`

### Sprint Artifacts
- **Sprint Status:** `docs/sprint-artifacts/sprint-status.yaml`
- **Epic Tech Specs:** 
  - `docs/sprint-artifacts/tech-spec-epic-1.md` (Authentication)
  - `docs/sprint-artifacts/tech-spec-epic-2.md` (Workouts)
  - `docs/sprint-artifacts/tech-spec-epic-4.md` (UX Polish)
- **Story Files:** `docs/sprint-artifacts/*.md`
- **Story Context Files:** `docs/sprint-artifacts/*.context.xml`

### Development Process
- **Project Plan:** `docs/project-plan.md`
- **Workflow Status:** `docs/bmm-workflow-status.yaml`

## Deployment

The application is deployed on [Vercel](https://vercel.com):

**Production URL:** [https://ibe160-fittrack.vercel.app/signup](https://ibe160-fittrack.vercel.app/signup)

Vercel automatically deploys from the main branch. Environment variables must be configured in the Vercel project settings.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Project Progress

**Current Status:** Epic 4 (UX Visual Polish) in progress

- ✅ **Epic 1:** Foundation & User Authentication (4 stories complete)
- ✅ **Epic 2:** Core Workout Management (5 stories complete)
- ✅ **Epic 3:** Personal Goal Setting (2 stories complete)
- 🚧 **Epic 4:** UX Visual Polish (1 story ready-for-dev, 4 stories in backlog)

**Total Stories Completed:** 11 / 16  
**Last Updated:** December 3, 2025

For detailed progress tracking, see `docs/sprint-artifacts/sprint-status.yaml`

## Development Workflow

This project follows the BMAD (Build, Measure, Analyze, Design) methodology:

1. **Planning:** Product Brief → PRD → UX Design → Architecture
2. **Epic Preparation:** Sprint Planning → Epic Tech Context
3. **Story Development:** Story Drafting → Story Context → Development → Code Review
4. **Quality:** Testing → Review → Retrospectives

See `docs/project-plan.md` for the complete workflow checklist.

## Course Context

**Course:** IBE160 - HiMolde  
**Project:** FitTrack Personal Fitness Tracker  
**Team:** SG-Gruppe-10  
**Semester:** Fall 2025
