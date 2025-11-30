# Epic Technical Specification: Core Workout Management

Date: 2025-11-30
Author: BIP
Epic ID: 2
Status: Draft

---

## Overview

Epic 2 delivers the core value proposition of FitTrack by enabling users to create, view, update, and delete workout records. This epic addresses FR-002 (CRUD operations for workouts) and FR-003 (workout history viewing) from the PRD. Users will be able to log workouts with date, type, duration, and notes, view their complete workout history in chronological order, access detailed information for individual workouts, and maintain data accuracy through edit and delete capabilities.

## Objectives and Scope

**In Scope:**
- Create new workout records with validation (date, type, duration, notes)
- Display chronological workout history list (reverse chronological order)
- View complete details of individual workouts
- Update existing workout records with validation
- Delete workout records with confirmation
- Authentication enforcement (users can only access their own workouts)
- Form validation and error handling
- Mobile-responsive UI for all workout features

**Out of Scope:**
- Statistics and progress graphs (deferred to Growth phase)
- Workout templates or suggestions
- Bulk operations (import/export)
- Workout sharing or social features
- Advanced filtering or search (beyond basic chronological listing)
- Workout categories or tags beyond the basic "type" field

## System Architecture Alignment

This epic aligns with the unified Next.js architecture decisions:
- **App Router Routes**: Workout features will be implemented under `app/(dashboard)/` route group, ensuring authentication protection
- **Server Actions**: Mutations (create, update, delete) will use Next.js Server Actions for type-safe, server-side operations
- **Data Fetching**: TanStack Query will manage workout list/detail fetching with caching and automatic revalidation
- **Database**: Supabase PostgreSQL with Row Level Security (RLS) policies enforcing user isolation
- **Authentication**: Supabase Auth middleware ensures only authenticated users access workout endpoints
- **UI Components**: shadcn/ui + Tailwind CSS for forms, lists, and detail views
- **Date Handling**: `date-fns` for client-side formatting, UTC/ISO 8601 in database
- **Error Handling**: React Error Boundaries, toast notifications, and structured error responses per architecture standards

## Detailed Design

### Services and Modules

| Module | Responsibility | Inputs | Outputs | Owner |
|--------|---------------|--------|---------|-------|
| `app/(dashboard)/workouts/page.tsx` | Workout history list page | User session | Rendered workout list UI | Frontend |
| `app/(dashboard)/workouts/[id]/page.tsx` | Workout detail/edit page | Workout ID, User session | Rendered workout detail UI | Frontend |
| `app/(dashboard)/workouts/new/page.tsx` | Create workout page | User session | Workout creation form UI | Frontend |
| `components/workouts/WorkoutForm.tsx` | Reusable workout form component | Workout data (for edit), onSubmit callback | Form UI, validation | Frontend |
| `components/workouts/WorkoutList.tsx` | Workout list display component | Array of workouts | List UI with navigation | Frontend |
| `components/workouts/WorkoutCard.tsx` | Individual workout display | Single workout object | Workout summary card | Frontend |
| `lib/supabase/queries.ts` (workout functions) | Database query functions | Supabase client, user ID, workout data | Workout records, errors | Backend/Data Layer |
| `app/actions/workouts.ts` | Server Actions for mutations | Form data, workout ID | Success/error responses | Backend |
| `hooks/useWorkouts.ts` | TanStack Query hook for fetching | User ID (from session) | Workouts data, loading state | Frontend |

### Data Models and Contracts

**Database Schema (Supabase PostgreSQL):**

```sql
-- Workouts table
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_date DATE NOT NULL,
  workout_type VARCHAR(100) NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient user-based queries
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_user_date ON workouts(user_id, workout_date DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Users can only read their own workouts
CREATE POLICY "Users can view own workouts" ON workouts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own workouts
CREATE POLICY "Users can create own workouts" ON workouts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own workouts
CREATE POLICY "Users can update own workouts" ON workouts
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own workouts
CREATE POLICY "Users can delete own workouts" ON workouts
  FOR DELETE USING (auth.uid() = user_id);
```

