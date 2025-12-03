# Apply Epic 3 Migration - Complete Guide

**Created:** 2025-12-03  
**Status:** Database prep complete, ready to apply migration

---

## Current Status

✅ Migration file created: `supabase/migrations/20251203_create_goals_table.sql`  
✅ TypeScript types created: `lib/types/goal.ts`  
⏳ Need to apply migration to database

---

## Step-by-Step Instructions

### 1. Start Docker Desktop

**Windows:**
- Press Windows key, search "Docker Desktop"
- Click to launch
- Wait for Docker to fully start (whale icon in system tray should be stable)
- Takes ~30-60 seconds

### 2. Start Supabase Local Development

```bash
cd C:\himolde\25H\IBE160\SG-Gruppe-10
supabase start
```

**Expected output:**
```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⏱️ **Time:** 1-2 minutes

### 3. Apply Migration

**Option A: Database Reset (Recommended)**

This reapplies ALL migrations in order (workouts + goals):

```bash
supabase db reset
```

**Expected output:**
```
Resetting local database...
Applying migration 20251130_create_workouts_table.sql...
Applying migration 20251203_create_goals_table.sql...
Finished supabase db reset on branch main.
```

⏱️ **Time:** ~30 seconds

**Option B: Migration Up (Apply New Only)**

If you want to apply only the new migration:

```bash
supabase migration up
```

This applies only unapplied migrations.

### 4. Verify Migration Applied

**Option 1: Use Supabase CLI**

```bash
supabase db diff
```

Should show: "No schema changes detected"

**Option 2: Use Supabase Studio**

1. Open http://127.0.0.1:54323
2. Click "Table Editor" in left sidebar
3. Look for `goals` table
4. Click on it to see schema

**Option 3: Direct SQL Query**

```bash
supabase db execute "SELECT table_name FROM information_schema.tables WHERE table_name = 'goals';"
```

Should return:
```
 table_name
------------
 goals
```

### 5. Test RLS Policies (Optional)

Open Supabase Studio SQL Editor: http://127.0.0.1:54323/project/default/sql/new

Run this query:

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'goals';

-- Check policies exist
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'goals';
```

**Expected result:**
- `rowsecurity` = `true`
- 4 policies: view, create, update, delete

---

## Verification Checklist

After migration applied, verify:

- [ ] Docker Desktop running
- [ ] Supabase started successfully
- [ ] Migration applied without errors
- [ ] `goals` table exists in Studio
- [ ] RLS enabled on `goals` table
- [ ] 4 RLS policies present
- [ ] 6 columns present (id, user_id, title, target, created_at, updated_at)
- [ ] 2 indexes present (idx_goals_user_id, idx_goals_user_created)

---

## Troubleshooting

### Error: "Docker not running"
**Solution:** Start Docker Desktop, wait for it to fully start

### Error: "Supabase not started"
**Solution:** 
```bash
supabase start
```

### Error: "Migration already applied"
**Solution:** This is fine! Migration is already in your database. Verify with:
```bash
supabase migration list
```

### Error: "Table already exists"
**Solution:** 
```bash
# Reset database (warning: deletes all data)
supabase db reset
```

### Need to stop Supabase?
```bash
supabase stop
```

### Need to restart Supabase?
```bash
supabase stop
supabase start
```

---

## Quick Commands Reference

```bash
# Check Supabase status
supabase status

# Start Supabase
supabase start

# Apply migrations
supabase db reset

# Check migrations
supabase migration list

# Open Studio
# http://127.0.0.1:54323

# Stop Supabase
supabase stop
```

---

## After Migration Success

✅ Goals table created  
✅ RLS policies active  
✅ TypeScript types ready  
✅ **Ready to start Story 3.1 (Create Goal)**

**Next command:**
```bash
# When ready to start Story 3.1
# Use the Scrum Master agent to draft the story
```

---

## Time Estimates

| Step | Time |
|------|------|
| Start Docker | 30-60 seconds |
| Start Supabase | 1-2 minutes |
| Apply migration | 30 seconds |
| Verify | 1 minute |
| **Total** | **3-5 minutes** |

---

**Created:** 2025-12-03  
**Status:** Ready to apply  
**Next:** Follow steps above, then start Story 3.1
