# 🕰️ API Montres

Bienvenue sur l'API Montres ! Cette API vous permet de gérer une collection de montres avec toutes les informations essentielles : prix, description, taille, images, stock et modèle.

---

## 🚀 Fonctionnalités

- Ajouter une montre avec toutes ses caractéristiques
- Lister toutes les montres
- **Récupérer, modifier et supprimer une montre par id**
- Hébergement facile (Render, Railway, etc.)

---

## 📦 Structure d'une montre

Chaque montre possède les champs suivants :

- **prix** _(number)_ : Prix de la montre
- **description** _(string)_ : Description détaillée
- **taille_mm** _(number)_ : Taille en millimètres
- **image_principale** _(string, URL)_ : Image principale
- **images_secondaires** _(array de 5 URLs)_ : 5 images secondaires
- **stock** _(number)_ : Quantité disponible
- **modele** _(string)_ : Nom du modèle

---

## 🔧 Installation & Lancement

1. **Installer les dépendances**
   ```bash
   npm install
   ```
2. **Lancer le serveur**
   ```bash
   node index.js
   ```
   L'API sera disponible sur [http://localhost:3000](http://localhost:3000)

---

## 📬 Endpoints

### ➕ Ajouter une montre

- **POST** `/watches`
- **Body (JSON)** :

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

### 📖 Lister les montres

- **GET** `/watches`
- **Réponse** : Tableau de montres

### 🔍 Récupérer une montre par id

- **GET** `/watches/:id`
- **Exemple** : `/watches/1`

### ✏️ Modifier une montre

- **PUT** `/watches/:id`
- **Body (JSON)** : (tous les champs sont obligatoires)

```json
{
  "prix": 249.99,
  "description": "Montre sport mise à jour.",
  "taille_mm": 44,
  "image_principale": "https://exemple.com/nouvelle-image.jpg",
  "images_secondaires": [
    "https://exemple.com/image2.jpg",
    "https://exemple.com/image3.jpg",
    "https://exemple.com/image4.jpg",
    "https://exemple.com/image5.jpg",
    "https://exemple.com/image6.jpg"
  ],
  "stock": 8,
  "modele": "Sport Edition"
}
```

### 🗑️ Supprimer une montre

- **DELETE** `/watches/:id`
- **Exemple** : `/watches/1`

---

## 🧪 Tester avec Postman

1. **Importer la collection** : `postman_collection.json`
2. **Lancer le serveur**
3. **Utiliser les requêtes POST, GET, PUT, DELETE**

---

## ☁️ Héberger sur Render

1. Crée un compte sur [Render.com](https://render.com/)
2. Connecte ton dépôt GitHub
3. Déploie ton projet Node.js
4. Mets à jour le port dans `index.js` :
   ```js
   const port = process.env.PORT || 3000;
   ```
5. Ton API sera accessible en ligne !

---

## 📝 Exemple de .gitignore

```
node_modules
.env
npm-debug.log
.DS_Store
```

---

## 💡 Remarques

- Les données sont stockées en mémoire (elles disparaissent à chaque redémarrage du serveur).
- Pour une persistance réelle, connecte une base de données (MongoDB, PostgreSQL, etc.).

---

**Besoin d'aide ou d'une fonctionnalité en plus ?**

> Ouvre une issue ou contacte le développeur !
