-- Script de correction RLS ULTRA PERMISSIVE pour analyse_leads
-- À exécuter dans l'éditeur SQL de Supabase
-- Ce script crée des politiques encore plus permissives pour déboguer

-- ============================================
-- ÉTAPE 1 : Supprimer TOUTES les anciennes politiques
-- ============================================
DROP POLICY IF EXISTS "Allow public insert" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON analyse_leads;
DROP POLICY IF EXISTS "Public can insert" ON analyse_leads;
DROP POLICY IF EXISTS "Authenticated can read" ON analyse_leads;
DROP POLICY IF EXISTS "Authenticated can update" ON analyse_leads;
DROP POLICY IF EXISTS "Authenticated can delete" ON analyse_leads;
DROP POLICY IF EXISTS "anon_insert" ON analyse_leads;
DROP POLICY IF EXISTS "authenticated_insert" ON analyse_leads;
DROP POLICY IF EXISTS "authenticated_read" ON analyse_leads;
DROP POLICY IF EXISTS "authenticated_update" ON analyse_leads;
DROP POLICY IF EXISTS "authenticated_delete" ON analyse_leads;

-- ============================================
-- ÉTAPE 2 : Désactiver temporairement RLS pour tester
-- ============================================
-- ATTENTION: Ceci désactive RLS complètement - à utiliser uniquement pour tester
-- ALTER TABLE analyse_leads DISABLE ROW LEVEL SECURITY;

-- OU garder RLS activé mais avec des politiques ultra permissives
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ÉTAPE 3 : Créer des politiques ULTRA PERMISSIVES
-- ============================================

-- Politique d'insertion pour TOUS les rôles (anon, authenticated, service_role)
-- Sans aucune condition
CREATE POLICY "allow_all_insert" ON analyse_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Politique de lecture pour TOUS (temporaire pour tester)
CREATE POLICY "allow_all_read" ON analyse_leads
  FOR SELECT
  TO public
  USING (true);

-- Politique de mise à jour pour les utilisateurs authentifiés
CREATE POLICY "allow_authenticated_update" ON analyse_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique de suppression pour les utilisateurs authentifiés
CREATE POLICY "allow_authenticated_delete" ON analyse_leads
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- VÉRIFICATION
-- ============================================
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
  RAISE NOTICE '✅ Politiques RLS ultra permissives créées pour analyse_leads';
  RAISE NOTICE 'TOUS les utilisateurs (public) peuvent maintenant insérer et lire';
  RAISE NOTICE '⚠️ ATTENTION: Ces politiques sont très permissives - à restreindre après test';
END $$;

