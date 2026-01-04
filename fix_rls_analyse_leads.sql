-- Script de correction RLS pour analyse_leads
-- À exécuter dans l'éditeur SQL de Supabase
-- Ce script permet aux utilisateurs anonymes d'insérer des données

-- ============================================
-- ÉTAPE 1 : Supprimer les anciennes politiques
-- ============================================
DROP POLICY IF EXISTS "Allow public insert" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON analyse_leads;
DROP POLICY IF EXISTS "Public can insert" ON analyse_leads;
DROP POLICY IF EXISTS "Authenticated can read" ON analyse_leads;

-- ============================================
-- ÉTAPE 2 : S'assurer que RLS est activé
-- ============================================
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ÉTAPE 3 : Créer les nouvelles politiques
-- ============================================

-- Politique d'insertion pour TOUS (anonymes et authentifiés)
-- Cette politique permet à n'importe qui d'insérer des données
CREATE POLICY "Public can insert" ON analyse_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Politique de lecture pour les utilisateurs authentifiés uniquement
CREATE POLICY "Authenticated can read" ON analyse_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique de mise à jour pour les utilisateurs authentifiés uniquement
CREATE POLICY "Authenticated can update" ON analyse_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique de suppression pour les utilisateurs authentifiés uniquement
CREATE POLICY "Authenticated can delete" ON analyse_leads
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Vérifier que les politiques sont bien créées
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'analyse_leads'
ORDER BY policyname;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Politiques RLS corrigées avec succès pour analyse_leads';
  RAISE NOTICE 'Les utilisateurs anonymes peuvent maintenant insérer des données';
END $$;

