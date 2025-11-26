# FitTrack Architecture Document

## Executive Summary

FitTrack's architecture is a unified Next.js web application leveraging TypeScript, Tailwind CSS, and shadcn/ui for a modern user experience. It utilizes Supabase for secure authentication and PostgreSQL data persistence, with Next.js Server Actions and TanStack Query managing data flow. Deployed on Vercel, the system is designed for simplicity, efficiency, and scalability, supported by a robust testing strategy and comprehensive error handling.

## Project Initialization

The project will be initialized using the standard `create-next-app` command, establishing a solid and opinionated foundation.

First implementation story should execute:
```bash
npx create-next-app@latest . --typescript --eslint --tailwind --app --import-alias "@/*"
```

This establishes the base architecture with these decisions:
*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Routing:** App Router
*   **Linting:** ESLint
*   **Import Aliases:** `@/*`

## Decision Summary

| Category                      | Decision                                                              | Version             | Affects FR Categories                                | Rationale                                                                                                                                                             |
|-------------------------------|-----------------------------------------------------------------------|---------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Framework                     | Next.js                                                               | 16                  | All FRs, NFRs (Performance, Scalability)             | Modern, efficient, full-stack framework, type-safe with TypeScript.                                                                                                   |
| Backend Strategy              | Unified Next.js (Server Actions)                                      | 16                  | All FRs                                              | Simpler, one codebase, one language (TypeScript), no CORS issues, instant type safety, aligns with "speed" and "efficiency."                                           |
| Language                      | TypeScript                                                            | 5                   | All FRs, NFRs (Maintainability)                      | Enhances code quality, maintainability, and developer experience through static typing.                                                                               |
| Database                      | Supabase (PostgreSQL)                                                 | N/A                 | FR-001, FR-002, FR-003, FR-004                       | Managed PostgreSQL, robust, scalable, integrates with Auth.                                                                                                           |
| Auth                          | Supabase Auth                                                         | N/A                 | FR-001, NFRs (Security)                              | Native integration with Supabase DB, secure, easy to implement.                                                                                                       |
| Styling                       | Tailwind CSS + shadcn/ui                                              | 4.0                 | NFRs (Usability, Maintainability)                    | Rapid UI development, consistent design, mobile-responsive, highly customizable.                                                                                      |
| Data Access Layer             | Supabase JS Client (`@supabase/supabase-js`)                          | 2                   | FR-001, FR-002, FR-003, FR-004                       | Simplicity, tight integration with Supabase, ease of use for MVP.                                                                                                     |
| API Pattern/Data Fetching     | Next.js Server Actions (mutations) + TanStack Query/SWR (fetching)    | 5                   | FR-001, FR-002, FR-003, FR-004, NFRs (Performance)   | Modern Next.js feature for mutations, robust client-side data management, caching, and re-fetching.                                                                   |
| Deployment Target             | Vercel                                                                | N/A                 | All FRs, NFRs (Performance, Scalability, Reliability) | Seamless integration with Next.js, automatic deployments, optimized performance, generous free tier.                                                                  |
| Env Var Management            | Vercel Env Vars (deployment) & `.env.local` (local dev)               | N/A                 | All FRs, NFRs (Security, Maintainability)            | Secure handling of sensitive info, easy management across environments, standard practice.                                                                              |
| Testing Strategy              | Layered (Jest, RTL+Jest, Playwright)                                  | Latest stable       | All FRs, NFRs (Maintainability, Reliability)         | Balance of speed, reliability, and coverage; ensures code quality and meets 80% test coverage goal.                                                                   |
| Error Handling & Logging      | React Error Boundaries, Toasts, HTTP Status/JSON, Sentry, Vercel Logs | 19                  | All FRs, NFRs (Reliability, Usability, Maintainability)| Consistent UX, clear feedback, robust backend error management, professional monitoring.                                                                              |
| Date/Time Management          | `date-fns` (frontend) + UTC/ISO 8601 (backend/DB)                     | 4                   | FR-002, FR-004, NFRs (Usability, Reliability)        | Lightweight, modular, TypeScript support, consistent handling of dates across app, proper timezone management.                                                          |

