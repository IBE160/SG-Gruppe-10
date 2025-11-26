# FitTrack UX Design Specification

_Last Updated: 2025-11-26 by Sally (UX Designer)_
_Based on original by BIP and refined from design sketches._

---

## Executive Summary

This document outlines the User Experience (UX) design for FitTrack, a web application designed to be simple, motivating, and empowering. Following a review of detailed design sketches, this specification has been updated to reflect a unified and visually consistent direction.

*   **Vision:** To create a fitness tracking app that feels engaging, not like a chore.
*   **Target Users:** Fitness enthusiasts who are tired of overly complex apps and desire a straightforward tool to log workouts, see progress, and stay motivated.
*   **Core Experience:** The design prioritizes a frictionless login and an effortless system for logging workouts, tracking goals, and viewing history, all presented in a clean, card-based interface.
*   **Desired Feeling:** The user should feel **efficient and productive** at every step.
*   **Platform:** A mobile-responsive web application with a strong focus on a mobile-first experience.
*   **Key Design Principles:** The UX is built on a clear central hub, a minimal number of clicks for core actions, smart reusability of workouts, and a disciplined focus on simplicity.

---

## 1. User Personas

To ensure our design decisions are grounded in user-centric thinking, we have developed the following personas to represent our key user segments.

### Persona 1: Alex, the Efficient Logger

*   **Bio:** Alex is a 28-year-old software developer who has been consistently working out for the past 5 years. They value routine and efficiency in all aspects of life, including their fitness. They typically do a mix of strength training and cardio 3-4 times a week.
*   **Quote:** *"I know what I'm doing at the gym. I just need a super fast way to track my lifts and runs without getting bogged down in features I don't use."*
*   **Goals:**
    *   Log a workout in under 30 seconds.
    *   Easily view past performance for a specific exercise (e.g., "What was my bench press last week?").
    *   Track personal records (PRs) automatically.
*   **Frustrations:**
    *   Apps with slow, multi-step logging processes.
    *   Cluttered dashboards full of social feeds, articles, and workout suggestions.
    *   Inaccurate exercise databases that make logging a chore.

### Persona 2: Sam, the Goal-Driven Motivator

*   **Bio:** Sam is a 34-year-old project manager who thrives on setting and achieving goals. They got into fitness to improve their overall health and are motivated by tangible progress. They enjoy challenges, whether it's training for a half-marathon or hitting a new squat weight.
*   **Quote:** *"For me, it's all about the journey and seeing how far I've come. I want an app that celebrates my milestones and keeps me focused on the next one."*
*   **Goals:**
    *   Set clear, measurable fitness goals (e.g., "Run 100km this month," "Complete 15 workouts").
    *   Visualize progress towards goals with clear charts and percentages.
    *   Receive notifications or badges when a goal is achieved.
    *   Look back at their workout history over months to see long-term trends.
*   **Frustrations:**
    *   Apps that make it difficult to set custom goals.
    *   Poor data visualization that doesn't clearly show progress over time.
    *   Lack of a sense of accomplishment or "gamification."

---

## 2. Design System Foundation

### 2.1 Design System Choice

**Chosen Design System:** shadcn/ui

**Rationale:** This choice provides a robust foundation for FitTrack, balancing rapid development with full customization control. The provided sketches for login, logging, goals, and history dashboards will serve as the primary visual and structural guide for selecting and customizing `shadcn/ui` components. This ensures high quality, accessibility, and seamless integration with our Next.js/Tailwind stack.

---

## 3. Core User Experience

### 3.1 Defining Experience

The defining experience of FitTrack, as described by a user to a friend, will be: **"It's so easy and effective to use."**

This statement is our north star. It dictates that our design priority is not to invent novel interactions, but to ruthlessly simplify and refine existing, proven UX patterns for workout logging and tracking. Every design decision will be measured against this promise of ease and effectiveness.

### 3.2 Novel UX Patterns

No novel UX patterns were identified or required for FitTrack, as the design focuses on simplifying and refining existing, proven UX patterns for workout logging and tracking.

