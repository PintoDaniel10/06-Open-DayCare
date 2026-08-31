-- SPEC 08 fix: Fix handle_new_user trigger with error handling and defaults
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_daycare_id uuid;
  v_role user_role;
  v_full_name text;
  v_status user_status;
BEGIN
  v_daycare_id := NULLIF(NEW.raw_user_meta_data->>'daycare_id', '')::uuid;
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'parent')::user_role;
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  v_status := CASE
    WHEN NEW.raw_user_meta_data->>'status' = 'pending' THEN 'pending'
    ELSE 'active'
  END;

  INSERT INTO public.users (id, daycare_id, role, full_name, status)
  VALUES (NEW.id, v_daycare_id, v_role, v_full_name, v_status);

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'handle_new_user failed for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;
