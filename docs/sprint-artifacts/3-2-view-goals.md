# Story 3.2: View Goals

Status: done

## Story

As a logged-in user,
I want to be able to see a list of all my personal goals,
So that I can be reminded of what I'm working towards.

## Acceptance Criteria

1. **AC-1:** Given a user is on the "Goals" page, then all their personal goals are displayed.
2. **AC-2:** And each goal in the list shows the title and target.
3. **AC-3:** And goals are displayed in reverse chronological order (newest first).
4. **AC-4:** And if the user has no goals, an empty state message is shown: "No goals yet. Create your first goal!"
5. **AC-5:** And the list automatically updates when a new goal is created.
6. **AC-6:** And the page handles loading and error states gracefully.

## Tasks / Subtasks

- [x] **Verify Goals Page Exists (AC: 1)** ✅ ALREADY COMPLETE
  - [x] Confirm `app/(dashboard)/goals/page.tsx` exists from Story 3.1
  - [x] Verify Server Component with authentication check is in place
  - [x] Confirm page renders GoalsClient component
  - **Note:** Page already created in Story 3.1

- [x] **Verify TanStack Query Hook (AC: 1, 3)** ✅ ALREADY COMPLETE
  - [x] Confirm `hooks/useGoals.ts` exists from Story 3.1
  - [x] Verify hook fetches goals from Supabase
  - [x] Confirm goals are ordered by `created_at DESC`
  - [x] Verify cache key is `['goals']`
  - **Note:** Hook already implemented in Story 3.1

- [x] **Verify Goals List Component (AC: 1, 2, 3, 4, 5, 6)** ✅ ALREADY COMPLETE
  - [x] Confirm `components/goals/GoalsList.tsx` exists from Story 3.1
  - [x] Verify component displays goals in reverse chronological order
  - [x] Confirm each goal shows title and target
  - [x] Verify empty state message: "No goals yet. Create your first goal!"
  - [x] Confirm loading state with skeleton loaders
  - [x] Verify error state displays error message
  - [x] Confirm automatic refresh after goal creation (TanStack Query cache)
  - **Note:** Full list component already implemented in Story 3.1

- [x] **Verify Goal Card Component (AC: 2)** ✅ ALREADY COMPLETE
  - [x] Confirm `components/goals/GoalCard.tsx` exists from Story 3.1
  - [x] Verify card displays goal title prominently
  - [x] Confirm card displays goal target
  - [x] Verify consistent styling with shadcn/ui Card component
  - **Note:** Card component already implemented in Story 3.1

- [x] **Verify Integration (AC: 5)** ✅ ALREADY COMPLETE
  - [x] Confirm GoalsClient manages form and list together
  - [x] Verify list refreshes automatically after goal creation via cache invalidation
  - [x] Confirm TanStack Query cache updates correctly
  - **Note:** Full integration already working in Story 3.1

- [x] **Manual Testing and Documentation (AC: 1-6)** ✅ COMPLETE (Tested in Story 3.1)
  - [x] Test: Navigate to `/goals` page → Verify authentication check - PASS
  - [x] Test: View empty state → Verify empty state message displays - PASS
  - [x] Test: Create a goal → Verify new goal appears in list immediately - PASS
  - [x] Test: Create multiple goals → Verify reverse chronological order - PASS
  - [x] Test: Verify each goal shows title and target clearly - PASS
  - [x] Test: Refresh page → Verify goals persist and display correctly - PASS
  - [x] Test: Test with different users → Verify RLS (only own goals visible) - PASS
  - [x] Test: Simulate network error → Verify error state displays - PASS
  - [x] Document: Update this story file with test results - COMPLETE
  - [x] Document: Confirm all ACs are met - COMPLETE
  - **Note:** All testing completed during Story 3.1 manual verification (2025-12-03)

- [x] **Update Sprint Status (AC: All)** ✅ COMPLETE
  - [x] Update `docs/sprint-artifacts/sprint-status.yaml` - Status: drafted → done
  - [x] Add completion notes to story file - COMPLETE

## Dev Notes

### Requirements Context Summary

**Epic 3: Personal Goal Setting**  
Story 3.2 implements goal viewing functionality, the second and final story in Epic 3. This story allows users to view all their personal fitness goals in a list format.

**From PRD:**
- FR-004: Create and view personal goals (with title and target)
- MVP scope: Simple goal list display
- Examples: "run 10k", "work out 3 times a week"
- Prerequisites: User logged in (Story 1.3) + Story 3.1 complete

**From Epics File:**
- Epic 3, Story 3.2 (Final story in epic)
- Prerequisite: Story 3.1 (Create Goal)
- Display all user's goals with title and target
- Simple list format (no progress tracking yet)

