# Story 1.2: User Registration - Manual Testing Guide

**Date:** 2025-11-30  
**Story Status:** Implementation Complete - Ready for Testing  
**Branch:** fase-4-implementation

---

## ✅ Implementation Complete

All code has been implemented:
- ✅ Supabase authentication Server Actions (`lib/supabase/auth.ts`)
- ✅ Registration UI with form validation (`app/(auth)/signup/page.tsx`)
- ✅ Dashboard pages with auth protection (`app/(dashboard)/page.tsx`)
- ✅ Toast notifications for error handling (Sonner)
- ✅ shadcn/ui components (button, input, label, form, sonner)
- ✅ Utility functions (`lib/utils.ts`)

---

## 🧪 Manual Testing Checklist

### Prerequisites
1. **Start dev server:**
   ```bash
   pnpm dev
   ```
2. **Open browser:** http://localhost:3000/signup

### Test 1: AC-1 - Form Display
**Expected:** Registration form displays with email and password fields

- [ ] Navigate to http://localhost:3000/signup
- [ ] Verify "Create an account" heading is visible
- [ ] Verify email input field is present
- [ ] Verify password input field is present
- [ ] Verify "Register" button is visible
- [ ] Verify helper text: "Minimum 8 characters, 1 uppercase letter, 1 number"

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 2: AC-2 & AC-3 - Successful Registration
**Expected:** User can register with valid credentials

**Steps:**
1. Enter email: `test-{timestamp}@example.com` (use unique email)
2. Enter password: `Test1234`
3. Click "Register" button

**Expected Results:**
- [ ] Button shows "Creating account..." loading state
- [ ] No error toast appears
- [ ] Redirect to `/dashboard` occurs
- [ ] Dashboard displays welcome message with email

**Verify in Supabase Dashboard:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to "Authentication" → "Users"
4. [ ] Verify new user appears with correct email
5. [ ] Verify "Email Confirmed" status

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 3: AC-4 - User Auto-Login
**Expected:** User is automatically logged in after registration

**Steps:**
1. After successful registration (Test 2)
2. Check you're on `/dashboard`
3. Refresh the page

**Expected Results:**
- [ ] Still on dashboard (not redirected to /signup)
- [ ] User email displayed correctly
- [ ] No authentication errors in console

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 4: AC-5 - Dashboard Redirect
**Expected:** Unauthenticated users are redirected to signup

**Steps:**
1. Open new incognito/private window
2. Navigate to http://localhost:3000/dashboard

**Expected Results:**
- [ ] Automatic redirect to `/signup` occurs
- [ ] Registration form displays

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 5: AC-6 - Duplicate Email Prevention
**Expected:** Cannot register with existing email

**Steps:**
1. Register user: `duplicate@example.com` / `Test1234`
2. Wait for successful registration
3. Open new incognito window
4. Try to register again with same email: `duplicate@example.com` / `Test1234`

**Expected Results:**
- [ ] Error toast appears
- [ ] Error message: "Email already in use" or similar
- [ ] No redirect occurs
- [ ] User stays on `/signup` page

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 6: AC-7 - Password Validation (Too Short)
**Expected:** Password must be at least 8 characters

**Steps:**
1. Enter email: `test@example.com`
2. Enter password: `Test123` (7 characters)
3. Click "Register"

**Expected Results:**
- [ ] Error toast appears
- [ ] Error message: "Password must be at least 8 characters"
- [ ] No registration occurs

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 7: AC-7 - Password Validation (No Uppercase)
**Expected:** Password must contain uppercase letter

**Steps:**
1. Enter email: `test@example.com`
2. Enter password: `test12345` (no uppercase)
3. Click "Register"

**Expected Results:**
- [ ] Error toast appears
- [ ] Error message: "Password must contain at least one uppercase letter"
- [ ] No registration occurs

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 8: AC-7 - Password Validation (No Number)
**Expected:** Password must contain number

**Steps:**
1. Enter email: `test@example.com`
2. Enter password: `TestPassword` (no number)
3. Click "Register"

**Expected Results:**
- [ ] Error toast appears
- [ ] Error message: "Password must contain at least one number"
- [ ] No registration occurs

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 9: Invalid Email Format
**Expected:** Email validation catches invalid formats

**Steps:**
1. Enter email: `not-an-email`
2. Enter password: `Test1234`
3. Click "Register"

**Expected Results:**
- [ ] Error toast appears
- [ ] Error message: "Invalid email format"
- [ ] No registration occurs

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 10: Network Error Handling
**Expected:** Graceful error handling for network issues

**Steps:**
1. Turn off Wi-Fi / disconnect internet
2. Enter valid credentials
3. Click "Register"

**Expected Results:**
- [ ] Error toast appears
- [ ] User-friendly error message displays
- [ ] Button returns to normal state
- [ ] No app crash

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 11: Form Submission During Loading
**Expected:** Cannot submit form multiple times

**Steps:**
1. Enter valid credentials
2. Click "Register" button
3. Quickly click "Register" again (while loading)

**Expected Results:**
- [ ] Button disabled during loading
- [ ] Only one registration request sent
- [ ] No duplicate user created

**Status:** ⬜ Pass / ⬜ Fail

---

## 📊 Test Summary

**Total Tests:** 11  
**Passed:** ___ / 11  
**Failed:** ___ / 11  
**Pass Rate:** ____%

---

## 🐛 Issues Found

| Test # | Issue Description | Severity | Status |
|--------|------------------|----------|--------|
| | | | |

---

## ✅ Acceptance Criteria Mapping

| AC # | Description | Tests | Status |
|------|-------------|-------|--------|
| AC-1 | Form displays correctly | Test 1 | ⬜ |
| AC-2 | Can register with valid data | Test 2 | ⬜ |
| AC-3 | User created in Supabase | Test 2 | ⬜ |
| AC-4 | Auto-login after registration | Test 3 | ⬜ |
| AC-5 | Dashboard redirect works | Test 2, 4 | ⬜ |
| AC-6 | Duplicate email prevented | Test 5 | ⬜ |
| AC-7 | Password validation works | Tests 6-8 | ⬜ |

---

## 🚀 Quick Start Commands

```bash
# Start dev server
pnpm dev

# Open signup page
open http://localhost:3000/signup

# Check Supabase users
# Visit: https://supabase.com/dashboard → Your Project → Authentication → Users
```

---

## 📝 Testing Notes

- Use unique emails for each test (add timestamps: `test-1701364800@example.com`)
- Check browser console for errors
- Check Network tab for failed requests
- Test in multiple browsers (Chrome, Firefox, Safari)
- Test on mobile viewport

---

## ✅ Sign-Off

**Tester Name:** _______________  
**Date:** _______________  
**All Tests Passed:** ⬜ Yes / ⬜ No  
**Ready for Code Review:** ⬜ Yes / ⬜ No

**Notes:**