## Project Structure

```
{{project_root}}/
├── .env.local                         # Local environment variables (NOT committed)
├── .env.example                       # Template for environment variables
├── .eslintrc.json                     # ESLint configuration
├── .gitignore                         # Git ignore rules
├── next.config.mjs                    # Next.js configuration
├── package.json                       # Project dependencies and scripts
├── pnpm-lock.yaml                     # pnpm lock file (or yarn.lock/package-lock.json)
├── postcss.config.js                  # PostCSS configuration for Tailwind
├── README.md                          # Project README
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── jest.config.ts                     # Jest configuration
├── playwright.config.ts               # Playwright configuration
│
├── app/                               # Next.js App Router (routes, layouts, pages, API routes, Server Actions)
│   ├── (auth)/                        # Grouping for authentication-related routes/pages (e.g., login, signup)
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/                   # Grouping for authenticated dashboard routes/pages
│   │   ├── goals/page.tsx
│   │   ├── history/page.tsx
│   │   ├── logging/page.tsx
│   │   └── page.tsx                   # Main dashboard page
│   ├── api/                           # Next.js API Routes (if needed, e.g., webhooks)
│   │   └── health/route.ts
│   ├── layout.tsx                     # Root layout for the application
│   ├── loading.tsx                    # Optional loading UI
│   ├── global-error.tsx               # Global error boundary for the App Router
│   ├── not-found.tsx                  # Custom 404 page
│   └── page.tsx                       # Root page (e.g., landing page)
│
├── components/                        # React components
│   ├── ui/                            # shadcn/ui components (automatically generated/managed)
│   │   ├── button.tsx
│   │   └── ... (other shadcn components)
│   ├── auth/                          # Authentication-related components (e.g., AuthForm)
│   ├── common/                        # Reusable, general-purpose components (e.g., Navbar, Footer)
│   ├── workouts/                      # Components specific to workout features
│   ├── goals/                         # Components specific to goal features
│   └── provider.tsx                   # Client-side providers (e.g., TanStack Query Provider)
│
├── lib/                               # Utility functions, services, and configurations
│   ├── supabase/                      # Supabase client initialization and helper functions
│   │   ├── client.ts                  # Client-side Supabase client
│   │   ├── server.ts                  # Server-side Supabase client (for Server Actions/API Routes)
│   │   └── queries.ts                 # Supabase query functions (e.g., getWorkouts, createGoal)
│   ├── date.ts                        # date-fns related utility functions
│   ├── constants.ts                   # Global constants
│   ├── utils.ts                       # General utility functions
│   └── sentry.ts                      # Sentry client initialization and error reporting setup
│
├── hooks/                             # Custom React hooks
│   └── useWorkouts.ts                 # Example: hook for fetching workouts with TanStack Query
│
├── styles/                            # Global styles and Tailwind directives
│   └── globals.css
│
├── types/                             # TypeScript type definitions
│   ├── supabase.ts                    # Supabase generated types
│   ├── workout.ts
│   ├── goal.ts
│   └── index.d.ts
│
├── public/                            # Static assets (images, fonts, favicons)
│   └── favicon.ico
│
└── tests/                             # Separate directory for E2E tests (Playwright)
    ├── e2e/
    │   ├── auth.spec.ts
    │   └── workouts.spec.ts
    └── unit/                          # Example: For more complex unit tests not co-located with components
        └── lib/utils.test.ts
```

## FR Category to Architecture Mapping

