# Vercel Deployment Guide - FitTrack

**Project:** FitTrack (IBE160)  
**Framework:** Next.js 16 with App Router  
**Database:** Supabase PostgreSQL  
**Date:** 2025-11-30

---

## Prerequisites

- [x] GitHub account with repository access
- [x] Vercel account (free tier works fine)
- [x] Supabase project with credentials
- [x] `.env.local` configured locally

---

## Step 1: Prepare Environment Variables

### 1.1 Create Production Environment File

Create a `.env.production` file (optional, for reference only - DON'T commit):

```bash
# Supabase Configuration (Production)
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

### 1.2 Copy Your Supabase Credentials

From Supabase Dashboard:
1. Go to https://app.supabase.com
2. Select your project
3. Settings → API
4. Copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Project API keys → anon/public** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

---

## Step 2: Import Project to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Add New..." → "Project"

2. **Import Git Repository:**
   - Select "Import Git Repository"
   - Choose your GitHub account
   - Select repository: `IBE160/SG-Gruppe-10`
   - Click "Import"

3. **Configure Project:**
   ```
   Project Name: fittrack-ibe160 (or your preference)
   Framework Preset: Next.js (auto-detected)
   Root Directory: ./ (default)
   Build Command: pnpm build (Vercel auto-detects)
   Output Directory: .next (default)
   Install Command: pnpm install (Vercel auto-detects)
   ```

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add these variables for **Production**, **Preview**, and **Development**:

   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: [paste your Supabase project URL]
   
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [paste your Supabase anon key]
   ```

   **Important:** Select all three environments (Production, Preview, Development)

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - ✅ Your app will be live at: `https://your-project.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [select your account]
# - Link to existing project? No
# - Project name? fittrack-ibe160
# - Directory? ./ (default)
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# [paste your URL when prompted]

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# [paste your key when prompted]

# Deploy to production
vercel --prod
```

---

## Step 3: Configure Supabase for Vercel

### 3.1 Add Vercel Domain to Supabase

1. Go to Supabase Dashboard
2. Settings → Authentication → URL Configuration
3. Add these URLs:

   **Site URL:**
   ```
   https://your-project.vercel.app
   ```

   **Redirect URLs (add all):**
   ```
   https://your-project.vercel.app/api/auth/callback
   https://your-project.vercel.app/dashboard
   http://localhost:3000/api/auth/callback
   http://localhost:3000/dashboard
   ```

4. Click "Save"

### 3.2 Enable Email Authentication

If not already enabled:
1. Authentication → Providers
2. Enable "Email" provider
3. Toggle "Confirm email" OFF for development (or ON for production)
4. Click "Save"

---

## Step 4: Test Your Deployment

### 4.1 Visit Your App
```
https://your-project.vercel.app
```

### 4.2 Test Registration Flow
1. Navigate to `/signup`
2. Create a test account
3. Verify redirect to `/dashboard` works
4. Check Supabase Dashboard → Authentication → Users to see new user

### 4.3 Test Authentication
1. Open new incognito/private window
2. Try accessing `/dashboard` directly
3. Should redirect to `/signup` (auth protection works)
4. Login with test account
5. Should access dashboard successfully

---

## Step 5: Configure Automatic Deployments

### 5.1 GitHub Integration (Auto-Deploy)

Vercel automatically sets up:
- ✅ **Production deployments:** Push to `main` branch
- ✅ **Preview deployments:** Every pull request
- ✅ **Branch deployments:** Push to any branch

### 5.2 Branch Configuration

In Vercel Dashboard → Settings → Git:

**Production Branch:**
```
main
```

**Preview Branches:**
```
All branches (recommended)
OR
Only branches matching: fase-*
```

This means:
- Pushing to `main` → Production deployment
- Creating PR from `fase-4-implementation` → Preview deployment
- Each commit to PR → New preview deployment

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain

If you have a domain:

1. Vercel Dashboard → Settings → Domains
2. Add domain: `fittrack.yourdomain.com`
3. Follow DNS configuration instructions
4. Update Supabase redirect URLs to include your custom domain

### 6.2 DNS Records (Example)

Add these to your DNS provider:

**For subdomain (fittrack.yourdomain.com):**
```
Type: CNAME
Name: fittrack
Value: cname.vercel-dns.com
```

**For apex domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

---

## Step 7: Environment-Specific Configuration

### 7.1 Preview Deployments

For PR previews, you can use the same Supabase project or create a separate one:

**Same Project (Simpler):**
- Use same credentials for all environments
- All environments share database

**Separate Projects (Recommended for production):**
```
Production: NEXT_PUBLIC_SUPABASE_URL=prod-project.supabase.co
Preview: NEXT_PUBLIC_SUPABASE_URL=staging-project.supabase.co
Development: NEXT_PUBLIC_SUPABASE_URL=dev-project.supabase.co
```

### 7.2 Add Preview Environment Variables

In Vercel Dashboard:
1. Settings → Environment Variables
2. Add variables for "Preview" environment
3. Use staging/dev Supabase project credentials

---

## Troubleshooting

### Issue: Build Fails

**Error:** `pnpm: command not found`

**Solution:**
1. Vercel Dashboard → Settings → General
2. Package Manager: Select "pnpm"
3. Redeploy

---

### Issue: Environment Variables Not Working

**Symptoms:** Can't connect to Supabase, undefined errors

**Solution:**
1. Verify variables are prefixed with `NEXT_PUBLIC_`
2. Check all environments (Production, Preview, Development) have the values
3. Redeploy after adding/changing variables

---

### Issue: Auth Redirect Errors

**Symptoms:** "redirect_uri_mismatch" or auth errors

**Solution:**
1. Add Vercel URLs to Supabase → Authentication → URL Configuration
2. Include both preview and production URLs
3. Format: `https://your-project.vercel.app/api/auth/callback`

---

### Issue: 404 on Dashboard

**Symptoms:** Signup works but `/dashboard` returns 404

**Solution:**
- Already fixed in Story 1.2! Dashboard exists at `app/dashboard/page.tsx`
- Ensure latest code is deployed
- Check build logs for errors

---

## Monitoring & Analytics

### 7.1 Vercel Analytics

Enable built-in analytics:
1. Vercel Dashboard → Analytics
2. Enable Web Analytics
3. Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 7.2 Check Deployment Logs

View logs for debugging:
1. Vercel Dashboard → Deployments
2. Click on deployment
3. View "Build Logs" and "Function Logs"

---

## Best Practices

### ✅ Do:
- Use environment variables for all secrets
- Enable Vercel's Preview Deployments for PRs
- Test preview deployments before merging to main
- Set up automatic deployments from GitHub
- Monitor deployment logs for errors
- Use separate Supabase projects for prod/staging (when ready)

### ❌ Don't:
- Commit `.env.local` or `.env.production` to git
- Hardcode Supabase credentials in code
- Deploy directly to production without testing
- Forget to update Supabase redirect URLs
- Ignore build warnings/errors

---

## Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured in Vercel
- [ ] Supabase redirect URLs updated with Vercel domain
- [ ] Build passes locally (`pnpm build`)
- [ ] All tests passing (when implemented)
- [ ] `.env.local` not committed to git
- [ ] Code reviewed and approved (Story 1.2 ✅)
- [ ] Branch merged to main (or ready for PR)
- [ ] Vercel connected to correct GitHub repository
- [ ] Automatic deployments enabled

---

## Current Project Status

**Deployed Features:**
- ✅ User Registration (Story 1.2)
- ✅ Dashboard with auth protection
- ✅ Email/password validation
- ✅ Error handling

**Coming Soon:**
- 📋 User Login (Story 1.3)
- 📋 User Logout (Story 1.4)
- 📋 Workout Management (Epic 2)

---

## Quick Start Commands

```bash
# Deploy current branch to preview
git push origin fase-4-implementation

# Create PR to trigger preview deployment
# (Done via GitHub UI)

# Deploy to production (after PR merge)
git checkout main
git merge fase-4-implementation
git push origin main
```

---

## Support & Resources

**Vercel Documentation:**
- https://vercel.com/docs
- https://vercel.com/docs/frameworks/nextjs

**Supabase Integration:**
- https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

**Project Resources:**
- Architecture: `docs/fase-3-solutioning/architecture.md`
- Code Review: `docs/sprint-artifacts/code-review-1-2-2025-11-30.md`
- Session Summary: `docs/sprint-artifacts/SESSION-SUMMARY-2025-11-30-FINAL.md`

---

## Summary

**Your FitTrack app is ready to deploy!**

1. **Connect GitHub repo to Vercel** → Auto-deploy enabled
2. **Add environment variables** → Supabase credentials configured
3. **Update Supabase URLs** → Auth redirects working
4. **Push to main** → Production deployment
5. **Test signup flow** → Everything works! 🚀

**Estimated Setup Time:** 10-15 minutes

---

*Guide created: 2025-11-30*  
*Project: FitTrack (IBE160)*  
*Framework: Next.js 16 + Supabase*
