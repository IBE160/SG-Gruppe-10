# FitTrack

A personal fitness tracking application built as part of the IBE160 course at HiMolde. FitTrack helps users log workouts, track progress, and manage fitness goals.

**Live Demo:** [https://ibe160-fittrack.vercel.app/signup](https://ibe160-fittrack.vercel.app/signup)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Database & Auth:** [Supabase](https://supabase.com)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Styling:** Tailwind CSS v4
- **Forms:** React Hook Form + Zod
- **Date Handling:** date-fns
- **Package Manager:** pnpm

## Features

### ✅ Implemented (Epic 1 & 2)

- **User Authentication**
  - Sign up with email/password
  - Login/logout functionality
  - Protected routes with middleware
  - Session management via Supabase Auth

- **Workout Management**
  - Create workouts (date, type, duration, notes)
  - View workout history in reverse chronological order
  - Responsive workout cards with formatted dates
  - Empty and loading states

### 🚧 In Progress (Epic 2)

- View workout details
- Update/edit workouts
- Delete workouts

### 📋 Planned (Epic 3)

- Goal creation and tracking
- Progress visualization

## Prerequisites

- **Node.js:** >= 18.17.0
- **pnpm:** Latest version
- **Supabase Account:** Free tier sufficient

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
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
│   └── actions/           # Server Actions
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── workouts/         # Workout-specific components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configs
│   ├── supabase/        # Supabase client and queries
│   └── types/           # TypeScript type definitions
├── docs/                 # Project documentation
│   ├── fase-2-plan/     # PRD and Epic breakdown
│   └── sprint-artifacts/ # Story files and tech specs
└── supabase/            # Database migrations and config
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Run production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Documentation

- **PRD:** `docs/fase-2-plan/PRD.md`
- **Epic Breakdown:** `docs/fase-2-plan/epics.md`
- **Sprint Artifacts:** `docs/sprint-artifacts/`
- **Architecture:** `docs/fase-3-solutioning/architecture.md`

## Deployment

The application is deployed on [Vercel](https://vercel.com):

**Production URL:** [https://ibe160-fittrack.vercel.app/signup](https://ibe160-fittrack.vercel.app/signup)

Vercel automatically deploys from the main branch. Environment variables must be configured in the Vercel project settings.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Course Context

**Course:** IBE160 - HiMolde  
**Project:** FitTrack Personal Fitness Tracker  
**Team:** SG-Gruppe-10
