# Story 4.1: Navigation & Layout Foundation

Status: ready-for-dev

## Story

As a FitTrack user,
I want to navigate between different sections of the app using a consistent mobile-first interface,
So that I can easily access workouts, goals, and my profile with a modern, intuitive design.

## Acceptance Criteria

1. **AC-1:** Given I am logged into FitTrack, when I view any page in the app, then I see a fixed bottom navigation bar with 4 tabs: "Home", "Workouts", "Goals", "Profile".
2. **AC-2:** And each tab displays an icon (Material Symbol) and label text.
3. **AC-3:** And the active tab is highlighted in primary green color (#22c55e).
4. **AC-4:** And inactive tabs are displayed in muted gray.
5. **AC-5:** And I see a sticky header at the top with back button (when applicable), page title, and optional action button.
6. **AC-6:** And the layout is mobile-first with centered content on desktop (max-width 640px).
7. **AC-7:** And clicking navigation tabs changes route and updates active state.

## Tasks / Subtasks

- [ ] **Install Google Material Symbols (AC: 2)**
  - [ ] Decide: npm package vs CDN approach
  - [ ] Install `material-symbols` package via `pnpm add material-symbols`
  - [ ] Or add CDN link to root layout
  - [ ] Verify icon font loads correctly

- [ ] **Create MaterialIcon Wrapper Component (AC: 2)**
  - [ ] Create `components/ui/MaterialIcon.tsx`
  - [ ] Props: `icon` (string), `className` (optional), `filled` (boolean, default false)
  - [ ] Support both outlined and filled icon variants
  - [ ] Export TypeScript interface: `MaterialIconProps`
  - [ ] Test with sample icons: `home`, `fitness_center`, `flag`, `person`

- [ ] **Create BottomNav Component (AC: 1, 2, 3, 4, 7)**
  - [ ] Create `components/common/BottomNav.tsx`
  - [ ] Props: `activeTab` ('home' | 'workouts' | 'goals' | 'profile')
  - [ ] Implement fixed bottom positioning (`fixed bottom-0 left-0 right-0`)
  - [ ] 4 navigation tabs with icons and labels:
    - Home: icon `home`, label "Home"
    - Workouts: icon `fitness_center`, label "Workouts"
    - Goals: icon `flag`, label "Goals"
    - Profile: icon `person`, label "Profile"
  - [ ] Active tab styling: primary green (#22c55e), bold label
  - [ ] Inactive tab styling: muted gray (#9ca3af)
  - [ ] Use Next.js `Link` component for navigation
  - [ ] Routes: `/` (home), `/workouts` (workouts), `/goals` (goals), `/profile` (profile)
  - [ ] Add z-index to ensure nav stays on top
  - [ ] Mobile-first responsive design

- [ ] **Create AppHeader Component (AC: 5)**
  - [ ] Create `components/common/AppHeader.tsx`
  - [ ] Props: `title` (string), `showBackButton` (boolean, default false), `actionButton` (optional object with icon, onClick, label)
  - [ ] Implement sticky top positioning (`sticky top-0`)
  - [ ] Left section: Back button (MaterialIcon `arrow_back`) when `showBackButton` is true
  - [ ] Center section: Page title (text, bold, truncate if needed)
  - [ ] Right section: Optional action button (MaterialIcon + onClick handler)
  - [ ] Background: white with subtle border-bottom
  - [ ] Use `useRouter()` from Next.js for back navigation

- [ ] **Update Root Layout for Authenticated Pages (AC: 1, 6)**
  - [ ] Determine authenticated layout pattern
  - [ ] Option A: Wrap `(dashboard)` layout with BottomNav
  - [ ] Option B: Add BottomNav to each authenticated page
  - [ ] Recommended: Create new layout at `app/(dashboard)/layout.tsx`
  - [ ] Include BottomNav at bottom of layout
  - [ ] Add padding-bottom to content area to prevent overlap with fixed nav
  - [ ] Implement max-width 640px with centered content (`max-w-[640px] mx-auto`)
  - [ ] Add padding for mobile spacing

- [ ] **Update Individual Pages with AppHeader (AC: 5)**
  - [ ] Update `app/(dashboard)/page.tsx` (Home) - Title: "Dashboard", no back button
  - [ ] Update `app/(dashboard)/workouts/page.tsx` (Workouts) - Title: "Workouts", no back button
  - [ ] Update `app/(dashboard)/goals/page.tsx` (Goals) - Title: "Goals", no back button, action button: "Add Goal"
  - [ ] Create `app/(dashboard)/profile/page.tsx` (Profile) - Title: "Profile", no back button
  - [ ] Workout details page (if exists): Title: "Workout Details", show back button
  - [ ] Ensure AppHeader is consistent across all pages

- [ ] **Install and Configure Lexend Font (AC: 6)**
  - [ ] Import Lexend from `next/font/google` in root layout
  - [ ] Configure font weights: 300, 400, 500, 600, 700
  - [ ] Configure subsets: ['latin']
  - [ ] Apply font to `<body>` tag with className
  - [ ] Update `tailwind.config.ts` to include Lexend in font-family if needed
  - [ ] Verify font loads and displays across all pages

- [ ] **Add Custom Colors to Tailwind Config (AC: 3)**
  - [ ] Update `tailwind.config.ts` with custom colors
  - [ ] Primary green: `#22c55e` (extend colors as `primary.green`)
  - [ ] Graphite shades: `{ 50: '#f9fafb', 100: '#f3f4f6', 700: '#374151', 900: '#111827' }`
  - [ ] Verify colors are available in components (`text-primary-green`, `bg-primary-green`)
  - [ ] Test color contrast for accessibility

- [ ] **Create Profile Page Placeholder (AC: 1)**
  - [ ] Create `app/(dashboard)/profile/page.tsx`
  - [ ] Implement Server Component with authentication check
  - [ ] Display user email from Supabase Auth
  - [ ] Add "Logout" button (use existing logout Server Action)
  - [ ] Use AppHeader with title "Profile"
  - [ ] Add placeholder content: "Profile features coming soon"

- [ ] **Update Navigation Active State Logic (AC: 7)**
  - [ ] Use `usePathname()` hook from Next.js to detect current route
  - [ ] Pass current route to BottomNav as `activeTab` prop
  - [ ] Ensure active tab updates when route changes
  - [ ] Test navigation between all 4 tabs

- [ ] **Manual Testing & Verification (AC: All)**
  - [ ] Test: Login and navigate to dashboard → Verify BottomNav appears
  - [ ] Test: Click each tab → Verify navigation works and active state updates
  - [ ] Test: Verify active tab is green, inactive tabs are gray
  - [ ] Test: Verify icons and labels display correctly on all tabs
  - [ ] Test: Verify AppHeader displays on each page with correct title
  - [ ] Test: Verify back button works on detail pages
  - [ ] Test: Verify action button (Add Goal) works on Goals page
  - [ ] Test: Verify layout is centered with max-width 640px on desktop
  - [ ] Test: Verify mobile-first responsive design on various screen sizes (320px, 375px, 768px, 1024px)
  - [ ] Test: Verify Lexend font loads and displays correctly
  - [ ] Test: Verify no layout overlap between header, content, and bottom nav
  - [ ] Test: Test on real mobile device (iOS Safari, Android Chrome)

- [ ] **Update Sprint Status (AC: All)**
  - [ ] Update `docs/sprint-artifacts/sprint-status.yaml`
  - [ ] Change status: `4-1-navigation-layout-foundation: backlog` → `4-1-navigation-layout-foundation: ready-for-dev`
  - [ ] Mark story ready for development

## Dev Notes

### Requirements Context Summary

**Epic 4: UX Visual Polish**  
Story 4.1 is the foundation story for Epic 4, establishing the core navigation and layout system that all subsequent stories will build upon. This story implements mobile-first bottom navigation, sticky headers, and the base design system (Lexend font, Green & Graphite colors, Google Material Symbols).

**From Epics File:**
- Epic 4, Story 4.1 (Foundation story, prerequisite for Stories 4.2-4.5)
- Prerequisites: Epic 3 complete (all functional features implemented)
- Implement bottom navigation with 4 tabs (Home, Workouts, Goals, Profile)
- Implement sticky header with back button and action button support
- Establish mobile-first layout with max-width 640px
- Apply Green & Graphite color theme
- Use Lexend font family
- Use Google Material Symbols for icons

**From Tech Spec (Epic 4):**
- Bottom navigation icons: `home`, `fitness_center`, `flag`, `person`
- Primary green color: `#22c55e`
- Graphite grays: 50, 100, 700, 900
- Layout max-width: 640px centered on desktop
- Fixed bottom nav with z-index management
- Sticky top header with back/title/action sections

**From Architecture Document:**
- Next.js App Router: All routes already exist from Epics 1-3
- Component structure: `components/common/` for shared components
- Tailwind CSS: Custom colors via `tailwind.config.ts`
- Next.js Font API for Lexend optimization
- No backend changes required (purely frontend)

**Key Design Decisions:**
1. **Material Symbols**: Use npm package for offline support and bundle optimization (vs CDN)
2. **Layout Strategy**: Create `(dashboard)` layout wrapper with BottomNav
3. **Font Loading**: Use Next.js Font API for automatic optimization
4. **Color System**: Extend Tailwind theme with custom green and graphite colors
5. **Profile Page**: Create placeholder page to complete 4-tab navigation

### Learnings from Previous Story (Story 3.2: View Goals)

**From Story 3.2 (Status: done)** ✅

**Architecture Patterns to Follow:**
- ✅ Server Components for pages with authentication checks
- ✅ Client Components for interactive UI (use `'use client'`)
- ✅ TypeScript interfaces for all component props
- ✅ shadcn/ui components for consistent styling
- ✅ Tailwind CSS utility classes for styling
- ✅ PascalCase naming for components

**Component Structure Established:**
- `app/(dashboard)/` - Authenticated routes grouping
- `components/ui/` - shadcn/ui components
- `components/common/` - Shared reusable components (NEW for Story 4.1)
- `hooks/` - Custom React hooks

**Testing Approach:**
- Manual testing checklist for all acceptance criteria
- Test on multiple devices and screen sizes
- Verify authentication flow
- Verify responsive design

**No Database Changes Required:**
- Story 3.2 was purely frontend (like Story 4.1)
- All data models from Epics 1-3 remain unchanged
- Focus on UI/UX enhancements only

**Key Takeaway:**
Epic 4 stories are exclusively frontend visual enhancements. No Server Actions, database migrations, or API changes required. Maintain existing functionality while applying new design system.

### Project Structure Notes

**New Files to Create:**
- `components/ui/MaterialIcon.tsx` - Icon wrapper component
- `components/common/BottomNav.tsx` - Bottom navigation component
- `components/common/AppHeader.tsx` - Sticky header component
- `app/(dashboard)/profile/page.tsx` - Profile page placeholder
- `app/(dashboard)/layout.tsx` - Dashboard layout with BottomNav (if doesn't exist)

**Files to Modify:**
- `tailwind.config.ts` - Add custom colors (primary green, graphite shades)
- `app/layout.tsx` - Add Lexend font import and configuration
- `app/(dashboard)/page.tsx` - Add AppHeader
- `app/(dashboard)/workouts/page.tsx` - Add AppHeader (if missing)
- `app/(dashboard)/goals/page.tsx` - Add AppHeader with action button

**Dependencies to Install:**
- `material-symbols` (if using npm approach)

**Existing Project Structure (from Architecture):**
```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (dashboard)/
│   ├── goals/page.tsx
│   ├── workouts/page.tsx (to be verified)
│   └── page.tsx (home dashboard)
├── layout.tsx (root layout)
└── ...

components/
├── ui/ (shadcn/ui components)
├── common/ (NEW - shared components)
├── auth/
├── workouts/
└── goals/
```

### Architectural Considerations

**From Architecture Document:**

**Component Design Principles:**
- Mobile-first responsive design
- Semantic HTML with proper accessibility
- TypeScript for type safety
- Tailwind CSS utility-first styling
- Reusable, composable components

**Navigation Architecture:**
- Fixed bottom navigation: Always visible on authenticated pages
- Sticky top header: Page-specific title and actions
- Next.js Link for client-side navigation (no full page reload)
- `usePathname()` hook for active state detection
- `useRouter()` hook for programmatic navigation

**Layout System:**
- Max-width constraint: 640px (mobile-optimized)
- Centered on desktop: `mx-auto` utility
- Padding for mobile: Consistent spacing
- Z-index management: Header (50), BottomNav (40), Content (0)

**Font Optimization:**
Next.js Font API automatically handles:
- Font file hosting
- Preloading
- Font-display swap
- Subset optimization
- Zero layout shift (CLS)

**Color System:**
Extend Tailwind theme (don't override):
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

Usage: `text-primary-green`, `bg-graphite-700`, etc.

**Icon System:**
Material Symbols provide 2500+ icons in 3 styles:
- Outlined (default)
- Filled
- Rounded

Use outlined style for consistent UI. Filled style for emphasis.

### Testing Strategy

**Manual Testing Checklist (Comprehensive):**

**Authentication & Routing:**
1. Login → Verify redirect to dashboard with BottomNav
2. Navigate to each tab → Verify routes work
3. Logout → Verify redirect to login (no BottomNav)
4. Direct URL access → Verify auth redirect works

**Bottom Navigation:**
5. Verify 4 tabs visible: Home, Workouts, Goals, Profile
6. Verify icons display correctly (Material Symbols loaded)
7. Verify labels display correctly
8. Click each tab → Verify route changes
9. Verify active tab is green (#22c55e)
10. Verify inactive tabs are gray (#9ca3af)
11. Verify active state updates on route change

**App Header:**
12. Home page → Verify header title "Dashboard", no back button
13. Workouts page → Verify header title "Workouts", no back button
14. Goals page → Verify header title "Goals", action button "Add Goal"
15. Profile page → Verify header title "Profile", no back button
16. Click action button → Verify handler fires (opens goal form)
17. Detail page → Verify back button appears and works

**Layout & Responsive Design:**
18. Desktop (1024px+) → Verify content is centered, max-width 640px
19. Tablet (768px) → Verify responsive layout
20. Mobile (375px) → Verify mobile-first design
21. Mobile (320px) → Verify smallest screen size
22. Verify no overlap between header, content, bottom nav
23. Verify padding prevents content from being hidden behind nav

**Typography:**
24. Verify Lexend font loads across all pages
25. Verify font weights display correctly (300, 400, 500, 600, 700)
26. Verify text is readable and well-spaced

**Colors:**
27. Verify primary green (#22c55e) displays correctly
28. Verify graphite grays display correctly
29. Check color contrast for accessibility (use browser dev tools)

**Cross-Browser & Device:**
30. Test on Chrome (desktop and mobile)
31. Test on Safari (iOS)
32. Test on Firefox (desktop)
33. Test on Android Chrome

**Performance:**
34. Check Lighthouse score (Performance ≥ 90, Accessibility ≥ 95)
35. Verify no console errors or warnings
36. Verify font loads without layout shift (CLS)

**Automated Testing (Deferred to Test Epic):**
- Component unit tests: BottomNav, AppHeader, MaterialIcon
- Integration tests: Navigation flow
- E2E tests: Tab navigation, back button, active state
- Visual regression tests: Compare screenshots before/after

### Dependencies and Integration

**New Dependencies:**
| Package | Version | Purpose | Installation |
|---------|---------|---------|--------------|
| `material-symbols` | Latest | Google Material Symbols icon font | `pnpm add material-symbols` |

**Existing Dependencies (No Changes):**
- `next` (^16.0.5) - Framework, Font API, Image optimization
- `react` (^19.2.0) - Component library
- `tailwindcss` (^4.0+) - Styling
- `@supabase/supabase-js` (^2.x) - Auth state (read-only)

**Integration Points:**
1. **Google Material Symbols:**
   - Import CSS in root layout or component
   - Use via className: `<span className="material-symbols-outlined">home</span>`
   - Or wrap in MaterialIcon component

2. **Next.js Font API:**
   - Import in `app/layout.tsx`
   - Apply to body: `<body className={lexend.className}>`

3. **Tailwind Config:**
   - Extend theme with custom colors
   - Use in components: `text-primary-green`, `bg-primary-green`

4. **Next.js Routing:**
   - Use `Link` component for navigation
   - Use `usePathname()` for active state
   - Use `useRouter()` for back navigation

5. **Existing Components:**
   - Goals page: Add action button to AppHeader (opens existing GoalForm)
   - Workout pages: Add AppHeader if missing
   - Authentication: Verify BottomNav only shows when logged in

**No Backend Integration Required:**
- No Server Actions
- No database changes
- No API endpoints
- No environment variables

### Security Considerations

**No New Security Concerns:**
- Material Symbols loaded from npm (trusted source)
- Font files loaded via Next.js Font API (automatic security)
- No sensitive data exposed in navigation components
- All existing auth checks remain in place

**Authentication Flow:**
- BottomNav only renders on authenticated routes
- Auth check happens in Server Components (existing pattern)
- Navigation doesn't bypass authentication

### Performance Considerations

**Font Loading:**
- Use Next.js Font API for automatic optimization
- Fonts preloaded and served from same origin
- Font-display: swap for fast initial render
- Zero layout shift (CLS = 0)

**Icon Loading:**
- npm package: Icons bundled with app (no external request)
- CDN: Additional network request (slower)
- Recommendation: npm package for better performance

**Bundle Size:**
- Tailwind CSS purged in production (remove unused classes)
- Material Symbols: Only include used icons if possible
- Lexend font: Only include used weights (300-700)

**Target Lighthouse Scores:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

### Accessibility Considerations

**Semantic HTML:**
- Use `<nav>` element for BottomNav
- Use `<header>` element for AppHeader
- Use `<button>` for interactive elements (not `<div>`)

**ARIA Labels:**
- Add `aria-label` to icon-only buttons
- Add `aria-current="page"` to active tab
- Add `role="navigation"` to BottomNav

**Keyboard Navigation:**
- Ensure all tabs are focusable (Tab key)
- Ensure Enter/Space activates tabs
- Visible focus indicators (outline)

**Color Contrast:**
- Verify green (#22c55e) on white meets WCAG AA (4.5:1 for text)
- Verify gray (#9ca3af) on white meets WCAG AA
- Use browser dev tools or Lighthouse to check

**Screen Reader Support:**
- Icon labels should be descriptive ("Home", "Workouts", etc.)
- Back button should announce "Go back"
- Action buttons should announce purpose ("Add Goal")

### References

- [Source: docs/fase-2-plan/epics.md#Story-4.1:-Navigation-&-Layout-Foundation]
- [Source: docs/sprint-artifacts/tech-spec-epic-4.md#AC-4.1]
- [Source: docs/fase-3-solutioning/architecture.md#Project-Structure]
- [Source: docs/fase-2-ux/ux-design-specification.md] (If exists - UX mockups)
- [Material Symbols Documentation: https://fonts.google.com/icons]
- [Next.js Font Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/fonts]
- [Tailwind CSS Customization: https://tailwindcss.com/docs/theme]

## Dev Agent Record

### Context Reference

- `docs/sprint-artifacts/4-1-navigation-layout-foundation.context.xml`

### Agent Model Used

claude-3-7-sonnet-20250219 (SM Agent - Bob)

### Debug Log References

### Completion Notes List

### File List

