# Configuration Railway

## Variables d'environnement nécessaires

### Pour Railway (Production)

Railway utilise automatiquement la variable `DATABASE_URL` qui est configurée lors de la création de la base de données MySQL.

### Variables d'environnement requises :

- `DATABASE_URL` : URL de connexion MySQL (configurée automatiquement par Railway)
- `NODE_ENV` : Doit être défini à `production` sur Railway
- `JWT_SECRET` : Clé secrète pour les tokens JWT

## Configuration Railway

1. **Créer une base de données MySQL** :

   - Dans votre projet Railway, allez dans l'onglet "Variables"
   - Ajoutez une base de données MySQL depuis l'onglet "Database"
   - Railway configurera automatiquement `DATABASE_URL`

2. **Variables d'environnement** :

   ```
   NODE_ENV=production
   JWT_SECRET=votre_cle_secrete_jwt
   ```

3. **Déploiement** :
   - Railway détectera automatiquement le fichier `package.json`
   - Le script `start` sera utilisé pour démarrer l'application

## Résolution des problèmes

### Erreur ECONNREFUSED

Si vous obtenez une erreur `ECONNREFUSED ::1:3306` :

1. Vérifiez que la base de données MySQL est bien créée dans Railway
2. Vérifiez que `DATABASE_URL` est bien configurée
3. Vérifiez que `NODE_ENV=production` est défini

### Logs de débogage

L'application affiche maintenant des logs détaillés pour diagnostiquer les problèmes de connexion.
