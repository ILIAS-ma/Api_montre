const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

console.log('=== Configuration Database ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('isProd:', isProd);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

let sequelize;

if (isProd && process.env.DATABASE_URL) {
  console.log('✅ Utilisation de DATABASE_URL pour Railway');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else if (isProd && !process.env.DATABASE_URL) {
  console.error('❌ ERREUR: DATABASE_URL non définie en production!');
  throw new Error('DATABASE_URL is required in production environment');
} else {
  console.log('🔧 Mode développement - utilisation des variables locales');
  sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'watch_store',
    dialect: 'mysql',
    logging: false,
  });
}

console.log('Configuration finale:', {
  dialect: sequelize.getDialect(),
  host: sequelize.config.host || 'from DATABASE_URL',
  port: sequelize.config.port || 'from DATABASE_URL',
  database: sequelize.config.database || 'from DATABASE_URL'
});

module.exports = sequelize;