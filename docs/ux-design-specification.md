# FitTrack - UX Design Specification

**Version:** 1.0
**Author:** UX Designer
**Date:** 2025-11-13

---

## 1. Introduction

This document provides the complete User Experience (UX) and User Interface (UI) design specification for the Minimum Viable Product (MVP) of FitTrack. The design adheres to the core principles of being **clean, minimalist, intuitive, and motivating**.

This specification synthesizes the following documents:
*   [User Flows](./user-flows.md)
*   [Wireframes](./wireframes.md)
*   [UI Style Guide](./ui-style-guide.md)

---

## 2. Overall Design & Feel

FitTrack's interface is designed to be an encouraging and frictionless companion on a user's fitness journey. The aesthetic is clean and spacious, using a simple color palette and clear typography to ensure content is the hero. The primary action color (a vibrant blue) is used strategically to guide users toward key actions like logging a workout or creating a goal, making the experience intuitive and efficient.

---

## 3. Screen Mockup Descriptions

This section describes the appearance and functionality of each main screen, combining the structure from the wireframes with the visual elements from the style guide.

### 3.1. Main Dashboard / Workout History

*   **Layout:** As defined in the [Wireframes](./wireframes.md#1-main-dashboard--workout-history). A two-column layout on desktop, stacking into a single column on mobile.
*   **Header:** A clean white header contains the **FitTrack Logo** (using primary text color `#212529`). On the right, text links for "**Goals**" and "**Logout**" use the secondary text color (`#6C757D`), turning to primary blue on hover.
*   **Primary Action:** Below the header is a full-width, prominent button with a solid blue (`#007BFF`) background and white text: "**Log New Workout [+]**". This is the page's focal point.
*   **History List:** The "Your History" section is a chronological list of workouts displayed on off-white (`#F8F9FA`) cards with rounded corners.
    *   Each card shows the **Workout Type** in bold (`16px, Medium`) and the **Duration & Date** in secondary text (`14px, Regular`).
    *   A subtle chevron icon `>` on the right of each card indicates it's clickable. Tapping a card will lead to a detail/edit view.

### 3.2. Log Workout Form (Modal)

*   **Appearance:** This form appears as a modal overlay, dimming the dashboard behind it to focus the user's attention. The modal has a white background and rounded corners.
*   **Form Fields:** As defined in the [Wireframes](./wireframes.md#2-log-workout-form-modal-overlay).
    *   Labels ("Workout Type", "Duration") use the secondary text color (`#6C757D`).
    *   Input fields have a light grey border that turns vibrant blue (`#007BFF`) on focus, providing clear feedback.
*   **Action Button:** The "**Save Workout**" button at the bottom is a full-width primary action button (solid blue with white text), identical in style to the "Log New Workout" button for consistency.

### 3.3. Goals Screen

*   **Layout:** Similar to the dashboard, with a clear header and a list of content.
*   **Header:** The header provides a link back to the "**Dashboard**".
*   **Primary Action:** A prominent "**Create New Goal [+]**" button (primary blue) sits at the top of the content area.
*   **Goals List:** Existing goals are displayed on individual cards, similar to the workout history items.
    *   The **Goal Title** is displayed in bold.
    *   The **Target**, if set, is displayed below it in secondary text.
*   **Creating a Goal:** Clicking the "Create New Goal" button will open a modal form that is stylistically identical to the "Log Workout" form, ensuring a consistent and predictable user experience.

---

## 4. Next Steps

This design specification provides a comprehensive guide for the front-end development of the FitTrack MVP. Developers should use this document in conjunction with the referenced user flows, wireframes, and style guide to build the application's interface.
