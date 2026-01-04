-- Script de test pour vérifier les politiques RLS
-- À exécuter après avoir exécuté fix_analyse_leads_complete.sql

-- Vérifier que RLS est activé
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'analyse_leads';

-- Lister toutes les politiques existantes
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
WHERE tablename = 'analyse_leads';

-- Test d'insertion (devrait fonctionner même sans authentification)
-- Cette requête simule ce que fait le formulaire
INSERT INTO analyse_leads (
  localisation,
  type_bien,
  maturite,
  ajustement_prix,
  motivation,
  prenom,
  telephone,
  email,
  type_demande
) VALUES (
  'Test RLS',
  'Appartement',
  'estimation',
  'oui',
  'Test de vérification des politiques RLS',
  'Test',
  '0600000000',
  'test@example.com',
  'estimation'
);

-- Si l'insertion fonctionne, supprimer l'enregistrement de test
DELETE FROM analyse_leads WHERE email = 'test@example.com';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Test terminé. Si aucune erreur n''apparaît, les politiques RLS fonctionnent correctement.';
END $$;


