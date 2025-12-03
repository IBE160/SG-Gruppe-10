# Implementation Strategy: Stories 2.3 & 2.4

**Created:** 2025-12-02
**Status:** Ready for Implementation

---

## Current Situation

### Problem Identified
- **Story 2.3** (View Workout Details) was marked "done" but never implemented
- Clicking workout cards from history leads to **404 error** (route doesn't exist)
- **Story 2.4** (Update Workout) cannot be implemented without Story 2.3
- Both stories share the same page: `app/(dashboard)/workouts/[id]/page.tsx`

### What Was Missing
- ❌ No workout detail page route
- ❌ No Story 2.3 documentation files
- ✅ WorkoutCard navigation already implemented (just points to non-existent page)

---

## Recommended Implementation Approach

### Option 1: Sequential Implementation (RECOMMENDED)

**Step 1: Implement Story 2.3 First**
- Create simple view-only workout detail page
- Fix the 404 issue immediately
- Clean separation of concerns
- Easier to test and verify each story

**Step 2: Then Implement Story 2.4**
- Extend the detail page with edit mode
- Add toggle between view/edit states
- Implement update functionality

**Benefits:**
- ✅ Fixes 404 bug quickly
- ✅ Clear milestone completion
- ✅ Easier to debug and test
- ✅ Follows sprint workflow correctly
- ✅ Each story can be reviewed independently

**Timeline:**
- Story 2.3: ~1-2 hours (simple view page)
- Story 2.4: ~2-3 hours (edit mode + update logic)
- Total: ~3-5 hours

---

### Option 2: Combined Implementation

**Implement Stories 2.3 + 2.4 Together**
- Build the complete detail page with view and edit modes
- Mark both stories as done simultaneously

**Benefits:**
- ⚡ Faster overall delivery
- 🎯 Avoid modifying same file twice

**Drawbacks:**
- ⚠️ Larger scope increases risk
- ⚠️ Harder to isolate issues
- ⚠️ Doesn't follow story workflow
- ⚠️ Story 2.3 stays "broken" until both done

---

## Detailed Implementation Plan (Option 1)

### Phase 1: Story 2.3 - View Workout Details

**Goal:** Create working detail page to fix 404 issue

**Files to Create:**
```
app/(dashboard)/workouts/[id]/page.tsx          # Server Component
components/workouts/WorkoutDetail.tsx           # Display component
```

**Implementation Steps:**

1. **Create Dynamic Route** (`app/(dashboard)/workouts/[id]/page.tsx`)
   ```typescript
   - Server Component
   - Extract params.id
   - Auth check (redirect if not logged in)
   - Fetch workout with getWorkoutById(params.id, user.id)
   - Handle not found → notFound()
   - Render WorkoutDetail component
   ```

2. **Create Display Component** (`components/workouts/WorkoutDetail.tsx`)
   ```typescript
   - Accept workout prop
   - Display: type (heading), formatted date, duration, notes
   - Reuse formatDuration from WorkoutCard
   - Use date-fns for date formatting
   - Add "Back to History" button
   - Use shadcn/ui Card for styling
   ```

3. **Test Manually**
   - Click workout from history → Should show detail page ✅
   - Verify all fields display correctly
   - Test back navigation
   - Test invalid IDs → 404 page
   - Test mobile responsiveness

**Time Estimate:** 1-2 hours

**Acceptance Criteria:** All 6 ACs from Story 2.3 satisfied

---

### Phase 2: Story 2.4 - Update Workout

**Goal:** Add edit functionality to existing detail page

**Files to Modify:**
```
app/(dashboard)/workouts/[id]/page.tsx          # Add edit mode support
components/workouts/WorkoutDetail.tsx           # Add Edit button
components/workouts/WorkoutForm.tsx             # Extend for edit mode
```

**Files to Create:**
```
app/actions/workouts.ts                         # Add updateWorkout action
hooks/useWorkout.ts                             # TanStack Query hook
```

**Implementation Steps:**

1. **Add Update Server Action** (`app/actions/workouts.ts`)
   ```typescript
   - Create updateWorkout(input: UpdateWorkoutInput)
   - Validate with Zod (partial updates)
   - Auth check
   - Update in database
   - Return ActionResult
   - Call revalidatePath('/workouts') and revalidatePath(`/workouts/${id}`)
   ```

2. **Create TanStack Query Hook** (`hooks/useWorkout.ts`)
   ```typescript
   - useWorkout(id) hook
   - queryKey: ['workout', id]
   - queryFn: calls getWorkoutById
   - staleTime: 30000
   ```

3. **Convert Detail Page to Client Component**
   - Create WorkoutDetailClient component
   - Manage view/edit mode state
   - In view mode: show WorkoutDetail
   - In edit mode: show WorkoutForm with defaultValues

4. **Extend WorkoutForm Component**
   - Add defaultValues prop
   - Add mode prop: 'create' | 'edit'
   - Call updateWorkout when mode='edit'
   - Handle success/error

5. **Add Edit Button to WorkoutDetail**
   - Show Edit button
   - onClick → toggle to edit mode

6. **Test Manually**
   - View workout → Click Edit → Form appears pre-filled
   - Modify fields → Save → See updated data
   - Verify cache invalidation
   - Test validation errors
   - Test Cancel button

**Time Estimate:** 2-3 hours

**Acceptance Criteria:** All 6 ACs from Story 2.4 satisfied

---

## File Overview

### Story 2.3 Files

| File | Type | Status | Description |
|------|------|--------|-------------|
| `app/(dashboard)/workouts/[id]/page.tsx` | Server Component | NEW | Dynamic route for workout detail |
| `components/workouts/WorkoutDetail.tsx` | Component | NEW | Display workout information |
| `docs/sprint-artifacts/2-3-view-workout-details.md` | Documentation | ✅ CREATED | Story documentation |
| `docs/sprint-artifacts/2-3-view-workout-details.context.xml` | Context | ✅ CREATED | Technical context |

### Story 2.4 Files

| File | Type | Status | Description |
|------|------|--------|-------------|
| `app/(dashboard)/workouts/[id]/page.tsx` | Server Component | MODIFY | Add client component wrapper |
| `components/workouts/WorkoutDetail.tsx` | Component | MODIFY | Add Edit button |
| `components/workouts/WorkoutForm.tsx` | Component | MODIFY | Support edit mode |
| `app/actions/workouts.ts` | Server Action | MODIFY | Add updateWorkout |
| `hooks/useWorkout.ts` | Hook | NEW | TanStack Query for single workout |
| `docs/sprint-artifacts/2-4-update-workout.md` | Documentation | ✅ CREATED | Story documentation |
| `docs/sprint-artifacts/2-4-update-workout.context.xml` | Context | ✅ CREATED | Technical context |

---

## Testing Strategy

### Story 2.3 Testing
- [ ] Manual: Click workout from history → Detail page loads
- [ ] Manual: All fields display correctly
- [ ] Manual: Back button works
- [ ] Manual: Invalid ID → 404 page
- [ ] Manual: Mobile responsive

### Story 2.4 Testing
- [ ] Manual: Edit button appears on detail page
- [ ] Manual: Click Edit → Form pre-filled
- [ ] Manual: Save changes → Data updated
- [ ] Manual: Validation errors display
- [ ] Manual: Cancel returns to view mode
- [ ] Manual: Cache invalidation works

---

## Sprint Status Updates

### After Story 2.3 Implementation
```yaml
2-3-view-workout-details: done
```

### After Story 2.4 Implementation
```yaml
2-4-update-workout: done
```

---

## Next Steps

1. ✅ **DONE:** Created Story 2.3 documentation and context
2. ✅ **DONE:** Created Story 2.4 documentation and context
3. **TODO:** Implement Story 2.3 (fix 404 issue)
4. **TODO:** Test Story 2.3 thoroughly
5. **TODO:** Mark Story 2.3 as done
6. **TODO:** Implement Story 2.4 (add edit mode)
7. **TODO:** Test Story 2.4 thoroughly
8. **TODO:** Mark Story 2.4 as done

---

## Quick Start Commands

### To implement Story 2.3:
```bash
# Create the dynamic route
mkdir -p app/\(dashboard\)/workouts/[id]
touch app/\(dashboard\)/workouts/[id]/page.tsx

# Create the display component
touch components/workouts/WorkoutDetail.tsx
```

### To implement Story 2.4:
```bash
# Create the TanStack Query hook
touch hooks/useWorkout.ts

# Modify existing files for edit mode
# - app/(dashboard)/workouts/[id]/page.tsx
# - components/workouts/WorkoutDetail.tsx
# - components/workouts/WorkoutForm.tsx
# - app/actions/workouts.ts
```

---

## Summary

**Immediate Priority:** Story 2.3 (fixes 404 bug)

**Implementation Order:**
1. Story 2.3: View Workout Details (view-only page)
2. Story 2.4: Update Workout (add edit functionality)

**All documentation is ready** - both stories have complete story files and technical context XML with implementation guidance.

**Ready to start development!** 🚀
