# API Boutique de Montres

API RESTful pour une boutique de montres avec système d'administration.

## Fonctionnalités

- Authentification administrateur
- Gestion des montres (CRUD)
- Sécurisation des routes admin
- Stockage des données dans MongoDB

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

## Installation

1. Cloner le repository
2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/watch-store
JWT_SECRET=votre_secret_jwt_super_securise
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

4. Démarrer le serveur :

```bash
npm run dev
```

## Routes API

### Authentification

- `POST /api/auth/register` - Créer un compte admin
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/profile` - Profil admin (protégé)

### Montres

- `GET /api/watches` - Liste toutes les montres
- `GET /api/watches/:id` - Détails d'une montre
- `POST /api/watches` - Créer une montre (admin)
- `PUT /api/watches/:id` - Mettre à jour une montre (admin)
- `DELETE /api/watches/:id` - Supprimer une montre (admin)

## Structure des données

### Montre

```json
{
  "name": "Nom de la montre",
  "brand": "Marque",
  "description": "Description détaillée",
  "price": 999.99,
  "quantity": 10,
  "size": 42,
  "movement": "Automatique",
  "material": "Acier inoxydable",
  "waterResistance": 100,
  "images": ["url1", "url2"]
}
```

### Admin

```json
{
  "email": "admin@example.com",
  "password": "motdepasse",
  "name": "Nom Admin"
}
```

## Sécurité

- Les routes admin sont protégées par JWT
- Les mots de passe sont hashés avec bcrypt
- Validation des données avec mongoose
- Protection CORS
