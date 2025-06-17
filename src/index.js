const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
  

const authRoutes = require('./routes/auth.routes');
const watchRoutes = require('./routes/watch.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/watches', watchRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue!' });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('=== Configuration de la base de données ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    if (process.env.NODE_ENV === 'production') {
      console.log('Mode production détecté');
    } else {
      console.log('Mode développement détecté');
      console.log('DB_HOST:', process.env.DB_HOST);
      console.log('DB_PORT:', process.env.DB_PORT);
      console.log('DB_NAME:', process.env.DB_NAME);
    }

    console.log('Tentative de connexion à la base de données...');
    await sequelize.authenticate();
    console.log('✅ Connexion à la base réussie');

    console.log('Synchronisation de la base de données...');
    await sequelize.sync({ alter: true });
    console.log('✅ Base de données synchronisée');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors de la connexion ou synchronisation DB:', error);
    console.error('Détails de l\'erreur:', {
      name: error.name,
      message: error.message,
      code: error.code,
      errno: error.errno
    });
    
    // En cas d'erreur de connexion, arrêter le processus
    if (error.name === 'SequelizeConnectionRefusedError' || 
        error.name === 'SequelizeConnectionError') {
      console.error('❌ Impossible de se connecter à la base de données. Arrêt du serveur.');
      process.exit(1);
    }
  }
}

startServer();
