-- Script de correction des politiques RLS pour analyse_leads
-- À exécuter dans l'éditeur SQL de Supabase

-- Étape 1 : Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Allow public insert" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON analyse_leads;

-- Étape 2 : Désactiver temporairement RLS pour vérifier que la table existe
-- (Ne pas exécuter cette ligne si vous voulez garder RLS activé)
-- ALTER TABLE analyse_leads DISABLE ROW LEVEL SECURITY;

-- Étape 3 : Recréer les politiques avec la syntaxe correcte

-- Politique d'insertion publique (TOUS les utilisateurs, même anonymes)
CREATE POLICY "Allow public insert" ON analyse_leads
  FOR INSERT 
  TO public
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

-- Vérification : S'assurer que RLS est bien activé
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Politiques RLS recréées avec succès pour analyse_leads';
END $$;


