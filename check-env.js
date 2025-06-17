#!/usr/bin/env node

console.log('🔍 Vérification des variables d\'environnement...\n');

const requiredVars = {
  'NODE_ENV': process.env.NODE_ENV,
  'DATABASE_URL': process.env.DATABASE_URL,
  'JWT_SECRET': process.env.JWT_SECRET
};

const optionalVars = {
  'PORT': process.env.PORT || '3000 (défaut)',
  'DB_HOST': process.env.DB_HOST,
  'DB_PORT': process.env.DB_PORT,
  'DB_USER': process.env.DB_USER,
  'DB_NAME': process.env.DB_NAME
};

console.log('=== Variables requises ===');
let hasErrors = false;

Object.entries(requiredVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${key === 'DATABASE_URL' ? 'Définie' : value}`);
  } else {
    console.log(`❌ ${key}: NON DÉFINIE`);
    hasErrors = true;
  }
});

console.log('\n=== Variables optionnelles ===');
Object.entries(optionalVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${value}`);
  } else {
    console.log(`⚠️  ${key}: Non définie (utilisera les valeurs par défaut)`);
  }
});

console.log('\n=== Environnement ===');
console.log(`Mode: ${process.env.NODE_ENV === 'production' ? 'Production' : 'Développement'}`);

if (process.env.NODE_ENV === 'production') {
  if (!process.env.DATABASE_URL) {
    console.log('\n❌ ERREUR CRITIQUE: DATABASE_URL manquante en production!');
    console.log('Actions requises:');
    console.log('1. Créer une base de données MySQL dans Railway');
    console.log('2. Vérifier que DATABASE_URL est configurée automatiquement');
    console.log('3. Redéployer l\'application');
    process.exit(1);
  }
}

if (hasErrors) {
  console.log('\n❌ Des variables d\'environnement requises sont manquantes!');
  process.exit(1);
} else {
  console.log('\n✅ Toutes les variables d\'environnement sont correctement configurées!');
} 