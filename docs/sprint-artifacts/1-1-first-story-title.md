# Story 1.1: Project Setup

Status: drafted

## Story

As a developer,
I want to have a project structure with all necessary dependencies and build tools configured,
So that I can start developing features efficiently.

## Acceptance Criteria

1.  Given a new project,
2.  When I run the setup script,
3.  Then the project structure is created.
4.  And the frontend and backend dependencies are installed.
5.  And the development server can be started.
6.  And basic linting and formatting rules are in place.

## Tasks / Subtasks

- [ ] **Initialize Next.js Project (AC: 1)**
  - [ ] Execute `npx create-next-app@latest . --typescript --eslint --tailwind --app --import-alias "@/*"` [Source: docs/fase-3-solutioning/architecture.md#Project-Initialization]
  - [ ] Verify `next.config.mjs` includes `@/*` alias configuration [Source: docs/fase-3-solutioning/architecture.md#Project-Initialization]
  - [ ] Validate generated project structure against Architecture Document's "Project Structure" section [Source: docs/fase-3-solutioning/architecture.md#Project-Structure]
  - [ ] **Testing:** Manually inspect `tsconfig.json` and directory layout for adherence to architecture.
- [ ] **Install Dependencies (AC: 2)**
  - [ ] Run `pnpm install` to install all project dependencies. [Source: docs/fase-3-solutioning/architecture.md#Development-Environment]
  - [ ] **Testing:** Verify successful installation and check `pnpm-lock.yaml` (or equivalent) for consistency.
- [ ] **Configure Development Server (AC: 3)**
  - [ ] Ensure `pnpm dev` command is available and correctly starts the development server. [Source: docs/fase-3-solutioning/architecture.md#Development-Environment]
  - [ ] **Testing:** Start the development server (`pnpm dev`) and confirm it is accessible at `localhost:3000` without errors.
- [ ] **Implement Linting and Formatting (AC: 4)**
  - [ ] Verify `.eslintrc.json` is configured for TypeScript and React. [Source: docs/fase-3-solutioning/architecture.md#Project-Initialization]
  - [ ] Ensure Prettier is integrated for code formatting. [Source: docs/fase-3-solutioning/architecture.md#Project-Initialization]
  - [ ] **Testing:** Run `pnpm lint` and `pnpm format` (or equivalent) to confirm no linting errors or formatting issues.

## Dev Notes

### Requirements Context Summary

**Epic 1: Foundation & User Authentication**
This epic establishes the foundational features of the FitTrack application, enabling user accounts and workout management.

**Story 1.1: Project Setup**
As a developer, I want to have a project structure with all necessary dependencies and build tools configured, so that I can start developing features efficiently.

**Extracted Acceptance Criteria:**
- Given a new project,
- When I run the setup script,
- Then the project structure is created.
- And the frontend and backend dependencies are installed.
- And the development server can be started.
- And basic linting and formatting rules are in place.

### Architectural Considerations for Project Setup:

**Project Initialization (from Architecture Document):**
The project will be initialized using `npx create-next-app@latest . --typescript --eslint --tailwind --app --import-alias "@/*"`.
This establishes the base architecture with Next.js, TypeScript, Tailwind CSS, App Router, ESLint, and `@/*` import aliases.

**Project Structure (from Architecture Document):**
The architecture document details the desired directory structure including `app/`, `components/`, `lib/`, `hooks/`, `styles/`, `types/`, `public/`, and `tests/` directories.

**UX Design System (from UX Design Specification):**
The chosen design system is `shadcn/ui`, which will be integrated with the Next.js/Tailwind stack. This story will prepare the project to use these components.

**Implementation Patterns (from Architecture Document):**
- **Naming Conventions:** `kebab-case` for API routes/files (non-component), `snake_case` for database tables/columns, `PascalCase` for components/types.
- **Structure Patterns:** Unit/Integration tests co-located, E2E tests in `tests/e2e`. Components organized by feature. Utilities in `lib/`.
- **Consistency Patterns:** Strict TypeScript, consistent ESLint/Prettier formatting, environment variable management (`.env.local`).

**Testing Strategy (from Epic 1 Tech Spec):**
The testing strategy will follow a layered approach with a target of 80% code coverage. This includes:
- **Unit Tests (Jest):** For pure functions and utilities.
- **Integration Tests (React Testing Library + Jest):** For React components and their interactions.
- **End-to-End Tests (Playwright):** For critical user flows.

This setup story will lay the groundwork to adhere to these patterns and strategies.

### Project Structure Alignment and Lessons Learned

As this is the first story in the epic, there are no previous story learnings or file changes to incorporate.

The project structure will be established as defined in the Architecture Document, including:
- **Root Level Files:** `.env.local`, `.env.example`, `.eslintrc.json`, `.gitignore`, `next.config.mjs`, `package.json`, `pnpm-lock.yaml`, `postcss.config.js`, `README.md`, `tailwind.config.ts`, `tsconfig.json`, `jest.config.ts`, `playwright.config.ts`.
- **Core Directories:** `app/`, `components/`, `lib/`, `hooks/`, `styles/`, `types/`, `public/`, `tests/`.

This story will be responsible for creating this initial structure.

### References

- [Source: docs/fase-3-solutioning/architecture.md]
- [Source: docs/fase-2-ux/ux-design-specification.md]
- [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md]
- [Source: docs/fase-2-plan/epics.md#Story-1.1:-Project-Setup]

## Dev Agent Record

### Context Reference

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-29:** Initial draft generated for Story 1.1: Project Setup.