require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('./config/supabase');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// POST /watches : Ajouter une montre
app.post('/watches', async (req, res) => {
  try {
    const { prix, description, taille_mm, image_principale, images_secondaires, stock, modele } = req.body;

    if (!prix || !description || !taille_mm || !image_principale || !images_secondaires || !Array.isArray(images_secondaires) || images_secondaires.length !== 5 || stock === undefined || !modele) {
      return res.status(400).json({ error: 'Champs manquants : prix, description, taille_mm, image_principale, images_secondaires (5), stock, modele.' });
    }

    const { data, error } = await supabase
      .from('watches')
      .insert([{ prix, description, taille_mm, image_principale, images_secondaires, stock, modele }])
      .select();

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout de la montre' });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /watches : Liste des montres
app.get('/watches', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('watches')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ error: 'Erreur lors de la récupération des montres' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /watches/:id : Récupérer une montre par id
app.get('/watches/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const { data, error } = await supabase
      .from('watches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Montre non trouvée' });
      }
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ error: 'Erreur lors de la récupération de la montre' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// PUT /watches/:id : Mettre à jour une montre
app.put('/watches/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { prix, description, taille_mm, image_principale, images_secondaires, stock, modele } = req.body;

    if (!prix || !description || !taille_mm || !image_principale || !images_secondaires || !Array.isArray(images_secondaires) || images_secondaires.length !== 5 || stock === undefined || !modele) {
      return res.status(400).json({ error: 'Champs manquants : prix, description, taille_mm, image_principale, images_secondaires (5), stock, modele.' });
    }

    const { data, error } = await supabase
      .from('watches')
      .update({ prix, description, taille_mm, image_principale, images_secondaires, stock, modele })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Montre non trouvée' });
      }
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la montre' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// DELETE /watches/:id : Supprimer une montre
app.delete('/watches/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { error } = await supabase
      .from('watches')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la montre' });
    }

    res.json({ message: 'Montre supprimée avec succès' });
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.listen(port, () => {
  console.log(`API Montres démarrée sur http://localhost:${port}`);
  console.log('Base de données Supabase connectée');
}); 