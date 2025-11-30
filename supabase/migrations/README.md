# Database Migration Instructions

## Apply Workouts Table Migration

**IMPORTANT:** The database migration SQL file has been created at:
`supabase/migrations/20251130_create_workouts_table.sql`

To apply this migration to your Supabase database, you have two options:

### Option 1: Using Supabase Dashboard (Recommended for now)

1. Go to https://app.supabase.com
2. Select your project: `ubcakdyirdaevwnaeozx`
3. Navigate to: **SQL Editor** (in the left sidebar)
4. Click "New Query"
5. Copy and paste the entire contents of `supabase/migrations/20251130_create_workouts_table.sql`
6. Click "Run" to execute the migration
7. Verify the table was created by going to **Table Editor** and checking for the `workouts` table

### Option 2: Using Supabase CLI (requires installation)

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link to your project
supabase link --project-ref ubcakdyirdaevwnaeozx

# Apply the migration
supabase db push
```

## Verify Migration Success

After running the migration, verify:
1. ✅ `workouts` table exists
2. ✅ RLS is enabled on the table
3. ✅ Four RLS policies are created (SELECT, INSERT, UPDATE, DELETE)
4. ✅ Two indexes exist (`idx_workouts_user_id` and `idx_workouts_user_date`)

You can test by running:
```sql
SELECT * FROM workouts LIMIT 1;
```

If you get a result (even if empty), the table is working correctly!
