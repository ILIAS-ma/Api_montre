const express = require('express');
const router = express.Router();
const Watch = require('../models/watch.model');
const auth = require('../middleware/auth.middleware');

// Obtenir toutes les montres (public)
router.get('/', async (req, res) => {
  try {
    const watches = await Watch.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(watches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtenir une montre par ID (public)
router.get('/:id', async (req, res) => {
  try {
    const watch = await Watch.findByPk(req.params.id);
    if (!watch) {
      return res.status(404).json({ message: 'Montre non trouvée.' });
    }
    res.json(watch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer une nouvelle montre (admin seulement)
router.post('/', auth, async (req, res) => {
  try {
    const watch = await Watch.create(req.body);
    res.status(201).json(watch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mettre à jour une montre (admin seulement)
router.put('/:id', auth, async (req, res) => {
  try {
    const watch = await Watch.findByPk(req.params.id);
    if (!watch) {
      return res.status(404).json({ message: 'Montre non trouvée.' });
    }
    await watch.update(req.body);
    res.json(watch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer une montre (admin seulement)
router.delete('/:id', auth, async (req, res) => {
  try {
    const watch = await Watch.findByPk(req.params.id);
    if (!watch) {
      return res.status(404).json({ message: 'Montre non trouvée.' });
    }
    await watch.destroy();
    res.json({ message: 'Montre supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 