-- Script complet de correction pour analyse_leads
-- À exécuter dans l'éditeur SQL de Supabase

-- ============================================
-- ÉTAPE 1 : Ajouter les colonnes manquantes (si elles n'existent pas)
-- ============================================

-- Colonnes pour l'estimation détaillée
DO $$ 
BEGIN
  -- Surface habitable
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'surface') THEN
    ALTER TABLE analyse_leads ADD COLUMN surface TEXT;
  END IF;

  -- Description initiale
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'description_initiale') THEN
    ALTER TABLE analyse_leads ADD COLUMN description_initiale TEXT;
  END IF;

  -- Caractéristiques du bien
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'nombre_pieces') THEN
    ALTER TABLE analyse_leads ADD COLUMN nombre_pieces INTEGER;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'nombre_chambres') THEN
    ALTER TABLE analyse_leads ADD COLUMN nombre_chambres INTEGER;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'etage') THEN
    ALTER TABLE analyse_leads ADD COLUMN etage INTEGER;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'dernier_etage') THEN
    ALTER TABLE analyse_leads ADD COLUMN dernier_etage BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'ascenseur') THEN
    ALTER TABLE analyse_leads ADD COLUMN ascenseur BOOLEAN;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'exterieurs') THEN
    ALTER TABLE analyse_leads ADD COLUMN exterieurs JSONB;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'stationnement') THEN
    ALTER TABLE analyse_leads ADD COLUMN stationnement TEXT;
  END IF;

  -- État & Prestations
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'etat_bien') THEN
    ALTER TABLE analyse_leads ADD COLUMN etat_bien TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'travaux_recents') THEN
    ALTER TABLE analyse_leads ADD COLUMN travaux_recents BOOLEAN;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'nature_travaux') THEN
    ALTER TABLE analyse_leads ADD COLUMN nature_travaux TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'annee_travaux') THEN
    ALTER TABLE analyse_leads ADD COLUMN annee_travaux INTEGER;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'prestations') THEN
    ALTER TABLE analyse_leads ADD COLUMN prestations JSONB;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'autres_prestations') THEN
    ALTER TABLE analyse_leads ADD COLUMN autres_prestations TEXT;
  END IF;

  -- Confort & Environnement
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'exposition') THEN
    ALTER TABLE analyse_leads ADD COLUMN exposition TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'vis_a_vis') THEN
    ALTER TABLE analyse_leads ADD COLUMN vis_a_vis TEXT;
  END IF;

  -- Photos
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'photos_urls') THEN
    ALTER TABLE analyse_leads ADD COLUMN photos_urls JSONB;
  END IF;

  -- Projet de vente
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'delai_vente') THEN
    ALTER TABLE analyse_leads ADD COLUMN delai_vente TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'situation_actuelle') THEN
    ALTER TABLE analyse_leads ADD COLUMN situation_actuelle TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'prix_envisage') THEN
    ALTER TABLE analyse_leads ADD COLUMN prix_envisage TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'message_libre') THEN
    ALTER TABLE analyse_leads ADD COLUMN message_libre TEXT;
  END IF;

  -- Type de demande
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'analyse_leads' AND column_name = 'type_demande') THEN
    ALTER TABLE analyse_leads ADD COLUMN type_demande TEXT;
  END IF;

  -- Rendre maturite optionnel si ce n'est pas déjà fait
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'analyse_leads' AND column_name = 'maturite' 
             AND is_nullable = 'NO') THEN
    ALTER TABLE analyse_leads ALTER COLUMN maturite DROP NOT NULL;
  END IF;

END $$;

-- ============================================
-- ÉTAPE 2 : Corriger les politiques RLS
-- ============================================

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Allow public insert" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON analyse_leads;

-- Recréer les politiques avec la syntaxe correcte
-- IMPORTANT: Utiliser 'anon' et 'authenticated' explicitement

-- Politique d'insertion publique (TOUS les utilisateurs, même anonymes)
-- Cette politique permet à n'importe qui (y compris les utilisateurs non connectés) d'insérer
CREATE POLICY "Allow public insert" ON analyse_leads
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Politique de lecture pour les utilisateurs authentifiés uniquement
CREATE POLICY "Allow authenticated read" ON analyse_leads
  FOR SELECT 
  TO authenticated
  USING (true);

-- Politique de mise à jour pour les utilisateurs authentifiés uniquement
CREATE POLICY "Allow authenticated update" ON analyse_leads
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique de suppression pour les utilisateurs authentifiés uniquement
CREATE POLICY "Allow authenticated delete" ON analyse_leads
  FOR DELETE 
  TO authenticated
  USING (true);

-- S'assurer que RLS est activé
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Colonnes ajoutées et politiques RLS corrigées avec succès pour analyse_leads';
END $$;

