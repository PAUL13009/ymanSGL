# Configuration Firebase

Ce projet utilise Firebase Firestore pour stocker les données des propriétés immobilières.

## Configuration

Les informations de connexion Firebase sont configurées dans `lib/firebase-config.ts`.

## Structure des données

### Collection: `properties`

Chaque document dans la collection `properties` contient les champs suivants :

```typescript
{
  id: string
  title: string
  location: string
  price: string
  surface?: string
  surface_habitable?: string
  surface_totale?: string
  rooms?: string
  bathrooms?: string
  type?: string
  status?: string
  description?: string
  images: Array<{ src: string; alt: string }>
  parking?: boolean
  terrasse?: boolean
  piscine?: boolean
  ascenseur?: boolean
  cave?: boolean
  jardin?: boolean
  balcon?: boolean
  garage?: boolean
  climatisation?: boolean
  interphone?: boolean
  local_velo?: boolean
  internet?: boolean
  digicode?: boolean
  fibre_optique?: boolean
  gardien?: boolean
  autres_prestations?: string
  consommation_energetique?: string
  emissions_ges?: string
  created_at: Timestamp
}
```

## Utilisation

Les fonctions utilitaires sont disponibles dans `lib/firebase-properties.ts` :

- `getAllProperties()` : Récupère tous les biens
- `getPropertyById(id)` : Récupère un bien par son ID
- `getFilteredProperties(filters)` : Récupère les biens avec filtres
- `getLimitedProperties(limit)` : Récupère un nombre limité de biens

## Installation

```bash
npm install firebase
```

## Migration depuis Supabase

La migration depuis Supabase vers Firebase a été effectuée. Les fichiers suivants ont été mis à jour :

- `app/page.tsx`
- `app/catalogue/page.tsx`
- `app/properties/[id]/page.tsx`
- `components/Gallery.tsx`

Les fichiers Supabase ont été supprimés et remplacés par les fichiers Firebase correspondants.