| FR Category        | Architectural Components Involved                                                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **P0 - Core MVP**  | Next.js (Pages, Server Actions), Supabase (Auth, DB), Supabase JS Client, shadcn/ui, TanStack Query, Jest, RTL, Playwright, Sentry, `date-fns`.                            |
| **P1 - Complete MVP**| Next.js (Pages, Server Actions), Supabase (Auth, DB), Supabase JS Client, shadcn/ui, TanStack Query, Jest, RTL, Playwright, Sentry, `date-fns`.                            |
| **P2 - Growth Features**| Next.js, Supabase, TanStack Query, potential for new libraries (e.g., for charting/notifications), Sentry for performance monitoring, Vercel (scalable infrastructure). |
| **P3 - Vision Features**| Next.js, Supabase, Vercel (scalable infrastructure), potentially new integrations (wearables), advanced analytics (AI/ML), third-party services.                         |

## Technology Stack Details

### Core Technologies

*   **Framework:** Next.js (16, App Router)
*   **Language:** TypeScript (5)
*   **UI Library:** React (19)
*   **Database:** Supabase (PostgreSQL, managed service)
*   **Deployment:** Vercel

### Libraries/Tools

*   **Styling:** Tailwind CSS (4.0)
*   **UI Components:** shadcn/ui (latest stable)
*   **Date Management:** `date-fns` (4)
*   **Data Fetching/Caching:** TanStack Query (5)
*   **Unit Testing:** Jest (latest stable)
*   **Integration Testing:** React Testing Library (latest stable)
*   **E2E Testing:** Playwright (latest stable)
*   **Error Monitoring:** Sentry (latest stable)
*   **Code Quality:** ESLint (managed by Next.js starter)
*   **Code Formatting:** Prettier (managed by Next.js starter)

## Integration Points

*   **Supabase Client:** Used in Next.js Server Actions and client components (via TanStack Query) to interact with Supabase Auth and Database. The `lib/supabase` module encapsulates this interaction.
*   **Vercel:** Automated Git-based deployment pipeline, optimized for Next.js features like Server Actions and Server Components.
*   **Sentry:** Integrated into Next.js global error boundaries (client-side via `global-error.tsx`) and Server Actions/API Routes (`lib/sentry.ts`) for comprehensive error monitoring and performance tracking.

## Novel Pattern Designs

No novel architectural patterns are required for the FitTrack project. The application's scope and complexity align well with established design patterns and technologies.

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents and human developers, preventing conflicts and promoting a unified codebase.

#### Naming Conventions

*   **API Routes/Endpoints:** Use `kebab-case` for segments (e.g., `/api/workouts`, `/api/goals/[goal-id]`).
*   **Database Tables:** Use `snake_case` (e.g., `user_workouts`, `goals`). Prefer plural names.
*   **Database Columns:** Use `snake_case` (e.g., `created_at`, `user_id`).
*   **Frontend Components:** Use `PascalCase` (e.g., `WorkoutCard`, `GoalForm`).
*   **Files (Non-Component):** Use `kebab-case` (e.g., `supabase-client.ts`, `date-utils.ts`).
*   **Files (Component):** Use `PascalCase.tsx` (e.g., `WorkoutCard.tsx`).
*   **TypeScript Types/Interfaces:** Use `PascalCase` (e.g., `Workout`, `Goal`).

#### Structure Patterns

*   **Tests:**
    *   Unit and Integration tests (`.test.ts`/`.test.tsx`) should be co-located with the code they test where appropriate (e.g., `components/WorkoutCard.test.tsx`).
    *   End-to-End tests (`.spec.ts`) will reside in a top-level `tests/e2e` directory.
*   **Components:** Organized by feature (e.g., `components/auth`, `components/workouts`, `components/goals`). Generic reusable components in `components/common`. `shadcn/ui` components will be in `components/ui`.
*   **Utilities/Services:** All utility functions, Supabase client initialization, Sentry setup, etc., are grouped in the `lib/` directory.
*   **Hooks:** Custom React hooks reside in the `hooks/` directory.
*   **Types:** Centralized in the `types/` directory.

#### Format Patterns

*   **API Responses:** Standard JSON format with consistent structure. Error responses should follow `{ message: string, code?: string, details?: any }` and use appropriate HTTP status codes.
*   **Date/Time Transmission:** Always use ISO 8601 strings (e.g., `2023-11-26T12:34:56.789Z`) when sending/receiving dates via API or Server Actions.
*   **User-Facing Dates:** Formatted on the frontend using `date-fns` to be locale-aware and user-friendly (e.g., "November 26, 2023", "3 minutes ago").

