# Story 1.2: User Registration - Implementation TODO

**Status:** IN PROGRESS (Partially Complete)
**Last Updated:** 2025-11-30

---

## ✅ Completed (5/23 subtasks)

### Task 1: Set up Supabase Project and Integration (Partial)
- ✅ Installed `@supabase/supabase-js@2.86.0`
- ✅ Installed `@supabase/ssr@0.8.0` 
- ✅ Installed form dependencies: `react-hook-form`, `zod`, `@hookform/resolvers`
- ✅ Created `.env.example` template with Supabase configuration
- ✅ Created `lib/supabase/client.ts` - Browser Supabase client with SSR support
- ✅ Created `lib/supabase/server.ts` - Server Supabase client with cookie handling
- ✅ Created `components.json` - shadcn/ui configuration

---

## ⏳ Remaining Work (18/23 subtasks)

### CRITICAL: Supabase Project Setup (Required First)
**Priority:** MUST DO FIRST

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project: "fittrack" (or desired name)
   - Wait for database provisioning (~2 minutes)
   - Navigate to Project Settings → API

2. **Get Credentials**
   - Copy Project URL: `https://xxxxx.supabase.co`
   - Copy Project API Keys → `anon` `public` key
   
3. **Configure Environment**
   ```bash
   # Create .env.local from template
   cp .env.example .env.local
   
   # Edit .env.local with actual values:
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Test Connection**
   ```bash
   pnpm dev
   # Verify no errors about missing env vars
   ```

---

### Task 1: Complete Supabase Integration (1 remaining)
- [ ] Verify Supabase client initialization succeeds
  - Import and test client in a simple component
  - Check browser console for connection errors

---

### Task 2: Install shadcn/ui Components
**Commands to run:**
```bash
# Install required shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add toast

# Create utils file if not created automatically
# lib/utils.ts should contain cn() function
```

**Expected files created:**
- `components/ui/button.tsx`
- `components/ui/input.tsx`
- `components/ui/label.tsx`
- `components/ui/form.tsx`
- `components/ui/toast.tsx`
- `components/ui/toaster.tsx`
- `lib/utils.ts`

---

### Task 3: Create Authentication Server Actions
**File:** `lib/supabase/auth.ts`

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schema
const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate inputs
  const validation = signUpSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  // Create Supabase client
  const supabase = await createClient();

  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    // Handle specific error cases
    if (error.message.includes("already registered")) {
      return { error: "Email already in use" };
    }
    return { error: error.message };
  }

  // User created and auto-logged in
  redirect("/dashboard");
}
```

**Subtasks:**
- [ ] Create file with signUp Server Action
- [ ] Add zod validation schema
- [ ] Handle Supabase signUp API call
- [ ] Add error handling for duplicate email, weak password
- [ ] Return user-friendly error messages
- [ ] Test with valid and invalid inputs

---

### Task 4: Build Registration UI
**File:** `app/(auth)/signup/page.tsx`

```typescript
"use client";

import { signUp } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Creating account..." : "Register"}
    </Button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useFormState(signUp, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Registration failed",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your details to get started</p>
        </div>
        
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-gray-500">
              Minimum 8 characters, 1 uppercase letter, 1 number
            </p>
          </div>

          <SubmitButton />
        </form>
        
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
```

**Also need:** `app/(auth)/layout.tsx`
```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Subtasks:**
- [ ] Create `app/(auth)/signup/page.tsx`
- [ ] Add email and password input fields
- [ ] Implement client-side validation display
- [ ] Add Register submit button with loading state
- [ ] Style with Tailwind CSS
- [ ] Test form rendering and validation

---

### Task 5: Create Dashboard
**File:** `app/(dashboard)/page.tsx`

```typescript
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/signup");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to FitTrack</h1>
      <p className="mt-4 text-gray-600">Email: {user.email}</p>
      <p className="text-sm text-gray-500 mt-2">
        This is a placeholder dashboard. Workout features coming in next stories!
      </p>
    </div>
  );
}
```

**File:** `app/(dashboard)/layout.tsx`
```typescript
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
```

**Subtasks:**
- [ ] Create `app/(dashboard)/page.tsx` placeholder
- [ ] Create `app/(dashboard)/layout.tsx`
- [ ] Implement auth state check
- [ ] Add redirect logic for unauthenticated users
- [ ] Test redirect after successful registration

---

### Task 6: Add Toast Provider
**File:** `app/layout.tsx` (update)

```typescript
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

**Subtasks:**
- [ ] Add Toaster component to root layout
- [ ] Test toast notifications for errors

---

## Testing Checklist

### Manual Tests (All 7 ACs)
- [ ] **AC-1:** Navigate to /signup, verify form displays
- [ ] **AC-2:** Enter valid email/password, click Register
- [ ] **AC-3:** Check Supabase dashboard for new user in Auth > Users
- [ ] **AC-4:** Verify user is logged in (session exists)
- [ ] **AC-5:** Verify redirect to /dashboard occurs
- [ ] **AC-6:** Try registering same email twice, see error
- [ ] **AC-7:** Try weak passwords, see validation errors:
  - [ ] Less than 8 characters
  - [ ] No uppercase letter
  - [ ] No number

### Error Scenarios to Test
- [ ] Invalid email format
- [ ] Password too short (<8 chars)
- [ ] Password missing uppercase
- [ ] Password missing number
- [ ] Duplicate email registration
- [ ] Network error (disconnect internet)
- [ ] Form submission while loading

---

## Estimated Time to Complete
- Supabase setup: 10 minutes
- shadcn/ui components: 5 minutes
- Server Actions: 20 minutes
- Registration UI: 30 minutes
- Dashboard pages: 15 minutes
- Testing: 20 minutes

**Total:** ~1.5-2 hours

---

## Quick Start Commands

```bash
# 1. Set up Supabase project (manual, see above)

# 2. Install shadcn components
npx shadcn@latest add button input label form toast

# 3. Create missing directories
mkdir -p app/\(auth\)/signup app/\(dashboard\)

# 4. Create files (use code above as templates)
# - lib/supabase/auth.ts
# - app/(auth)/layout.tsx
# - app/(auth)/signup/page.tsx
# - app/(dashboard)/layout.tsx
# - app/(dashboard)/page.tsx

# 5. Update app/layout.tsx to include Toaster

# 6. Start dev server
pnpm dev

# 7. Test at http://localhost:3000/signup
```

---

## Files Created So Far (Story 1.2)
- ✅ `.env.example` - Environment variable template
- ✅ `lib/supabase/client.ts` - Browser Supabase client
- ✅ `lib/supabase/server.ts` - Server Supabase client
- ✅ `components.json` - shadcn/ui config
- ✅ `package.json` - Updated with Supabase and form deps

## Files Still Needed
- ⏳ `.env.local` - Actual credentials (gitignored)
- ⏳ `lib/supabase/auth.ts` - Server Actions
- ⏳ `lib/utils.ts` - cn() utility for shadcn
- ⏳ `components/ui/*` - shadcn components (button, input, label, form, toast)
- ⏳ `app/(auth)/layout.tsx` - Auth layout
- ⏳ `app/(auth)/signup/page.tsx` - Registration page
- ⏳ `app/(dashboard)/layout.tsx` - Dashboard layout
- ⏳ `app/(dashboard)/page.tsx` - Dashboard home

---

## Notes
- All 5 dependencies installed successfully
- Supabase client files follow official Next.js App Router patterns
- Ready for UI implementation once Supabase project is created
- shadcn/ui configured with "new-york" style
