# Guide de Connexion Admin avec Firebase

## ✅ Ce qui a été fait

1. **Fichiers créés** :
   - `lib/firebase-auth.ts` - Fonctions d'authentification Firebase
   - Mise à jour de `app/admin/login/page.tsx` - Page de connexion avec Firebase Auth
   - Mise à jour de `app/admin/dashboard/page.tsx` - Dashboard avec Firebase Auth

2. **Fonctions d'authentification disponibles** :
   - `signInAdmin(email, password)` - Connexion admin
   - `signOutAdmin()` - Déconnexion
   - `getCurrentUser()` - Obtenir l'utilisateur actuel
   - `onAuthStateChange(callback)` - Écouter les changements d'authentification

## 📋 Ce que vous devez faire côté Firebase Console

### 1. Vérifier que Firebase Authentication est activé

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `lagenceyl-f58cb`
3. Allez dans **Authentication** → **Sign-in method**
4. Vérifiez que **Email/Password** est activé :
   - Si ce n'est pas le cas, cliquez sur "Email/Password"
   - Activez "Enable"
   - Cliquez sur "Save"

### 2. Créer un utilisateur admin (si pas déjà fait)

1. Dans **Authentication** → **Users**
2. Cliquez sur **"Add user"**
3. Entrez :
   - **Email** : L'email que vous souhaitez utiliser pour l'admin (ex: admin@lagenceyl.fr)
   - **Password** : Un mot de passe sécurisé
4. Cliquez sur **"Add user"**
5. **Notez ces identifiants** - vous en aurez besoin pour vous connecter

### 3. Tester la connexion

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur `http://localhost:3000/admin/login`

3. Entrez les identifiants que vous avez créés dans Firebase

4. Vous devriez être redirigé vers `/admin/dashboard`

## 🔒 Sécurité

Les règles Firestore que vous avez configurées vérifient `request.auth != null` pour les opérations d'écriture. Cela signifie que seuls les utilisateurs authentifiés (via Firebase Auth) peuvent créer/modifier/supprimer des données.

## ⚠️ Notes importantes

- **L'authentification Firebase est maintenant fonctionnelle** pour l'espace admin
- Les identifiants doivent être créés dans Firebase Console (pas dans Supabase)
- Si vous avez déjà créé un utilisateur dans Firebase, utilisez ces identifiants
- Si vous n'avez pas encore créé d'utilisateur, suivez les étapes ci-dessus

## 🐛 Dépannage

### Erreur "auth/user-not-found"
- Vérifiez que l'utilisateur existe dans Firebase Authentication → Users
- Vérifiez que l'email est correct

### Erreur "auth/wrong-password"
- Vérifiez que le mot de passe est correct
- Si nécessaire, réinitialisez le mot de passe dans Firebase Console

### Erreur "auth/invalid-email"
- Vérifiez le format de l'email

### La connexion fonctionne mais le dashboard redirige vers login
- Vérifiez que les règles Firestore sont correctement configurées
- Vérifiez la console du navigateur pour les erreurs
