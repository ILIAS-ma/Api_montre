const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

// Configuration pour Railway
let databaseConfig;

if (isProd) {
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
} else {
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

const sequelize = new Sequelize(databaseConfig);

module.exports = sequelize;