**TypeScript Types:**

```typescript
// lib/types/workout.ts
export interface Workout {
  id: string;
  user_id: string;
  workout_date: string; // ISO 8601 date string
  workout_type: string;
  duration_minutes: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkoutInput {
  workout_date: string;
  workout_type: string;
  duration_minutes: number;
  notes?: string;
}

export interface UpdateWorkoutInput extends Partial<CreateWorkoutInput> {
  id: string;
}

export type WorkoutFormData = Omit<CreateWorkoutInput, 'notes'> & {
  notes: string;
};
```

### APIs and Interfaces

**Server Actions (app/actions/workouts.ts):**

```typescript
// Create workout
export async function createWorkout(formData: CreateWorkoutInput): Promise<ActionResult<Workout>>
  Input: { workout_date, workout_type, duration_minutes, notes? }
  Output: { success: true, data: Workout } | { success: false, error: string }
  Validation: All required fields, duration > 0, valid date format

// Update workout
export async function updateWorkout(input: UpdateWorkoutInput): Promise<ActionResult<Workout>>
  Input: { id, workout_date?, workout_type?, duration_minutes?, notes? }
  Output: { success: true, data: Workout } | { success: false, error: string }
  Validation: Workout exists, user owns workout, valid field values

// Delete workout
export async function deleteWorkout(id: string): Promise<ActionResult<void>>
  Input: id (UUID)
  Output: { success: true } | { success: false, error: string }
  Validation: Workout exists, user owns workout
```

**Query Functions (lib/supabase/queries.ts):**

```typescript
// Get all workouts for user
export async function getWorkouts(userId: string): Promise<Workout[]>
  Returns: Array of workouts ordered by workout_date DESC
  
// Get single workout by ID
export async function getWorkoutById(id: string, userId: string): Promise<Workout | null>
  Returns: Single workout or null if not found/unauthorized
```

**TanStack Query Hook (hooks/useWorkouts.ts):**

```typescript
export function useWorkouts() {
  queryKey: ['workouts', userId]
  queryFn: () => getWorkouts(userId)
  staleTime: 30000 // 30 seconds
  
export function useWorkout(id: string) {
  queryKey: ['workout', id]
  queryFn: () => getWorkoutById(id, userId)
```

**Error Codes:**
- `UNAUTHORIZED`: User not authenticated
- `FORBIDDEN`: User doesn't own the workout
- `NOT_FOUND`: Workout doesn't exist
- `VALIDATION_ERROR`: Invalid input data
- `DATABASE_ERROR`: Database operation failed

### Workflows and Sequencing

**Create Workout Flow:**
1. User navigates to `/workouts/new`
2. WorkoutForm component renders with empty fields
3. User fills form (date picker, type input, duration, notes)
4. Client-side validation on submit
5. Call `createWorkout` Server Action with form data
6. Server validates, inserts to database via Supabase
7. On success: Redirect to `/workouts`, show toast, invalidate TanStack Query cache
8. On error: Display error message, keep form data

**View Workout History Flow:**
1. User navigates to `/workouts`
2. `useWorkouts` hook fetches data via TanStack Query
3. Loading state displayed while fetching
4. WorkoutList component renders workouts in reverse chronological order
5. Each WorkoutCard displays date, type, duration (notes preview optional)
6. Click on card navigates to `/workouts/[id]`

**View Workout Detail Flow:**
1. User clicks workout from history or navigates to `/workouts/[id]`
2. `useWorkout(id)` hook fetches single workout
3. Display complete workout details including full notes
4. Show "Edit" and "Delete" buttons

**Update Workout Flow:**
1. From detail page, user clicks "Edit"
2. WorkoutForm component renders pre-filled with existing data
3. User modifies fields
4. Client-side validation on submit
5. Call `updateWorkout` Server Action with workout ID and changes
6. Server validates ownership and data, updates database
7. On success: Redirect to detail page, show toast, invalidate cache
8. On error: Display error message, preserve edits

