# Story 2.4: Update Workout

Status: ready-for-dev

## Story

As a logged-in user,
I want to be able to edit the details of a past workout,
So that I can correct any mistakes.

## Acceptance Criteria

1. **AC-1:** Given a user is viewing the details of a workout, when they click the "Edit" button, then they are presented with a form to edit the workout's details.
2. **AC-2:** And the form is pre-filled with the existing workout data (date, type, duration, notes).
3. **AC-3:** And when they save the changes, the workout is updated in the database.
4. **AC-4:** And they are returned to the workout details view showing the updated data.
5. **AC-5:** And form validation ensures all required fields are valid before submission.
6. **AC-6:** And an error message is displayed if the update fails.

## Tasks / Subtasks

- [ ] **Create Workout Detail Page with Edit Mode (AC: 1, 2)**
  - [ ] Create `app/(dashboard)/workouts/[id]/page.tsx` dynamic route
  - [ ] Implement `useWorkout(id)` hook using TanStack Query for single workout fetch
  - [ ] Add query function `getWorkoutById(id, userId)` to `lib/supabase/queries.ts`
  - [ ] Display workout details in view mode (date, type, duration, notes)
  - [ ] Add "Edit" button that switches to edit mode
  - [ ] Show WorkoutForm component in edit mode with pre-filled data
  - [ ] **Testing:** Verify detail page loads and displays workout data correctly

- [ ] **Implement Update Workout Server Action (AC: 3, 5, 6)**
  - [ ] Create `updateWorkout` Server Action in `app/actions/workouts.ts`
  - [ ] Accept `UpdateWorkoutInput` (id, workout_date?, workout_type?, duration_minutes?, notes?)
  - [ ] Validate input using Zod schema (partial update allowed)
  - [ ] Verify user owns the workout (RLS will handle, but explicit check recommended)
  - [ ] Update workout in database via Supabase client
  - [ ] Return `ActionResult<Workout>` with success/error response
  - [ ] Invalidate TanStack Query cache: `revalidatePath('/workouts/[id]')`
  - [ ] **Testing:** Verify server action updates workout and handles errors

- [ ] **Update WorkoutForm to Support Edit Mode (AC: 2, 5)**
  - [ ] Modify `components/workouts/WorkoutForm.tsx` to accept `defaultValues` prop
  - [ ] Pre-fill form fields when `defaultValues` provided (edit mode)
  - [ ] Update form submission handler to call `updateWorkout` when in edit mode
  - [ ] Add client-side validation for all fields
  - [ ] Display validation errors inline
  - [ ] Show loading state during submission
  - [ ] **Testing:** Verify form pre-fills correctly and submits updates

- [ ] **Handle Edit Flow and Navigation (AC: 4)**
  - [ ] After successful update, redirect to workout detail page (view mode)
  - [ ] Use `router.push('/workouts/[id]')` with updated ID
  - [ ] Display success toast notification: "Workout updated successfully"
  - [ ] On error, stay on edit form and display error message
  - [ ] Add "Cancel" button to return to view mode without saving
  - [ ] **Testing:** Verify navigation flow after update success/failure

- [ ] **Update TanStack Query Cache Management (AC: 4)**
  - [ ] Configure `useWorkout(id)` hook to refetch after mutation
  - [ ] Use TanStack Query's `invalidateQueries` for cache invalidation
  - [ ] Ensure both detail page and workout list reflect updated data
  - [ ] Consider optimistic updates for better UX (optional)
  - [ ] **Testing:** Verify cache updates correctly after workout update

- [ ] **Add Edit Authorization Check (AC: 3)**
  - [ ] Verify user can only edit their own workouts (RLS enforced)
  - [ ] Display "Unauthorized" error if user attempts to edit another user's workout
  - [ ] Handle 404 if workout doesn't exist
  - [ ] **Testing:** Verify authorization works correctly

- [ ] **Update Workout Detail View UI (AC: 1)**
  - [ ] Create `components/workouts/WorkoutDetail.tsx` component for view mode
  - [ ] Display formatted workout date using date-fns
  - [ ] Display workout type, duration, and notes
  - [ ] Add "Edit" button with icon (Pencil)
  - [ ] Add "Back to History" button/link
  - [ ] Style with shadcn/ui Card component
  - [ ] **Testing:** Verify detail view displays all workout information

## Dev Notes

### Requirements Context Summary

