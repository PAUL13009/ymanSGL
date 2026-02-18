'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChange, waitForAuthInit, signOutAdmin, FirebaseUser } from '@/lib/firebase-auth'
import { 
  getAllPropertiesAdmin, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  getAllAnalyseLeads,
  updateAnalyseLead,
  deleteAnalyseLead,
  type AnalyseLeadWithId
} from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'
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

type TabType = 'vendre' | 'louer' | 'estimations' | 'estimations_investisseur' | 'estimations_paris' | 'estimations_juridique'

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

  // ─── Estimation data ────────────────────────────────────
  const [partiellesEssentielle, setPartiellesEssentielle] = useState<AnalyseLeadWithId[]>([])
  const [partiellesInvestisseur, setPartiellesInvestisseur] = useState<AnalyseLeadWithId[]>([])
  const [partiellesParis, setPartiellesParis] = useState<AnalyseLeadWithId[]>([])
  const [partiellesJuridique, setPartiellesJuridique] = useState<AnalyseLeadWithId[]>([])
  const [estimations, setEstimations] = useState<EstimationLead[]>([])
  const [estimationsInvestisseur, setEstimationsInvestisseur] = useState<AnalyseLeadWithId[]>([])
  const [estimationsParis, setEstimationsParis] = useState<AnalyseLeadWithId[]>([])
  const [estimationsJuridique, setEstimationsJuridique] = useState<AnalyseLeadWithId[]>([])
  const [loadingEstimationData, setLoadingEstimationData] = useState(false)
  const estimationDataFetchedRef = useRef(false)

  const router = useRouter()

  // ─── Auth ───────────────────────────────────────────────
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false)
        window.location.href = '/admin/login'
      }
    }, 15000)

    waitForAuthInit().then((currentUser) => {
      clearTimeout(safetyTimeout)
      authInitializedRef.current = true
      if (!currentUser) {
        setLoading(false)
        setTimeout(() => { window.location.href = '/admin/login' }, 500)
      } else {
        setUser(currentUser)
        setLoading(false)
      }
    }).catch(() => {
      clearTimeout(safetyTimeout)
      setLoading(false)
      setTimeout(() => { window.location.href = '/admin/login' }, 500)
    })

    const unsubscribe = onAuthStateChange((currentUser) => {
      if (authInitializedRef.current) {
        if (!currentUser) {
          setUser(null)
          setTimeout(() => { window.location.href = '/admin/login' }, 500)
        } else {
          setUser(currentUser)
        }
      }
    })

    return () => { clearTimeout(safetyTimeout); unsubscribe() }
  }, [router])

  useEffect(() => { if (user) fetchProperties() }, [user])

  const isEstimationTab = activeTab === 'estimations' || activeTab === 'estimations_investisseur' || activeTab === 'estimations_paris' || activeTab === 'estimations_juridique'

  useEffect(() => {
    if (user && isEstimationTab) {
      fetchAllEstimationData()
    }
  }, [user, activeTab])

  // ─── Fetch all estimation data in parallel ──────────────
  const fetchAllEstimationData = async () => {
    setLoadingEstimationData(true)
    try {
      const [partEss, partInv, partPar, partJur, completes, investisseur, paris, juridique] = await Promise.all([
        getAllAnalyseLeads('estimation_partielle_essentielle'),
        getAllAnalyseLeads('estimation_partielle_investisseur'),
        getAllAnalyseLeads('estimation_partielle_paris'),
        getAllAnalyseLeads('estimation_partielle_juridique'),
        getAllAnalyseLeads('estimation'),
        getAllAnalyseLeads('estimation_investisseur'),
        getAllAnalyseLeads('estimation_paris'),
        getAllAnalyseLeads('estimation_juridique'),
      ])
      // Aussi récupérer les anciennes partielles génériques (rétrocompatibilité)
      const oldPartielles = await getAllAnalyseLeads('estimation_partielle')
      setPartiellesEssentielle([...partEss, ...oldPartielles])
      setPartiellesInvestisseur(partInv)
      setPartiellesParis(partPar)
      setPartiellesJuridique(partJur)
      setEstimations(completes as EstimationLead[])
      setEstimationsInvestisseur(investisseur)
      setEstimationsParis(paris)
      setEstimationsJuridique(juridique)
      estimationDataFetchedRef.current = true
    } catch (error: any) {
      console.error('Error fetching estimation data:', error.message)
    } finally {
      setLoadingEstimationData(false)
    }
  }

  // ─── Computed: orphan partielles per type ───────────────
  const orphanPartiellesEssentielle = useMemo(() => {
    const completesEmails = new Set(estimations.map(e => (e.email || '').toLowerCase().trim()).filter(Boolean))
    return partiellesEssentielle.filter(p => !completesEmails.has((p.email || '').toLowerCase().trim()))
  }, [partiellesEssentielle, estimations])

  const orphanPartiellesInvestisseur = useMemo(() => {
    const completesEmails = new Set(estimationsInvestisseur.map(e => (e.email || '').toLowerCase().trim()).filter(Boolean))
    return partiellesInvestisseur.filter(p => !completesEmails.has((p.email || '').toLowerCase().trim()))
  }, [partiellesInvestisseur, estimationsInvestisseur])

  const orphanPartiellesParis = useMemo(() => {
    const completesEmails = new Set(estimationsParis.map(e => (e.email || '').toLowerCase().trim()).filter(Boolean))
    return partiellesParis.filter(p => !completesEmails.has((p.email || '').toLowerCase().trim()))
  }, [partiellesParis, estimationsParis])

  const orphanPartiellesJuridique = useMemo(() => {
    const completesEmails = new Set(estimationsJuridique.map(e => (e.email || '').toLowerCase().trim()).filter(Boolean))
    return partiellesJuridique.filter(p => !completesEmails.has((p.email || '').toLowerCase().trim()))
  }, [partiellesJuridique, estimationsJuridique])

  // ─── Properties ─────────────────────────────────────────
  const fetchProperties = async () => {
    setLoadingProperties(true)
    try {
      const data = await getAllPropertiesAdmin()
      setProperties(data || [])
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
    } finally {
      setLoadingProperties(false)
    }
  }

  const handleSubmit = async (propertyData: any): Promise<void> => {
    try {
      if (!user) throw new Error('Vous devez être connecté pour publier une annonce')
      if (!propertyData.title || !propertyData.price || !propertyData.location) {
        throw new Error('Veuillez remplir tous les champs obligatoires (Titre, Prix, Localisation)')
      }

      const statusValue = propertyData.status || 'À vendre'
      const processedData: any = {
        title: propertyData.title.trim(),
        price: propertyData.price.trim(),
        location: propertyData.location.trim(),
        status: statusValue,
        type: statusValue,
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

      Object.keys(processedData).forEach(key => {
        if (processedData[key] === null || processedData[key] === undefined || processedData[key] === '') {
          if (typeof processedData[key] !== 'boolean') delete processedData[key]
        }
      })

      if (editingProperty) {
        await updateProperty(editingProperty.id, processedData)
        alert('Annonce mise à jour avec succès !')
      } else {
        await createProperty(processedData)
        alert('Annonce publiée avec succès !')
      }

      setShowAddForm(false)
      setEditingProperty(null)
      setTimeout(async () => { await fetchProperties() }, 1000)
    } catch (error: any) {
      let errorMessage = 'Erreur lors de la publication de l\'annonce'
      if (error.code === 'permission-denied') errorMessage = 'Erreur d\'authentification. Veuillez vous reconnecter.'
      else if (error.message) errorMessage = error.message
      alert(errorMessage)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) return
    try { await deleteProperty(id); fetchProperties() } catch (error: any) { alert('Erreur: ' + error.message) }
  }

  const handleEdit = (property: Property) => { setEditingProperty(property); setShowAddForm(true) }

  const handleLogout = async () => {
    try { await signOutAdmin(); router.push('/admin/login'); router.refresh() }
    catch { router.push('/admin/login') }
  }

  // ─── Estimation CRUD actions ────────────────────────────
  const togglePartielleRead = async (id: string, read: boolean) => {
    try { await updateAnalyseLead(id, { read: !read }); fetchAllEstimationData() }
    catch (error: any) { alert('Erreur: ' + error.message) }
  }
  const deletePartielle = async (id: string) => {
    if (!confirm('Supprimer cette demande partielle ?')) return
    try { await deleteAnalyseLead(id); fetchAllEstimationData() }
    catch (error: any) { alert('Erreur: ' + error.message) }
  }

  const toggleEstimationRead = async (id: string, read: boolean) => {
    try { await updateAnalyseLead(id, { read: !read }); fetchAllEstimationData() }
    catch (error: any) { alert('Erreur: ' + error.message) }
  }
  const updateEstimationStatus = async (id: string, newStatus: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => {
    try { await updateAnalyseLead(id, { status: newStatus }); fetchAllEstimationData() }
    catch (error: any) { alert('Erreur: ' + error.message) }
  }
  const updateEstimationNotes = async (id: string, notes: string) => {
    try { await updateAnalyseLead(id, { notes }); fetchAllEstimationData() }
    catch (error: any) { alert('Erreur: ' + error.message) }
  }
  const deleteEstimation = async (id: string) => {
    if (!confirm('Supprimer cette estimation ?')) return
    try { await deleteAnalyseLead(id); fetchAllEstimationData() }
    catch (error: any) { alert('Erreur: ' + error.message) }
  }

  // ─── Helpers ────────────────────────────────────────────
  const formatDate = (dateInput: string | Date | Timestamp | undefined | null): string => {
    if (!dateInput) return 'Date non disponible'
    let date: Date
    if (dateInput instanceof Date) date = dateInput
    else if (dateInput && typeof dateInput === 'object' && 'toDate' in dateInput && typeof (dateInput as Timestamp).toDate === 'function') date = (dateInput as Timestamp).toDate()
    else if (typeof dateInput === 'string') date = new Date(dateInput)
    else return 'Date invalide'
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date)
  }

  const f = { fontFamily: 'var(--font-poppins), sans-serif' }

  // ─── Loading ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/50" style={f}>Chargement...</p>
        </div>
      </div>
    )
  }

  // ─── Tab config ─────────────────────────────────────────
  const tabs: { key: TabType; label: string; shortLabel: string; count?: number }[] = [
    { key: 'vendre', label: 'Vendre', shortLabel: 'Vendre' },
    { key: 'louer', label: 'Louer', shortLabel: 'Louer' },
    { key: 'estimations', label: 'Essentielle', shortLabel: 'Ess.', count: estimations.filter(e => !e.read).length },
    { key: 'estimations_investisseur', label: 'Investisseur', shortLabel: 'Invest.', count: estimationsInvestisseur.filter(e => !e.read).length },
    { key: 'estimations_paris', label: 'Paris', shortLabel: 'Paris', count: estimationsParis.filter(e => !e.read).length },
    { key: 'estimations_juridique', label: 'Activités juridiques', shortLabel: 'Jurid.', count: estimationsJuridique.filter(e => !e.read).length },
  ]

  // ─── Reusable: Partielle card ───────────────────────────
  const PartielleCard = ({ ep }: { ep: AnalyseLeadWithId }) => (
    <div className={`border rounded-xl p-3 sm:p-4 transition-all ${ep.read ? 'bg-white/5 border-white/10' : 'bg-orange-500/10 border-orange-500/30'}`}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <h3 className="text-sm sm:text-base font-semibold text-white truncate" style={f}>{ep.prenom} {ep.nom}</h3>
        {!ep.read && <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-semibold rounded-full shrink-0">Nouveau</span>}
      </div>
      <div className="space-y-0.5 text-xs sm:text-sm text-white/50 mb-3" style={f}>
        <p className="truncate"><strong className="text-white/70">Email:</strong> {ep.email}</p>
        <p><strong className="text-white/70">Tél:</strong> {ep.telephone}</p>
        <p className="text-[10px] sm:text-xs text-white/30">{formatDate(ep.created_at)}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => togglePartielleRead(ep.id, ep.read ?? false)} className={`flex-1 px-2 py-1.5 rounded text-xs transition-all ${ep.read ? 'bg-white/10 text-white/50 hover:bg-white/20' : 'bg-white text-black hover:bg-white/90'}`} style={f}>{ep.read ? 'Non lu' : 'Marquer lu'}</button>
        <button onClick={() => deletePartielle(ep.id)} className="px-2 py-1.5 border border-red-500/50 text-red-400 rounded text-xs hover:bg-red-500/10 transition-all" style={f}>Suppr.</button>
      </div>
    </div>
  )

  // ─── Reusable: Complete estimation card ─────────────────
  const CompleteCard = ({ estimation, accentColor = 'white' }: { estimation: EstimationLead; accentColor?: string }) => {
    const bgUnread = accentColor === 'purple' ? 'bg-purple-500/10 border-purple-500/30' :
                     accentColor === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30' :
                     accentColor === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
                     'bg-white/10 border-white/20'
    const badgeBg = accentColor === 'purple' ? 'bg-purple-500' :
                    accentColor === 'emerald' ? 'bg-emerald-500' :
                    accentColor === 'amber' ? 'bg-amber-500' :
                    'bg-white'
    const badgeText = accentColor === 'white' ? 'text-black' : 'text-white'

    return (
      <div className={`border rounded-xl p-3 sm:p-5 transition-all ${estimation.read ? 'bg-white/5 border-white/10' : bgUnread}`}>
        {/* Header: nom + badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <h3 className="text-sm sm:text-lg font-semibold text-white" style={f}>{estimation.prenom} {estimation.nom}</h3>
          {!estimation.read && <span className={`px-2 py-0.5 ${badgeBg} ${badgeText} text-[10px] sm:text-xs font-semibold rounded-full`}>Nouveau</span>}
          <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full ${
            estimation.status === 'nouveau' ? 'bg-white/10 text-white/50' :
            estimation.status === 'en_cours' ? 'bg-yellow-500/20 text-yellow-300' :
            estimation.status === 'accepte' ? 'bg-green-500/20 text-green-300' :
            'bg-red-500/20 text-red-300'
          }`}>{estimation.status === 'nouveau' ? 'Nouveau' : estimation.status === 'en_cours' ? 'En cours' : estimation.status === 'accepte' ? 'Accepté' : 'Refusé'}</span>
        </div>

        {/* Coordonnées */}
        <div className="mb-3 pb-3 border-b border-white/10">
          <h4 className="font-semibold mb-1 text-white/70 text-[10px] sm:text-xs uppercase tracking-wide" style={f}>Coordonnées</h4>
          <div className="space-y-0.5 text-xs sm:text-sm text-white/50" style={f}>
            <p className="truncate"><strong className="text-white/70">Email:</strong> {estimation.email}</p>
            <p><strong className="text-white/70">Tél:</strong> {estimation.telephone}</p>
            {estimation.nom_dossier && <p><strong className="text-white/70">Dossier:</strong> <span className="text-amber-400 font-medium">{estimation.nom_dossier}</span></p>}
            <p className="text-[10px] sm:text-xs text-white/30">{formatDate(estimation.created_at)}</p>
          </div>
        </div>

        {/* Bien */}
        {(estimation.localisation || estimation.type_bien) && (
          <div className="mb-3 pb-3 border-b border-white/10">
            <h4 className="font-semibold mb-1 text-white/70 text-[10px] sm:text-xs uppercase tracking-wide" style={f}>Bien</h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs sm:text-sm text-white/50" style={f}>
              {estimation.localisation && <p className="col-span-2 truncate"><strong className="text-white/70">Localisation:</strong> {estimation.localisation}</p>}
              {estimation.ville && <p><strong className="text-white/70">Ville:</strong> {estimation.ville}</p>}
              {estimation.type_bien && <p><strong className="text-white/70">Type:</strong> {estimation.type_bien}</p>}
              {estimation.surface && <p><strong className="text-white/70">Surface:</strong> {estimation.surface} m²</p>}
              {estimation.surface_terrain && <p><strong className="text-white/70">Terrain:</strong> {estimation.surface_terrain} m²</p>}
              {estimation.annee_construction && <p><strong className="text-white/70">Année:</strong> {estimation.annee_construction}</p>}
              {estimation.residence_type && <p><strong className="text-white/70">Usage:</strong> {estimation.residence_type}</p>}
            </div>
          </div>
        )}

        {/* Caractéristiques */}
        {(estimation.nombre_pieces || estimation.nombre_chambres || estimation.nombre_salles_de_bain || estimation.etat_bien || estimation.exposition) && (
          <div className="mb-3 pb-3 border-b border-white/10">
            <h4 className="font-semibold mb-1 text-white/70 text-[10px] sm:text-xs uppercase tracking-wide" style={f}>Caractéristiques</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-0.5 text-xs sm:text-sm text-white/50" style={f}>
              {estimation.nombre_pieces && <p><strong className="text-white/70">Pièces:</strong> {estimation.nombre_pieces}</p>}
              {estimation.nombre_chambres && <p><strong className="text-white/70">Chambres:</strong> {estimation.nombre_chambres}</p>}
              {estimation.nombre_salles_de_bain && <p><strong className="text-white/70">SDB:</strong> {estimation.nombre_salles_de_bain}</p>}
              {estimation.etage !== null && estimation.etage !== undefined && <p><strong className="text-white/70">Étage:</strong> {estimation.etage}</p>}
              {estimation.etat_bien && <p><strong className="text-white/70">État:</strong> {estimation.etat_bien}</p>}
              {estimation.exposition && <p><strong className="text-white/70">Expo:</strong> {estimation.exposition}</p>}
              {estimation.stationnement && <p><strong className="text-white/70">Parking:</strong> {estimation.stationnement}</p>}
              {estimation.exterieurs && estimation.exterieurs.length > 0 && <p className="col-span-2 sm:col-span-3"><strong className="text-white/70">Ext.:</strong> {estimation.exterieurs.join(', ')}</p>}
              {estimation.prestations && estimation.prestations.length > 0 && <p className="col-span-2 sm:col-span-3"><strong className="text-white/70">Presta.:</strong> {estimation.prestations.join(', ')}</p>}
              {estimation.dpe && <p><strong className="text-white/70">DPE:</strong> {estimation.dpe}</p>}
              {estimation.classe_ges && <p><strong className="text-white/70">GES:</strong> {estimation.classe_ges}</p>}
              {estimation.standing && <p><strong className="text-white/70">Standing:</strong> {estimation.standing}</p>}
              {estimation.chauffage_type && <p><strong className="text-white/70">Chauffage:</strong> {estimation.chauffage_type}</p>}
              {estimation.mitoyennete && <p><strong className="text-white/70">Mitoyenneté:</strong> {estimation.mitoyennete}</p>}
              {estimation.vue && <p><strong className="text-white/70">Vue:</strong> {estimation.vue}</p>}
              {estimation.luminosite && <p><strong className="text-white/70">Luminosité:</strong> {estimation.luminosite}/10</p>}
              {estimation.luminosite_cour_uniquement && <p><strong className="text-white/70">Lum. cour:</strong> {estimation.luminosite_cour_uniquement}</p>}
              {estimation.perte_surface_couloir && <p><strong className="text-white/70">Perte surf. couloir:</strong> {estimation.perte_surface_couloir}</p>}
              {estimation.immeuble_classe && <p><strong className="text-white/70">Immeuble classé:</strong> {estimation.immeuble_classe}</p>}
              {estimation.destination_lot && <p><strong className="text-white/70">Dest. lot:</strong> {estimation.destination_lot}</p>}
              {estimation.ancien_local_commercial && <p><strong className="text-white/70">Ancien local commercial:</strong> {estimation.ancien_local_commercial}</p>}
              {estimation.changement_usage && <p><strong className="text-white/70">Changement usage:</strong> {estimation.changement_usage}</p>}
              {estimation.bien_ancien_lot && <p><strong className="text-white/70">Ancien lot:</strong> {estimation.bien_ancien_lot}</p>}
              {estimation.travaux_energetiques && <p><strong className="text-white/70">Travaux énergétiques:</strong> {estimation.travaux_energetiques}</p>}
              {estimation.loyer_encadrement && <p><strong className="text-white/70">Encadrement loyer:</strong> {estimation.loyer_encadrement}</p>}
              {estimation.complement_loyer && <p><strong className="text-white/70">Complément loyer:</strong> {estimation.complement_loyer}</p>}
              {estimation.nuisances_patrimoine && estimation.nuisances_patrimoine.length > 0 && <p className="col-span-2 sm:col-span-3"><strong className="text-white/70">Nuisances:</strong> {estimation.nuisances_patrimoine.join(', ')}</p>}
            </div>
          </div>
        )}

        {/* Projet de vente */}
        {(estimation.delai_vente || estimation.prix_envisage || estimation.contexte_vente) && (
          <div className="mb-3 pb-3 border-b border-white/10">
            <h4 className="font-semibold mb-1 text-white/70 text-[10px] sm:text-xs uppercase tracking-wide" style={f}>Projet de vente</h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs sm:text-sm text-white/50" style={f}>
              {estimation.delai_vente && <p><strong className="text-white/70">Délai:</strong> {estimation.delai_vente}</p>}
              {estimation.situation_actuelle && <p><strong className="text-white/70">Situation:</strong> {estimation.situation_actuelle}</p>}
              {estimation.contexte_vente && <p className="col-span-2"><strong className="text-white/70">Contexte:</strong> {estimation.contexte_vente}</p>}
              {estimation.profession_juridique && <p><strong className="text-white/70">Profession:</strong> <span className="text-amber-400">{estimation.profession_juridique}</span></p>}
              {estimation.raison_demande_juridique && <p className="col-span-2"><strong className="text-white/70">Raison:</strong> {estimation.raison_demande_juridique}</p>}
              {estimation.type_bail && <p><strong className="text-white/70">Bail:</strong> {estimation.type_bail}</p>}
              {estimation.prix_envisage && <p className="col-span-2"><strong className="text-white/70">Prix:</strong> <span className="text-white font-semibold">{estimation.prix_envisage}</span></p>}
              {estimation.ajustement_prix_echelle !== null && estimation.ajustement_prix_echelle !== undefined && <p><strong className="text-white/70">Ajust.:</strong> {estimation.ajustement_prix_echelle}/10</p>}
            </div>
          </div>
        )}

        {/* Message libre */}
        {estimation.message_libre && (
          <div className="mb-3 pb-3 border-b border-white/10">
            <h4 className="font-semibold mb-1 text-white/70 text-[10px] sm:text-xs uppercase tracking-wide" style={f}>Message</h4>
            <p className="text-xs sm:text-sm text-white/50 italic" style={f}>{estimation.message_libre}</p>
          </div>
        )}

        {/* Photos */}
        {estimation.photos_urls && estimation.photos_urls.length > 0 && (
          <div className="mb-3 pb-3 border-b border-white/10">
            <h4 className="font-semibold mb-2 text-white/70 text-[10px] sm:text-xs uppercase tracking-wide" style={f}>Photos ({estimation.photos_urls.length})</h4>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {estimation.photos_urls.map((photoUrl, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                  <img src={photoUrl} alt={`Photo ${index + 1}`} className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.open(photoUrl, '_blank')} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="pt-2">
          <textarea
            value={estimation.notes || ''}
            onChange={(e) => updateEstimationNotes(estimation.id, e.target.value)}
            className="w-full p-2 sm:p-2.5 border border-white/20 rounded-lg text-xs sm:text-sm bg-white/5 text-white placeholder-white/30 focus:ring-1 focus:ring-white/30 focus:border-transparent resize-none"
            style={f}
            rows={2}
            placeholder="Notes..."
          />
        </div>

        {/* Actions — en bas de la carte, responsive */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
          <button onClick={() => toggleEstimationRead(estimation.id, estimation.read ?? false)} className={`flex-1 px-2 py-1.5 rounded text-xs transition-all ${estimation.read ? 'bg-white/10 text-white/50 hover:bg-white/20' : 'bg-white text-black hover:bg-white/90'}`} style={f}>{estimation.read ? 'Non lu' : 'Marquer lu'}</button>
          <select value={estimation.status} onChange={(e) => updateEstimationStatus(estimation.id, e.target.value as any)} className="flex-1 px-2 py-1.5 rounded text-xs border border-white/20 bg-white/5 text-white" style={f}>
            <option value="nouveau" className="bg-black">Nouveau</option>
            <option value="en_cours" className="bg-black">En cours</option>
            <option value="accepte" className="bg-black">Accepté</option>
            <option value="refuse" className="bg-black">Refusé</option>
          </select>
          <button onClick={() => deleteEstimation(estimation.id)} className="px-3 py-1.5 border border-red-500/50 text-red-400 rounded text-xs hover:bg-red-500/10 transition-all" style={f}>Suppr.</button>
        </div>
      </div>
    )
  }

  // ─── Reusable: Two-column estimation layout ─────────────
  const EstimationTabContent = ({ completes, partielles, accentColor }: { completes: EstimationLead[]; partielles: AnalyseLeadWithId[]; accentColor: string }) => {
    const unreadPartielles = partielles.filter(p => !p.read).length
    const unreadCompletes = completes.filter(c => !c.read).length

    if (loadingEstimationData) {
      return (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/40" style={f}>Chargement...</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* ── Colonne gauche : Partielles ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm sm:text-lg font-bold text-white uppercase tracking-wide" style={f}>Partielle</h3>
            {unreadPartielles > 0 && (
              <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] sm:text-xs font-semibold rounded-full">{unreadPartielles}</span>
            )}
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 min-h-[160px]">
            {partielles.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-white/20 text-xs sm:text-sm" style={f}>
                <p>Aucune estimation partielle</p>
              </div>
            ) : (
              <div className="space-y-3">
                {partielles.map((ep) => (
                  <PartielleCard key={ep.id} ep={ep} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Colonne droite : Complètes ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm sm:text-lg font-bold text-white uppercase tracking-wide" style={f}>Complète</h3>
            {unreadCompletes > 0 && (
              <span className={`px-2 py-0.5 text-white text-[10px] sm:text-xs font-semibold rounded-full ${
                accentColor === 'purple' ? 'bg-purple-500' :
                accentColor === 'emerald' ? 'bg-emerald-500' :
                'bg-white/70'
              }`}>{unreadCompletes}</span>
            )}
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 min-h-[160px]">
            {completes.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-white/20 text-xs sm:text-sm" style={f}>
                <p>Aucune estimation complète</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completes.map((estimation) => (
                  <CompleteCard key={estimation.id} estimation={estimation} accentColor={accentColor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-black px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="max-w-[1600px] mx-auto">

        {/* ═══ Header ═══ */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl font-bold text-white uppercase tracking-wide" style={f}>
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none" style={f}>{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition-all text-xs sm:text-sm shrink-0"
              style={f}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* ═══ Tabs ═══ */}
        <div className="mb-5 sm:mb-8 border-b border-white/10 overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          <div className="flex">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setShowAddForm(false); setEditingProperty(null) }}
                className={`px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === t.key
                    ? 'border-white text-white'
                    : 'border-transparent text-white/40 hover:text-white/70'
                }`}
                style={f}
              >
                <span className="sm:hidden">{t.shortLabel}</span>
                <span className="hidden sm:inline">{t.label}</span>
                {t.count !== undefined && t.count > 0 ? ` (${t.count})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* VENDRE / LOUER                                        */}
        {/* ═══════════════════════════════════════════════════════ */}
        {(activeTab === 'vendre' || activeTab === 'louer') && (
          <>
            {!showAddForm && (
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={() => { setShowAddForm(true); setEditingProperty(null) }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all uppercase tracking-wide text-xs sm:text-sm"
                  style={f}
                >
                  + Ajouter une annonce
                </button>
              </div>
            )}

            {showAddForm && (
              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wide" style={f}>
                    {editingProperty ? 'Modifier' : `Nouvelle - ${activeTab === 'vendre' ? 'Vente' : 'Location'}`}
                  </h2>
                  <button onClick={() => { setShowAddForm(false); setEditingProperty(null) }} className="text-white/40 hover:text-white text-xl sm:text-2xl">✕</button>
                </div>
                <PropertyForm
                  onSubmit={async (data) => { await handleSubmit({ ...data, status: activeTab === 'vendre' ? 'À vendre' : 'À louer' }) }}
                  onCancel={() => { setShowAddForm(false); setEditingProperty(null) }}
                  initialData={editingProperty ? { ...editingProperty, status: activeTab === 'vendre' ? 'À vendre' : 'À louer' } : undefined}
                />
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wide mb-4 sm:mb-6" style={f}>
                {activeTab === 'vendre' ? 'À vendre' : 'À louer'} ({properties.filter(p => {
                  const s = p.type || p.status || ''
                  return activeTab === 'vendre' ? s === 'À vendre' : s === 'À louer'
                }).length})
              </h2>

              {loadingProperties ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white/40 text-sm" style={f}>Chargement...</p>
                </div>
              ) : properties.filter(p => {
                const s = p.type || p.status || ''
                return activeTab === 'vendre' ? s === 'À vendre' : s === 'À louer'
              }).length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-white/30 text-sm" style={f}>
                  <p>Aucun bien pour le moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {properties.filter(p => {
                    const s = p.type || p.status || ''
                    return activeTab === 'vendre' ? s === 'À vendre' : s === 'À louer'
                  }).map((property) => (
                    <div key={property.id} className="border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all bg-white/5">
                      {property.images && property.images.length > 0 && property.images[0].src && (
                        <div className="relative h-36 sm:h-48 w-full">
                          <Image src={property.images[0].src} alt={property.images[0].alt || property.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <h3 className="font-semibold text-sm sm:text-lg text-white truncate mr-2" style={f}>{property.title}</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-white/10 text-white/70 shrink-0">{property.type}</span>
                        </div>
                        <p className="text-white/40 text-xs sm:text-sm mb-1 sm:mb-2 truncate" style={f}>{property.location}</p>
                        <p className="font-semibold text-sm sm:text-lg mb-2 sm:mb-3 text-white" style={f}>{property.price}</p>
                        <div className="flex gap-3 text-xs sm:text-sm text-white/40 mb-3 sm:mb-4" style={f}>
                          <span>{property.surface} m²</span>
                          <span>{property.rooms} ch.</span>
                          <span>{property.bathrooms} SDB</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(property)} className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all text-xs sm:text-sm font-medium" style={f}>Modifier</button>
                          <button onClick={() => handleDelete(property.id)} className="px-3 py-1.5 sm:px-4 sm:py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-all text-xs sm:text-sm" style={f}>Suppr.</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ESTIMATION ESSENTIELLE                                 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === 'estimations' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wide" style={f}>Essentielle</h2>
              <button onClick={fetchAllEstimationData} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 transition-all text-xs sm:text-sm" style={f}>Actualiser</button>
            </div>
            <EstimationTabContent completes={estimations} partielles={orphanPartiellesEssentielle} accentColor="white" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ESTIMATION INVESTISSEUR                                */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === 'estimations_investisseur' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wide" style={f}>Investisseur</h2>
              <button onClick={fetchAllEstimationData} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 transition-all text-xs sm:text-sm" style={f}>Actualiser</button>
            </div>
            <EstimationTabContent completes={estimationsInvestisseur} partielles={orphanPartiellesInvestisseur} accentColor="purple" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ESTIMATION PARIS                                       */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === 'estimations_paris' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wide" style={f}>Paris</h2>
              <button onClick={fetchAllEstimationData} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 transition-all text-xs sm:text-sm" style={f}>Actualiser</button>
            </div>
            <EstimationTabContent completes={estimationsParis} partielles={orphanPartiellesParis} accentColor="emerald" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ESTIMATION ACTIVITÉS JURIDIQUES                        */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === 'estimations_juridique' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wide" style={f}>Activités juridiques</h2>
              <button onClick={fetchAllEstimationData} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 transition-all text-xs sm:text-sm" style={f}>Actualiser</button>
            </div>
            <EstimationTabContent completes={estimationsJuridique} partielles={orphanPartiellesJuridique} accentColor="amber" />
          </div>
        )}

      </div>
    </div>
  )
}
