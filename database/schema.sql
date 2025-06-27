-- Création de la table watches
CREATE TABLE IF NOT EXISTS watches (
    id SERIAL PRIMARY KEY,
    prix DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    taille_mm INTEGER NOT NULL,
    image_principale TEXT NOT NULL,
    images_secondaires TEXT[] NOT NULL CHECK (array_length(images_secondaires, 1) = 5),
    stock INTEGER NOT NULL DEFAULT 0,
    modele VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_watches_modele ON watches(modele);
CREATE INDEX IF NOT EXISTS idx_watches_prix ON watches(prix);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_watches_updated_at 
    BEFORE UPDATE ON watches 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Politique RLS (Row Level Security) - permettre toutes les opérations
ALTER TABLE watches ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations (pour une API publique)
CREATE POLICY "Allow all operations on watches" ON watches
    FOR ALL USING (true) WITH CHECK (true); 