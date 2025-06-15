const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const watchRoutes = require('./routes/watch.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watches', watchRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue!' });
});

// Synchronisation de la base de données et démarrage du serveur
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Synchronise les modèles avec la base de données
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée avec succès');

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
}

startServer(); 