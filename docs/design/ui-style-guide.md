# FitTrack - UI Style Guide

This document outlines the visual style and UI principles for the FitTrack application, ensuring a consistent, clean, and motivating user experience.

---

### 1. Design Philosophy

*   **Minimalist:** Every element should have a purpose. We avoid clutter and unnecessary decoration.
*   **Clarity:** Information should be presented in a clear, hierarchical, and easily scannable manner.
*   **Motivating:** The design should feel encouraging and positive, using color and feedback to celebrate user progress.
*   **Mobile-First:** The design is conceived for mobile screens first, then adapted for larger screens.

---

### 2. Color Palette

The palette is simple, with a primary action color to guide the user, a neutral background, and supporting colors for feedback.

*   **Primary Action Color:**
    *   `#007BFF` (Vibrant Blue)
    *   **Usage:** For all primary buttons ("Log Workout", "Save"), links, and active states. This color should draw the user's attention to the most important actions.

*   **Neutral Colors:**
    *   `#FFFFFF` (White) - **Background:** Used for the main background of the app to create a sense of space and cleanliness.
    *   `#F8F9FA` (Off-White) - **Subtle Backgrounds:** For cards or sections to differentiate them slightly from the main background.
    *   `#212529` (Dark Grey/Almost Black) - **Primary Text:** For all body copy, headings, and labels. Provides high contrast and readability.
    *   `#6C757D` (Medium Grey) - **Secondary Text:** For less important information like timestamps or placeholder text.

*   **Feedback Colors:**
    *   `#28A745` (Green) - **Success:** For confirmation messages (e.g., "Workout Saved!").
    *   `#DC3545` (Red) - **Error/Delete:** For error messages and delete confirmation buttons.
    *   `#FFC107` (Yellow/Amber) - **Warning/Notifications:** For non-critical alerts or reminders.

---

### 3. Typography

We will use a clean, sans-serif font that is highly readable on all screen sizes.

*   **Font Family:** **Inter** (or a similar system font like -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif). Inter is chosen for its excellent readability at various sizes and weights.

*   **Font Scale:**
    *   **H1 (Page Titles):** 28px, Bold (e.g., "Your History", "Personal Goals")
    *   **H2 (Section Titles):** 22px, Bold
    *   **Body (Primary Text):** 16px, Regular
    *   **Secondary Text/Labels:** 14px, Regular
    *   **Button Text:** 16px, Medium

---

### 4. UI Components

*   **Buttons:**
    *   **Primary:** Solid background (`Primary Action Blue`), white text, rounded corners (e.g., 8px). Should have a subtle shadow to lift it off the page.
    *   **Secondary:** White background, blue text, blue border.
    *   **Icon Buttons:** Simple icons with no border or background for actions like "Edit" or "Delete".

*   **Forms:**
    *   Inputs should have a light grey border, which turns blue on focus.
    *   Labels are placed above the input fields.
    *   Generous spacing between fields to avoid a cramped feeling.

*   **Cards:**
    *   Used for workout history items and goals.
    *   Have a subtle border (`#E9ECEF`) or a light box-shadow.
    *   Rounded corners (e.g., 8px).
    *   Contain clear, well-spaced information.

*   **Spacing:**
    *   Use a consistent spacing scale (e.g., multiples of 8px) for margins, padding, and layout to create a harmonious rhythm.
    *   Generous white space is key to the minimalist aesthetic.
