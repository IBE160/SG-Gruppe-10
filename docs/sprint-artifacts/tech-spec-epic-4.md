# Epic Technical Specification: UX Visual Polish

Date: 2025-12-03
Author: BIP
Epic ID: 4
Status: Draft

---

## Overview

Epic 4 focuses on applying the UX Design Specification's "Green & Graphite" theme across all existing FitTrack pages. This epic transforms the functional MVP (Epics 1-3) into a visually polished, mobile-first application that delivers on the brand promise of being "simple, motivating, and empowering." The work involves implementing a consistent navigation system, modern UI components using shadcn/ui, Google Material Symbols for icons, and the Lexend font family. All five stories in this epic are purely frontend visual enhancements—no database schema changes or backend API modifications are required.

## Objectives and Scope

**In Scope:**
- Implement mobile-first bottom navigation with 4 tabs (Home, Workouts, Goals, Profile)
- Create reusable UI components: BottomNav, AppHeader, MaterialIcon wrapper, StatCard, GoalProgressCard
- Apply Green & Graphite color theme to all pages (primary green #22c55e, graphite grays)
- Polish authentication pages (login/signup) with logo, icons, and modern design
- Enhance workout pages with visual cards, icons, and improved layout
- Enhance goals pages with progress bars, achievement badges, and FAB button
- Implement sticky headers with back buttons and action buttons
- Use Lexend font family across all text elements
- Ensure responsive design with max-width 640px centered on desktop

**Out of Scope:**
- Backend API changes or new endpoints
- Database schema modifications
- New functional features (all functionality from Epics 1-3 remains unchanged)
- Authentication logic changes
- Data model changes
- Performance optimization beyond visual rendering
- Advanced animations or transitions (keep simple and clean)

## System Architecture Alignment

This epic aligns with the established Next.js + Tailwind CSS + shadcn/ui architecture. All components will be created within the existing `components/` directory structure following the PascalCase naming convention. The implementation will leverage:

- **Next.js App Router**: All route layouts remain unchanged; only page components are visually enhanced
- **shadcn/ui Components**: Progress bars, cards, buttons already available; will be styled with custom green theme
- **Tailwind CSS**: Custom colors added to `tailwind.config.ts` for green primary (#22c55e) and graphite shades
- **Google Material Symbols**: Imported via CDN or npm package for consistent iconography
- **Lexend Font**: Integrated via Next.js Font optimization from Google Fonts

No new services, modules, or external integrations are required. This is purely a frontend component and styling enhancement epic.

## Detailed Design

### Services and Modules

| Component | Responsibility | Location | Dependencies |
|-----------|---------------|----------|--------------|
| **BottomNav** | Fixed bottom navigation bar with 4 tabs | `components/common/BottomNav.tsx` | MaterialIcon, Next.js Link |
| **AppHeader** | Sticky top header with back button, title, action button | `components/common/AppHeader.tsx` | MaterialIcon, Next.js useRouter |
| **MaterialIcon** | Wrapper for Google Material Symbols icons | `components/ui/MaterialIcon.tsx` | None (CSS import) |
| **StatCard** | Weekly stats display (workouts count, time, calories) | `components/dashboard/StatCard.tsx` | MaterialIcon |
| **GoalProgressCard** | Goal progress with title, percentage, progress bar | `components/goals/GoalProgressCard.tsx` | shadcn/ui Progress |
| **RecentActivityCard** | Recent workout item with icon and summary | `components/dashboard/RecentActivityCard.tsx` | MaterialIcon, WorkoutIcon |
| **WorkoutIcon** | Icon mapping for workout types | `components/workouts/WorkoutIcon.tsx` | MaterialIcon |
| **IconInput** | Input field with left-aligned icon | `components/auth/IconInput.tsx` | shadcn/ui Input, MaterialIcon |
| **WorkoutCard** | Workout display card with green background | `components/workouts/WorkoutCard.tsx` | MaterialIcon, existing workout data |
| **AchievementBadge** | Badge component with earned/locked states | `components/goals/AchievementBadge.tsx` | MaterialIcon |
| **FloatingActionButton** | FAB for adding new items | `components/ui/FloatingActionButton.tsx` | MaterialIcon, shadcn/ui Button |

### Data Models and Contracts

**No new data models required.** All existing data structures from Epics 1-3 remain unchanged:
- `User` (from Supabase Auth)
- `Workout` (id, user_id, date, type, duration, notes, created_at)
- `Goal` (id, user_id, title, target, created_at)

The UI components will consume these existing types without modification.

### APIs and Interfaces

**No new API endpoints required.** All data fetching uses existing Server Actions and TanStack Query patterns:
- Authentication: Supabase Auth (unchanged)
- Workouts: Existing workout queries/mutations
- Goals: Existing goal queries/mutations

Component interfaces (TypeScript props):

```typescript
// BottomNav.tsx
interface BottomNavProps {
  activeTab: 'home' | 'workouts' | 'goals' | 'profile';
}

// AppHeader.tsx
interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  actionButton?: { icon: string; onClick: () => void; label: string };
}

// MaterialIcon.tsx
interface MaterialIconProps {
  icon: string;
  className?: string;
  filled?: boolean;
}

// StatCard.tsx
interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
}

// GoalProgressCard.tsx
interface GoalProgressCardProps {
  title: string;
  target: string;
  progress: number; // 0-100
  daysRemaining?: number;
}
```

### Workflows and Sequencing

**Story 4.1 (Navigation Foundation):**
1. Install Google Material Symbols package or add CDN link
2. Create MaterialIcon wrapper component
3. Create BottomNav component with 4 tabs (Home, Workouts, Goals, Profile)
4. Create AppHeader component with back/title/action props
5. Update root layout to include BottomNav on all authenticated pages
6. Update individual pages to use AppHeader

**Story 4.2 (Dashboard Polish):**
1. Create StatCard component for weekly stats
2. Create GoalProgressCard for goal display
3. Create RecentActivityCard for workout summaries
4. Create WorkoutIcon mapping component
5. Update home dashboard page to use new components
6. Fetch existing workout/goal data and display in new UI

**Story 4.3 (Auth Pages Polish):**
1. Add Lexend font to Next.js config
2. Create IconInput component
3. Update login page with new design (logo, icons, styling)
4. Update signup page with new design
5. Apply green/graphite color theme

**Story 4.4 (Workouts Polish):**
1. Refactor WorkoutCard with primary green background
2. Update workout history list with new cards
3. Update workout details page with enhanced styling
4. Add workout type icons using MaterialIcon

**Story 4.5 (Goals Polish):**
1. Enhance GoalCard with progress bar
2. Create AchievementBadge component
3. Create FloatingActionButton component
4. Update goals page with new components
5. Add earned/locked badge logic based on goal completion

## Non-Functional Requirements

### Performance

- Page load times must remain under 2 seconds (per existing NFR-001 from PRD)
- Component rendering must not introduce perceptible lag (< 100ms)
- Icon loading should be optimized (consider icon font preload or sprite sheets)
- Images (logo, badges) should use Next.js Image component with proper sizing
- Tailwind CSS should be purged in production to minimize bundle size
- Target Lighthouse score: Performance ≥ 90, Accessibility ≥ 95

### Security

- No new security requirements (all authentication unchanged)
- Ensure no sensitive data is exposed in client-side component props
- Material Icons loaded from trusted CDN or npm package only
- Font files loaded via Next.js Font optimization (automatic security)

### Reliability/Availability

- UI components must gracefully handle missing or null data (defensive rendering)
- Progress bars must safely handle progress values outside 0-100 range
- Icon fallbacks for missing workout types or achievements
- Responsive breakpoints must work across all device sizes (320px to 1920px)
- No breaking changes to existing functionality from Epics 1-3

### Observability

- No additional observability requirements beyond existing Sentry setup
- Console errors/warnings should be resolved (no PropType mismatches)
- Component render performance can be monitored via React DevTools if needed
- Ensure meaningful component names for debugging (not anonymous functions)

## Dependencies and Integrations

**New Dependencies Required:**

| Dependency | Version | Purpose | Installation |
|------------|---------|---------|--------------|
| `material-symbols` | Latest | Google Material Symbols icon font | `pnpm add material-symbols` OR use CDN |
| `@next/font` | Built-in | Optimize Lexend font loading | Already included in Next.js 16 |

**Existing Dependencies (No Changes):**

| Dependency | Current Version | Usage in Epic 4 |
|------------|----------------|-----------------|
| `next` | 16.0.5 | App Router, Font optimization, Image optimization |
| `react` | 19.2.0 | Component library |
| `tailwindcss` | 4.0+ (from architecture) | Custom color theme, responsive utilities |
| `shadcn/ui` | Latest | Progress, Button, Input components |
| `@supabase/supabase-js` | 2.x | Auth state (read-only) |

**Integration Points:**

- **Google Material Symbols**: Either npm package or CDN link in layout
  - Recommended: npm package for offline support and bundle optimization
  - CDN option: `<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">`
  
- **Google Fonts (Lexend)**: Via Next.js Font API
  ```typescript
  import { Lexend } from 'next/font/google'
  const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })
  ```

- **Tailwind Config**: Custom colors added to `tailwind.config.ts`
  ```typescript
  theme: {
    extend: {
      colors: {
        primary: { green: '#22c55e' },
        graphite: { 50: '#f9fafb', 100: '#f3f4f6', 700: '#374151', 900: '#111827' }
      }
    }
  }
  ```

**No External Service Integrations:** All changes are frontend-only using existing infrastructure.

## Acceptance Criteria (Authoritative)

### AC-4.1: Navigation & Layout Foundation
1. Fixed bottom navigation bar visible on all authenticated pages with 4 tabs
2. Active tab highlighted in primary green (#22c55e), inactive tabs in muted gray
3. Each tab shows icon (Material Symbol) and label text
4. Sticky header present on all pages with back button (when applicable), page title, and optional action button
5. Layout is mobile-first with max-width 640px, centered on desktop
6. Clicking navigation tabs changes route and updates active state

### AC-4.2: Dashboard Visual Polish
7. Home dashboard displays 3 weekly stat cards (workouts count, total time, calories)
8. Goal progress cards show title, target, percentage, and progress bar in primary green
9. Recent activity list shows last 5 workouts with icons and summaries
10. All components use Green & Graphite color theme consistently
11. Design matches UX mockup specification (logging-dashboard.html)

### AC-4.3: Authentication Pages Visual Polish
12. Login and signup pages display FitTrack logo in green circular badge
13. Input fields have left-aligned icons (mail for email, lock for password)
14. Primary action button is large, green, and visually prominent
15. Pages use Lexend font family throughout
16. Design is centered, mobile-responsive, matches login-screen-dashboard.html

### AC-4.4: Workouts Visual Polish
17. Workout cards have primary green background (#22c55e) with white text
18. Cards display workout icon, title, date, duration prominently
19. Workout history list uses card-based layout with rounded-xl corners
20. Workout details page uses enhanced styling with clear visual hierarchy
21. Design matches workout-history-dashboard.html mockup

### AC-4.5: Goals Visual Polish
22. Goal cards show progress bar with percentage complete (0-100%)
23. Achievement badges display with earned state (full color) or locked state (grayed)
24. Floating Action Button (FAB) in bottom-right corner for adding new goals
25. Progress bars use primary green color for fill
26. Design matches goals-achievements-dashboard.html mockup

### Cross-Cutting Criteria
27. All pages load without console errors or warnings
28. Responsive design works on mobile (320px), tablet (768px), and desktop (1024px+)
29. All existing functionality from Epics 1-3 remains intact (no regressions)
30. Lighthouse accessibility score ≥ 95

## Traceability Mapping

| AC # | Epic 4 Story | Component(s) | Test Approach |
|------|--------------|--------------|---------------|
| AC-4.1.1-6 | Story 4.1 | BottomNav, AppHeader | Visual regression, E2E navigation test |
| AC-4.2.7-11 | Story 4.2 | StatCard, GoalProgressCard, RecentActivityCard | Component unit test, visual snapshot |
| AC-4.3.12-15 | Story 4.3 | IconInput, Login/Signup pages | E2E auth flow, visual regression |
| AC-4.4.17-21 | Story 4.4 | WorkoutCard, workout pages | Component test, E2E workout list |
| AC-4.5.22-26 | Story 4.5 | GoalCard, AchievementBadge, FAB | Component test, visual snapshot |
| AC-27 | All stories | All components | Jest unit tests, console log checks |
| AC-28 | All stories | Layout, responsive CSS | Playwright viewport tests |
| AC-29 | All stories | Existing features | Regression test suite (Epics 1-3) |
| AC-30 | All stories | Semantic HTML, ARIA | Lighthouse CI, axe-core |

## Risks, Assumptions, Open Questions

### Risks
**RISK-1: Visual Regression**
- **Description:** Changes to global styles or components could break existing pages not explicitly tested
- **Mitigation:** Run full regression test suite after each story; use visual snapshot testing with Playwright
- **Severity:** Medium

**RISK-2: Performance Impact**
- **Description:** Adding Material Icons and custom fonts could increase bundle size or slow initial load
- **Mitigation:** Use Next.js Font optimization, icon tree-shaking, and measure before/after with Lighthouse
- **Severity:** Low

**RISK-3: Icon Availability**
- **Description:** Material Symbols may not have perfect icons for all workout types
- **Mitigation:** Define fallback icon mapping; use generic "fitness_center" for unmapped types
- **Severity:** Low

**RISK-4: Mobile Layout Edge Cases**
- **Description:** Fixed bottom nav might overlap with content on very small screens (<320px)
- **Mitigation:** Set min-height for content area; test on smallest supported devices
- **Severity:** Low

### Assumptions
**ASSUMPTION-1:** Existing Epics 1-3 functionality is stable and well-tested (basis for non-regression)
**ASSUMPTION-2:** UX mockups (HTML files) accurately represent desired final design
**ASSUMPTION-3:** shadcn/ui Progress component supports custom colors via Tailwind classes
**ASSUMPTION-4:** Team has design approval for the Green & Graphite theme from UX Designer (Sally)

### Open Questions
**QUESTION-1:** Should Material Icons be loaded via npm or CDN?
- **Recommendation:** npm for better offline support and bundle optimization
- **Decision Needed By:** Story 4.1 start

**QUESTION-2:** Do we need dark mode support in Epic 4?
- **Recommendation:** Defer to post-MVP (not in current PRD scope)
- **Decision Needed By:** Story 4.1 start

**QUESTION-3:** Should we add loading skeletons for stats and goals?
- **Recommendation:** Yes, use shadcn/ui Skeleton component for better UX
- **Decision Needed By:** Story 4.2 implementation

## Test Strategy Summary

### Unit Testing (Jest + React Testing Library)
- **Scope:** All new components (BottomNav, AppHeader, MaterialIcon, StatCard, GoalProgressCard, etc.)
- **Coverage Target:** 80% line coverage for new components
- **Key Tests:**
  - Component renders without crashing
  - Props correctly affect rendering (active tab, progress values, etc.)
  - Click handlers fire correctly
  - Edge cases (null data, invalid progress values)

### Integration Testing (React Testing Library)
- **Scope:** Component integration with existing pages
- **Key Tests:**
  - BottomNav integrates with routing
  - StatCard displays real workout data
  - GoalProgressCard calculates progress correctly
  - Forms submit with new IconInput components

### E2E Testing (Playwright)
- **Scope:** Critical user flows with new UI
- **Key Tests:**
  - Login flow with new auth page design
  - Navigate between tabs using BottomNav
  - View workout history with new cards
  - View goals with progress bars
  - Add new goal using FAB
- **Viewports:** Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)

### Visual Regression Testing (Playwright Snapshots)
- **Scope:** All updated pages
- **Baseline:** Capture snapshots after Story 4.1 completion
- **Key Snapshots:**
  - Login page
  - Dashboard page
  - Workout history page
  - Workout details page
  - Goals page

### Accessibility Testing
- **Tools:** Lighthouse CI, axe-core
- **Target:** Accessibility score ≥ 95
- **Key Checks:**
  - Proper heading hierarchy
  - ARIA labels on icon-only buttons
  - Keyboard navigation for BottomNav and FAB
  - Color contrast ratios (green on white, white on green)

### Manual Testing Checklist
- [ ] Test on real iPhone (Safari)
- [ ] Test on real Android device (Chrome)
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (VoiceOver or NVDA)
- [ ] Verify no console errors/warnings
- [ ] Compare to UX mockups side-by-side
