# ibe160 - Epic Breakdown

**Author:** BIP
**Date:** 2025-11-28
**Project Level:** beginner
**Target Scale:** {{target_scale}}

---

## Overview

This document provides the complete epic and story breakdown for ibe160, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

**Living Document Notice:** This is the initial version. It will be updated after UX Design and Architecture workflows add interaction and technical details to stories.

**Available Context:**
- ✅ PRD (required)
- ℹ️ Creating basic epic structure (can be enhanced later with UX/Architecture)

This breakdown consists of 3 epics designed to deliver incremental value:

- **Epic 1: Foundation & User Authentication:** Establishes the project foundation and allows users to create accounts and log in.
- **Epic 2: Core Workout Management:** Enables users to log, view, and manage their workouts.
- **Epic 3: Personal Goal Setting:** Allows users to set and view their personal fitness goals.

---

## Functional Requirements Inventory

- **FR-001:** User registration and authentication.
- **FR-002:** Create, view, update, and delete workouts (with date, type, duration, and notes).
- **FR-003:** View workout history (a simple, chronological list).
- **FR-004:** Create and view personal goals (with a title and a target, e.g., "run 10k" or "work out 3 times a week").

---

## FR Coverage Map

- **Epic 1 (Foundation & User Authentication):** Covers FR-001.
- **Epic 2 (Core Workout Management):** Covers FR-002, FR-003.
- **Epic 3 (Personal Goal Setting):** Covers FR-004.

---

## Epic 1: Foundation & User Authentication

Establish the project foundation and allow users to create accounts and log in.

### Story 1.1: Project Setup

As a developer,
I want to have a project structure with all necessary dependencies and build tools configured,
So that I can start developing features efficiently.

**Acceptance Criteria:**

**Given** a new project,
**When** I run the setup script,
**Then** the project structure is created.
**And** the frontend and backend dependencies are installed.
**And** the development server can be started.
**And** basic linting and formatting rules are in place.

**Prerequisites:** None

**Technical Notes:** This story involves setting up the repository, a basic CI/CD pipeline, and the initial configuration for the frontend and backend frameworks.

### Story 1.2: User Registration

As a new user,
I want to be able to register for an account using my email and a password,
So that I can access the application.

**Acceptance Criteria:**

**Given** a user is on the registration page,
**When** they enter a valid email and password, and click "Register",
**Then** a new user account is created.
**And** the user is logged in.
**And** they are redirected to the main dashboard.
**And** an error message is shown if the email is already in use.
**And** password strength requirements are enforced.

**Prerequisites:** Story 1.1

**Technical Notes:** This will use Supabase for authentication. The frontend will have a registration form with validation.

### Story 1.3: User Login

As a registered user,
I want to be able to log in with my email and password,
So that I can access my account.

**Acceptance Criteria:**

**Given** a user is on the login page,
**When** they enter their correct email and password, and click "Login",
**Then** the user is logged in.
**And** they are redirected to the main dashboard.
**And** an error message is shown for invalid credentials.

**Prerequisites:** Story 1.2

**Technical Notes:** This will use Supabase for authentication. The frontend will have a login form.

### Story 1.4: User Logout

As a logged-in user,
I want to be able to log out of the application,
So that my account is secure.

**Acceptance Criteria:**

**Given** a user is logged in,
**When** they click the "Logout" button,
**Then** the user is logged out.
**And** they are redirected to the login page.

**Prerequisites:** Story 1.3

**Technical Notes:** This will involve clearing the session/token from the client-side.

---

## Epic 2: Core Workout Management

Enable users to log, view, and manage their workouts.

### Story 2.1: Create Workout

As a logged-in user,
I want to be able to log a new workout with details like date, type, duration, and notes,
So that I can keep a record of my activities.

**Acceptance Criteria:**

**Given** a user is on the "Log Workout" page,
**When** they fill in the workout details and click "Save",
**Then** a new workout is created and associated with their account.
**And** they are redirected to the workout history page.
**And** the new workout appears in their history.
**And** all fields are validated.

**Prerequisites:** Story 1.3

**Technical Notes:** This will require a form in the frontend and a corresponding API endpoint in the backend to save the workout data to the database.

### Story 2.2: View Workout History

As a logged-in user,
I want to be able to see a chronological list of all my past workouts,
So that I can review my progress.

