# Epic Technical Specification: FitTrack Epic 1

Date: 2025-11-29
Author: BIP
Epic ID: epic-1
Status: Draft

---

## Overview

This epic establishes the foundational features of the FitTrack application, as outlined in the Product Requirements Document (PRD). The primary goal is to deliver the core Minimum Viable Product (MVP) that allows users to register, authenticate, and manage their workouts. This aligns with the overall product vision to create a simple, clear, and motivating web application that empowers fitness enthusiasts to easily log their activities, fostering consistent engagement from the outset. This initial implementation will focus exclusively on user account management and the complete lifecycle of workout logging (Create, Read, Update, Delete).

## Objectives and Scope

**In-Scope:**

*   **User Registration and Authentication (FR-001):** Users must be able to create an account and log in securely.
*   **Workout Management (FR-002):** Users must be able to create, view, update, and delete their workouts. Each workout will include details such as date, type, duration, and notes.
*   **Workout History (FR-003):** Users must be able to view a simple, chronological list of their past workouts.

**Out-of-Scope:**

*   **Goal Management (FR-004):** All features related to setting and tracking personal goals are excluded from this epic.
*   **Progress Tracking (FR-005):** The generation of statistics and graphs to show progress over time is out of scope.
*   **Notifications (FR-006):** Goal-oriented reminders and other notifications are not included.
*   All other P2 (Growth) and P3 (Vision) features as defined in the PRD.

## System Architecture Alignment

This epic's implementation will adhere strictly to the defined Next.js-based architecture. Key architectural components to be used are:

*   **Framework:** Next.js with the App Router will be used to structure the application, with distinct route groups for authentication `(auth)` and the main dashboard `(dashboard)`.
*   **Authentication:** Supabase Auth will be implemented for user registration and login, managed via the Supabase JS Client.
*   **Database:** User and workout data will be persisted in the Supabase PostgreSQL database.
*   **Data Flow:**
    *   **Mutations (Create, Update, Delete):** Next.js Server Actions will be used to handle all data modification operations for workouts, providing a secure, server-centric approach.
    *   **Data Fetching (Read):** TanStack Query will be used on the client-side to fetch and manage the state of the workout history list.
*   **UI Components:** The user interface will be built using `shadcn/ui` components, styled with Tailwind CSS, ensuring consistency with the established design system.

## Detailed Design

### Services and Modules

As a unified Next.js application, the project is not broken into microservices but is organized into logical modules within the single codebase. The key modules involved in this epic are:

| Module/Directory | Responsibility | Owner |
| :--- | :--- | :--- |
| `app/(auth)/` | Contains the user-facing pages for Login and Sign Up. | FE Dev |
| `app/(dashboard)/` | Contains the main authenticated application views, including pages for workout logging and history. | FE Dev |
| `components/auth/` | Contains shared components used in the authentication flow (e.g., AuthForm). | FE Dev |
| `components/workouts/`| Contains components specific to creating, viewing, and listing workouts (e.g., WorkoutForm, WorkoutCard). | FE Dev |
| `components/common/`| Contains reusable components like the main navigation and buttons. | FE Dev |
| `lib/supabase/` | Encapsulates all interaction with the Supabase client for both server-side (Server Actions) and client-side operations. | BE Dev |
| `lib/queries/` | Contains the Server Actions and data-fetching functions for workouts. | BE Dev |
| `types/` | Contains TypeScript type definitions for `Workout` and other data structures. | Shared |

### Data Models and Contracts

The following PostgreSQL tables will be created in the Supabase database to support the features in this epic.

### `users` table
This table will be automatically managed by Supabase Auth to store user identity information.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | Unique identifier for the user, provided by Supabase Auth. |
| `email` | `varchar` | Not Null, Unique | User's email address. |
| `created_at`| `timestamptz` | Not Null | Timestamp of user registration. |

### `workouts` table
This table stores all workout logs created by users. Row-Level Security (RLS) will be enabled to ensure users can only access their own data.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | Unique identifier for the workout log. |
| `user_id` | `uuid` | Not Null, Foreign Key to `users.id` | Links the workout to the user who created it. |
| `date` | `timestamptz` | Not Null | The date and time the workout was performed. |
| `type` | `text` | Not Null | The type of workout (e.g., "Running", "Weight Lifting"). |
| `duration` | `integer` | Not Null, Check > 0 | Duration of the workout in minutes. |
| `notes` | `text` | Nullable | Optional user-provided notes about the workout. |
| `created_at`| `timestamptz` | Not Null, Default: `now()` | Timestamp of when the workout log was created. |

### APIs and Interfaces