**Epic 2: Core Workout Management**
This story implements workout editing functionality (Story 2.4), allowing users to update existing workout records. Builds on Story 2.3 (View Workout Details) by adding edit capability to the detail page. This completes the update operation for Epic 2's CRUD functionality.

**From PRD:**
- FR-002: Update workouts (part of CRUD operations)
- MVP scope: Simple edit form with validation
- User should be able to correct mistakes in logged workouts

**From Tech Spec (Epic 2):**
- Server Actions: Use Next.js Server Actions for mutation operations
- Form handling: react-hook-form + Zod validation
- TanStack Query: Cache invalidation after update for data freshness
- RLS Policies: Database enforces user can only update own workouts
- Error handling: Display errors via toast notifications

### Learnings from Previous Story (Story 2.2)

**Services/Files to REUSE (already exist):**
- ✅ `lib/supabase/queries.ts` - Add `getWorkoutById` and `updateWorkout` functions
- ✅ `lib/types/workout.ts` - `Workout`, `UpdateWorkoutInput` types defined
- ✅ `components/workouts/WorkoutForm.tsx` - Reuse for edit mode
- ✅ `lib/supabase/server.ts` - Server-side Supabase client for Server Actions
- ✅ `components/ui/*` - shadcn/ui components (Button, Form, Input, Textarea)
- ✅ Database: workouts table with RLS update policy
- ✅ Toast notifications via Sonner
- ✅ date-fns for date formatting (already installed)
- ✅ TanStack Query for data fetching and cache management

**Proven Patterns from Story 2.1 & 2.2:**
- ✅ Server-side auth check: `await createClient()` → `supabase.auth.getUser()`
- ✅ Server Actions pattern: `createWorkout` implementation as reference
- ✅ TanStack Query hooks: `useWorkouts` pattern to follow for `useWorkout`
- ✅ Form validation with react-hook-form + Zod
- ✅ Cache invalidation with `revalidatePath()` in Server Actions
- ✅ shadcn/ui + Tailwind CSS styling approach
- ✅ TypeScript strict mode with explicit types

**What's New in Story 2.4:**
- 🆕 Dynamic route: `/workouts/[id]` for workout detail page
- 🆕 Edit mode toggle: View mode ↔ Edit mode on same page
- 🆕 Pre-filling form with existing data (defaultValues)
- 🆕 Update Server Action (vs. create from Story 2.1)
- 🆕 Single workout fetch: `useWorkout(id)` hook
- 🆕 Partial updates: Allow updating some fields without changing others

**Technical Debt from Story 2.2:**
- None identified - Story 2.2 completed successfully

### Architectural Considerations

**From Architecture Document:**

**Dynamic Route Pattern:**
```typescript
// app/(dashboard)/workouts/[id]/page.tsx
export default async function WorkoutDetailPage({ params }: { params: { id: string } }) {
  // Server Component handles auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // Client component handles data fetching and edit mode
  return <WorkoutDetailClient id={params.id} />
}
```

**Update Server Action Pattern:**
```typescript
// app/actions/workouts.ts
'use server'

export async function updateWorkout(input: UpdateWorkoutInput): Promise<ActionResult<Workout>> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  
  // Validate input
  const validatedInput = updateWorkoutSchema.parse(input)
  
  // Update workout (RLS ensures user owns it)
  const { data, error } = await supabase
    .from('workouts')
    .update({
      workout_date: validatedInput.workout_date,
      workout_type: validatedInput.workout_type,
      duration_minutes: validatedInput.duration_minutes,
      notes: validatedInput.notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', validatedInput.id)
    .select()
    .single()
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  // Invalidate cache
  revalidatePath('/workouts')
  revalidatePath(`/workouts/${validatedInput.id}`)
  
  return { success: true, data }
}
```

**TanStack Query Hook for Single Workout:**
```typescript
// hooks/useWorkout.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { getWorkoutById } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/client'

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ['workout', id],
    queryFn: async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      return getWorkoutById(id, user.id)
    },
    staleTime: 30000,
  })
}
```

**Component Structure:**
- Server Component: `app/(dashboard)/workouts/[id]/page.tsx` (handles auth)
- Client Component: `WorkoutDetailClient` (manages view/edit mode toggle)
- Reusable Component: `WorkoutDetail` (displays workout in view mode)
- Reusable Component: `WorkoutForm` (edit mode, reused from Story 2.1)

