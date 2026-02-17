import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'

// ===== PROPRIÉTÉS =====

export interface PropertyData {
  title: string
  location: string
  price: string
  status?: string
  description?: string
  surface_habitable?: string
  surface_totale?: string
  rooms?: string
  bathrooms?: string
  images?: Array<{ src: string; alt: string }>
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
  updated_at?: Date | Timestamp
}

// Créer une propriété
export const createProperty = async (propertyData: PropertyData): Promise<string> => {
  try {
    console.log('Création de la propriété dans Firestore...', propertyData)
    
    const dataToSave = {
      ...propertyData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    }
    
    const docRef = await addDoc(collection(db, 'properties'), dataToSave)
    console.log('Propriété créée avec succès, ID:', docRef.id)
    return docRef.id
  } catch (error: any) {
    console.error('Error creating property:', error)
    
    // Améliorer les messages d'erreur
    if (error.code === 'permission-denied') {
      throw new Error('Permission refusée. Vérifiez que vous êtes connecté et que les règles Firestore autorisent l\'écriture.')
    } else if (error.code === 'unavailable') {
      throw new Error('Service temporairement indisponible. Veuillez réessayer plus tard.')
    } else if (error.message) {
      throw new Error(`Erreur lors de la création: ${error.message}`)
    }
    
    throw error
  }
}

// Mettre à jour une propriété
export const updateProperty = async (id: string, propertyData: Partial<PropertyData>): Promise<void> => {
  try {
    const propertyRef = doc(db, 'properties', id)
    const dataToUpdate = {
      ...propertyData,
      updated_at: serverTimestamp()
    }
    await updateDoc(propertyRef, dataToUpdate)
  } catch (error) {
    console.error('Error updating property:', error)
    throw error
  }
}

// Supprimer une propriété
export const deleteProperty = async (id: string): Promise<void> => {
  try {
    const propertyRef = doc(db, 'properties', id)
    await deleteDoc(propertyRef)
  } catch (error) {
    console.error('Error deleting property:', error)
    throw error
  }
}

// Récupérer toutes les propriétés (pour admin)
export const getAllPropertiesAdmin = async (): Promise<any[]> => {
  try {
    const propertiesRef = collection(db, 'properties')
    
    // Essayer avec orderBy, sinon récupérer sans tri
    let querySnapshot
    try {
      const q = query(propertiesRef, orderBy('created_at', 'desc'))
      querySnapshot = await getDocs(q)
    } catch (orderError: any) {
      // Si l'index n'existe pas, récupérer sans tri
      if (orderError.code === 'failed-precondition') {
        console.warn('Index created_at manquant, récupération sans tri. Créez l\'index dans Firebase Console.')
        querySnapshot = await getDocs(propertiesRef)
      } else {
        throw orderError
      }
    }
    
    const properties = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate ? doc.data().created_at.toDate() : doc.data().created_at,
      updated_at: doc.data().updated_at?.toDate ? doc.data().updated_at.toDate() : doc.data().updated_at
    }))
    
    // Trier côté client si nécessaire
    if (properties.length > 0 && properties[0].created_at) {
      properties.sort((a, b) => {
        const dateA = a.created_at instanceof Date ? a.created_at.getTime() : 0
        const dateB = b.created_at instanceof Date ? b.created_at.getTime() : 0
        return dateB - dateA // Descendant
      })
    }
    
    return properties
  } catch (error: any) {
    console.error('Error fetching properties:', error)
    
    if (error.code === 'permission-denied') {
      throw new Error('Permission refusée. Vérifiez que vous êtes connecté.')
    }
    
    throw error
  }
}

// ===== MESSAGES DE CONTACT =====

export interface ContactMessage {
  id?: string
  nom: string
  prenom?: string
  email: string
  telephone?: string
  pays?: string
  projet?: string
  contact_method: string
  message?: string
  read?: boolean
  created_at?: Date | Timestamp
}

