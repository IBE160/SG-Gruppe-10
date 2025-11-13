# FitTrack - Wireframes

This document provides low-fidelity wireframes for the main screens of the FitTrack MVP. The layout prioritizes a clean, minimalist, and mobile-first design.

---

### 1. Main Dashboard / Workout History

**Purpose:** To provide an at-a-glance view of recent activity and serve as the primary navigation hub.

```
+------------------------------------------------------+
| [FitTrack Logo]              [Goals] [Profile/Logout]|
|------------------------------------------------------|
|                                                      |
|  Hello, [User]!                                      |
|                                                      |
|  +-------------------------------------------------+ |
|  |               Log New Workout [+]               | |
|  +-------------------------------------------------+ |
|                                                      |
|  ------------------- Your History ------------------ |
|                                                      |
|  +------------------------------------------[ > ]-+ |
|  |  **Run**                                       | |
|  |  45 min - Today                              | |
|  +------------------------------------------------+ |
|                                                      |
|  +------------------------------------------[ > ]-+ |
|  |  **Weightlifting**                             | |
|  |  60 min - Yesterday                          | |
|  +------------------------------------------------+ |
|                                                      |
|  +------------------------------------------[ > ]-+ |
|  |  **Yoga**                                      | |
|  |  30 min - Nov 11, 2025                       | |
|  +------------------------------------------------+ |
|                                                      |
|  ... (older workouts) ...                            |
|                                                      |
+------------------------------------------------------+
```
**Notes:**
*   **Header:** Simple navigation. "Goals" takes the user to the goals screen.
*   **Primary CTA:** A large, prominent "Log New Workout" button is the main focus, enabling the core user action with one click.
*   **History:** A clean, reverse-chronological list of workouts. Each item is scannable. Clicking an item (or the `>`) would navigate to a detail view for editing or deleting.

---

### 2. Log Workout Form (Modal Overlay)

**Purpose:** To allow fast and frictionless workout logging. This appears as a modal overlay on top of the dashboard.

```
+------------------------------------------------------+
|            **Log Your Workout**                [X]   |
|------------------------------------------------------|
|                                                      |
|  Workout Type                                        |
|  [ Run___________________________________________ ]  |
|                                                      |
|  Duration (minutes)      Date                        |
|  [ 45________ ]          [ Today_________▼ ]         |
|                                                      |
|  Notes (Optional)                                    |
|  [ ______________________________________________ ]  |
|  [ ______________________________________________ ]  |
|                                                      |
|  +------------------------------------------------+   |
|  |                  Save Workout                  |   |
|  +------------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
```
**Notes:**
*   **Modal:** Using a modal keeps the user in the context of the dashboard.
*   **Simplicity:** The form has a minimal number of fields.
*   **Defaults:** "Date" defaults to the current day to speed up the process.
*   **Clear Actions:** A clear "Save Workout" button and an "X" to cancel.

---

### 3. Goals Screen

**Purpose:** To let users view their existing goals and add new ones.

```
+------------------------------------------------------+
| [FitTrack Logo]              [Dashboard] [Profile]   |
|------------------------------------------------------|
|                                                      |
|  Your Personal Goals                                 |
|                                                      |
|  +-------------------------------------------------+ |
|  |                Create New Goal [+]              | |
|  +-------------------------------------------------+ |
|                                                      |
|  ----------------------------------------------------|
|                                                      |
|  +------------------------------------------------+ |
|  | **Run a 10k**                                  | |
|  | Target: Dec 31, 2025                           | |
|  +------------------------------------------------+ |
|                                                      |
|  +------------------------------------------------+ |
|  | **Workout 3 times per week**                   | |
|  |                                                | |
|  +------------------------------------------------+ |
|                                                      |
|  ... (other goals) ...                               |
|                                                      |
+------------------------------------------------------+
```
**Notes:**
*   **Navigation:** The header now links back to the "Dashboard".
*   **Primary Action:** A clear "Create New Goal" button is presented at the top.
*   **Goal List:** Existing goals are displayed as simple cards. Future iterations could show progress bars here.
*   **Create Goal Form:** Clicking "Create New Goal" would likely use a similar modal form as the "Log Workout" feature to maintain consistency.
