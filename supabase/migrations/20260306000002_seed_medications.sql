-- ============================================================
-- Seed Data: Allergen Groups, Ingredients, and Medications
-- Focus: APLV (Alergia à Proteína do Leite de Vaca)
-- ============================================================

-- ============================================================
-- 1. Allergen Groups
-- ============================================================
INSERT INTO public.allergen_groups (name, code, description) VALUES
  ('Proteína do Leite de Vaca', 'MILK', 'Proteínas derivadas do leite bovino, incluindo caseína, lactoalbumina e lactoglobulina. Causa APLV.'),
  ('Lactose', 'LACTOSE', 'Açúcar do leite. Pode causar intolerância à lactose; distinto de APLV mas frequentemente co-ocorre.'),
  ('Glúten', 'GLUTEN', 'Proteína presente no trigo, cevada e centeio.'),
  ('Soja', 'SOY', 'Proteína derivada da soja. Reação cruzada comum com APLV.'),
  ('Ovo', 'EGG', 'Proteínas da clara e gema de ovo.');

-- ============================================================
-- 2. Ingredients
-- ============================================================

-- Milk-derived (allergens)
INSERT INTO public.ingredients (name, common_names, is_allergen, allergen_group_id, notes) VALUES
  ('Lactose', ARRAY['Lactosa','Açúcar do leite'], true,
    (SELECT id FROM public.allergen_groups WHERE code = 'LACTOSE'),
    'Excipiente muito comum em comprimidos e cápsulas. Pode desencadear reações em crianças com APLV grave.'),
  ('Caseína', ARRAY['Casein','Caseinate'], true,
    (SELECT id FROM public.allergen_groups WHERE code = 'MILK'),
    'Principal proteína do leite. Alto potencial alergênico.'),
  ('Soro de leite', ARRAY['Whey','Proteína do soro'], true,
    (SELECT id FROM public.allergen_groups WHERE code = 'MILK'),
    'Proteínas do soro: lactoalbumina e lactoglobulina. Alto potencial alergênico.'),
  ('Manteiga anidra', ARRAY['Anhydrous butter fat','Gordura do leite'], true,
    (SELECT id FROM public.allergen_groups WHERE code = 'MILK'),
    'Gordura do leite com traços de proteínas. Risco reduzido mas presente.');

-- Soy-derived
INSERT INTO public.ingredients (name, common_names, is_allergen, allergen_group_id, notes) VALUES
  ('Lecitina de soja', ARRAY['Soy lecithin','E322'], true,
    (SELECT id FROM public.allergen_groups WHERE code = 'SOY'),
    'Emulsificante derivado da soja. Geralmente bem tolerado mas pode causar reação em alérgicos à soja.');

