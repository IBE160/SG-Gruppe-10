# Project Plan

## Instruksjoner

1. Der hvor det står {prompt / user-input-file}, kan dere legge inn en egen prompt eller filnavn for å gi ekstra instruksjoner. Hvis dere ikke ønsker å legge til ekstra instruksjoner, kan dere bare fjerne denne delen.
2. Hvis jeg har skrevet noe der allerede, f.eks. "Root Cause Analysis and Solution Design for Player Inactivity", så kan dere bytte ut min prompt med deres egen.


## Fase 1

- [x] /run-agent-task analyst *workflow-init
  - [x] File: bmm-workflow-status.yaml
- [x] Brainstorming
  - [x] /run-agent-task analyst *brainstorm "User Stories & Journey Mapping"
    - [x] File: docs/fase-1-analysis/brainstorming-2025-10-31-user-stories.md
  - [x] /run-agent-task analyst *brainstorm "Off-Track Scenarios & Recovery Strategies"
    - [x] File: docs/fase-1-analysis/brainstorming-2025-11-02-scenarios.md
  - [x] /run-agent-task analyst *brainstorm "Chaos Engineering & Risk Assessment"
    - [x] File: docs/fase-1-analysis/brainstorming-2025-11-02-chaos-engineering.md
- [x] Research
  - [x] /run-agent-task analyst *research "Data Validation Library Selection (Pydantic)"
    - [x] File: docs/fase-1-analysis/research-technical-2025-11-01-ai-library.md
- [x] Product Brief
  - [x] /run-agent-task analyst *product-brief "Read the brainstorming sessions, the research session, and the @proposal.md file, and create a product brief for the project."
    - [x] File: product-brief.md

## Fase 2

- [x] Planning
  - [x] /run-agent-task pm *prd
    - [x] File: docs/fase-2-plan/PRD.md
  - [x] /run-agent-task pm *validate-prd
    - [x] File: docs/fase-2-plan/PRD-validation-report-2025-11-12.md
  - [x] /run-agent-task ux-designer *create-ux-design
    - [x] File: docs/fase-2-ux/ux-design-specification.md
    - [x] File: docs/fase-2-ux/ux-color-themes.html
    - [x] File: docs/fase-2-ux/ux-design-directions.html
  - [x] /run-agent-task ux-designer *validate-ux-design
    - [x] File: docs/fase-2-ux/ux-design-spec-validation-report-2025-11-16.md

## Fase 3

- [x] Solutioning
  - [x] /run-agent-task architect *create-architecture {prompt / user-input-file}
    - [x] File: docs/fase-3-solutioning/architecture.md
  - [x] /run-agent-task pm *create-epics-and-stories
    - [x] File: docs/fase-2-plan/epics.md
  - [ ] /run-agent-task tea *test-design {prompt / user-input-file}
  - [x] /run-agent-task architect *solutioning-gate-check {prompt / user-input-file}
    - [x] File: docs/fase-3-solutioning/implementation-readiness-report-2025-11-29.md

## Fase 4

