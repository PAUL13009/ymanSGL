# Règles Firebase Exactes pour la Publication des Annonces

## 📋 Vue d'ensemble

Pour que la publication des annonces fonctionne, vous devez configurer **deux types de règles** dans Firebase :

1. **Règles Firestore** : Pour stocker les données des annonces
2. **Règles Firebase Storage** : Pour uploader les images des annonces

## 🔥 1. Règles Firestore (pour les données)

### Où configurer ?
Firebase Console → Votre projet → **Firestore Database** → **Règles**

### Règles exactes à copier-coller :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection des propriétés (annonces)
    match /properties/{propertyId} {
      // Lecture : Tout le monde peut lire les annonces (pour affichage sur le site)
      allow read: if true;
      
      // Écriture : Seuls les utilisateurs authentifiés peuvent créer/modifier/supprimer
      allow create, update, delete: if request.auth != null;
    }
    
    // Collection des messages de contact
    match /contact_messages/{messageId} {
      // Lecture : Seuls les admins (utilisateurs authentifiés) peuvent lire
      allow read: if request.auth != null;
      
      // Création : Tout le monde peut créer des messages (formulaire de contact)
      allow create: if true;
      
      // Modification/Suppression : Seuls les admins peuvent modifier/supprimer
      allow update, delete: if request.auth != null;
    }
    
    // Collection des leads d'analyse
    match /analyse_leads/{leadId} {
      // Lecture : Seuls les admins peuvent lire
      allow read: if request.auth != null;
      
      // Création : Tout le monde peut créer des leads (formulaire d'analyse)
      allow create: if true;
      
      // Modification/Suppression : Seuls les admins peuvent modifier/supprimer
      allow update, delete: if request.auth != null;
    }
  }
}
```

### Étapes pour appliquer :

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `lagenceyl-f58cb`
3. Cliquez sur **Firestore Database** dans le menu de gauche
4. Cliquez sur l'onglet **Règles**
5. Copiez-collez les règles ci-dessus
6. Cliquez sur **Publier**

### ✅ Vérification :

Après avoir publié les règles, vous devriez voir :
- ✅ "Règles publiées avec succès"
- ✅ Les règles affichées dans l'éditeur

---

## 📦 2. Règles Firebase Storage (pour les images)

### Où configurer ?
Firebase Console → Votre projet → **Storage** → **Règles**

### Règles exactes à copier-coller :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Dossier des images de propriétés
    match /properties/{allPaths=**} {
      // Lecture : Tout le monde peut lire les images (pour affichage sur le site)
      allow read: if true;
      
      // Écriture : Seuls les utilisateurs authentifiés peuvent uploader
      allow write: if request.auth != null;
    }
  }
}
```

### Étapes pour appliquer :

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `lagenceyl-f58cb`
3. Cliquez sur **Storage** dans le menu de gauche
4. Si Storage n'est pas encore activé :
   - Cliquez sur **Commencer**
   - Choisissez un emplacement (ex: `europe-west1` ou `us-central1`)
   - Cliquez sur **Terminé**
5. Cliquez sur l'onglet **Règles**
6. Copiez-collez les règles ci-dessus
7. Cliquez sur **Publier**

### ✅ Vérification :

Après avoir publié les règles, vous devriez voir :
- ✅ "Règles publiées avec succès"
- ✅ Les règles affichées dans l'éditeur

---

## 🔐 3. Vérifier l'Authentification Firebase

### Où configurer ?
Firebase Console → Votre projet → **Authentication** → **Sign-in method**

### Étapes :

1. Allez sur **Authentication** dans le menu de gauche
2. Cliquez sur l'onglet **Sign-in method**
3. Vérifiez que **Email/Password** est activé :
   - Si ce n'est pas le cas, cliquez sur **Email/Password**
   - Activez **Enable**
   - Cliquez sur **Save**

### Créer un utilisateur admin :

1. Allez sur l'onglet **Users**
2. Cliquez sur **Add user**
3. Entrez :
   - **Email** : Votre email admin (ex: `admin@lagenceyl.fr`)
   - **Password** : Un mot de passe sécurisé
4. Cliquez sur **Add user**
5. **Notez ces identifiants** - vous en aurez besoin pour vous connecter

---

## 📊 4. Créer la Collection Firestore

