# FitTrack - User Flows

This document outlines the primary user flows for the FitTrack MVP.

---

### 1. Onboarding (New User Registration & Login)

**Goal:** A new user creates an account and logs in for the first time.

1.  **Start:** User lands on the homepage, which presents a clear value proposition and two main calls-to-action: "Log In" and "Sign Up".
2.  User clicks "Sign Up".
3.  **Sign Up Page:** User is presented with a simple form requiring:
    *   Email
    *   Password
    *   Confirm Password
4.  User submits the form.
5.  **Confirmation:** The system creates the account and automatically logs the user in.
6.  **End:** User is redirected to the main "Dashboard" or "Workout History" page, which is initially empty.

---

### 2. Logging a Workout

**Goal:** An authenticated user logs a new workout. Optimized for speed (<30 seconds).

1.  **Start:** User is on the main dashboard.
2.  User clicks the primary call-to-action, "Log New Workout" (or a prominent "+" icon).
3.  **Log Workout Form:** A modal or a dedicated page appears with a simple form:
    *   **Workout Type:** (e.g., "Run", "Weightlifting", "Yoga") - Text input with autocomplete suggestions from past entries.
    *   **Duration:** (e.g., "30 min") - Simple number input.
    *   **Date:** Defaults to today, but can be changed easily.
    *   **Notes (Optional):** A simple text area.
4.  User fills out the required fields and clicks "Save Workout".
5.  **Feedback:** The system provides immediate confirmation (e.g., a "Workout Saved!" toast notification).
6.  **End:** The user is returned to the dashboard/workout history, where the new workout now appears at the top of the list.

---

### 3. Viewing Workout History

**Goal:** An authenticated user views their past workouts.

1.  **Start:** User logs in or navigates to the main dashboard.
2.  **Workout History View:** The main view is a chronological list of past workouts. Each entry in the list clearly displays:
    *   Workout Type
    *   Duration
    *   Date
3.  User can click on a specific workout entry to view its details (including any notes) or to access "Edit" and "Delete" options.
4.  **End:** User has a clear overview of their activity.

---

### 4. Creating a Personal Goal

**Goal:** An authenticated user creates a new personal goal.

1.  **Start:** User navigates to the "Goals" section of the application.
2.  The "Goals" page displays existing goals and a clear "Create New Goal" button.
3.  User clicks "Create New Goal".
4.  **Create Goal Form:** A simple form appears:
    *   **Goal Title:** (e.g., "Run a 10k", "Workout 3 times this week") - Text input.
    *   **Target (Optional):** (e.g., a target date or a numeric target) - Simple input.
5.  User fills out the form and clicks "Save Goal".
6.  **Feedback:** The system provides immediate confirmation.
7.  **End:** The user is returned to the "Goals" page, where the new goal is now visible.