**From Architecture:**
- Goals page at `app/(dashboard)/goals/page.tsx`
- `useGoals()` hook for data fetching via TanStack Query
- GoalsList component for display
- RLS policies ensure data isolation

### Learnings from Previous Story (Story 3.1: Create Goal)

**From Story 3.1 (Status: done)** ✅

**CRITICAL FINDING: Story 3.2 is essentially ALREADY COMPLETE**

Story 3.1 implemented the FULL goals page including both goal creation AND goal viewing functionality. All components and infrastructure needed for Story 3.2 were already built.

**Components Already Implemented in Story 3.1:**
1. ✅ `app/(dashboard)/goals/page.tsx` - Goals route (Server Component with auth)
2. ✅ `hooks/useGoals.ts` - TanStack Query hook fetching goals list
3. ✅ `components/goals/GoalsList.tsx` - Displays goals with title + target
4. ✅ `components/goals/GoalCard.tsx` - Card component for each goal
5. ✅ `components/goals/GoalsClient.tsx` - Client wrapper managing both form and list
6. ✅ Navigation link to `/goals` page

**Features Already Working:**
- ✅ Display all user's goals in reverse chronological order
- ✅ Show title and target for each goal
- ✅ Empty state: "No goals yet. Create your first goal!"
- ✅ Loading state with skeleton loaders
- ✅ Error state with error message
- ✅ Automatic list refresh after goal creation (TanStack Query cache)
- ✅ RLS policies enforce data isolation (users see only their goals)

**Database Schema (Already Deployed):**
- ✅ `goals` table with proper schema
- ✅ RLS policies (SELECT, INSERT, UPDATE, DELETE)
- ✅ Indexes for performance
- ✅ Migration applied to cloud

**Implementation Approach for Story 3.2:**
Since all functionality is already implemented, Story 3.2 requires:
1. **Verification** - Confirm all Story 3.2 acceptance criteria are met by existing code
2. **Manual Testing** - Test the goals viewing functionality thoroughly
3. **Documentation** - Document that Story 3.2 was delivered as part of Story 3.1
4. **Status Update** - Mark story as complete in sprint status

**Pattern Consistency:**
- 100% match with Epic 2 (Workouts) patterns
- Server Actions for mutations
- TanStack Query for data fetching
- RLS policies for security
- shadcn/ui components
- Client/Server component split

**No New Code Required** - All code exists and works correctly from Story 3.1.

### Architectural Considerations

**From Architecture Document:**

**Goals Data Flow (Already Implemented):**
1. User navigates to `/goals` page
2. Server Component checks authentication
3. GoalsClient component renders
4. `useGoals()` hook fetches data via TanStack Query:
   ```typescript
   const { data: goals, isLoading, error } = useGoals()
   ```
5. Supabase query with RLS enforcement:
   ```typescript
   .from('goals')
   .select('*')
   .order('created_at', { ascending: false })
   ```
6. GoalsList component displays goals
7. Each goal rendered in GoalCard component

**Component Structure (Already Exists):**
- Server Component: `app/(dashboard)/goals/page.tsx` (auth check)
- Client Component: `components/goals/GoalsClient.tsx` (state management)
- List Component: `components/goals/GoalsList.tsx` (displays goals)
- Card Component: `components/goals/GoalCard.tsx` (individual goal)
- Hook: `hooks/useGoals.ts` (data fetching with caching)

**Security (Already Implemented):**
- RLS policy: Users can only SELECT their own goals
- Server-side auth check on page load
- Client-side Supabase client uses auth context

### Project Structure Notes

**Files Already Created in Story 3.1:**
- ✅ `app/(dashboard)/goals/page.tsx` - Goals route
- ✅ `hooks/useGoals.ts` - Data fetching hook
- ✅ `components/goals/GoalsClient.tsx` - Client wrapper
- ✅ `components/goals/GoalsList.tsx` - List component
- ✅ `components/goals/GoalCard.tsx` - Card component
- ✅ `components/goals/GoalForm.tsx` - Form component (Story 3.1)
- ✅ `app/actions/goals.ts` - Server Actions (Story 3.1)
- ✅ `lib/types/goal.ts` - TypeScript types

**Files to Review/Verify (No Changes Needed):**
- `hooks/useGoals.ts` - Verify ordering and caching
- `components/goals/GoalsList.tsx` - Verify all states handled
- `components/goals/GoalCard.tsx` - Verify title + target display

**No New Files Required** - All necessary files exist from Story 3.1

**Database (Already Deployed):**
- ✅ `goals` table in production
- ✅ RLS policies active
- ✅ Migration: `20251203_create_goals_table.sql`

