# Story 4.4: Workouts Visual Polish

Status: ready-for-dev

## Story

As a FitTrack user,
I want to see my workouts displayed with attractive cards and visual styling,
So that reviewing my workout history is enjoyable and easy to scan.

## Acceptance Criteria

1. **AC-1:** Given I view my workout history or workout details, when the page loads, then workout cards have primary green backgrounds (#22c55e) with white text.
2. **AC-2:** And cards display workout icon, title, date, and summary metrics prominently.
3. **AC-3:** And cards use rounded corners (rounded-xl) for modern appearance.
4. **AC-4:** And the list is easy to scan with clear visual hierarchy.
5. **AC-5:** And the design matches workout-history-dashboard.html mockup from UX specification.

## Tasks / Subtasks

- [ ] **Refactor WorkoutCard Component (AC: 1, 2, 3, 4)**
  - [ ] Update `components/workouts/WorkoutCard.tsx`
  - [ ] Apply primary green background (bg-primary-green #22c55e)
  - [ ] Set text color to white (text-white)
  - [ ] Add rounded corners (rounded-xl)
  - [ ] Update card layout to display:
    - [ ] Workout icon using WorkoutIcon component (top-left or left side)
    - [ ] Workout title/type (prominent, font-semibold)
    - [ ] Workout date (formatted, secondary text)
    - [ ] Duration in minutes (with icon or label)
    - [ ] Optional: Calories or other summary metric
  - [ ] Add padding and spacing for comfortable touch targets (p-4 or p-6)
  - [ ] Ensure card is responsive (full-width on mobile, constrained on desktop)
  - [ ] Add subtle shadow for depth (shadow-md)
  - [ ] Unit test: Verify card renders with green background and white text

- [ ] **Update Workout History Page (AC: 4, 5)**
  - [ ] Update `app/(dashboard)/workouts/page.tsx` or workout history route
  - [ ] Apply updated WorkoutCard component to workout list
  - [ ] Ensure list layout uses proper spacing (gap-4)
  - [ ] Add visual hierarchy:
    - [ ] Group workouts by date (optional: "Today", "Yesterday", date headers)
    - [ ] Use consistent card sizes
    - [ ] Add loading skeleton states using shadcn/ui Skeleton
  - [ ] Ensure empty state is styled appropriately
  - [ ] Add page header with AppHeader component (from Story 4.1)
  - [ ] Verify BottomNav integration (active tab: "Workouts")

- [ ] **Update Workout Details Page (AC: 1, 2, 3, 4, 5)**
  - [ ] Update workout details page (e.g., `app/(dashboard)/workouts/[id]/page.tsx`)
  - [ ] Apply primary green card styling to workout details view
  - [ ] Display workout information in enhanced layout:
    - [ ] Large workout icon at top
    - [ ] Workout title (text-2xl, font-bold, text-white)
    - [ ] Date and time (text-graphite-100, secondary)
    - [ ] Duration, type, and other metrics in stat-card style
    - [ ] Notes section with readable typography
  - [ ] Add action buttons (Edit, Delete) with appropriate styling
    - [ ] Edit button: outline style or secondary color
    - [ ] Delete button: red or warning style
  - [ ] Ensure responsive design (mobile-first)
  - [ ] Verify back button in AppHeader navigates to workout history

- [ ] **Enhance WorkoutIcon Component (AC: 2)**
  - [ ] Verify `components/workouts/WorkoutIcon.tsx` exists (from Story 4.2)
  - [ ] If not, create WorkoutIcon component:
    - [ ] Map workout types to Material Symbols icons:
      - [ ] "Running" → 'directions_run'
      - [ ] "Cycling" → 'directions_bike'
      - [ ] "Swimming" → 'pool'
      - [ ] "Strength" → 'fitness_center'
      - [ ] "Yoga" → 'self_improvement'
      - [ ] Default → 'fitness_center' (generic fitness icon)
    - [ ] Accept props: `type` (string), `size` (optional, default 'medium'), `className` (optional)
    - [ ] Render MaterialIcon with appropriate icon
    - [ ] Support size variants: small (text-xl), medium (text-3xl), large (text-5xl)
  - [ ] Update workout cards to use WorkoutIcon
  - [ ] Unit test: Verify icon mapping and rendering

- [ ] **Add Workout Type Icons to All Workout Displays (AC: 2, 4)**
  - [ ] Workout history list: Display icon next to each workout card
  - [ ] Workout details page: Display large icon at top
  - [ ] Create workout form (if visible): Display icon preview
  - [ ] Ensure icons are visually consistent across all pages
  - [ ] Use MaterialIcon component with appropriate colors:
    - [ ] On green background: text-white
    - [ ] On white/graphite background: text-primary-green

- [ ] **Apply Responsive Design Patterns (AC: 3, 4, 5)**
  - [ ] Mobile (320px-640px):
    - [ ] Full-width cards with proper padding
    - [ ] Single-column layout
    - [ ] Large touch targets for interactive elements
    - [ ] Readable font sizes (min text-base)
  - [ ] Tablet (641px-1024px):
    - [ ] Consider 2-column grid layout (optional)
    - [ ] Maintain comfortable card spacing
  - [ ] Desktop (1025px+):
    - [ ] Max-width constraint (max-w-4xl or similar)
    - [ ] Centered layout
    - [ ] Larger cards with more spacing

- [ ] **Loading and Empty States (AC: 4)**
  - [ ] Add loading skeleton for workout list (shadcn/ui Skeleton)
  - [ ] Style empty state:
    - [ ] Display MaterialIcon 'fitness_center' in graphite-300
    - [ ] Message: "No workouts yet. Start logging your fitness journey!"
    - [ ] Call-to-action button: "Log Your First Workout" (primary green)
  - [ ] Loading skeleton should match card dimensions
  - [ ] Ensure smooth transitions when data loads

- [ ] **Ensure Existing Functionality Preserved (AC: All)**
  - [ ] Verify Server Actions still work (create, update, delete workout)
  - [ ] Verify TanStack Query mutations and queries work
  - [ ] Test: Create workout → Verify appears in history with new styling
  - [ ] Test: Edit workout → Verify changes save and display correctly
  - [ ] Test: Delete workout → Verify removes from list
  - [ ] Test: Click workout card → Verify navigates to details page
  - [ ] Ensure no regressions in data flow or state management

- [ ] **Color Theme Consistency (AC: 1)**
  - [ ] Primary green (#22c55e) used for:
    - [ ] Workout card backgrounds
    - [ ] Icon colors on non-green backgrounds
    - [ ] Action button primary states
    - [ ] Active workout indicators
  - [ ] White used for:
    - [ ] Text on green backgrounds
    - [ ] Icons on green backgrounds
  - [ ] Graphite shades used for:
    - [ ] Page backgrounds (bg-graphite-50)
    - [ ] Secondary text (text-graphite-700, text-graphite-600)
    - [ ] Empty state icons (text-graphite-300)
    - [ ] Card shadows and borders (if needed)

- [ ] **Typography Application (AC: 4)**
  - [ ] Workout title: font-semibold or font-bold, text-lg or text-xl
  - [ ] Date/time: font-normal, text-sm, opacity-90 or text-graphite-100
  - [ ] Duration/metrics: font-medium, text-base
  - [ ] Notes: font-normal, text-sm or text-base
  - [ ] Use Lexend font family (inherited from layout)
  - [ ] Ensure consistent spacing and line-height

- [ ] **Manual Testing & Verification (AC: All)**
  - [ ] Test: Visit /workouts (or workout history route) → Verify cards have green background
  - [ ] Test: Verify workout cards display icon, title, date, duration
  - [ ] Test: Verify cards use rounded-xl corners
  - [ ] Test: Verify cards have white text on green background
  - [ ] Test: Verify list is easy to scan with clear visual hierarchy
  - [ ] Test: Click workout card → Verify navigates to details page
  - [ ] Test: View workout details → Verify green card styling applied
  - [ ] Test: Verify workout icons display correctly for different workout types
  - [ ] Test: Verify empty state displays if no workouts exist
  - [ ] Test: Create new workout → Verify appears in list with new styling
  - [ ] Test: Edit workout → Verify changes reflected in card
  - [ ] Test: Delete workout → Verify removes from list
  - [ ] Test: Verify mobile responsiveness (320px, 375px, 414px)
  - [ ] Test: Verify tablet responsiveness (768px, 1024px)
  - [ ] Test: Verify desktop responsiveness (1280px, 1920px)
  - [ ] Test: Verify loading states display skeleton correctly
  - [ ] Test: Verify no console errors or warnings
  - [ ] Test: Tab through interactive elements → Verify logical tab order
  - [ ] Test: Run Lighthouse audit (Accessibility ≥ 95, Performance ≥ 90)
  - [ ] Test: Compare to workout-history-dashboard.html mockup → Verify visual match

- [ ] **Accessibility Improvements (AC: All)**
  - [ ] Ensure workout cards have semantic HTML (article or div with role)
  - [ ] Add aria-label to icon-only elements if needed
  - [ ] Ensure sufficient color contrast (white on green #22c55e)
  - [ ] Verify focus indicators are visible (ring-2 ring-white or ring-graphite-900)
  - [ ] Ensure keyboard navigation works (Tab, Enter to view details)
  - [ ] Add sr-only labels if additional context needed for screen readers
  - [ ] Test with screen reader (if possible)

## Dev Notes

### Requirements Context Summary

**Epic 4: UX Visual Polish**  
Story 4.4 focuses on transforming the workout history and details pages from functional lists into visually engaging, card-based displays that use the primary green color theme and make workout tracking feel rewarding and motivating.

**From Epics File (Epic 4, Story 4.4):**
- Prerequisites: Story 4.2 (Dashboard Visual Polish) complete
- Workout cards have green backgrounds with white text
- Cards display workout icon, title, date, and summary metrics
- Cards use rounded corners (rounded-xl) for modern appearance
- List is easy to scan with clear visual hierarchy
- Design matches workout-history-dashboard.html mockup
- Technical Notes: Refactor WorkoutCard component, maintain existing Server Actions and data flow

**From Tech Spec (Epic 4):**
- Refactor WorkoutCard component to use primary green background (#22c55e)
- Update workout list and details pages with new styling
- Consider adding WorkoutCalendar component (optional)
- Maintain existing Server Actions and data flow (no backend changes)
- No database schema changes required
- Mobile-first responsive design

**Key Design Decisions:**
1. **Card Styling**: Primary green background with white text, rounded-xl corners, shadow-md
2. **Icon Usage**: WorkoutIcon component maps workout types to Material Symbols
3. **Visual Hierarchy**: Clear separation between title, date, and metrics
4. **Layout**: Card-based list with consistent spacing (gap-4)
5. **Empty State**: Friendly message with CTA button to create first workout
6. **Loading State**: Skeleton matching card dimensions
7. **Responsive**: Full-width cards on mobile, constrained on desktop with centered layout

### Learnings from Previous Story (Story 4.3: Authentication Pages Visual Polish)

**From Story 4.3 (Status: done)** ✅

**Component Patterns Established:**
- ✅ MaterialIcon wrapper component works reliably - use for all workout icons
- ✅ Color theme variables working correctly (primary-green #22c55e, graphite shades)
- ✅ Lexend font loaded and optimized globally
- ✅ Mobile-first responsive design approach successful
- ✅ IconInput pattern with left-aligned icons (reuse pattern concept for workout cards)
- ✅ Loading states with spinner animation proven effective
- ✅ Accessibility patterns (sr-only labels, aria-describedby) working well

**Files Available for Reuse:**
- `components/ui/MaterialIcon.tsx` - Use for workout type icons
- `components/ui/button.tsx` - Use for action buttons (Edit, Delete, Create)
- `components/ui/skeleton.tsx` - Use for loading skeletons (shadcn/ui)
- `app/globals.css` - Color variables already defined (primary-green, graphite)
- `components/common/AppHeader.tsx` - Use for page headers (from Story 4.1)
- `components/common/BottomNav.tsx` - Ensure "Workouts" tab active (from Story 4.1)

**Key Patterns to Reuse:**
1. **Color Application**: `bg-primary-green`, `text-white`, `text-graphite-700`
2. **Rounded Corners**: `rounded-xl` for cards, `rounded-lg` for buttons
3. **Spacing**: `gap-4` for lists, `p-4` or `p-6` for card padding
4. **Typography**: `font-semibold` for titles, `font-normal` for body, Lexend font
5. **Shadows**: `shadow-md` or `shadow-lg` for card depth
6. **Loading States**: shadcn/ui Skeleton component with appropriate dimensions
7. **Empty States**: MaterialIcon with friendly message and CTA button

**Technical Debt from Story 4.3:**
- None related to workout pages - Story 4.3 was auth-focused

**Warnings/Recommendations:**
- ✅ Continue mobile-first responsive design approach (proven successful)
- ✅ Maintain TypeScript strictness (no build errors)
- ✅ Ensure no regressions in existing workout functionality (Server Actions, TanStack Query)
- 🔧 **Important**: Test color contrast for white text on primary green (#22c55e) - ensure WCAG AA compliance

**New Services/Patterns Created in Story 4.2 (Dashboard):**
- Dashboard components: StatCard, GoalProgressCard, RecentActivityCard, WorkoutIcon
- *Note: WorkoutIcon component may already exist from Story 4.2 - verify before creating*
- Dashboard queries: getWeeklyStats, getGoalsWithProgress, getRecentWorkouts
- Empty state pattern with CTAs (reuse for workout empty state)
- Loading skeleton pattern (reuse for workout list loading)

**Files Modified in Story 4.3 (Auth Pages):**
- `app/(auth)/login/page.tsx` - Not relevant to workouts
- `app/(auth)/signup/page.tsx` - Not relevant to workouts
- *Note: No conflicts expected with workout pages*

**Relevant Architecture from Previous Stories:**
- Color theme consistently applied across Stories 4.1, 4.2, 4.3
- MaterialIcon usage proven across multiple components
- shadcn/ui component integration smooth
- Mobile responsiveness approach successful
- AppHeader and BottomNav established in Story 4.1 (reuse for workout pages)

### Project Structure Notes

**Existing Files to Modify:**
- `components/workouts/WorkoutCard.tsx` - Update with green styling (if exists, else create)
- `app/(dashboard)/workouts/page.tsx` - Workout history page (verify exact path)
- `app/(dashboard)/workouts/[id]/page.tsx` - Workout details page (verify exact path)

**Files to Create (if not exist):**
- `components/workouts/WorkoutIcon.tsx` - Icon mapping component (may exist from Story 4.2)

**Dependencies (Already Installed):**
- `next` (^16.0.5) - App Router ✅
- `react` (^19.2.0) - Component library ✅
- `tailwindcss` (^4.0+) - Styling ✅
- `shadcn/ui` - Skeleton, Button components ✅
- `material-symbols` - Icons ✅
- `@tanstack/react-query` - Data fetching ✅
- `@supabase/supabase-js` - Database (workouts table) ✅

**No New Dependencies Required** ✅

**Expected Workout Route Structure:**
```
app/
├── (dashboard)/
│   ├── workouts/
│   │   ├── page.tsx (Workout History - TO BE UPDATED)
│   │   ├── [id]/
│   │   │   └── page.tsx (Workout Details - TO BE UPDATED)
│   │   └── new/
│   │       └── page.tsx (Create Workout - OPTIONAL UPDATE)

components/
├── workouts/
│   ├── WorkoutCard.tsx (TO BE UPDATED)
│   ├── WorkoutIcon.tsx (VERIFY/CREATE)
│   └── [other workout components]
├── ui/
│   ├── MaterialIcon.tsx (REUSE)
│   ├── skeleton.tsx (REUSE - shadcn)
│   └── button.tsx (REUSE - shadcn)
├── common/
│   ├── AppHeader.tsx (REUSE - Story 4.1)
│   └── BottomNav.tsx (REUSE - Story 4.1)
```

### Architectural Considerations

**Data Flow (Unchanged):**
- Workout data fetched via TanStack Query from Supabase
- Server Actions for create, update, delete operations
- Real-time updates via TanStack Query cache invalidation
- *Note: Only visual changes in this story, no data logic changes*

**Component Architecture:**
- WorkoutCard: Server Component (no interactivity, pure display) OR Client Component if needs click handler
- WorkoutIcon: Server Component (pure display based on workout type)
- Workout History Page: Server Component with Client Components for interactive elements
- Workout Details Page: Server Component with Client Components for Edit/Delete buttons

**Existing Workout Data Model (No Changes):**
```typescript
// Workout table schema (from Supabase)
type Workout = {
  id: string;
  user_id: string;
  date: string; // ISO date
  type: string; // e.g., "Running", "Cycling", "Strength"
  duration: number; // minutes
  notes?: string;
  created_at: string;
  // Potentially: calories, distance, etc.
}
```

**WorkoutCard Implementation Pattern:**
```typescript
// WorkoutCard.tsx
interface WorkoutCardProps {
  workout: Workout;
  onClick?: () => void; // Navigate to details
}

export function WorkoutCard({ workout, onClick }: WorkoutCardProps) {
  return (
    <article 
      onClick={onClick}
      className="bg-primary-green text-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex items-start gap-4">
        <WorkoutIcon type={workout.type} size="large" className="text-white" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{workout.type}</h3>
          <p className="text-sm opacity-90">{formatDate(workout.date)}</p>
          <p className="text-base mt-2">{workout.duration} minutes</p>
        </div>
      </div>
      {workout.notes && (
        <p className="text-sm mt-4 opacity-80 line-clamp-2">{workout.notes}</p>
      )}
    </article>
  );
}
```

**WorkoutIcon Implementation Pattern:**
```typescript
// WorkoutIcon.tsx
interface WorkoutIconProps {
  type: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const iconMap: Record<string, string> = {
  'Running': 'directions_run',
  'Cycling': 'directions_bike',
  'Swimming': 'pool',
  'Strength': 'fitness_center',
  'Yoga': 'self_improvement',
  // Add more mappings as needed
};

export function WorkoutIcon({ type, size = 'medium', className }: WorkoutIconProps) {
  const iconName = iconMap[type] || 'fitness_center'; // Default icon
  const sizeClass = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl',
  }[size];
  
  return <MaterialIcon icon={iconName} className={`${sizeClass} ${className}`} />;
}
```

**Workout History Page Pattern:**
```typescript
// app/(dashboard)/workouts/page.tsx
export default async function WorkoutsPage() {
  // Fetch workouts via Server Component or TanStack Query
  const workouts = await getWorkouts(); // Server Action or query
  
  return (
    <div className="min-h-screen bg-graphite-50">
      <AppHeader title="Workout History" showBackButton={false} />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {workouts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {workouts.map(workout => (
              <WorkoutCard 
                key={workout.id} 
                workout={workout}
                onClick={() => router.push(`/workouts/${workout.id}`)}
              />
            ))}
          </div>
        )}
      </main>
      
      <BottomNav activeTab="workouts" />
    </div>
  );
}
```

**Workout Details Page Pattern:**
```typescript
// app/(dashboard)/workouts/[id]/page.tsx
export default async function WorkoutDetailsPage({ params }: { params: { id: string } }) {
  const workout = await getWorkoutById(params.id);
  
  return (
    <div className="min-h-screen bg-graphite-50">
      <AppHeader 
        title="Workout Details" 
        showBackButton={true}
        actionButton={{ icon: 'edit', onClick: () => router.push(`/workouts/${params.id}/edit`), label: 'Edit' }}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-primary-green text-white rounded-xl p-8 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <WorkoutIcon type={workout.type} size="large" className="text-white mb-4" />
            <h1 className="text-3xl font-bold">{workout.type}</h1>
            <p className="text-graphite-100 text-sm mt-1">{formatDate(workout.date)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm opacity-80">Duration</p>
              <p className="text-2xl font-semibold">{workout.duration} min</p>
            </div>
            {/* Add more metrics as needed */}
          </div>
          
          {workout.notes && (
            <div>
              <p className="text-sm opacity-80 mb-2">Notes</p>
              <p className="text-base">{workout.notes}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button variant="outline" className="flex-1" onClick={handleEdit}>
            <MaterialIcon icon="edit" /> Edit
          </Button>
          <Button variant="destructive" className="flex-1" onClick={handleDelete}>
            <MaterialIcon icon="delete" /> Delete
          </Button>
        </div>
      </main>
      
      <BottomNav activeTab="workouts" />
    </div>
  );
}
```

### Testing Strategy

**Manual Testing Checklist:**

**Visual Design:**
1. Visit /workouts → Verify workout cards have primary green background (#22c55e)
2. Verify card text is white and readable
3. Verify cards use rounded-xl corners
4. Verify cards have shadow-md for depth
5. Verify workout icon displays correctly (type-specific)
6. Verify workout title is prominent (font-semibold, text-lg/xl)
7. Verify date is formatted and visible (secondary text)
8. Verify duration displays correctly (with "minutes" or icon)
9. Verify card padding is comfortable (p-6 or similar)
10. Verify list spacing is consistent (gap-4)

**Workout Details Page:**
11. Click workout card → Verify navigates to details page
12. Verify details page has green card styling
13. Verify large workout icon at top center
14. Verify workout title is prominent (text-2xl/3xl, font-bold)
15. Verify date and time displayed clearly
16. Verify duration and metrics in stat-card style
17. Verify notes section is readable
18. Verify Edit and Delete buttons are styled appropriately

**Workout Icon Mapping:**
19. Create workout of type "Running" → Verify icon is 'directions_run'
20. Create workout of type "Cycling" → Verify icon is 'directions_bike'
21. Create workout of type "Swimming" → Verify icon is 'pool'
22. Create workout of type "Strength" → Verify icon is 'fitness_center'
23. Create workout of type "Yoga" → Verify icon is 'self_improvement'
24. Create workout of unknown type → Verify default icon displays

**Visual Hierarchy:**
25. Verify workout title is most prominent element
26. Verify date is secondary to title but clearly visible
27. Verify duration and metrics are easily scannable
28. Verify notes are visible but not overpowering
29. Verify icon adds visual interest without cluttering

**Empty State:**
30. Delete all workouts or view as new user → Verify empty state displays
31. Verify empty state icon is visible (fitness_center in graphite-300)
32. Verify empty state message is friendly and motivating
33. Verify "Log Your First Workout" CTA button displays
34. Click CTA button → Verify navigates to create workout page

**Loading States:**
35. Refresh workout history → Verify loading skeleton displays
36. Verify skeleton matches card dimensions
37. Verify skeleton is styled appropriately (animated)
38. Verify smooth transition when data loads

**Responsive Design:**
39. Mobile (320px) → Verify cards are full-width with proper padding
40. Mobile (375px) → Verify cards display correctly without horizontal overflow
41. Tablet (768px) → Verify cards maintain comfortable spacing
42. Desktop (1024px) → Verify cards are constrained (max-w-4xl or similar)
43. Desktop (1920px) → Verify layout is centered and doesn't stretch excessively

**Color Theme:**
44. Verify primary green (#22c55e) used for card backgrounds
45. Verify white used for text on green backgrounds
46. Verify graphite-50 used for page background
47. Verify graphite shades used for secondary text and empty state
48. Verify color contrast meets WCAG AA (white on green ≥ 4.5:1)

**Typography:**
49. Verify Lexend font is applied to all text elements
50. Verify workout title uses font-semibold or font-bold
51. Verify date/time uses font-normal with appropriate size
52. Verify duration uses font-medium
53. Verify notes use font-normal with readable line-height

**Functionality (No Regressions):**
54. Test: Create new workout → Verify appears in list with new styling
55. Test: Edit workout → Verify changes save and card updates
56. Test: Delete workout → Verify removes from list
57. Test: Click workout card → Verify navigates to details page
58. Test: Click back button on details page → Verify returns to list
59. Test: Verify Server Actions still work (create, update, delete)
60. Test: Verify TanStack Query mutations and queries work

**Accessibility:**
61. Tab through workout list → Verify logical tab order
62. Verify focus indicators are visible (ring-2 ring-white or ring-graphite-900)
63. Press Enter on workout card → Verify navigates to details
64. Verify workout cards have semantic HTML (article or appropriate role)
65. Verify icon-only buttons have aria-labels
66. Verify color contrast is sufficient (white on green)
67. Run Lighthouse audit → Verify Accessibility ≥ 95
68. Test with screen reader (if possible) → Verify content is announced correctly

**Performance:**
69. Verify page loads quickly (< 2 seconds)
70. Verify no console errors or warnings
71. Verify no layout shift on page load
72. Verify images/icons load instantly
73. Run Lighthouse Performance audit → Target ≥ 90

**Comparison to Mockup:**
74. Compare workout history page to workout-history-dashboard.html mockup
75. Verify card styling matches mockup (colors, corners, spacing)
76. Verify icon placement matches mockup
77. Verify overall layout matches mockup design intent

**Automated Testing (Deferred to Test Epic):**
- Unit tests: WorkoutCard component (styling, props rendering)
- Unit tests: WorkoutIcon component (icon mapping)
- Integration tests: Workout list rendering with data
- E2E tests: Complete workout CRUD flows with new UI
- Visual regression tests: Screenshot comparison with mockup

### Dependencies and Integration

**Existing Dependencies (No Changes):**
- `next` (^16.0.5) - App Router, routing
- `react` (^19.2.0) - Component library
- `tailwindcss` (^4.0+) - Styling with custom green theme
- `@supabase/supabase-js` (^2.x) - Database (workouts table)
- `@tanstack/react-query` - Data fetching and caching
- `material-symbols` (latest) - Workout type icons
- `shadcn/ui` - Skeleton, Button components

**No New Dependencies Required** ✅

**Integration Points:**

1. **Supabase Database (Unchanged):**
   - Workouts table: `id`, `user_id`, `date`, `type`, `duration`, `notes`, `created_at`
   - Server Actions for CRUD operations (unchanged logic)
   - Row-Level Security policies (unchanged)
   - *Note: Only visual changes, no database schema modifications*

2. **TanStack Query (Unchanged):**
   - Existing queries: `useWorkouts`, `useWorkout(id)`
   - Existing mutations: `createWorkout`, `updateWorkout`, `deleteWorkout`
   - Cache invalidation on mutations (unchanged)
   - *Note: No query/mutation logic changes, only UI rendering*

3. **MaterialIcon Component (from Story 4.1):**
   - Import: `import { MaterialIcon } from '@/components/ui/MaterialIcon'`
   - Icons needed: directions_run, directions_bike, pool, fitness_center, self_improvement
   - Usage: `<MaterialIcon icon="directions_run" className="text-white text-5xl" />`

4. **shadcn/ui Components:**
   - Import Skeleton: `import { Skeleton } from '@/components/ui/skeleton'`
   - Import Button: `import { Button } from '@/components/ui/button'`
   - Usage: `<Skeleton className="h-32 w-full rounded-xl" />` for loading states
   - Usage: `<Button variant="outline">Edit</Button>` for action buttons

5. **AppHeader and BottomNav (from Story 4.1):**
   - Import: `import { AppHeader } from '@/components/common/AppHeader'`
   - Import: `import { BottomNav } from '@/components/common/BottomNav'`
   - Usage on workout history: `<AppHeader title="Workout History" />`
   - Usage on workout details: `<AppHeader title="Workout Details" showBackButton={true} />`
   - Usage on all pages: `<BottomNav activeTab="workouts" />`

6. **Existing Workout Pages:**
   - Current files: `app/(dashboard)/workouts/page.tsx` (history), `app/(dashboard)/workouts/[id]/page.tsx` (details)
   - Current functionality: List workouts, view details, CRUD operations
   - Modification approach: Update visual styling, keep data logic unchanged
   - Preserve routing, Server Actions, and TanStack Query integration

### Security Considerations

**No New Security Concerns:**
- Data fetching logic unchanged (Supabase RLS policies still in effect)
- No new API endpoints
- No new authentication requirements
- CRUD operations unchanged (existing authorization checks remain)

**Existing Security Maintained:**
- Row-Level Security (RLS) on workouts table (user can only see their own workouts)
- Supabase Auth ensures user_id matches session
- Server Actions validate user permissions before mutations
- No sensitive data exposed in client components

**Best Practices Applied:**
- No workout data stored in localStorage (all via Supabase)
- User-scoped queries (filter by user_id)
- Secure session management by Supabase
- No workout IDs or user data hardcoded

### Performance Considerations

**Optimizations Applied:**
1. **Minimal Component Overhead:**
   - WorkoutCard is lightweight (pure display)
   - WorkoutIcon is simple icon mapping (no heavy computation)
   - No new heavy libraries added

2. **Fast Page Load:**
   - Server Components for non-interactive elements
   - Client Components only where needed (interactive buttons)
   - TanStack Query handles efficient data fetching and caching
   - Prefetch workout data on initial load

3. **Image/Icon Optimization:**
   - Icons are SVG-based (Material Symbols - lightweight)
   - No heavy images on workout pages
   - Icons loaded once globally (from Story 4.1)

4. **Efficient Rendering:**
   - Loading skeletons reduce perceived wait time
   - Smooth transitions on data load
   - Avoid unnecessary re-renders (React.memo if needed)

**Lighthouse Targets:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

**No Performance Regressions Expected:**
- Workout pages already exist, just visual refresh
- No new heavy dependencies
- No complex computations
- Efficient data fetching via TanStack Query

### Accessibility Considerations

**Semantic HTML:**
- Use `<article>` for workout cards (or `<div role="article">`)
- Use `<h1>` for page title (in AppHeader)
- Use `<h2>` or `<h3>` for workout title in card
- Use `<button>` for Edit/Delete actions
- Use `<main>` for page content

**ARIA Labels:**
- Add `aria-label="Workout card"` to workout cards if needed
- Add `aria-label="Edit workout"` to edit button
- Add `aria-label="Delete workout"` to delete button
- Add `aria-describedby` to cards if additional context needed
- Add `aria-label` to icon-only buttons

**Keyboard Navigation:**
- Ensure workout cards are focusable and clickable with Enter
- Logical tab order: Header → Workout cards → Bottom nav
- Edit/Delete buttons focusable with Tab
- Visible focus indicators (ring-2 ring-white or ring-graphite-900)
- Enter key activates buttons and navigates

**Screen Reader Support:**
- Workout card content announced correctly (title, date, duration)
- Icon role is "img" with alt text if needed (or aria-hidden if decorative)
- Button labels announced correctly
- Loading state announced ("Loading workouts...")
- Empty state message announced

**Color Contrast:**
- White text on primary green (#22c55e): Verify contrast ratio ≥ 4.5:1 (AA)
- Graphite text on white background: Verify contrast ratio ≥ 4.5:1
- Error text (if any) on white: Verify contrast ratio ≥ 4.5:1
- Focus indicators have sufficient contrast
- Use WebAIM Contrast Checker or browser dev tools

**Touch Targets:**
- Workout cards minimum height: h-24 or h-32 (96px or 128px) ✅
- Edit/Delete buttons minimum size: 44x44px ✅
- Adequate spacing between cards (gap-4, 16px) ✅
- CTA button in empty state: 44x44px minimum ✅

**Responsive Text:**
- Minimum body text size: 16px (text-base)
- Workout title: text-lg/xl (18-20px) scales appropriately on mobile
- Date/time: text-sm (14px) acceptable for secondary text
- Ensure text remains readable at all viewport sizes

### Error Handling

**Data Fetching Errors:**
- Catch and display error message if workouts fail to load
- Display friendly error message: "Unable to load workouts. Please try again."
- Provide retry button or refresh action
- Log error to console for debugging (or Sentry if integrated)

**Empty State Handling:**
- Display empty state if user has no workouts
- Friendly message: "No workouts yet. Start logging your fitness journey!"
- CTA button to create first workout
- Ensure empty state is visually consistent with theme

**CRUD Operation Errors:**
- Create workout fails → Display toast or error message
- Update workout fails → Display error, revert optimistic update
- Delete workout fails → Display error, restore deleted item
- Use TanStack Query error handling for mutations
- Provide clear, actionable error messages

**Loading States:**
- Display skeleton while workouts are loading
- Skeleton matches card dimensions for smooth transition
- Avoid content shift when data loads
- Use TanStack Query `isLoading` state

**Edge Cases:**
- No workouts exist → Empty state displayed
- Workout type not in icon map → Default icon displayed
- Very long workout notes → Use line-clamp-2 or line-clamp-3 to truncate
- Network offline → Display offline message or cached data
- Workout deleted by another session → Handle via TanStack Query cache invalidation

### References

- [Source: docs/fase-2-plan/epics.md#Story-4.4:-Workouts-Visual-Polish]
- [Source: docs/sprint-artifacts/tech-spec-epic-4.md#AC-4.4:-Workouts-Visual-Polish]
- [Source: docs/fase-3-solutioning/architecture.md#Database-Schema]
- [Source: docs/sprint-artifacts/4-1-navigation-layout-foundation.md#Dev-Agent-Record]
- [Source: docs/sprint-artifacts/4-2-dashboard-visual-polish.md#Dev-Agent-Record]
- [Source: docs/sprint-artifacts/4-3-authentication-pages-visual-polish.md#Dev-Agent-Record]
- [Supabase Database Documentation: https://supabase.com/docs/guides/database]
- [TanStack Query Documentation: https://tanstack.com/query/latest]
- [shadcn/ui Skeleton Component: https://ui.shadcn.com/docs/components/skeleton]
- [Material Symbols Icons: https://fonts.google.com/icons]
- [WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/]

## Dev Agent Record

### Context Reference

- `docs/sprint-artifacts/4-4-workouts-visual-polish.context.xml`

### Agent Model Used

Claude 3.5 Sonnet (2024-10-22)

### Debug Log References

<!-- Debug logs will be added during implementation -->

### Completion Notes List

<!-- Completion notes will be added after implementation -->

### File List

<!-- File changes will be listed after implementation -->
