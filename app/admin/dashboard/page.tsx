'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChange, waitForAuthInit, signOutAdmin, FirebaseUser } from '@/lib/firebase-auth'
import { 
  getAllPropertiesAdmin, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  getAllContactMessages,
  updateContactMessageRead,
  deleteContactMessage,
  getAllAnalyseLeads,
  updateAnalyseLead,
  deleteAnalyseLead,
  type ContactMessageWithId,
  type AnalyseLeadWithId
} from '@/lib/firebase-admin'
import Image from 'next/image'
import PropertyForm from '@/components/PropertyForm'

interface Property {
  id: string
  title: string
  location: string
  price: string
  surface: string
  rooms: string
  bathrooms: string
  type: string
  status?: string
  images: Array<{ src: string; alt: string }>
  created_at?: string
  updated_at?: string
}

type TabType = 'vendre' | 'louer' | 'messagerie' | 'leads' | 'estimations' | 'trafic'

// Utiliser les interfaces importées de firebase-admin
// ContactMessage et AnalyseLead sont déjà importées

// EstimationLead est essentiellement un AnalyseLeadWithId avec tous les champs détaillés
// Tous les champs sont déjà dans AnalyseLeadWithId, donc on peut simplement utiliser AnalyseLeadWithId
type EstimationLead = AnalyseLeadWithId

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const authInitializedRef = useRef(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('vendre')
  const [messages, setMessages] = useState<ContactMessageWithId[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [leads, setLeads] = useState<AnalyseLeadWithId[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [estimations, setEstimations] = useState<EstimationLead[]>([])
  const [loadingEstimations, setLoadingEstimations] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Attendre que Firebase Auth soit initialisé
    waitForAuthInit().then((currentUser) => {
      console.log('Auth initialisé, utilisateur:', currentUser?.email)
      authInitializedRef.current = true
      
      if (!currentUser) {
        console.log('Pas de session, redirection vers login')
        setLoading(false)
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 500)
      } else {
        console.log('Session trouvée:', currentUser.email)
        setUser(currentUser)
        setLoading(false)
      }
    }).catch((error) => {
      console.error('Erreur lors de l\'initialisation de l\'auth:', error)
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/admin/login'
      }, 500)
    })

    // Continuer à écouter les changements d'état d'authentification
    const unsubscribe = onAuthStateChange((currentUser) => {
      // Ne traiter que si l'initialisation est déjà faite
      if (authInitializedRef.current) {
        console.log('Changement d\'état auth:', currentUser?.email)
        
        if (!currentUser) {
          console.log('Session perdue, redirection vers login')
          setUser(null)
          setTimeout(() => {
            window.location.href = '/admin/login'
          }, 500)
        } else {
          setUser(currentUser)
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [router])

  useEffect(() => {
    if (user) {
      fetchProperties()
    }
  }, [user])

  useEffect(() => {
    if (user && activeTab === 'messagerie') {
      fetchMessages()
    }
    if (user && activeTab === 'leads') {
      fetchLeads()
    }
    if (user && activeTab === 'estimations') {
      fetchEstimations()
    }
  }, [user, activeTab])

  const fetchProperties = async () => {
    setLoadingProperties(true)
    try {
      const data = await getAllPropertiesAdmin()
      console.log('Propriétés récupérées:', data)
      console.log('Nombre de propriétés:', data?.length || 0)
      if (data && data.length > 0) {
        console.log('Première propriété:', data[0])
        console.log('Type/Status de la première propriété:', data[0].type || data[0].status)
      }
      setProperties(data || [])
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
    } finally {
      setLoadingProperties(false)
    }
  }

  const handleSubmit = async (propertyData: any): Promise<void> => {
    try {
      // Vérifier que l'utilisateur est connecté
      if (!user) {
        throw new Error('Vous devez être connecté pour publier une annonce')
      }

      // Vérifier les champs requis
      if (!propertyData.title || !propertyData.price || !propertyData.location) {
        throw new Error('Veuillez remplir tous les champs obligatoires (Titre, Prix, Localisation)')
      }

      // Supprimer les champs qui n'existent pas dans la base de données
      const { photos, type, surface, ...dataWithoutExtras } = propertyData
      
      // Préparer les données pour Firebase en respectant exactement la structure de la collection
      const statusValue = propertyData.status || 'À vendre'
      const processedData: any = {
        title: propertyData.title.trim(),
        price: propertyData.price.trim(),
        location: propertyData.location.trim(),
        status: statusValue,
        type: statusValue, // Ajouter type pour le filtrage dans le dashboard
        description: propertyData.description?.trim() || null,
        rooms: propertyData.rooms?.trim() || null,
        bathrooms: propertyData.bathrooms?.trim() || null,
        surface_habitable: propertyData.surface_habitable?.trim() || null,
        parking: propertyData.parking || false,
        terrasse: propertyData.terrasse || false,
        piscine: propertyData.piscine || false,
        ascenseur: propertyData.ascenseur || false,
        cave: propertyData.cave || false,
        jardin: propertyData.jardin || false,
        balcon: propertyData.balcon || false,
        garage: propertyData.garage || false,
        climatisation: propertyData.climatisation || false,
        interphone: propertyData.interphone || false,
        local_velo: propertyData.local_velo || false,
        internet: propertyData.internet || false,
        digicode: propertyData.digicode || false,
        fibre_optique: propertyData.fibre_optique || false,
        gardien: propertyData.gardien || false,
        autres_prestations: propertyData.autres_prestations?.trim() || null,
        surface_totale: propertyData.surface_totale?.trim() || null,
        consommation_energetique: propertyData.consommation_energetique || null,
        emissions_ges: propertyData.emissions_ges || null,
        images: propertyData.images || [],
      }
      
      // Supprimer les champs null/undefined pour éviter les erreurs
      Object.keys(processedData).forEach(key => {
        if (processedData[key] === null || processedData[key] === undefined || processedData[key] === '') {
          if (typeof processedData[key] !== 'boolean') {
            delete processedData[key]
          }
        }
      })

      console.log('Publication de l\'annonce...', processedData)

      if (editingProperty) {
        // Mise à jour
        console.log('Mise à jour de l\'annonce:', editingProperty.id)
        await updateProperty(editingProperty.id, processedData)
        alert('Annonce mise à jour avec succès !')
      } else {
        // Création
        console.log('Création d\'une nouvelle annonce...')
        const propertyId = await createProperty(processedData)
        console.log('Annonce créée avec l\'ID:', propertyId)
        alert('Annonce publiée avec succès !')
      }

      // Fermer le formulaire
      setShowAddForm(false)
      setEditingProperty(null)
      
      // Attendre un peu pour que Firestore soit à jour, puis rafraîchir
      setTimeout(async () => {
        console.log('Rafraîchissement de la liste des propriétés...')
        await fetchProperties()
      }, 1000)
    } catch (error: any) {
      console.error('Erreur lors de la publication:', error)
      
      // Messages d'erreur plus détaillés
      let errorMessage = 'Erreur lors de la publication de l\'annonce'
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Erreur d\'authentification. Veuillez vous reconnecter.'
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporairement indisponible. Veuillez réessayer plus tard.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
      throw error // Re-lancer pour que le formulaire reste ouvert en cas d'erreur
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) return

    try {
      await deleteProperty(id)
      fetchProperties()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setShowAddForm(true)
  }

  const handleLogout = async () => {
    try {
      await signOutAdmin()
      router.push('/admin/login')
      router.refresh()
    } catch (error: any) {
      console.error('Erreur de déconnexion:', error)
      // Rediriger quand même vers la page de login
      router.push('/admin/login')
    }
  }

  const fetchMessages = async () => {
    setLoadingMessages(true)
    try {
      const data = await getAllContactMessages()
      setMessages(data)
    } catch (error: any) {
      console.error('Error fetching messages:', error.message)
    } finally {
      setLoadingMessages(false)
    }
  }

  const toggleMessageRead = async (id: string, currentReadStatus: boolean) => {
    try {
      await updateContactMessageRead(id, !currentReadStatus)
      fetchMessages()
    } catch (error: any) {
      console.error('Error updating message:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      await deleteContactMessage(id)
      fetchMessages()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const fetchLeads = async () => {
    setLoadingLeads(true)
    try {
      // Récupérer tous les leads et filtrer côté client pour ceux sans type_demande ou avec type_demande = 'analyse'
      const allLeads = await getAllAnalyseLeads()
      const filteredLeads = allLeads.filter(lead => !lead.type_demande || lead.type_demande === 'analyse')
      setLeads(filteredLeads)
    } catch (error: any) {
      console.error('Error fetching leads:', error.message)
    } finally {
      setLoadingLeads(false)
    }
  }

  const fetchEstimations = async () => {
    setLoadingEstimations(true)
    try {
      const data = await getAllAnalyseLeads('estimation')
      setEstimations(data as EstimationLead[])
    } catch (error: any) {
      console.error('Error fetching estimations:', error.message)
    } finally {
      setLoadingEstimations(false)
    }
  }

  const toggleLeadRead = async (id: string, currentReadStatus: boolean) => {
    try {
      await updateAnalyseLead(id, { read: !currentReadStatus })
      fetchLeads()
    } catch (error: any) {
      console.error('Error updating lead:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateLeadStatus = async (id: string, newStatus: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => {
    try {
      await updateAnalyseLead(id, { status: newStatus })
      fetchLeads()
    } catch (error: any) {
      console.error('Error updating lead status:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateLeadNotes = async (id: string, notes: string) => {
    try {
      await updateAnalyseLead(id, { notes })
      fetchLeads()
    } catch (error: any) {
      console.error('Error updating lead notes:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lead ?')) return

    try {
      await deleteAnalyseLead(id)
      fetchLeads()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const toggleEstimationRead = async (id: string, currentReadStatus: boolean) => {
    try {
      await updateAnalyseLead(id, { read: !currentReadStatus })
      fetchEstimations()
    } catch (error: any) {
      console.error('Error updating estimation:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateEstimationStatus = async (id: string, newStatus: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => {
    try {
      await updateAnalyseLead(id, { status: newStatus })
      fetchEstimations()
    } catch (error: any) {
      console.error('Error updating estimation status:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateEstimationNotes = async (id: string, notes: string) => {
    try {
      await updateAnalyseLead(id, { notes })
      fetchEstimations()
    } catch (error: any) {
      console.error('Error updating estimation notes:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteEstimation = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande d\'estimation ?')) return

    try {
      await deleteAnalyseLead(id)
      fetchEstimations()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const formatDate = (dateInput: string | Date | undefined | any) => {
    if (!dateInput) return 'Date non disponible'
    
    // Si c'est un Timestamp Firebase, convertir en Date
    let date: Date
    if (dateInput.toDate && typeof dateInput.toDate === 'function') {
      date = dateInput.toDate()
    } else if (dateInput instanceof Date) {
      date = dateInput
    } else if (typeof dateInput === 'string') {
      date = new Date(dateInput)
    } else {
      return 'Date invalide'
    }
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
            Dashboard Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Onglets */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab('vendre')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'vendre'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'vendre' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Vendre un bien
            </button>
            <button
              onClick={() => {
                setActiveTab('louer')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'louer'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'louer' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Louer un bien
            </button>
            <button
              onClick={() => {
                setActiveTab('messagerie')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'messagerie'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'messagerie' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Messagerie
            </button>
            <button
              onClick={() => {
                setActiveTab('leads')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'leads'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'leads' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Lead entrant ({leads.filter(l => !l.read).length})
            </button>
            <button
              onClick={() => {
                setActiveTab('estimations')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'estimations'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'estimations' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Demande d'estimation ({estimations.filter(e => !e.read).length})
            </button>
            <button
              onClick={() => {
                setActiveTab('trafic')
                setShowAddForm(false)
                setEditingProperty(null)
              }}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'trafic'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'trafic' ? { borderColor: '#4682B4', color: '#4682B4' } : {}}
            >
              Suivi du trafic
            </button>
          </div>
        </div>

        {/* Contenu selon l'onglet actif */}
        {(activeTab === 'vendre' || activeTab === 'louer') && (
          <>
            {/* Bouton Ajouter une annonce */}
            {!showAddForm && (
              <div className="mb-6">
                <button
                  onClick={() => {
                    setShowAddForm(true)
                    setEditingProperty(null)
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  style={{ backgroundColor: '#4682B4' }}
                >
                  + Ajouter une annonce
                </button>
              </div>
            )}

            {/* Formulaire d'ajout/modification */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    {editingProperty ? 'Modifier l\'annonce' : `Nouvelle annonce - ${activeTab === 'vendre' ? 'Vente' : 'Location'}`}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingProperty(null)
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <PropertyForm
                  onSubmit={async (data) => {
                    const dataWithStatus = {
                      ...data,
                      status: activeTab === 'vendre' ? 'À vendre' : 'À louer'
                    }
                    await handleSubmit(dataWithStatus)
                  }}
                  onCancel={() => {
                    setShowAddForm(false)
                    setEditingProperty(null)
                  }}
                  initialData={editingProperty ? {
                    ...editingProperty,
                    status: activeTab === 'vendre' ? 'À vendre' : 'À louer'
                  } : undefined}
                />
              </div>
            )}

            {/* Liste des biens */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Liste des biens {activeTab === 'vendre' ? 'à vendre' : 'à louer'} ({properties.filter(p => {
                  const propertyStatus = p.type || p.status || ''
                  return activeTab === 'vendre' ? propertyStatus === 'À vendre' : propertyStatus === 'À louer'
                }).length})
              </h2>

              {loadingProperties ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
              <p className="text-gray-600">Chargement des biens...</p>
            </div>
              ) : properties.filter(p => {
                const propertyStatus = p.type || p.status || ''
                return activeTab === 'vendre' ? propertyStatus === 'À vendre' : propertyStatus === 'À louer'
              }).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun bien {activeTab === 'vendre' ? 'à vendre' : 'à louer'} enregistré pour le moment.</p>
                  <p className="text-sm mt-2">Cliquez sur "Ajouter une annonce" pour commencer.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.filter(p => {
                    const propertyStatus = p.type || p.status || ''
                    return activeTab === 'vendre' ? propertyStatus === 'À vendre' : propertyStatus === 'À louer'
                  }).map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {property.images && property.images.length > 0 && property.images[0].src && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={property.images[0].src}
                        alt={property.images[0].alt || property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg" style={{ color: '#4682B4' }}>
                        {property.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        property.type === 'À vendre' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {property.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                    <p className="font-semibold text-lg mb-3" style={{ color: '#4682B4' }}>
                      {property.price}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span>{property.surface} m²</span>
                      <span>{property.rooms} ch.</span>
                      <span>{property.bathrooms} SDB</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        style={{ backgroundColor: '#4682B4' }}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              )}
            </div>
          </>
        )}

        {/* Onglet Messagerie */}
        {activeTab === 'messagerie' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Messagerie ({messages.filter(m => !m.read).length} non lus)
              </h2>
              <button
                onClick={fetchMessages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                style={{ backgroundColor: '#4682B4' }}
              >
                Actualiser
              </button>
            </div>

            {loadingMessages ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
                <p className="text-gray-600">Chargement des messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Aucun message pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                      message.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold" style={{ color: '#4682B4' }}>
                            {message.nom} {message.prenom || ''}
                          </h3>
                          {!message.read && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              Nouveau
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Email:</strong> {message.email}</p>
                          {message.telephone && (
                            <p><strong>Téléphone:</strong> {message.telephone}</p>
                          )}
                          {message.pays && (
                            <p><strong>Pays:</strong> {message.pays}</p>
                          )}
                          <p><strong>Contact préféré:</strong> {
                            message.contact_method === 'telephone-whatsapp' 
                              ? 'Téléphone/WhatsApp' 
                              : 'Email'
                          }</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => toggleMessageRead(message.id, message.read)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            message.read
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          style={!message.read ? { backgroundColor: '#4682B4' } : {}}
                        >
                          {message.read ? 'Marquer non lu' : 'Marquer lu'}
                        </button>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    {message.projet && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Projet:</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{message.projet}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onglet Lead entrant */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Lead entrant ({leads.filter(l => !l.read).length} non lus)
              </h2>
              <button
                onClick={fetchLeads}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                style={{ backgroundColor: '#4682B4' }}
              >
                Actualiser
              </button>
            </div>

            {loadingLeads ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
                <p className="text-gray-600">Chargement des leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Aucun lead pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                      lead.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold" style={{ color: '#4682B4' }}>
                            {lead.prenom}
                          </h3>
                          {!lead.read && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              Nouveau
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            lead.status === 'nouveau' ? 'bg-gray-200 text-gray-700' :
                            lead.status === 'en_cours' ? 'bg-yellow-200 text-yellow-700' :
                            lead.status === 'accepte' ? 'bg-green-200 text-green-700' :
                            'bg-red-200 text-red-700'
                          }`}>
                            {lead.status === 'nouveau' ? 'Nouveau' :
                             lead.status === 'en_cours' ? 'En cours' :
                             lead.status === 'accepte' ? 'Accepté' : 'Refusé'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <p><strong>Email:</strong> {lead.email}</p>
                            <p><strong>Téléphone:</strong> {lead.telephone}</p>
                          </div>
                          <div>
                            <p><strong>Localisation:</strong> {lead.localisation}</p>
                            <p><strong>Type de bien:</strong> {lead.type_bien}</p>
                          </div>
                          <div>
                            <p><strong>Maturité:</strong> {lead.maturite}</p>
                            <p><strong>Motivation:</strong> {lead.motivation}</p>
                          </div>
                          <div>
                            <p><strong>Ajustement prix:</strong> {lead.ajustement_prix}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDate(lead.created_at)}
                            </p>
                          </div>
                        </div>
                        {lead.notes && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                            <p className="text-sm text-gray-600">{lead.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => toggleLeadRead(lead.id, lead.read)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            lead.read
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          style={!lead.read ? { backgroundColor: '#4682B4' } : {}}
                        >
                          {lead.read ? 'Marquer non lu' : 'Marquer lu'}
                        </button>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className="px-3 py-1 rounded text-sm border border-gray-300"
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="en_cours">En cours</option>
                          <option value="accepte">Accepté</option>
                          <option value="refuse">Refusé</option>
                        </select>
                        <button
                          onClick={() => {
                            const notes = prompt('Ajouter des notes:', lead.notes || '')
                            if (notes !== null) {
                              updateLeadNotes(lead.id, notes)
                            }
                          }}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                        >
                          Notes
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onglet Demande d'estimation */}
        {activeTab === 'estimations' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Demande d'estimation ({estimations.filter(e => !e.read).length} non lues)
              </h2>
              <button
                onClick={fetchEstimations}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                style={{ backgroundColor: '#4682B4' }}
              >
                Actualiser
              </button>
            </div>

            {loadingEstimations ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
                <p className="text-gray-600">Chargement des demandes d'estimation...</p>
              </div>
            ) : estimations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Aucune demande d'estimation pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {estimations.map((estimation) => (
                  <div
                    key={estimation.id}
                    className={`border-2 rounded-lg p-6 transition-all hover:shadow-lg ${
                      estimation.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xl font-semibold" style={{ color: '#4682B4' }}>
                            {estimation.prenom}
                          </h3>
                          {!estimation.read && (
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              Nouveau
                            </span>
                          )}
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            estimation.status === 'nouveau' ? 'bg-gray-200 text-gray-700' :
                            estimation.status === 'en_cours' ? 'bg-yellow-200 text-yellow-700' :
                            estimation.status === 'accepte' ? 'bg-green-200 text-green-700' :
                            'bg-red-200 text-red-700'
                          }`}>
                            {estimation.status === 'nouveau' ? 'Nouveau' :
                             estimation.status === 'en_cours' ? 'En cours' :
                             estimation.status === 'accepte' ? 'Accepté' : 'Refusé'}
                          </span>
                        </div>

                        {/* Section Coordonnées */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Coordonnées</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <p><strong>Email:</strong> {estimation.email}</p>
                            <p><strong>Téléphone:</strong> {estimation.telephone}</p>
                            <p className="text-xs text-gray-500">Reçu le {formatDate(estimation.created_at)}</p>
                          </div>
                        </div>

                        {/* Section Étape 1 */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Étape 1 - Identification</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <p><strong>Localisation:</strong> {estimation.localisation}</p>
                            <p><strong>Type de bien:</strong> {estimation.type_bien}</p>
                            {estimation.surface && <p><strong>Surface habitable:</strong> {estimation.surface} m²</p>}
                            {estimation.surface_terrain && <p><strong>Surface du terrain:</strong> {estimation.surface_terrain} m²</p>}
                            {estimation.description_initiale && (
                              <div className="md:col-span-2">
                                <p><strong>Description initiale:</strong></p>
                                <p className="text-gray-700 italic">{estimation.description_initiale}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Section Étape 2 - Caractéristiques du bien */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <h4 className="font-semibold mb-3" style={{ color: '#4682B4' }}>Étape 2 - Caractéristiques du bien</h4>
                          
                          {/* Composition */}
                          <div className="mb-3">
                            <h5 className="font-medium text-gray-700 mb-2 text-sm">Composition</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            {estimation.nombre_pieces && <p><strong>Pièces:</strong> {estimation.nombre_pieces}</p>}
                            {estimation.nombre_chambres && <p><strong>Chambres:</strong> {estimation.nombre_chambres}</p>}
                              {estimation.nombre_salles_de_bain && <p><strong>Salles de bain:</strong> {estimation.nombre_salles_de_bain}</p>}
                            </div>
                          </div>

                          {/* Étage & Accès (si appartement) */}
                          {(estimation.etage !== null || estimation.dernier_etage !== null || estimation.ascenseur !== null) && (
                            <div className="mb-3">
                              <h5 className="font-medium text-gray-700 mb-2 text-sm">Étage & Accès</h5>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                {estimation.etage !== null && <p><strong>Étage:</strong> {estimation.etage}</p>}
                                {estimation.dernier_etage !== null && (
                                  <p><strong>Dernier étage:</strong> {estimation.dernier_etage ? 'Oui' : 'Non'}</p>
                                )}
                                {estimation.ascenseur !== null && (
                                  <p><strong>Ascenseur:</strong> {estimation.ascenseur ? 'Oui' : 'Non'}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Extérieurs */}
                          {(estimation.exterieurs && estimation.exterieurs.length > 0) || estimation.surface_exterieur ? (
                            <div className="mb-3">
                              <h5 className="font-medium text-gray-700 mb-2 text-sm">Extérieurs</h5>
                              <div className="text-sm text-gray-600">
                            {estimation.exterieurs && estimation.exterieurs.length > 0 && (
                                  <p><strong>Types:</strong> {estimation.exterieurs.join(', ')}</p>
                                )}
                                {estimation.surface_exterieur && (
                                  <p><strong>Surface extérieure:</strong> {estimation.surface_exterieur}</p>
                                )}
                              </div>
                            </div>
                          ) : null}

                          {/* Stationnement */}
                          {estimation.stationnement && (
                            <div className="mb-3">
                              <h5 className="font-medium text-gray-700 mb-2 text-sm">Stationnement</h5>
                              <div className="text-sm text-gray-600">
                                <p><strong>Type:</strong> {estimation.stationnement}</p>
                                {estimation.stationnement_type && (
                                  <p><strong>Caractéristique:</strong> {estimation.stationnement_type}</p>
                            )}
                              </div>
                            </div>
                          )}

                          {/* État & Prestations */}
                          <div className="mb-3">
                            <h5 className="font-medium text-gray-700 mb-2 text-sm">État & Prestations</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              {estimation.etat_bien && <p><strong>État général:</strong> {estimation.etat_bien}</p>}
                              {estimation.exposition && <p><strong>Exposition:</strong> {estimation.exposition}</p>}
                              {estimation.vis_a_vis && <p><strong>Vis-à-vis:</strong> {estimation.vis_a_vis}</p>}
                            {estimation.prestations && estimation.prestations.length > 0 && (
                                <div className="md:col-span-2">
                              <p><strong>Prestations:</strong> {estimation.prestations.join(', ')}</p>
                                </div>
                            )}
                            {estimation.autres_prestations && (
                                <div className="md:col-span-2">
                              <p><strong>Autres prestations:</strong> {estimation.autres_prestations}</p>
                                </div>
                            )}
                            </div>
                          </div>
                        </div>

                        {/* Section Travaux */}
                        {estimation.travaux_recents !== null && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Travaux récents</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <p><strong>Réalisés:</strong> {estimation.travaux_recents ? 'Oui' : 'Non'}</p>
                              {estimation.travaux_recents && estimation.nature_travaux && (
                                <p><strong>Nature:</strong> {estimation.nature_travaux}</p>
                              )}
                              {estimation.travaux_recents && estimation.annee_travaux && (
                                <p><strong>Année:</strong> {estimation.annee_travaux}</p>
                              )}
                              {estimation.travaux_recents && estimation.montant_travaux && (
                                <p><strong>Montant:</strong> {estimation.montant_travaux}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Section Projet de vente */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Projet de vente</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            {estimation.delai_vente && <p><strong>Délai souhaité:</strong> {estimation.delai_vente}</p>}
                            {estimation.situation_actuelle && <p><strong>Situation:</strong> {estimation.situation_actuelle}</p>}
                            
                            {/* Champs conditionnels si bien loué */}
                            {estimation.situation_actuelle === 'Loué' && (
                              <>
                                {estimation.type_location && (
                                  <p><strong>Type de location:</strong> {estimation.type_location}</p>
                                )}
                                {estimation.loyer_mensuel && (
                                  <p><strong>Loyer mensuel:</strong> {estimation.loyer_mensuel}</p>
                                )}
                              </>
                            )}
                            
                            {estimation.prix_envisage && (
                              <p className="md:col-span-2">
                                <strong>Prix envisagé:</strong> <span className="font-semibold text-lg" style={{ color: '#4682B4' }}>{estimation.prix_envisage}</span>
                              </p>
                            )}
                            {estimation.ajustement_prix_echelle !== null && (
                              <p className="md:col-span-2">
                                <strong>Disposition à ajuster le prix:</strong> {estimation.ajustement_prix_echelle}/10
                                <span className="ml-2 text-xs text-gray-500">
                                  ({estimation.ajustement_prix_echelle === 1 ? 'Pas du tout' : estimation.ajustement_prix_echelle === 10 ? 'Très disposé(e)' : 'Modéré'})
                                </span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Section Message libre */}
                        {estimation.message_libre && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Message libre</h4>
                            <p className="text-sm text-gray-700 italic">{estimation.message_libre}</p>
                          </div>
                        )}

                        {/* Section Photos */}
                        {estimation.photos_urls && estimation.photos_urls.length > 0 && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <h4 className="font-semibold mb-3" style={{ color: '#4682B4' }}>Photos ({estimation.photos_urls.length})</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {estimation.photos_urls.map((photoUrl, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                  <img
                                    src={photoUrl}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => window.open(photoUrl, '_blank')}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">Notes:</p>
                          <textarea
                            value={estimation.notes || ''}
                            onChange={(e) => updateEstimationNotes(estimation.id, e.target.value)}
                            className="w-full p-3 border rounded-lg text-sm"
                            rows={3}
                            placeholder="Ajouter des notes..."
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => toggleEstimationRead(estimation.id, estimation.read)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            estimation.read
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          style={!estimation.read ? { backgroundColor: '#4682B4' } : {}}
                        >
                          {estimation.read ? 'Marquer non lu' : 'Marquer lu'}
                        </button>
                        <select
                          value={estimation.status}
                          onChange={(e) => updateEstimationStatus(estimation.id, e.target.value as any)}
                          className="px-3 py-1 rounded text-sm border border-gray-300 bg-white"
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="en_cours">En cours</option>
                          <option value="accepte">Accepté</option>
                          <option value="refuse">Refusé</option>
                        </select>
                        <button
                          onClick={() => deleteEstimation(estimation.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onglet Suivi du trafic */}
        {activeTab === 'trafic' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              Suivi du trafic
            </h2>
            <div className="text-center py-12 text-gray-500">
              <p>Statistiques de trafic à venir.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
