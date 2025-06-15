const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const auth = require('../middleware/auth.middleware');

// Création d'un compte admin
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Vérifier si un admin existe déjà
    const adminExists = await Admin.findOne({ where: { email } });
    if (adminExists) {
      return res.status(400).json({ message: 'Un administrateur avec cet email existe déjà.' });
    }

    const admin = await Admin.create({ email, password, name });
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connexion admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ admin, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Récupérer le profil de l'admin connecté
router.get('/profile', auth, async (req, res) => {
  res.json(req.admin);
});

module.exports = router; 