**Acceptance Criteria:**

**Given** a user is on the "Workout History" page,
**Then** all their past workouts are displayed in reverse chronological order.
**And** each workout in the list shows the date, type, and duration.

**Prerequisites:** Story 2.1

**Technical Notes:** This requires a frontend page to display the list of workouts and a backend endpoint to fetch the workouts for the logged-in user.

### Story 2.3: View Workout Details

As a logged-in user,
I want to be able to click on a workout in my history to see all its details,
So that I can remember what I did.

**Acceptance Criteria:**

**Given** a user is on the "Workout History" page,
**When** they click on a workout,
**Then** they are taken to a page showing all the details of that workout, including notes.

**Prerequisites:** Story 2.2

**Technical Notes:** This requires a dynamic route in the frontend to display the details of a specific workout.

### Story 2.4: Update Workout

As a logged-in user,
I want to be able to edit the details of a past workout,
So that I can correct any mistakes.

**Acceptance Criteria:**

**Given** a user is viewing the details of a workout,
**When** they click the "Edit" button,
**Then** they are presented with a form to edit the workout's details.
**And** when they save the changes, the workout is updated.
**And** they are returned to the workout details view.

**Prerequisites:** Story 2.3

**Technical Notes:** This requires a form pre-filled with the workout data and a backend endpoint to handle the update.

### Story 2.5: Delete Workout

As a logged-in user,
I want to be able to delete a past workout,
So that I can remove incorrect entries.

**Acceptance Criteria:**

**Given** a user is viewing the details of a workout,
**When** they click the "Delete" button and confirm,
**Then** the workout is permanently deleted.
**And** they are returned to the workout history page.

**Prerequisites:** Story 2.3

**Technical Notes:** This requires a backend endpoint to delete the workout from the database. A confirmation dialog should be implemented on the frontend.

---

## Epic 3: Personal Goal Setting

Allow users to set and view their personal fitness goals.

### Story 3.1: Create Goal

As a logged-in user,
I want to be able to create a new personal goal with a title and a target,
So that I can track my progress towards it.

**Acceptance Criteria:**

**Given** a user is on the "Goals" page,
**When** they click "Create Goal" and fill in the goal details,
**Then** a new goal is created and associated with their account.
**And** the new goal appears in their list of goals.

**Prerequisites:** Story 1.3

**Technical Notes:** This will require a form in the frontend and a corresponding API endpoint in the backend to save the goal data to the database.

### Story 3.2: View Goals

As a logged-in user,
I want to be able to see a list of all my personal goals,
So that I can be reminded of what I'm working towards.

**Acceptance Criteria:**

**Given** a user is on the "Goals" page,
**Then** all their personal goals are displayed.
**And** each goal in the list shows the title and target.

**Prerequisites:** Story 3.1

**Technical Notes:** This requires a frontend page to display the list of goals and a backend endpoint to fetch the goals for the logged-in user.

---

## Epic 4: UX Visual Polish

Apply the UX Design Specification (Green & Graphite theme) to all existing pages with mobile-first responsive design, modern components, and enhanced visual polish.

### Story 4.1: Navigation & Layout Foundation

As a FitTrack user,
I want to navigate between different sections of the app using a consistent mobile-first interface,
So that I can easily access workouts, goals, and my profile with a modern, intuitive design.

**Acceptance Criteria:**

**Given** I am logged into FitTrack,
**When** I view any page in the app,
**Then** I see a fixed bottom navigation bar with 4 tabs: "Home", "Workouts", "Goals", "Profile".
**And** each tab displays an icon and label.
**And** the active tab is highlighted in primary green color.
**And** inactive tabs are displayed in muted gray.
**And** I see a sticky header at the top with back button, page title, and optional action button.
**And** the layout is mobile-first with centered content on desktop.

**Prerequisites:** Epic 3 complete, Design system setup (AI-3)

**Technical Notes:** Create BottomNav, AppHeader, and MaterialIcon wrapper components. Implement mobile-first layout pattern with max-width 640px. Use Google Material Symbols for icons.

### Story 4.2: Dashboard Visual Polish

As a FitTrack user,
I want to see an engaging dashboard with visual statistics and goal progress,
So that I feel motivated and can quickly understand my fitness status.

**Acceptance Criteria:**

