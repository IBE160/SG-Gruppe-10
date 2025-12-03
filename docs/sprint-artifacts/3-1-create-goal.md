# Story 3.1: Create Goal

Status: drafted

## Story

As a logged-in user,
I want to be able to create a new personal goal with a title and a target,
So that I can track my progress towards it.

## Acceptance Criteria

1. **AC-1:** Given a user is on the "Goals" page, when they click "Create Goal" button, then they are presented with a goal creation form.
2. **AC-2:** And the form contains fields for goal title (required) and target (required).
3. **AC-3:** And when they fill in valid goal details and submit, a new goal is created and associated with their account.
4. **AC-4:** And the new goal appears in their list of goals on the same page.
5. **AC-5:** And a success message is displayed confirming the creation.
6. **AC-6:** And validation errors are displayed for missing or invalid fields.

## Tasks / Subtasks

- [x] **Create Goals Database Schema (AC: 3)** ✅ COMPLETED 2025-12-03
  - [x] Create `goals` table in Supabase with required columns:
    - `id` (UUID, primary key, auto-generated)
    - `user_id` (UUID, foreign key to auth.users)
    - `title` (TEXT, required)
    - `target` (TEXT, required)
    - `created_at` (TIMESTAMPTZ, default now())
    - `updated_at` (TIMESTAMPTZ, default now())
  - [x] Set up RLS policies for goals table:
    - Users can only create goals for themselves
    - Users can only view their own goals
    - Users can update their own goals (future)
    - Users can delete their own goals (future)
  - [x] Migration deployed to cloud: `20251203_create_goals_table.sql`
  - [x] **Testing:** ✅ Verified - Table exists with correct schema, RLS policies active, indexes created
  - **Note:** See `docs/sprint-artifacts/epic-3-migration-deployed-2025-12-03.md` for deployment details

- [x] **Create TypeScript Types for Goals (AC: 3)** ✅ COMPLETED 2025-12-03
  - [x] Create `lib/types/goal.ts` with Goal interface
  - [x] Define Goal type: id, user_id, title, target, created_at, updated_at
  - [x] Export CreateGoalInput type (title, target)
  - [x] Add Zod schema for input validation
  - [x] **Testing:** ✅ Types verified and ready for use
  - **Note:** Types file already exists and is production-ready

- [ ] **Create Goals Page Route (AC: 1)**
  - [ ] Create `app/(dashboard)/goals/page.tsx` as Server Component
  - [ ] Add authentication check via Supabase server client
  - [ ] Redirect unauthenticated users to login page
  - [ ] Render GoalsClient component with user data
  - [ ] Add page metadata (title: "Goals - FitTrack")
  - [ ] **Testing:** Verify page renders and auth check works

- [ ] **Create Goal Server Actions (AC: 3, 5)**
  - [ ] Create `app/actions/goals.ts` for goal-related actions
  - [ ] Implement `createGoal` Server Action:
    - Accept CreateGoalInput (title, target)
    - Validate input using Zod schema
    - Verify user authentication via `supabase.auth.getUser()`
    - Insert goal into database (RLS will enforce ownership)
    - Return ActionResult<Goal> with success/error response
    - Invalidate TanStack Query cache: `revalidatePath('/goals')`
  - [ ] Follow existing pattern from `app/actions/workouts.ts`
  - [ ] **Testing:** Verify server action creates goal and handles errors

- [ ] **Create TanStack Query Hook for Goals (AC: 4)**
  - [ ] Create `hooks/useGoals.ts` for fetching goals list
  - [ ] Implement `useGoals()` hook using TanStack Query
  - [ ] Fetch goals from Supabase for current user
  - [ ] Configure cache key: ['goals']
  - [ ] Handle loading, error states
  - [ ] Return goals array, isLoading, error
  - [ ] Follow pattern from `hooks/useWorkouts.ts`
  - [ ] **Testing:** Verify hook fetches and caches goals correctly

- [ ] **Create Goal Form Component (AC: 2, 6)**
  - [ ] Create `components/goals/GoalForm.tsx` as client component
  - [ ] Add form fields: title (text input), target (text input)
  - [ ] Use shadcn/ui Input components for form fields
  - [ ] Add form validation (required fields)
  - [ ] Display validation errors inline
  - [ ] Add "Create Goal" submit button
  - [ ] Handle loading state during submission (disable button, show spinner)
  - [ ] Call `createGoal` Server Action on submit
  - [ ] Display success/error toast notifications
  - [ ] Clear form after successful submission
  - [ ] **Testing:** Verify form validates and submits correctly

