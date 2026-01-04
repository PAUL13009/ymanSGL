-- Script pour vérifier et corriger les politiques RLS de contact_messages
-- Exécutez ce script dans Supabase SQL Editor

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow public insert" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated update" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated delete" ON contact_messages;

-- Recréer les politiques avec les bonnes configurations

-- Politique pour permettre l'insertion publique (n'importe qui peut envoyer un message)
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT 
  WITH CHECK (true);

-- Politique pour permettre la lecture uniquement aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated read" ON contact_messages
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Politique pour permettre la mise à jour uniquement aux utilisateurs authentifiés (marquer comme lu)
CREATE POLICY "Allow authenticated update" ON contact_messages
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated delete" ON contact_messages
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Vérifier que RLS est activé
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;