**Given** I am logged into FitTrack,
**When** I view the home dashboard,
**Then** I see weekly snapshot cards displaying workouts count, total time, and calories.
**And** I see goal progress cards with progress bars showing percentage complete.
**And** I see recent activity list with workout icons and summaries.
**And** all components use the Green & Graphite color theme.
**And** the design matches the UX mockup specifications.

**Prerequisites:** Story 4.1

**Technical Notes:** Create StatCard, GoalProgressCard, RecentActivityCard, and WorkoutIcon components. Use shadcn/ui Progress component for goal bars. Update home page to match logging-dashboard.html mockup.

### Story 4.3: Authentication Pages Visual Polish

As a new or returning user,
I want to see polished login and signup pages with modern design,
So that my first impression of FitTrack is professional and trustworthy.

**Acceptance Criteria:**

**Given** I visit the login or signup page,
**When** the page loads,
**Then** I see the FitTrack logo in a green circular badge.
**And** I see input fields with left-aligned icons (email, password).
**And** I see a large primary green button for sign in/sign up.
**And** the page uses Lexend font and Green & Graphite colors.
**And** the design is centered and mobile-responsive.
**And** the page matches the login-screen-dashboard.html mockup.

**Prerequisites:** Story 4.1

**Technical Notes:** Create IconInput component for inputs with left icons. Update Login and Signup pages to match UX mockup. Add FitTrack logo/icon display. Use Material Symbols for icons (mail, lock).

### Story 4.4: Workouts Visual Polish

As a FitTrack user,
I want to see my workouts displayed with attractive cards and visual styling,
So that reviewing my workout history is enjoyable and easy to scan.

**Acceptance Criteria:**

**Given** I view my workout history or workout details,
**When** the page loads,
**Then** workout cards have green backgrounds with white text.
**And** cards display workout icon, title, date, and summary metrics.
**And** cards use rounded corners (rounded-xl) for modern appearance.
**And** the list is easy to scan with clear visual hierarchy.
**And** the design matches workout-history-dashboard.html mockup.

**Prerequisites:** Story 4.2

**Technical Notes:** Refactor WorkoutCard component to use primary green background. Update workout list and details pages with new styling. Consider adding WorkoutCalendar component (optional). Maintain existing Server Actions and data flow.

### Story 4.5: Goals Visual Polish

As a FitTrack user,
I want to see my goals with progress bars and achievement badges,
So that I feel accomplished and motivated to continue.

**Acceptance Criteria:**

**Given** I view my goals page,
**When** the page loads,
**Then** each goal card displays an icon, title, progress percentage, and days remaining.
**And** progress bars visually show completion percentage in primary green.
**And** I see achievement badges for earned milestones (full color) and locked achievements (grayed out).
**And** I see a floating action button (FAB) in the bottom-right corner to add new goals.
**And** the design matches goals-achivements-dashboard.html mockup.

**Prerequisites:** Story 4.4

**Technical Notes:** Refactor GoalCard to include Progress component and status display. Create AchievementBadge component with earned/locked states. Create FloatingActionButton (FAB) component. Update goals page styling. Maintain existing goal creation/viewing functionality.

---

## FR Coverage Matrix

- **FR-001: User registration and authentication.** → Epic 1, Stories 1.2, 1.3, 1.4
- **FR-002: Create, view, update, and delete workouts.** → Epic 2, Stories 2.1, 2.2, 2.3, 2.4, 2.5
- **FR-003: View workout history.** → Epic 2, Story 2.2
- **FR-004: Create and view personal goals.** → Epic 3, Stories 3.1, 3.2
- **UX-001: Visual polish and user experience enhancements.** → Epic 4, Stories 4.1, 4.2, 4.3, 4.4, 4.5

---

## Summary

The epic breakdown is complete, with **4 epics and 16 stories**. All functional requirements from the PRD are covered, plus UX visual polish for enhanced user experience. The breakdown is structured to deliver incremental value.

**Epic Summary:**
- **Epic 1:** Foundation & User Authentication (4 stories)
- **Epic 2:** Core Workout Management (5 stories)
- **Epic 3:** Personal Goal Setting (2 stories)
- **Epic 4:** UX Visual Polish (5 stories)

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document will be updated after UX Design and Architecture workflows to incorporate interaction details and technical decisions._
