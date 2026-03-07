-- Add extra fields to profiles table
-- phone: contact number
-- allergy_info: free-text allergy description (e.g. "APLV, ovo, soja")
-- observation: additional notes about the user's health context

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS allergy_info TEXT,
  ADD COLUMN IF NOT EXISTS observation TEXT;