- [ ] **Create Goals List Component (AC: 4)**
  - [ ] Create `components/goals/GoalsList.tsx` to display goals
  - [ ] Use `useGoals()` hook to fetch goals data
  - [ ] Display goals in a list/grid format
  - [ ] Show title and target for each goal
  - [ ] Handle empty state: "No goals yet. Create your first goal!"
  - [ ] Handle loading state: Show skeleton loaders
  - [ ] Handle error state: Display error message
  - [ ] Use shadcn/ui Card component for each goal
  - [ ] **Testing:** Verify list displays goals and handles states

- [ ] **Create Goals Client Wrapper (AC: 1, 4)**
  - [ ] Create `components/goals/GoalsClient.tsx` as client component
  - [ ] Manage form visibility state (show/hide form)
  - [ ] Add "Create Goal" button to toggle form visibility
  - [ ] Render GoalForm component when form is visible
  - [ ] Render GoalsList component to show existing goals
  - [ ] Handle layout: Form at top, list below
  - [ ] **Testing:** Verify form toggle and layout work correctly

- [ ] **Add Navigation to Goals Page (AC: 1)**
  - [ ] Update main navigation/sidebar to include "Goals" link
  - [ ] Add link to `/goals` route
  - [ ] Use appropriate icon (Target icon from lucide-react)
  - [ ] Highlight active state when on goals page
  - [ ] File to modify: Navigation component (check existing structure)
  - [ ] **Testing:** Verify navigation link appears and navigates correctly

- [ ] **Error Handling and Edge Cases (AC: 5, 6)**
  - [ ] Handle network errors during goal creation
  - [ ] Display clear error messages via toast notifications
  - [ ] Validate input on both client and server side
  - [ ] Prevent duplicate goal creation (disable button during submission)
  - [ ] Handle database constraint violations gracefully
  - [ ] Log errors to console for debugging
  - [ ] **Testing:** Verify error handling for various failure scenarios

## Dev Notes

### Requirements Context Summary

**Epic 3: Personal Goal Setting**
This story implements goal creation functionality (Story 3.1), the first story in Epic 3. Allows users to set personal fitness goals with a title and target, establishing the foundation for goal tracking features.

**From PRD:**
- FR-004: Create and view personal goals (with a title and a target)
- MVP scope: Simple goal creation with title and target fields
- Examples: "run 10k" or "work out 3 times a week"
- Prerequisites: User must be logged in (Story 1.3)

**From Epics File:**
- Epic 3 introduces personal goal setting functionality
- Story 3.1 is the first story in this epic
- Prerequisite: Story 1.3 (User Login)
- Goals have title and target fields only (minimal MVP)
- Goal progress tracking deferred to future stories

### Learnings from Previous Story (Story 2.5: Delete Workout)

**From Story 2.5 (Status: done)**

**PRE-WORK COMPLETED (2025-12-03):**
- ✅ **Database Schema:** Goals table designed with proper columns, constraints, and relationships
- ✅ **Migration File:** `20251203_create_goals_table.sql` created in `supabase/migrations/`
- ✅ **Migration Deployed:** Applied to cloud (Project: ubcakdyirdaevwnaeozx)
- ✅ **TypeScript Types:** `lib/types/goal.ts` created with full type definitions
- ✅ **RLS Policies:** 4 policies active (SELECT, INSERT, UPDATE, DELETE)
- ✅ **Indexes:** 2 indexes created for performance (`idx_goals_user_id`, `idx_goals_user_created`)
- ✅ **Pattern Consistency:** 100% match with Epic 2 (Workouts) patterns
- ✅ **Verification:** Cloud database confirmed ready for Epic 3
- ✅ **References:** 
  - Preparation: `docs/sprint-artifacts/epic-3-database-prep-2025-12-03.md`
  - Deployment: `docs/sprint-artifacts/epic-3-migration-deployed-2025-12-03.md`

**Services/Files to REUSE (already exist):**
- ✅ `lib/supabase/server.ts` - Server-side Supabase client for Server Actions
- ✅ `lib/supabase/client.ts` - Client-side Supabase client (if needed)
- ✅ `app/actions/` pattern - Create new `goals.ts` following `workouts.ts` pattern
- ✅ `components/ui/*` - shadcn/ui components (Button, Input, Card, Toast)
- ✅ Toast notifications via Sonner (already integrated)
- ✅ TanStack Query for data fetching (`useGoals` hook following `useWorkouts` pattern)
- ✅ Server Actions pattern: Auth check → Validate → Database operation → Revalidate cache
- ✅ Navigation structure: `app/(dashboard)/` grouping for authenticated pages
- ✅ RLS policies pattern: Supabase RLS for data security