- [ ] Implementation
  - [x] /run-agent-task sm *sprint-planning {prompt / user-input-file}
    - [x] File: docs/sprint-artifacts/sprint-status.yaml
  - foreach epic in sprint planning:
    - [x] /run-agent-task sm create-epic-tech-context {prompt / user-input-file}
      - [x] Epic 1: docs/sprint-artifacts/tech-spec-epic-1.md
      - [x] Epic 2: docs/sprint-artifacts/tech-spec-epic-2.md
      - [x] Epic 4: docs/sprint-artifacts/tech-spec-epic-4.md
    - [x] /run-agent-task sm validate-epic-tech-context {prompt / user-input-file}
      - [x] File: docs/sprint-artifacts/validation-report-2025-11-29.md
    - foreach story in epic:
      - [x] /run-agent-task sm *create-story {prompt / user-input-file}
        - [x] Story 1.2: docs/sprint-artifacts/1-2-user-registration.md
        - [x] Story 1.3: docs/sprint-artifacts/1-3-user-login.md
        - [x] Story 1.4: docs/sprint-artifacts/1-4-user-logout.md
        - [x] Story 2.1: docs/sprint-artifacts/2-1-create-workout.md
        - [x] Story 2.2: docs/sprint-artifacts/2-2-view-workout-history.md
        - [x] Story 2.3: docs/sprint-artifacts/2-3-view-workout-details.md
        - [x] Story 2.4: docs/sprint-artifacts/2-4-update-workout.md
        - [x] Story 2.5: docs/sprint-artifacts/2-5-delete-workout.md
        - [x] Story 3.1: docs/sprint-artifacts/3-1-create-goal.md
        - [x] Story 3.2: docs/sprint-artifacts/3-2-view-goals.md
        - [x] Story 4.1: docs/sprint-artifacts/4-1-navigation-layout-foundation.md
        - [x] Story 4.2: docs/sprint-artifacts/4-2-dashboard-visual-polish.md
        - [x] Story 4.3: docs/sprint-artifacts/4-3-authentication-pages-visual-polish.md
        - [x] Story 4.4: docs/sprint-artifacts/4-4-workouts-visual-polish.md
        - [x] Story 4.5: docs/sprint-artifacts/4-5-goals-visual-polish.md
      - [x] /run-agent-task sm *validate-create-story {prompt / user-input-file}
        - [x] File: docs/sprint-artifacts/validation-report-2025-11-29.md
      - [x] /run-agent-task sm *create-story-context {prompt / user-input-file}
        - [x] Story 1.2: docs/sprint-artifacts/1-2-user-registration.context.xml
        - [x] Story 1.3: docs/sprint-artifacts/1-3-user-login.context.xml
        - [x] Story 2.1: docs/sprint-artifacts/2-1-create-workout.context.xml
        - [x] Story 2.2: docs/sprint-artifacts/2-2-view-workout-history.context.xml
        - [x] Story 2.3: docs/sprint-artifacts/2-3-view-workout-details.context.xml
        - [x] Story 2.4: docs/sprint-artifacts/2-4-update-workout.context.xml
        - [x] Story 2.5: docs/sprint-artifacts/2-5-delete-workout.context.xml
        - [x] Story 3.1: docs/sprint-artifacts/3-1-create-goal.context.xml
        - [x] Story 4.1: docs/sprint-artifacts/4-1-navigation-layout-foundation.context.xml
        - [x] Story 4.2: docs/sprint-artifacts/4-2-dashboard-visual-polish.context.xml
        - [x] Story 4.3: docs/sprint-artifacts/4-3-authentication-pages-visual-polish.context.xml
        - [x] Story 4.4: docs/sprint-artifacts/4-4-workouts-visual-polish.context.xml
        - [x] Story 4.5: docs/sprint-artifacts/4-5-goals-visual-polish.context.xml
      - [x] /run-agent-task sm *validate-story-context {prompt / user-input-file}
        - [x] File: docs/sprint-artifacts/validation-report-story-context-2025-11-30.md
      - [x] /run-agent-task sm *story-ready-for-dev {prompt / user-input-file}
      while code-review != approved:
        - [x] /run-agent-task dev *develop-story {prompt / user-input-file}
        - [x] /run-agent-task dev *code-review {prompt / user-input-file}
          - [x] Story 1.2: docs/sprint-artifacts/code-review-1-2-2025-11-30.md
      - [x] /run-agent-task dev *story-done {prompt / user-input-file}
      - [x] /run-agent-task sm *test-review {prompt / user-input-file}
    - [x] /run-agent-task sm *epic-retrospective {prompt / user-input-file}
      - [x] Epic 1: docs/sprint-artifacts/epic-1-retro-2025-12-02.md
      - [x] Epic 2: docs/sprint-artifacts/epic-2-retro-2025-12-02.md
      - [x] Epic 3: docs/sprint-artifacts/epic-3-retro-2025-12-03.md
      - [x] Epic 4: docs/sprint-artifacts/epic-4-retro-2025-12-03.md





## BMAD workflow

<img src="images/bmad-workflow.svg" alt="BMAD workflow">