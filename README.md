# 🕰️ API Montres avec Supabase

Bienvenue sur l'API Montres ! Cette API vous permet de gérer une collection de montres avec persistance des données grâce à Supabase (PostgreSQL).

---

## 🚀 Fonctionnalités

- ✅ Ajouter une montre avec toutes ses caractéristiques
- ✅ Lister toutes les montres
- ✅ Récupérer, modifier et supprimer une montre par id
- ✅ **Persistance des données avec Supabase**
- ✅ Hébergement facile (Render, Railway, etc.)

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

## 🔧 Configuration Supabase

### 1. Créer un projet Supabase

1. Va sur [supabase.com](https://supabase.com)
2. Crée un compte et un nouveau projet
3. Note ton **URL** et ta **clé anon**

### 2. Créer la table

1. Va dans l'éditeur SQL de Supabase
2. Copie et exécute le contenu de `database/schema.sql`

### 3. Configurer les variables d'environnement

1. Copie `env.example` vers `.env`
2. Remplace les valeurs par tes vraies données Supabase :

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3000
```

---

## 🔧 Installation & Lancement

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Configurer Supabase** (voir section ci-dessus)

3. **Lancer le serveur**
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
2. **Configurer Supabase** (voir section Configuration)
3. **Lancer le serveur**
4. **Utiliser les requêtes POST, GET, PUT, DELETE**

---

## ☁️ Héberger sur Render

1. Crée un compte sur [Render.com](https://render.com/)
2. Connecte ton dépôt GitHub
3. Déploie ton projet Node.js
4. **Ajoute les variables d'environnement Supabase** dans les paramètres Render :
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Ton API sera accessible en ligne !

---

## 📝 Fichiers importants

- `index.js` - API principale
- `config/supabase.js` - Configuration Supabase
- `database/schema.sql` - Structure de la base de données
- `env.example` - Exemple de variables d'environnement
- `postman_collection.json` - Collection Postman

---

## 💡 Avantages de Supabase

- ✅ **Persistance permanente** des données
- ✅ **Base de données PostgreSQL** robuste
- ✅ **Gratuit** jusqu'à 500MB
- ✅ **Interface web** pour gérer les données
- ✅ **API REST automatique**
- ✅ **Authentification** intégrée (si besoin)

---

**Besoin d'aide ou d'une fonctionnalité en plus ?**

> Ouvre une issue ou contacte le développeur !
