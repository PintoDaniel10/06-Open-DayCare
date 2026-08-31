-- SPEC 08 fix: Security and performance fixes for users table
-- 1. Revoke EXECUTE on handle_new_user from PUBLIC (SECURITY DEFINER)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- 2. Add index on daycare_id FK
CREATE INDEX idx_users_daycare_id ON users(daycare_id);

-- 3. Fix RLS policies: use (select auth.uid()) to avoid per-row re-evaluation
DROP POLICY "users_read_own_daycare" ON users;
CREATE POLICY "users_read_own_daycare" ON users
  FOR SELECT
  TO authenticated
  USING (
    daycare_id IN (
      SELECT u.daycare_id FROM users u WHERE u.id = (select auth.uid())
    )
  );

DROP POLICY "users_staff_insert" ON users;
CREATE POLICY "users_staff_insert" ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    id = (select auth.uid()) AND
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = (select auth.uid()) AND u.role IN ('staff', 'admin')
    )
  );

DROP POLICY "users_staff_update" ON users;
CREATE POLICY "users_staff_update" ON users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = (select auth.uid()) AND u.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = (select auth.uid()) AND u.role IN ('staff', 'admin')
    )
  );

DROP POLICY "users_admin_delete" ON users;
CREATE POLICY "users_admin_delete" ON users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = (select auth.uid()) AND u.role = 'admin'
    )
  );