-- Safe excipients (not allergens)
INSERT INTO public.ingredients (name, common_names, is_allergen, notes) VALUES
  ('Dipirona Sódica', ARRAY['Metamizol','Novalgina'], false, 'Princípio ativo analgésico e antitérmico.'),
  ('Amoxicilina', ARRAY['Amoxil'], false, 'Antibiótico beta-lactâmico.'),
  ('Paracetamol', ARRAY['Acetaminofeno','Tylenol'], false, 'Analgésico e antitérmico. Seguro para APLV.'),
  ('Ibuprofeno', ARRAY['Ibuprofen','Advil'], false, 'Anti-inflamatório não esteroidal.'),
  ('Colecalciferol', ARRAY['Vitamina D3','Cholecalciferol'], false, 'Vitamina D3 — suplemento essencial.'),
  ('Ergocalciferol', ARRAY['Vitamina D2'], false, 'Vitamina D2 de origem vegetal.'),
  ('Glicerina', ARRAY['Glicerol','Glycerol'], false, 'Excipiente comum em gotas. Seguro para APLV.'),
  ('Sacarose', ARRAY['Açúcar','Sucrose'], false, 'Excipiente adoçante. Seguro para APLV.'),
  ('Celulose microcristalina', ARRAY['MCC','Avicel'], false, 'Excipiente de enchimento. Seguro para APLV.'),
  ('Dióxido de silício', ARRAY['Sílica','Silicon dioxide','E551'], false, 'Antiaglomerante. Seguro para APLV.'),
  ('Estearato de magnésio', ARRAY['Magnesium stearate'], false, 'Lubrificante de comprimidos. Seguro para APLV.'),
  ('Água purificada', ARRAY['Água para injeção'], false, 'Veículo. Seguro para APLV.'),
  ('Álcool etílico', ARRAY['Etanol'], false, 'Solvente. Presente em algumas gotas.'),
  ('Sacarina sódica', ARRAY['Sacarin'], false, 'Adoçante. Seguro para APLV.'),
  ('Benzoato de sódio', ARRAY['E211'], false, 'Conservante. Seguro para APLV.'),
  ('Amoxicilina tri-hidratada', ARRAY['Amoxicillin trihydrate'], false, 'Sal de amoxicilina para suspensão oral.'),
  ('Clavulanato de potássio', ARRAY['Clavulanic acid'], false, 'Inibidor de beta-lactamase, usado com amoxicilina.'),
  ('Sorbitol', ARRAY['E420'], false, 'Adoçante e umectante. Seguro para APLV.'),
  ('Carboximetilcelulose sódica', ARRAY['CMC','E466'], false, 'Espessante. Seguro para APLV.'),
  ('Azitromicina', ARRAY['Zithromax'], false, 'Antibiótico macrolídeo.'),
  ('Prednisolona', ARRAY['Prelone'], false, 'Corticosteroide para inflamação e reações alérgicas.'),
  ('Budesonida', ARRAY['Pulmicort','Budecort'], false, 'Corticosteroide inalatório.'),
  ('Salbutamol', ARRAY['Albuterol','Ventolin'], false, 'Broncodilatador beta-2 agonista.'),
  ('Montelucaste sódico', ARRAY['Singulair'], false, 'Antagonista do receptor de leucotrieno — antiálergico.'),
  ('Cetirizina cloridrato', ARRAY['Zyrtec','Reactine'], false, 'Anti-histamínico de 2ª geração.'),
  ('Loratadina', ARRAY['Claritin'], false, 'Anti-histamínico de 2ª geração — não sedativo.'),
  ('Zinco', ARRAY['Sulfato de zinco','Zinc sulfate'], false, 'Suplemento mineral. Seguro para APLV.'),
  ('Ferro quelato bisglicinato', ARRAY['Iron bisglycinate'], false, 'Suplemento de ferro de alta absorção. Seguro para APLV.'),
  ('Ômega-3 (óleo de peixe)', ARRAY['DHA','EPA','Fish oil'], false, 'Ácido graxo essencial. Seguro para APLV.');

-- ============================================================
-- 3. Medications
-- ============================================================

-- SAFE medications (risk_level = 'safe')
INSERT INTO public.medications (name, active_substance, laboratory, form, dosage, risk_level, risk_description) VALUES
  ('Dipirona Gotas', 'Dipirona Sódica', 'Medley', 'gotas', '500mg/mL',
   'safe', 'Não contém lactose, caseína nem derivados do leite. Seguro para APLV.'),

  ('Dipirona Gotas', 'Dipirona Sódica', 'Sanofi', 'gotas', '500mg/mL',
   'safe', 'Fórmula isenta de derivados do leite. Seguro para APLV.'),

  ('Novalgina Gotas', 'Dipirona Sódica', 'Sanofi', 'gotas', '500mg/mL',
   'safe', 'Não contém lactose nem proteínas do leite. Seguro para APLV.'),

  ('Paracetamol Infantil Gotas', 'Paracetamol', 'EMS', 'gotas', '200mg/mL',
   'safe', 'Fórmula líquida sem excipientes lácteos. Seguro para APLV.'),

  ('Tylenol Bebê Gotas', 'Paracetamol', 'Johnson & Johnson', 'gotas', '100mg/mL',
   'safe', 'Não contém derivados do leite. Seguro para APLV.'),

  ('Azitromicina Suspensão Pediátrica', 'Azitromicina', 'EMS', 'suspensão', '200mg/5mL',
   'safe', 'Suspensão isenta de lactose e proteínas do leite. Seguro para APLV.'),

  ('Prednisolona Solução Oral', 'Prednisolona', 'Eurofarma', 'solução', '3mg/mL',
   'safe', 'Formulação líquida sem derivados do leite. Seguro para APLV.'),

  ('Montelucaste Granulado', 'Montelucaste Sódico', 'MSD', 'granulado', '4mg',
   'safe', 'Não contém lactose. Seguro para APLV.'),

  ('Cetirizina Gotas Pediátricas', 'Cetirizina Cloridrato', 'Bayer', 'gotas', '10mg/mL',
   'safe', 'Formulação líquida isenta de derivados do leite. Seguro para APLV.'),

  ('Loratadina Xarope', 'Loratadina', 'Schering-Plough', 'xarope', '1mg/mL',
   'safe', 'Xarope sem lactose ou caseína. Seguro para APLV.'),

  ('Budesonida Suspensão para Nebulização', 'Budesonida', 'AstraZeneca', 'suspensão', '0,25mg/2mL',
   'safe', 'Suspensão inalatória isenta de derivados do leite. Seguro para APLV.'),

  ('Salbutamol Inalatório', 'Salbutamol', 'GlaxoSmithKline', 'aerossol', '100mcg/dose',
   'safe', 'Inalador sem excipientes lácteos. Seguro para APLV.'),

  ('Vitamina D3 Gotas', 'Colecalciferol', 'Addera D3', 'gotas', '200UI/gota',
   'safe', 'Fórmula em óleo de oliva. Sem lactose ou derivados do leite. Seguro para APLV.'),

  ('Bio-D Gotas', 'Colecalciferol', 'Daudt Oliveira', 'gotas', '400UI/gota',
   'safe', 'Formulação oleosa sem proteínas do leite. Seguro para APLV.'),

  ('Sulfato de Zinco Solução Oral', 'Zinco', 'Farmácias de Manipulação', 'solução', '10mg/mL',
   'safe', 'Suplemento mineral sem derivados do leite. Seguro para APLV.'),

  ('Ferro Quelato Gotas', 'Ferro bisglicinato', 'Sundown', 'gotas', '25mg/mL',
   'safe', 'Ferro quelato sem lactose. Seguro para APLV.'),

  ('Amoxicilina Suspensão', 'Amoxicilina tri-hidratada', 'Neo Química', 'suspensão', '250mg/5mL',
   'safe', 'Suspensão pediátrica sem derivados do leite. Seguro para APLV.');

