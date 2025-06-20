# Guide de Déploiement sur Render

## Prérequis

- Compte Render.com
- Code source sur GitHub/GitLab

## Étapes de déploiement

### 1. Configuration sur Render

1. Connectez-vous à votre compte Render
2. Cliquez sur "New +" puis "Web Service"
3. Connectez votre repository GitHub/GitLab
4. Sélectionnez le repository contenant votre API

### 2. Configuration du service

- **Name**: `watch-store-api` (ou le nom de votre choix)
- **Environment**: `Node`
- **Region**: Choisissez la région la plus proche
- **Branch**: `main` (ou votre branche principale)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Variables d'environnement

Ajoutez ces variables d'environnement dans Render :

```
NODE_ENV=production
JWT_SECRET=votre_clé_secrète_très_longue_et_complexe
```

### 4. Base de données PostgreSQL

1. Créez un nouveau service PostgreSQL sur Render
2. Notez l'URL de connexion fournie
3. Ajoutez cette URL comme variable d'environnement :
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

### 5. Déploiement

1. Cliquez sur "Create Web Service"
2. Render va automatiquement déployer votre application
3. Surveillez les logs pour détecter d'éventuelles erreurs

## Vérification du déploiement

Une fois déployé, testez ces endpoints :

- `https://votre-app.onrender.com/` - Page d'accueil
- `https://votre-app.onrender.com/health` - Vérification de santé
- `https://votre-app.onrender.com/api/watches` - API des montres

## Dépannage

### Erreurs courantes

1. **DATABASE_URL manquante**

   - Vérifiez que la variable d'environnement est bien configurée
   - Assurez-vous que la base de données PostgreSQL est créée

2. **Erreur de connexion à la base de données**

   - Vérifiez que la base de données est active
   - Contrôlez les paramètres de connexion

3. **Erreur de build**
   - Vérifiez que `package.json` est correct
   - Contrôlez les dépendances

### Logs

Consultez les logs dans l'interface Render pour diagnostiquer les problèmes :

- Logs de build
- Logs d'exécution
- Logs de base de données

## Variables d'environnement de développement

Pour le développement local, créez un fichier `.env` :

```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=watch_store
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
JWT_SECRET=votre_clé_secrète
PORT=3000
```
