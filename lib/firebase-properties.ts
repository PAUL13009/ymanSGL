import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  orderBy, 
  where,
  QueryConstraint,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

export interface PropertyImage {
  src: string
  alt: string
}

export interface Property {
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
  images: PropertyImage[]
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
  created_at?: Date | Timestamp
}

// Convertir les données Firestore en objet Property
const convertFirestoreProperty = (doc: any): Property => {
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    created_at: data.created_at?.toDate ? data.created_at.toDate() : data.created_at
  } as Property
}

// Récupérer tous les biens
export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const propertiesRef = collection(db, 'properties')
    const q = query(propertiesRef, orderBy('created_at', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertFirestoreProperty(doc))
  } catch (error) {
    console.error('Error fetching properties:', error)
    throw error
  }
}

// Récupérer un bien par son ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const propertyRef = doc(db, 'properties', id)
    const propertySnap = await getDoc(propertyRef)
    
    if (propertySnap.exists()) {
      return convertFirestoreProperty(propertySnap)
    }
    return null
  } catch (error) {
    console.error('Error fetching property:', error)
    throw error
  }
}

// Récupérer les biens avec des filtres
export const getFilteredProperties = async (
  filters?: {
    status?: string
    minPrice?: number
    maxPrice?: number
    minSurface?: number
    minRooms?: number
    location?: string
  }
): Promise<Property[]> => {
  try {
    const propertiesRef = collection(db, 'properties')
    const constraints: QueryConstraint[] = []
    
    if (filters?.status) {
      constraints.push(where('status', '==', filters.status))
    }
    
    if (constraints.length > 0) {
      constraints.push(orderBy('created_at', 'desc'))
      const q = query(propertiesRef, ...constraints)
      const querySnapshot = await getDocs(q)
      let properties = querySnapshot.docs.map(doc => convertFirestoreProperty(doc))
      
      // Appliquer les filtres côté client pour les filtres complexes
      if (filters && (filters.minPrice || filters.maxPrice || filters.minSurface || filters.minRooms || filters.location)) {
        properties = properties.filter(property => {
          // Filtre par prix
          if (filters.minPrice || filters.maxPrice) {
            const priceStr = property.price || '0'
            const priceNum = parseInt(priceStr.replace(/[^\d]/g, '')) || 0
            if (filters.minPrice && priceNum < filters.minPrice) return false
            if (filters.maxPrice && priceNum > filters.maxPrice) return false
          }
          
          // Filtre par surface
          if (filters.minSurface) {
            const surface = parseInt(property.surface_habitable || property.surface || '0') || 0
            if (surface < filters.minSurface) return false
          }
          
          // Filtre par nombre de pièces
          if (filters.minRooms) {
            const rooms = parseInt(property.rooms || '0') || 0
            if (rooms < filters.minRooms) return false
          }
          
          // Filtre par localisation
          if (filters.location) {
            const location = (property.location || '').toLowerCase()
            if (!location.includes(filters.location.toLowerCase())) return false
          }
          
          return true
        })
      }
      
      return properties
    } else {
      // Pas de filtres, récupérer tous les biens
      const q = query(propertiesRef, orderBy('created_at', 'desc'))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => convertFirestoreProperty(doc))
    }
  } catch (error) {
    console.error('Error fetching filtered properties:', error)
    throw error
  }
}

// Récupérer un nombre limité de biens
export const getLimitedProperties = async (limit: number): Promise<Property[]> => {
  try {
    const propertiesRef = collection(db, 'properties')
    const q = query(propertiesRef, orderBy('created_at', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const properties = querySnapshot.docs
      .slice(0, limit)
      .map(doc => convertFirestoreProperty(doc))
    
    return properties
  } catch (error) {
    console.error('Error fetching limited properties:', error)
    throw error
  }
}