-- CAUTION medications (risk_level = 'caution')
INSERT INTO public.medications (name, active_substance, laboratory, form, dosage, risk_level, risk_description, notes) VALUES
  ('Amoxicilina + Clavulanato Suspensão', 'Amoxicilina + Clavulanato de Potássio', 'EMS', 'suspensão', '400mg+57mg/5mL',
   'caution', 'Contém lecitina de soja como excipiente. Verificar tolerância individual em alérgicos à soja.',
   'A lecitina de soja raramente causa reação em alérgicos à soja, mas deve ser avaliada caso a caso.'),

  ('Ibuprofeno Suspensão Pediátrica', 'Ibuprofeno', 'Aché', 'suspensão', '100mg/5mL',
   'caution', 'Alguns lotes podem utilizar excipientes com risco de contaminação cruzada com lactose. Verificar bula do lote.',
   'Consulte a bula específica do lote adquirido para confirmar os excipientes utilizados.'),

  ('Polivitamínico Infantil Gotas', 'Vitaminas A, C, D, E, K, B1, B2, B6, B12', 'Sundown', 'gotas', 'dose diária',
   'caution', 'Alguns polivitamínicos contêm derivados do leite como excipientes. Verificar composição do produto específico.',
   'A composição pode variar por fabricante e lote. Sempre verifique o rótulo.'),

  ('Vitamina D + DHA Gotas', 'Colecalciferol + Ômega-3', 'Ômega 3 Kids', 'gotas', '200UI/dose',
   'caution', 'Produto com óleo de peixe — risco de contaminação cruzada dependendo do processamento industrial.',
   'Verificar certificação do fabricante para ausência de derivados lácteos.');

-- RISK medications (risk_level = 'risk')
INSERT INTO public.medications (name, active_substance, laboratory, form, dosage, risk_level, risk_description, notes) VALUES
  ('Vitamina D3 Comprimidos Mastigáveis', 'Colecalciferol', 'Aché', 'comprimido mastigável', '1000UI',
   'risk', 'Contém lactose como excipiente. CONTRAINDICADO para crianças com APLV.',
   'A forma comprimido mastigável frequentemente usa lactose como base. Preferir a formulação em gotas.'),

  ('Dipirona Comprimido', 'Dipirona Sódica', 'EMS', 'comprimido', '500mg',
   'risk', 'Contém lactose mono-hidratada como excipiente. CONTRAINDICADO para crianças com APLV.',
   'Para crianças com APLV, sempre preferir a formulação em gotas ou solução oral.'),

  ('Amoxicilina Cápsula', 'Amoxicilina tri-hidratada', 'Teuto', 'cápsula', '500mg',
   'risk', 'Contém lactose mono-hidratada e estearato de magnésio derivado do leite. Contraindicado para APLV grave.',
   'Preferir suspensão oral pediátrica que não contém lactose.'),

  ('Ibuprofeno Comprimido Revestido', 'Ibuprofeno', 'Medley', 'comprimido revestido', '400mg',
   'risk', 'Contém lactose mono-hidratada como excipiente. Contraindicado para APLV.',
   'Para pacientes com APLV, optar por formulação líquida sem lactose.');