#### Communication Patterns

*   **Server Actions:** Direct invocation from client components for data mutations and form submissions.
*   **Client-Side Data Fetching:** Utilize TanStack Query hooks (`useQuery`, `useMutation`) for all data fetching and caching needs from Server Actions or API Routes.
*   **Supabase Interaction:** Use the Supabase JS Client for all direct database and authentication interactions.

#### Lifecycle Patterns

*   **Loading States:** Implement visual loading indicators (skeletons, spinners) for asynchronous operations to provide immediate user feedback.
*   **Error Recovery:** Display clear, concise, and actionable error messages to the user. Offer retry mechanisms where applicable.
*   **Form Submission:** Disable submit buttons and show a pending state during form submission to prevent multiple submissions.

#### Location Patterns

*   **API Routes (Next.js):** `app/api/your-route/route.ts`.
*   **Next.js Pages/Layouts:** Directly within the `app/` directory, organized by routes (e.g., `app/(dashboard)/workouts/page.tsx`).
*   **Static Assets:** All static files (images, fonts, favicons) in the `public/` directory.
*   **Configuration Files:** Most configuration files (`next.config.mjs`, `tailwind.config.ts`, `jest.config.ts`, etc.) reside in the project root.

#### Consistency Patterns

*   **Type Safety:** Strictly enforce TypeScript usage across the entire codebase to leverage type checking and enhance code reliability.
*   **Code Style:** Maintain consistent code style and formatting using ESLint and Prettier, configured at the project root.
*   **Code Comments:** Use comments sparingly, focusing on explaining *why* complex logic is implemented, rather than *what* the code does.
*   **Environment Variables:** Use `process.env.VAR_NAME` consistently; manage via Vercel for deployments and `.env.local` for development.

## Data Architecture

*   **Database System:** Supabase (PostgreSQL).
*   **Schema Definition:** The database schema will be defined via `schema.sql` files or through Supabase's dashboard, with migrations handled by Supabase tools if a dedicated ORM is introduced later.
*   **Relationships:** Standard relational database design for entities like `users`, `workouts`, `goals`, `exercises`. Foreign keys will enforce data integrity.
*   **Data Access:** Primarily through the Supabase JS Client, leveraging its API for CRUD operations.
*   **Data Types:** Appropriate PostgreSQL data types will be used (e.g., `TIMESTAMPTZ` for dates, `UUID` for IDs, `TEXT` for notes).

## API Contracts

*   **API Style:** Predominantly Next.js Server Actions for server-side mutations and data retrieval, offering a type-safe RPC-like interface. Traditional Next.js API Routes will be used sparingly for specific needs like webhooks or external integrations.
*   **Authentication:** Handled via Supabase Auth, using JWTs stored securely (typically in HTTP-only cookies) and managed by the Supabase JS Client. All authenticated API calls will require valid tokens.
*   **Request/Response Format:** All requests and responses will be in JSON format.
*   **Error Handling:** Consistent JSON error response format (`{ message: string, code?: string, details?: any }`) with appropriate HTTP status codes.

## Security Architecture

*   **Authentication:** Supabase Auth will manage user registration, login, and session management. JWTs will be used for secure communication.
*   **Authorization:** PostgreSQL Row-Level Security (RLS) enabled in Supabase to ensure users can only access and modify their own data. Policies will be carefully defined.
*   **Data Encryption:** Supabase handles encryption in transit (SSL/TLS for all connections) and at rest (disk encryption).
*   **Environment Variables:** Sensitive API keys and credentials will be managed securely using Vercel Environment Variables in deployment and `.env.local` for development, never committed to version control.
*   **Input Validation:** Robust input validation on both client-side (forms) and server-side (Server Actions/API Routes) using libraries like Zod to prevent malicious data injection.

## Performance Considerations

