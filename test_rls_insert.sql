-- Script de test pour vérifier les permissions RLS
-- À exécuter dans l'éditeur SQL de Supabase

-- Test 1 : Vérifier que RLS est bien activé
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'analyse_leads';

-- Test 2 : Vérifier toutes les politiques actives
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'analyse_leads'
ORDER BY policyname;

-- Test 3 : Tester une insertion en tant qu'utilisateur anon
-- (Ce test simule ce que fait le client Supabase)
SET ROLE anon;

-- Tenter une insertion de test
INSERT INTO analyse_leads (
  localisation,
  type_bien,
  maturite,
  ajustement_prix,
  motivation,
  prenom,
  telephone,
  email
) VALUES (
  'Test',
  'Appartement',
  'estimation',
  'oui',
  'Test de permission',
  'Test',
  '0123456789',
  'test@example.com'
);

-- Vérifier que l'insertion a fonctionné
SELECT * FROM analyse_leads WHERE email = 'test@example.com';

-- Nettoyer le test
DELETE FROM analyse_leads WHERE email = 'test@example.com';

-- Remettre le rôle par défaut
RESET ROLE;

