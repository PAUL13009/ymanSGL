-- Créer la table analyse_leads pour stocker les demandes d'analyse de valeur
CREATE TABLE IF NOT EXISTS analyse_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations de localisation
  localisation TEXT NOT NULL,
  type_bien TEXT NOT NULL,
  
  -- Maturité du projet
  maturite TEXT NOT NULL,
  
  -- Question clé sur l'ajustement du prix
  ajustement_prix TEXT NOT NULL,
  
  -- Motivation
  motivation TEXT NOT NULL,
  
  -- Coordonnées
  prenom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Métadonnées
  read BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'en_cours', 'accepte', 'refuse')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_analyse_leads_created_at ON analyse_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyse_leads_read ON analyse_leads(read);
CREATE INDEX IF NOT EXISTS idx_analyse_leads_status ON analyse_leads(status);
CREATE INDEX IF NOT EXISTS idx_analyse_leads_email ON analyse_leads(email);

-- Activer Row Level Security (RLS)
ALTER TABLE analyse_leads ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (n'importe qui peut soumettre une demande)
CREATE POLICY "Allow public insert" ON analyse_leads
  FOR INSERT 
  WITH CHECK (true);

-- Politique pour permettre la lecture uniquement aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated read" ON analyse_leads
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Politique pour permettre la mise à jour uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated update" ON analyse_leads
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated delete" ON analyse_leads
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_analyse_leads_updated_at
  BEFORE UPDATE ON analyse_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


