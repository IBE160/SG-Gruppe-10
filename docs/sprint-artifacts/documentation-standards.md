# Documentation Standards

**Created:** 2025-12-02  
**Owner:** Bob (Scrum Master)  
**Purpose:** Define standards for code review documentation and status synchronization  
**Status:** Active - Use for all stories going forward

---

## 1. Code Review Documentation Standard

### 1.1 When to Create Review Documentation

Create a validation/review report for:
- ✅ Every story when it moves to "review" status
- ✅ Epic tech context validation
- ✅ Story context validation
- ✅ Major architectural changes

### 1.2 Validation Report Template

**File Naming Convention:**
```
validation-report-{story-id}-{YYYY-MM-DD}.md
or
code-review-{story-id}-{YYYY-MM-DD}.md
```

**Examples:**
- `validation-report-2-1-2025-12-02.md`
- `code-review-1-2-2025-11-30.md`
- `validation-report-epic-3-tech-spec-2025-12-03.md`

**Required Sections:**

```markdown
# {Story Title} - Validation Report

**Date:** YYYY-MM-DD
**Story:** {story-id} - {Story Title}
**Reviewer:** {Name} ({Role})
**Status:** APPROVED / APPROVED WITH CHANGES / NEEDS WORK

---

## Executive Summary

Brief overview of review outcome and key findings.

---

## Acceptance Criteria Verification

### AC-1: {Acceptance Criteria Text}

**Status:** ✅ MET / ⚠️ PARTIALLY MET / ❌ NOT MET

**Evidence:**
- Code reference: `path/to/file.tsx` lines X-Y
- Functionality tested: [describe what was tested]
- Result: [describe outcome]

**Issues (if any):**
- None / [list issues]

### AC-2: {Acceptance Criteria Text}

[Repeat for each AC]

---

## Code Quality Review

### Type Safety
- Assessment: [Excellent/Good/Needs Improvement]
- Findings: [specific notes]

### Validation
- Assessment: [Excellent/Good/Needs Improvement]
- Findings: [specific notes]

### Error Handling
- Assessment: [Excellent/Good/Needs Improvement]
- Findings: [specific notes]

### Security
- Assessment: [Excellent/Good/Needs Improvement]
- Findings: [specific notes]

---

## Testing Verification

- [ ] Manual testing completed
- [ ] All user paths tested
- [ ] Error states tested
- [ ] Loading states verified
- [ ] Edge cases handled

**Test Results:**
[Describe testing performed and outcomes]

---

## Issues & Recommendations

### Critical Issues (Blockers)
- None / [list issues]

### Major Issues
- None / [list issues]

### Minor Issues
- None / [list issues]

### Recommendations
- [list recommendations]

---

## Technical Debt

**New Debt Introduced:**
- None / [list with priority classification: LOW/MEDIUM/HIGH]

**Existing Debt Status:**
- [note if any existing debt was addressed]

---

## Conclusion

**Overall Assessment:** [Summary]

**Recommendation:** APPROVE / APPROVE WITH CHANGES / REJECT

**Next Steps:**
1. [list next steps]

---

**Reviewer:** {Name}
**Date:** {Date}
**Sign-off:** ✅ / ❌
```

### 1.3 Review Documentation Storage

**Location:** `docs/sprint-artifacts/`

**Organization:**
- All validation reports in same directory as stories
- Use clear, consistent naming
- Reference story file in report

---

## 2. Status Synchronization Standard

### 2.1 Status Update Process

When a story status changes, update **BOTH** locations:

1. **Story File** (`docs/sprint-artifacts/{story-id}-{title}.md`)
   ```markdown
   # Story X.Y: Title
   
   Status: {new-status}
   ```

2. **Sprint Status YAML** (`docs/sprint-artifacts/sprint-status.yaml`)
   ```yaml
   development_status:
     {story-id}: {new-status}
   ```

### 2.2 Status Change Triggers

**backlog → drafted:**
- Trigger: Story file created
- Update: Story file header, sprint-status.yaml

**drafted → ready-for-dev:**
- Trigger: Story context created and validated
- Update: Story file header, sprint-status.yaml
- Required: Story context file (*.context.xml) exists

**ready-for-dev → in-progress:**
- Trigger: Developer starts implementation
- Update: Story file header, sprint-status.yaml
- Optional: Add comment in story file with start date

**in-progress → review:**
- Trigger: Implementation complete, code committed
- Update: Story file header, sprint-status.yaml
- Action: Request review from team member

**review → in-progress:**
- Trigger: Review identifies issues requiring fixes
- Update: Story file header, sprint-status.yaml
- Action: Address review feedback

**review → done:**
- Trigger: Review approved, all DoD criteria met
- Update: Story file header, sprint-status.yaml
- Required: Validation report created

### 2.3 Status Sync Verification

**Daily Check:** Before ending work session
1. Check all story files you worked on
2. Verify sprint-status.yaml matches
3. Commit both files together if changes made

**Epic Completion Check:**
1. Review all story files in epic
2. Verify all statuses match sprint-status.yaml
3. Fix any mismatches before retrospective

---

## 3. Story File Standards

### 3.1 Story File Structure

