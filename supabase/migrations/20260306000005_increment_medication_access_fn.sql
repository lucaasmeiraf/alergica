-- RPC function to atomically increment medication access_count.
-- SECURITY DEFINER bypasses RLS so any authenticated user can call it,
-- without needing direct UPDATE permission on the medications table.
CREATE OR REPLACE FUNCTION public.increment_medication_access(med_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.medications
  SET access_count = access_count + 1
  WHERE id = med_id;
END;
$$;

-- Allow any authenticated user to call this function
GRANT EXECUTE ON FUNCTION public.increment_medication_access(UUID) TO authenticated;