Interaction between the client and server will be handled primarily through Next.js Server Actions, providing a type-safe interface without the need for traditional REST API endpoints for mutations.

### Server Actions
These functions will be defined in `lib/queries/` and invoked directly from client components.

**`createWorkout(workoutData: Omit<Workout, 'id' | 'user_id' | 'created_at'>): Promise<Workout>`**
*   **Description:** Creates a new workout record for the currently authenticated user.
*   **Parameters:**
    *   `workoutData`: An object containing the `date`, `type`, `duration`, and `notes` for the new workout.
*   **Returns:** The newly created workout object from the database.
*   **Security:** The function must derive the `user_id` from the active server-side session.

**`updateWorkout(workoutId: string, workoutData: Partial<Omit<Workout, 'id' | 'user_id' | 'created_at'>>): Promise<Workout>`**
*   **Description:** Updates an existing workout record.
*   **Parameters:**
    *   `workoutId`: The UUID of the workout to update.
    *   `workoutData`: An object containing the workout fields to be updated.
*   **Returns:** The updated workout object.
*   **Security:** RLS policies on the `workouts` table will ensure a user can only update their own records.

**`deleteWorkout(workoutId: string): Promise<void>`**
*   **Description:** Deletes a workout record.
*   **Parameters:**
    *   `workoutId`: The UUID of the workout to delete.
*   **Security:** RLS policies will prevent users from deleting workouts owned by others.

### Client-Side Data Fetching

**`getWorkouts(): Promise<Workout[]>`**
*   **Description:** A server-side function (callable from the client) to fetch all workout records for the authenticated user.
*   **Usage:** This function will be called by **TanStack Query** on the client to manage caching, re-fetching, and state management of the workout history list. The `useWorkouts` custom hook will abstract this logic.

### Workflows and Sequencing

The primary user flow for this epic is logging a new workout.

1.  **Initiation:** The user, on the main dashboard (`/`), clicks the "Log New Workout" button.
2.  **Navigation:** The user is navigated to the `/logging` page, which renders the `WorkoutForm` component.
3.  **Data Entry:** The user fills in the workout details: `date`, `type`, `duration`, and optional `notes`. Client-side validation provides immediate feedback on required fields.
4.  **Submission:** The user clicks the "Save Workout" button. The form's `onSubmit` handler invokes the `createWorkout` Server Action, passing the form data. The UI enters a loading state to prevent duplicate submissions.
5.  **Server-Side Processing:**
    a. The `createWorkout` Server Action receives the data.
    b. It performs server-side validation on the input.
    c. It retrieves the authenticated user's ID from the session.
    d. It inserts a new record into the `workouts` table in the Supabase database with the provided data and the user's ID.
6.  **Client-Side Update:**
    a. Upon successful completion of the Server Action, the client-side logic is notified.
    b. The TanStack Query cache for the `workouts` query is invalidated.
    c. The user is programmatically redirected to the `/history` page.
7.  **Completion:** The `/history` page automatically re-fetches the updated list of workouts, now including the newly created entry, displaying it to the user.

## Non-Functional Requirements

### Performance

The application must meet the following performance targets as defined in the PRD:

*   **Page Load Time:** Core views (e.g., Dashboard, History) must have a Largest Contentful Paint (LCP) of under 2 seconds. This will be achieved by leveraging Next.js server-side rendering (SSR) and static site generation (SSG) where applicable.
*   **API Response Time:** The `createWorkout` Server Action must complete in under 500ms.
*   **Client-Side Performance:** The UI should remain responsive during data fetching operations. TanStack Query will be used to provide instant feedback via cached data while re-fetching in the background. Vercel's CDN will ensure fast asset delivery to global users.

### Security

Security will be implemented based on the following principles:

*   **Authentication:** User authentication will be managed exclusively by Supabase Auth, which handles secure password storage and session management using JWTs.
*   **Authorization:** All database queries will be subject to PostgreSQL's Row-Level Security (RLS) policies. Policies will be configured in Supabase to ensure a user can only ever access or modify their own workout data.
*   **Data Encryption:** All traffic between the client, Vercel, and Supabase is encrypted in transit (SSL/TLS). Supabase provides encryption at rest for all database contents.
*   **Secret Management:** All sensitive information (API keys, database URLs) will be stored as Vercel Environment Variables in production and in a git-ignored `.env.local` file during local development. No secrets will be hardcoded in the application source.
*   **Input Validation:** All data submitted via Server Actions will be validated on the server-side using a library like Zod to prevent invalid data and protect against injection attacks.

### Reliability/Availability

The application will be engineered for high reliability and data integrity.

