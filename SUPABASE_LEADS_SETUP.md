# Configuration Supabase pour les Leads Entrants

## 📋 Ce qui a été fait côté code

1. ✅ **Table `analyse_leads` créée** - Script SQL disponible dans `supabase_analyse_leads_table.sql`
2. ✅ **Formulaire d'analyse mis à jour** - Enregistre automatiquement les données dans Supabase
3. ✅ **Dashboard admin mis à jour** - Nouvel onglet "Lead entrant" avec toutes les fonctionnalités

## 🔧 Ce que vous devez faire côté Supabase

### Étape 1 : Créer la table `analyse_leads`

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Copiez et exécutez le contenu du fichier `supabase_analyse_leads_table.sql`

Ce script va :
- Créer la table `analyse_leads` avec tous les champs nécessaires
- Configurer les index pour optimiser les performances
- Activer Row Level Security (RLS)
- Créer les politiques de sécurité (insertion publique, lecture/modification authentifiée uniquement)
- Créer un trigger pour mettre à jour automatiquement `updated_at`

### Étape 2 : Vérifier les politiques RLS

Les politiques suivantes doivent être actives :

- ✅ **Allow public insert** : Permet à n'importe qui d'insérer un lead (pour le formulaire)
- ✅ **Allow authenticated read** : Seuls les admins authentifiés peuvent lire les leads
- ✅ **Allow authenticated update** : Seuls les admins peuvent modifier les leads
- ✅ **Allow authenticated delete** : Seuls les admins peuvent supprimer les leads

### Étape 3 : Tester le formulaire

1. Remplissez le formulaire d'analyse sur `/analyse`
2. Vérifiez dans Supabase que les données sont bien enregistrées dans la table `analyse_leads`
3. Connectez-vous au dashboard admin et vérifiez l'onglet "Lead entrant"

## 📊 Structure de la table `analyse_leads`

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique (généré automatiquement) |
| `localisation` | TEXT | Où se situe le bien (Vauban, 6ᵉ, etc.) |
| `type_bien` | TEXT | Type de bien (Appartement, Maison, Autre) |
| `maturite` | TEXT | Stade du projet (3 mois, 6 mois, sans échéance) |
| `ajustement_prix` | TEXT | Réponse à la question clé sur l'ajustement du prix |
| `motivation` | TEXT | Raison principale de la vente |
| `prenom` | TEXT | Prénom du contact |
| `telephone` | TEXT | Téléphone du contact |
| `email` | TEXT | Email du contact |
| `read` | BOOLEAN | Si le lead a été lu (défaut: false) |
| `status` | TEXT | Statut du lead (nouveau, en_cours, accepte, refuse) |
| `notes` | TEXT | Notes internes sur le lead (optionnel) |
| `created_at` | TIMESTAMP | Date de création (générée automatiquement) |
| `updated_at` | TIMESTAMP | Date de mise à jour (générée automatiquement) |

## 🎯 Fonctionnalités du dashboard

Dans l'onglet "Lead entrant", vous pouvez :

- ✅ **Voir tous les leads** avec leurs informations complètes
- ✅ **Marquer comme lu/non lu** pour suivre les nouveaux leads
- ✅ **Changer le statut** : Nouveau → En cours → Accepté/Refusé
- ✅ **Ajouter des notes** pour chaque lead
- ✅ **Supprimer un lead** si nécessaire
- ✅ **Voir le nombre de leads non lus** dans le titre de l'onglet

## ⚠️ Important

- Les leads sont triés par date de création (plus récents en premier)
- Les leads non lus sont mis en évidence avec un fond bleu
- Le statut permet de suivre l'avancement de chaque lead
- Les notes sont utiles pour garder une trace des échanges avec chaque prospect


