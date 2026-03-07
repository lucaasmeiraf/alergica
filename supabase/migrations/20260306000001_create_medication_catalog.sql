-- ============================================================
-- Medication Catalog Schema
-- Core tables for the AlerGica product safety database
-- ============================================================

-- Allergen groups: high-level allergy categories
CREATE TABLE public.allergen_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,          -- e.g. 'Proteína do Leite de Vaca'
  code TEXT NOT NULL UNIQUE,          -- e.g. 'MILK', 'GLUTEN', 'SOY'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ingredients: individual chemical/biological substances
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                 -- e.g. 'Lactose'
  common_names TEXT[],                -- alternative names
  cas_number TEXT,                    -- CAS registry number (optional)
  is_allergen BOOLEAN NOT NULL DEFAULT false,
  allergen_group_id UUID REFERENCES public.allergen_groups(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ingredients_name_idx ON public.ingredients (lower(name));

-- Medications: drugs, supplements, formulas
CREATE TABLE public.medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                          -- e.g. 'Dipirona Gotas'
  active_substance TEXT,                       -- e.g. 'Dipirona Sódica'
  laboratory TEXT,
  form TEXT,                                   -- 'gotas', 'comprimido', 'suspensão', 'cápsula', 'xarope'
  dosage TEXT,                                 -- e.g. '500mg/mL'
  barcode TEXT,
  anvisa_code TEXT,
  bula_url TEXT,
  risk_level TEXT NOT NULL DEFAULT 'safe'
    CHECK (risk_level IN ('safe', 'caution', 'risk')),
  risk_description TEXT,                       -- human-readable explanation
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX medications_name_idx ON public.medications USING gin(to_tsvector('portuguese', name));
CREATE INDEX medications_substance_idx ON public.medications USING gin(to_tsvector('portuguese', coalesce(active_substance, '')));

-- Junction: which ingredients appear in which medication
CREATE TABLE public.medication_ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id),
  is_excipient BOOLEAN NOT NULL DEFAULT false,  -- true = inactive ingredient
  quantity TEXT,                                -- e.g. '500mg'
  notes TEXT,
  UNIQUE (medication_id, ingredient_id)
);

-- ============================================================
-- Triggers
-- ============================================================

CREATE TRIGGER update_ingredients_updated_at
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON public.medications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- RLS — catalog tables are publicly readable, admin-only write
-- ============================================================

ALTER TABLE public.allergen_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_ingredients ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone authenticated can read)
CREATE POLICY "Authenticated users can read allergen_groups"
  ON public.allergen_groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read ingredients"
  ON public.ingredients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read medications"
  ON public.medications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read medication_ingredients"
  ON public.medication_ingredients FOR SELECT
  TO authenticated
  USING (true);

-- Admin write access
CREATE POLICY "Admins can manage allergen_groups"
  ON public.allergen_groups FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage ingredients"
  ON public.ingredients FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage medications"
  ON public.medications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage medication_ingredients"
  ON public.medication_ingredients FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