```markdown
# Story X.Y: {Title}

Status: {status}

## Story

As a {user type},
I want {goal},
So that {benefit}.

## Acceptance Criteria

1. **AC-1:** {Acceptance criterion with "Given/When/Then" or clear statement}
2. **AC-2:** {Acceptance criterion}
...

## Tasks / Subtasks

- [ ] **Task 1 (AC: 1, 2)**
  - [ ] Subtask 1.1
  - [ ] Subtask 1.2
  - [x] Completed subtask
  
...

## Technical Notes

{Optional section for implementation notes, decisions, etc.}

## Related Files

- Story Context: `{story-id}-{title}.context.xml`
- Validation Report: `validation-report-{story-id}-{date}.md`

## Status History

{Optional tracking of status changes}
- YYYY-MM-DD: drafted
- YYYY-MM-DD: ready-for-dev
- YYYY-MM-DD: in-progress
- YYYY-MM-DD: review
- YYYY-MM-DD: done
```

### 3.2 Task Tracking

- Use `- [ ]` for incomplete tasks
- Use `- [x]` for completed tasks
- Reference AC numbers in task descriptions: `(AC: 1, 2)`
- Keep tasks updated as work progresses

---

## 4. Story Context File Standards

### 4.1 Context File Naming

```
{story-id}-{title}.context.xml
```

**Examples:**
- `2-1-create-workout.context.xml`
- `3-1-create-goal.context.xml`

### 4.2 Context File Purpose

Story context files provide AI agents with:
- Story details and acceptance criteria
- Technical context from epic
- Relevant code patterns
- Dependencies and constraints

### 4.3 When to Create

- **Timing:** After epic tech context created, before starting story
- **Validator:** Scrum Master or senior dev
- **Status Change:** Story moves to "ready-for-dev" after context validated

---

## 5. Epic Documentation Standards

### 5.1 Epic Tech Context

**File Naming:**
```
tech-spec-epic-{epic-id}.md
```

**Required Sections:**
- Technical overview
- Architecture decisions
- Database schema (if applicable)
- Security considerations
- Patterns to follow
- Dependencies

### 5.2 Epic Retrospective

**File Naming:**
```
epic-{epic-id}-retro-{YYYY-MM-DD}.md
```

**Required Sections:**
- Epic summary (metrics, outcomes)
- What went well
- Challenges & growth areas
- Key insights & learnings
- Action items
- Next epic preview
- Readiness assessment

---

## 6. Common Documentation Issues

### 6.1 Issues to Avoid

❌ **Status Out of Sync**
- Story file says "review", YAML says "done"
- Prevention: Update both files at same time

❌ **Missing Validation Reports**
- Story marked "done" without review documentation
- Prevention: Create report before marking done

❌ **Incomplete AC Verification**
- Review report doesn't cover all ACs
- Prevention: Use validation report template

❌ **Uncommitted Changes**
- Documentation updated locally but not pushed
- Prevention: Commit and push after each status change

❌ **Unclear Status History**
- Can't determine when story completed
- Prevention: Add date comments when changing status

### 6.2 Quality Checks

Before marking story "done":
1. ✅ Story file status = sprint-status.yaml status
2. ✅ Validation report exists
3. ✅ All ACs verified with evidence
4. ✅ All tasks checked off
5. ✅ Technical debt documented (if any)
6. ✅ Files committed and pushed

---

## 7. Review Report Quality Standards

### 7.1 Evidence Requirements

**Good Evidence:**
- ✅ Specific file paths and line numbers
- ✅ Screenshots of working functionality
- ✅ Description of testing performed
- ✅ Specific code excerpts (short quotes)

**Poor Evidence:**
- ❌ "Code looks good" (too vague)
- ❌ "Tested and works" (no detail)
- ❌ No file references
- ❌ No verification of each AC

### 7.2 Review Depth

**Minimum Requirements:**
- Verify each AC with specific evidence
- Check code quality (types, validation, errors)
- Perform manual testing
- Document findings clearly

**Excellent Reviews:**
- All minimum requirements +
- Security review
- Performance considerations
- Suggestions for improvement
- Code examples for issues found

---

## 8. Continuous Improvement

### 8.1 Documentation Retrospective Questions

During epic retrospectives, ask:
1. Was documentation complete and helpful?
2. Were status updates timely and accurate?
3. Did review reports provide clear feedback?
4. What documentation gaps existed?
5. How can we improve for next epic?

### 8.2 Standard Evolution

Update these standards when:
- Gaps discovered in retrospectives
- New patterns emerge
- Team processes change
- Tools or workflows updated

---

## 9. Quick Reference

### Status Update Checklist
- [ ] Update story file header
- [ ] Update sprint-status.yaml
- [ ] Commit both files together
- [ ] Push changes

### Review Completion Checklist
- [ ] All ACs verified with evidence
- [ ] Code quality reviewed
- [ ] Testing performed and documented
- [ ] Issues and recommendations listed
- [ ] Validation report created
- [ ] Story status updated

### Epic Closure Checklist
- [ ] All story files status = "done"
- [ ] sprint-status.yaml all stories "done"
- [ ] Epic retrospective completed
- [ ] Action items documented
- [ ] Next epic preparation identified

---

**Version:** 1.0  
**Last Updated:** 2025-12-02  
**Owner:** Bob (Scrum Master)  
**Status:** ✅ Active - Use for all documentation