*   **Uptime:** The application targets a 99.5% uptime, supported by Vercel's and Supabase's infrastructure.
*   **Data Integrity:** All incoming data will be validated on the server to ensure it conforms to the expected schema before being persisted. Foreign key constraints in the database will further enforce relational integrity.
*   **Database Backups:** Daily automated backups of the Supabase database will be configured with a 7-day retention period, as required by the PRD.
*   **Error Handling:**
    *   **Client-Side:** React Error Boundaries will be used to catch rendering errors and prevent application crashes, displaying a graceful fallback UI.
    *   **Server-Side:** Server Actions will use `try/catch` blocks to handle errors gracefully and return structured error messages to the client.

### Observability

A comprehensive observability strategy is critical for maintaining application health.

*   **Error Monitoring:** Sentry will be integrated into the Next.js application to automatically capture, report, and alert on all unhandled exceptions on both the client-side and server-side (Server Actions).
*   **Performance Monitoring:** Sentry will be configured to monitor Core Web Vitals and transaction performance, helping to identify and diagnose performance bottlenecks.
*   **Logging:**
    *   **Client-Side:** The standard `console.log` will be used for debugging during development.
    *   **Server-Side:** All Server Action executions, including errors and key business events, will be logged. Vercel's built-in logging infrastructure will be the primary destination for these logs.

## Dependencies and Integrations

The project will be initialized with the following core dependencies. The `package.json` file does not yet exist and will be created during the initial project setup.

### Core Dependencies
| Package | Version | Description |
| :--- | :--- | :--- |
| `next` | `^16.0.0` | The React framework for production. |
| `react` | `^19.0.0` | A JavaScript library for building user interfaces. |
| `react-dom` | `^19.0.0` | Serves as the entry point to the DOM and server renderers for React. |
| `@supabase/supabase-js`| `^2.0.0` | The official JavaScript client for Supabase. |
| `@tanstack/react-query`| `^5.0.0` | Hooks for fetching, caching and updating asynchronous data in React. |
| `date-fns` | `^4.0.0` | Modern JavaScript date utility library. |
| `zod` | `^3.0.0` | TypeScript-first schema declaration and validation library. |
| `shadcn-ui` | `latest` | A collection of re-usable components. |
| `tailwindcss` | `^4.0.0` | A utility-first CSS framework for rapid UI development. |

### Development Dependencies
| Package | Version | Description |
| :--- | :--- | :--- |
| `typescript` | `^5.0.0` | A typed superset of JavaScript that compiles to plain JavaScript. |
| `eslint` | `latest` | Pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. |
| `jest` | `latest` | A delightful JavaScript Testing Framework with a focus on simplicity. |
| `@testing-library/react`| `latest` | Simple and complete React DOM testing utilities that encourage good testing practices. |
| `@playwright/test` | `latest` | A framework for end-to-end testing. |
| `@sentry/nextjs` | `latest` | The official Sentry SDK for Next.js. |

### External Integrations
*   **Supabase:** The project is tightly integrated with the Supabase platform for database and authentication services. All database interactions are mediated through the `@supabase/supabase-js` client.
*   **Vercel:** The application is designed for and will be deployed on the Vercel platform.
*   **Sentry:** The application will be integrated with Sentry for error and performance monitoring.

## Acceptance Criteria (Authoritative)

The following criteria must be met for this epic to be considered complete.

**Authentication (FR-001)**
*   **AC-1:** A new user **must** be able to create an account using a valid email and a password.
*   **AC-2:** A registered user **must** be able to log in using their correct email and password.
*   **AC-3:** A logged-in user **must** be able to log out, which should clear their session and redirect them to the login page.
*   **AC-4:** An unauthenticated user **must not** be able to access any pages within the `(dashboard)` group and should be redirected to the login page.

**Workout Management (FR-002 & FR-003)**
*   **AC-5:** A logged-in user **must** be able to access a form to create a new workout.
*   **AC-6:** When creating a workout, the `date`, `type`, and `duration` fields **must** be required. The `notes` field is optional.
*   **AC-7:** A logged-in user **must** be able to view a chronologically sorted list of their past workouts on the history page.
*   **AC-8:** A logged-in user **must** be able to select a single workout from the history to view its details.
*   **AC-9:** A logged-in user **must** be able to update the details of one of their existing workouts.
*   **AC-10:** A logged-in user **must** be able to delete one of their existing workouts, which should be confirmed via a dialog.

**Security & Data Isolation**
*   **AC-11:** A logged-in user **must only** be able to view, create, edit, or delete their own workout data. They must not be able to see data belonging to any other user.

## Traceability Mapping

This table maps each acceptance criterion to the relevant parts of the technical specification and the planned implementation.