**Delete Workout Flow:**
1. From detail page, user clicks "Delete"
2. Confirmation dialog appears (shadcn/ui AlertDialog)
3. User confirms deletion
4. Call `deleteWorkout` Server Action with workout ID
5. Server validates ownership, deletes from database
6. On success: Redirect to `/workouts`, show toast, invalidate cache
7. On error: Display error message, stay on page

## Non-Functional Requirements

### Performance

- **Page Load Time**: Workout history page should render within 2 seconds on 3G connection
- **Server Action Response**: CRUD operations complete within 500ms under normal load
- **Database Query Performance**: User workout queries return in <100ms (indexed queries)
- **Caching Strategy**: TanStack Query caches workout data for 30 seconds, reducing redundant fetches
- **Pagination**: Not required for MVP (assume <100 workouts per user), but queries are indexed for future scaling
- **Image/Asset Loading**: No images in workout data, minimal performance impact
- **Bundle Size**: Workout feature code should not exceed 50KB gzipped

### Security

- **Authentication**: All workout endpoints require valid Supabase session token
- **Authorization**: Row Level Security (RLS) policies enforce user can only access their own workouts
- **Input Validation**: Server-side validation on all Server Actions prevents injection attacks
- **XSS Prevention**: React's built-in escaping protects against XSS in workout notes
- **CSRF Protection**: Next.js Server Actions include built-in CSRF protection
- **SQL Injection**: Supabase client uses parameterized queries preventing SQL injection
- **Rate Limiting**: Leverage Vercel's edge protection for basic rate limiting (future: implement explicit limits)
- **Sensitive Data**: No PII beyond user_id (foreign key); workout data is non-sensitive

### Reliability/Availability

- **Uptime Target**: 99.5% availability (relying on Vercel and Supabase SLAs)
- **Error Recovery**: TanStack Query automatically retries failed requests (3 attempts with exponential backoff)
- **Data Validation**: Client and server-side validation prevents invalid data from entering database
- **Transaction Integrity**: Database operations use Supabase's ACID guarantees
- **Graceful Degradation**: If database unavailable, display cached data with offline indicator
- **Error Boundaries**: React Error Boundaries catch component errors, display fallback UI
- **Optimistic Updates**: TanStack Query mutations use optimistic updates for better perceived performance, rollback on failure

### Observability

- **Logging**: Vercel logs capture all Server Action executions, including errors and response times
- **Error Tracking**: Sentry integration captures client and server errors with full stack traces
- **Metrics**: Track key metrics via Sentry:
  - Workout creation success/failure rate
  - Average response time for CRUD operations
  - Query cache hit/miss rates
- **User Actions**: Log critical user flows (create, update, delete) for debugging
- **Database Monitoring**: Supabase dashboard provides query performance and connection metrics
- **Health Checks**: API route `/api/health` verifies database connectivity

## Dependencies and Integrations

**External Dependencies:**
- `@supabase/supabase-js` (^2.x) - Database client and authentication
- `@tanstack/react-query` (^5.x) - Data fetching and caching
- `date-fns` (^4.x) - Date formatting and manipulation
- `zod` (^3.x) - Schema validation for form inputs and Server Actions
- `react-hook-form` (^7.x) - Form state management and validation

**Internal Dependencies:**
- Epic 1 (Foundation & User Authentication) - Required for user session management
- `lib/supabase/client.ts` - Supabase client initialization
- `lib/supabase/server.ts` - Server-side Supabase client for Server Actions
- `components/ui/*` - shadcn/ui components (Button, Form, Input, Textarea, Dialog, Toast)
- Authentication middleware from Epic 1

**Database Integration:**
- Supabase PostgreSQL instance
- Requires `workouts` table migration (SQL provided in Data Models section)
- RLS policies must be applied before production deployment