**Data Flow:**
1. User navigates to `/workouts/[id]`
2. Server component checks auth
3. Client component uses `useWorkout(id)` hook to fetch workout
4. Display workout details in view mode
5. User clicks "Edit" → Toggle to edit mode
6. WorkoutForm renders with `defaultValues` pre-filled
7. User modifies fields → Submit
8. Call `updateWorkout` Server Action
9. On success → Redirect to view mode, show toast, invalidate cache
10. On error → Display error, stay on edit form

### Project Structure Notes

**Files to Create:**
- `app/(dashboard)/workouts/[id]/page.tsx` - Dynamic route for workout detail
- `components/workouts/WorkoutDetailClient.tsx` - Client component managing view/edit toggle
- `components/workouts/WorkoutDetail.tsx` - View mode display component
- `hooks/useWorkout.ts` - TanStack Query hook for single workout fetch

**Files to Modify:**
- `app/actions/workouts.ts` - Add `updateWorkout` Server Action
- `lib/supabase/queries.ts` - Add `getWorkoutById` query function
- `components/workouts/WorkoutForm.tsx` - Add support for edit mode with defaultValues
- `components/workouts/WorkoutCard.tsx` - Ensure navigation to detail page works

**Files to Reference (already exist):**
- `lib/types/workout.ts` - `Workout`, `UpdateWorkoutInput` types
- `lib/supabase/server.ts` - Server-side Supabase client
- `lib/supabase/client.ts` - Client-side Supabase client
- `components/ui/*` - shadcn/ui components

**TypeScript Types Needed:**
```typescript
// lib/types/workout.ts (add if not present)
export interface UpdateWorkoutInput {
  id: string;
  workout_date?: string;
  workout_type?: string;
  duration_minutes?: number;
  notes?: string;
}
```

### Testing Strategy

**Manual Testing (per project plan):**
1. Login as user → Navigate to "Workout History" → Click on a workout
2. Verify workout detail page displays all fields correctly
3. Click "Edit" button → Verify form appears with pre-filled data
4. Modify one or more fields → Click "Save"
5. Verify success toast appears
6. Verify redirect to detail page with updated data
7. Verify workout list also shows updated data (cache invalidation)
8. Test error cases:
   - Try to submit invalid data (e.g., negative duration) → Verify error message
   - Simulate network error → Verify error handling
9. Test "Cancel" button → Verify returns to view mode without saving
10. Test with different users → Verify RLS prevents editing other users' workouts

**Automated Testing (deferred to test epic):**
- Unit tests: `updateWorkout` Server Action behavior
- Component tests: WorkoutForm in edit mode renders correctly
- Integration tests: Full edit flow from detail page
- E2E tests: Edit workout end-to-end scenario

**Target:** Manual verification of all 6 acceptance criteria

### Dependencies and Integration

**Existing Dependencies (already in package.json):**
- `@supabase/supabase-js` (^2.86.0) - Database client ✅
- `@tanstack/react-query` (^5.90.11) - Client-side data fetching ✅
- `date-fns` (^4.1.0) - Date formatting ✅
- `react-hook-form` (^7.x) - Form state management ✅
- `zod` (^3.x) - Schema validation ✅
- `react` (^19.2.0), `next` (^16.0.5) - Framework ✅

**Integration Points:**
- Supabase database: Uses workouts table with RLS update policy
- TanStack Query: Invalidate both 'workout' and 'workouts' queries after update
- Form validation: Zod schema for UpdateWorkoutInput
- Routing: Dynamic route `/workouts/[id]` with Next.js App Router
- Navigation: `useRouter` from 'next/navigation' for redirects

### References

- [Source: docs/fase-2-plan/epics.md#Story-2.4:-Update-Workout]
- [Source: docs/sprint-artifacts/tech-spec-epic-2.md#APIs-and-Interfaces]
- [Source: docs/sprint-artifacts/tech-spec-epic-2.md#Workflows-and-Sequencing]
- [Source: docs/fase-3-solutioning/architecture.md#API-Pattern/Data-Fetching]
- [Source: docs/sprint-artifacts/2-2-view-workout-history.md#Dev-Agent-Record]

## Dev Agent Record

### Context Reference

- [Story Context XML](./2-4-update-workout.context.xml)

### Agent Model Used

<!-- To be filled by dev agent during implementation -->

### Debug Log References

<!-- To be filled by dev agent during implementation -->

### Completion Notes List

<!-- To be filled by dev agent during implementation -->

### File List

<!-- To be filled by dev agent during implementation -->

## Change Log

- **2025-12-02:** Initial draft generated for Story 2.4: Update Workout
