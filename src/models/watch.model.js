const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Watch = sequelize.define('Watch', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Taille en millimètres',
    validate: {
      min: 0
    }
  },
  movement: {
    type: DataTypes.ENUM('Automatique', 'Quartz', 'Manuel'),
    allowNull: false
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false
  },
  waterResistance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Résistance à l\'eau en mètres'
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
}, {
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  tableName: 'watches'
});

module.exports = Watch; 