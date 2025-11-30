# Supabase URL Configuration for Vercel Deployment

**Date:** 2025-11-30
**Project:** FitTrack (IBE160)

---

## Site URL

Set this as your primary Site URL in Supabase:

```
https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app
```

---

## Redirect URLs

Add **ALL** of these to Supabase → Authentication → URL Configuration → Redirect URLs:

### Production URLs (main branch)
```
https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app/dashboard
https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app/api/auth/callback
```

### Deployment URLs (for preview deployments)
```
https://ibe160-fittrack-a8vq17nsl-kristoffer-hopmarks-projects.vercel.app/dashboard
https://ibe160-fittrack-a8vq17nsl-kristoffer-hopmarks-projects.vercel.app/api/auth/callback
```

### Local Development
```
http://localhost:3000/dashboard
http://localhost:3000/api/auth/callback
```

### Wildcard (optional, for all preview deployments)
```
https://*.vercel.app/dashboard
https://*.vercel.app/api/auth/callback
```

---

## How to Add in Supabase

1. Go to: https://app.supabase.com
2. Select your project
3. Navigate to: **Authentication** → **URL Configuration**
4. Scroll to **Redirect URLs** section
5. Click **"+ Add URL"** for each URL above
6. Paste the URL
7. Click **Save** at the bottom when all are added

---

## Complete Configuration

Your final Supabase Authentication URL Configuration should have:

**Site URL:**
```
https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app
```

**Redirect URLs (8 total):**
```
1. https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app/dashboard
2. https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app/api/auth/callback
3. https://ibe160-fittrack-a8vq17nsl-kristoffer-hopmarks-projects.vercel.app/dashboard
4. https://ibe160-fittrack-a8vq17nsl-kristoffer-hopmarks-projects.vercel.app/api/auth/callback
5. http://localhost:3000/dashboard
6. http://localhost:3000/api/auth/callback
7. https://*.vercel.app/dashboard (optional wildcard)
8. https://*.vercel.app/api/auth/callback (optional wildcard)
```

---

## Why Each URL?

- **Main branch URLs** - Your production deployment
- **Deployment URLs** - Preview deployments and specific builds
- **Localhost** - Local development and testing
- **Wildcard** - Covers all Vercel preview deployments automatically

---

## Testing After Configuration

Once saved, test your deployment:

1. Visit: https://ibe160-fittrack-git-main-kristoffer-hopmarks-projects.vercel.app/signup
2. Create a test account
3. Should redirect to `/dashboard` successfully
4. Check Supabase Dashboard → Authentication → Users to verify user was created

---

## Troubleshooting

**If you see "redirect_uri_mismatch" error:**
- Double-check URLs are exactly as shown above
- Make sure you clicked "Save" in Supabase
- Wait 1-2 minutes for Supabase to apply changes
- Try in incognito/private window to clear cache

**If signup works but redirect fails:**
- Check browser console for errors
- Verify environment variables are set in Vercel
- Check Vercel Function Logs for errors

---

*Configuration guide created: 2025-11-30*
