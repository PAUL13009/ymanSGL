# Configuration Firebase - Guide Complet

## ✅ Vérification de la Configuration

La configuration Firebase est correctement connectée avec les identifiants suivants :
- **Project ID**: `lagenceyl-f58cb`
- **API Key**: Configurée dans `lib/firebase-config.ts`
- **Firestore**: Initialisé dans `lib/firebase.ts`

## 📋 Ce que vous devez faire côté Firebase Console

### 1. Créer les Collections Firestore

Allez sur [Firebase Console](https://console.firebase.google.com/) → Votre projet → Firestore Database

Créez les collections suivantes :

#### Collection: `properties`
Cette collection stocke toutes les annonces immobilières.

**Structure d'un document :**
```json
{
  "title": "string",
  "location": "string",
  "price": "string",
  "status": "string (À vendre ou À louer)",
  "description": "string (optionnel)",
  "surface_habitable": "string (optionnel)",
  "surface_totale": "string (optionnel)",
  "rooms": "string (optionnel)",
  "bathrooms": "string (optionnel)",
  "images": [
    {
      "src": "string (URL de l'image)",
      "alt": "string (texte alternatif)"
    }
  ],
  "parking": boolean,
  "terrasse": boolean,
  "piscine": boolean,
  "ascenseur": boolean,
  "cave": boolean,
  "jardin": boolean,
  "balcon": boolean,
  "garage": boolean,
  "climatisation": boolean,
  "interphone": boolean,
  "local_velo": boolean,
  "internet": boolean,
  "digicode": boolean,
  "fibre_optique": boolean,
  "gardien": boolean,
  "autres_prestations": "string (optionnel)",
  "consommation_energetique": "string (optionnel)",
  "emissions_ges": "string (optionnel)",
  "created_at": timestamp,
  "updated_at": timestamp
}
```

**Index requis :**
- Créez un index composite sur `created_at` (descending) pour les requêtes de tri

#### Collection: `contact_messages`
Cette collection stocke les messages du formulaire de contact.

**Structure d'un document :**
```json
{
  "nom": "string",
  "prenom": "string (optionnel)",
  "email": "string",
  "telephone": "string (optionnel)",
  "pays": "string (optionnel)",
  "projet": "string (optionnel)",
  "contact_method": "string",
  "message": "string (optionnel)",
  "read": boolean (défaut: false),
  "created_at": timestamp
}
```

**Index requis :**
- Créez un index composite sur `created_at` (descending)

#### Collection: `analyse_leads`
Cette collection stocke les demandes d'analyse et d'estimation.

**Structure d'un document :**
```json
{
  "localisation": "string (optionnel)",
  "type_bien": "string (optionnel)",
  "maturite": "string (optionnel)",
  "ajustement_prix": "string (optionnel)",
  "motivation": "string (optionnel)",
  "prenom": "string (optionnel)",
  "telephone": "string (optionnel)",
  "email": "string (optionnel)",
  "type_demande": "string (analyse ou estimation)",
  "read": boolean (défaut: false),
  "status": "string (nouveau, en_cours, accepte, refuse)",
  "notes": "string (optionnel)",
  "created_at": timestamp
}
```

**Index requis :**
- Créez un index composite sur `type_demande` et `created_at` (descending)

### 2. Configurer les Règles de Sécurité Firestore

Allez dans Firestore Database → Règles et configurez les règles suivantes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les propriétés - Lecture publique, écriture admin uniquement
    match /properties/{propertyId} {
      allow read: if true; // Tout le monde peut lire les propriétés
      allow write: if request.auth != null; // Seuls les utilisateurs authentifiés peuvent écrire
    }
    
    // Règles pour les messages de contact - Lecture admin uniquement, écriture publique
    match /contact_messages/{messageId} {
      allow read: if request.auth != null; // Seuls les utilisateurs authentifiés peuvent lire
      allow create: if true; // Tout le monde peut créer des messages
      allow update, delete: if request.auth != null; // Seuls les utilisateurs authentifiés peuvent modifier/supprimer
    }
    
    // Règles pour les leads d'analyse - Lecture admin uniquement, écriture publique
    match /analyse_leads/{leadId} {
      allow read: if request.auth != null; // Seuls les utilisateurs authentifiés peuvent lire
      allow create: if true; // Tout le monde peut créer des leads
      allow update, delete: if request.auth != null; // Seuls les utilisateurs authentifiés peuvent modifier/supprimer
    }
  }
}
```

**⚠️ IMPORTANT :** Pour l'instant, ces règles permettent l'écriture sans authentification pour les propriétés. Une fois l'authentification Firebase configurée, vous devrez mettre à jour ces règles.

### 3. Configurer Firebase Authentication (pour l'espace admin)

Allez dans Authentication → Sign-in method et activez :

1. **Email/Password** : Activez cette méthode pour permettre la connexion admin
2. Créez un utilisateur admin :
   - Cliquez sur "Add user"
   - Entrez l'email et le mot de passe
   - Notez ces identifiants pour la connexion admin

### 4. Configurer Firebase Storage (pour les images)

Allez dans Storage et créez un bucket si ce n'est pas déjà fait.

**Règles de sécurité Storage :**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true; // Tout le monde peut lire les images
      allow write: if request.auth != null; // Seuls les utilisateurs authentifiés peuvent uploader
    }
  }
}
```

### 5. Créer les Index Firestore

Firebase vous demandera automatiquement de créer les index nécessaires lors de la première utilisation. Cliquez sur les liens d'erreur pour créer les index manquants.

## 🔧 Fichiers Créés pour Firebase

1. **`lib/firebase-config.ts`** : Configuration Firebase
2. **`lib/firebase.ts`** : Initialisation Firebase
3. **`lib/firebase-properties.ts`** : Fonctions pour gérer les propriétés (lecture publique)
4. **`lib/firebase-admin.ts`** : Fonctions pour l'espace admin (CRUD complet)

## 📝 Prochaines Étapes

1. ✅ Créer les collections dans Firestore
2. ✅ Configurer les règles de sécurité
3. ✅ Configurer l'authentification Firebase
4. ⚠️ Mettre à jour les fichiers admin pour utiliser Firebase (en cours)
5. ⚠️ Mettre à jour les formulaires pour envoyer vers Firebase (en cours)

## 🚨 Notes Importantes

- Les fichiers admin (`app/admin/dashboard/page.tsx`, `app/admin/login/page.tsx`) utilisent encore Supabase pour l'authentification. Ils doivent être migrés vers Firebase Authentication.
- Les formulaires de contact et d'estimation doivent être mis à jour pour utiliser les fonctions Firebase créées dans `lib/firebase-admin.ts`.