**Proven Patterns from Story 2.5:**
- ✅ Server-side auth check: `await createClient()` → `supabase.auth.getUser()`
- ✅ Server Actions with Zod validation and error handling
- ✅ TanStack Query hooks for data fetching and caching
- ✅ Client/Server component split: Server page → Client wrapper → Presentational components
- ✅ Toast notifications for success/error feedback
- ✅ shadcn/ui + Tailwind CSS styling approach
- ✅ TypeScript strict mode with explicit types
- ✅ Cache invalidation with `revalidatePath()` after mutations

**What's New in Story 3.1:**
- 🆕 New feature area: Goals (separate from Workouts)
- 🆕 Form visibility toggle pattern (show/hide create form)
- 🆕 Empty state messaging for new feature
- 🆕 New navigation item: "Goals" in main nav/sidebar
- ✅ Database table and types already prepared (pre-work complete)

**Technical Debt from Epic 2:**
- None carried over - Epic 2 completed successfully
- All CRUD patterns established and working well
- Server Actions, RLS, TanStack Query patterns proven

**Key Files from Story 2.5:**
- `app/actions/workouts.ts` - Reference for Server Action structure
- `hooks/useWorkouts.ts` - Reference for TanStack Query hook pattern
- `components/workouts/WorkoutForm.tsx` - Reference for form component pattern
- `components/workouts/WorkoutsList.tsx` - Reference for list component pattern
- `app/(dashboard)/workouts/page.tsx` - Reference for authenticated page pattern

**Architectural Consistency:**
- Follow exact same patterns as Epic 2 (Workout Management)
- Maintain consistency in file structure, naming conventions
- Reuse proven Server Actions, TanStack Query, RLS patterns
- Use same UI components and styling approach

### Architectural Considerations

**From Architecture Document:**

**Database Schema for Goals:**
```sql
-- Create goals table
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Users can insert their own goals
CREATE POLICY "Users can create own goals" ON goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own goals
CREATE POLICY "Users can view own goals" ON goals
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own goals (future)
CREATE POLICY "Users can update own goals" ON goals
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own goals (future)
CREATE POLICY "Users can delete own goals" ON goals
  FOR DELETE USING (auth.uid() = user_id);
```

**TypeScript Types Pattern:**
```typescript
// lib/types/goal.ts
export interface Goal {
  id: string;
  user_id: string;
  title: string;
  target: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGoalInput {
  title: string;
  target: string;
}

export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

**Server Action Pattern (following workouts.ts):**
```typescript
// app/actions/goals.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Goal, ActionResult } from '@/lib/types/goal'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  target: z.string().min(1, 'Target is required').max(500)
})

export type CreateGoalInput = z.infer<typeof createGoalSchema>

export async function createGoal(input: CreateGoalInput): Promise<ActionResult<Goal>> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  
  // Validate input
  const validated = createGoalSchema.parse(input)
  
  // Insert goal
  const { data, error } = await supabase
    .from('goals')
    .insert({
      user_id: user.id,
      title: validated.title,
      target: validated.target
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating goal:', error)
    return { success: false, error: error.message }
  }
  
  // Invalidate cache
  revalidatePath('/goals')
  
  return { success: true, data }
}
```

**TanStack Query Hook Pattern:**
```typescript
// hooks/useGoals.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Goal } from '@/lib/types/goal'

