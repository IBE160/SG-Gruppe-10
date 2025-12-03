# Story 4.5: Goals Visual Polish

Status: ready-for-dev

## Story

As a FitTrack user,
I want to see my goals with progress bars and achievement badges,
So that I feel accomplished and motivated to continue working towards my fitness objectives.

## Acceptance Criteria

1. **AC-1:** Given I view my goals page, when the page loads, then each goal card displays an icon, title, progress percentage, and days remaining (if applicable).
2. **AC-2:** And progress bars visually show completion percentage (0-100%) in primary green color (#22c55e).
3. **AC-3:** And I see achievement badges for earned milestones displayed in full color (primary green).
4. **AC-4:** And I see locked achievement badges displayed in grayed-out state (graphite-300).
5. **AC-5:** And I see a floating action button (FAB) in the bottom-right corner with "Add Goal" icon to create new goals.
6. **AC-6:** And the design matches goals-achievements-dashboard.html mockup from UX specification with Green & Graphite theme.

## Tasks / Subtasks

- [ ] **Refactor GoalCard Component (AC: 1, 2)**
  - [ ] Update `components/goals/GoalCard.tsx` (or create if not exists)
  - [ ] Apply modern card styling with white background on graphite-50 page (not green - goals use progress bars for color)
  - [ ] Add rounded corners (rounded-xl)
  - [ ] Update card layout to display:
    - [ ] Goal icon using MaterialIcon (e.g., 'flag', 'emoji_events', 'star')
    - [ ] Goal title (prominent, font-semibold or font-bold, text-lg/xl)
    - [ ] Goal target description (secondary text, text-graphite-700)
    - [ ] Progress percentage (font-medium, text-base)
    - [ ] shadcn/ui Progress bar component with primary green fill
    - [ ] Days remaining (optional, if goal has deadline)
  - [ ] Add padding and spacing for comfortable layout (p-4 or p-6)
  - [ ] Ensure card is responsive (full-width on mobile, constrained on desktop)
  - [ ] Add subtle shadow for depth (shadow-md)
  - [ ] Unit test: Verify card renders with progress bar and correct percentage

- [ ] **Enhance GoalProgressCard Component (AC: 2)**
  - [ ] Verify `components/goals/GoalProgressCard.tsx` exists (from Story 4.2)
  - [ ] If exists, enhance with new requirements:
    - [ ] Ensure Progress component uses primary green color (bg-primary-green)
    - [ ] Add progress percentage text display (e.g., "75%" or "75% complete")
    - [ ] Handle edge cases: progress values outside 0-100 range (clamp to valid range)
    - [ ] Add visual feedback for completed goals (100% - consider check icon or badge)
  - [ ] If not exists, create GoalProgressCard with above features
  - [ ] Support progress calculation based on goal target and current value
  - [ ] Unit test: Verify progress bar color, percentage display, edge case handling

- [ ] **Create AchievementBadge Component (AC: 3, 4)**
  - [ ] Create `components/goals/AchievementBadge.tsx`
  - [ ] Define badge structure:
    - [ ] Circle or rounded badge with icon (MaterialIcon)
    - [ ] Badge title/name below icon
    - [ ] Support two states: earned (full color) and locked (grayed out)
  - [ ] Earned state styling:
    - [ ] Background: bg-primary-green or bg-gradient-to-br from-green-400 to-green-600
    - [ ] Icon: text-white
    - [ ] Border: border-2 border-green-600 (optional)
    - [ ] Shadow: shadow-md for depth
    - [ ] Badge name: text-graphite-900, font-semibold
  - [ ] Locked state styling:
    - [ ] Background: bg-graphite-200 or bg-graphite-300
    - [ ] Icon: text-graphite-400 or text-graphite-500
    - [ ] Border: border-2 border-graphite-300 (optional)
    - [ ] Badge name: text-graphite-500, font-normal
    - [ ] Optional: lock icon overlay or opacity-50
  - [ ] Accept props: `achievement` (object with title, icon, earned boolean), `size` (small/medium/large)
  - [ ] Add aria-label for accessibility: "Achievement: [name] - [earned/locked]"
  - [ ] Unit test: Verify earned vs locked styling, icon rendering

- [ ] **Create FloatingActionButton (FAB) Component (AC: 5)**
  - [ ] Create `components/ui/FloatingActionButton.tsx`
  - [ ] Implement fixed positioning in bottom-right corner:
    - [ ] Position: fixed bottom-6 right-6 (or bottom-20 if BottomNav present)
    - [ ] Large circular button (w-14 h-14 or w-16 h-16)
    - [ ] Background: bg-primary-green
    - [ ] Icon: MaterialIcon 'add' in text-white
    - [ ] Shadow: shadow-lg for prominence
    - [ ] Hover: scale effect (hover:scale-110) or shadow increase
    - [ ] Active: scale down (active:scale-95)
  - [ ] Accept props: `icon` (string), `onClick` (function), `ariaLabel` (string)
  - [ ] Ensure z-index is above content but below modals (z-50)
  - [ ] Add keyboard accessibility (Tab focus, Enter/Space to activate)
  - [ ] Add aria-label: "Add new goal" or customizable
  - [ ] Consider adding tooltip on hover (optional)
  - [ ] Unit test: Verify rendering, click handler, positioning

- [ ] **Update Goals Page Layout (AC: 1, 2, 6)**
  - [ ] Update `app/(dashboard)/goals/page.tsx` or goals route
  - [ ] Apply bg-graphite-50 page background
  - [ ] Add AppHeader component with title "Goals" and optional settings button
  - [ ] Verify BottomNav integration (active tab: "Goals")
  - [ ] Update goals list layout:
    - [ ] Vertical layout with space-y-4 or space-y-6 for goal cards
    - [ ] Max-width constraint (max-w-4xl or max-w-3xl)
    - [ ] Centered on desktop (mx-auto)
    - [ ] Proper padding (px-4 py-6)
  - [ ] Add loading skeleton states using shadcn/ui Skeleton
  - [ ] Add empty state if no goals exist:
    - [ ] MaterialIcon 'emoji_events' or 'flag' in graphite-300
    - [ ] Message: "No goals yet. Set your first fitness goal!"
    - [ ] CTA button: "Create Your First Goal" (primary green)
  - [ ] Integrate FloatingActionButton at bottom-right
  - [ ] Ensure responsive design (mobile-first)

- [ ] **Add Achievement Section to Goals Page (AC: 3, 4, 6)**
  - [ ] Add "Achievements" section below goals list (or separate tab)
  - [ ] Section header: "Achievements" or "Milestones" (text-xl, font-bold)
  - [ ] Grid layout for achievement badges:
    - [ ] Grid: grid-cols-3 gap-4 (mobile: 3 columns)
    - [ ] Grid: sm:grid-cols-4 gap-6 (tablet: 4 columns)
    - [ ] Grid: md:grid-cols-5 gap-6 (desktop: 5 columns)
  - [ ] Render AchievementBadge components with earned/locked states
  - [ ] Define sample achievements:
    - [ ] "First Goal" (icon: 'flag', earned on first goal created)
    - [ ] "Week Warrior" (icon: 'fitness_center', earned on 7 consecutive workout days)
    - [ ] "Goal Crusher" (icon: 'emoji_events', earned on completing any goal)
    - [ ] "Consistent" (icon: 'star', earned on 3 goals completed)
    - [ ] "Marathon" (icon: 'directions_run', earned on 100 workouts logged)
    - [ ] Additional locked achievements (gray badges)
  - [ ] Implement achievement logic (calculate earned badges based on user data)
  - [ ] Handle empty achievements state (show locked badges only)

- [ ] **Ensure Existing Functionality Preserved (AC: All)**
  - [ ] Verify Server Actions still work (create, view goals)
  - [ ] Verify TanStack Query mutations and queries work
  - [ ] Test: Create goal → Verify appears in list with new styling
  - [ ] Test: View goal → Verify progress bar displays correctly
  - [ ] Test: Click FAB → Verify navigates to create goal form
  - [ ] Test: Delete goal (if implemented) → Verify removes from list
  - [ ] Ensure no regressions in data flow or state management

- [ ] **Color Theme Consistency (AC: 2, 3, 4, 6)**
  - [ ] Primary green (#22c55e) used for:
    - [ ] Progress bar fill (bg-primary-green)
    - [ ] Earned achievement badge backgrounds
    - [ ] FAB button background
    - [ ] CTA button in empty state
  - [ ] White used for:
    - [ ] Goal card backgrounds (bg-white on graphite-50)
    - [ ] Icons in earned badges (text-white)
    - [ ] FAB icon (text-white)
  - [ ] Graphite shades used for:
    - [ ] Page background (bg-graphite-50)
    - [ ] Secondary text (text-graphite-700, text-graphite-600)
    - [ ] Locked badge backgrounds (bg-graphite-200/300)
    - [ ] Empty state icons (text-graphite-300)
    - [ ] Card shadows and borders

- [ ] **Typography Application (AC: 1, 6)**
  - [ ] Goal title: font-semibold or font-bold, text-lg or text-xl
  - [ ] Goal target: font-normal, text-sm or text-base, text-graphite-700
  - [ ] Progress percentage: font-medium, text-base or text-lg
  - [ ] Days remaining: font-normal, text-sm, text-graphite-600
  - [ ] Achievement badge title: font-semibold (earned) or font-normal (locked), text-sm
  - [ ] Section headers: font-bold, text-xl or text-2xl
  - [ ] Use Lexend font family (inherited from layout)
  - [ ] Ensure consistent spacing and line-height

- [ ] **Progress Bar Implementation (AC: 2)**
  - [ ] Use shadcn/ui Progress component
  - [ ] Customize colors via Tailwind classes:
    - [ ] Background track: bg-graphite-200 or bg-gray-200
    - [ ] Progress fill: bg-primary-green
    - [ ] Border radius: rounded-full
  - [ ] Height: h-2 or h-3 for comfortable visibility
  - [ ] Add percentage text next to or above progress bar
  - [ ] Smooth transitions on progress updates (transition-all duration-300)
  - [ ] Handle edge cases:
    - [ ] Progress < 0 → clamp to 0
    - [ ] Progress > 100 → clamp to 100
    - [ ] Progress = 100 → show completion indicator (check icon or "Complete" badge)
  - [ ] Ensure accessible (aria-valuenow, aria-valuemin, aria-valuemax)

- [ ] **Floating Action Button Integration (AC: 5)**
  - [ ] Position FAB above BottomNav (bottom-20 or bottom-24)
  - [ ] Ensure FAB doesn't overlap with goal cards on scroll
  - [ ] On mobile: FAB positioned right-4 or right-6
  - [ ] On desktop: FAB positioned right-6 or right-8
  - [ ] FAB click → Navigate to /goals/new (create goal page)
  - [ ] Add smooth entrance animation (optional): fade-in or slide-up
  - [ ] Ensure FAB is always visible (fixed positioning)
  - [ ] Test: Click FAB → Verify creates new goal form page opens

- [ ] **Loading and Empty States (AC: 1, 6)**
  - [ ] Add loading skeleton for goals list (shadcn/ui Skeleton)
  - [ ] Skeleton should match goal card dimensions
  - [ ] Include skeleton for progress bar (rectangular shape)
  - [ ] Style empty state:
    - [ ] Display MaterialIcon 'emoji_events' or 'flag' in graphite-300, large size
    - [ ] Message: "No goals yet. Set your first fitness goal!"
    - [ ] Subtext: "Track your progress and stay motivated" (optional)
    - [ ] CTA button: "Create Your First Goal" (primary green, large)
  - [ ] Ensure smooth transitions when data loads
  - [ ] Empty achievements state: Show locked badges only (no earned badges)

- [ ] **Apply Responsive Design Patterns (AC: 1, 2, 6)**
  - [ ] Mobile (320px-640px):
    - [ ] Full-width goal cards with proper padding (p-4 or p-6)
    - [ ] Single-column layout (no grid for goal cards)
    - [ ] Achievement badges: grid-cols-3 gap-4
    - [ ] Large touch targets for FAB (w-14 h-14 minimum)
    - [ ] Readable font sizes (min text-base)
    - [ ] FAB positioned bottom-20 right-4 (above BottomNav)
  - [ ] Tablet (641px-1024px):
    - [ ] Achievement badges: grid-cols-4 gap-6
    - [ ] Maintain comfortable goal card spacing (space-y-6)
    - [ ] FAB positioned bottom-6 right-6 (no BottomNav overlap)
  - [ ] Desktop (1025px+):
    - [ ] Max-width constraint (max-w-3xl or max-w-4xl)
    - [ ] Centered layout (mx-auto)
    - [ ] Achievement badges: grid-cols-5 gap-6
    - [ ] Larger FAB (w-16 h-16)
    - [ ] More spacing between goal cards (space-y-8)

- [ ] **Manual Testing & Verification (AC: All)**
  - [ ] Test: Visit /goals (or goals route) → Verify page loads with bg-graphite-50
  - [ ] Test: Verify goal cards display icon, title, target, progress bar, percentage
  - [ ] Test: Verify progress bar uses primary green color (#22c55e)
  - [ ] Test: Verify progress percentage matches actual progress (e.g., 75%)
  - [ ] Test: Verify days remaining displays if goal has deadline
  - [ ] Test: Create goal with 50% progress → Verify progress bar shows 50%
  - [ ] Test: Create goal with 100% progress → Verify completion indicator shows
  - [ ] Test: Verify achievement badges section displays below goals list
  - [ ] Test: Verify earned badges have full color (primary green background)
  - [ ] Test: Verify locked badges have grayed-out appearance (graphite-200/300)
  - [ ] Test: Verify FAB displays in bottom-right corner
  - [ ] Test: Click FAB → Verify navigates to create goal form
  - [ ] Test: Verify FAB positioned above BottomNav (no overlap)
  - [ ] Test: Verify empty state displays if no goals exist
  - [ ] Test: Click "Create Your First Goal" CTA → Verify navigates to goal form
  - [ ] Test: Verify loading states display skeleton correctly
  - [ ] Test: Create new goal → Verify appears in list with new styling
  - [ ] Test: Delete goal (if implemented) → Verify removes from list
  - [ ] Test: Verify mobile responsiveness (320px, 375px, 414px)
  - [ ] Test: Verify tablet responsiveness (768px, 1024px)
  - [ ] Test: Verify desktop responsiveness (1280px, 1920px)
  - [ ] Test: Verify no console errors or warnings
  - [ ] Test: Tab through interactive elements → Verify logical tab order
  - [ ] Test: Tab to FAB → Press Enter → Verify creates goal form opens
  - [ ] Test: Run Lighthouse audit (Accessibility ≥ 95, Performance ≥ 90)
  - [ ] Test: Compare to goals-achievements-dashboard.html mockup → Verify visual match

- [ ] **Accessibility Improvements (AC: All)**
  - [ ] Ensure goal cards have semantic HTML (article or div with role)
  - [ ] Add aria-label to progress bars: "Goal progress: 75%"
  - [ ] Add aria-label to achievement badges: "Achievement: First Goal - Earned/Locked"
  - [ ] Add aria-label to FAB: "Add new goal"
  - [ ] Ensure sufficient color contrast:
    - [ ] White text on primary green (#22c55e) ≥ 4.5:1
    - [ ] Graphite-900 text on white background ≥ 4.5:1
    - [ ] Graphite-600 text on white background ≥ 4.5:1
  - [ ] Verify focus indicators are visible (ring-2 ring-graphite-900 or ring-primary-green)
  - [ ] Ensure keyboard navigation works:
    - [ ] Tab to goal cards (if interactive)
    - [ ] Tab to FAB → Enter to activate
    - [ ] Tab to achievement badges (informational only)
  - [ ] Add sr-only labels if additional context needed for screen readers
  - [ ] Test with screen reader (if possible) → Verify content announced correctly
  - [ ] Ensure progress bars have proper ARIA attributes:
    - [ ] role="progressbar"
    - [ ] aria-valuenow="{current}"
    - [ ] aria-valuemin="0"
    - [ ] aria-valuemax="100"
    - [ ] aria-label="Goal progress: {percentage}%"

## Dev Notes

### Requirements Context Summary

**Epic 4: UX Visual Polish**  
Story 4.5 focuses on transforming the goals page from a simple list into a visually motivating display with progress bars, achievement badges, and a floating action button (FAB) for easy goal creation. This story uses the primary green color theme for progress and achievements, making goal tracking feel rewarding and encouraging continued user engagement.

**From Epics File (Epic 4, Story 4.5):**
- Prerequisites: Story 4.4 (Workouts Visual Polish) complete
- Goal cards display icon, title, progress percentage, and days remaining
- Progress bars visually show completion percentage in primary green
- Achievement badges for earned milestones (full color) and locked achievements (grayed out)
- Floating action button (FAB) in bottom-right corner to add new goals
- Design matches goals-achievements-dashboard.html mockup
- Technical Notes: Refactor GoalCard to include Progress component and status display, create AchievementBadge component with earned/locked states, create FloatingActionButton (FAB) component, maintain existing goal creation/viewing functionality

**From Tech Spec (Epic 4):**
- Enhance GoalCard with progress bar using shadcn/ui Progress component
- Create AchievementBadge component with earned/locked visual states
- Create FloatingActionButton (FAB) component with primary green styling
- Update goals page with new components and layout
- No database schema changes required
- No backend API changes required
- Maintain existing Server Actions and data flow
- Mobile-first responsive design with max-width constraint

**Key Design Decisions:**
1. **Goal Card Styling**: White background cards with graphite-50 page background (not green - progress bars provide color accent)
2. **Progress Bars**: shadcn/ui Progress component with primary green fill, percentage text display
3. **Achievement Badges**: Circular badges with earned (full color green) and locked (grayed graphite) states
4. **FAB Positioning**: Fixed bottom-right, positioned above BottomNav on mobile (bottom-20), standard position on desktop (bottom-6)
5. **Achievement Section**: Grid layout below goals list with responsive columns (3/4/5 columns based on viewport)
6. **Empty State**: Motivating message with CTA button to create first goal
7. **Loading State**: Skeleton matching goal card and progress bar dimensions

### Learnings from Previous Story (Story 4.4: Workouts Visual Polish)

**From Story 4.4 (Status: done)** ✅

**Component Patterns Established:**
- ✅ MaterialIcon wrapper component works reliably - use for goal icons and achievement icons
- ✅ Color theme variables working correctly (primary-green #22c55e, graphite shades)
- ✅ Lexend font loaded and optimized globally
- ✅ Mobile-first responsive design approach successful
- ✅ Card-based design pattern with rounded-xl corners proven effective
- ✅ Loading states with shadcn/ui Skeleton component proven effective
- ✅ Empty state pattern with MaterialIcon and CTA button works well
- ✅ AppHeader and BottomNav integration smooth (from Story 4.1)
- ✅ Accessibility patterns (aria-labels, semantic HTML, keyboard navigation) working well

**Files Available for Reuse:**
- `components/ui/MaterialIcon.tsx` - Use for goal icons and achievement icons
- `components/ui/button.tsx` - Use for FAB and CTA buttons (shadcn/ui)
- `components/ui/skeleton.tsx` - Use for loading skeletons (shadcn/ui)
- `components/ui/progress.tsx` - Use for goal progress bars (shadcn/ui - verify installed)
- `app/globals.css` - Color variables already defined (primary-green, graphite)
- `components/common/AppHeader.tsx` - Use for page headers (from Story 4.1)
- `components/common/BottomNav.tsx` - Ensure "Goals" tab active (from Story 4.1)

**Key Patterns to Reuse:**
1. **Color Application**: `bg-primary-green`, `bg-graphite-50`, `text-graphite-700`, `text-white`
2. **Rounded Corners**: `rounded-xl` for cards, `rounded-full` for badges and FAB
3. **Spacing**: `space-y-4` or `space-y-6` for lists, `p-4` or `p-6` for card padding
4. **Typography**: `font-semibold` for titles, `font-normal` for body, Lexend font
5. **Shadows**: `shadow-md` for cards, `shadow-lg` for FAB
6. **Loading States**: shadcn/ui Skeleton component with appropriate dimensions
7. **Empty States**: MaterialIcon with friendly message and CTA button
8. **Grid Layouts**: Responsive grid with breakpoints (grid-cols-3 sm:grid-cols-4 md:grid-cols-5)
9. **Semantic HTML**: Use `<article>` for goal cards, proper ARIA labels
10. **Keyboard Accessibility**: Tab focus, Enter/Space key activation

**Technical Debt from Story 4.4:**
- None related to goals pages - Story 4.4 was workout-focused
- Note: baseline-browser-mapping warning during build (cosmetic only, no functional impact)

**Warnings/Recommendations:**
- ✅ Continue mobile-first responsive design approach (proven successful)
- ✅ Maintain TypeScript strictness (no build errors)
- ✅ Ensure no regressions in existing goal functionality (Server Actions, TanStack Query)
- 🔧 **Important**: Verify shadcn/ui Progress component is installed; if not, run `pnpm dlx shadcn@latest add progress`
- 🔧 **Important**: FAB positioning on mobile must account for BottomNav height (use bottom-20 or bottom-24)
- 🔧 **Important**: Test color contrast for white text on primary green (#22c55e) in achievement badges - ensure WCAG AA compliance (≥ 4.5:1)
- 🔧 **Important**: Progress bar edge case handling - clamp values to 0-100 range

**New Services/Patterns Created in Story 4.2 (Dashboard):**
- Dashboard components: StatCard, GoalProgressCard, RecentActivityCard, WorkoutIcon
- *Note: GoalProgressCard component may already exist from Story 4.2 - verify and enhance*
- Dashboard queries: getWeeklyStats, getGoalsWithProgress, getRecentWorkouts
- Empty state pattern with CTAs (reuse for goals empty state)
- Loading skeleton pattern (reuse for goals list loading)

**New Components Created in Story 4.4 (Workouts):**
- WorkoutCard with green card design pattern (article element, not shadcn Card)
- WorkoutIcon with type-to-icon mapping
- WorkoutListSkeleton matching card dimensions
- Empty state with MaterialIcon and CTA button
- *Note: Similar patterns apply to goals - goal cards are white on graphite (not green), progress bars provide color*

**Files Modified in Story 4.4 (Workouts):**
- `components/workouts/WorkoutCard.tsx` - Not directly relevant to goals
- `components/workouts/WorkoutHistoryClient.tsx` - Not directly relevant to goals
- `app/(dashboard)/workouts/page.tsx` - Pattern reference for goals page layout
- *Note: No conflicts expected with goals pages*

**Relevant Architecture from Previous Stories:**
- Color theme consistently applied across Stories 4.1, 4.2, 4.3, 4.4
- MaterialIcon usage proven across multiple components (workout icons, auth icons, dashboard icons)
- shadcn/ui component integration smooth (Button, Skeleton, Input proven working)
- Mobile responsiveness approach successful (max-w-4xl centered layout)
- AppHeader and BottomNav established in Story 4.1 (reuse for goals pages)
- Card-based design pattern with rounded-xl corners established (apply to goal cards)
- Empty state pattern with MaterialIcon and CTA established (apply to goals empty state)

### Project Structure Notes

**Existing Files to Modify:**
- `app/(dashboard)/goals/page.tsx` - Goals list page (verify exact path)
- `components/goals/GoalCard.tsx` - Update with progress bar (if exists, else create)
- `components/goals/GoalProgressCard.tsx` - Verify/enhance from Story 4.2 (may exist)

**Files to Create:**
- `components/goals/AchievementBadge.tsx` - Achievement badge with earned/locked states
- `components/ui/FloatingActionButton.tsx` - FAB component for add goal action
- `components/goals/GoalListSkeleton.tsx` - Loading skeleton for goals list (optional)

**Files to Verify/Check:**
- `components/ui/progress.tsx` - shadcn/ui Progress component (verify installed)
- `components/goals/GoalProgressCard.tsx` - May exist from Story 4.2 (dashboard)

**Dependencies (Already Installed):**
- `next` (^16.0.5) - App Router ✅
- `react` (^19.2.0) - Component library ✅
- `tailwindcss` (^4.0+) - Styling ✅
- `shadcn/ui` - Skeleton, Button, Progress components ✅ (verify Progress)
- `material-symbols` - Icons ✅
- `@tanstack/react-query` - Data fetching ✅
- `@supabase/supabase-js` - Database (goals table) ✅

**Potential New Dependency:**
- shadcn/ui Progress component (if not installed): `pnpm dlx shadcn@latest add progress`

**Expected Goals Route Structure:**
```
app/
├── (dashboard)/
│   ├── goals/
│   │   ├── page.tsx (Goals List - TO BE UPDATED)
│   │   └── new/
│   │       └── page.tsx (Create Goal - OPTIONAL UPDATE)

components/
├── goals/
│   ├── GoalCard.tsx (TO BE UPDATED/CREATED)
│   ├── GoalProgressCard.tsx (VERIFY/ENHANCE - may exist from Story 4.2)
│   ├── AchievementBadge.tsx (TO BE CREATED)
│   └── [other goal components]
├── ui/
│   ├── MaterialIcon.tsx (REUSE)
│   ├── FloatingActionButton.tsx (TO BE CREATED)
│   ├── skeleton.tsx (REUSE - shadcn)
│   ├── button.tsx (REUSE - shadcn)
│   └── progress.tsx (VERIFY - shadcn)
├── common/
│   ├── AppHeader.tsx (REUSE - Story 4.1)
│   └── BottomNav.tsx (REUSE - Story 4.1)
```

### Architectural Considerations

**Data Flow (Unchanged):**
- Goal data fetched via TanStack Query from Supabase
- Server Actions for create, view goals operations
- Real-time updates via TanStack Query cache invalidation
- *Note: Only visual changes in this story, no data logic changes*

**Component Architecture:**
- GoalCard: Server Component (pure display) OR Client Component if needs click handler
- AchievementBadge: Server Component (pure display based on earned status)
- FloatingActionButton: Client Component (interactive, click handler)
- Goals Page: Server Component with Client Components for interactive elements
- Progress bars: Client Component (shadcn/ui Progress with state)

**Existing Goal Data Model (No Changes):**
```typescript
// Goal table schema (from Supabase)
type Goal = {
  id: string;
  user_id: string;
  title: string;
  target: string;
  created_at: string;
  // Potentially: deadline, progress, status, etc.
}

// Achievement model (client-side logic for now)
type Achievement = {
  id: string;
  title: string;
  icon: string; // Material Symbol icon name
  earned: boolean; // Based on user data calculations
  description?: string;
}
```

**GoalCard Implementation Pattern:**
```typescript
// GoalCard.tsx
interface GoalCardProps {
  goal: Goal;
  progress?: number; // 0-100 percentage (calculated client-side or from goal data)
  daysRemaining?: number;
  onClick?: () => void;
}

export function GoalCard({ goal, progress = 0, daysRemaining, onClick }: GoalCardProps) {
  return (
    <article 
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex items-start gap-4 mb-4">
        <MaterialIcon icon="flag" className="text-primary-green text-3xl" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-graphite-900">{goal.title}</h3>
          <p className="text-sm text-graphite-700">{goal.target}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-graphite-700">Progress</span>
          <span className="font-medium text-graphite-900">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-graphite-200">
          <div className="h-full bg-primary-green rounded-full transition-all" style={{ width: `${progress}%` }} />
        </Progress>
      </div>
      
      {daysRemaining !== undefined && (
        <p className="text-sm text-graphite-600 mt-3">
          {daysRemaining} days remaining
        </p>
      )}
    </article>
  );
}
```

**AchievementBadge Implementation Pattern:**
```typescript
// AchievementBadge.tsx
interface AchievementBadgeProps {
  achievement: {
    title: string;
    icon: string;
    earned: boolean;
  };
  size?: 'small' | 'medium' | 'large';
}

export function AchievementBadge({ achievement, size = 'medium' }: AchievementBadgeProps) {
  const sizeClasses = {
    small: 'w-16 h-16 text-2xl',
    medium: 'w-20 h-20 text-3xl',
    large: 'w-24 h-24 text-4xl',
  }[size];
  
  const badgeClass = achievement.earned
    ? 'bg-primary-green text-white shadow-md'
    : 'bg-graphite-200 text-graphite-400';
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`${sizeClasses} ${badgeClass} rounded-full flex items-center justify-center transition`}
        aria-label={`Achievement: ${achievement.title} - ${achievement.earned ? 'Earned' : 'Locked'}`}
      >
        <MaterialIcon icon={achievement.icon} className="text-inherit" />
      </div>
      <p className={`text-sm text-center ${achievement.earned ? 'font-semibold text-graphite-900' : 'font-normal text-graphite-500'}`}>
        {achievement.title}
      </p>
    </div>
  );
}
```

**FloatingActionButton Implementation Pattern:**
```typescript
// FloatingActionButton.tsx
'use client';

interface FloatingActionButtonProps {
  icon?: string;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export function FloatingActionButton({ 
  icon = 'add', 
  onClick, 
  ariaLabel,
  className 
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`fixed bottom-20 right-6 w-14 h-14 bg-primary-green text-white rounded-full shadow-lg 
        hover:scale-110 active:scale-95 transition-transform z-50 
        flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 
        ${className}`}
    >
      <MaterialIcon icon={icon} className="text-2xl" />
    </button>
  );
}
```

**Goals Page Layout Pattern:**
```typescript
// app/(dashboard)/goals/page.tsx
export default async function GoalsPage() {
  const goals = await getGoals(); // Server Action or query
  const achievements = calculateAchievements(goals); // Client-side logic or separate query
  
  return (
    <div className="min-h-screen bg-graphite-50">
      <AppHeader title="Goals" showBackButton={false} />
      
      <main className="max-w-3xl mx-auto px-4 py-6 pb-32">
        {/* Goals Section */}
        <section className="mb-8">
          {goals.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {goals.map(goal => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal}
                  progress={calculateProgress(goal)} // Calculate based on goal data
                  daysRemaining={calculateDaysRemaining(goal)}
                  onClick={() => router.push(`/goals/${goal.id}`)}
                />
              ))}
            </div>
          )}
        </section>
        
        {/* Achievements Section */}
        <section>
          <h2 className="text-2xl font-bold text-graphite-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {achievements.map(achievement => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </section>
      </main>
      
      <FloatingActionButton 
        onClick={() => router.push('/goals/new')}
        ariaLabel="Add new goal"
      />
      
      <BottomNav activeTab="goals" />
    </div>
  );
}
```

### Testing Strategy

**Manual Testing Checklist:**

**Visual Design:**
1. Visit /goals → Verify page loads with bg-graphite-50 background
2. Verify goal cards have white background (bg-white) on graphite page
3. Verify goal cards use rounded-xl corners
4. Verify goal cards have shadow-md for depth
5. Verify goal icon displays (MaterialIcon 'flag' or 'emoji_events')
6. Verify goal title is prominent (font-semibold, text-lg/xl)
7. Verify goal target text is visible (secondary text, graphite-700)
8. Verify progress percentage displays (e.g., "75%" or "75% complete")
9. Verify progress bar uses primary green fill (#22c55e)
10. Verify progress bar background is graphite-200 or similar

**Progress Bar Functionality:**
11. Create goal with 0% progress → Verify progress bar empty (0% fill)
12. Create goal with 50% progress → Verify progress bar half-filled (50% fill)
13. Create goal with 100% progress → Verify progress bar full (100% fill), check for completion indicator
14. Test edge case: Set progress to -10 → Verify clamped to 0%
15. Test edge case: Set progress to 150 → Verify clamped to 100%
16. Verify progress bar has smooth transition on update (transition-all)
17. Verify progress percentage text matches bar fill

**Achievement Badges:**
18. Verify achievement badges section displays below goals list
19. Verify earned badges have full color (bg-primary-green with text-white icon)
20. Verify earned badges have shadow for depth (shadow-md)
21. Verify locked badges have grayed appearance (bg-graphite-200 or bg-graphite-300)
22. Verify locked badge icons are muted (text-graphite-400 or text-graphite-500)
23. Verify badge titles display below icon
24. Verify earned badge titles use font-semibold, text-graphite-900
25. Verify locked badge titles use font-normal, text-graphite-500
26. Test: Complete first goal → Verify "First Goal" badge becomes earned
27. Verify achievement grid responsive: 3 cols (mobile), 4 cols (tablet), 5 cols (desktop)

**Floating Action Button (FAB):**
28. Verify FAB displays in bottom-right corner
29. Verify FAB has primary green background (#22c55e)
30. Verify FAB icon is 'add' in white color
31. Verify FAB has large shadow (shadow-lg)
32. Hover FAB → Verify scale effect (scale-110 or shadow increase)
33. Click FAB → Verify navigates to /goals/new (create goal form)
34. Verify FAB positioned above BottomNav on mobile (bottom-20 or bottom-24)
35. Verify FAB positioned bottom-6 on desktop (no BottomNav overlap)
36. Verify FAB is circular (rounded-full)
37. Verify FAB size is appropriate (w-14 h-14 on mobile, w-16 h-16 on desktop optional)
38. Tab to FAB → Verify focus indicator visible
39. Press Enter on FAB → Verify creates goal form opens

**Empty State:**
40. Delete all goals or view as new user → Verify empty state displays
41. Verify empty state icon is visible (emoji_events or flag in graphite-300, large)
42. Verify empty state message is friendly: "No goals yet. Set your first fitness goal!"
43. Verify "Create Your First Goal" CTA button displays (primary green)
44. Click CTA button → Verify navigates to create goal page
45. Verify achievements section still displays (locked badges only)

**Loading States:**
46. Refresh goals page → Verify loading skeleton displays
47. Verify skeleton matches goal card dimensions
48. Verify skeleton includes progress bar placeholder (rectangular shape)
49. Verify skeleton is styled appropriately (animated pulse)
50. Verify smooth transition when data loads

**Responsive Design:**
51. Mobile (320px) → Verify goal cards full-width with proper padding
52. Mobile (375px) → Verify cards display correctly without horizontal overflow
53. Mobile → Verify achievement badges grid-cols-3 gap-4
54. Tablet (768px) → Verify achievement badges grid-cols-4 gap-6
55. Desktop (1024px) → Verify goal cards constrained (max-w-3xl or max-w-4xl)
56. Desktop (1920px) → Verify layout centered, achievement badges grid-cols-5

**Color Theme:**
57. Verify primary green (#22c55e) used for progress bar fill
58. Verify primary green used for earned achievement badge backgrounds
59. Verify primary green used for FAB background
60. Verify white used for goal card backgrounds
61. Verify graphite-50 used for page background
62. Verify graphite shades used for secondary text and locked badges
63. Verify color contrast meets WCAG AA (white on green ≥ 4.5:1, graphite-900 on white ≥ 4.5:1)

**Typography:**
64. Verify Lexend font applied to all text elements
65. Verify goal title uses font-semibold or font-bold
66. Verify goal target uses font-normal with graphite-700 color
67. Verify progress percentage uses font-medium
68. Verify days remaining uses font-normal with graphite-600 color
69. Verify achievement badge titles use font-semibold (earned) or font-normal (locked)

**Functionality (No Regressions):**
70. Test: Create new goal → Verify appears in list with new styling
71. Test: View goal → Verify progress bar displays correctly
72. Test: Delete goal (if implemented) → Verify removes from list
73. Test: Click goal card → Verify navigates to details page (if implemented)
74. Test: Click FAB → Verify creates new goal form opens
75. Test: Verify Server Actions still work (create, view goals)
76. Test: Verify TanStack Query mutations and queries work

**Accessibility:**
77. Tab through goals list → Verify logical tab order (cards, FAB, bottom nav)
78. Verify focus indicators are visible (ring-2 ring-graphite-900 or ring-primary-green)
79. Press Enter on goal card → Verify navigates (if interactive)
80. Tab to FAB → Press Enter → Verify creates goal form opens
81. Press Space on FAB → Verify creates goal form opens
82. Verify goal cards have semantic HTML (article or appropriate role)
83. Verify progress bars have aria-label: "Goal progress: [percentage]%"
84. Verify progress bars have proper ARIA attributes (role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax)
85. Verify achievement badges have aria-label: "Achievement: [title] - Earned/Locked"
86. Verify FAB has aria-label: "Add new goal"
87. Verify color contrast is sufficient (white on green, graphite on white)
88. Run Lighthouse audit → Verify Accessibility ≥ 95
89. Test with screen reader (if possible) → Verify content announced correctly

**Performance:**
90. Verify page loads quickly (< 2 seconds)
91. Verify no console errors or warnings
92. Verify no layout shift on page load
93. Verify icons load instantly (Material Symbols)
94. Verify progress bars render smoothly
95. Run Lighthouse Performance audit → Target ≥ 90

**Comparison to Mockup:**
96. Compare goals page to goals-achievements-dashboard.html mockup
97. Verify goal card styling matches mockup (white cards, progress bars, spacing)
98. Verify achievement badge styling matches mockup (circular, earned/locked states)
99. Verify FAB positioning matches mockup (bottom-right)
100. Verify overall layout matches mockup design intent

**Automated Testing (Deferred to Test Epic):**
- Unit tests: GoalCard component (styling, props rendering, progress bar)
- Unit tests: AchievementBadge component (earned/locked states)
- Unit tests: FloatingActionButton component (click handler, positioning)
- Integration tests: Goals list rendering with data
- E2E tests: Complete goal CRUD flows with new UI
- Visual regression tests: Screenshot comparison with mockup

### Dependencies and Integration

**Existing Dependencies (No Changes):**
- `next` (^16.0.5) - App Router, routing
- `react` (^19.2.0) - Component library
- `tailwindcss` (^4.0+) - Styling with custom green theme
- `@supabase/supabase-js` (^2.x) - Database (goals table)
- `@tanstack/react-query` - Data fetching and caching
- `material-symbols` (latest) - Goal and achievement icons
- `shadcn/ui` - Skeleton, Button, Progress components

**Potential New Dependency:**
- shadcn/ui Progress component (if not installed): Run `pnpm dlx shadcn@latest add progress`
- Verify installation before implementing progress bars

**Integration Points:**

1. **Supabase Database (Unchanged):**
   - Goals table: `id`, `user_id`, `title`, `target`, `created_at`
   - Server Actions for CRUD operations (unchanged logic)
   - Row-Level Security policies (unchanged)
   - *Note: Only visual changes, no database schema modifications*
   - *Note: Progress calculation may be client-side logic for now (no progress field in DB yet)*

2. **TanStack Query (Unchanged):**
   - Existing queries: `useGoals`, `useGoal(id)`
   - Existing mutations: `createGoal`, `updateGoal` (if implemented), `deleteGoal` (if implemented)
   - Cache invalidation on mutations (unchanged)
   - *Note: No query/mutation logic changes, only UI rendering*

3. **MaterialIcon Component (from Story 4.1):**
   - Import: `import { MaterialIcon } from '@/components/ui/MaterialIcon'`
   - Icons needed: flag, emoji_events, star, fitness_center, add
   - Usage: `<MaterialIcon icon="flag" className="text-primary-green text-3xl" />`
   - Usage in FAB: `<MaterialIcon icon="add" className="text-white text-2xl" />`
   - Usage in achievements: `<MaterialIcon icon="emoji_events" className="text-white" />`

4. **shadcn/ui Components:**
   - Import Progress: `import { Progress } from '@/components/ui/progress'`
   - Import Skeleton: `import { Skeleton } from '@/components/ui/skeleton'`
   - Import Button: `import { Button } from '@/components/ui/button'`
   - Usage Progress: `<Progress value={75} className="h-2 bg-graphite-200" />`
   - Usage Skeleton: `<Skeleton className="h-40 w-full rounded-xl" />` for goal card loading
   - Usage Button: `<Button variant="default" size="lg">Create Your First Goal</Button>`

5. **AppHeader and BottomNav (from Story 4.1):**
   - Import: `import { AppHeader } from '@/components/common/AppHeader'`
   - Import: `import { BottomNav } from '@/components/common/BottomNav'`
   - Usage on goals page: `<AppHeader title="Goals" />`
   - Usage on all pages: `<BottomNav activeTab="goals" />`

6. **Existing Goals Pages:**
   - Current files: `app/(dashboard)/goals/page.tsx` (list), possibly `app/(dashboard)/goals/[id]/page.tsx` (details - if exists)
   - Current functionality: List goals, create goals
   - Modification approach: Update visual styling, add progress bars, achievements, FAB
   - Preserve routing, Server Actions, and TanStack Query integration

7. **Achievement Logic (Client-Side for Now):**
   - Achievement earned status calculated client-side based on user data
   - Example: "First Goal" earned if user has at least 1 goal
   - Example: "Week Warrior" earned if user has 7 consecutive workout days (requires workout data)
   - Example: "Goal Crusher" earned if user has completed at least 1 goal (requires progress/status tracking)
   - *Note: Achievement logic may be placeholder for now; can be enhanced later with backend support*

### Security Considerations

**No New Security Concerns:**
- Data fetching logic unchanged (Supabase RLS policies still in effect)
- No new API endpoints
- No new authentication requirements
- CRUD operations unchanged (existing authorization checks remain)

**Existing Security Maintained:**
- Row-Level Security (RLS) on goals table (user can only see their own goals)
- Supabase Auth ensures user_id matches session
- Server Actions validate user permissions before mutations
- No sensitive data exposed in client components

**Best Practices Applied:**
- No goal data stored in localStorage (all via Supabase)
- User-scoped queries (filter by user_id)
- Secure session management by Supabase
- No goal IDs or user data hardcoded

### Performance Considerations

**Optimizations Applied:**
1. **Minimal Component Overhead:**
   - GoalCard is lightweight (pure display with progress bar)
   - AchievementBadge is simple circular badge (no heavy computation)
   - FloatingActionButton is minimal fixed button
   - No new heavy libraries added

2. **Fast Page Load:**
   - Server Components for non-interactive elements
   - Client Components only where needed (FAB, progress bars)
   - TanStack Query handles efficient data fetching and caching
   - Prefetch goal data on initial load

3. **Image/Icon Optimization:**
   - Icons are SVG-based (Material Symbols - lightweight)
   - No heavy images on goals pages
   - Icons loaded once globally (from Story 4.1)

4. **Efficient Rendering:**
   - Loading skeletons reduce perceived wait time
   - Smooth transitions on data load (transition-all duration-300)
   - Avoid unnecessary re-renders (React.memo if needed)
   - Progress bars use CSS transitions (hardware-accelerated)

**Lighthouse Targets:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

**No Performance Regressions Expected:**
- Goals pages already exist, just visual refresh
- Progress bars are CSS-based (no canvas or heavy rendering)
- Achievement badges are simple circular divs
- FAB is fixed position button (no complex layout calculations)
- Efficient data fetching via TanStack Query

### Accessibility Considerations

**Semantic HTML:**
- Use `<article>` for goal cards (or `<div role="article">`)
- Use `<h1>` for page title (in AppHeader)
- Use `<h2>` for goal title in card
- Use `<h2>` for "Achievements" section header
- Use `<button>` for FAB
- Use `<main>` for page content
- Use `<section>` for goals and achievements sections

**ARIA Labels:**
- Add `aria-label="Goal progress: 75%"` to progress bars
- Add `role="progressbar"` to progress bars
- Add `aria-valuenow="75"` to progress bars (current value)
- Add `aria-valuemin="0"` to progress bars
- Add `aria-valuemax="100"` to progress bars
- Add `aria-label="Achievement: First Goal - Earned"` to earned badges
- Add `aria-label="Achievement: Week Warrior - Locked"` to locked badges
- Add `aria-label="Add new goal"` to FAB
- Add `aria-describedby` to goal cards if additional context needed

**Keyboard Navigation:**
- Ensure goal cards are focusable if interactive (click to view details)
- Ensure FAB is focusable with Tab
- Logical tab order: Header → Goal cards → FAB → Achievements (informational) → Bottom nav
- FAB activates with Enter or Space key
- Visible focus indicators (ring-2 ring-primary-green or ring-graphite-900)
- Ensure no keyboard traps

**Screen Reader Support:**
- Goal card content announced correctly (title, target, progress percentage)
- Progress bar value announced: "Goal progress: 75 percent"
- Achievement badges announced: "Achievement: First Goal - Earned" or "Locked"
- FAB label announced: "Add new goal button"
- Loading state announced ("Loading goals...")
- Empty state message announced

**Color Contrast:**
- White text on primary green (#22c55e): Verify contrast ratio ≥ 4.5:1 (AA) - Expected: 4.89:1 PASS
- Graphite-900 text on white background: Verify contrast ratio ≥ 4.5:1 (AA) - Expected: 14.15:1 PASS
- Graphite-700 text on white background: Verify contrast ratio ≥ 4.5:1 (AA) - Expected: 8.59:1 PASS
- Graphite-600 text on white background: Verify contrast ratio ≥ 4.5:1 (AA) - Expected: 7.00:1 PASS
- Error text (if any) on white: Verify contrast ratio ≥ 4.5:1
- Focus indicators have sufficient contrast
- Use WebAIM Contrast Checker or browser dev tools

**Touch Targets:**
- Goal cards minimum height: h-32 or h-40 (128px or 160px) ✅
- FAB minimum size: w-14 h-14 (56x56px) on mobile ✅ (44px minimum required, 56px is comfortable)
- FAB on desktop: w-16 h-16 (64x64px) optional ✅
- Achievement badges minimum size: w-16 h-16 (64x64px) for small, w-20 h-20 (80x80px) for medium ✅
- CTA button in empty state: 44x44px minimum ✅
- Adequate spacing between goal cards (space-y-6, 24px) ✅

**Responsive Text:**
- Minimum body text size: 16px (text-base)
- Goal title: text-lg/xl (18-20px) scales appropriately on mobile
- Goal target: text-sm or text-base (14-16px) acceptable for secondary text
- Progress percentage: text-base or text-lg (16-18px)
- Days remaining: text-sm (14px) acceptable for tertiary text
- Achievement badge title: text-sm (14px) acceptable
- Ensure text remains readable at all viewport sizes

### Error Handling

**Data Fetching Errors:**
- Catch and display error message if goals fail to load
- Display friendly error message: "Unable to load goals. Please try again."
- Provide retry button or refresh action
- Log error to console for debugging (or Sentry if integrated)

**Empty State Handling:**
- Display empty state if user has no goals
- Friendly message: "No goals yet. Set your first fitness goal!"
- Subtext: "Track your progress and stay motivated" (optional)
- CTA button to create first goal
- Ensure empty state is visually consistent with theme
- Achievements section still displays (locked badges only)

**CRUD Operation Errors:**
- Create goal fails → Display toast or error message
- Update goal fails → Display error, revert optimistic update
- Delete goal fails → Display error, restore deleted item
- Use TanStack Query error handling for mutations
- Provide clear, actionable error messages

**Loading States:**
- Display skeleton while goals are loading
- Skeleton matches goal card dimensions (including progress bar placeholder)
- Avoid content shift when data loads
- Use TanStack Query `isLoading` state

**Edge Cases:**
- No goals exist → Empty state displayed with locked achievements
- Progress value < 0 → Clamp to 0 (0% displayed)
- Progress value > 100 → Clamp to 100 (100% displayed, show completion indicator)
- Goal target very long text → Truncate with ellipsis (line-clamp-2)
- Network offline → Display offline message or cached data
- Goal deleted by another session → Handle via TanStack Query cache invalidation
- Achievement calculation errors → Handle gracefully, show locked state by default

### References

- [Source: docs/fase-2-plan/epics.md#Story-4.5:-Goals-Visual-Polish]
- [Source: docs/sprint-artifacts/tech-spec-epic-4.md#AC-4.5:-Goals-Visual-Polish]
- [Source: docs/fase-3-solutioning/architecture.md#Database-Schema]
- [Source: docs/sprint-artifacts/4-1-navigation-layout-foundation.md#Dev-Agent-Record]
- [Source: docs/sprint-artifacts/4-2-dashboard-visual-polish.md#Dev-Agent-Record]
- [Source: docs/sprint-artifacts/4-3-authentication-pages-visual-polish.md#Dev-Agent-Record]
- [Source: docs/sprint-artifacts/4-4-workouts-visual-polish.md#Dev-Agent-Record]
- [Supabase Database Documentation: https://supabase.com/docs/guides/database]
- [TanStack Query Documentation: https://tanstack.com/query/latest]
- [shadcn/ui Progress Component: https://ui.shadcn.com/docs/components/progress]
- [shadcn/ui Skeleton Component: https://ui.shadcn.com/docs/components/skeleton]
- [Material Symbols Icons: https://fonts.google.com/icons]
- [WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/]
- [WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/4-5-goals-visual-polish.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