### Related Documents

- Product Requirements: `docs/PRD.md`
- Product Brief: `docs/product-brief.md`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: `ux-color-themes.html`
  - An interactive HTML file showcasing the unified "Green & Graphite" color theme derived from the sketches.

- **Design Direction Mockups**: The provided HTML files (`goals-achivements-dashboard.html`, `logging-dashboard.html`, `login-screen-dashboard.html`, `workout-history-dashboard.html`) collectively serve as the interactive mockups for this design direction.
  - Full-screen mockups of key screens that define the visual language and layout.

### 3.3 Desired Emotional Response

Users should feel **efficient and productive** when using FitTrack. The design will focus on streamlining workflows and providing clear feedback to reinforce these feelings, ensuring that every interaction contributes to a sense of accomplishment and forward momentum in their fitness journey.

### 3.4 Inspiration Analysis

Analysis of competitor apps (Centr, Sweat, Fitbod) reveals several key principles for creating an "efficient and productive" user experience:

*   **A Clear, Central Hub:** Successful apps provide a central dashboard for the user's day or progress. For FitTrack, this will be a simple home screen that surfaces recent activity and makes it incredibly easy to log a new workout or repeat a previous one.
*   **Minimize Clicks for Core Actions:** The path to logging a workout—the most critical user action—must be ruthlessly optimized. The design will target a maximum of 2-3 clicks from opening the app to a workout being successfully logged.
*   **Smart Reusability over Complex AI:** Instead of complex AI for workout generation, FitTrack's "smart" feature will be making it trivial to find and repeat a previous workout. This directly addresses user needs and removes the mental burden of repetitive data entry.
*   **Simplicity as a Core Feature:** A key weakness in competitor apps is feature overload. FitTrack's strategic advantage will be its disciplined focus on the core experience of logging and tracking, avoiding the complexity that leads to user friction.

### 3.5 Core Experience Principles

To deliver on the promise of "easy and effective," the following principles will guide all design decisions:

*   **Speed:** Key actions, especially logging and re-logging workouts, must feel instantaneous. The interface will be optimized for performance and minimal wait times.
*   **Guidance:** The app will intelligently guide users to the next logical action without being intrusive. This will be achieved through smart defaults, clear calls-to-action, and a predictable information architecture.
*   **Simplicity & Focus:** The design will prioritize simplicity and focus, providing just enough flexibility for users to log what they need without being overwhelmed by options. The ability to save and reuse workouts is a key example of providing flexibility without adding complexity.
*   **Clear Feedback:** All interactions will provide immediate, clear, and positive confirmation. Users will never be left wondering if an action was successful. This reinforces the feeling of effectiveness.

---

## 4. Visual Foundation

### 4.1 Color System

The color system for FitTrack has been consolidated into a single, unified theme named **"Green & Graphite"**, based on the visual language of the provided sketches. This theme supports both light and dark modes to ensure a comfortable viewing experience in any environment.

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

#### 4.2 Typography

-   **Font Families:** 'Lexend' for headings and display text, with a standard sans-serif for body content (e.g., system UI fonts).
-   **Type Scale:** Defined hierarchy (e.g., text-xs to text-3xl used in mockups) to ensure clear visual structure.
-   **Font Weights:** Regular (400), Medium (500), and Bold (700) for emphasis.
-   **Line Heights:** Standardized for optimal readability across various text sizes.

#### 4.3 Spacing & Layout

-   **Spacing System:** A consistent spacing scale (seen in Tailwind classes like `p-4`, `gap-4`) is used for all padding, margins, and gaps to ensure visual rhythm.
-   **Layout Grid:** A flexible, mobile-first grid system that adapts to different screen sizes.
-   **Container Widths:** Content is constrained by max-widths on larger screens for optimal readability, becoming fluid on smaller viewports.

---

## 5. Design Direction

### 5.1 Chosen Design Approach

**Clean, Card-Based Dashboard with Mobile-First Responsiveness**