**Build-time Dependencies:**
- TypeScript (^5.x)
- Next.js (^15.x)
- Tailwind CSS (^4.x)

**Version Constraints:**
- All dependencies should use caret (^) for minor version flexibility
- Next.js version must align with Vercel deployment platform
- Supabase client version must be compatible with project's Supabase instance

## Acceptance Criteria (Authoritative)

**AC-2.1: Create Workout**
1. Given a logged-in user on the workout creation page, when they submit a valid workout form, then a new workout is saved to the database and appears in their history
2. Given invalid form data, when the user attempts to submit, then validation errors are displayed and submission is blocked
3. Given a successful workout creation, when the operation completes, then the user is redirected to workout history with a success toast

**AC-2.2: View Workout History**
1. Given a logged-in user with existing workouts, when they navigate to the workout history page, then all workouts are displayed in reverse chronological order (newest first)
2. Given a user with no workouts, when they view the history page, then an empty state with "Create Workout" call-to-action is displayed
3. Given workouts are loading, when the page renders, then a loading skeleton/spinner is displayed

**AC-2.3: View Workout Details**
1. Given a logged-in user viewing workout history, when they click on a workout, then they are navigated to the detail page showing all workout information including full notes
2. Given an invalid workout ID, when the user attempts to view details, then a 404 error page is displayed
3. Given a workout belonging to another user, when the current user attempts to access it, then a 403 forbidden error is displayed

**AC-2.4: Update Workout**
1. Given a user viewing workout details, when they click "Edit", then a pre-filled form is displayed with current workout data
2. Given valid updates to the form, when the user submits, then the workout is updated in the database and the user sees the updated details
3. Given invalid form data, when the user attempts to update, then validation errors are displayed and submission is blocked
4. Given a user attempts to update another user's workout, then the operation is rejected with a forbidden error

**AC-2.5: Delete Workout**
1. Given a user viewing workout details, when they click "Delete" and confirm, then the workout is permanently removed from the database
2. Given a successful deletion, when the operation completes, then the user is redirected to workout history with a success toast
3. Given a user cancels the deletion confirmation, when they click cancel, then the workout is not deleted and they remain on the detail page
4. Given a user attempts to delete another user's workout, then the operation is rejected with a forbidden error

**Cross-Cutting Acceptance Criteria:**
- All workout pages are mobile-responsive and functional on screens ≥320px width
- All operations include proper error handling with user-friendly error messages
- Authentication is enforced on all workout endpoints (redirect to login if unauthenticated)
- All workout dates are stored in UTC and displayed in the user's local timezone

## Traceability Mapping

| AC ID | PRD Requirement | Spec Section | Components/APIs | Test Approach |
|-------|----------------|--------------|-----------------|---------------|
| AC-2.1 | FR-002 (Create workout) | Detailed Design → APIs → createWorkout | WorkoutForm, app/actions/workouts.ts | Unit: Server Action validation<br>Integration: Form submission to DB<br>E2E: Full create flow |
| AC-2.2 | FR-003 (View history) | Detailed Design → APIs → getWorkouts | WorkoutList, useWorkouts hook | Unit: Query function<br>Integration: TanStack Query caching<br>E2E: Navigate and view list |
| AC-2.3 | FR-002 (View workout) | Detailed Design → APIs → getWorkoutById | Workout detail page, useWorkout hook | Unit: Query function with auth<br>Integration: Dynamic route<br>E2E: Click from list to detail |
| AC-2.4 | FR-002 (Update workout) | Detailed Design → APIs → updateWorkout | WorkoutForm, app/actions/workouts.ts | Unit: Server Action validation<br>Integration: Update with RLS<br>E2E: Full edit flow |
| AC-2.5 | FR-002 (Delete workout) | Detailed Design → APIs → deleteWorkout | DeleteDialog, app/actions/workouts.ts | Unit: Server Action with auth<br>Integration: Delete with RLS<br>E2E: Confirm delete flow |
| Cross-cutting (Auth) | FR-001 (Authentication) | NFRs → Security → RLS policies | Supabase middleware, RLS policies | Integration: Unauthorized access blocked<br>E2E: Auth redirect |
| Cross-cutting (Mobile) | NFR (Usability) | System Architecture → UI Components | All workout components | E2E: Viewport testing 320px-1920px |
| Cross-cutting (Dates) | FR-002 (Workout date) | Detailed Design → Data Models | date-fns utilities | Unit: Date formatting<br>Integration: UTC storage |

