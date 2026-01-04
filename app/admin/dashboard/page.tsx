'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
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
  images: Array<{ src: string; alt: string }>
  created_at?: string
  updated_at?: string
}

interface ContactMessage {
  id: string
  nom: string
  prenom: string | null
  email: string
  telephone: string | null
  pays: string | null
  projet: string | null
  contact_method: string
  read: boolean
  created_at: string
}

type TabType = 'vendre' | 'louer' | 'messagerie' | 'leads' | 'estimations' | 'trafic'

interface AnalyseLead {
  id: string
  localisation: string
  type_bien: string
  maturite: string
  ajustement_prix: string
  motivation: string
  prenom: string
  telephone: string
  email: string
  read: boolean
  status: 'nouveau' | 'en_cours' | 'accepte' | 'refuse'
  notes: string | null
  created_at: string
  updated_at: string
}

interface EstimationLead {
  id: string
  // Données étape 1
  prenom: string
  telephone: string
  email: string
  localisation: string
  type_bien: string
  surface: string | null
  description_initiale: string | null
  
  // Données étape 2
  nombre_pieces: string | null
  nombre_chambres: string | null
  etage: string | null
  dernier_etage: string | null
  ascenseur: string | null
  exterieurs: string[] | null
  stationnement: string | null
  etat_bien: string | null
  travaux_recents: string | null
  nature_travaux: string | null
  annee_travaux: string | null
  prestations: string[] | null
  autres_prestations: string | null
  exposition: string | null
  vis_a_vis: string | null
  photos_urls: string[] | null
  delai_vente: string | null
  situation_actuelle: string | null
  prix_envisage: string | null
  message_libre: string | null
  
