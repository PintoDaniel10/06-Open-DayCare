-- SPEC 10 (fix): Allow users to read their own row regardless of daycare_id

-- Drop the old read policy
DROP POLICY IF EXISTS "users_read_own_daycare" ON users;

-- Create new policy: users can always read their own row, 
-- and can read other users in the same daycare
CREATE POLICY "users_read_own_daycare" ON users
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid()
    OR daycare_id IN (
      SELECT u.daycare_id FROM users u WHERE u.id = auth.uid()
    )
  );
