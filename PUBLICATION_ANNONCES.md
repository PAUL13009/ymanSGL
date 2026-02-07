# Guide de Publication des Annonces

## ✅ Améliorations Apportées

Le code a été amélioré pour :
1. ✅ Vérifier l'authentification avant la publication
2. ✅ Valider les champs obligatoires (titre, prix, localisation)
3. ✅ Améliorer les messages d'erreur avec des détails précis
4. ✅ Valider les images (taille max 10MB, formats acceptés)
5. ✅ Ajouter des logs pour le débogage

## 🔧 Vérifications Nécessaires

### 1. Vérifier les Règles Firestore

Allez sur [Firebase Console](https://console.firebase.google.com/) → Votre projet → Firestore Database → Règles

Les règles doivent être :
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null; // IMPORTANT : Authentification requise
    }
  }
}
```

**⚠️ Si vous obtenez une erreur "permission-denied"**, vérifiez que :
- Vous êtes bien connecté dans l'espace admin
- Les règles Firestore autorisent l'écriture pour les utilisateurs authentifiés (`request.auth != null`)

### 2. Vérifier les Règles Firebase Storage

Allez sur Firebase Console → Storage → Règles

Les règles doivent être :
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // IMPORTANT : Authentification requise
    }
  }
}
```

**⚠️ Si vous obtenez une erreur "storage/unauthorized"**, vérifiez que :
- Vous êtes bien connecté dans l'espace admin
- Les règles Storage autorisent l'upload pour les utilisateurs authentifiés

### 3. Vérifier que Firebase Storage est Activé

1. Allez sur Firebase Console → Storage
2. Si vous voyez "Get started", cliquez dessus pour activer Storage
3. Choisissez un emplacement (ex: `europe-west1`)
4. Créez le bucket

### 4. Vérifier l'Authentification

1. Connectez-vous sur `/admin/login`
2. Vérifiez que vous êtes bien redirigé vers `/admin/dashboard`
3. Vérifiez dans la console du navigateur (F12) qu'il n'y a pas d'erreurs d'authentification

## 🐛 Résolution des Problèmes

### Erreur : "permission-denied"

**Cause** : Les règles Firestore ou Storage ne permettent pas l'écriture

**Solution** :
1. Vérifiez que vous êtes connecté (`/admin/login`)
2. Vérifiez les règles Firestore et Storage (voir ci-dessus)
3. Vérifiez que l'authentification Firebase est bien activée

### Erreur : "storage/unauthorized"

**Cause** : Les règles Storage ne permettent pas l'upload

**Solution** :
1. Vérifiez les règles Storage (voir ci-dessus)
2. Vérifiez que vous êtes connecté
3. Vérifiez que Firebase Storage est activé

### Erreur : "Vous devez être connecté pour publier une annonce"

**Cause** : La session a expiré

**Solution** :
1. Reconnectez-vous sur `/admin/login`
2. Réessayez de publier l'annonce

### Erreur : "L'image X est trop volumineuse"

**Cause** : L'image dépasse 10MB

**Solution** :
1. Réduisez la taille de l'image (utilisez un outil de compression)
2. Réessayez l'upload

### Erreur : "Le format de l'image X n'est pas supporté"

**Cause** : Format d'image non supporté

**Solution** :
1. Utilisez uniquement les formats : jpg, jpeg, png, webp, gif
2. Réessayez l'upload

### L'annonce ne s'affiche pas après publication

**Cause** : Problème de cache ou d'index Firestore

**Solution** :
1. Rafraîchissez la page du catalogue
2. Vérifiez dans Firebase Console → Firestore que l'annonce a bien été créée
3. Vérifiez que l'index `created_at` (descending) existe dans Firestore

## 📝 Processus de Publication

1. **Connectez-vous** sur `/admin/login`
2. **Allez sur le dashboard** (`/admin/dashboard`)
3. **Cliquez sur "Ajouter un bien"**
4. **Remplissez le formulaire** :
   - Titre * (obligatoire)
   - Prix * (obligatoire)
   - Localisation * (obligatoire)
   - Description (optionnel)
   - Caractéristiques (optionnel)
   - Prestations (optionnel)
   - Photos (optionnel mais recommandé)
5. **Cliquez sur "Publier"**
6. **Vérifiez** que l'annonce apparaît dans la liste

## 🔍 Logs de Débogage

Le code ajoute maintenant des logs dans la console pour vous aider à déboguer :

- `Publication de l'annonce...` : Début de la publication
- `Upload de X image(s)...` : Début de l'upload des images
- `Upload de l'image X/Y...` : Progression de l'upload
- `Image X uploadée avec succès` : Image uploadée
- `Annonce créée avec l'ID: ...` : Annonce créée avec succès

Ouvrez la console du navigateur (F12) pour voir ces logs.

## ✅ Checklist de Vérification

Avant de publier une annonce, vérifiez que :

- [ ] Vous êtes connecté sur `/admin/login`
- [ ] Les règles Firestore autorisent l'écriture pour les utilisateurs authentifiés
- [ ] Les règles Storage autorisent l'upload pour les utilisateurs authentifiés
- [ ] Firebase Storage est activé
- [ ] Les champs obligatoires sont remplis (titre, prix, localisation)
- [ ] Les images font moins de 10MB chacune
- [ ] Les images sont au format jpg, png, webp ou gif

## 🆘 Besoin d'Aide ?

Si vous rencontrez toujours des problèmes :

1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs affichées
3. Vérifiez les règles Firebase (Firestore et Storage)
4. Vérifiez que vous êtes bien connecté

Les messages d'erreur ont été améliorés pour être plus explicites et vous guider vers la solution.