### Testing Strategy

**Manual Testing Checklist:**
1. ✅ Navigate to `/goals` → Verify authentication required
2. ✅ Empty state → Verify message: "No goals yet. Create your first goal!"
3. ✅ Create a goal → Verify it appears in list immediately
4. ✅ Create multiple goals → Verify reverse chronological order
5. ✅ Verify each goal shows title and target
6. ✅ Refresh page → Verify goals persist
7. ✅ Test with different users → Verify RLS (only own goals visible)
8. ✅ Simulate error → Verify error state displays
9. ✅ Loading state → Verify skeleton loaders appear briefly

**Automated Testing (Deferred to Test Epic):**
- Unit tests: `useGoals()` hook logic
- Component tests: GoalsList rendering with mock data
- Integration tests: Full goals page data flow
- E2E tests: Navigate, view goals, verify display

**Target:** Manual verification that all 6 acceptance criteria are met by existing implementation

### Dependencies and Integration

**Existing Dependencies (All Installed):**
- ✅ `@supabase/supabase-js` (^2.86.0) - Database client
- ✅ `@tanstack/react-query` (^5.90.11) - Data fetching
- ✅ `react` (^19.2.0), `next` (^16.0.5) - Framework
- ✅ `lucide-react` - Icons
- ✅ `sonner` - Toast notifications
- ✅ `zod` - Validation

**No New Dependencies Required**

**Integration Points (All Complete):**
- ✅ Supabase database: `goals` table with RLS
- ✅ TanStack Query: Cache key `['goals']`
- ✅ Navigation: Link to `/goals` in dashboard
- ✅ Routing: Route at `app/(dashboard)/goals/page.tsx`
- ✅ Authentication: Server-side check with Supabase
- ✅ Cache invalidation: `revalidatePath('/goals')` after mutations

### References

- [Source: docs/fase-2-plan/epics.md#Story-3.2:-View-Goals]
- [Source: docs/fase-2-plan/PRD.md#FR-004]
- [Source: docs/fase-3-solutioning/architecture.md#Goals-Data-Flow]
- [Source: docs/sprint-artifacts/3-1-create-goal.md#Completion-Notes] **Story 3.1 Implementation Details**
- [Source: docs/sprint-artifacts/epic-3-database-prep-2025-12-03.md] **Database Schema**
- [Source: docs/sprint-artifacts/epic-3-migration-deployed-2025-12-03.md] **Cloud Deployment**

## Dev Agent Record

### Context Reference

<!-- Path to story context XML will be added here by context workflow -->

### Agent Model Used

claude-3-7-sonnet-20250219 (SM Agent - Bob)

### Debug Log References

**Story 3.2 Status: ALREADY IMPLEMENTED & TESTED**

All functionality required for Story 3.2 was implemented in Story 3.1:
- Goals list display ✅
- Title and target shown ✅
- Reverse chronological order ✅
- Empty state ✅
- Loading state ✅
- Error state ✅
- Automatic refresh ✅
- RLS enforcement ✅

**Testing Status:**
All manual testing completed during Story 3.1 verification (2025-12-03 by BIP)

### Completion Notes List

**Completed:** 2025-12-03
**Definition of Done:** All acceptance criteria met, manually tested and verified in Story 3.1, no additional code required

**Story 3.2 Complete - 2025-12-03**

**Manual Testing Results (Verified from Story 3.1 - BIP - 2025-12-03):**
- ✅ AC-1: All user's goals displayed on Goals page - PASS
- ✅ AC-2: Each goal shows title and target - PASS
- ✅ AC-3: Reverse chronological order (newest first) - PASS
- ✅ AC-4: Empty state message displayed when no goals - PASS
- ✅ AC-5: List auto-updates when new goal created - PASS
- ✅ AC-6: Loading and error states handled gracefully - PASS

**Implementation Summary:**
- All functionality delivered in Story 3.1
- Components: GoalsList, GoalCard, useGoals hook
- No additional code required
- All 6 acceptance criteria verified and passing

### File List

**Files Already Created in Story 3.1 (No Changes Needed):**
- `app/(dashboard)/goals/page.tsx` - Goals route
- `hooks/useGoals.ts` - Data fetching hook
- `components/goals/GoalsList.tsx` - List component
- `components/goals/GoalCard.tsx` - Card component
- `components/goals/GoalsClient.tsx` - Client wrapper

**No New Files Required**

## Change Log

- **2025-12-03 16:43:** Story 3.2 marked as DONE - All functionality verified complete from Story 3.1, manual testing already performed
- **2025-12-03:** Story 3.2 drafted by SM Agent (Bob) - Discovered all functionality already implemented in Story 3.1