## Risks, Assumptions, Open Questions

**Risks:**
- **R1**: RLS policy misconfiguration could allow users to access other users' workouts
  - *Mitigation*: Thorough testing with multiple test accounts, security review of policies before production
- **R2**: Large workout datasets (>1000 records) may cause performance degradation without pagination
  - *Mitigation*: Monitor performance metrics, implement pagination if needed in future sprint
- **R3**: Client-side date handling across timezones may cause confusion for users traveling
  - *Mitigation*: Clearly document UTC storage, consider timezone selection in future enhancement

**Assumptions:**
- **A1**: Users will typically have <100 workouts during MVP phase, pagination not needed initially
- **A2**: Workout types are free-text input (no predefined categories) for MVP flexibility
- **A3**: Notes field has no length limit in MVP (reasonable use assumed)
- **A4**: Concurrent editing of same workout by same user is unlikely/acceptable edge case
- **A5**: Supabase free tier limits are sufficient for MVP user base (<500 users)

**Open Questions:**
- **Q1**: Should workout type have autocomplete suggestions based on user's previous workouts?
  - *Status*: Deferred to post-MVP (Growth phase)
- **Q2**: Should there be a maximum duration validation (e.g., workouts >8 hours)?
  - *Decision needed*: Recommend max 1440 minutes (24 hours) to prevent obvious errors
- **Q3**: Should deleted workouts be soft-deleted (archived) or hard-deleted?
  - *Decision*: Hard delete for MVP simplicity, consider soft delete if user feedback requests "undo"

## Test Strategy Summary

**Unit Tests (Jest + React Testing Library):**
- Server Actions (`app/actions/workouts.ts`): Test validation logic, error handling, mocked Supabase calls
- Query functions (`lib/supabase/queries.ts`): Test query construction, filtering, ordering
- Form validation: Test zod schemas with valid/invalid inputs
- Utility functions: Date formatting, data transformations
- Target: 80% code coverage for business logic

**Integration Tests (Jest + Supabase Test Client):**
- Database operations: Create, read, update, delete workouts with real test database
- RLS policies: Verify users cannot access other users' workouts
- TanStack Query integration: Cache behavior, optimistic updates, error retry logic
- Server Action → Database flow: Full mutation paths with transaction verification

**End-to-End Tests (Playwright):**
- **Happy path**: Create workout → View in history → View details → Edit → Delete
- **Error scenarios**: Invalid form submission, unauthorized access attempts, network failures
- **Mobile responsiveness**: Test all flows on mobile viewport (375px width)
- **Authentication**: Ensure redirects and session persistence work correctly
- **Edge cases**: Empty state, single workout, many workouts (>50), long notes text

**Manual Testing Checklist:**
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Accessibility: Keyboard navigation, screen reader compatibility (WCAG AA)
- Visual regression: Compare against design mockups/prototypes
- Performance: Measure page load and Server Action response times

**Test Data:**
- Use Supabase seeding scripts for consistent test data
- Maintain separate test users for isolation
- Include edge cases: past dates, future dates, leap years, different timezones

**CI/CD Integration:**
- Unit + Integration tests run on every PR
- E2E tests run on merge to main branch
- Block deployment if critical tests fail
- Generate coverage reports and track trends

**Coverage Targets:**
- Unit test coverage: ≥80% for Server Actions and query functions
- Integration test coverage: All CRUD operations + RLS policies
- E2E test coverage: All user-facing workflows (5 stories)