*   **Next.js Optimizations:** Leverage Next.js Server Components for rendering UI on the server, Server Actions for efficient data mutations, Next.js Image Optimization, and potential Static Site Generation (SSG) for static content to achieve fast page loads and optimal Core Web Vitals.
*   **Vercel CDN:** Global Content Delivery Network provided by Vercel for fast content delivery and low latency worldwide.
*   **TanStack Query Caching:** Client-side data caching and intelligent re-fetching strategies will minimize unnecessary network requests and improve UI responsiveness.
*   **Supabase Performance:** Utilize PostgreSQL indexing, optimize database queries, and leverage Supabase's managed infrastructure for scalable database performance.

## Deployment Architecture

*   **Platform:** Vercel for the Next.js application.
*   **Process:** Automated deployments triggered by Git pushes to the main branch. Vercel automatically builds and deploys the application. Preview deployments will be generated for pull requests.
*   **Database:** Supabase provides the managed PostgreSQL database, hosted separately from the Vercel application. Connections will be secured via environment variables.

## Development Environment

### Prerequisites

*   Node.js (latest LTS version)
*   pnpm (recommended package manager, or npm/yarn)
*   Git (latest version)
*   A Supabase project (with URL and Anon Key)

### Setup Commands

```bash
# 1. Clone the repository
git clone [repository-url]
cd [repository-name]

# 2. Install dependencies
pnpm install # or npm install or yarn install

# 3. Create .env.local file and configure Supabase keys
#    Copy from .env.example and populate with your Supabase project's
#    SUPABASE_URL and SUPABASE_ANON_KEY.
cp .env.example .env.local
# Open .env.local and add/update:
# NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

# 4. Run the development server
pnpm dev # or npm run dev or yarn dev
```

## Architecture Decision Records (ADRs)

Key architectural decisions made for FitTrack:

1.  **Framework:** **Next.js 16** (TypeScript) chosen for its full-stack capabilities, performance optimizations, and developer experience.
2.  **Backend Strategy:** A **unified Next.js application** utilizing **Server Actions** for backend logic, simplifying the stack and leveraging TypeScript end-to-end.
3.  **Language:** **TypeScript 5** adopted across the entire codebase for enhanced type safety, maintainability, and developer tooling.
4.  **Database:** **Supabase (PostgreSQL)** selected for its managed relational database service, scalability, and seamless integration with authentication.
5.  **Authentication:** **Supabase Auth** will handle user registration, login, and session management, integrating natively with the chosen database.
6.  **Styling:** **Tailwind CSS 4.0** combined with **shadcn/ui** for rapid, utility-first styling and a collection of accessible, customizable UI components.
7.  **Data Access Layer:** The official **Supabase JS Client 2 (`@supabase/supabase-js`)** for direct and efficient interaction with the Supabase database and authentication services.
8.  **API Pattern/Data Fetching:** **Next.js Server Actions** for performing data mutations and **TanStack Query 5/SWR** for efficient client-side data fetching and caching.
9.  **Deployment Target:** **Vercel** chosen for its deep integration with Next.js, automatic deployments, performance optimizations, and ease of management.
10. **Environment Variable Management:** **Vercel Environment Variables** for production and preview environments, and local `.env.local` files for development, ensuring security and flexibility.
11. **Testing Strategy:** A **layered approach** combining **Jest** for unit/integration tests (with React Testing Library) and **Playwright** for end-to-end testing of critical user flows, aiming for comprehensive coverage.
12. **Error Handling & Logging:** **React Error Boundaries** and `shadcn/ui` **Toasts** for UI errors, consistent **HTTP Status Codes/JSON responses** for server errors, **Sentry** for real-time error monitoring, and **Vercel's built-in logs** for operational insights.
13. **Date/Time Management:** The **`date-fns` 4 library** for consistent frontend date formatting, with all dates stored in **UTC (`TIMESTAMPTZ`)** in Supabase and transmitted as **ISO 8601 strings**.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-26_
_For: BIP_