The design, as defined by the sketches, utilizes a clean, modern aesthetic with a strong emphasis on card-based layouts for organizing information.

*   **Layout:** Predominantly single-column on mobile, adapting to multi-column card grids on larger screens. Sticky headers and a fixed bottom navigation bar provide consistent and ergonomic navigation on mobile devices.
*   **Visual Hierarchy:** Clear, bold headings (`Lexend` font) establish a strong visual hierarchy. Information is grouped logically within cards with rounded corners and subtle shadows, making it scannable and digestible.
*   **Interaction Patterns:** Standard tap/click interactions are used. The use of Material Symbols provides clear, universally understood visual cues for actions and information.
*   **Visual Style:** A balanced and minimalist visual weight. Dark mode is a first-class citizen, providing a comfortable and stylish alternative for users.
*   **Content Approach:** The interface is data-driven, clearly presenting key metrics, progress bars, and chronological lists of activities to give users an immediate sense of their progress.

**Interactive Mockups:**

- The provided HTML files (`goals-achivements-dashboard.html`, `logging-dashboard.html`, `login-screen-dashboard.html`, `workout-history-dashboard.html`) serve as the definitive interactive mockups for this design direction.

---

## 6. User Journey Flows

### 6.1 Critical User Paths

#### User Journey: User Registration and Authentication

**User Goal:** A new user wants to sign in or create an account.

**Approach:** A clean, focused login screen that also provides a clear path to sign up.

**Flow Steps (as per `login-screen-dashboard.html`):**

1.  **Entry: Land on Login Screen**
    *   **User sees:** A centered layout with the app logo, a "Welcome Back" message, and fields for Email and Password.
    *   **User does:** Enters their credentials.
    *   **System responds:** Input fields have clear focus states.

2.  **Action: Sign In**
    *   **User sees:** A prominent, solid "Sign In" button.
    *   **User does:** Clicks the "Sign In" button.
    *   **System responds:** Authenticates the user and redirects to the main dashboard (`logging-dashboard.html`).

3.  **Alternative: Sign Up**
    *   **User sees:** A "Don't have an account? Sign Up" link below the main form.
    *   **User does:** Clicks the "Sign Up" link.
    *   **System responds:** Navigates to a registration screen (to be designed, but will follow the same visual style).

#### User Journey: Create, View, Update, and Delete Workouts

**User Goal:** To efficiently manage their workout records.

**Approach:** Streamlined interaction with clear entry points and feedback, centered around the main dashboard and history views.

**Flow Steps:**

1.  **Create Workout:**
    *   **Entry:** From the main dashboard (`logging-dashboard.html`), the user clicks the prominent "Log New Workout" button.
    *   **User sees:** A dedicated "Log Workout" screen.
    *   **User does:** Fills in workout details and saves.
    *   **System responds:** Redirects to the dashboard or history, showing the new workout in the "Recent Activity" list.

2.  **View Workout History:**
    *   **Entry:** User navigates to the "History" tab via the bottom navigation.
    *   **User sees:** The `workout-history-dashboard.html` view, with a calendar for date selection and a chronological list of workouts for the selected period.
    *   **User does:** Taps on a workout in the list.
    *   **System responds:** Navigates to a detailed view of that workout.

3.  **Update/Delete Workout:**
    *   **Entry:** From the workout detail view, the user finds "Edit" or "Delete" controls (often behind a "more_vert" icon as seen in `workout-history-dashboard.html`).
    *   **User does:** Chooses to edit or delete.
    *   **System responds:** Opens the workout form for editing or shows a confirmation modal for deletion.

#### User Journey: Create and View Personal Goals

**User Goal:** To set new fitness goals, track their progress, and view achievements.

**Approach:** A dedicated goals section with clear progress indicators and a gallery of achievements.

**Flow Steps (as per `goals-achivements-dashboard.html`):**

1.  **Access Goals:**
    *   **Entry:** User navigates to the "Goals" tab via the bottom navigation.
    *   **User sees:** The "Goals & Achievements" screen.

