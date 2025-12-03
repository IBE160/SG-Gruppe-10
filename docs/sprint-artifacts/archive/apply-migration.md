# Quick Start: Apply Epic 3 Migration

**Status:** Database prep complete, migration ready to apply

---

## Prerequisites

- [ ] Docker Desktop running
- [ ] Terminal open in project root

---

## Steps

### 1. Start Supabase (if not running)

```bash
cd C:\himolde\25H\IBE160\SG-Gruppe-10
pnpm supabase start
```

Wait for: "Started supabase local development setup"

### 2. Apply Migration

```bash
pnpm supabase db reset
```

This applies ALL migrations (workouts + goals)

### 3. Verify

Open Supabase Studio: http://127.0.0.1:54323

Check:
- [ ] `goals` table exists
- [ ] 6 columns present (id, user_id, title, target, created_at, updated_at)
- [ ] 2 indexes present
- [ ] RLS enabled
- [ ] 4 RLS policies present

### 4. Test (Optional)

```sql
-- In Studio SQL Editor
-- Should succeed (creates goal for current user)
INSERT INTO goals (user_id, title, target) 
VALUES (auth.uid(), 'Test Goal', 'Complete 5 workouts');

-- Should return the goal
SELECT * FROM goals;

-- Cleanup
DELETE FROM goals WHERE title = 'Test Goal';
```

---

## Success Criteria

✅ Migration applied without errors  
✅ Goals table visible in Studio  
✅ RLS policies working  
✅ Ready to start Story 3.1

---

## If Something Goes Wrong

**Migration fails:**
```bash
pnpm supabase db reset --debug
```

**RLS policy errors:**
Check that auth.users table exists (should from Epic 1)

**Connection errors:**
```bash
pnpm supabase stop
pnpm supabase start
```

---

## Time Estimate

- Start Supabase: 1-2 minutes
- Apply migration: 30 seconds
- Verify: 1 minute
- **Total: ~3-4 minutes**

---

**Next:** Start Story 3.1 (Create Goal)
