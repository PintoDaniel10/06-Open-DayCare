-- SPEC 10: Rooms and children tables with RLS and seed data

-- 1. Create enums
CREATE TYPE child_status AS ENUM ('active', 'archived');
CREATE TYPE relationship_type AS ENUM ('father', 'mother', 'guardian');

-- 2. Create rooms table
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  daycare_id uuid NOT NULL REFERENCES daycares(id),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- 3. Create children table
CREATE TABLE children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES rooms(id),
  full_name text NOT NULL,
  birth_date date NOT NULL,
  enrolled_at date NOT NULL,
  medical_notes text,
  allergy_tags text[],
  photo_consent boolean NOT NULL DEFAULT true,
  status child_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE children ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — rooms

-- Read: authenticated users can see rooms from their same daycare
CREATE POLICY "rooms_read_own_daycare" ON rooms
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT u.id FROM users u WHERE u.daycare_id = rooms.daycare_id
    )
  );

-- Write: only staff and admin can write
CREATE POLICY "rooms_staff_write" ON rooms
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('staff', 'admin')
    )
  );

-- 5. RLS Policies — children

-- Read: authenticated users can see children from their same daycare
CREATE POLICY "children_read_own_daycare" ON children
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT u.id FROM users u WHERE u.daycare_id = (
        SELECT r.daycare_id FROM rooms r WHERE r.id = children.room_id
      )
    )
  );

-- Write: only staff and admin can write
CREATE POLICY "children_staff_write" ON children
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('staff', 'admin')
    )
  );

-- 6. Seed data — 3 rooms (Soles, Estrellas, Arcoíris)
-- Using the first daycare from the daycares table

INSERT INTO rooms (daycare_id, name)
SELECT
  (SELECT id FROM daycares LIMIT 1),
  'Soles'
ON CONFLICT DO NOTHING;

INSERT INTO rooms (daycare_id, name)
SELECT
  (SELECT id FROM daycares LIMIT 1),
  'Estrellas'
ON CONFLICT DO NOTHING;

INSERT INTO rooms (daycare_id, name)
SELECT
  (SELECT id FROM daycares LIMIT 1),
  'Arcoíris'
ON CONFLICT DO NOTHING;