// Type pour ContactMessage avec id requis (utilisé pour les données récupérées)
export interface ContactMessageWithId extends Omit<ContactMessage, 'id'> {
  id: string
}

// Créer un message de contact
export const createContactMessage = async (messageData: ContactMessage): Promise<string> => {
  try {
    const dataToSave = {
      ...messageData,
      read: false,
      created_at: serverTimestamp()
    }
    const docRef = await addDoc(collection(db, 'contact_messages'), dataToSave)
    return docRef.id
  } catch (error) {
    console.error('Error creating contact message:', error)
    throw error
  }
}

// Récupérer tous les messages de contact
export const getAllContactMessages = async (): Promise<ContactMessageWithId[]> => {
  try {
    const messagesRef = collection(db, 'contact_messages')
    const q = query(messagesRef, orderBy('created_at', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate ? doc.data().created_at.toDate() : doc.data().created_at
    })) as ContactMessageWithId[]
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    throw error
  }
}

// Mettre à jour le statut de lecture d'un message
export const updateContactMessageRead = async (id: string, read: boolean): Promise<void> => {
  try {
    const messageRef = doc(db, 'contact_messages', id)
    await updateDoc(messageRef, { read })
  } catch (error) {
    console.error('Error updating contact message:', error)
    throw error
  }
}

// Supprimer un message de contact
export const deleteContactMessage = async (id: string): Promise<void> => {
  try {
    const messageRef = doc(db, 'contact_messages', id)
    await deleteDoc(messageRef)
  } catch (error) {
    console.error('Error deleting contact message:', error)
    throw error
  }
}

// ===== LEADS ANALYSE =====

export interface AnalyseLead {
  id?: string
  localisation?: string
  type_bien?: string
  maturite?: string
  ajustement_prix?: string
  motivation?: string
  civilite?: string | null
  personne_morale?: string | null
  siret?: string | null
  prenom?: string
  telephone?: string
  email?: string
  type_demande?: 'analyse' | 'estimation' | 'estimation_partielle' | 'estimation_partielle_essentielle' | 'estimation_partielle_investisseur' | 'estimation_partielle_paris' | 'estimation_partielle_juridique' | 'estimation_investisseur' | 'estimation_paris' | 'estimation_juridique' | 'devis_personnalise'
  nom?: string
  nom_dossier?: string | null
  read?: boolean
  status?: 'nouveau' | 'en_cours' | 'accepte' | 'refuse'
  notes?: string
  created_at?: Date | Timestamp
  updated_at?: Date | Timestamp
  
  // Champs pour les estimations détaillées
  adresse?: string | null
  ville?: string | null
  code_postal?: string | null
  surface?: string | null
  surface_terrain?: string | null
  description_initiale?: string | null
  nombre_pieces?: number | null
  nombre_chambres?: number | null
  nombre_salles_de_bain?: number | null
  nombre_salles_d_eau?: number | null
  nombre_wc?: number | null
  wc_separes?: boolean | null
  nombre_niveaux?: string | null
  nombre_etages_immeuble?: string | null
  etage?: string | number | null
  dernier_etage?: boolean | null
  ascenseur?: boolean | null
  exterieurs?: string[] | null
  surface_exterieur?: string | null
  stationnement?: string | null
  stationnement_type?: string | null
  stationnement_emplacement?: string | null
  stationnement_couvert?: string | null
  stationnement_ferme?: string | null
  surface_stationnement?: string | null
  etat_bien?: string | null
  travaux_recents?: boolean | null
  nature_travaux?: string | null
  annee_travaux?: number | null
  montant_travaux?: string | null
  travaux_prevus?: boolean | null
  nature_travaux_prevus?: string | null
  budget_travaux_prevus?: string | null
  date_travaux_prevus?: string | null
  prestations?: string[] | null
  autres_prestations?: string | null
  exposition?: string | null
  exposition_traversant?: string | null
  vis_a_vis?: string | null
  distance_vis_a_vis?: string | null
  taxe_fonciere?: string | null
  charges_copro?: string | null
  dpe?: string | null
  contexte_vente?: string | null
  nom_succession?: string | null
  delai_vente?: string | null
  situation_actuelle?: string | null
  type_location?: string | null
  loyer_mensuel?: string | null
  prix_envisage?: string | null
  ajustement_prix_echelle?: number | null
  message_libre?: string | null
  photos_urls?: string[] | null
}

