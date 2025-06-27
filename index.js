const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Stockage en mémoire des montres
let watches = [];

// POST /watches : Ajouter une montre
app.post('/watches', (req, res) => {
  const { prix, description, taille_mm, image_principale, images_secondaires, stock, modele } = req.body;

  if (!prix || !description || !taille_mm || !image_principale || !images_secondaires || !Array.isArray(images_secondaires) || images_secondaires.length !== 5 || stock === undefined || !modele) {
    return res.status(400).json({ error: 'Champs manquants : prix, description, taille_mm, image_principale, images_secondaires (5), stock, modele.' });
  }

  const watch = {
    id: watches.length + 1,
    prix,
    description,
    taille_mm,
    image_principale,
    images_secondaires,
    stock,
    modele
  };
  watches.push(watch);
  res.status(201).json(watch);
});

// GET /watches : Liste des montres
app.get('/watches', (req, res) => {
  res.json(watches);
});

// GET /watches/:id : Récupérer une montre par id
app.get('/watches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const watch = watches.find(w => w.id === id);
  if (!watch) {
    return res.status(404).json({ error: 'Montre non trouvée' });
  }
  res.json(watch);
});

// PUT /watches/:id : Mettre à jour une montre
app.put('/watches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = watches.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Montre non trouvée' });
  }
  
  const { prix, description, taille_mm, image_principale, images_secondaires, stock, modele } = req.body;
  if (!prix || !description || !taille_mm || !image_principale || !images_secondaires || !Array.isArray(images_secondaires) || images_secondaires.length !== 5 || stock === undefined || !modele) {
    return res.status(400).json({ error: 'Champs manquants : prix, description, taille_mm, image_principale, images_secondaires (5), stock, modele.' });
  }
  
  watches[index] = { id, prix, description, taille_mm, image_principale, images_secondaires, stock, modele };
  res.json(watches[index]);
});

// DELETE /watches/:id : Supprimer une montre
app.delete('/watches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = watches.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Montre non trouvée' });
  }
  watches.splice(index, 1);
  res.json({ message: 'Montre supprimée avec succès' });
});

app.listen(port, () => {
  console.log(`API Montres démarrée sur http://localhost:${port}`);
}); 