| AC ID | FR | Spec Section(s) | Component(s) / API(s) | Test Idea |
| :--- | :- | :--- | :--- | :--- |
| AC-1 | 001 | Authentication | `app/(auth)/signup`, `AuthForm`, Supabase Auth | **E2E:** A test user can complete the sign-up form and is redirected to the login page. |
| AC-2 | 001 | Authentication | `app/(auth)/login`, `AuthForm`, Supabase Auth | **E2E:** A test user can log in with valid credentials and is redirected to the dashboard. |
| AC-3 | 001 | Authentication | `Navbar`, Supabase Auth | **E2E:** A logged-in test user clicks the logout button and is returned to the login page. |
| AC-4 | 001 | Authentication | Next.js Middleware, Supabase Auth | **E2E:** Attempt to navigate directly to `/history` while unauthenticated; assert redirection to `/login`. |
| AC-5 | 002 | Workout Management | `app/(dashboard)/logging`, `WorkoutForm` | **E2E:** A logged-in user can navigate from the dashboard to the workout logging page. |
| AC-6 | 002 | Workout Management | `WorkoutForm`, `createWorkout` Server Action | **Integration:** Submit the form with missing required fields; assert that validation errors are displayed. |
| AC-7 | 003 | Workout Management | `app/(dashboard)/history`, `WorkoutCard`, `getWorkouts` | **Integration:** The history page component correctly fetches and renders a list of mock workouts. |
| AC-8 | 002 | Workout Management | `app/(dashboard)/history/[id]`, `WorkoutView` | **E2E:** Click on a workout in the history list and verify that its details are displayed on a new page. |
| AC-9 | 002 | Workout Management | `WorkoutForm`, `updateWorkout` Server Action | **E2E:** Edit the notes of an existing workout; verify the change is persisted and displayed. |
| AC-10| 002 | Workout Management | `WorkoutCard`, `deleteWorkout` Server Action | **E2E:** Delete a workout; confirm the dialog and verify it is removed from the history list. |
| AC-11| 001 | Security | Supabase RLS Policies | **API Test:** Authenticate as User A; write a test that attempts to query the workouts of User B and asserts that the query returns an empty result. |

## Risks, Assumptions, Open Questions

The following items should be clarified and monitored during development.

*   **Risk:** The project has not yet been initialized with `create-next-app`. Any issues with the local development environment, Node.js version, or package manager could cause an initial delay.
    *   **Mitigation:** The first story should be dedicated to project initialization to address this risk immediately.
*   **Risk:** The developer implementing the data access layer may be unfamiliar with Supabase Row-Level Security (RLS). This could lead to insecure authorization logic being written in the application layer instead of being enforced at the database level.
    *   **Mitigation:** The developer should review the official Supabase RLS documentation and create database-level tests to verify policies before implementing the application-layer code.
*   **Assumption:** The assigned developer has access to a Supabase project and the required `SUPABASE_URL` and `SUPABASE_ANON_KEY` credentials needed for the `.env.local` file.
*   **Question:** The UX specification is based on `shadcn/ui`. Are there any pre-existing company-wide design tokens or component libraries that need to be integrated, or is this a fresh installation?
    *   **Next Step:** Confirm with the UX designer or Product Manager. The current assumption is a fresh installation.

## Test Strategy Summary

The testing strategy will follow a layered approach as defined in the architecture document, with a target of **80% code coverage**.

### 1. Unit Tests (Jest)
*   **Scope:** Pure functions, utility functions, and simple custom hooks.
*   **Examples:**
    *   Testing date formatting functions in `lib/date.ts`.
    *   Testing any complex data transformation logic.
*   **Goal:** Verify the correctness of individual pieces of logic in isolation.

### 2. Integration Tests (React Testing Library + Jest)
*   **Scope:** Individual React components and their interaction with hooks and props.
*   **Examples:**
    *   Rendering the `WorkoutForm` component and simulating user input to test its client-side validation logic.
    *   Rendering the `WorkoutHistory` component with mock data to ensure it displays the list correctly.
    *   Testing that a component correctly calls a server action `onSubmit`.
*   **Goal:** Ensure that components render and behave correctly without needing a full browser environment.

### 3. End-to-End Tests (Playwright)
*   **Scope:** Critical user flows that span multiple pages and involve both frontend and backend interactions.
*   **Examples:**
    *   **Authentication Flow:** A user can sign up, log out, and log back in.
    *   **Workout Creation Flow:** A user logs in, navigates to the logging page, fills out the form, submits it, and verifies the new workout appears in their history.
    *   **Data Isolation Flow:** Create two distinct users. Log in as User A, create a workout, log out. Log in as User B and verify that User A's workout is not visible.
*   **Goal:** Verify that the entire system works together as expected from the user's perspective.
