# Epic 4 UX Component Inventory

**Date:** 2025-12-03  
**Owner:** Charlie (Senior Dev)  
**Purpose:** Comprehensive checklist of components and patterns required for Epic 4 UX Visual Polish implementation.

---

## ✅ Components Already Available (shadcn/ui)

These components are already installed and ready to use:

1. ✅ **Button** - Primary actions, secondary actions
2. ✅ **Card** - Container for content sections
3. ✅ **Input** - Text input fields with icon support
4. ✅ **Label** - Form labels
5. ✅ **Textarea** - Multi-line text input
6. ✅ **Alert Dialog** - Confirmation modals (delete, logout)
7. ✅ **Skeleton** - Loading states
8. ✅ **Sonner** - Toast notifications
9. ✅ **Form** - Form handling with react-hook-form
10. ✅ **Badge** - Status indicators (NEW)
11. ✅ **Progress** - Progress bars for goals (NEW)
12. ✅ **Avatar** - User profile images (NEW)
13. ✅ **Tabs** - Tab navigation (NEW)
14. ✅ **Separator** - Visual dividers (NEW)

---

## 📋 Custom Components to Create

Based on UX mockup analysis, these custom components are needed:

### **Navigation Components**

1. **BottomNav** (Priority: HIGH)
   - Location: `components/navigation/bottom-nav.tsx`
   - Purpose: Fixed bottom navigation with icons + labels
   - Pages: Home, Workouts, Goals, Profile
   - States: Active (primary-green), Inactive (muted)

2. **AppHeader** (Priority: HIGH)
   - Location: `components/navigation/app-header.tsx`
   - Purpose: Sticky top header with back button, title, actions
   - Variants: With back button, without back button, with action buttons

### **Dashboard Components**

3. **StatCard** (Priority: HIGH)
   - Location: `components/dashboard/stat-card.tsx`
   - Purpose: Display single metric (workouts, time, calories)
   - Props: `label`, `value`, `icon` (optional)

4. **GoalProgressCard** (Priority: HIGH)
   - Location: `components/dashboard/goal-progress-card.tsx`
   - Purpose: Show goal with progress bar and status
   - Props: `title`, `current`, `target`, `deadline`, `icon`

5. **RecentActivityCard** (Priority: MEDIUM)
   - Location: `components/dashboard/recent-activity-card.tsx`
   - Purpose: Display recent workout summary with icon
   - Props: `title`, `subtitle`, `value`, `icon`, `iconBg`

### **Icon Components**

6. **WorkoutIcon** (Priority: HIGH)
   - Location: `components/ui/workout-icon.tsx`
   - Purpose: Circular icon with background color
   - Used in: Activity lists, workout cards, goal cards
   - Variants: Small (40px), Medium (48px), Large (56px)

7. **MaterialIcon** (Priority: HIGH)
   - Location: `components/ui/material-icon.tsx`
   - Purpose: Wrapper for Google Material Symbols
   - Props: `name`, `filled`, `className`
   - Note: Need to add Material Symbols font to layout

### **Workout Components**

8. **WorkoutCard** (Priority: HIGH - REFACTOR EXISTING)
   - Location: `components/workouts/workout-card.tsx`
   - Purpose: Update existing card to match green primary-colored design
   - New style: Green background, white text, rounded-xl

9. **WorkoutCalendar** (Priority: MEDIUM)
   - Location: `components/workouts/workout-calendar.tsx`
   - Purpose: Calendar grid showing workout days
   - Features: Month navigation, highlight workout days, select date

### **Goal Components**

10. **AchievementBadge** (Priority: MEDIUM)
    - Location: `components/goals/achievement-badge.tsx`
    - Purpose: Display earned/locked achievements
    - States: Earned (green), Locked (gray)

11. **GoalCard** (Priority: HIGH - REFACTOR EXISTING)
    - Location: `components/goals/goal-card.tsx`
    - Purpose: Update to match UX spec with progress bar
    - Features: Icon, title, progress %, days left

### **Form Components**

12. **IconInput** (Priority: MEDIUM)
    - Location: `components/ui/icon-input.tsx`
    - Purpose: Input field with left icon (email, password)
    - Used in: Login, Signup forms

13. **FloatingActionButton (FAB)** (Priority: HIGH)
    - Location: `components/ui/fab.tsx`
    - Purpose: Fixed floating button (bottom-right) for primary actions
    - Used in: Add new goal, add workout

---

## 🎨 Design System Updates Required

### **1. Google Material Symbols Font**

Add to `app/layout.tsx`:
```tsx
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
```

Add CSS to `app/globals.css`:
```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

### **2. Additional Tailwind Utilities**

Already configured in `app/globals.css`:
- ✅ Primary green: `#2C5F2D`
- ✅ Border radius: `0.75rem`
- ✅ Dark mode support
- ✅ Lexend font

### **3. Color Usage Mapping**

| Element | Light Mode | Dark Mode | Tailwind Class |
|---------|------------|-----------|----------------|
| Background | `#f7f7f7` | `#191919` | `bg-background` |
| Surface/Card | `#ffffff` | `#1C2D22` | `bg-card` |
| Primary Button | `#2C5F2D` | `#2C5F2D` | `bg-primary` |
| Text Primary | `#111813` | `#e2e8f0` | `text-foreground` |
| Text Secondary | `#64748b` | `#94a3b8` | `text-muted-foreground` |
| Border | `#e2e8f0` | `#334155` | `border-border` |
| Accent | `#1A1A1A` | `#f7f7f7` | `bg-accent` |

---

## 📱 Layout Patterns

### **Mobile-First Container**

Already created: `components/layout/container.tsx`
- Max width: 640px (mobile-first)
- Responsive padding
- Centered on desktop

### **Page Structure Pattern**

```tsx
<PageLayout>
  <AppHeader title="Page Title" />
  <Container>
    {/* Page content */}
  </Container>
  <BottomNav />
</PageLayout>
```

---

## 🎯 Epic 4 Component Creation Priority

### **Phase 1: Core Navigation (Story 4.1)**
1. BottomNav
2. AppHeader
3. MaterialIcon

### **Phase 2: Dashboard Components (Story 4.2)**
4. StatCard
5. GoalProgressCard
6. RecentActivityCard
7. WorkoutIcon

### **Phase 3: Form & Auth (Story 4.3)**
8. IconInput
9. Update Login/Signup pages

### **Phase 4: Workouts (Story 4.4)**
10. Refactor WorkoutCard (green styling)
11. WorkoutCalendar (optional)

### **Phase 5: Goals (Story 4.5)**
12. Refactor GoalCard (with progress bar)
13. AchievementBadge
14. FloatingActionButton

---

## 📊 Metrics

- **Total Components Needed:** 13 new/refactored
- **shadcn/ui Components:** 14 (all installed ✅)
- **Estimated Implementation Time:** 6-8 hours across 5 stories
- **Design System Setup:** Complete ✅

---

## ✅ Ready for Epic 4 Story Creation

All foundation work complete:
- ✅ Design system colors implemented
- ✅ Lexend font configured
- ✅ shadcn/ui components installed
- ✅ Layout components created
- ✅ Component inventory documented

**Next Step:** AI-4 - Epic 4 Story Breakdown & Planning