-- ============================================================
-- 4. Medication-Ingredient Relationships
-- ============================================================

-- Helper: create medication_ingredient entries by medication name + laboratory
-- Dipirona Gotas (Medley) — SAFE
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient, quantity)
SELECT m.id, i.id, false, '500mg/mL'
FROM public.medications m, public.ingredients i
WHERE m.name = 'Dipirona Gotas' AND m.laboratory = 'Medley'
  AND i.name = 'Dipirona Sódica';

INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, true
FROM public.medications m, public.ingredients i
WHERE m.name = 'Dipirona Gotas' AND m.laboratory = 'Medley'
  AND i.name IN ('Glicerina', 'Sacarina sódica', 'Benzoato de sódio', 'Água purificada');

-- Paracetamol Infantil Gotas (EMS) — SAFE
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient, quantity)
SELECT m.id, i.id, false, '200mg/mL'
FROM public.medications m, public.ingredients i
WHERE m.name = 'Paracetamol Infantil Gotas'
  AND i.name = 'Paracetamol';

INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, true
FROM public.medications m, public.ingredients i
WHERE m.name = 'Paracetamol Infantil Gotas'
  AND i.name IN ('Glicerina', 'Sacarose', 'Benzoato de sódio', 'Água purificada', 'Sacarina sódica');

-- Vitamina D3 Gotas (Addera D3) — SAFE
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient, quantity)
SELECT m.id, i.id, false, '200UI/gota'
FROM public.medications m, public.ingredients i
WHERE m.name = 'Vitamina D3 Gotas'
  AND i.name = 'Colecalciferol';

-- Dipirona Comprimido (EMS) — RISK: contains lactose
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient, quantity)
SELECT m.id, i.id, false, '500mg'
FROM public.medications m, public.ingredients i
WHERE m.name = 'Dipirona Comprimido'
  AND i.name = 'Dipirona Sódica';

INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, true
FROM public.medications m, public.ingredients i
WHERE m.name = 'Dipirona Comprimido'
  AND i.name IN ('Lactose', 'Celulose microcristalina', 'Estearato de magnésio', 'Dióxido de silício');

-- Vitamina D3 Comprimidos Mastigáveis (Aché) — RISK: contains lactose
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient, quantity)
SELECT m.id, i.id, false, '1000UI'
FROM public.medications m, public.ingredients i
WHERE m.name = 'Vitamina D3 Comprimidos Mastigáveis'
  AND i.name = 'Colecalciferol';

INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, true
FROM public.medications m, public.ingredients i
WHERE m.name = 'Vitamina D3 Comprimidos Mastigáveis'
  AND i.name IN ('Lactose', 'Sacarose', 'Celulose microcristalina', 'Estearato de magnésio');

-- Amoxicilina + Clavulanato Suspensão (EMS) — CAUTION: soy lecithin
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, false
FROM public.medications m, public.ingredients i
WHERE m.name = 'Amoxicilina + Clavulanato Suspensão'
  AND i.name IN ('Amoxicilina tri-hidratada', 'Clavulanato de potássio');

INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, true
FROM public.medications m, public.ingredients i
WHERE m.name = 'Amoxicilina + Clavulanato Suspensão'
  AND i.name IN ('Lecitina de soja', 'Sorbitol', 'Carboximetilcelulose sódica', 'Sacarina sódica', 'Água purificada');

-- Cetirizina Gotas Pediátricas — SAFE
INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient, quantity)
SELECT m.id, i.id, false, '10mg/mL'
FROM public.medications m, public.ingredients i
WHERE m.name = 'Cetirizina Gotas Pediátricas'
  AND i.name = 'Cetirizina cloridrato';

INSERT INTO public.medication_ingredients (medication_id, ingredient_id, is_excipient)
SELECT m.id, i.id, true
FROM public.medications m, public.ingredients i
WHERE m.name = 'Cetirizina Gotas Pediátricas'
  AND i.name IN ('Glicerina', 'Sacarina sódica', 'Água purificada', 'Benzoato de sódio');
