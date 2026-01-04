-- Script de correction RLS pour analyse_leads (VERSION FINALE)
-- À exécuter dans l'éditeur SQL de Supabase
-- Ce script utilise explicitement le rôle 'anon' pour les utilisateurs non authentifiés

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
-- ÉTAPE 2 : S'assurer que RLS est activé
-- ============================================
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ÉTAPE 3 : Créer les nouvelles politiques avec 'anon' explicite
-- ============================================

-- Politique d'insertion pour les utilisateurs ANONYMES (non authentifiés)
-- IMPORTANT: Utiliser 'anon' au lieu de 'public' pour plus de fiabilité
-- C'est le rôle utilisé par Supabase pour les requêtes non authentifiées
CREATE POLICY "anon_insert" ON analyse_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique d'insertion pour les utilisateurs AUTHENTIFIÉS (au cas où)
CREATE POLICY "authenticated_insert" ON analyse_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique de lecture pour les utilisateurs authentifiés uniquement
CREATE POLICY "authenticated_read" ON analyse_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique de mise à jour pour les utilisateurs authentifiés uniquement
CREATE POLICY "authenticated_update" ON analyse_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique de suppression pour les utilisateurs authentifiés uniquement
CREATE POLICY "authenticated_delete" ON analyse_leads
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
  RAISE NOTICE 'Les utilisateurs anonymes (anon) peuvent maintenant insérer des données';
  RAISE NOTICE 'Les utilisateurs authentifiés peuvent lire, modifier et supprimer';
END $$;
