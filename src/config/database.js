const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

console.log('=== Configuration Database ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('isProd:', isProd);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

// Configuration pour Railway
let databaseConfig;

if (isProd && process.env.DATABASE_URL) {
  console.log('✅ Utilisation de DATABASE_URL pour Railway');
  // En production (Railway), utiliser DATABASE_URL
  databaseConfig = {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  };
} else if (isProd && !process.env.DATABASE_URL) {
  console.error('❌ ERREUR: DATABASE_URL non définie en production!');
  console.error('Veuillez configurer DATABASE_URL dans les variables d\'environnement Railway');
  throw new Error('DATABASE_URL is required in production environment');
} else {
  console.log('🔧 Mode développement - utilisation des variables locales');
  // En développement local
  databaseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'watch_store',
    dialect: 'mysql',
    logging: false,
  };
}

console.log('Configuration finale:', {
  dialect: databaseConfig.dialect,
  host: databaseConfig.host || 'from DATABASE_URL',
  port: databaseConfig.port || 'from DATABASE_URL',
  database: databaseConfig.database || 'from DATABASE_URL'
});

const sequelize = new Sequelize(databaseConfig);

module.exports = sequelize;