2.  **View Achievements:**
    *   **User sees:** A grid of earned achievements (e.g., "First Workout," "7-Day Streak") at the top, visually distinguished from locked achievements.

3.  **Track Active Goals:**
    *   **User sees:** A list of "Active Goals" presented as cards. Each card shows the goal title, progress (e.g., "35/50 km"), a visual progress bar, and time remaining.

4.  **Create New Goal:**
    *   **Entry:** User clicks the floating action button with an "add" icon.
    *   **User sees:** A form to define a new goal (e.g., type, target, deadline).
    *   **User does:** Fills out and saves the goal.
    *   **System responds:** The new goal appears in the "Active Goals" list.

---

## 7. Component Library

### 7.1 Component Strategy

The component strategy will primarily leverage **shadcn/ui**, with the provided HTML mockups serving as the definitive visual guide for selecting, customizing, and assembling these components.

**Key Components Identified in Sketches:**
*   **Buttons:** Solid primary, secondary/muted variants, floating action buttons, and icon-only buttons.
*   **Cards:** Used extensively for dashboards, lists, and content grouping.
*   **Inputs:** Text inputs with leading icons.
*   **Navigation:** Sticky top headers and a fixed bottom navigation bar for mobile.
*   **Progress Bars:** Linear progress indicators for goals.
*   **Avatars/Icons:** Used for profile pictures and visual cues.
*   **Lists:** For displaying chronological data like workout history.

---

## 8. UX Pattern Decisions

### 8.1 Consistency Rules

The UX patterns established in the sketches will be the standard for the application.

*   **Button Hierarchy:**
    *   **Primary Actions:** Solid, high-contrast background (e.g., `bg-brand-green`).
    *   **Secondary Actions:** Lower-contrast background (e.g., `bg-slate-200` or `bg-slate-700`).
*   **Feedback Patterns:**
    *   **Success:** Non-intrusive "toast" or "snackbar" notifications.
    *   **Error:** Inline error messages displayed directly below the relevant form field.
*   **Form Patterns:**
    *   **Labels:** Screen-reader only (`sr-only`) where an icon and placeholder provide sufficient visual context (as in `login-screen-dashboard.html`).
*   **Navigation Patterns:**
    *   **Active State:** The active tab in the bottom navigation has a distinct color (`text-brand-green`).
*   **Empty State Patterns:**
    *   When a list has no content, a clear message with an icon and a call-to-action will be displayed (as designed in `workout-history-dashboard.html`).

---

## 9. Responsive Design & Accessibility

### 9.1 Responsive Strategy

FitTrack will implement a fully mobile-responsive design, as demonstrated by the mobile-first nature of the sketches.

*   **Mobile (Small Screens):** Single-column layouts, vertical scrolling, and a fixed bottom navigation bar are the primary interaction model.
*   **Desktop (Large Screens):** The card-based design will adapt naturally to multi-column grids, making efficient use of horizontal space.

### 9.2 Accessibility Strategy

We will target **WCAG 2.1 Level AA compliance**.

*   **Color Contrast:** The "Green & Graphite" theme has been designed with contrast in mind, but all final component implementations must be verified.
*   **Keyboard Navigation:** All interactive elements must be fully keyboard-operable.
*   **Focus Indicators:** Clear, visible focus indicators are required.
*   **ARIA Attributes:** Use appropriate ARIA roles to enhance semantic meaning.
*   **Alt Text:** All meaningful images and icons must have descriptive alternatives.

---

## 10. Implementation Guidance

### 10.1 Completion Summary

This specification has been successfully updated to reflect the consolidated design direction from the provided sketches.

**Your Deliverables:**
-   UX Design Document: `docs/fase-2-design/ux-design-specification.md` (This file)
-   Interactive Color Themes: `ux-color-themes.html`
-   Design Direction Mockups: The four HTML sketch files.

**What happens next:**
-   Developers can now implement the frontend, using this specification and the associated mockups as their guide. The design is clear, consistent, and ready for production.

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._