### Où configurer ?
Firebase Console → Votre projet → **Firestore Database** → **Données**

### Étapes :

1. Allez sur **Firestore Database** → **Données**
2. Si la collection `properties` n'existe pas encore :
   - Cliquez sur **Démarrer la collection**
   - **ID de collection** : `properties`
   - Cliquez sur **Suivant**
   - **Champ** : `title` (type: string)
   - Cliquez sur **Enregistrer**
   - La collection est créée (vous pouvez ajouter des documents manuellement ou les laisser être créés automatiquement par le code)

### ⚠️ Important :

Vous n'avez pas besoin de créer tous les champs manuellement. Le code créera automatiquement les documents avec tous les champs nécessaires lors de la publication d'une annonce.

---

## 🔍 5. Créer l'Index Firestore (optionnel mais recommandé)

### Pourquoi ?

L'index permet de trier les annonces par date de création (les plus récentes en premier).

### Étapes :

1. Allez sur **Firestore Database** → **Index**
2. Cliquez sur **Créer un index**
3. Configurez :
   - **Collection ID** : `properties`
   - **Champs à indexer** :
     - `created_at` : **Ordre décroissant** (Descending)
   - **Mode de requête** : Collection
4. Cliquez sur **Créer**

### ⚠️ Note :

Si vous ne créez pas l'index maintenant, Firebase vous proposera automatiquement de le créer lors de la première requête. Cliquez simplement sur le lien dans l'erreur pour créer l'index.

---

## ✅ Checklist Complète

Avant de publier une annonce, vérifiez que :

- [ ] **Firestore Database** est activé
- [ ] Les **règles Firestore** sont configurées (voir section 1)
- [ ] La collection `properties` existe (ou sera créée automatiquement)
- [ ] L'index `created_at` est créé (ou sera créé automatiquement)
- [ ] **Firebase Storage** est activé
- [ ] Les **règles Storage** sont configurées (voir section 2)
- [ ] **Firebase Authentication** est activé
- [ ] **Email/Password** est activé dans Authentication
- [ ] Un **utilisateur admin** est créé dans Authentication

---

## 🧪 Test de Fonctionnement

Une fois tout configuré :

1. **Connectez-vous** sur `/admin/login` avec vos identifiants admin
2. Allez sur le **dashboard** (`/admin/dashboard`)
3. Cliquez sur **"Ajouter un bien"**
4. Remplissez le formulaire :
   - Titre : "Test annonce"
   - Prix : "100 000"
   - Localisation : "Saint-Germain-en-Laye"
   - Ajoutez une photo (optionnel)
5. Cliquez sur **"Publier"**

### Résultats attendus :

- ✅ Message "Annonce publiée avec succès !"
- ✅ L'annonce apparaît dans la liste du dashboard
- ✅ L'annonce apparaît dans Firebase Console → Firestore → `properties`
- ✅ Si vous avez ajouté une photo, elle apparaît dans Firebase Console → Storage → `properties`

---

## 🐛 Problèmes Courants

### Erreur : "permission-denied"

**Cause** : Les règles Firestore ou Storage ne sont pas correctement configurées

**Solution** :
1. Vérifiez que vous êtes connecté (`/admin/login`)
2. Vérifiez que les règles contiennent bien `request.auth != null` pour l'écriture
3. Vérifiez que vous avez bien cliqué sur **Publier** après avoir modifié les règles

### Erreur : "storage/unauthorized"

**Cause** : Les règles Storage ne permettent pas l'upload

**Solution** :
1. Vérifiez les règles Storage (voir section 2)
2. Vérifiez que vous êtes connecté
3. Vérifiez que Firebase Storage est activé

### Erreur : "failed-precondition" (index manquant)

**Cause** : L'index Firestore n'existe pas encore

**Solution** :
1. Cliquez sur le lien dans l'erreur pour créer l'index automatiquement
2. Ou créez l'index manuellement (voir section 5)
3. Attendez quelques minutes que l'index soit créé
4. Réessayez

---

## 📞 Support

Si vous rencontrez toujours des problèmes après avoir suivi ce guide :

1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs affichées
3. Vérifiez que toutes les étapes de la checklist sont complétées
4. Vérifiez que vous êtes bien connecté dans l'espace admin

Les règles ci-dessus sont les règles exactes nécessaires pour que la publication des annonces fonctionne correctement.
