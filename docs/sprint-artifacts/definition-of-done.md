# Definition of Done Checklist

**Created:** 2025-12-02  
**Owner:** Bob (Scrum Master)  
**Purpose:** Ensure consistent quality and completeness for all stories  
**Status:** Active - Use for all stories going forward

---

## Story Definition of Done

A story is considered "Done" when ALL of the following criteria are met:

### 1. Code Quality ✅

- [ ] **Code written and committed** to the main branch (or feature branch if using)
- [ ] **TypeScript compilation successful** - No type errors
- [ ] **ESLint passes** - No errors (warnings acceptable if documented)
- [ ] **Code formatted** with Prettier
- [ ] **No console.log statements** left in production code (unless intentional)
- [ ] **Functions and complex logic commented** where necessary for clarity

### 2. Acceptance Criteria ✅

- [ ] **All acceptance criteria met** with evidence
- [ ] **Functional testing completed** - Manually tested all scenarios
- [ ] **Edge cases handled** - Error states, empty states, loading states
- [ ] **User experience verified** - Flow works as intended
- [ ] **Cross-browser testing** (if applicable) - Tested in Chrome/Edge at minimum

### 3. Code Review ✅

- [ ] **Code reviewed** by another team member (preferably senior dev)
- [ ] **Validation report created** in `docs/sprint-artifacts/`
- [ ] **Review feedback addressed** - All comments resolved
- [ ] **AC coverage documented** - Evidence of each AC being met
- [ ] **No critical or major issues** remaining

### 4. Documentation ✅

- [ ] **Story file updated** - Status field reflects current state
- [ ] **sprint-status.yaml updated** - Status synced with story file
- [ ] **Tasks marked complete** - All checkboxes checked in story file
- [ ] **Comments added** for any deviations from original plan
- [ ] **Technical debt documented** if any introduced (with priority classification)

### 5. Security & Performance ✅

- [ ] **Authentication checks implemented** where required
- [ ] **Authorization verified** - Users can only access their own data
- [ ] **Input validation working** - Zod schemas or equivalent in place
- [ ] **No obvious performance issues** - Page loads reasonably fast
- [ ] **RLS policies enforced** (for database stories)

### 6. Database Changes ✅

(Only applicable if story includes database work)

- [ ] **Migration file created** in `supabase/migrations/`
- [ ] **Migration applied** to development database
- [ ] **RLS policies implemented** if table created/modified
- [ ] **Indexes added** for efficient querying
- [ ] **Types updated** in `lib/types/` to match schema

### 7. Testing ✅

(Until automated test epic completed)

- [ ] **Manual testing completed** - All user paths tested
- [ ] **Loading states tested** - Verified UI during async operations
- [ ] **Error handling tested** - Verified error messages display correctly
- [ ] **Empty states tested** - Verified UI when no data exists
- [ ] **Success flows tested** - Happy path works end-to-end

### 8. Deployment Readiness ✅

- [ ] **Environment variables documented** (if new ones added)
- [ ] **No secrets in code** - All sensitive data in .env files
- [ ] **Dependencies installed** - package.json up to date if new packages added
- [ ] **Build succeeds** - `pnpm run build` completes without errors (if applicable)

---

## Story Status Definitions

Use these statuses in story files and sprint-status.yaml:

### backlog
- Story exists in epic file but not drafted yet
- No story file created
- Not ready for development

### drafted
- Story file created in `docs/sprint-artifacts/`
- Acceptance criteria defined
- Tasks listed
- Not yet ready for development

### ready-for-dev
- Story file created and approved
- Story context created (*.context.xml)
- Technical design complete
- Developer can start work

### in-progress
- Developer actively working on implementation
- Code being written
- Regular commits happening

### review
- Implementation complete
- Code submitted for review
- Awaiting validation report
- May require fixes based on feedback

### done
- All Definition of Done criteria met ✅
- Code reviewed and approved
- Story file status: "done"
- sprint-status.yaml status: "done"
- Ready to move to next story

---

## Pre-Review Checklist

Before marking a story as "review", verify:

1. ✅ All acceptance criteria implemented
2. ✅ Code committed and pushed
3. ✅ Story file tasks checked off
4. ✅ Manual testing completed
5. ✅ Ready for another team member to review

---

## Review Checklist (For Reviewer)

When reviewing a story:

1. ✅ Read story file and acceptance criteria
2. ✅ Review code changes
3. ✅ Verify each AC with evidence (code references, screenshots)
4. ✅ Test functionality manually
5. ✅ Check for security issues
6. ✅ Verify error handling
7. ✅ Create validation report
8. ✅ Provide feedback or approval

---

## Common Pitfalls to Avoid

- ❌ Forgetting to update sprint-status.yaml
- ❌ Marking story "done" without code review
- ❌ Skipping validation report creation
- ❌ Not documenting technical debt
- ❌ Leaving TODO comments in code
- ❌ Not testing error states
- ❌ Hardcoding values instead of using environment variables

---

## Quality Standards

### Code Quality
- **High:** Clean, readable, follows patterns from previous stories
- **Acceptable:** Works correctly, minor style issues
- **Needs Work:** Bugs, security issues, or major style problems

### Documentation
- **High:** Validation report with evidence, all statuses synced
- **Acceptable:** Basic documentation, status updated
- **Needs Work:** Missing validation, status out of sync

### Testing
- **High:** All paths tested, edge cases covered
- **Acceptable:** Happy path tested, major errors handled
- **Needs Work:** Untested or broken functionality

---

## Usage Notes

**For Developers:**
- Use this checklist before marking story as "review"
- Self-review against all criteria
- Document any items that don't apply (e.g., "No database changes")

**For Reviewers:**
- Use this checklist when creating validation reports
- Verify each section is complete
- Provide specific feedback for incomplete items

**For Scrum Master:**
- Verify this checklist used for each story
- Spot-check completed stories against criteria
- Update checklist if gaps discovered

---

## Epic-Specific Additions

### Epic 1 (Authentication)
- [ ] Session management working (cookies set correctly)
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Supabase auth methods called correctly

### Epic 2 (Workout Management)
- [ ] RLS policies enforce user data isolation
- [ ] Server actions return ActionResult<T> format
- [ ] TanStack Query caching working correctly
- [ ] revalidatePath() called after mutations

### Epic 3+ (Future)
- Add epic-specific criteria as patterns emerge

---

## Continuous Improvement

This checklist should evolve. If gaps are discovered:
1. Document the gap in retrospective
2. Update this checklist
3. Apply updated criteria to remaining stories

---

**Version:** 1.0  
**Last Updated:** 2025-12-02  
**Owner:** Bob (Scrum Master)  
**Status:** ✅ Active - Use for all stories
