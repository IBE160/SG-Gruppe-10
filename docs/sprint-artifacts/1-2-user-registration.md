# Story 1.2: User Registration

Status: ready-for-review

## Story

As a new user,
I want to be able to register for an account using my email and a password,
So that I can access the application.

## Acceptance Criteria

1. Given a user is on the registration page,
2. When they enter a valid email and password, and click "Register",
3. Then a new user account is created.
4. And the user is logged in.
5. And they are redirected to the main dashboard.
6. And an error message is shown if the email is already in use.
7. And password strength requirements are enforced.

## Tasks / Subtasks

- [x] **Set up Supabase Project and Integration (AC: 1)**
  - [x] Create Supabase project and obtain API credentials [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#System-Architecture-Alignment]
  - [x] Install `@supabase/supabase-js` (already in dependencies)
  - [x] Create `.env.local` with Supabase URL and anon key [Source: docs/fase-3-solutioning/architecture.md#Env-Var-Management]
  - [x] Create `.env.example` template file
  - [x] Initialize Supabase client in `lib/supabase/client.ts` and `lib/supabase/server.ts` [Source: docs/fase-3-solutioning/architecture.md#Project-Structure]
  - [x] **Testing:** Verify Supabase client initialization succeeds

- [x] **Create Registration Page UI (AC: 1, 2)**
  - [x] Create `app/(auth)/signup/page.tsx` with registration form [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#Services-and-Modules]
  - [x] Add email and password input fields using shadcn/ui components
  - [x] Implement client-side validation for email format and password strength (min 8 chars, 1 uppercase, 1 number) [Source: docs/fase-2-plan/epics.md#Story-1.2]
  - [x] Add "Register" submit button
  - [x] Style form with Tailwind CSS following UX design [Source: docs/fase-2-ux/ux-design-specification.md]
  - [ ] **Testing:** Verify form renders and validation works

- [x] **Implement Registration Server Action (AC: 3, 6, 7)**
  - [x] Create Server Action in `lib/supabase/auth.ts` for user registration [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#System-Architecture-Alignment]
  - [x] Use Supabase Auth `signUp()` method with email/password
  - [x] Handle successful registration → auto-login user
  - [x] Handle error cases: email already exists, weak password, network errors
  - [x] Return appropriate error messages for client display
  - [ ] **Testing:** Test registration with valid and invalid inputs

- [x] **Implement Post-Registration Flow (AC: 4, 5)**
  - [x] Configure Server Action to redirect to `/dashboard` after successful registration [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#Services-and-Modules]
  - [x] Create basic `app/(dashboard)/page.tsx` placeholder page
  - [x] Create `app/(dashboard)/layout.tsx` for authenticated routes
  - [ ] Implement auth state check and redirect logic
  - [ ] **Testing:** Verify redirect works after successful registration

- [ ] **Add Error Handling and User Feedback (AC: 6, 7)**
  - [ ] Display inline error messages for validation failures
  - [ ] Show toast notifications for server-side errors using shadcn/ui toast component
  - [ ] Add loading state during registration submission
  - [ ] Ensure password strength requirements are communicated clearly in UI
  - [ ] **Testing:** Verify all error scenarios show appropriate messages

## Dev Notes

### Requirements Context Summary

**Epic 1: Foundation & User Authentication**
This story implements user registration, the first critical feature enabling users to create accounts and access the FitTrack application.

**Story 1.2: User Registration**
Allows new users to sign up with email/password authentication using Supabase Auth, with client-side validation and appropriate error handling.

### Architectural Considerations

**Authentication Strategy (from Tech Spec):**
- Supabase Auth manages user identity and sessions
- `lib/supabase/client.ts` for client-side auth operations
- `lib/supabase/server.ts` for Server Actions and server-side auth
- Automatic session management via Supabase client

**Route Structure (from Architecture):**
- `app/(auth)/signup/page.tsx` - Registration page (public route)
- `app/(dashboard)/page.tsx` - Protected dashboard (requires auth)
- Route groups keep authentication and dashboard sections organized

**Data Flow (from Tech Spec):**
- Registration form → Server Action → Supabase Auth API
- Success: User record created in `users` table (managed by Supabase)
- Auto-login: Session cookie set automatically
- Redirect: Client-side navigation to dashboard

**UI Components (from UX Design):**
- Use shadcn/ui form components (Input, Button, Label)
- Follow established color theme and spacing
- Implement accessible form patterns (ARIA labels, error announcements)

**Environment Variables (from Architecture):**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- Store in `.env.local` (excluded from git)
- Provide `.env.example` template

### Previous Story Learnings (from Story 1.1)

**Files Created in Story 1.1:**
- `app/` directory structure with layout.tsx and page.tsx
- `package.json` with Next.js, React, TypeScript, Tailwind, ESLint, Prettier
- `.prettierrc` for code formatting
- `eslint.config.mjs` for linting
- `tsconfig.json` with @/* import aliases

**Patterns Established:**
- Use @/* import aliases for internal imports
- Strict TypeScript enforcement
- ESLint + Prettier for code quality
- pnpm as package manager

**Technical Debt from Story 1.1:**
- Additional directories (components/, lib/, hooks/, types/) created on-demand
- .env.example should be added (noted in review) - **IMPLEMENT IN THIS STORY**

**Review Findings from Story 1.1:**
- L-2: Missing .env.example - **Address in this story when adding Supabase config**

### Project Structure Alignment

**New Directories to Create:**
- `lib/supabase/` - Supabase client initialization and auth functions
- `app/(auth)/` - Authentication route group (signup, login pages)
- `app/(dashboard)/` - Protected dashboard route group
- `components/ui/` - shadcn/ui components (form, input, button, toast)

**Files to Create:**
- `.env.local` - Supabase environment variables (gitignored)
- `.env.example` - Template for environment variables
- `lib/supabase/client.ts` - Client-side Supabase client
- `lib/supabase/server.ts` - Server-side Supabase client
- `lib/supabase/auth.ts` - Server Actions for authentication
- `app/(auth)/signup/page.tsx` - Registration page
- `app/(dashboard)/page.tsx` - Dashboard placeholder
- `app/(dashboard)/layout.tsx` - Dashboard layout
- `components/auth/RegistrationForm.tsx` - Registration form component (optional)

**Naming Conventions (from Architecture):**
- kebab-case for routes and non-component files
- PascalCase for React components
- Use TypeScript for all files

### Testing Strategy

**Unit Tests:**
- Validation functions for email and password strength
- Error message formatting utilities

**Integration Tests:**
- Registration form submission and validation
- Server Action success and error paths
- Component rendering with various states

**Manual Testing:**
- End-to-end registration flow
- Error scenarios (duplicate email, weak password)
- Redirect to dashboard after successful registration

**Target:** 80% code coverage (from Architecture)

### References

- [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#System-Architecture-Alignment]
- [Source: docs/fase-3-solutioning/architecture.md#Project-Structure]
- [Source: docs/fase-3-solutioning/architecture.md#Env-Var-Management]
- [Source: docs/fase-2-plan/epics.md#Story-1.2:-User-Registration]
- [Source: docs/fase-2-ux/ux-design-specification.md]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-2-user-registration.context.xml

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-30:** Initial draft generated for Story 1.2: User Registration