// Type pour AnalyseLead avec id requis (utilisé pour les données récupérées)
export interface AnalyseLeadWithId extends Omit<AnalyseLead, 'id'> {
  id: string
}

// Créer un lead d'analyse
export const createAnalyseLead = async (leadData: AnalyseLead): Promise<string> => {
  try {
    const dataToSave = {
      ...leadData,
      read: false,
      status: leadData.status || 'nouveau',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    }
    const docRef = await addDoc(collection(db, 'analyse_leads'), dataToSave)
    return docRef.id
  } catch (error) {
    console.error('Error creating analyse lead:', error)
    throw error
  }
}

// Uploader des photos pour une estimation
export const uploadEstimationPhotos = async (
  files: File[], 
  leadId: string,
  onProgress?: (uploaded: number, total: number) => void
): Promise<string[]> => {
  const urls: string[] = []
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const storageRef = ref(storage, `estimations/${leadId}/${timestamp}_${i}_${safeName}`)
    
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    urls.push(downloadURL)
    
    if (onProgress) {
      onProgress(i + 1, files.length)
    }
  }
  
  return urls
}

// Récupérer tous les leads d'analyse
export const getAllAnalyseLeads = async (type?: 'analyse' | 'estimation' | 'estimation_partielle' | 'estimation_partielle_essentielle' | 'estimation_partielle_investisseur' | 'estimation_partielle_paris' | 'estimation_partielle_juridique' | 'estimation_investisseur' | 'estimation_paris' | 'estimation_juridique'): Promise<AnalyseLeadWithId[]> => {
  try {
    const leadsRef = collection(db, 'analyse_leads')
    let q
    
    if (type) {
      q = query(
        leadsRef, 
        where('type_demande', '==', type),
        orderBy('created_at', 'desc')
      )
    } else {
      // Si pas de type spécifié, récupérer tous les leads (y compris ceux sans type_demande)
      q = query(
        leadsRef,
        orderBy('created_at', 'desc')
      )
    }
    
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate ? doc.data().created_at.toDate() : doc.data().created_at
    })) as AnalyseLeadWithId[]
  } catch (error) {
    console.error('Error fetching analyse leads:', error)
    // Si l'index n'existe pas encore, essayer sans le filtre type_demande
    if (type) {
      try {
        const leadsRef = collection(db, 'analyse_leads')
        const q = query(leadsRef, orderBy('created_at', 'desc'))
        const querySnapshot = await getDocs(q)
        const allLeads = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          created_at: doc.data().created_at?.toDate ? doc.data().created_at.toDate() : doc.data().created_at
        })) as AnalyseLeadWithId[]
        // Filtrer côté client
        return allLeads.filter(lead => lead.type_demande === type)
      } catch (fallbackError) {
        console.error('Error fetching leads (fallback):', fallbackError)
        throw fallbackError
      }
    }
    throw error
  }
}

// Mettre à jour un lead d'analyse
export const updateAnalyseLead = async (id: string, updates: Partial<AnalyseLead>): Promise<void> => {
  try {
    const leadRef = doc(db, 'analyse_leads', id)
    await updateDoc(leadRef, updates)
  } catch (error) {
    console.error('Error updating analyse lead:', error)
    throw error
  }
}

// Supprimer un lead d'analyse
export const deleteAnalyseLead = async (id: string): Promise<void> => {
  try {
    const leadRef = doc(db, 'analyse_leads', id)
    await deleteDoc(leadRef)
  } catch (error) {
    console.error('Error deleting analyse lead:', error)
    throw error
  }
}
