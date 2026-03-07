-- access_count on medications — used for "Mais Procurados" ordering
ALTER TABLE public.medications ADD COLUMN IF NOT EXISTS access_count INTEGER NOT NULL DEFAULT 0;

-- profile_type on profiles — set during signup (Mamãe, Papai, Farmacêutico(a), Médico(a))
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_type TEXT;