  // Métadonnées
  read: boolean
  status: 'nouveau' | 'en_cours' | 'accepte' | 'refuse'
  notes: string | null
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('vendre')
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [leads, setLeads] = useState<AnalyseLead[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [estimations, setEstimations] = useState<EstimationLead[]>([])
  const [loadingEstimations, setLoadingEstimations] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Attendre un peu avant de vérifier pour laisser le temps à la session d'être chargée
    const timer = setTimeout(() => {
      checkUser()
    }, 300)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Changement d\'état auth:', _event, session?.user?.email)
      if (!session) {
        console.log('Pas de session, redirection vers login')
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 500)
      } else {
        console.log('Session trouvée:', session.user.email)
        setUser(session.user)
      }
    })

    return () => {
      clearTimeout(timer)
      subscription.unsubscribe()
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

  const checkUser = async () => {
    try {
      // Vérifier d'abord la session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Erreur de session:', sessionError)
      }
      
      if (session && session.user) {
        console.log('Session trouvée, utilisateur:', session.user.email)
        setUser(session.user)
        setLoading(false)
        return
      }

      // Si pas de session, essayer de récupérer l'utilisateur
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('Erreur utilisateur:', userError)
      }
      
      if (user) {
        console.log('Utilisateur trouvé:', user.email)
        setUser(user)
      } else {
        console.log('Aucun utilisateur trouvé, redirection vers login')
        // Attendre un peu avant de rediriger pour éviter les boucles
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 500)
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
      setTimeout(() => {
        window.location.href = '/admin/login'
      }, 500)
    } finally {
      setLoading(false)
    }
  }

  const fetchProperties = async () => {
    setLoadingProperties(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProperties(data || [])
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
    } finally {
      setLoadingProperties(false)
    }
  }

  const handleSubmit = async (propertyData: any): Promise<void> => {
    try {
      // Supprimer les champs qui n'existent pas dans la base de données
      const { photos, type, surface, ...dataWithoutExtras } = propertyData
      
      // Préparer les données pour Supabase en respectant exactement la structure de la table
      const processedData: any = {
        title: propertyData.title,
        price: propertyData.price,
        location: propertyData.location,
        status: propertyData.status || 'À vendre',
        description: propertyData.description || null,
        rooms: propertyData.rooms || null,
        bathrooms: propertyData.bathrooms || null,
        surface_habitable: propertyData.surface_habitable || null,
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
        autres_prestations: propertyData.autres_prestations || null,
        surface_totale: propertyData.surface_totale || null,
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

      if (editingProperty) {
        // Mise à jour
        const { error } = await supabase
          .from('properties')
          .update(processedData)
          .eq('id', editingProperty.id)

        if (error) throw error
      } else {
        // Création
        const { error } = await supabase
          .from('properties')
          .insert([processedData])

        if (error) throw error
      }

      setShowAddForm(false)
      setEditingProperty(null)
      fetchProperties()
    } catch (error: any) {
      console.error('Erreur:', error)
      alert('Erreur: ' + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) return

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error
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
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const fetchMessages = async () => {
    setLoadingMessages(true)
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error: any) {
      console.error('Error fetching messages:', error.message)
    } finally {
      setLoadingMessages(false)
    }
  }

  const toggleMessageRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !currentReadStatus })
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error: any) {
      console.error('Error updating message:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const fetchLeads = async () => {
    setLoadingLeads(true)
    try {
      const { data, error } = await supabase
        .from('analyse_leads')
        .select('*')
        .or('type_demande.is.null,type_demande.eq.analyse')
        .order('created_at', { ascending: false })

      if (error) throw error
      setLeads(data || [])
    } catch (error: any) {
      console.error('Error fetching leads:', error.message)
    } finally {
      setLoadingLeads(false)
    }
  }

  const fetchEstimations = async () => {
    setLoadingEstimations(true)
    try {
      const { data, error } = await supabase
        .from('analyse_leads')
        .select('*')
        .eq('type_demande', 'estimation')
        .order('created_at', { ascending: false })

      if (error) throw error
      setEstimations(data || [])
    } catch (error: any) {
      console.error('Error fetching estimations:', error.message)
    } finally {
      setLoadingEstimations(false)
    }
  }

  const toggleLeadRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('analyse_leads')
        .update({ read: !currentReadStatus })
        .eq('id', id)

      if (error) throw error
      fetchLeads()
    } catch (error: any) {
      console.error('Error updating lead:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateLeadStatus = async (id: string, newStatus: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => {
    try {
      const { error } = await supabase
        .from('analyse_leads')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchLeads()
    } catch (error: any) {
      console.error('Error updating lead status:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateLeadNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('analyse_leads')
        .update({ notes })
        .eq('id', id)

      if (error) throw error
      fetchLeads()
    } catch (error: any) {
      console.error('Error updating lead notes:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lead ?')) return

    try {
      const { error } = await supabase
        .from('analyse_leads')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchLeads()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const toggleEstimationRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('analyse_leads')
        .update({ read: !currentReadStatus })
        .eq('id', id)

      if (error) throw error
      fetchEstimations()
    } catch (error: any) {
      console.error('Error updating estimation:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateEstimationStatus = async (id: string, newStatus: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => {
    try {
      const { error } = await supabase
        .from('analyse_leads')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchEstimations()
    } catch (error: any) {
      console.error('Error updating estimation status:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const updateEstimationNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('analyse_leads')
        .update({ notes })
        .eq('id', id)

      if (error) throw error
      fetchEstimations()
    } catch (error: any) {
      console.error('Error updating estimation notes:', error.message)
      alert('Erreur: ' + error.message)
    }
  }

  const deleteEstimation = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande d\'estimation ?')) return

    try {
      const { error } = await supabase
        .from('analyse_leads')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchEstimations()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
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
                Liste des biens {activeTab === 'vendre' ? 'à vendre' : 'à louer'} ({properties.filter(p => (activeTab === 'vendre' ? p.type === 'À vendre' : p.type === 'À louer')).length})
              </h2>

              {loadingProperties ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
              <p className="text-gray-600">Chargement des biens...</p>
            </div>
              ) : properties.filter(p => activeTab === 'vendre' ? p.type === 'À vendre' : p.type === 'À louer').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun bien {activeTab === 'vendre' ? 'à vendre' : 'à louer'} enregistré pour le moment.</p>
                  <p className="text-sm mt-2">Cliquez sur "Ajouter une annonce" pour commencer.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.filter(p => activeTab === 'vendre' ? p.type === 'À vendre' : p.type === 'À louer').map((property) => (
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
                            {estimation.surface && <p><strong>Surface:</strong> {estimation.surface} m²</p>}
                            {estimation.description_initiale && (
                              <div className="md:col-span-2">
                                <p><strong>Description initiale:</strong></p>
                                <p className="text-gray-700 italic">{estimation.description_initiale}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Section Étape 2 - Caractéristiques */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Étape 2 - Caractéristiques du bien</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                            {estimation.nombre_pieces && <p><strong>Pièces:</strong> {estimation.nombre_pieces}</p>}
                            {estimation.nombre_chambres && <p><strong>Chambres:</strong> {estimation.nombre_chambres}</p>}
                            {estimation.etage && <p><strong>Étage:</strong> {estimation.etage}</p>}
                            {estimation.dernier_etage && <p><strong>Dernier étage:</strong> {estimation.dernier_etage}</p>}
                            {estimation.ascenseur && <p><strong>Ascenseur:</strong> {estimation.ascenseur}</p>}
                            {estimation.stationnement && <p><strong>Stationnement:</strong> {estimation.stationnement}</p>}
                            {estimation.etat_bien && <p><strong>État:</strong> {estimation.etat_bien}</p>}
                            {estimation.exposition && <p><strong>Exposition:</strong> {estimation.exposition}</p>}
                            {estimation.vis_a_vis && <p><strong>Vis-à-vis:</strong> {estimation.vis_a_vis}</p>}
                            {estimation.exterieurs && estimation.exterieurs.length > 0 && (
                              <p><strong>Extérieurs:</strong> {estimation.exterieurs.join(', ')}</p>
                            )}
                            {estimation.prestations && estimation.prestations.length > 0 && (
                              <p><strong>Prestations:</strong> {estimation.prestations.join(', ')}</p>
                            )}
                            {estimation.autres_prestations && (
                              <p><strong>Autres prestations:</strong> {estimation.autres_prestations}</p>
                            )}
                          </div>
                        </div>

                        {/* Section Travaux */}
                        {estimation.travaux_recents && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Travaux récents</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <p><strong>Réalisés:</strong> {estimation.travaux_recents}</p>
                              {estimation.nature_travaux && <p><strong>Nature:</strong> {estimation.nature_travaux}</p>}
                              {estimation.annee_travaux && <p><strong>Année:</strong> {estimation.annee_travaux}</p>}
                            </div>
                          </div>
                        )}

                        {/* Section Projet de vente */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <h4 className="font-semibold mb-2" style={{ color: '#4682B4' }}>Projet de vente</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            {estimation.delai_vente && <p><strong>Délai souhaité:</strong> {estimation.delai_vente}</p>}
                            {estimation.situation_actuelle && <p><strong>Situation:</strong> {estimation.situation_actuelle}</p>}
                            {estimation.prix_envisage && (
                              <p className="md:col-span-2">
                                <strong>Prix envisagé:</strong> <span className="font-semibold text-lg" style={{ color: '#4682B4' }}>{estimation.prix_envisage}</span>
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
