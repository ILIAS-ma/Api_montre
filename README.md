# API Montres

Cette API permet de gérer des montres avec les champs suivants :

- prix
- description
- taille (en mm)
- image principale (URL)
- images secondaires (tableau de 5 URLs)
- stock (quantité disponible)
- modele (nom du modèle)

## Installation

```bash
npm install
```

## Lancement

```bash
node index.js
```

L'API sera disponible sur http://localhost:3000

## Endpoints

### Ajouter une montre

- **POST** `/watches`
- Body (JSON) :

```json
{
  "prix": 199.99,
  "description": "Montre élégante pour homme.",
  "taille_mm": 42,
  "image_principale": "https://exemple.com/image1.jpg",
  "images_secondaires": [
    "https://exemple.com/image2.jpg",
    "https://exemple.com/image3.jpg",
    "https://exemple.com/image4.jpg",
    "https://exemple.com/image5.jpg",
    "https://exemple.com/image6.jpg"
  ],
  "stock": 10,
  "modele": "Classic Silver"
}
```

### Lister les montres

- **GET** `/watches`

## Test avec Postman

1. Importez la collection fournie (voir fichier `postman_collection.json`).
2. Lancez le serveur avec `node index.js`.
3. Utilisez les requêtes de la collection pour tester l'API.
