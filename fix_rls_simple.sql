-- Script SIMPLE et DIRECT pour corriger les politiques RLS
-- À exécuter dans l'éditeur SQL de Supabase

-- ÉTAPE 1 : Supprimer TOUTES les politiques existantes
DROP POLICY IF EXISTS "Allow public insert" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON analyse_leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON analyse_leads;

-- ÉTAPE 2 : Désactiver temporairement RLS pour tester
-- (Décommentez cette ligne si vous voulez tester sans RLS)
-- ALTER TABLE analyse_leads DISABLE ROW LEVEL SECURITY;

-- ÉTAPE 3 : Recréer UNIQUEMENT la politique d'insertion publique
-- Version 1 : Sans spécifier TO (fonctionne dans certains cas)
CREATE POLICY "Allow public insert" ON analyse_leads
  FOR INSERT 
  WITH CHECK (true);

-- Si la version 1 ne fonctionne pas, essayez la version 2 ci-dessous :
-- (Commentez la version 1 et décommentez la version 2)

-- Version 2 : Avec TO anon explicitement
-- CREATE POLICY "Allow public insert" ON analyse_leads
--   FOR INSERT 
--   TO anon
--   WITH CHECK (true);

-- Version 3 : Avec TO anon, authenticated
-- CREATE POLICY "Allow public insert" ON analyse_leads
--   FOR INSERT 
--   TO anon, authenticated
--   WITH CHECK (true);

-- ÉTAPE 4 : Politiques pour les admins (lecture/modification)
CREATE POLICY "Allow authenticated read" ON analyse_leads
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON analyse_leads
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON analyse_leads
  FOR DELETE 
  TO authenticated
  USING (true);

-- ÉTAPE 5 : S'assurer que RLS est activé
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Politiques RLS recréées. Testez maintenant le formulaire.';
  RAISE NOTICE 'Si cela ne fonctionne toujours pas, essayez les versions 2 ou 3 de la politique d''insertion.';
END $$;