export function useGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async (): Promise<Goal[]> => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    }
  })
}
```

**Component Structure:**
- Server Component: `app/(dashboard)/goals/page.tsx` (handles auth check)
- Client Component: `components/goals/GoalsClient.tsx` (manages state, form visibility)
- Form Component: `components/goals/GoalForm.tsx` (handles goal creation)
- List Component: `components/goals/GoalsList.tsx` (displays goals)
- Reusable Components: shadcn/ui components (Button, Input, Card, etc.)

**Data Flow:**
1. User navigates to `/goals` page
2. Server Component checks authentication
3. GoalsClient component fetches goals via `useGoals()` hook
4. User clicks "Create Goal" → Form appears
5. User fills form and submits → `createGoal` Server Action called
6. Server Action validates, inserts goal, revalidates cache
7. On success → Toast notification, form clears, list refreshes automatically
8. On error → Toast notification with error message

### Project Structure Notes

**Files to Create:**
- `app/(dashboard)/goals/page.tsx` - Server Component for goals route
- `components/goals/GoalsClient.tsx` - Client wrapper managing state
- `components/goals/GoalForm.tsx` - Form component for creating goals
- `components/goals/GoalsList.tsx` - List component displaying goals
- `app/actions/goals.ts` - Server Actions for goal operations
- `hooks/useGoals.ts` - TanStack Query hook for fetching goals

**Files Already Created (Pre-work Complete):**
- ✅ `lib/types/goal.ts` - TypeScript types for Goal entities (ALREADY EXISTS)

**Files to Modify:**
- Navigation component - Add "Goals" link to main nav/sidebar

**Database Pre-work Complete:**
- ✅ `goals` table deployed to cloud (2025-12-03)
- ✅ Migration file: `20251203_create_goals_table.sql`
- ✅ RLS policies active (4 policies)
- ✅ Indexes created (2 indexes)
- ✅ See: `docs/sprint-artifacts/epic-3-migration-deployed-2025-12-03.md`

**Files to Reference (already exist):**
- `lib/supabase/server.ts` - Server-side Supabase client
- `lib/supabase/client.ts` - Client-side Supabase client
- `components/ui/*.tsx` - shadcn/ui components (Button, Input, Card, etc.)
- `app/actions/workouts.ts` - Reference for Server Action patterns
- `hooks/useWorkouts.ts` - Reference for TanStack Query patterns

**shadcn/ui Components Needed (verify installation):**
- Button ✅ (already installed)
- Input ✅ (already installed)
- Card ✅ (already installed)
- If any missing, install via: `npx shadcn-ui@latest add [component]`

### Testing Strategy

**Manual Testing (per project plan):**
1. Login as user → Navigate to "Goals" page via main navigation
2. Verify empty state displays: "No goals yet. Create your first goal!"
3. Click "Create Goal" button → Verify form appears
4. Leave fields empty and submit → Verify validation errors display
5. Fill in title: "Run 10k" and target: "Complete by end of year"
6. Click submit → Verify:
   - Success toast: "Goal created successfully"
   - Form clears
   - New goal appears in list immediately
   - Goal shows correct title and target
7. Create multiple goals → Verify list displays all goals in reverse chronological order
8. Test error cases:
   - Simulate network error → Verify error toast
   - Test with very long title/target → Verify validation
9. Test with different users → Verify RLS prevents viewing other users' goals
10. Navigate away and back → Verify goals persist and reload correctly

**Automated Testing (deferred to test epic):**
- Unit tests: `createGoal` Server Action validation and logic
- Component tests: GoalForm validation and submission
- Integration tests: Full goal creation flow
- E2E tests: Navigate to goals, create goal, verify in list

**Target:** Manual verification of all 6 acceptance criteria

### Dependencies and Integration

**Existing Dependencies (already in package.json):**
- `@supabase/supabase-js` (^2.86.0) - Database client ✅
- `@tanstack/react-query` (^5.90.11) - Client-side data fetching ✅
- `react` (^19.2.0), `next` (^16.0.5) - Framework ✅
- `lucide-react` - Icons (Target icon for navigation) ✅
- `sonner` - Toast notifications ✅
- `zod` - Schema validation ✅

**New Dependencies:**
- None required - all dependencies already installed

**Integration Points:**
- ✅ Supabase database: `goals` table deployed with RLS policies (READY)
- TanStack Query: Cache goals data with key ['goals']
- Navigation: Add link to `/goals` in main nav/sidebar
- Routing: New route at `app/(dashboard)/goals/page.tsx`
- Cache: `revalidatePath('/goals')` to refresh after mutations

### References

- [Source: docs/fase-2-plan/epics.md#Story-3.1:-Create-Goal]
- [Source: docs/fase-2-plan/PRD.md#FR-004]
- [Source: docs/fase-3-solutioning/architecture.md#Database-Schema]
- [Source: docs/fase-3-solutioning/architecture.md#API-Pattern/Data-Fetching]
- [Source: docs/sprint-artifacts/epic-3-database-prep-2025-12-03.md] **Database Schema Preparation**
- [Source: docs/sprint-artifacts/epic-3-migration-deployed-2025-12-03.md] **Cloud Deployment Record**

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-03 16:03:** Story updated to reflect completed database migration and types (see epic-3-migration-deployed-2025-12-03.md)
- **2025-12-03:** Initial draft generated for Story 3.1: Create Goal by SM Agent (Bob)
