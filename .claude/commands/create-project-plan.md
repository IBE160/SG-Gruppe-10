---
argument-hint: [test-driven-development=true] [with-context=true] 
description: Creates the project plan structure based on whether test-driven development and with-context are enabled or not. Default is true for both.
---
# purpose

The purpose of this command is to create the project plan structure based on whether test-driven development and with-context are enabled or not. Default is true for both.

# Workflow

#### Step 1: Create the initial content of the project workflow file

Follow the branching inside the format below, depending on the arguments provided.

Format:
```markdown
## Fase 0

- [ ] Brainstorming
  - [ ]  /analyst *brainstorm {prompt / user-input-file}
  - [ ]  /analyst *brainstorm {prompt / user-input-file}
  - [ ]  /analyst *brainstorm {prompt / user-input-file}
- [ ] Research
  - [ ] /analyst *research {prompt / user-input-file}
  - [ ] /analyst *research {prompt / user-input-file}
  - [ ] /analyst *research {prompt / user-input-file}
- [ ] Product Brief
  - [ ] /analyst *product-brief {prompt / user-input-file}

## Fase 1

- [ ] Planning
  - [ ] /run-agent-task pm *prd {prompt / user-input-file}
  - [ ] /run-agent-task pm *validate-prd {prompt / user-input-file}
  - [ ] /run-agent-task ux-designer *create-ux-design {prompt / user-input-file}
  - [ ] /run-agent-task ux-designer *validate-ux-design {prompt / user-input-file}
  - if with test-driven development:
    - [ ] /run-agent-task tea *framework {prompt / user-input-file}
    - [ ] /run-agent-task tea *ci {prompt / user-input-file}
    - [ ] /run-agent-task tea *test-design {prompt / user-input-file}


## Fase 2

- [ ] Solutioning
  - [ ] /run-agent-task architect *architecture {prompt / user-input-file}
  - [ ] /run-agent-task architect *validate-architecture {prompt / user-input-file}


## Fase 3

- [ ] Implementation
  - [ ] /run-agent-task sm *sprint-planning {prompt / user-input-file}
  - foreach epic in sprint planning:
    - [ ] /run-agent-task sm epic-tech-content {prompt / user-input-file}
    - [ ] /run-agent-task sm validate-epic-tech-content {prompt / user-input-file}
    - foreach story in epic:
        - [ ] /run-agent-task sm *create-story {prompt / user-input-file}
        - if with context:
            - [ ] /run-agent-task sm *validate-create-story {prompt / user-input-file}
            - [ ] /run-agent-task sm *story-context {prompt / user-input-file}
            - [ ] /run-agent-task sm *validate-story-context {prompt / user-input-file}
        - else without context:
            - [ ] /run-agent-task sm *story-ready {prompt / user-input-file}
        - if with test-driven development:
            - [ ] /run-agent-task tea *validate-story-ready {prompt / user-input-file}
            - [ ] /run-agent-task dev *implement-story {prompt / user-input-file}
            - [ ] /run-agent-task dev *validate-story {prompt / user-input-file}
            - [ ] /run-agent-task tea *automate {prompt / user-input-file}
            - [ ] /run-agent-task tea *test-review {prompt / user-input-file}
        - else
            - [ ] /run-agent-task dev *develop-story {prompt / user-input-file}
            - [ ] /run-agent-task dev *code-review {prompt / user-input-file}
            - [ ] /run-agent-task dev *story-done {prompt / user-input-file}
    - [ ] /run-agent-task sm *retrospective {prompt / user-input-file}
---

### Step 2: Save the project workflow file

Save the project workflow file to `@docs/project-plan.md`.

### Step 3: Verify

Verify that the project plan exists and is correct and complete.
Report to the user.
