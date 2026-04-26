'use client'

import React, { useState, useEffect, useRef, Component, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createAnalyseLead, uploadEstimationPhotos } from '@/lib/firebase-admin'

const CODES_POSTAUX_ZONE_ESSENTIEL = ['92100', '92210', '92200', '78100', '78230', '78110', '78000', '78370', '78450', '78860', '78160']

const PRESTATIONS_EXTERIEURES_MAISON_OPTIONS = [
  'Terrasse : plain-pied ou surélevée et bois, carrelée, pierre',
  'Cour / Patio',
  'Jardin paysagé et arboré : oui',
  'Jardin paysagé et arboré : non',
  'Forage / puits fonctionnels : oui',
  'Forage / puits fonctionnels : non',
  'Pergola / tonnelle',
  'Cuisine d\'été',
  'Bassin / fontaine',
  'Aucun',
  'Autre à préciser',
] as const

const MAISON_AIRE_NON_COUVERTE_SOL_OPTIONS = [
  'Gravier',
  'Gravier stabilisé',
  'Béton',
  'Enrobé',
  'Pavés',
  'Dalles',
  'Terrain brut',
] as const

const MAISON_STATIONNEMENT_EXTERIEUR_OPTIONS = [
  'Aire de stationnement commune',
  'Allée de stationnement',
  'Parking privatif extérieur',
] as const

const MAISON_TYPE_CLOTURE_OPTIONS = [
  'Clôture grillagée',
  'Mur plein / muret + grillage',
  'Haie végétale',
  'Mixte (mur + haie + grillage)',
] as const

const MAISON_SYSTEME_ACCES_OPTIONS = ['Digicode', 'Interphone', 'Visiophone'] as const

const MAISON_ETAT_EXTERIEUR_ENVELOPPE_OPTIONS = [
  'Excellent état',
  'Très bon état',
  'Bon état',
  'À rafraîchir',
  'À rénover',
  'À rénover entièrement',
] as const

const MAISON_ANNEXES_INTERIEURES_OPTIONS = [
  'Cave',
  'Cellier',
  'Loggia fermée ou non',
  'Aucun',
  'Autre à préciser',
] as const

const MAISON_POTENTIEL_PARTICULIER_OPTIONS = [
  'Division',
  'Surélévation',
  'Extension',
  "Changement d'usage",
  'À vérifier',
  'Aucun',
] as const

const MAISON_OUI_NON_NE = [
  { value: 'oui', label: 'Oui' },
  { value: 'non', label: 'Non' },
  { value: 'ne_sais_pas', label: 'Je ne sais pas' },
] as const

const MAISON_URB_TYPE_OPTIONS = [
  { value: 'declaration_prealable', label: 'Déclaration préalable' },
  { value: 'permis', label: 'Permis de construire' },
  { value: 'autre', label: 'Autre' },
  { value: 'ne_sais_pas', label: 'Je ne sais pas' },
] as const

function maisonTriStateLabel(v: string): string | null {
  if (!v) return null
  const o = MAISON_OUI_NON_NE.find((x) => x.value === v)
  return o?.label ?? null
}

function maisonUrbTypeLabel(v: string): string | null {
  const o = MAISON_URB_TYPE_OPTIONS.find((x) => x.value === v)
  return o?.label ?? null
}

class EstimationFormErrorBoundary extends Component<{ children: ReactNode }, { message?: string }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { message: undefined }
  }

  static getDerivedStateFromError(err: unknown) {
    return { message: err instanceof Error ? err.message : String(err) }
  }

  componentDidCatch(err: unknown) {
    console.error('Estimation etape-2 render error:', err)
  }

  render() {
    if (this.state.message) {
      return (
        <main
          style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            color: '#fff',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Impossible d&apos;afficher le formulaire</h1>
          <p style={{ color: '#fca5a5', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{this.state.message}</p>
          <p style={{ color: '#999', marginBottom: '1rem' }}>Rechargez la page ou repassez par l&apos;étape 1.</p>
          <a href="/estimation/formulaire" style={{ color: '#93c5fd', textDecoration: 'underline' }}>
            Retour étape 1
          </a>
        </main>
      )
    }
    return this.props.children
  }
}

type SessionInitStatus = 'checking' | 'ready' | 'missing'

export default function EstimationEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [sessionInitStatus, setSessionInitStatus] = useState<SessionInitStatus>('checking')
  const [formData, setFormData] = useState({
    // Localisation
    localisation: '',
    ville: '',
    codePostal: '',
    // Type de bien
    typeBien: '',
    typeBienSousCategorie: '',
    // Surface
    surface: '',
    surfaceCarrez: '',
    surfaceSolTotale: '',
    surfaceTerrain: '',
    // Composition
    nombrePieces: '',
    nombreChambres: '',
    nombreSallesDeBain: '',
    nombreSallesDEau: '',
    nombreWC: '',
    wcSepares: '',
    nombreNiveaux: '',
    // Étage & accès
    etage: '',
    nombreEtagesImmeuble: '',
    dernierEtage: '',
    rooftopOuiNon: '',
    rdcOuiNon: '',
    ascenseur: '',
    // Extérieurs
    exterieur: [] as string[],
    surfaceExterieur: '',
    balconM2: '',
    terrasseM2: '',
    loggiaM2: '',
    rezDeJardinM2: '',
    caveM2: '',
    // Stationnement
    stationnement: '',
    stationnementType: '', // intérieur / extérieur
    stationnementEmplacement: '',
    stationnementExtPriveLibre: '', // privé / libre (si extérieur)
    stationnementCouvert: '',
    stationnementFerme: '',
    surfaceStationnement: '',
    maisonStationnementLieu: '',
    maisonGarageIndepOuiNon: '',
    maisonGarageIndepFormat: '',
    maisonGarageSousSol: '',
    maisonAuvent: '',
    maisonAireNonCouverte: '',
    maisonAireNonCouverteSol: '',
    maisonStationnementExterieur: [] as string[],
    maisonTerrainClos: '',
    maisonTypeCloture: '',
    maisonPortail: '',
    maisonTypePortail: '',
    maisonSystemeAcces: [] as string[],
    maisonAlarme: '',
    maisonCameras: '',
    maisonEclairageExterieur: '',
    maisonEclairageExterieurPreciser: '',
    maisonPerimetreAutre: '',
    hasBox: '',
    // Bloc sous photos : extérieurs / annexes / stationnement (synthèse)
    mesExterieurs: [] as string[],
    mesExterieursAutre: '',
    mesExterieursSuperficie: '',
    prestationsExterieuresMaison: [] as string[],
    prestationsExterieuresMaisonAutre: '',
    annexeLoggiaFermee: '',
    annexeCellier: '',
    annexeCave: '',
    annexeLocalVelo: '',
    annexesAucunActif: false,
    annexesAutreDetail: '',
    parkingBlocType: '',
    parkingBlocInterieurBoxFerme: '',
    parkingBlocExtPriveLibre: '',
    parkingBlocExtCouvert: '',
    parkingBlocAutre: '',
    // État général
    etatBien: '',
    distributionLogement: '',
    // Extensions & dépendances (Maison — remplace distribution du logement)
    maisonVerandaPresent: '',
    maisonVerandaSuperficie: '',
    maisonVerandaChauffee: '',
    maisonVerandaNature: '',
    maisonVerandaUsage: '',
    maisonVerandaUrbObtenue: '',
    maisonVerandaUrbType: '',
    maisonVerandaUrbTypeAutre: '',
    maisonVerandaUrbTravauxConformes: '',
    maisonVerandaUrbRegularisee: '',
    maisonExtensionPresent: '',
    maisonExtensionSuperficie: '',
    maisonExtensionChauffee: '',
    maisonExtensionNature: '',
    maisonExtensionUsage: '',
    maisonExtensionUrbObtenue: '',
    maisonExtensionUrbType: '',
    maisonExtensionUrbTypeAutre: '',
    maisonExtensionUrbTravauxConformes: '',
    maisonExtensionUrbRegularisee: '',
    maisonDependancePresent: '',
    maisonDependanceNombre: '',
    maisonDependanceSuperficie: '',
    maisonDependanceNature: '',
    maisonDependanceUsage: '',
    maisonDependanceAutorisationUrb: '',
    // Travaux récents
    travauxRecents: '',
    natureTravaux: '',
    anneeTravaux: '',
    montantTravaux: '',
    // Travaux prévus
    travauxPrevus: '',
    natureTravauxPrevus: '',
    budgetTravauxPrevus: '',
    dateTravauxPrevus: '',
    // Exposition (plusieurs réponses possibles)
    exposition: [] as string[],
    // Vis-à-vis
    visAVis: '',
    distanceVisAVis: '',
    // Charges & DPE
    taxeFonciere: '',
    chargesCopro: '',
    dpe: '',
    // Contexte
    contexteVente: [] as string[],
    contexteVenteAutre: '',
    nomSuccession: '',
    // Délai de vente
    delaiVente: '',
    // Situation actuelle
    situationActuelle: '',
    typeLocation: '',
    loyerMensuel: '',
    // Prix envisagé
    prixEnvisage: '',
    // Ajustement prix
    ajustementPrix: '5',
    // Description / Message libre
    description: '',
    messageLibre: '',
    // Mitoyenneté & Vue
    mitoyennete: '',
    // Configuration maison
    maisonType: '',
    maisonEnsembleOrganise: '',
    procedureEnCoursMaison: '',
    sousSolTotalM2: '',
    sousSolAmenageM2: '',
    comblesM2: '',
    comblesAmenageesM2: '',
    studioDependancesM2: '',
    foragePuits: '',
    // Prestations intérieures maison
    prestationsInterieuresMaison: [] as string[],
    prestationsInterieuresMaisonAutres: '',
    // Copropriété horizontale (si maison)
    nombreLotsCoproHorizontale: '',
    chargesCoproHorizontale: '',
    chargesCoproHorizontaleContenu: [] as string[],
    travauxCoproHorizontaleRecents: '',
    travauxCoproHorizontaleRecentsDetail: '',
    travauxCoproHorizontaleRecentsMontant: '',
    travauxCoproHorizontaleVotesNonRealises: '',
    travauxCoproHorizontaleVotesDetail: '',
    travauxCoproHorizontaleVotesDelai: '',
    travauxCoproHorizontalePrevusNonVotes: [] as string[],
    procedureEnCoursCoproHorizontale: '',
    vue: [] as string[],
    // Année de construction
    anneeConstruction: '',
    surfaceAuSol: '',
    sousSolOuiNon: '',
    sousSolAmenageOuiNon: '',
    piscineOuiNon: '',
    piscineAnnee: '',
    piscineImplantation: '',
    piscineChauffeeOuiNon: '',
    piscineEquipements: [] as string[],
    // État extérieur
    etatToiture: '',
    etatFacade: '',
    etatTerrainExt: '',
    etatMursExterieurs: '',
    etatExterieurTerrain: '',
    // État intérieur
    etatMurs: '',
    etatSols: '',
    etatPlafonds: '',
    etatMenuiserie: '',
    alarme: '',
    porteBlindee: '',
    // Prestations détaillées (appartement)
    standingResidence: '',
    nombreLotsDansImmeuble: '',
    etatPartiesCommunesImmeuble: '',
    commercesRdcImmeuble: '',
    immeubleSecuriteConfort: [] as string[],
    gardienConcierge: '',
    residenceFermeeType: [] as string[],
    typeSyndic: '',
    chargesCoproTrimestriel: '',
    // Prestations détaillées
    standing: '',
    cuisineElectromenager: '',
    marquesCuisine: '',
    typeVenteVideMeuble: '',
    atoutPrincipal: '',
    elementNegatifValorisation: '',
    luminosite: 5,
    hauteurPlafond: '',
    mouluresPlafond: '',
    materiauSols: '',
    mursFinitions: '',
    menuiseriesMateriau: '',
    fenetresSurMesure: '',
    ouverturesType: '',
    ouverturesSurMesure: '',
    salleDeBainNiveau: '',
    salleDeBainDoubleVasque: '',
    cuisineOuverte: '',
    cuisineSemiEquipeeOuEquipee: '',
    cuisineSurMesure: '',
    electromenagerInclus: '',
    electromenagerGamme: '',
    prestationsInterPrincipales: [] as string[],
    prestationsInterPrincipalesAutres: '',
    prestationsInterPremium: [] as string[],
    prestationsInterPremiumAutres: '',
    maisonAnnexesInterieures: '',
    maisonAnnexesInterieuresAutre: '',
    maisonPotentielParticulier: '',
    residenceTypeAutre: '',
    // Chauffage & Eau chaude
    chauffageType: '',
    chauffageProduction: '',
    eauChaudeType: '',
    eauChaudeProduction: '',
    ancienneteInstallation: '',
    // Assainissement
    assainissementType: '',
    spancValidite: '',
    raccordabilite: '',
    // Situation juridique & technique (3 sous-sections)
    situationJuridiqueTechnique: [] as string[],
    situationTechniqueUrbanistique: [] as string[],
    situationCoproLotissement: [] as string[],
    // DPE
    dpeValide: '',
    classeGes: '',
    // Résidence
    residenceType: '',
    // Charges copro
    chargesCoproContenu: [] as string[],
    // Travaux autorisations
    travauxAutorisations: '',
    travauxPrevusAutorisations: '',
    travauxUrbanisme: '',
    travauxUrbanismeDetail: '',
    // Travaux copropriété
    travauxCoproRecents: '',
    travauxCoproRecentsDetail: '',
    travauxCoproRecentsMontant: '',
    travauxCoproRecentsAnnee: '',
    travauxCoproVotesNature: '',
    travauxCoproVotesCout: '',
    travauxCoproPrevusNature: '',
    travauxCoproPrevusCout: '',
    travauxCoproPrevusDate: '',
    travauxCoproPrevusNonVotes: [] as string[],
    travauxVotesNonRealises: '',
    travauxVotesNonRealisesDetail: '',
    travauxVotesNonRealisesDelai: '',
    // Lotissement ASL
    lotissementASL: '',
    chargesASL: '',
    chargesASLContenu: [] as string[],
    travauxASLRecents: '',
    travauxASLRecentsDetail: '',
    travauxASLRecentsMontant: '',
    travauxASLVotesNonRealises: '',
    travauxASLVotesDetail: '',
    travauxASLVotesDelai: '',
    travauxASLPrevusNonVotes: [] as string[],
    procedureEnCoursASL: '',
    // Situation actuelle détaillée
    typeBailLoue: '',
    finBail: '',
    ageLocataire: '',
    loyerHorsCharges: '',
    chargesMensuelles: ''
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photosInterieur, setPhotosInterieur] = useState<File[]>([])
  const [photoPreviewsInterieur, setPhotoPreviewsInterieur] = useState<string[]>([])
  const fileInputRefInterieur = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')
  const [parisCodePostalError, setParisCodePostalError] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [contexteVenteMenuOpen, setContexteVenteMenuOpen] = useState(false)
  const [expositionMenuOpen, setExpositionMenuOpen] = useState(false)
  const [visAVisMenuOpen, setVisAVisMenuOpen] = useState(false)
  const [vueMenuOpen, setVueMenuOpen] = useState(false)
  const [mesExterieursMenuOpen, setMesExterieursMenuOpen] = useState(false)
  const [prestationsExterieuresMaisonMenuOpen, setPrestationsExterieuresMaisonMenuOpen] = useState(false)
  const [annexesMenuOpen, setAnnexesMenuOpen] = useState(false)
  const [parkingBlocMenuOpen, setParkingBlocMenuOpen] = useState(false)
  const [prestationsInterPrincipalesMenuOpen, setPrestationsInterPrincipalesMenuOpen] = useState(false)
  const [prestationsInterPremiumMenuOpen, setPrestationsInterPremiumMenuOpen] = useState(false)
  const [standingResidenceMenuOpen, setStandingResidenceMenuOpen] = useState(false)
  const [etatPartiesCommunesMenuOpen, setEtatPartiesCommunesMenuOpen] = useState(false)
  const [immeubleSecuriteConfortMenuOpen, setImmeubleSecuriteConfortMenuOpen] = useState(false)
  const [juridiqueMenuOpen, setJuridiqueMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('estimation_etape1')
      if (!raw || raw === 'null') {
        setSessionInitStatus('missing')
        router.replace('/estimation/formulaire')
      return
    }
      const parsed = JSON.parse(raw) as Record<string, unknown>
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        sessionStorage.removeItem('estimation_etape1')
        setSessionInitStatus('missing')
        router.replace('/estimation/formulaire')
        return
      }
      const email = typeof parsed.email === 'string' ? parsed.email.trim() : ''
      if (!email) {
        sessionStorage.removeItem('estimation_etape1')
        setSessionInitStatus('missing')
        router.replace('/estimation/formulaire')
        return
      }
      setEtape1Data({
        civilite: typeof parsed.civilite === 'string' ? parsed.civilite : '',
        prenom: typeof parsed.prenom === 'string' ? parsed.prenom : '',
        nom: typeof parsed.nom === 'string' ? parsed.nom : '',
        telephone: typeof parsed.telephone === 'string' ? parsed.telephone : '',
        email,
      })
      setSessionInitStatus('ready')
    } catch {
      sessionStorage.removeItem('estimation_etape1')
      setSessionInitStatus('missing')
      router.replace('/estimation/formulaire')
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Détection code postal Paris (75xxx)
    if (name === 'codePostal') {
      const trimmed = value.trim()
      setParisCodePostalError(trimmed.length >= 2 && trimmed.startsWith('75'))
    }
  }

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const raw = prev[name as keyof typeof prev]
      const currentArray = Array.isArray(raw) ? (raw as string[]) : []
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return {
        ...prev,
        [name]: newArray,
      }
    })
  }

  const toggleMesExterieur = (value: string) => {
    setFormData((prev) => {
      if (value === 'Aucun') {
        const next = prev.mesExterieurs.includes('Aucun') ? [] : ['Aucun']
        return { ...prev, mesExterieurs: next }
      }
      let arr = prev.mesExterieurs.filter((x) => x !== 'Aucun')
      if (arr.includes(value)) arr = arr.filter((x) => x !== value)
      else arr = [...arr, value]
      return { ...prev, mesExterieurs: arr }
    })
  }

  const togglePrestationExterieureMaison = (value: string) => {
    setFormData((prev) => {
      if (value === 'Aucun') {
        const next = prev.prestationsExterieuresMaison.includes('Aucun') ? [] : ['Aucun']
        return { ...prev, prestationsExterieuresMaison: next, prestationsExterieuresMaisonAutre: '' }
      }
      let arr = prev.prestationsExterieuresMaison.filter((x) => x !== 'Aucun')
      if (value === 'Jardin paysagé et arboré : oui') {
        arr = arr.filter((x) => x !== 'Jardin paysagé et arboré : non')
      } else if (value === 'Jardin paysagé et arboré : non') {
        arr = arr.filter((x) => x !== 'Jardin paysagé et arboré : oui')
      } else if (value === 'Forage / puits fonctionnels : oui') {
        arr = arr.filter((x) => x !== 'Forage / puits fonctionnels : non')
      } else if (value === 'Forage / puits fonctionnels : non') {
        arr = arr.filter((x) => x !== 'Forage / puits fonctionnels : oui')
      }
      if (arr.includes(value)) {
        const next = arr.filter((x) => x !== value)
        return {
          ...prev,
          prestationsExterieuresMaison: next,
          prestationsExterieuresMaisonAutre: value === 'Autre à préciser' ? '' : prev.prestationsExterieuresMaisonAutre,
        }
      }
      return { ...prev, prestationsExterieuresMaison: [...arr, value] }
    })
  }

  const toggleImmeubleSecuriteConfort = (value: string) => {
    setFormData((prev) => {
      if (value === 'Aucun') {
        const next = prev.immeubleSecuriteConfort.includes('Aucun') ? [] : ['Aucun']
        return { ...prev, immeubleSecuriteConfort: next }
      }
      let arr = prev.immeubleSecuriteConfort.filter((x) => x !== 'Aucun')
      if (arr.includes(value)) arr = arr.filter((x) => x !== value)
      else arr = [...arr, value]
      return { ...prev, immeubleSecuriteConfort: arr }
    })
  }

  const toggleSituationJuridiqueTechnique = (value: string) => {
    setFormData((prev) => {
      if (value === 'Aucune situation particulière') {
        const next = prev.situationJuridiqueTechnique.includes('Aucune situation particulière')
          ? []
          : ['Aucune situation particulière']
        return { ...prev, situationJuridiqueTechnique: next }
      }
      let arr = prev.situationJuridiqueTechnique.filter((x) => x !== 'Aucune situation particulière')
      if (arr.includes(value)) arr = arr.filter((x) => x !== value)
      else arr = [...arr, value]
      return { ...prev, situationJuridiqueTechnique: arr }
    })
  }

  const patchAnnexes = (patch: { annexeLoggiaFermee?: string; annexeCellier?: string; annexeCave?: string; annexeLocalVelo?: string; annexesAutreDetail?: string }) => {
    setFormData((prev) => ({ ...prev, ...patch, annexesAucunActif: false }))
  }

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const newFiles = Array.from(files)
    const validFiles = newFiles.filter(file => {
      const isImage = file.type.startsWith('image/')
      const isUnder10MB = file.size <= 10 * 1024 * 1024
      return isImage && isUnder10MB
    })

    if (photos.length + validFiles.length > 20) {
      setSubmitError('Vous pouvez ajouter 20 photos maximum.')
      return
    }

    setPhotos(prev => [...prev, ...validFiles])
    
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })

    // Reset input pour pouvoir re-sélectionner les mêmes fichiers
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePhotoRemove = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handlePhotoAddInterieur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const validFiles = newFiles.filter((file) => {
      const isImage = file.type.startsWith('image/')
      const isUnder10MB = file.size <= 10 * 1024 * 1024
      return isImage && isUnder10MB
    })

    if (photosInterieur.length + validFiles.length > 20) {
      setSubmitError('Vous pouvez ajouter 20 photos d\'intérieur maximum.')
      return
    }

    setPhotosInterieur((prev) => [...prev, ...validFiles])

    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreviewsInterieur((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRefInterieur.current) {
      fileInputRefInterieur.current.value = ''
    }
  }

  const handlePhotoRemoveInterieur = (index: number) => {
    setPhotosInterieur((prev) => prev.filter((_, i) => i !== index))
    setPhotoPreviewsInterieur((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.localisation?.trim()) {
      setSubmitError('Veuillez renseigner l\'adresse exacte du bien.')
      return
    }
    if (parisCodePostalError) {
      setSubmitError('Le code postal saisi correspond à Paris. Veuillez utiliser le formulaire Estimation Paris.')
      return
    }
    setSubmitting(true)
    setSubmitError('')

    try {
      const completeData: any = {
        // Données étape 1
        civilite: etape1Data.civilite || null,
        prenom: etape1Data.prenom,
        nom: etape1Data.nom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        
        // Données étape 2
        localisation: formData.localisation,
        ville: formData.ville || null,
        code_postal: formData.codePostal || null,
        type_bien: formData.typeBienSousCategorie || formData.typeBien || null,
        surface: formData.typeBien === 'Appartement' ? (formData.surfaceCarrez || null) : (formData.surface || null),
        surface_carrez: formData.typeBien === 'Appartement' ? (formData.surfaceCarrez || null) : null,
        surface_sol_totale:
          formData.typeBien === 'Appartement'
            ? (formData.surfaceSolTotale || null)
            : formData.typeBien === 'Maison'
              ? (formData.surfaceAuSol || null)
              : null,
        surface_terrain: formData.surfaceTerrain || null,
        description_initiale: formData.description || null,
        nombre_pieces: formData.nombrePieces ? parseInt(formData.nombrePieces) : null,
        nombre_chambres: formData.nombreChambres ? parseInt(formData.nombreChambres) : null,
        nombre_salles_de_bain: formData.nombreSallesDeBain ? parseInt(formData.nombreSallesDeBain) : null,
        nombre_salles_d_eau: formData.nombreSallesDEau ? parseInt(formData.nombreSallesDEau) : null,
        nombre_wc: formData.nombreWC ? parseInt(formData.nombreWC) : null,
        wc_separes: formData.wcSepares === 'oui' ? true : formData.wcSepares === 'non' ? false : null,
        nombre_niveaux: formData.nombreNiveaux || null,
        etage: formData.etage || null,
        nombre_etages_immeuble: formData.nombreEtagesImmeuble || null,
        dernier_etage: formData.dernierEtage === 'oui' ? true : formData.dernierEtage === 'non' ? false : null,
        ascenseur: formData.ascenseur === 'oui' ? true : formData.ascenseur === 'non' ? false : null,
        exterieurs:
          formData.typeBien === 'Maison'
            ? null
            : formData.exterieur.length > 0
              ? formData.exterieur
              : null,
        surface_exterieur: formData.typeBien === 'Maison' ? null : formData.surfaceExterieur || null,
        stationnement: formData.typeBien === 'Maison' ? null : formData.stationnement || null,
        stationnement_emplacement: formData.typeBien === 'Maison' ? null : formData.stationnementEmplacement || null,
        stationnement_ext_prive_libre: formData.typeBien === 'Maison' ? null : formData.stationnementExtPriveLibre || null,
        has_box: formData.hasBox || null,
        stationnement_couvert: formData.typeBien === 'Maison' ? null : formData.stationnementCouvert || null,
        stationnement_ferme: formData.typeBien === 'Maison' ? null : formData.stationnementFerme || null,
        surface_stationnement: formData.typeBien === 'Maison' ? null : formData.surfaceStationnement || null,
        maison_stationnement_lieu: formData.typeBien === 'Maison' ? formData.maisonStationnementLieu || null : null,
        maison_garage_independant:
          formData.typeBien === 'Maison' && formData.maisonStationnementLieu === 'interieur'
            ? formData.maisonGarageIndepOuiNon === 'oui'
              ? true
              : formData.maisonGarageIndepOuiNon === 'non'
                ? false
                : null
            : null,
        maison_garage_independant_format:
          formData.typeBien === 'Maison' &&
          formData.maisonStationnementLieu === 'interieur' &&
          formData.maisonGarageIndepOuiNon === 'oui'
            ? formData.maisonGarageIndepFormat || null
            : null,
        maison_garage_sous_sol:
          formData.typeBien === 'Maison' && formData.maisonStationnementLieu === 'interieur'
            ? formData.maisonGarageSousSol === 'oui'
              ? true
              : formData.maisonGarageSousSol === 'non'
                ? false
                : null
            : null,
        maison_auvent:
          formData.typeBien === 'Maison' && formData.maisonStationnementLieu === 'interieur'
            ? formData.maisonAuvent === 'oui'
              ? true
              : formData.maisonAuvent === 'non'
                ? false
                : null
            : null,
        maison_aire_non_couverte:
          formData.typeBien === 'Maison' && formData.maisonStationnementLieu === 'interieur'
            ? formData.maisonAireNonCouverte === 'oui'
              ? true
              : formData.maisonAireNonCouverte === 'non'
                ? false
                : null
            : null,
        maison_aire_non_couverte_sol:
          formData.typeBien === 'Maison' &&
          formData.maisonStationnementLieu === 'interieur' &&
          formData.maisonAireNonCouverte === 'oui'
            ? formData.maisonAireNonCouverteSol || null
            : null,
        maison_stationnement_exterieur:
          formData.typeBien === 'Maison' &&
          formData.maisonStationnementLieu === 'exterieur' &&
          formData.maisonStationnementExterieur.length > 0
            ? formData.maisonStationnementExterieur
            : null,
        maison_terrain_clos:
          formData.typeBien === 'Maison'
            ? formData.maisonTerrainClos === 'oui'
              ? true
              : formData.maisonTerrainClos === 'non'
                ? false
                : null
            : null,
        maison_type_cloture:
          formData.typeBien === 'Maison' && formData.maisonTerrainClos === 'oui'
            ? formData.maisonTypeCloture || null
            : null,
        maison_portail:
          formData.typeBien === 'Maison'
            ? formData.maisonPortail === 'oui'
              ? true
              : formData.maisonPortail === 'non'
                ? false
                : null
            : null,
        maison_type_portail:
          formData.typeBien === 'Maison' && formData.maisonPortail === 'oui'
            ? formData.maisonTypePortail === 'manuel'
              ? 'Manuel'
              : formData.maisonTypePortail === 'motorise'
                ? 'Motorisé'
                : null
            : null,
        maison_systeme_acces:
          formData.typeBien === 'Maison' &&
          formData.maisonPortail === 'oui' &&
          formData.maisonSystemeAcces.length > 0
            ? formData.maisonSystemeAcces
            : null,
        maison_alarme_exterieur:
          formData.typeBien === 'Maison'
            ? formData.maisonAlarme === 'oui'
              ? true
              : formData.maisonAlarme === 'non'
                ? false
                : null
            : null,
        maison_cameras_exterieur:
          formData.typeBien === 'Maison'
            ? formData.maisonCameras === 'oui'
              ? true
              : formData.maisonCameras === 'non'
                ? false
                : null
            : null,
        maison_eclairage_exterieur:
          formData.typeBien === 'Maison' && formData.maisonEclairageExterieur
            ? formData.maisonEclairageExterieur
            : null,
        maison_eclairage_exterieur_preciser:
          formData.typeBien === 'Maison' && formData.maisonEclairageExterieur === 'autre'
            ? formData.maisonEclairageExterieurPreciser.trim() || null
            : null,
        maison_perimetre_autre:
          formData.typeBien === 'Maison' ? formData.maisonPerimetreAutre.trim() || null : null,
        rooftop_ou_non: formData.rooftopOuiNon || null,
        rdc_ou_non: formData.rdcOuiNon || null,
        balcon_m2: formData.balconM2 || null,
        terrasse_m2: formData.terrasseM2 || null,
        loggia_m2: formData.loggiaM2 || null,
        rez_de_jardin_m2: formData.rezDeJardinM2 || null,
        cave_m2: formData.caveM2 || null,
        mes_exterieurs:
          formData.typeBien === 'Maison'
            ? null
            : formData.mesExterieurs.length > 0
              ? formData.mesExterieurs.join('; ')
              : null,
        mes_exterieurs_autre: formData.typeBien === 'Maison' ? null : formData.mesExterieursAutre || null,
        mes_exterieurs_superficie: formData.typeBien === 'Maison' ? null : formData.mesExterieursSuperficie || null,
        prestations_exterieures_maison:
          formData.typeBien === 'Maison' && formData.prestationsExterieuresMaison.length > 0
            ? formData.prestationsExterieuresMaison
            : null,
        prestations_exterieures_maison_autres:
          formData.typeBien === 'Maison' ? formData.prestationsExterieuresMaisonAutre || null : null,
        annexe_loggia_fermee: formData.annexeLoggiaFermee || null,
        annexe_cellier: formData.annexeCellier || null,
        annexe_cave: formData.annexeCave || null,
        annexe_local_velo: formData.annexeLocalVelo || null,
        annexes_aucun: formData.annexesAucunActif ? true : null,
        annexes_autre_detail: formData.annexesAutreDetail || null,
        parking_bloc_type: formData.parkingBlocType || null,
        parking_bloc_interieur_box_ferme: formData.parkingBlocInterieurBoxFerme || null,
        parking_bloc_ext_prive_libre: formData.parkingBlocExtPriveLibre || null,
        parking_bloc_ext_couvert: formData.parkingBlocExtCouvert || null,
        parking_bloc_autre: formData.parkingBlocAutre || null,
        etat_bien: formData.etatBien || null,
        distribution_logement: formData.typeBien === 'Maison' ? null : formData.distributionLogement || null,
        maison_veranda_present:
          formData.typeBien === 'Maison'
            ? formData.maisonVerandaPresent === 'oui'
              ? true
              : formData.maisonVerandaPresent === 'non'
                ? false
                : null
            : null,
        maison_veranda_superficie:
          formData.typeBien === 'Maison' && formData.maisonVerandaPresent === 'oui'
            ? formData.maisonVerandaSuperficie || null
            : null,
        maison_veranda_chauffee:
          formData.typeBien === 'Maison' && formData.maisonVerandaPresent === 'oui'
            ? formData.maisonVerandaChauffee === 'oui'
              ? true
              : formData.maisonVerandaChauffee === 'non'
                ? false
                : null
            : null,
        maison_veranda_nature:
          formData.typeBien === 'Maison' && formData.maisonVerandaPresent === 'oui'
            ? formData.maisonVerandaNature || null
            : null,
        maison_veranda_usage:
          formData.typeBien === 'Maison' && formData.maisonVerandaPresent === 'oui'
            ? formData.maisonVerandaUsage || null
            : null,
        maison_veranda_urb_obtenue:
          formData.typeBien === 'Maison' && formData.maisonVerandaPresent === 'oui'
            ? maisonTriStateLabel(formData.maisonVerandaUrbObtenue)
            : null,
        maison_veranda_urb_type:
          formData.typeBien === 'Maison' &&
          formData.maisonVerandaPresent === 'oui' &&
          formData.maisonVerandaUrbObtenue === 'oui'
            ? maisonUrbTypeLabel(formData.maisonVerandaUrbType)
            : null,
        maison_veranda_urb_type_autre:
          formData.typeBien === 'Maison' &&
          formData.maisonVerandaPresent === 'oui' &&
          formData.maisonVerandaUrbObtenue === 'oui' &&
          formData.maisonVerandaUrbType === 'autre'
            ? formData.maisonVerandaUrbTypeAutre || null
            : null,
        maison_veranda_urb_travaux_conformes:
          formData.typeBien === 'Maison' &&
          formData.maisonVerandaPresent === 'oui' &&
          formData.maisonVerandaUrbObtenue === 'oui'
            ? maisonTriStateLabel(formData.maisonVerandaUrbTravauxConformes)
            : null,
        maison_veranda_urb_regularisee:
          formData.typeBien === 'Maison' &&
          formData.maisonVerandaPresent === 'oui' &&
          (formData.maisonVerandaUrbObtenue === 'non' ||
            (formData.maisonVerandaUrbObtenue === 'oui' &&
              formData.maisonVerandaUrbTravauxConformes === 'non'))
            ? maisonTriStateLabel(formData.maisonVerandaUrbRegularisee)
            : null,
        maison_extension_present:
          formData.typeBien === 'Maison'
            ? formData.maisonExtensionPresent === 'oui'
              ? true
              : formData.maisonExtensionPresent === 'non'
                ? false
                : null
            : null,
        maison_extension_superficie:
          formData.typeBien === 'Maison' && formData.maisonExtensionPresent === 'oui'
            ? formData.maisonExtensionSuperficie || null
            : null,
        maison_extension_chauffee:
          formData.typeBien === 'Maison' && formData.maisonExtensionPresent === 'oui'
            ? formData.maisonExtensionChauffee === 'oui'
              ? true
              : formData.maisonExtensionChauffee === 'non'
                ? false
                : null
            : null,
        maison_extension_nature:
          formData.typeBien === 'Maison' && formData.maisonExtensionPresent === 'oui'
            ? formData.maisonExtensionNature || null
            : null,
        maison_extension_usage:
          formData.typeBien === 'Maison' && formData.maisonExtensionPresent === 'oui'
            ? formData.maisonExtensionUsage || null
            : null,
        maison_extension_urb_obtenue:
          formData.typeBien === 'Maison' && formData.maisonExtensionPresent === 'oui'
            ? maisonTriStateLabel(formData.maisonExtensionUrbObtenue)
            : null,
        maison_extension_urb_type:
          formData.typeBien === 'Maison' &&
          formData.maisonExtensionPresent === 'oui' &&
          formData.maisonExtensionUrbObtenue === 'oui'
            ? maisonUrbTypeLabel(formData.maisonExtensionUrbType)
            : null,
        maison_extension_urb_type_autre:
          formData.typeBien === 'Maison' &&
          formData.maisonExtensionPresent === 'oui' &&
          formData.maisonExtensionUrbObtenue === 'oui' &&
          formData.maisonExtensionUrbType === 'autre'
            ? formData.maisonExtensionUrbTypeAutre || null
            : null,
        maison_extension_urb_travaux_conformes:
          formData.typeBien === 'Maison' &&
          formData.maisonExtensionPresent === 'oui' &&
          formData.maisonExtensionUrbObtenue === 'oui'
            ? maisonTriStateLabel(formData.maisonExtensionUrbTravauxConformes)
            : null,
        maison_extension_urb_regularisee:
          formData.typeBien === 'Maison' &&
          formData.maisonExtensionPresent === 'oui' &&
          (formData.maisonExtensionUrbObtenue === 'non' ||
            (formData.maisonExtensionUrbObtenue === 'oui' &&
              formData.maisonExtensionUrbTravauxConformes === 'non'))
            ? maisonTriStateLabel(formData.maisonExtensionUrbRegularisee)
            : null,
        maison_dependance_present:
          formData.typeBien === 'Maison'
            ? formData.maisonDependancePresent === 'oui'
              ? true
              : formData.maisonDependancePresent === 'non'
                ? false
                : null
            : null,
        maison_dependance_nombre:
          formData.typeBien === 'Maison' && formData.maisonDependancePresent === 'oui'
            ? formData.maisonDependanceNombre || null
            : null,
        maison_dependance_superficie:
          formData.typeBien === 'Maison' && formData.maisonDependancePresent === 'oui'
            ? formData.maisonDependanceSuperficie || null
            : null,
        maison_dependance_nature:
          formData.typeBien === 'Maison' && formData.maisonDependancePresent === 'oui'
            ? formData.maisonDependanceNature || null
            : null,
        maison_dependance_usage:
          formData.typeBien === 'Maison' && formData.maisonDependancePresent === 'oui'
            ? formData.maisonDependanceUsage || null
            : null,
        maison_dependance_autorisation_urb:
          formData.typeBien === 'Maison' && formData.maisonDependancePresent === 'oui'
            ? formData.maisonDependanceAutorisationUrb || null
            : null,
        travaux_recents: formData.travauxRecents === 'oui' ? true : formData.travauxRecents === 'non' ? false : null,
        nature_travaux: formData.natureTravaux || null,
        annee_travaux: formData.anneeTravaux ? parseInt(formData.anneeTravaux) : null,
        montant_travaux: formData.montantTravaux || null,
        travaux_prevus: formData.travauxPrevus === 'oui' ? true : formData.travauxPrevus === 'non' ? false : null,
        nature_travaux_prevus: formData.natureTravauxPrevus || null,
        budget_travaux_prevus: formData.budgetTravauxPrevus || null,
        date_travaux_prevus: formData.dateTravauxPrevus || null,
        exposition: formData.exposition?.length ? formData.exposition.join(', ') : null,
        vis_a_vis: formData.visAVis || null,
        distance_vis_a_vis: formData.distanceVisAVis || null,
        taxe_fonciere: formData.taxeFonciere || null,
        charges_copro: formData.chargesCopro || null,
        charges_copro_trimestriel: formData.chargesCoproTrimestriel || null,
        type_syndic: formData.typeSyndic || null,
        standing_residence: formData.standingResidence || null,
        nombre_lots_immeuble: formData.nombreLotsDansImmeuble || null,
        etat_parties_communes_immeuble: formData.etatPartiesCommunesImmeuble || null,
        commerces_rdc_immeuble:
          formData.commercesRdcImmeuble === 'oui' ? true : formData.commercesRdcImmeuble === 'non' ? false : null,
        immeuble_securite_confort:
          formData.immeubleSecuriteConfort?.length > 0 ? formData.immeubleSecuriteConfort : null,
        gardien_concierge: formData.gardienConcierge || null,
        residence_fermee_type: formData.residenceFermeeType?.length ? formData.residenceFermeeType : null,
        dpe: formData.dpe || null,
        contexte_vente: formData.contexteVente?.length ? formData.contexteVente.map(o => o === 'Autre à préciser' && formData.contexteVenteAutre ? formData.contexteVenteAutre : o).filter(Boolean).join('; ') : null,
        nom_succession: formData.nomSuccession || null,
        delai_vente: formData.delaiVente || null,
        situation_actuelle: formData.typeBien === 'Maison' ? null : formData.situationActuelle || null,
        type_location: formData.typeLocation || null,
        loyer_mensuel: formData.loyerMensuel || null,
        prix_envisage: formData.prixEnvisage || null,
        ajustement_prix_echelle: formData.ajustementPrix ? parseInt(formData.ajustementPrix) : null,
        message_libre: formData.messageLibre || null,
        
        // Nouveaux champs
        mitoyennete: formData.mitoyennete || null,
        maison_type: formData.maisonType || null,
        maison_ensemble_organise: formData.maisonEnsembleOrganise || null,
        procedure_en_cours_maison:
          formData.typeBien === 'Maison'
            ? formData.procedureEnCoursMaison === 'oui'
              ? true
              : formData.procedureEnCoursMaison === 'non'
                ? false
                : null
            : null,
        sous_sol_total_m2:
          formData.typeBien === 'Maison'
            ? formData.sousSolOuiNon === 'Oui'
              ? (formData.sousSolTotalM2 || null)
              : null
            : formData.sousSolTotalM2 || null,
        sous_sol_amenage_m2:
          formData.typeBien === 'Maison'
            ? formData.sousSolOuiNon === 'Oui' && formData.sousSolAmenageOuiNon === 'Oui'
              ? (formData.sousSolTotalM2 || null)
              : null
            : formData.sousSolAmenageM2 || null,
        piscine:
          formData.typeBien === 'Maison'
            ? formData.piscineOuiNon === 'Oui'
              ? true
              : formData.piscineOuiNon === 'Non'
                ? false
                : null
            : null,
        piscine_annee:
          formData.typeBien === 'Maison' && formData.piscineOuiNon === 'Oui' && formData.piscineAnnee
            ? (() => {
                const y = parseInt(formData.piscineAnnee, 10)
                return Number.isFinite(y) ? y : null
              })()
            : null,
        piscine_implantation:
          formData.typeBien === 'Maison' && formData.piscineOuiNon === 'Oui'
            ? formData.piscineImplantation || null
            : null,
        piscine_chauffee:
          formData.typeBien === 'Maison' && formData.piscineOuiNon === 'Oui'
            ? formData.piscineChauffeeOuiNon === 'Oui'
              ? true
              : formData.piscineChauffeeOuiNon === 'Non'
                ? false
                : null
            : null,
        piscine_equipements:
          formData.typeBien === 'Maison' && formData.piscineOuiNon === 'Oui' && formData.piscineEquipements.length > 0
            ? formData.piscineEquipements
            : null,
        combles_m2: formData.typeBien === 'Maison' ? null : formData.comblesM2 || null,
        combles_amenagees_m2: formData.typeBien === 'Maison' ? null : formData.comblesAmenageesM2 || null,
        studio_dependances_m2: formData.typeBien === 'Maison' ? null : formData.studioDependancesM2 || null,
        forage_puits: formData.typeBien === 'Maison' ? null : formData.foragePuits || null,
        prestations_interieures_maison:
          formData.typeBien === 'Maison'
            ? null
            : formData.prestationsInterieuresMaison?.length
              ? formData.prestationsInterieuresMaison
              : null,
        prestations_interieures_maison_autres:
          formData.typeBien === 'Maison' ? null : formData.prestationsInterieuresMaisonAutres || null,
        procedure_en_cours_asl: formData.procedureEnCoursASL || null,
        nombre_lots_copro_horizontale: formData.nombreLotsCoproHorizontale || null,
        charges_copro_horizontale: formData.chargesCoproHorizontale || null,
        charges_copro_horizontale_contenu: formData.chargesCoproHorizontaleContenu?.length ? formData.chargesCoproHorizontaleContenu : null,
        travaux_copro_horizontale_recents: formData.travauxCoproHorizontaleRecents || null,
        travaux_copro_horizontale_recents_detail: formData.travauxCoproHorizontaleRecentsDetail || null,
        travaux_copro_horizontale_recents_montant: formData.travauxCoproHorizontaleRecentsMontant || null,
        travaux_copro_horizontale_votes_non_realises: formData.travauxCoproHorizontaleVotesNonRealises || null,
        travaux_copro_horizontale_votes_detail: formData.travauxCoproHorizontaleVotesDetail || null,
        travaux_copro_horizontale_votes_delai: formData.travauxCoproHorizontaleVotesDelai || null,
        travaux_copro_horizontale_prevus_non_votes: formData.travauxCoproHorizontalePrevusNonVotes?.length ? formData.travauxCoproHorizontalePrevusNonVotes : null,
        procedure_en_cours_copro_horizontale: formData.procedureEnCoursCoproHorizontale || null,
        vue: formData.vue?.length ? formData.vue.join(', ') : null,
        annee_construction: formData.anneeConstruction || null,
        etat_toiture: formData.typeBien === 'Maison' ? formData.etatToiture || null : null,
        etat_facade: formData.typeBien === 'Maison' ? formData.etatFacade || null : null,
        etat_terrain_ext: null,
        etat_murs_exterieurs: formData.typeBien === 'Maison' ? formData.etatMursExterieurs || null : null,
        etat_exterieur_terrain:
          formData.typeBien === 'Maison' ? formData.etatExterieurTerrain || null : null,
        etat_murs: formData.etatMurs || null,
        etat_sols: formData.etatSols || null,
        etat_plafonds: formData.etatPlafonds || null,
        etat_menuiserie: formData.etatMenuiserie || null,
        alarme:
          formData.typeBien === 'Maison'
            ? null
            : formData.alarme === 'oui'
              ? true
              : formData.alarme === 'non'
                ? false
                : null,
        porte_blindee:
          formData.typeBien === 'Maison'
            ? null
            : formData.porteBlindee === 'oui'
              ? true
              : formData.porteBlindee === 'non'
                ? false
                : null,
        standing: formData.standing || null,
        cuisine_electromenager: formData.cuisineElectromenager || null,
        marques_cuisine: formData.marquesCuisine || null,
        type_vente_vide_meuble: formData.typeVenteVideMeuble || null,
        atout_principal: formData.atoutPrincipal || null,
        element_negatif_valorisation: formData.elementNegatifValorisation || null,
        luminosite: formData.luminosite ?? null,
        hauteur_plafond: formData.hauteurPlafond || null,
        moulures_plafond:
          formData.mouluresPlafond === 'oui' ? true : formData.mouluresPlafond === 'non' ? false : null,
        materiau_sols: formData.materiauSols || null,
        murs_finitions: formData.mursFinitions || null,
        menuiseries_materiau: formData.menuiseriesMateriau || null,
        fenetres_sur_mesure:
          formData.fenetresSurMesure === 'oui'
            ? true
            : formData.fenetresSurMesure === 'non'
              ? false
              : null,
        ouvertures_type: formData.ouverturesType || null,
        ouvertures_sur_mesure:
          formData.ouverturesSurMesure === 'oui'
            ? true
            : formData.ouverturesSurMesure === 'non'
              ? false
              : null,
        salle_de_bain_niveau: formData.salleDeBainNiveau || null,
        salle_de_bain_double_vasque:
          formData.salleDeBainDoubleVasque === 'oui'
            ? true
            : formData.salleDeBainDoubleVasque === 'non'
              ? false
              : null,
        cuisine_ouverte:
          formData.cuisineOuverte === 'oui' ? true : formData.cuisineOuverte === 'non' ? false : null,
        cuisine_semi_equipee_ou_equipee: formData.cuisineSemiEquipeeOuEquipee || null,
        cuisine_sur_mesure:
          formData.cuisineSurMesure === 'oui' ? true : formData.cuisineSurMesure === 'non' ? false : null,
        electromenager_inclus:
          formData.electromenagerInclus === 'oui'
            ? true
            : formData.electromenagerInclus === 'non'
              ? false
              : null,
        electromenager_gamme:
          formData.electromenagerInclus === 'oui' ? formData.electromenagerGamme || null : null,
        prestations_inter_principales:
          formData.prestationsInterPrincipales.length > 0 ? formData.prestationsInterPrincipales : null,
        prestations_inter_principales_autres: formData.prestationsInterPrincipalesAutres || null,
        prestations_inter_premium:
          formData.prestationsInterPremium.length > 0 ? formData.prestationsInterPremium : null,
        prestations_inter_premium_autres: formData.prestationsInterPremiumAutres || null,
        maison_annexes_interieures:
          formData.typeBien === 'Maison' ? formData.maisonAnnexesInterieures || null : null,
        maison_annexes_interieures_autre:
          formData.typeBien === 'Maison' && formData.maisonAnnexesInterieures === 'Autre à préciser'
            ? formData.maisonAnnexesInterieuresAutre.trim() || null
            : null,
        chauffage_type: formData.chauffageType || null,
        chauffage_production: formData.chauffageProduction || null,
        eau_chaude_production: formData.eauChaudeProduction || null,
        anciennete_installation: formData.ancienneteInstallation || null,
        assainissement_type: formData.assainissementType || null,
        spanc_validite: formData.spancValidite || null,
        raccordabilite: formData.raccordabilite || null,
        situation_juridique_technique: formData.situationJuridiqueTechnique.length > 0 ? formData.situationJuridiqueTechnique : null,
        situation_technique_urbanistique: formData.situationTechniqueUrbanistique.length > 0 ? formData.situationTechniqueUrbanistique : null,
        situation_copro_lotissement: formData.situationCoproLotissement.length > 0 ? formData.situationCoproLotissement : null,
        dpe_valide: formData.dpeValide || null,
        classe_ges: formData.classeGes || null,
        residence_type: formData.residenceType || null,
        residence_type_autre: formData.residenceType === 'Autre (à préciser)' ? formData.residenceTypeAutre || null : null,
        charges_copro_contenu: formData.chargesCoproContenu.length > 0 ? formData.chargesCoproContenu : null,
        eau_chaude_type: formData.eauChaudeType || null,
        travaux_autorisations: formData.travauxAutorisations || null,
        travaux_prevus_autorisations: formData.travauxPrevusAutorisations || null,
        travaux_urbanisme: formData.travauxUrbanisme || null,
        travaux_urbanisme_detail: formData.travauxUrbanismeDetail || null,
        maison_potentiel_particulier:
          formData.typeBien === 'Maison' ? formData.maisonPotentielParticulier || null : null,
        travaux_copro_recents: formData.travauxCoproRecents || null,
        travaux_copro_recents_detail: formData.travauxCoproRecentsDetail || null,
        travaux_copro_recents_montant: formData.travauxCoproRecentsMontant || null,
        travaux_copro_recents_annee: formData.travauxCoproRecentsAnnee || null,
        travaux_copro_votes_nature: formData.travauxCoproVotesNature || null,
        travaux_copro_votes_cout: formData.travauxCoproVotesCout || null,
        travaux_copro_prevus_nature: formData.travauxCoproPrevusNature || null,
        travaux_copro_prevus_cout: formData.travauxCoproPrevusCout || null,
        travaux_copro_prevus_date: formData.travauxCoproPrevusDate || null,
        travaux_copro_prevus_non_votes: formData.travauxCoproPrevusNonVotes.length > 0 ? formData.travauxCoproPrevusNonVotes : null,
        travaux_votes_non_realises: formData.travauxVotesNonRealises || null,
        travaux_votes_non_realises_detail: formData.travauxVotesNonRealisesDetail || null,
        travaux_votes_non_realises_delai: formData.travauxVotesNonRealisesDelai || null,
        lotissement_asl: formData.lotissementASL || null,
        charges_asl: formData.chargesASL || null,
        charges_asl_contenu: formData.chargesASLContenu.length > 0 ? formData.chargesASLContenu : null,
        travaux_asl_recents: formData.travauxASLRecents || null,
        travaux_asl_recents_detail: formData.travauxASLRecentsDetail || null,
        travaux_asl_recents_montant: formData.travauxASLRecentsMontant || null,
        travaux_asl_votes_non_realises: formData.travauxASLVotesNonRealises || null,
        travaux_asl_votes_detail: formData.travauxASLVotesDetail || null,
        travaux_asl_votes_delai: formData.travauxASLVotesDelai || null,
        travaux_asl_prevus_non_votes: formData.travauxASLPrevusNonVotes.length > 0 ? formData.travauxASLPrevusNonVotes : null,
        type_bail_loue: formData.typeBien === 'Maison' ? null : formData.typeBailLoue || null,
        fin_bail: formData.typeBien === 'Maison' ? null : formData.finBail || null,
        age_locataire: formData.typeBien === 'Maison' ? null : formData.ageLocataire || null,
        loyer_hors_charges: formData.typeBien === 'Maison' ? null : formData.loyerHorsCharges || null,
        charges_mensuelles: formData.typeBien === 'Maison' ? null : formData.chargesMensuelles || null,
        
        type_demande: 'estimation',
        maturite: 'estimation',
        ajustement_prix: 'oui',
        motivation: `Estimation détaillée demandée. ${formData.messageLibre || 'Demande d\'estimation immobilière.'}`,
        status: 'nouveau'
      }

      const requiredFields = ['prenom', 'telephone', 'email']
      const missingFields = requiredFields.filter(field => !completeData[field])
      if (missingFields.length > 0) {
        setSubmitError(`Des champs obligatoires sont manquants: ${missingFields.join(', ')}`)
        setSubmitting(false)
        return
      }
      
      // 1. Uploader les photos (même dossier Storage temporaire, sous-dossiers distincts)
      const tempId = `temp_${Date.now()}`
      let photoUrls: string[] = []
      console.log('Nombre de photos extérieur à uploader:', photos.length)
      if (photos.length > 0) {
        setUploadProgress(`Photos extérieur (0/${photos.length})...`)
        photoUrls = await uploadEstimationPhotos(photos, tempId, (uploaded, total) => {
          console.log(`Photo ext. ${uploaded}/${total} uploadée`)
          setUploadProgress(`Photos extérieur (${uploaded}/${total})...`)
        }, 'amenagements_exterieurs')
        console.log('URLs photos extérieur:', photoUrls.length)
      }

      let photoUrlsInterieur: string[] = []
      if (photosInterieur.length > 0) {
        setUploadProgress(`Photos intérieur (0/${photosInterieur.length})...`)
        photoUrlsInterieur = await uploadEstimationPhotos(photosInterieur, tempId, (uploaded, total) => {
          setUploadProgress(`Photos intérieur (${uploaded}/${total})...`)
        }, 'interieur')
      }

      // 2. Créer le lead avec TOUTES les données (y compris les URLs des photos)
      setUploadProgress('Enregistrement des données...')
      if (photoUrls.length > 0) {
        completeData.photos_urls = photoUrls
      }
      if (photoUrlsInterieur.length > 0) {
        completeData.photos_interieur_urls = photoUrlsInterieur
      }

      const leadId = await createAnalyseLead(completeData)
      console.log('Données enregistrées avec succès (photos incluses), ID:', leadId)

      sessionStorage.removeItem('estimation_etape1')
      window.location.href = 'https://buy.stripe.com/eVq5kD518640ccR9FVeQM00'
    } catch (error: any) {
      console.error('Erreur:', error)
      let errorMessage = 'Une erreur est survenue. Veuillez réessayer.'
      if (error.message) {
        errorMessage = error.message
      }
      setSubmitError(errorMessage)
      setSubmitting(false)
    }
  }

  // Input classes communes
  const inputClass = "w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
  const selectClass = "w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
  const labelClass = "block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide"
  const sectionTitleClass = "text-lg font-semibold text-white uppercase tracking-wide"
  const groupTitleClass = "text-xl font-bold text-white uppercase tracking-wide mb-6"
  const optionBase = "flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200"
  const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }

  const getOptionClass = (isSelected: boolean) =>
    `${optionBase} ${isSelected ? 'border-white/60 bg-white/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`

  const juridiqueSituationOptions = [
    'Servitudes (passage, vue, canalisation...)',
    'Droit de passage',
    'Mitoyenneté particulière',
    'Indivision',
    'Usufruit',
    'Nue-propriété',
    'Procédure en cours',
    'Litige avec voisin',
    'Hypothèque en cours',
    'Saisie ou procédure bancaire',
    'Aucune situation particulière',
  ]

  if (sessionInitStatus !== 'ready' || !etape1Data) {
    return (
      <main
        className="min-h-screen bg-black flex items-center justify-center px-4"
        style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <div className="text-center max-w-md space-y-4">
          <p
            className="text-white/70"
            style={{ ...fontStyle, color: 'rgba(255,255,255,0.7)' }}
          >
            {sessionInitStatus === 'missing'
              ? "Session expirée ou page ouverte sans l'étape 1. Redirection…"
              : 'Chargement...'}
          </p>
          {sessionInitStatus === 'missing' && (
            <p className="text-white/50 text-sm" style={{ ...fontStyle, color: 'rgba(255,255,255,0.5)' }}>
              Si rien ne change,{' '}
              <Link href="/estimation/formulaire" className="text-white underline underline-offset-4">
                revenir à l&apos;étape 1
              </Link>
              .
            </p>
          )}
        </div>
      </main>
    )
  }

  return (
    <EstimationFormErrorBoundary>
    <main className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-4" style={fontStyle}>
            Détails du bien
          </h1>
          <p className="text-white/50 text-sm uppercase tracking-widest" style={fontStyle}>
            Étape 2 / 2 — Affinage de l'estimation
          </p>
          <p className="text-white text-base mt-6 max-w-lg mx-auto leading-relaxed font-medium" style={fontStyle}>
            Une précision maximale est souhaitée afin de produire l'estimation la plus réaliste possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ═══════════ PROJET DE VENTE (Contexte) ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>
            <div>
              <p className={sectionTitleClass} style={fontStyle}>Contexte (plusieurs réponses possibles)</p>
              <details
                className="mt-4"
                onToggle={(e) => setContexteVenteMenuOpen(e.currentTarget.open)}
              >
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.contexteVente.length === 0
                      ? 'Choisir le(s) contexte(s)…'
                      : formData.contexteVente.length === 1
                        ? formData.contexteVente[0]
                        : `${formData.contexteVente.length} contextes sélectionnés`}
                  </span>
                  <span
                    className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${contexteVenteMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-72 overflow-y-auto shadow-lg z-10">
                  <div className="space-y-2">
                {[
                  'Mariage / divorce',
                  'Succession / indivision',
                  'Départ des enfants / naissance',
                  'Difficultés financières / besoin de liquidités',
                  'Problème de santé',
                  'Vente pour investir ailleurs',
                  'Marché favorable',
                  'Fin dispositif fiscal / Optimisation fiscale',
                  'Estimation patrimoniale',
                  'Autre à préciser',
                ].map((option) => (
                      <label key={option} className={`${getOptionClass(formData.contexteVente.includes(option))} !p-2.5`}>
                        <input type="checkbox" checked={formData.contexteVente.includes(option)} onChange={() => handleCheckboxChange('contexteVente', option)} className="mr-2 accent-white shrink-0" />
                        <span className="text-white text-sm leading-snug" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
                </div>
              </details>
              {formData.contexteVente.includes('Autre à préciser') && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Précisez</label>
                  <input type="text" name="contexteVenteAutre" value={formData.contexteVenteAutre} onChange={handleChange} placeholder="Précisez votre situation..." className={inputClass} style={fontStyle} />
                </div>
              )}
              {formData.contexteVente.includes('Succession / indivision') && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Nom de la succession</label>
                  <input type="text" name="nomSuccession" value={formData.nomSuccession} onChange={handleChange} placeholder="Ex: Succession Dupont" className={inputClass} style={fontStyle} />
                </div>
              )}
              </div>
            </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ IDENTIFICATION DU BIEN ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Identification du bien</h2>

            {/* Le bien est actuellement */}
            <div>
              <label className={labelClass} style={fontStyle}>Le bien est actuellement :</label>
              <select name="residenceType" value={formData.residenceType} onChange={handleChange} className={selectClass} style={fontStyle}>
                <option value="" className="bg-black text-white">Sélectionnez...</option>
                {['Résidence principale', 'Résidence secondaire', 'Investissement', 'Bien vacant', 'Occupé par un proche', 'Autre (à préciser)'].map((option) => (
                  <option key={option} value={option} className="bg-black text-white">{option}</option>
                ))}
              </select>
              {formData.residenceType === 'Autre (à préciser)' && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Précisez la situation</label>
                  <input type="text" name="residenceTypeAutre" value={formData.residenceTypeAutre} onChange={handleChange} placeholder="Ex: Bien en indivision..." className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>

            {/* Localisation */}
            <div>
              <label className={labelClass} style={fontStyle}>Adresse exacte du bien *</label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                required
                placeholder="Ex: 12 rue de la Paix"
                className={inputClass}
                style={fontStyle}
              />
                  </div>
                  
            {/* Ville & Code postal */}
            <div className="grid md:grid-cols-2 gap-4">
                    <div>
                <label className={labelClass} style={fontStyle}>Ville *</label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Saint-Germain-en-Laye"
                  className={inputClass}
                  style={fontStyle}
                />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Code postal</label>
                <input
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  placeholder="Ex: 78100"
                  className={`${inputClass} ${parisCodePostalError ? 'border-red-500/70' : ''}`}
                  style={fontStyle}
                />
                {parisCodePostalError && (
                  <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm" style={fontStyle}>
                      Ce code postal correspond à Paris. Le tarif de l&apos;estimation Essentielle ne couvre pas cette zone.
                    </p>
                    <Link
                      href="/estimation/paris/formulaire"
                      className="inline-block mt-2 text-sm font-medium text-white underline underline-offset-4 hover:text-white/80 transition-colors"
                      style={fontStyle}
                    >
                      Accéder au formulaire Estimation Paris &rarr;
                    </Link>
                  </div>
                )}
                {!parisCodePostalError && formData.codePostal.trim() && CODES_POSTAUX_ZONE_ESSENTIEL.includes(formData.codePostal.trim()) && (
                  <p className="mt-2 p-3 bg-white/5 border border-white/20 rounded-lg text-white/90 text-sm" style={fontStyle}>
                    Bonne nouvelle : votre bien est situé dans les zones que nous couvrons. À ce titre, si vous souhaitez nous confier la mise en vente de votre bien ultérieurement, le montant de l&apos;estimation pourra être déduit de nos frais d&apos;agence
                  </p>
                )}
              </div>
            </div>

            {/* Type de bien */}
            <div>
              <label className={labelClass} style={fontStyle}>Type de bien</label>
              <select
                name="typeBien"
                value={formData.typeBien}
                onChange={(e) => {
                  const v = e.target.value
                  setFormData((prev) => ({
                    ...prev,
                    typeBien: v,
                    typeBienSousCategorie: '',
                    ...(v === 'Maison'
                      ? {
                          mesExterieurs: [],
                          mesExterieursAutre: '',
                          mesExterieursSuperficie: '',
                          exterieur: [],
                          surfaceExterieur: '',
                          comblesM2: '',
                          comblesAmenageesM2: '',
                          studioDependancesM2: '',
                          foragePuits: '',
                          situationActuelle: '',
                          typeBailLoue: '',
                          finBail: '',
                          ageLocataire: '',
                          loyerHorsCharges: '',
                          chargesMensuelles: '',
                          stationnement: '',
                          stationnementEmplacement: '',
                          stationnementCouvert: '',
                          stationnementFerme: '',
                          surfaceStationnement: '',
                          alarme: '',
                          porteBlindee: '',
                          prestationsInterieuresMaison: [],
                          prestationsInterieuresMaisonAutres: '',
                        }
                      : {
                          prestationsExterieuresMaison: [],
                          prestationsExterieuresMaisonAutre: '',
                          maisonStationnementLieu: '',
                          maisonGarageIndepOuiNon: '',
                          maisonGarageIndepFormat: '',
                          maisonGarageSousSol: '',
                          maisonAuvent: '',
                          maisonAireNonCouverte: '',
                          maisonAireNonCouverteSol: '',
                          maisonStationnementExterieur: [],
                          maisonTerrainClos: '',
                          maisonTypeCloture: '',
                          maisonPortail: '',
                          maisonTypePortail: '',
                          maisonSystemeAcces: [],
                          maisonAlarme: '',
                          maisonCameras: '',
                          maisonEclairageExterieur: '',
                          maisonEclairageExterieurPreciser: '',
                          maisonPerimetreAutre: '',
                        }),
                    ...(v !== 'Maison'
                      ? {
                          surfaceAuSol: '',
                          sousSolOuiNon: '',
                          sousSolAmenageOuiNon: '',
                          sousSolTotalM2: '',
                          sousSolAmenageM2: '',
                          piscineOuiNon: '',
                          piscineAnnee: '',
                          piscineImplantation: '',
                          piscineChauffeeOuiNon: '',
                          piscineEquipements: [],
                          procedureEnCoursMaison: '',
                          etatExterieurTerrain: '',
                          etatFacade: '',
                          etatToiture: '',
                          etatTerrainExt: '',
                          etatMursExterieurs: '',
                          maisonVerandaPresent: '',
                          maisonVerandaSuperficie: '',
                          maisonVerandaChauffee: '',
                          maisonVerandaNature: '',
                          maisonVerandaUsage: '',
                          maisonVerandaUrbObtenue: '',
                          maisonVerandaUrbType: '',
                          maisonVerandaUrbTypeAutre: '',
                          maisonVerandaUrbTravauxConformes: '',
                          maisonVerandaUrbRegularisee: '',
                          maisonExtensionPresent: '',
                          maisonExtensionSuperficie: '',
                          maisonExtensionChauffee: '',
                          maisonExtensionNature: '',
                          maisonExtensionUsage: '',
                          maisonExtensionUrbObtenue: '',
                          maisonExtensionUrbType: '',
                          maisonExtensionUrbTypeAutre: '',
                          maisonExtensionUrbTravauxConformes: '',
                          maisonExtensionUrbRegularisee: '',
                          maisonDependancePresent: '',
                          maisonDependanceNombre: '',
                          maisonDependanceSuperficie: '',
                          maisonDependanceNature: '',
                          maisonDependanceUsage: '',
                          maisonDependanceAutorisationUrb: '',
                          maisonAnnexesInterieures: '',
                          maisonAnnexesInterieuresAutre: '',
                          maisonPotentielParticulier: '',
                        }
                      : {}),
                  }))
                }}
                className={selectClass}
                style={fontStyle}
              >
                <option value="" className="bg-black text-white">Sélectionnez...</option>
                <option value="Appartement" className="bg-black text-white">Appartement</option>
                <option value="Maison" className="bg-black text-white">Maison</option>
              </select>
              {formData.typeBien === 'Appartement' && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Sous-catégorie</label>
                  <select name="typeBienSousCategorie" value={formData.typeBienSousCategorie} onChange={handleChange} className={selectClass} style={fontStyle}>
                    <option value="" className="bg-black text-white">Sélectionnez...</option>
                    {['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5 ou +', 'Studio', 'Duplex', 'Triplex', 'Loft', 'Penthouse'].map((opt) => (
                      <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                    ))}
                  </select>
                </div>
              )}
              {formData.typeBien === 'Maison' && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Sous-catégorie</label>
                  <select name="typeBienSousCategorie" value={formData.typeBienSousCategorie} onChange={handleChange} className={selectClass} style={fontStyle}>
                    <option value="" className="bg-black text-white">Sélectionnez...</option>
                    {['Maison individuelle', 'Maison de ville', 'Villa', 'Hôtel particulier', 'Bâtisse / propriété / Mas', 'Ferme', 'Château'].map((opt) => (
                      <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Surface */}
            <div className="grid md:grid-cols-2 gap-4">
              {formData.typeBien === 'Appartement' && (
                <>
                <div>
                  <label className={labelClass} style={fontStyle}>Surface m² Loi Carrez</label>
                      <input
                        type="number"
                    name="surfaceCarrez"
                    value={formData.surfaceCarrez}
                        onChange={handleChange}
                        min="1"
                    placeholder="Ex: 75"
                    className={inputClass}
                    style={fontStyle}
                      />
                    </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Surface totale (si diff. de la loi Carrez)</label>
                    <input
                      type="number"
                      name="surfaceSolTotale"
                      value={formData.surfaceSolTotale}
                      onChange={handleChange}
                      min="1"
                      placeholder="Ex: 82"
                      className={inputClass}
                      style={fontStyle}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Dernier étage</label>
                    <div className="flex gap-3 mt-1">
                      {['oui', 'non'].map((val) => (
                        <label key={val} className={getOptionClass(formData.dernierEtage === val)}>
                          <input type="radio" name="dernierEtage" value={val} checked={formData.dernierEtage === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Ascenseur</label>
                    <div className="flex gap-3 mt-1">
                      {['oui', 'non'].map((val) => (
                        <label key={val} className={getOptionClass(formData.ascenseur === val)}>
                          <input type="radio" name="ascenseur" value={val} checked={formData.ascenseur === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {formData.typeBien === 'Maison' && (
                    <div>
                  <label className={labelClass} style={fontStyle}>Surface habitable (m²)</label>
                      <input
                        type="number"
                    name="surface"
                    value={formData.surface}
                        onChange={handleChange}
                    min="1"
                    placeholder="Ex: 75"
                    className={inputClass}
                    style={fontStyle}
                      />
                    </div>
              )}
              {formData.typeBien === 'Maison' && (
                    <div>
                  <label className={labelClass} style={fontStyle}>Surface du terrain (m²)</label>
                      <input
                        type="number"
                    name="surfaceTerrain"
                    value={formData.surfaceTerrain}
                        onChange={handleChange}
                    min="1"
                    placeholder="Ex: 200"
                    className={inputClass}
                    style={fontStyle}
                      />
                    </div>
              )}
                </div>

            {/* Année de construction */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>{formData.typeBien === 'Appartement' ? 'Année de construction de l\'immeuble' : 'Année de construction'}</label>
                <input type="number" name="anneeConstruction" value={formData.anneeConstruction} onChange={handleChange} min="1800" max="2026" placeholder="Ex: 1985" className={inputClass} style={fontStyle} />
              </div>
              {formData.typeBien === 'Maison' && (
                <div>
                  <label className={labelClass} style={fontStyle}>Surface au sol (m²)</label>
                  <input
                    type="number"
                    name="surfaceAuSol"
                    value={formData.surfaceAuSol}
                    onChange={handleChange}
                    min="1"
                    placeholder="Ex: 120"
                    className={inputClass}
                    style={fontStyle}
                  />
                </div>
              )}
                    </div>
                    
            {formData.typeBien === 'Maison' && (
              <div className="mt-4 space-y-4">
                      <div>
                  <label className={labelClass} style={fontStyle}>Sous-sol</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Oui', 'Non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.sousSolOuiNon === val)}>
                        <input
                          type="radio"
                          name="sousSolOuiNon"
                          value={val}
                          checked={formData.sousSolOuiNon === val}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((prev) => ({
                              ...prev,
                              sousSolOuiNon: v,
                              ...(v === 'Non'
                                ? { sousSolAmenageOuiNon: '', sousSolTotalM2: '', sousSolAmenageM2: '' }
                                : {}),
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                ))}
              </div>
                </div>
                {formData.sousSolOuiNon === 'Oui' && (
                  <>
                    <div>
                      <label className={labelClass} style={fontStyle}>Aménagé</label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {['Oui', 'Non'].map((val) => (
                          <label key={val} className={getOptionClass(formData.sousSolAmenageOuiNon === val)}>
                            <input
                              type="radio"
                              name="sousSolAmenageOuiNon"
                              value={val}
                              checked={formData.sousSolAmenageOuiNon === val}
                              onChange={(e) => {
                                const v = e.target.value
                                setFormData((prev) => ({
                                  ...prev,
                                  sousSolAmenageOuiNon: v,
                                  sousSolAmenageM2: v === 'Oui' ? prev.sousSolTotalM2 : '',
                                }))
                              }}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm" style={fontStyle}>{val}</span>
                          </label>
                        ))}
            </div>
          </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Superficie du sous-sol (m²)</label>
                        <input
                        type="number"
                        name="sousSolTotalM2"
                        value={formData.sousSolTotalM2}
                        onChange={(e) => {
                          const v = e.target.value
                          setFormData((prev) => ({
                            ...prev,
                            sousSolTotalM2: v,
                            sousSolAmenageM2: prev.sousSolAmenageOuiNon === 'Oui' ? v : '',
                          }))
                        }}
                        min="1"
                        placeholder="Ex: 40"
                        className={inputClass}
                        style={fontStyle}
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Piscine</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {['Oui', 'Non'].map((val) => (
                        <label key={val} className={getOptionClass(formData.piscineOuiNon === val)}>
                          <input
                            type="radio"
                            name="piscineOuiNon"
                            value={val}
                            checked={formData.piscineOuiNon === val}
                            onChange={(e) => {
                              const v = e.target.value
                              setFormData((prev) => ({
                                ...prev,
                                piscineOuiNon: v,
                                ...(v === 'Non'
                                  ? {
                                      piscineAnnee: '',
                                      piscineImplantation: '',
                                      piscineChauffeeOuiNon: '',
                                      piscineEquipements: [],
                                    }
                                  : {}),
                              }))
                            }}
                            className="mr-2 accent-white"
                          />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                      </div>
            </div>
                  {formData.piscineOuiNon === 'Oui' && (
                    <>
                      <div>
                        <label className={labelClass} style={fontStyle}>Année</label>
                        <input
                          type="number"
                          name="piscineAnnee"
                          value={formData.piscineAnnee}
                          onChange={handleChange}
                          min="1950"
                          max="2026"
                          placeholder="Ex: 2018"
                          className={inputClass}
                          style={fontStyle}
                        />
                    </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Type</label>
                        <div className="grid md:grid-cols-3 gap-3 mt-2">
                          {['Enterrée', 'Semi-enterrée', 'Hors-sol'].map((opt) => (
                            <label key={opt} className={getOptionClass(formData.piscineImplantation === opt)}>
                              <input
                                type="radio"
                                name="piscineImplantation"
                                value={opt}
                                checked={formData.piscineImplantation === opt}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                            </label>
                          ))}
                  </div>
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Chauffée</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {['Oui', 'Non'].map((val) => (
                            <label key={val} className={getOptionClass(formData.piscineChauffeeOuiNon === val)}>
                              <input
                                type="radio"
                                name="piscineChauffeeOuiNon"
                                value={val}
                                checked={formData.piscineChauffeeOuiNon === val}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm" style={fontStyle}>{val}</span>
                            </label>
                ))}
              </div>
                      </div>
                      <div>
                        <p className={labelClass} style={fontStyle}>Équipements</p>
                        <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                          Plusieurs choix possibles
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 mt-2">
                          {['Volet roulant', 'Pompe à chaleur', 'Traitement automatique', 'Pool house'].map((option) => (
                            <label key={option} className={getOptionClass(formData.piscineEquipements.includes(option))}>
                              <input
                                type="checkbox"
                                checked={formData.piscineEquipements.includes(option)}
                                onChange={() => handleCheckboxChange('piscineEquipements', option)}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm" style={fontStyle}>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>

          <div className="border-t border-white/10" />

          {formData.typeBien === 'Appartement' && (
            <>
              {/* POSITION DANS L'IMMEUBLE (Appartement) */}
              <div className="pt-6">
                <p className={sectionTitleClass} style={fontStyle}>Position dans l&apos;immeuble</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      <div>
                    <label className={labelClass} style={fontStyle}>Étage</label>
                    <select name="etage" value={formData.etage} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="RDC" className="bg-black text-white">RDC</option>
                      <option value="1" className="bg-black text-white">1er</option>
                      <option value="2" className="bg-black text-white">2ème</option>
                      <option value="3" className="bg-black text-white">3ème</option>
                      <option value="4" className="bg-black text-white">4ème</option>
                      <option value="5" className="bg-black text-white">5ème</option>
                      <option value="6" className="bg-black text-white">6ème</option>
                      <option value="7" className="bg-black text-white">7ème</option>
                      <option value="8" className="bg-black text-white">8ème</option>
                      <option value="9" className="bg-black text-white">9ème</option>
                      <option value="10+" className="bg-black text-white">10ème et +</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Nombre total d&apos;étages de l&apos;immeuble</label>
                    <input type="number" name="nombreEtagesImmeuble" value={formData.nombreEtagesImmeuble} onChange={handleChange} min="1" placeholder="Ex: 5" className={inputClass} style={fontStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Rooftop</label>
                    <div className="flex gap-3 mt-1">
                      {['oui', 'non'].map((val) => (
                        <label key={val} className={getOptionClass(formData.rooftopOuiNon === val)}>
                          <input type="radio" name="rooftopOuiNon" value={val} checked={formData.rooftopOuiNon === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                        </label>
                ))}
              </div>
            </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>RDC</label>
                    <div className="flex gap-3 mt-1">
                      {['oui', 'non'].map((val) => (
                        <label key={val} className={getOptionClass(formData.rdcOuiNon === val)}>
                          <input type="radio" name="rdcOuiNon" value={val} checked={formData.rdcOuiNon === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                  </label>
                ))}
              </div>
                  </div>
                </div>
            </div>
            </>
          )}

          <div className={formData.typeBien === 'Appartement' ? 'pt-6 border-t border-white/10 space-y-6' : 'pt-6 space-y-6'}>
            <h2 className={groupTitleClass} style={fontStyle}>Caractéristiques</h2>

            {/* Configuration de la maison */}
            {formData.typeBien === 'Maison' && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <p className={sectionTitleClass} style={fontStyle}>Configuration de la maison</p>
                <div>
                  <label className={labelClass} style={fontStyle}>Type</label>
                  <select name="maisonType" value={formData.maisonType} onChange={handleChange} className={selectClass} style={fontStyle}>
                    <option value="" className="bg-black text-white">Sélectionnez...</option>
                    <option value="Individuelle" className="bg-black text-white">Individuelle</option>
                    <option value="Mitoyenne 1 côté" className="bg-black text-white">Mitoyenne 1 côté</option>
                    <option value="Mitoyenne 2 côtés" className="bg-black text-white">Mitoyenne 2 côtés</option>
                    <option value="Mitoyenne par garage ou dépendance" className="bg-black text-white">Mitoyenne par garage ou dépendance</option>
                    <option value="Mitoyenneté partielle" className="bg-black text-white">Mitoyenneté partielle</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Fait partie d&apos;un ensemble organisé</label>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    {['Lotissement avec ASL', 'Copropriété horizontale', 'Aucun', 'Je ne sais pas'].map((opt) => (
                      <label key={opt} className={getOptionClass(formData.maisonEnsembleOrganise === opt)}>
                        <input type="radio" name="maisonEnsembleOrganise" value={opt} checked={formData.maisonEnsembleOrganise === opt} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Composition */}
                      <div>
              <p className={sectionTitleClass} style={fontStyle}>Composition</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className={labelClass} style={fontStyle}>Nombre de pièces</label>
                  <input type="number" name="nombrePieces" value={formData.nombrePieces} onChange={handleChange} min="1" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Nombre de chambres</label>
                  <input type="number" name="nombreChambres" value={formData.nombreChambres} onChange={handleChange} min="0" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Salles de bain</label>
                  <input type="number" name="nombreSallesDeBain" value={formData.nombreSallesDeBain} onChange={handleChange} min="0" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Salles d'eau</label>
                  <input type="number" name="nombreSallesDEau" value={formData.nombreSallesDEau} onChange={handleChange} min="0" className={inputClass} style={fontStyle} />
                </div>
              </div>

              {/* WC */}
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className={labelClass} style={fontStyle}>Nombre de WC</label>
                  <input type="number" name="nombreWC" value={formData.nombreWC} onChange={handleChange} min="0" className={inputClass} style={fontStyle} />
                </div>
                {formData.nombreWC && parseInt(formData.nombreWC) > 0 && (
                  <div className="flex items-end">
                    <div>
                      <label className={labelClass} style={fontStyle}>WC séparés ?</label>
                      <div className="flex gap-3 mt-1">
                        {['oui', 'non'].map((val) => (
                          <label key={val} className={getOptionClass(formData.wcSepares === val)}>
                            <input type="radio" name="wcSepares" value={val} checked={formData.wcSepares === val} onChange={handleChange} className="mr-2 accent-white" />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                        </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nombre de niveaux (maisons, villas, etc.) */}
              {formData.typeBien === 'Maison' && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Nombre de niveaux</label>
                    <select name="nombreNiveaux" value={formData.nombreNiveaux} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="Plain-pied" className="bg-black text-white">Plain-pied</option>
                      <option value="R+1" className="bg-black text-white">R+1</option>
                      <option value="R+2" className="bg-black text-white">R+2</option>
                      <option value="R+3" className="bg-black text-white">R+3</option>
                      <option value="R+4" className="bg-black text-white">R+4</option>
                      <option value="R+5 ou plus" className="bg-black text-white">R+5 ou plus</option>
                        </select>
                      </div>
                </div>
              )}

              {formData.typeBien === 'Maison' && (
                <div className="pt-4 mt-4 border-t border-white/10">
                  <label className={labelClass} style={fontStyle}>Procédure en cours</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.procedureEnCoursMaison === val)}>
                        <input
                          type="radio"
                          name="procedureEnCoursMaison"
                          value={val}
                          checked={formData.procedureEnCoursMaison === val}
                          onChange={handleChange}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>

          <div className="border-t border-white/10" />

          <div className="pt-6 space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Confort & Environnement</h2>

            {/* Exposition (plusieurs réponses possibles) */}
                  <div>
              <p className={sectionTitleClass} style={fontStyle}>Exposition (plusieurs réponses possibles)</p>
              <details
                className="mt-4"
                onToggle={(e) => setExpositionMenuOpen(e.currentTarget.open)}
              >
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.exposition.length === 0
                      ? "Choisir l'exposition…"
                      : formData.exposition.length === 1
                        ? formData.exposition[0]
                        : `${formData.exposition.length} expositions sélectionnées`}
                  </span>
                  <span
                    className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${expositionMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-72 overflow-y-auto shadow-lg z-10">
                  <div className="space-y-2">
                    {['Nord', 'Sud', 'Est', 'Ouest', 'Traversant'].map((option) => (
                      <label key={option} className={`${getOptionClass(formData.exposition.includes(option))} !p-2.5`}>
                        <input type="checkbox" checked={formData.exposition.includes(option)} onChange={() => handleCheckboxChange('exposition', option)} className="mr-2 accent-white shrink-0" />
                        <span className="text-white text-sm leading-snug" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
              </details>
                    </div>

            {/* Vis-à-vis */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Vis-à-vis</p>
              <details
                className="mt-4"
                onToggle={(e) => setVisAVisMenuOpen(e.currentTarget.open)}
              >
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.visAVis ? formData.visAVis : 'Sélectionnez…'}
                  </span>
                  <span
                    className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${visAVisMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-72 overflow-y-auto shadow-lg z-10">
                  <div className="space-y-2">
                    {['Important', 'Modéré', 'Faible', 'Aucun'].map((option) => (
                      <label key={option} className={`${getOptionClass(formData.visAVis === option)} !p-2.5`}>
                        <input type="radio" name="visAVis" value={option} checked={formData.visAVis === option} onChange={handleChange} className="mr-2 accent-white shrink-0" />
                        <span className="text-white text-sm leading-snug" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
              </details>
              {formData.visAVis && formData.visAVis !== 'Aucun' && (
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Distance du voisin le plus proche</label>
                    <input type="text" name="distanceVisAVis" value={formData.distanceVisAVis} onChange={handleChange} placeholder="Ex: 5 mètres" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                )}
            </div>

            {/* La vue */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>La vue (plusieurs réponses possibles)</p>
              <details
                className="mt-4"
                onToggle={(e) => setVueMenuOpen(e.currentTarget.open)}
              >
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.vue.length === 0
                      ? 'Choisir la ou les vue(s)…'
                      : formData.vue.length === 1
                        ? formData.vue[0]
                        : `${formData.vue.length} vues sélectionnées`}
                  </span>
                  <span
                    className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${vueMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-72 overflow-y-auto shadow-lg z-10">
                  <div className="space-y-2">
                {['Complètement dégagée', 'Partiellement dégagée', 'Vue sur cour', 'Vue sur rue', 'Vue sur mer', 'Vue sur montagne', 'Vue sur jardin', 'Vue immeuble', 'Aucune'].map((option) => (
                      <label key={option} className={`${getOptionClass(formData.vue.includes(option))} !p-2.5`}>
                        <input type="checkbox" checked={formData.vue.includes(option)} onChange={() => handleCheckboxChange('vue', option)} className="mr-2 accent-white shrink-0" />
                        <span className="text-white text-sm leading-snug" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
                  </div>
              </details>
                  </div>
                  </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PHOTO AMÉNAGEMENTS EXTÉRIEURS ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Photo des aménagements extérieurs</h2>
            <p className="text-white/60 text-sm leading-relaxed -mt-2" style={fontStyle}>
              Ajoutez jusqu&apos;à 20 photos de vos aménagements extérieurs (balcon, terrasse, jardin, stationnement, etc.) pour affiner l&apos;estimation. Formats acceptés : JPG, PNG, WEBP (max 10 Mo par photo).
            </p>

            {/* Zone de drop / sélection */}
            <div
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
                        <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoAdd}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/60 text-sm" style={fontStyle}>
                  <span className="text-white font-medium">Cliquez pour ajouter des photos</span>
                  <br />
                  ou glissez-déposez vos fichiers ici
                </p>
                {photos.length > 0 && (
                  <p className="text-white/40 text-xs mt-1" style={fontStyle}>
                    {photos.length} photo{photos.length > 1 ? 's' : ''} ajoutée{photos.length > 1 ? 's' : ''}
                  </p>
                )}
                  </div>
                  </div>

            {/* Aperçu des photos */}
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={preview}
                      alt={`Photo ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handlePhotoRemove(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/70 text-[10px] text-center py-0.5" style={fontStyle}>
                      {index + 1}
                  </div>
                </div>
                ))}
              </div>
            )}

            {formData.typeBien === 'Maison' && (
              <div className="pt-2">
                <label className={labelClass} style={fontStyle}>État extérieur du terrain</label>
                <select
                  name="etatExterieurTerrain"
                  value={formData.etatExterieurTerrain}
                  onChange={handleChange}
                  className={`${selectClass} mt-2`}
                  style={fontStyle}
                >
                  <option value="" className="bg-black text-white">Sélectionnez...</option>
                  {['Excellent état', 'Très bon état', 'Bon état', 'À rafraîchir', 'À rénover', 'À rénover entièrement'].map((opt) => (
                    <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Stationnement — Maison (près des extérieurs / photos) */}
            {formData.typeBien === 'Maison' && (
              <>
              <div className="pt-4 border-t border-white/10 space-y-4">
                <p className={sectionTitleClass} style={fontStyle}>Stationnement</p>
                <div>
                  <label className={labelClass} style={fontStyle}>Emplacement</label>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    {[
                      { value: 'interieur', label: "Intérieur à l'habitation" },
                      { value: 'exterieur', label: "Extérieur à l'habitation" },
                    ].map(({ value, label }) => (
                      <label key={value} className={getOptionClass(formData.maisonStationnementLieu === value)}>
                        <input
                          type="radio"
                          name="maisonStationnementLieu"
                          value={value}
                          checked={formData.maisonStationnementLieu === value}
                          onChange={(e) => {
                            const val = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonStationnementLieu: val,
                              ...(val === 'interieur'
                                ? { maisonStationnementExterieur: [] }
                                : {
                                    maisonGarageIndepOuiNon: '',
                                    maisonGarageIndepFormat: '',
                                    maisonGarageSousSol: '',
                                    maisonAuvent: '',
                                    maisonAireNonCouverte: '',
                                    maisonAireNonCouverteSol: '',
                                  }),
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm" style={fontStyle}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.maisonStationnementLieu === 'interieur' && (
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <div>
                      <label className={labelClass} style={fontStyle}>Garage indépendant</label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {['oui', 'non'].map((val) => (
                          <label key={val} className={getOptionClass(formData.maisonGarageIndepOuiNon === val)}>
                            <input
                              type="radio"
                              name="maisonGarageIndepOuiNon"
                              value={val}
                              checked={formData.maisonGarageIndepOuiNon === val}
                              onChange={(e) => {
                                const v = e.target.value
                                setFormData((p) => ({
                                  ...p,
                                  maisonGarageIndepOuiNon: v,
                                  maisonGarageIndepFormat: v === 'non' ? '' : p.maisonGarageIndepFormat,
                                }))
                              }}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {formData.maisonGarageIndepOuiNon === 'oui' && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Simple ou double</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {(['Simple', 'Double'] as const).map((opt) => (
                            <label key={opt} className={getOptionClass(formData.maisonGarageIndepFormat === opt)}>
                              <input
                                type="radio"
                                name="maisonGarageIndepFormat"
                                value={opt}
                                checked={formData.maisonGarageIndepFormat === opt}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className={labelClass} style={fontStyle}>Garage en sous-sol</label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {['oui', 'non'].map((val) => (
                          <label key={val} className={getOptionClass(formData.maisonGarageSousSol === val)}>
                            <input type="radio" name="maisonGarageSousSol" value={val} checked={formData.maisonGarageSousSol === val} onChange={handleChange} className="mr-2 accent-white" />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Auvent</label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {['oui', 'non'].map((val) => (
                          <label key={val} className={getOptionClass(formData.maisonAuvent === val)}>
                            <input type="radio" name="maisonAuvent" value={val} checked={formData.maisonAuvent === val} onChange={handleChange} className="mr-2 accent-white" />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Aire de stationnement non couverte</label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {['oui', 'non'].map((val) => (
                          <label key={val} className={getOptionClass(formData.maisonAireNonCouverte === val)}>
                            <input
                              type="radio"
                              name="maisonAireNonCouverte"
                              value={val}
                              checked={formData.maisonAireNonCouverte === val}
                              onChange={(e) => {
                                const v = e.target.value
                                setFormData((p) => ({
                                  ...p,
                                  maisonAireNonCouverte: v,
                                  maisonAireNonCouverteSol: v === 'non' ? '' : p.maisonAireNonCouverteSol,
                                }))
                              }}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {formData.maisonAireNonCouverte === 'oui' && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Revêtement de l&apos;aire</label>
                        <select
                          name="maisonAireNonCouverteSol"
                          value={formData.maisonAireNonCouverteSol}
                          onChange={handleChange}
                          className={`${selectClass} mt-2`}
                          style={fontStyle}
                        >
                          <option value="" className="bg-black text-white">Sélectionnez…</option>
                          {MAISON_AIRE_NON_COUVERTE_SOL_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {formData.maisonStationnementLieu === 'exterieur' && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <p className={labelClass} style={fontStyle}>Aménagements</p>
                    <p className="text-white/50 text-xs mb-2 uppercase tracking-wide" style={fontStyle}>Plusieurs choix possibles</p>
                    <div className="grid md:grid-cols-1 gap-2">
                      {MAISON_STATIONNEMENT_EXTERIEUR_OPTIONS.map((option) => (
                        <label key={option} className={getOptionClass(formData.maisonStationnementExterieur.includes(option))}>
                          <input
                            type="checkbox"
                            checked={formData.maisonStationnementExterieur.includes(option)}
                            onChange={() => handleCheckboxChange('maisonStationnementExterieur', option)}
                            className="mr-2 accent-white"
                          />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <p className={sectionTitleClass} style={fontStyle}>Terrain clos, accès et sécurité</p>

                <div>
                  <label className={labelClass} style={fontStyle}>Terrain clos</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonTerrainClos === val)}>
                        <input
                          type="radio"
                          name="maisonTerrainClos"
                          value={val}
                          checked={formData.maisonTerrainClos === val}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonTerrainClos: v,
                              maisonTypeCloture: v === 'non' ? '' : p.maisonTypeCloture,
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.maisonTerrainClos === 'oui' && (
                  <div>
                    <label className={labelClass} style={fontStyle}>Type de clôture</label>
                    <select
                      name="maisonTypeCloture"
                      value={formData.maisonTypeCloture}
                      onChange={handleChange}
                      className={`${selectClass} mt-2`}
                      style={fontStyle}
                    >
                      <option value="" className="bg-black text-white">Sélectionnez…</option>
                      {MAISON_TYPE_CLOTURE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className={labelClass} style={fontStyle}>Présence d&apos;un portail</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonPortail === val)}>
                        <input
                          type="radio"
                          name="maisonPortail"
                          value={val}
                          checked={formData.maisonPortail === val}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonPortail: v,
                              ...(v === 'non'
                                ? { maisonTypePortail: '', maisonSystemeAcces: [] }
                                : {}),
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.maisonPortail === 'oui' && (
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <div>
                      <label className={labelClass} style={fontStyle}>Type de portail</label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          { value: 'manuel', label: 'Manuel' },
                          { value: 'motorise', label: 'Motorisé' },
                        ].map(({ value, label }) => (
                          <label key={value} className={getOptionClass(formData.maisonTypePortail === value)}>
                            <input
                              type="radio"
                              name="maisonTypePortail"
                              value={value}
                              checked={formData.maisonTypePortail === value}
                              onChange={handleChange}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm" style={fontStyle}>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className={labelClass} style={fontStyle}>Système d&apos;accès</p>
                      <p className="text-white/50 text-xs mb-2 uppercase tracking-wide" style={fontStyle}>Plusieurs choix possibles</p>
                      <div className="grid md:grid-cols-1 gap-2">
                        {MAISON_SYSTEME_ACCES_OPTIONS.map((option) => (
                          <label key={option} className={getOptionClass(formData.maisonSystemeAcces.includes(option))}>
                            <input
                              type="checkbox"
                              checked={formData.maisonSystemeAcces.includes(option)}
                              onChange={() => handleCheckboxChange('maisonSystemeAcces', option)}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm" style={fontStyle}>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className={labelClass} style={fontStyle}>Alarme</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonAlarme === val)}>
                        <input type="radio" name="maisonAlarme" value={val} checked={formData.maisonAlarme === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={fontStyle}>Caméras</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonCameras === val)}>
                        <input type="radio" name="maisonCameras" value={val} checked={formData.maisonCameras === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={fontStyle}>Éclairage extérieur</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {(
                      [
                        { value: 'oui', label: 'Oui' },
                        { value: 'non', label: 'Non' },
                        { value: 'aucun', label: 'Aucun' },
                        { value: 'autre', label: 'Autres à préciser' },
                      ] as const
                    ).map(({ value, label }) => (
                      <label key={value} className={getOptionClass(formData.maisonEclairageExterieur === value)}>
                        <input
                          type="radio"
                          name="maisonEclairageExterieur"
                          value={value}
                          checked={formData.maisonEclairageExterieur === value}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonEclairageExterieur: v,
                              maisonEclairageExterieurPreciser: v === 'autre' ? p.maisonEclairageExterieurPreciser : '',
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm" style={fontStyle}>{label}</span>
                      </label>
                    ))}
                  </div>
                  {formData.maisonEclairageExterieur === 'autre' && (
                    <div className="mt-2">
                      <label className={labelClass} style={fontStyle}>Précisez</label>
                      <input
                        type="text"
                        name="maisonEclairageExterieurPreciser"
                        value={formData.maisonEclairageExterieurPreciser}
                        onChange={handleChange}
                        placeholder="Ex : projecteurs, détecteurs…"
                        className={`${inputClass} mt-1`}
                        style={fontStyle}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass} style={fontStyle}>Autres à préciser</label>
                  <textarea
                    name="maisonPerimetreAutre"
                    value={formData.maisonPerimetreAutre}
                    onChange={handleChange}
                    placeholder="Informations complémentaires sur le périmètre, l'accès ou la sécurité…"
                    rows={3}
                    className={`${inputClass} mt-2 resize-y min-h-[4.5rem]`}
                    style={fontStyle}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <p className={sectionTitleClass} style={fontStyle}>État extérieur de la maison</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {(
                    [
                      { name: 'etatFacade' as const, label: 'Façade' },
                      { name: 'etatToiture' as const, label: 'Toiture' },
                      { name: 'etatMursExterieurs' as const, label: 'Murs extérieurs' },
                    ] as const
                  ).map((field) => (
                    <div key={field.name}>
                      <label className={labelClass} style={fontStyle}>{field.label}</label>
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`${selectClass} mt-2`}
                        style={fontStyle}
                      >
                        <option value="" className="bg-black text-white">Sélectionnez…</option>
                        {MAISON_ETAT_EXTERIEUR_ENVELOPPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              </>
            )}
          </div>

          <div className="border-t border-white/10" />

          <div className="space-y-8 pt-2">
            {formData.typeBien === 'Maison' ? (
              <div>
                <p className={sectionTitleClass} style={fontStyle}>Prestations extérieures</p>
                <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                  Plusieurs choix possibles
                </p>
                <details className="mt-4" onToggle={(e) => setPrestationsExterieuresMaisonMenuOpen(e.currentTarget.open)}>
                  <summary
                    className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                    style={fontStyle}
                  >
                    <span className="truncate text-left">
                      {formData.prestationsExterieuresMaison.length === 0
                        ? 'Sélectionnez…'
                        : formData.prestationsExterieuresMaison.length === 1
                          ? formData.prestationsExterieuresMaison[0]
                          : `${formData.prestationsExterieuresMaison.length} sélections`}
                    </span>
                    <span className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${prestationsExterieuresMaisonMenuOpen ? 'rotate-180' : ''}`} aria-hidden>
                      {'\u25BC'}
                    </span>
                  </summary>
                  <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-80 overflow-y-auto shadow-lg z-10 space-y-4">
                    <div className="space-y-2">
                      {PRESTATIONS_EXTERIEURES_MAISON_OPTIONS.map((option) => (
                        <label key={option} className={`${getOptionClass(formData.prestationsExterieuresMaison.includes(option))} !p-2.5`}>
                          <input
                            type="checkbox"
                            checked={formData.prestationsExterieuresMaison.includes(option)}
                            onChange={() => togglePrestationExterieureMaison(option)}
                            className="mr-2 accent-white shrink-0"
                          />
                          <span className="text-white text-sm leading-snug" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.prestationsExterieuresMaison.includes('Autre à préciser') && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Précisez</label>
                        <input
                          type="text"
                          name="prestationsExterieuresMaisonAutre"
                          value={formData.prestationsExterieuresMaisonAutre}
                          onChange={handleChange}
                          placeholder="Autre prestation extérieure…"
                          className={`${inputClass} mt-1`}
                          style={fontStyle}
                        />
                      </div>
                    )}
                  </div>
                </details>
              </div>
            ) : (
              <div>
                <p className={sectionTitleClass} style={fontStyle}>Mes extérieurs</p>
                <details className="mt-4" onToggle={(e) => setMesExterieursMenuOpen(e.currentTarget.open)}>
                  <summary
                    className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                    style={fontStyle}
                  >
                    <span className="truncate text-left">
                      {formData.mesExterieurs.length === 0
                        ? 'Choisir vos extérieurs…'
                        : formData.mesExterieurs.length === 1
                          ? formData.mesExterieurs[0]
                          : `${formData.mesExterieurs.length} sélections`}
                    </span>
                    <span className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${mesExterieursMenuOpen ? 'rotate-180' : ''}`} aria-hidden>
                      {'\u25BC'}
                    </span>
                  </summary>
                  <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-80 overflow-y-auto shadow-lg z-10 space-y-4">
                    <div className="space-y-2">
                      {['Terrasse', 'Balcon', 'Rooftop', 'Cour privative', 'Jardin privatif', 'Aucun', 'Autres à préciser'].map((option) => (
                        <label key={option} className={`${getOptionClass(formData.mesExterieurs.includes(option))} !p-2.5`}>
                          <input
                            type="checkbox"
                            checked={formData.mesExterieurs.includes(option)}
                            onChange={() => toggleMesExterieur(option)}
                            className="mr-2 accent-white shrink-0"
                          />
                          <span className="text-white text-sm leading-snug" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.mesExterieurs.includes('Autres à préciser') && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Précisez</label>
                        <input type="text" name="mesExterieursAutre" value={formData.mesExterieursAutre} onChange={handleChange} placeholder="Autres extérieurs…" className={`${inputClass} mt-1`} style={fontStyle} />
                      </div>
                    )}
                    <div>
                      <label className={labelClass} style={fontStyle}>Superficie (si concerné)</label>
                      <input type="text" name="mesExterieursSuperficie" value={formData.mesExterieursSuperficie} onChange={handleChange} placeholder="Ex: 25 m²" className={`${inputClass} mt-1`} style={fontStyle} />
                    </div>
                  </div>
                </details>
              </div>
            )}

            {/* Annexes */}
              <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Annexes</p>
              <details className="mt-4" onToggle={(e) => setAnnexesMenuOpen(e.currentTarget.open)}>
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.annexesAucunActif
                      ? 'Aucune annexe'
                      : (() => {
                          const bits: string[] = []
                          if (formData.annexeLoggiaFermee) bits.push(`Loggia fermée: ${formData.annexeLoggiaFermee}`)
                          if (formData.annexeCellier) bits.push(`Cellier: ${formData.annexeCellier}`)
                          if (formData.annexeCave) bits.push(`Cave: ${formData.annexeCave}`)
                          if (formData.annexeLocalVelo) bits.push(`Local vélo: ${formData.annexeLocalVelo}`)
                          if (formData.annexesAutreDetail.trim()) bits.push('Autre')
                          return bits.length ? bits.join(' · ') : 'Renseigner les annexes…'
                        })()}
                  </span>
                  <span className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${annexesMenuOpen ? 'rotate-180' : ''}`} aria-hidden>
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-96 overflow-y-auto shadow-lg z-10 space-y-4">
                  <label className={`${getOptionClass(formData.annexesAucunActif)} !p-2.5`}>
                    <input
                      type="checkbox"
                      checked={formData.annexesAucunActif}
                      onChange={(e) => {
                        const on = e.target.checked
                        setFormData((p) => ({
                          ...p,
                          annexesAucunActif: on,
                          ...(on
                            ? {
                                annexeLoggiaFermee: '',
                                annexeCellier: '',
                                annexeCave: '',
                                annexeLocalVelo: '',
                                annexesAutreDetail: '',
                              }
                            : {}),
                        }))
                      }}
                      className="mr-2 accent-white shrink-0"
                    />
                    <span className="text-white text-sm leading-snug" style={fontStyle}>Aucun</span>
                  </label>
                  <div className={`space-y-4 ${formData.annexesAucunActif ? 'opacity-40 pointer-events-none' : ''}`}>
                    <div>
                      <p className={`${labelClass} mb-2`} style={fontStyle}>Loggia fermée</p>
                      <div className="flex flex-wrap gap-3">
                        {['oui', 'non'].map((v) => (
                          <label key={v} className={getOptionClass(formData.annexeLoggiaFermee === v)}>
                            <input
                              type="radio"
                              name="annexeLoggiaFermee"
                              value={v}
                              checked={formData.annexeLoggiaFermee === v}
                              onChange={() => patchAnnexes({ annexeLoggiaFermee: v })}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{v}</span>
                      </label>
                  ))}
                </div>
                    </div>
                  <div>
                      <p className={`${labelClass} mb-2`} style={fontStyle}>Cellier</p>
                      <div className="flex flex-wrap gap-3">
                        {['oui', 'non'].map((v) => (
                          <label key={v} className={getOptionClass(formData.annexeCellier === v)}>
                            <input
                              type="radio"
                              name="annexeCellier"
                              value={v}
                              checked={formData.annexeCellier === v}
                              onChange={() => patchAnnexes({ annexeCellier: v })}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{v}</span>
                        </label>
                      ))}
                  </div>
                    </div>
                        <div>
                      <p className={`${labelClass} mb-2`} style={fontStyle}>Cave</p>
                      <div className="flex flex-wrap gap-3">
                        {['oui', 'non'].map((v) => (
                          <label key={v} className={getOptionClass(formData.annexeCave === v)}>
                            <input
                              type="radio"
                              name="annexeCave"
                              value={v}
                              checked={formData.annexeCave === v}
                              onChange={() => patchAnnexes({ annexeCave: v })}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{v}</span>
                      </label>
                    ))}
                  </div>
                        </div>
                        <div>
                      <p className={`${labelClass} mb-2`} style={fontStyle}>Local vélo</p>
                      <div className="flex flex-wrap gap-3">
                        {['oui', 'non'].map((v) => (
                          <label key={v} className={getOptionClass(formData.annexeLocalVelo === v)}>
                            <input
                              type="radio"
                              name="annexeLocalVelo"
                              value={v}
                              checked={formData.annexeLocalVelo === v}
                              onChange={() => patchAnnexes({ annexeLocalVelo: v })}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{v}</span>
                              </label>
                            ))}
                          </div>
                  </div>
                  <div>
                      <label className={labelClass} style={fontStyle}>Autre à préciser</label>
                      <input
                        type="text"
                        name="annexesAutreDetail"
                        value={formData.annexesAutreDetail}
                        onChange={(e) => patchAnnexes({ annexesAutreDetail: e.target.value })}
                        placeholder="Précisez…"
                        disabled={formData.annexesAucunActif}
                        className={`${inputClass} mt-1`}
                        style={fontStyle}
                      />
                    </div>
                  </div>
                </div>
              </details>
              </div>

            {formData.typeBien !== 'Maison' && (
            <>
            {/* Stationnement (synthèse) — appartements / autres types */}
              <div className="pt-4 border-t border-white/10">
                <p className={sectionTitleClass} style={fontStyle}>Stationnement</p>
              <details className="mt-4" onToggle={(e) => setParkingBlocMenuOpen(e.currentTarget.open)}>
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {!formData.parkingBlocType
                      ? 'Préciser le stationnement…'
                      : formData.parkingBlocType === 'Autres à préciser' && formData.parkingBlocAutre.trim()
                        ? formData.parkingBlocAutre
                        : formData.parkingBlocType}
                  </span>
                  <span className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${parkingBlocMenuOpen ? 'rotate-180' : ''}`} aria-hidden>
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-2 rounded-lg border border-white/20 bg-black/95 p-3 max-h-96 overflow-y-auto shadow-lg z-10 space-y-4">
                  <div className="space-y-2">
                    {(['Intérieur', 'Extérieur', 'Aucun', 'Autres à préciser'] as const).map((opt) => (
                      <label key={opt} className={`${getOptionClass(formData.parkingBlocType === opt)} !p-2.5`}>
                        <input
                          type="radio"
                          name="parkingBlocType"
                          value={opt}
                          checked={formData.parkingBlocType === opt}
                          onChange={handleChange}
                          className="mr-2 accent-white shrink-0"
                        />
                        <span className="text-white text-sm leading-snug" style={fontStyle}>{opt}</span>
                    </label>
                  ))}
                </div>
                  {formData.parkingBlocType === 'Intérieur' && (
                      <div>
                      <p className={`${labelClass} mb-2`} style={fontStyle}>Box fermé</p>
                      <div className="flex flex-wrap gap-3">
                        {['oui', 'non'].map((v) => (
                          <label key={v} className={getOptionClass(formData.parkingBlocInterieurBoxFerme === v)}>
                            <input type="radio" name="parkingBlocInterieurBoxFerme" value={v} checked={formData.parkingBlocInterieurBoxFerme === v} onChange={handleChange} className="mr-2 accent-white" />
                            <span className="text-white text-sm capitalize" style={fontStyle}>{v}</span>
                      </label>
                          ))}
                        </div>
                      </div>
                    )}
                  {formData.parkingBlocType === 'Extérieur' && (
                    <div className="space-y-4">
                    <div>
                        <p className={`${labelClass} mb-2`} style={fontStyle}>Privé ou libre</p>
                        <div className="flex flex-wrap gap-3">
                          {(['Privé', 'Libre'] as const).map((opt) => (
                            <label key={opt} className={getOptionClass(formData.parkingBlocExtPriveLibre === opt)}>
                              <input type="radio" name="parkingBlocExtPriveLibre" value={opt} checked={formData.parkingBlocExtPriveLibre === opt} onChange={handleChange} className="mr-2 accent-white" />
                              <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                      <div>
                        <p className={`${labelClass} mb-2`} style={fontStyle}>Couvert ou non</p>
                        <div className="flex flex-wrap gap-3">
                          {(['Couvert', 'Non couvert'] as const).map((opt) => (
                            <label key={opt} className={getOptionClass(formData.parkingBlocExtCouvert === opt)}>
                              <input type="radio" name="parkingBlocExtCouvert" value={opt} checked={formData.parkingBlocExtCouvert === opt} onChange={handleChange} className="mr-2 accent-white" />
                              <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                          </label>
                        ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {formData.parkingBlocType === 'Autres à préciser' && (
                    <div>
                      <label className={labelClass} style={fontStyle}>Précisez</label>
                      <input type="text" name="parkingBlocAutre" value={formData.parkingBlocAutre} onChange={handleChange} placeholder="Autre stationnement…" className={`${inputClass} mt-1`} style={fontStyle} />
                </div>
                  )}
              </div>
              </details>
            </div>
            </>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* Photos intérieur */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Photos de l&apos;intérieur du bien</h2>
            <p className="text-white/60 text-sm leading-relaxed -mt-2" style={fontStyle}>
              Ajoutez jusqu&apos;à 20 photos des pièces, de la cuisine, des salles d&apos;eau, etc. Formats acceptés : JPG, PNG, WEBP (max 10 Mo par photo).
            </p>

            <div
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              onClick={() => fileInputRefInterieur.current?.click()}
            >
              <input
                ref={fileInputRefInterieur}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoAddInterieur}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/60 text-sm" style={fontStyle}>
                  <span className="text-white font-medium">Cliquez pour ajouter des photos</span>
                  <br />
                  ou glissez-déposez vos fichiers ici
                </p>
                {photosInterieur.length > 0 && (
                  <p className="text-white/40 text-xs mt-1" style={fontStyle}>
                    {photosInterieur.length} photo{photosInterieur.length > 1 ? 's' : ''} intérieur ajoutée{photosInterieur.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {photoPreviewsInterieur.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {photoPreviewsInterieur.map((preview, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={preview}
                      alt={`Photo intérieur ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handlePhotoRemoveInterieur(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/70 text-[10px] text-center py-0.5" style={fontStyle}>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Niveau global du bien (menu déroulant) */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Niveau global du bien</h2>
            <select
              name="standing"
              value={formData.standing}
              onChange={handleChange}
              className={selectClass}
              style={fontStyle}
              aria-label="Niveau global du bien"
            >
              <option value="" className="bg-black text-white">Sélectionnez…</option>
              <option value="Standard" className="bg-black text-white">Standard</option>
              <option value="Bon standing" className="bg-black text-white">Bon standing</option>
              <option value="Haut de gamme" className="bg-black text-white">Haut de gamme</option>
              <option value="Luxe / Exceptionnel" className="bg-black text-white">Luxe / Exceptionnel</option>
            </select>
          </div>

          {/* État général du bien (menu déroulant) */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>État général du bien</h2>
            <select
              name="etatBien"
              value={formData.etatBien}
              onChange={handleChange}
              className={selectClass}
              style={fontStyle}
              aria-label="État général du bien"
            >
              <option value="" className="bg-black text-white">Sélectionnez…</option>
              <option value="À rénover" className="bg-black text-white">À rénover</option>
              <option value="À rafraîchir" className="bg-black text-white">À rafraîchir</option>
              <option value="Bon état" className="bg-black text-white">Bon état</option>
              <option value="Excellent état" className="bg-black text-white">Excellent état</option>
            </select>
          </div>

          {/* Distribution du logement (appartement) / Extensions / dépendances (maison) */}
          {formData.typeBien === 'Maison' ? (
            <div className="space-y-10 pt-2">
              <h2 className={groupTitleClass} style={fontStyle}>Extensions et dépendances</h2>

              {/* Véranda */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <p className={sectionTitleClass} style={fontStyle}>Véranda</p>
                <div>
                  <label className={labelClass} style={fontStyle}>Disposez-vous d&apos;une véranda ?</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonVerandaPresent === val)}>
                        <input
                          type="radio"
                          name="maisonVerandaPresent"
                          value={val}
                          checked={formData.maisonVerandaPresent === val}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonVerandaPresent: v,
                              ...(v !== 'oui'
                                ? {
                                    maisonVerandaSuperficie: '',
                                    maisonVerandaChauffee: '',
                                    maisonVerandaNature: '',
                                    maisonVerandaUsage: '',
                                    maisonVerandaUrbObtenue: '',
                                    maisonVerandaUrbType: '',
                                    maisonVerandaUrbTypeAutre: '',
                                    maisonVerandaUrbTravauxConformes: '',
                                    maisonVerandaUrbRegularisee: '',
                                  }
                                : {}),
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.maisonVerandaPresent === 'oui' && (
                  <div className="space-y-4 md:pl-4 md:border-l border-white/10">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={fontStyle}>Superficie</label>
                        <input
                          type="text"
                          name="maisonVerandaSuperficie"
                          value={formData.maisonVerandaSuperficie}
                          onChange={handleChange}
                          placeholder="Ex : 12 m²"
                          className={`${inputClass} mt-2`}
                          style={fontStyle}
                        />
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Chauffée</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {['oui', 'non'].map((val) => (
                            <label key={val} className={getOptionClass(formData.maisonVerandaChauffee === val)}>
                              <input
                                type="radio"
                                name="maisonVerandaChauffee"
                                value={val}
                                checked={formData.maisonVerandaChauffee === val}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Nature</label>
                      <input
                        type="text"
                        name="maisonVerandaNature"
                        value={formData.maisonVerandaNature}
                        onChange={handleChange}
                        placeholder="Matériaux, configuration…"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Usage</label>
                      <input
                        type="text"
                        name="maisonVerandaUsage"
                        value={formData.maisonVerandaUsage}
                        onChange={handleChange}
                        placeholder="Séjour, jardin d&apos;hiver…"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-4">
                      <label className={labelClass} style={fontStyle}>Une autorisation d&apos;urbanisme a-t-elle été obtenue ?</label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {MAISON_OUI_NON_NE.map(({ value, label }) => (
                          <label key={value} className={getOptionClass(formData.maisonVerandaUrbObtenue === value)}>
                            <input
                              type="radio"
                              name="maisonVerandaUrbObtenue"
                              value={value}
                              checked={formData.maisonVerandaUrbObtenue === value}
                              onChange={(e) => {
                                const v = e.target.value
                                setFormData((p) => ({
                                  ...p,
                                  maisonVerandaUrbObtenue: v,
                                  maisonVerandaUrbType: '',
                                  maisonVerandaUrbTypeAutre: '',
                                  maisonVerandaUrbTravauxConformes: '',
                                  maisonVerandaUrbRegularisee: '',
                                }))
                              }}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm" style={fontStyle}>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.maisonVerandaUrbObtenue === 'oui' && (
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass} style={fontStyle}>Si oui : type d&apos;autorisation</label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {MAISON_URB_TYPE_OPTIONS.map(({ value, label }) => (
                              <label key={value} className={getOptionClass(formData.maisonVerandaUrbType === value)}>
                                <input
                                  type="radio"
                                  name="maisonVerandaUrbType"
                                  value={value}
                                  checked={formData.maisonVerandaUrbType === value}
                                  onChange={(e) => {
                                    const v = e.target.value
                                    setFormData((p) => ({
                                      ...p,
                                      maisonVerandaUrbType: v,
                                      maisonVerandaUrbTypeAutre: v === 'autre' ? p.maisonVerandaUrbTypeAutre : '',
                                    }))
                                  }}
                                  className="mr-2 accent-white"
                                />
                                <span className="text-white text-sm" style={fontStyle}>{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {formData.maisonVerandaUrbType === 'autre' && (
                          <div>
                            <label className={labelClass} style={fontStyle}>Précisez</label>
                            <input
                              type="text"
                              name="maisonVerandaUrbTypeAutre"
                              value={formData.maisonVerandaUrbTypeAutre}
                              onChange={handleChange}
                              className={`${inputClass} mt-2`}
                              style={fontStyle}
                            />
                          </div>
                        )}
                        <div>
                          <label className={labelClass} style={fontStyle}>Si oui : les travaux ont-ils été réalisés conformément à l&apos;autorisation ?</label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {MAISON_OUI_NON_NE.map(({ value, label }) => (
                              <label key={value} className={getOptionClass(formData.maisonVerandaUrbTravauxConformes === value)}>
                                <input
                                  type="radio"
                                  name="maisonVerandaUrbTravauxConformes"
                                  value={value}
                                  checked={formData.maisonVerandaUrbTravauxConformes === value}
                                  onChange={(e) => {
                                    const v = e.target.value
                                    setFormData((p) => ({
                                      ...p,
                                      maisonVerandaUrbTravauxConformes: v,
                                      ...(v !== 'non' ? { maisonVerandaUrbRegularisee: '' } : {}),
                                    }))
                                  }}
                                  className="mr-2 accent-white"
                                />
                                <span className="text-white text-sm" style={fontStyle}>{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {formData.maisonVerandaUrbTravauxConformes === 'non' && (
                          <div>
                            <label className={labelClass} style={fontStyle}>
                              La véranda a-t-elle été régularisée si nécessaire ?
                            </label>
                            <div className="flex flex-wrap gap-3 mt-2">
                              {MAISON_OUI_NON_NE.map(({ value, label }) => (
                                <label key={value} className={getOptionClass(formData.maisonVerandaUrbRegularisee === value)}>
                                  <input
                                    type="radio"
                                    name="maisonVerandaUrbRegularisee"
                                    value={value}
                                    checked={formData.maisonVerandaUrbRegularisee === value}
                                    onChange={handleChange}
                                    className="mr-2 accent-white"
                                  />
                                  <span className="text-white text-sm" style={fontStyle}>{label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {formData.maisonVerandaUrbObtenue === 'non' && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Si non : la véranda a-t-elle été régularisée si nécessaire ?</label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {MAISON_OUI_NON_NE.map(({ value, label }) => (
                            <label key={value} className={getOptionClass(formData.maisonVerandaUrbRegularisee === value)}>
                              <input
                                type="radio"
                                name="maisonVerandaUrbRegularisee"
                                value={value}
                                checked={formData.maisonVerandaUrbRegularisee === value}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm" style={fontStyle}>{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Extension */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <p className={sectionTitleClass} style={fontStyle}>Extension</p>
                <div>
                  <label className={labelClass} style={fontStyle}>Disposez-vous d&apos;une extension ?</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonExtensionPresent === val)}>
                        <input
                          type="radio"
                          name="maisonExtensionPresent"
                          value={val}
                          checked={formData.maisonExtensionPresent === val}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonExtensionPresent: v,
                              ...(v !== 'oui'
                                ? {
                                    maisonExtensionSuperficie: '',
                                    maisonExtensionChauffee: '',
                                    maisonExtensionNature: '',
                                    maisonExtensionUsage: '',
                                    maisonExtensionUrbObtenue: '',
                                    maisonExtensionUrbType: '',
                                    maisonExtensionUrbTypeAutre: '',
                                    maisonExtensionUrbTravauxConformes: '',
                                    maisonExtensionUrbRegularisee: '',
                                  }
                                : {}),
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.maisonExtensionPresent === 'oui' && (
                  <div className="space-y-4 md:pl-4 md:border-l border-white/10">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={fontStyle}>Superficie</label>
                        <input
                          type="text"
                          name="maisonExtensionSuperficie"
                          value={formData.maisonExtensionSuperficie}
                          onChange={handleChange}
                          placeholder="Ex : 20 m²"
                          className={`${inputClass} mt-2`}
                          style={fontStyle}
                        />
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Chauffée</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {['oui', 'non'].map((val) => (
                            <label key={val} className={getOptionClass(formData.maisonExtensionChauffee === val)}>
                              <input
                                type="radio"
                                name="maisonExtensionChauffee"
                                value={val}
                                checked={formData.maisonExtensionChauffee === val}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Nature</label>
                      <input
                        type="text"
                        name="maisonExtensionNature"
                        value={formData.maisonExtensionNature}
                        onChange={handleChange}
                        placeholder="Pièce, garage, surélévation…"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Usage</label>
                      <input
                        type="text"
                        name="maisonExtensionUsage"
                        value={formData.maisonExtensionUsage}
                        onChange={handleChange}
                        placeholder="Chambre, bureau…"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-4">
                      <label className={labelClass} style={fontStyle}>Une autorisation d&apos;urbanisme a-t-elle été obtenue ?</label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {MAISON_OUI_NON_NE.map(({ value, label }) => (
                          <label key={value} className={getOptionClass(formData.maisonExtensionUrbObtenue === value)}>
                            <input
                              type="radio"
                              name="maisonExtensionUrbObtenue"
                              value={value}
                              checked={formData.maisonExtensionUrbObtenue === value}
                              onChange={(e) => {
                                const v = e.target.value
                                setFormData((p) => ({
                                  ...p,
                                  maisonExtensionUrbObtenue: v,
                                  maisonExtensionUrbType: '',
                                  maisonExtensionUrbTypeAutre: '',
                                  maisonExtensionUrbTravauxConformes: '',
                                  maisonExtensionUrbRegularisee: '',
                                }))
                              }}
                              className="mr-2 accent-white"
                            />
                            <span className="text-white text-sm" style={fontStyle}>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.maisonExtensionUrbObtenue === 'oui' && (
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass} style={fontStyle}>Si oui : type d&apos;autorisation</label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {MAISON_URB_TYPE_OPTIONS.map(({ value, label }) => (
                              <label key={value} className={getOptionClass(formData.maisonExtensionUrbType === value)}>
                                <input
                                  type="radio"
                                  name="maisonExtensionUrbType"
                                  value={value}
                                  checked={formData.maisonExtensionUrbType === value}
                                  onChange={(e) => {
                                    const v = e.target.value
                                    setFormData((p) => ({
                                      ...p,
                                      maisonExtensionUrbType: v,
                                      maisonExtensionUrbTypeAutre: v === 'autre' ? p.maisonExtensionUrbTypeAutre : '',
                                    }))
                                  }}
                                  className="mr-2 accent-white"
                                />
                                <span className="text-white text-sm" style={fontStyle}>{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {formData.maisonExtensionUrbType === 'autre' && (
                          <div>
                            <label className={labelClass} style={fontStyle}>Précisez</label>
                            <input
                              type="text"
                              name="maisonExtensionUrbTypeAutre"
                              value={formData.maisonExtensionUrbTypeAutre}
                              onChange={handleChange}
                              className={`${inputClass} mt-2`}
                              style={fontStyle}
                            />
                          </div>
                        )}
                        <div>
                          <label className={labelClass} style={fontStyle}>Si oui : les travaux ont-ils été réalisés conformément à l&apos;autorisation ?</label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {MAISON_OUI_NON_NE.map(({ value, label }) => (
                              <label key={value} className={getOptionClass(formData.maisonExtensionUrbTravauxConformes === value)}>
                                <input
                                  type="radio"
                                  name="maisonExtensionUrbTravauxConformes"
                                  value={value}
                                  checked={formData.maisonExtensionUrbTravauxConformes === value}
                                  onChange={(e) => {
                                    const v = e.target.value
                                    setFormData((p) => ({
                                      ...p,
                                      maisonExtensionUrbTravauxConformes: v,
                                      ...(v !== 'non' ? { maisonExtensionUrbRegularisee: '' } : {}),
                                    }))
                                  }}
                                  className="mr-2 accent-white"
                                />
                                <span className="text-white text-sm" style={fontStyle}>{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {formData.maisonExtensionUrbTravauxConformes === 'non' && (
                          <div>
                            <label className={labelClass} style={fontStyle}>
                              L&apos;extension a-t-elle été régularisée si nécessaire ?
                            </label>
                            <div className="flex flex-wrap gap-3 mt-2">
                              {MAISON_OUI_NON_NE.map(({ value, label }) => (
                                <label key={value} className={getOptionClass(formData.maisonExtensionUrbRegularisee === value)}>
                                  <input
                                    type="radio"
                                    name="maisonExtensionUrbRegularisee"
                                    value={value}
                                    checked={formData.maisonExtensionUrbRegularisee === value}
                                    onChange={handleChange}
                                    className="mr-2 accent-white"
                                  />
                                  <span className="text-white text-sm" style={fontStyle}>{label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {formData.maisonExtensionUrbObtenue === 'non' && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Si non : l&apos;extension a-t-elle été régularisée si nécessaire ?</label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {MAISON_OUI_NON_NE.map(({ value, label }) => (
                            <label key={value} className={getOptionClass(formData.maisonExtensionUrbRegularisee === value)}>
                              <input
                                type="radio"
                                name="maisonExtensionUrbRegularisee"
                                value={value}
                                checked={formData.maisonExtensionUrbRegularisee === value}
                                onChange={handleChange}
                                className="mr-2 accent-white"
                              />
                              <span className="text-white text-sm" style={fontStyle}>{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dépendances */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <p className={sectionTitleClass} style={fontStyle}>Dépendance(s)</p>
                <div>
                  <label className={labelClass} style={fontStyle}>Y a-t-il une dépendance ?</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.maisonDependancePresent === val)}>
                        <input
                          type="radio"
                          name="maisonDependancePresent"
                          value={val}
                          checked={formData.maisonDependancePresent === val}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData((p) => ({
                              ...p,
                              maisonDependancePresent: v,
                              ...(v !== 'oui'
                                ? {
                                    maisonDependanceNombre: '',
                                    maisonDependanceSuperficie: '',
                                    maisonDependanceNature: '',
                                    maisonDependanceUsage: '',
                                    maisonDependanceAutorisationUrb: '',
                                  }
                                : {}),
                            }))
                          }}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.maisonDependancePresent === 'oui' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={fontStyle}>Nombre</label>
                      <input
                        type="text"
                        name="maisonDependanceNombre"
                        value={formData.maisonDependanceNombre}
                        onChange={handleChange}
                        placeholder="Ex : 2"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Superficie totale (ou par unité)</label>
                      <input
                        type="text"
                        name="maisonDependanceSuperficie"
                        value={formData.maisonDependanceSuperficie}
                        onChange={handleChange}
                        placeholder="Ex : 25 m²"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass} style={fontStyle}>Nature</label>
                      <input
                        type="text"
                        name="maisonDependanceNature"
                        value={formData.maisonDependanceNature}
                        onChange={handleChange}
                        placeholder="Abri, pool-house, atelier…"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass} style={fontStyle}>Usage</label>
                      <input
                        type="text"
                        name="maisonDependanceUsage"
                        value={formData.maisonDependanceUsage}
                        onChange={handleChange}
                        placeholder="Rangement, loisirs…"
                        className={`${inputClass} mt-2`}
                        style={fontStyle}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass} style={fontStyle}>Autorisation d&apos;urbanisme accordée ?</label>
                      <textarea
                        name="maisonDependanceAutorisationUrb"
                        value={formData.maisonDependanceAutorisationUrb}
                        onChange={handleChange}
                        placeholder="Précisez (déclaration préalable, permis, régularisation…)"
                        rows={3}
                        className={`${inputClass} mt-2 resize-y min-h-[4.5rem]`}
                        style={fontStyle}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <h2 className={groupTitleClass} style={fontStyle}>Distribution du logement</h2>
              <select
                name="distributionLogement"
                value={formData.distributionLogement}
                onChange={handleChange}
                className={selectClass}
                style={fontStyle}
                aria-label="Distribution du logement"
              >
                <option value="" className="bg-black text-white">Sélectionnez…</option>
                <option value="Plan optimisé" className="bg-black text-white">Plan optimisé</option>
                <option value="Plan traversant" className="bg-black text-white">Plan traversant</option>
              </select>
            </div>
          )}

          {/* État intérieur (menus déroulants) */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>État intérieur</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'etatMurs' as const, label: 'Murs', options: ['À rénover entièrement', 'À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'] },
                { name: 'etatSols' as const, label: 'Sols', options: ['À rénover entièrement', 'À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'] },
                { name: 'etatPlafonds' as const, label: 'Plafonds', options: ['À rénover entièrement', 'À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'] },
                { name: 'etatMenuiserie' as const, label: 'Menuiserie', options: ['À rénover entièrement', 'À rénover', 'Passable', 'Bon état', 'Excellent état'] },
                ].map((field) => (
                  <div key={field.name}>
                    <label className={labelClass} style={fontStyle}>{field.label}</label>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={selectClass}
                    style={fontStyle}
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
                  </div>
                  
          {formData.typeBien !== 'Maison' && (
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Sécurité</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>Alarme</label>
                <select
                  name="alarme"
                  value={formData.alarme}
                  onChange={handleChange}
                  className={selectClass}
                  style={fontStyle}
                  aria-label="Alarme"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  <option value="oui" className="bg-black text-white">Oui</option>
                  <option value="non" className="bg-black text-white">Non</option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Porte blindée</label>
                <select
                  name="porteBlindee"
                  value={formData.porteBlindee}
                  onChange={handleChange}
                  className={selectClass}
                  style={fontStyle}
                  aria-label="Porte blindée"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  <option value="oui" className="bg-black text-white">Oui</option>
                  <option value="non" className="bg-black text-white">Non</option>
                </select>
              </div>
              </div>
            </div>
          )}

          {/* Luminosité */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Luminosité</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Note de 1 à 10</label>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-white/50" style={fontStyle}>1</span>
                <input
                  type="range"
                  name="luminosite"
                  min={1}
                  max={10}
                  step={1}
                  value={formData.luminosite}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, luminosite: parseInt(e.target.value, 10) || 5 }))
                  }
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  aria-valuemin={1}
                  aria-valuemax={10}
                  aria-valuenow={formData.luminosite}
                />
                <span className="text-lg font-semibold text-white min-w-[2rem] text-center" style={fontStyle}>
                  {formData.luminosite}
                </span>
                <span className="text-sm text-white/50" style={fontStyle}>10</span>
              </div>
              </div>
            </div>

          {/* Hauteur sous plafond */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Hauteur sous plafond</h2>
            <select
              name="hauteurPlafond"
              value={formData.hauteurPlafond}
              onChange={handleChange}
              className={selectClass}
              style={fontStyle}
              aria-label="Hauteur sous plafond"
            >
              <option value="" className="bg-black text-white">Sélectionnez…</option>
              <option value="moins de 2,50 m" className="bg-black text-white">moins de 2,50 m</option>
              <option value="2,50 à 2,80 m" className="bg-black text-white">2,50 à 2,80 m</option>
              <option value="plus de 2,80 m" className="bg-black text-white">plus de 2,80 m</option>
            </select>
              </div>

          {/* Moulures au plafond */}
          <div className="space-y-6 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Moulures au plafond</h2>
            <select
              name="mouluresPlafond"
              value={formData.mouluresPlafond}
              onChange={handleChange}
              className={selectClass}
              style={fontStyle}
              aria-label="Moulures au plafond"
            >
              <option value="" className="bg-black text-white">Sélectionnez…</option>
              <option value="oui" className="bg-black text-white">Oui</option>
              <option value="non" className="bg-black text-white">Non</option>
            </select>
              </div>

          {/* Matériaux et finitions (détail) */}
          <div className="space-y-8 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Matériaux et finitions</h2>

            <div>
              <label className={labelClass} style={fontStyle}>Sols</label>
              <select
                name="materiauSols"
                value={formData.materiauSols}
                onChange={handleChange}
                className={`${selectClass} mt-2`}
                style={fontStyle}
                aria-label="Sols"
              >
                <option value="" className="bg-black text-white">Sélectionnez…</option>
                <option value="Carrelage" className="bg-black text-white">Carrelage</option>
                <option value="Parquet stratifié" className="bg-black text-white">Parquet stratifié</option>
                <option
                  value="Parquet massif / Pointe de Hongrie"
                  className="bg-black text-white"
                >
                  Parquet massif / Pointe de Hongrie
                </option>
                <option
                  value="Pierre naturelle / travertin / marbre"
                  className="bg-black text-white"
                >
                  Pierre naturelle / travertin / marbre
                </option>
                <option value="Béton ciré" className="bg-black text-white">Béton ciré</option>
              </select>
              </div>

            <div>
              <label className={labelClass} style={fontStyle}>Murs &amp; finitions</label>
              <select
                name="mursFinitions"
                value={formData.mursFinitions}
                onChange={handleChange}
                className={`${selectClass} mt-2`}
                style={fontStyle}
                aria-label="Murs et finitions"
              >
                <option value="" className="bg-black text-white">Sélectionnez…</option>
                <option value="Peinture standard" className="bg-black text-white">Peinture standard</option>
                <option value="Enduit décoratif" className="bg-black text-white">Enduit décoratif</option>
                <option value="Papier peint haut de gamme" className="bg-black text-white">
                  Papier peint haut de gamme
                </option>
                <option value="Murs en pierre apparente" className="bg-black text-white">
                  Murs en pierre apparente
                </option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className={labelClass} style={fontStyle}>Menuiseries</label>
                <select
                  name="menuiseriesMateriau"
                  value={formData.menuiseriesMateriau}
                  onChange={handleChange}
                  className={`${selectClass} mt-2`}
                  style={fontStyle}
                  aria-label="Menuiseries"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  <option value="PVC" className="bg-black text-white">PVC</option>
                  <option value="Aluminium" className="bg-black text-white">Aluminium</option>
                  <option value="Bois" className="bg-black text-white">Bois</option>
                  <option value="Mixte" className="bg-black text-white">Mixte</option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Fenêtres sur-mesure</label>
                <select
                  name="fenetresSurMesure"
                  value={formData.fenetresSurMesure}
                  onChange={handleChange}
                  className={`${selectClass} mt-2`}
                  style={fontStyle}
                  aria-label="Fenêtres sur-mesure"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  <option value="oui" className="bg-black text-white">Oui</option>
                  <option value="non" className="bg-black text-white">Non</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} style={fontStyle}>Ouvertures</label>
                <select
                  name="ouverturesType"
                  value={formData.ouverturesType}
                  onChange={handleChange}
                  className={`${selectClass} mt-2`}
                  style={fontStyle}
                  aria-label="Ouvertures"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  <option value="Double vitrage" className="bg-black text-white">Double vitrage</option>
                  <option value="Triple vitrage" className="bg-black text-white">Triple vitrage</option>
                  <option value="Baies vitrées grand format" className="bg-black text-white">
                    Baies vitrées grand format
                  </option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Sur-mesure</label>
                <select
                  name="ouverturesSurMesure"
                  value={formData.ouverturesSurMesure}
                  onChange={handleChange}
                  className={`${selectClass} mt-2`}
                  style={fontStyle}
                  aria-label="Ouvertures sur-mesure"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  <option value="oui" className="bg-black text-white">Oui</option>
                  <option value="non" className="bg-black text-white">Non</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <p className={sectionTitleClass} style={fontStyle}>Salle de bain</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass} style={fontStyle}>Niveau / finition</label>
                  <select
                    name="salleDeBainNiveau"
                    value={formData.salleDeBainNiveau}
                    onChange={handleChange}
                    className={`${selectClass} mt-2`}
                    style={fontStyle}
                    aria-label="Salle de bain niveau"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="Standard" className="bg-black text-white">Standard</option>
                    <option value="Rénovée" className="bg-black text-white">Rénovée</option>
                    <option value="Haut de gamme" className="bg-black text-white">Haut de gamme</option>
                    <option value="Matériaux nobles" className="bg-black text-white">Matériaux nobles</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Double vasque</label>
                  <select
                    name="salleDeBainDoubleVasque"
                    value={formData.salleDeBainDoubleVasque}
                    onChange={handleChange}
                    className={`${selectClass} mt-2`}
                    style={fontStyle}
                    aria-label="Double vasque"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="oui" className="bg-black text-white">Oui</option>
                    <option value="non" className="bg-black text-white">Non</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Cuisine et équipements */}
          <div className="space-y-8 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Cuisine et équipements</h2>

            <div className="space-y-6">
              <p className={sectionTitleClass} style={fontStyle}>Cuisine</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass} style={fontStyle}>Ouverte</label>
                  <select
                    name="cuisineOuverte"
                    value={formData.cuisineOuverte}
                    onChange={handleChange}
                    className={`${selectClass} mt-2`}
                    style={fontStyle}
                    aria-label="Cuisine ouverte"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="oui" className="bg-black text-white">Oui</option>
                    <option value="non" className="bg-black text-white">Non</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Semi-équipée ou équipée</label>
                  <select
                    name="cuisineSemiEquipeeOuEquipee"
                    value={formData.cuisineSemiEquipeeOuEquipee}
                    onChange={handleChange}
                    className={`${selectClass} mt-2`}
                    style={fontStyle}
                    aria-label="Cuisine semi-équipée ou équipée"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="Semi-équipée" className="bg-black text-white">Semi-équipée</option>
                    <option value="Équipée" className="bg-black text-white">Équipée</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Sur-mesure</label>
                  <select
                    name="cuisineSurMesure"
                    value={formData.cuisineSurMesure}
                    onChange={handleChange}
                    className={`${selectClass} mt-2`}
                    style={fontStyle}
                    aria-label="Cuisine sur-mesure"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="oui" className="bg-black text-white">Oui</option>
                    <option value="non" className="bg-black text-white">Non</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className={sectionTitleClass} style={fontStyle}>Électroménager</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass} style={fontStyle}>Inclus</label>
                  <select
                    name="electromenagerInclus"
                    value={formData.electromenagerInclus}
                    onChange={handleChange}
                    className={`${selectClass} mt-2`}
                    style={fontStyle}
                    aria-label="Électroménager inclus"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="oui" className="bg-black text-white">Oui</option>
                    <option value="non" className="bg-black text-white">Non</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Si oui : gamme</label>
                  <select
                    name="electromenagerGamme"
                    value={formData.electromenagerGamme}
                    onChange={handleChange}
                    disabled={formData.electromenagerInclus !== 'oui'}
                    className={`${selectClass} mt-2 ${formData.electromenagerInclus !== 'oui' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={fontStyle}
                    aria-label="Gamme électroménager"
                  >
                    <option value="" className="bg-black text-white">Sélectionnez…</option>
                    <option value="Entrée de gamme" className="bg-black text-white">Entrée de gamme</option>
                    <option value="Milieu de gamme" className="bg-black text-white">Milieu de gamme</option>
                    <option value="Haut de gamme" className="bg-black text-white">Haut de gamme</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Marques principales</label>
                        <input
                  type="text"
                  name="marquesCuisine"
                  value={formData.marquesCuisine}
                          onChange={handleChange}
                  placeholder="Ex : Miele, Siemens, Bosch…"
                  className={`${inputClass} mt-2`}
                  style={fontStyle}
                />
              </div>
            </div>
          </div>

          {/* Prestations intérieures (choix multiples) */}
          <div className="space-y-10 pt-2">
            <h2 className={groupTitleClass} style={fontStyle}>Prestations intérieures</h2>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Prestations principales</p>
              <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                Plusieurs choix possibles
              </p>
              <details
                className="mt-2"
                onToggle={(e) => setPrestationsInterPrincipalesMenuOpen(e.currentTarget.open)}
              >
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.prestationsInterPrincipales.length === 0
                      ? 'Choisir une ou plusieurs prestations…'
                      : formData.prestationsInterPrincipales.length === 1
                        ? formData.prestationsInterPrincipales[0]
                        : `${formData.prestationsInterPrincipales.length} prestations sélectionnées`}
                  </span>
                  <span
                    className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${prestationsInterPrincipalesMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2 max-h-[min(60vh,28rem)] overflow-y-auto">
                  {[
                    'Climatisation',
                    'Cheminée',
                    'Volets électriques',
                    'Fibre optique',
                    'Mezzanine',
                    'Buanderie / Pièce bureau',
                    'Pièce de vie +50 m²',
                    'Double séjour / triple exposition',
                    'Escalier colimaçon',
                    'Placards intégrés',
                    'Autres à préciser',
                  ].map((option) => (
                    <label key={option} className={`${getOptionClass(formData.prestationsInterPrincipales.includes(option))} !p-2.5`}>
                      <input
                        type="checkbox"
                        checked={formData.prestationsInterPrincipales.includes(option)}
                        onChange={() => handleCheckboxChange('prestationsInterPrincipales', option)}
                        className="mr-2 accent-white shrink-0"
                        />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
              </details>
              {formData.prestationsInterPrincipales.includes('Autres à préciser') && (
                <div className="mt-3">
                  <label className={labelClass} style={fontStyle}>Précisez (prestations principales)</label>
                  <input
                    type="text"
                    name="prestationsInterPrincipalesAutres"
                    value={formData.prestationsInterPrincipalesAutres}
                    onChange={handleChange}
                    placeholder="Détaillez vos autres prestations…"
                    className={inputClass}
                    style={fontStyle}
                  />
                </div>
              )}
                </div>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Prestations premium</p>
              <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                Plusieurs choix possibles
              </p>
              <details
                className="mt-2"
                onToggle={(e) => setPrestationsInterPremiumMenuOpen(e.currentTarget.open)}
              >
                <summary
                  className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                  style={fontStyle}
                >
                  <span className="truncate text-left">
                    {formData.prestationsInterPremium.length === 0
                      ? 'Choisir une ou plusieurs prestations…'
                      : formData.prestationsInterPremium.length === 1
                        ? formData.prestationsInterPremium[0]
                        : `${formData.prestationsInterPremium.length} prestations sélectionnées`}
                  </span>
                  <span
                    className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${prestationsInterPremiumMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    {'\u25BC'}
                  </span>
                </summary>
                <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2 max-h-[min(60vh,28rem)] overflow-y-auto">
                  {[
                    'Climatisation gainable',
                    'Domotique',
                    'Salle de sport / SPA',
                    'Jacuzzi',
                    'Cave à vin',
                    'Suite parentale',
                    'Verrière intérieure',
                    'Pièce home cinéma',
                    'Salle de jeux / family room',
                    'Bibliothèque intégrée',
                    'Dressing sur-mesure',
                    'Ascenseur privé',
                    'Autres à préciser',
                  ].map((option) => (
                    <label key={option} className={`${getOptionClass(formData.prestationsInterPremium.includes(option))} !p-2.5`}>
                      <input
                        type="checkbox"
                        checked={formData.prestationsInterPremium.includes(option)}
                        onChange={() => handleCheckboxChange('prestationsInterPremium', option)}
                        className="mr-2 accent-white shrink-0"
                      />
                      <span className="text-white text-sm" style={fontStyle}>{option}</span>
                    </label>
                  ))}
                </div>
              </details>
              {formData.prestationsInterPremium.includes('Autres à préciser') && (
                <div className="mt-3">
                  <label className={labelClass} style={fontStyle}>Précisez (prestations premium)</label>
                  <input
                    type="text"
                    name="prestationsInterPremiumAutres"
                    value={formData.prestationsInterPremiumAutres}
                    onChange={handleChange}
                    placeholder="Détaillez vos autres prestations premium…"
                    className={inputClass}
                    style={fontStyle}
                  />
                </div>
              )}
              </div>

            {formData.typeBien === 'Maison' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <p className={sectionTitleClass} style={fontStyle}>Annexes intérieures</p>
                <label className={labelClass} style={fontStyle}>Sélection</label>
                <select
                  name="maisonAnnexesInterieures"
                  value={formData.maisonAnnexesInterieures}
                  onChange={(e) => {
                    const v = e.target.value
                    setFormData((p) => ({
                      ...p,
                      maisonAnnexesInterieures: v,
                      maisonAnnexesInterieuresAutre: v === 'Autre à préciser' ? p.maisonAnnexesInterieuresAutre : '',
                    }))
                  }}
                  className={`${selectClass} mt-2`}
                  style={fontStyle}
                  aria-label="Annexes intérieures"
                >
                  <option value="" className="bg-black text-white">Sélectionnez…</option>
                  {MAISON_ANNEXES_INTERIEURES_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                  ))}
                </select>
                {formData.maisonAnnexesInterieures === 'Autre à préciser' && (
                  <div className="mt-3">
                    <label className={labelClass} style={fontStyle}>Précisez</label>
                    <input
                      type="text"
                      name="maisonAnnexesInterieuresAutre"
                      value={formData.maisonAnnexesInterieuresAutre}
                      onChange={handleChange}
                      placeholder="Précisez l'annexe intérieure…"
                      className={`${inputClass} mt-2`}
                      style={fontStyle}
                    />
                  </div>
                )}
              </div>
            )}
                  </div>
                  
            {/* ═══ TRAVAUX EFFECTUÉS / TRAVAUX PRÉVUS ═══ */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Travaux effectués / Travaux prévus (année, nature, montant)</p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                  <p className="text-white/70 text-sm font-medium mb-3" style={fontStyle}>Travaux effectués</p>
                  <div className="flex gap-4 mb-4">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.travauxRecents === val)}>
                        <input type="radio" name="travauxRecents" value={val} checked={formData.travauxRecents === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                    </label>
                    ))}
                  </div>
                  {formData.travauxRecents === 'oui' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass} style={fontStyle}>Nature</label>
                          <input type="text" name="natureTravaux" value={formData.natureTravaux} onChange={handleChange} placeholder="Ex: Rénovation complète..." className={inputClass} style={fontStyle} />
                        </div>
                        <div>
                          <label className={labelClass} style={fontStyle}>Année</label>
                          <input type="text" name="anneeTravaux" value={formData.anneeTravaux} onChange={handleChange} placeholder="Ex: 2023" className={inputClass} style={fontStyle} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Montant</label>
                        <input type="text" name="montantTravaux" value={formData.montantTravaux} onChange={handleChange} placeholder="Ex: 25 000 €" className={inputClass} style={fontStyle} />
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Autorisations nécessaires ?</label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {['Oui', 'Non', 'En cours de régularisation', 'À vérifier'].map((val) => (
                            <label key={val} className={getOptionClass(formData.travauxAutorisations === val)}>
                              <input type="radio" name="travauxAutorisations" value={val} checked={formData.travauxAutorisations === val} onChange={handleChange} className="mr-2 accent-white" />
                              <span className="text-white text-sm" style={fontStyle}>{val}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium mb-3" style={fontStyle}>Travaux prévus</p>
                    <div className="flex gap-4 mb-4">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.travauxPrevus === val)}>
                        <input type="radio" name="travauxPrevus" value={val} checked={formData.travauxPrevus === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                  {formData.travauxPrevus === 'oui' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass} style={fontStyle}>Nature</label>
                          <input type="text" name="natureTravauxPrevus" value={formData.natureTravauxPrevus} onChange={handleChange} placeholder="Ex: Ravalement..." className={inputClass} style={fontStyle} />
                        </div>
                        <div>
                          <label className={labelClass} style={fontStyle}>Budget</label>
                          <input type="text" name="budgetTravauxPrevus" value={formData.budgetTravauxPrevus} onChange={handleChange} placeholder="Ex: 15 000 €" className={inputClass} style={fontStyle} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Date prévue</label>
                        <input type="text" name="dateTravauxPrevus" value={formData.dateTravauxPrevus} onChange={handleChange} placeholder="Ex: Été 2026" className={inputClass} style={fontStyle} />
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Autorisations nécessaires ?</label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {['Oui', 'Non', 'En cours de régularisation', 'À vérifier'].map((val) => (
                            <label key={val} className={getOptionClass(formData.travauxPrevusAutorisations === val)}>
                              <input type="radio" name="travauxPrevusAutorisations" value={val} checked={formData.travauxPrevusAutorisations === val} onChange={handleChange} className="mr-2 accent-white" />
                              <span className="text-white text-sm" style={fontStyle}>{val}</span>
                      </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
                    </div>
          <div className="border-t border-white/10" />

          {/* ═══════════ CHAUFFAGE & EAU CHAUDE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Production Chauffage & Eau Chaude</h2>

            {/* Type de chauffage */}
            <div>
              <label className={labelClass} style={fontStyle}>Type de chauffage</label>
              <div className="flex gap-4 mt-2">
                {['Collectif', 'Individuel'].map((val) => (
                  <label key={val} className={getOptionClass(formData.chauffageType === val)}>
                    <input type="radio" name="chauffageType" value={val} checked={formData.chauffageType === val} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                ))}
                  </div>
                </div>
                  
            {/* Production chauffage conditionnelle */}
            {formData.chauffageType === 'Collectif' && (
                  <div>
                <label className={labelClass} style={fontStyle}>Production de chauffage (collectif)</label>
                <select name="chauffageProduction" value={formData.chauffageProduction} onChange={handleChange} className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black text-white">Sélectionnez...</option>
                  <option value="Chaudière à gaz" className="bg-black text-white">Chaudière à gaz</option>
                  <option value="Chaudière au fioul" className="bg-black text-white">Chaudière au fioul</option>
                  <option value="Électrique" className="bg-black text-white">Électrique</option>
                  <option value="Réseau urbain" className="bg-black text-white">Réseau urbain</option>
                  <option value="Autre système collectif" className="bg-black text-white">Autre système collectif à préciser</option>
                  <option value="Inconnue" className="bg-black text-white">Inconnue</option>
                </select>
              </div>
            )}
            {formData.chauffageType === 'Individuel' && (
              <div>
                <label className={labelClass} style={fontStyle}>Production de chauffage (individuel)</label>
                <select name="chauffageProduction" value={formData.chauffageProduction} onChange={handleChange} className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black text-white">Sélectionnez...</option>
                  <option value="Chaudière à gaz (condensation ou ancienne)" className="bg-black text-white">Chaudière à gaz (condensation ou ancienne)</option>
                  <option value="PAC Air/eau" className="bg-black text-white">PAC Air/eau</option>
                  <option value="PAC hybride (PAC + gaz)" className="bg-black text-white">PAC hybride (PAC + gaz)</option>
                  <option value="PAC air/air réversible (climatisation)" className="bg-black text-white">PAC air/air réversible (climatisation)</option>
                  <option value="Convecteur électrique ou à inertie" className="bg-black text-white">Convecteur électrique ou à inertie</option>
                  <option value="Poêle à bois ou granulés" className="bg-black text-white">Poêle à bois ou granulés</option>
                  <option value="Chaudière à bois ou granulés" className="bg-black text-white">Chaudière à bois ou granulés</option>
                  <option value="Chaudière fioul" className="bg-black text-white">Chaudière fioul</option>
                  <option value="Plancher chauffant électrique" className="bg-black text-white">Plancher chauffant électrique</option>
                  <option value="Autre" className="bg-black text-white">Autre à préciser</option>
                  <option value="Inconnue" className="bg-black text-white">Inconnue</option>
                </select>
              </div>
            )}

            {/* Type d'eau chaude */}
            <div>
              <label className={labelClass} style={fontStyle}>Type d&apos;eau chaude</label>
              <div className="flex gap-4 mt-2">
                {['Collective', 'Individuelle'].map((val) => (
                  <label key={val} className={getOptionClass(formData.eauChaudeType === val)}>
                    <input type="radio" name="eauChaudeType" value={val} checked={formData.eauChaudeType === val} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                ))}
              </div>
            </div>

            {/* Production eau chaude conditionnelle */}
            {formData.eauChaudeType === 'Collective' && (
              <div>
                <label className={labelClass} style={fontStyle}>Production d&apos;eau chaude (collective)</label>
                <select name="eauChaudeProduction" value={formData.eauChaudeProduction} onChange={handleChange} className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black text-white">Sélectionnez...</option>
                  <option value="Chaudière à gaz" className="bg-black text-white">Chaudière à gaz</option>
                  <option value="Chaudière au fioul" className="bg-black text-white">Chaudière au fioul</option>
                  <option value="Électrique" className="bg-black text-white">Électrique</option>
                  <option value="Réseau urbain" className="bg-black text-white">Réseau urbain</option>
                  <option value="Autre" className="bg-black text-white">Autre à préciser</option>
                  <option value="Inconnue" className="bg-black text-white">Inconnue</option>
                </select>
                  </div>
            )}
            {formData.eauChaudeType === 'Individuelle' && (
              <div>
                <label className={labelClass} style={fontStyle}>Production d&apos;eau chaude (individuelle)</label>
                <select name="eauChaudeProduction" value={formData.eauChaudeProduction} onChange={handleChange} className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black text-white">Sélectionnez...</option>
                  <option value="Chaudière à gaz" className="bg-black text-white">Chaudière à gaz</option>
                  <option value="Ballon électrique" className="bg-black text-white">Ballon électrique</option>
                  <option value="Chauffe-eau thermodynamique" className="bg-black text-white">Chauffe-eau thermodynamique</option>
                  <option value="Chauffe-eau gaz indépendant" className="bg-black text-white">Chauffe-eau gaz indépendant</option>
                  <option value="Chaudière bois ou granulés" className="bg-black text-white">Chaudière bois ou granulés</option>
                  <option value="Chaudière fioul" className="bg-black text-white">Chaudière fioul</option>
                  <option value="Chauffe-eau solaire thermique" className="bg-black text-white">Chauffe-eau solaire thermique</option>
                  <option value="PAC Air/Eau avec production intégrée" className="bg-black text-white">PAC Air/Eau avec production intégrée</option>
                  <option value="PAC hybride (PAC + gaz)" className="bg-black text-white">PAC hybride (PAC + gaz)</option>
                  <option value="Autre" className="bg-black text-white">Autre à préciser</option>
                  <option value="Inconnue" className="bg-black text-white">Inconnue</option>
                </select>
              </div>
            )}

            {/* Ancienneté */}
                  <div>
              <label className={labelClass} style={fontStyle}>Année d&apos;installation</label>
              <div className="grid md:grid-cols-4 gap-3 mt-2">
                {['Moins de 5 ans', '5 à 10 ans', 'Plus de 10 ans', 'Inconnue'].map((val) => (
                  <label key={val} className={getOptionClass(formData.ancienneteInstallation === val)}>
                    <input type="radio" name="ancienneteInstallation" value={val} checked={formData.ancienneteInstallation === val} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

            {/* DPE */}
            <div className="pt-6 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Diagnostic de Performance Énergétique (DPE)</p>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Disposez-vous d&apos;un DPE valide (après juillet 2021) ?</label>
                <div className="flex gap-4 mt-2">
                  {['Oui', 'Non'].map((val) => (
                    <label key={val} className={getOptionClass(formData.dpeValide === val)}>
                      <input type="radio" name="dpeValide" value={val} checked={formData.dpeValide === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                  ))}
                </div>
                  </div>
                  
              {formData.dpeValide === 'Oui' && (
                <>
                  <div className="mt-4">
                    <label className={labelClass} style={fontStyle}>Classe énergétique DPE</label>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-2">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((option) => (
                        <label key={option} className={getOptionClass(formData.dpe === option)}>
                          <input type="radio" name="dpe" value={option} checked={formData.dpe === option} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                  <div className="mt-4">
                    <label className={labelClass} style={fontStyle}>Classe GES (Gaz à Effet de Serre)</label>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-2">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((option) => (
                        <label key={option} className={getOptionClass(formData.classeGes === option)}>
                          <input type="radio" name="classeGes" value={option} checked={formData.classeGes === option} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                        </label>
                      ))}
              </div>
                  </div>
                </>
              )}

              {formData.dpeValide === 'Non' && (
                <div className="mt-4">
                  <p className="text-white/50 text-sm italic mb-3" style={fontStyle}>
                    Si vous avez un DPE ancien, vous pouvez indiquer la classe à titre indicatif.
                  </p>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non réalisé'].map((option) => (
                      <label key={option} className={getOptionClass(formData.dpe === option)}>
                        <input type="radio" name="dpe" value={option} checked={formData.dpe === option} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                  )}
                </div>

            {/* Taxe foncière */}
            <div className="pt-6 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Taxe foncière</p>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Montant annuel (€)</label>
                <input type="text" name="taxeFonciere" value={formData.taxeFonciere} onChange={handleChange} placeholder="Ex: 1 500 €" className={inputClass} style={fontStyle} />
              </div>
                  </div>

          {formData.typeBien === 'Maison' && (
            <>
            <div className="pt-6 border-t border-white/10 space-y-6">
              <h2 className={groupTitleClass} style={fontStyle}>Assainissement</h2>

              <div>
                <label className={labelClass} style={fontStyle}>Type d&apos;assainissement</label>
                <div className="flex gap-4 mt-2">
                  {['Collectif', 'Non-collectif (Fosse septique)'].map((val) => (
                    <label key={val} className={getOptionClass(formData.assainissementType === val)}>
                      <input type="radio" name="assainissementType" value={val} checked={formData.assainissementType === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.assainissementType === 'Non-collectif (Fosse septique)' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Validité diagnostic SPANC</label>
                    <select name="spancValidite" value={formData.spancValidite} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="Moins de 3 ans" className="bg-black text-white">Moins de 3 ans</option>
                      <option value="Plus de 3 ans" className="bg-black text-white">Plus de 3 ans</option>
                      <option value="Pas de diagnostic" className="bg-black text-white">Pas de diagnostic</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className={labelClass} style={fontStyle}>Raccordabilité</label>
                <div className="flex gap-4 mt-2">
                  {['Raccordable', 'Non raccordable', 'Ne sait pas'].map((val) => (
                    <label key={val} className={getOptionClass(formData.raccordabilite === val)}>
                      <input type="radio" name="raccordabilite" value={val} checked={formData.raccordabilite === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h2 className={groupTitleClass} style={fontStyle}>Autorisations d&apos;urbanisme</h2>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>
                  Y a-t-il des autorisations d&apos;urbanisme déjà acceptées mais dont les travaux n&apos;ont pas été effectués ? (Permis de construire, déclaration préalable, changement d&apos;usage)
                </label>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                    <label key={val} className={getOptionClass(formData.travauxUrbanisme === val)}>
                      <input type="radio" name="travauxUrbanisme" value={val} checked={formData.travauxUrbanisme === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.travauxUrbanisme === 'Oui' && (
                <div className="mt-3">
                  <label className={labelClass} style={fontStyle}>Lesquels et depuis quand ?</label>
                  <input
                    type="text"
                    name="travauxUrbanismeDetail"
                    value={formData.travauxUrbanismeDetail}
                    onChange={handleChange}
                    placeholder="Ex: Permis de construire accepté en 2024 pour extension…"
                    className={`${inputClass} mt-2`}
                    style={fontStyle}
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <p className={sectionTitleClass} style={fontStyle}>Potentiel particulier</p>
              <label className={labelClass} style={fontStyle}>Le bien présente-t-il un potentiel particulier ?</label>
              <select
                name="maisonPotentielParticulier"
                value={formData.maisonPotentielParticulier}
                onChange={handleChange}
                className={`${selectClass} mt-2`}
                style={fontStyle}
                aria-label="Potentiel particulier du bien"
              >
                <option value="" className="bg-black text-white">Sélectionnez…</option>
                {MAISON_POTENTIEL_PARTICULIER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                ))}
              </select>
            </div>
            </>
          )}
                  
            {/* Standing de la résidence (Appartement uniquement) */}
            {formData.typeBien === 'Appartement' && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                  <div>
                  <p className={sectionTitleClass} style={fontStyle}>Standing de la résidence</p>
                  <details
                    className="mt-4"
                    onToggle={(e) => setStandingResidenceMenuOpen(e.currentTarget.open)}
                  >
                    <summary
                      className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                      style={fontStyle}
                    >
                      <span className="truncate text-left">
                        {formData.standingResidence || 'Choisir le standing…'}
                      </span>
                      <span
                        className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${standingResidenceMenuOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        {'\u25BC'}
                      </span>
                    </summary>
                    <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2">
                    {['Standard', 'Bon standing', 'Haut de gamme'].map((val) => (
                        <label key={val} className={`${getOptionClass(formData.standingResidence === val)} !p-2.5`}>
                          <input
                            type="radio"
                            name="standingResidence"
                            value={val}
                            checked={formData.standingResidence === val}
                            onChange={handleChange}
                            className="mr-2 accent-white shrink-0"
                          />
                        <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                    ))}
                  </div>
                  </details>
                </div>

                <div>
                  <label className={labelClass} style={fontStyle}>Nombre de lots dans l&apos;immeuble</label>
                  <input
                    type="text"
                    name="nombreLotsDansImmeuble"
                    value={formData.nombreLotsDansImmeuble}
                    onChange={handleChange}
                    placeholder="Ex: 24"
                    className={inputClass}
                    style={fontStyle}
                  />
                </div>

                <div>
                  <p className={sectionTitleClass} style={fontStyle}>État général des parties communes</p>
                  <details
                    className="mt-4"
                    onToggle={(e) => setEtatPartiesCommunesMenuOpen(e.currentTarget.open)}
                  >
                    <summary
                      className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                      style={fontStyle}
                    >
                      <span className="truncate text-left">
                        {formData.etatPartiesCommunesImmeuble || "Choisir l'état…"}
                      </span>
                      <span
                        className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${etatPartiesCommunesMenuOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        {'\u25BC'}
                      </span>
                    </summary>
                    <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2">
                      {['Très bon état', 'Bon état', 'État moyen', 'Dégradé'].map((val) => (
                        <label key={val} className={`${getOptionClass(formData.etatPartiesCommunesImmeuble === val)} !p-2.5`}>
                          <input
                            type="radio"
                            name="etatPartiesCommunesImmeuble"
                            value={val}
                            checked={formData.etatPartiesCommunesImmeuble === val}
                            onChange={handleChange}
                            className="mr-2 accent-white shrink-0"
                          />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                </div>

                <div>
                  <label className={labelClass} style={fontStyle}>Présence de commerces dans l&apos;immeuble (RDC)</label>
                  <div className="flex gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.commercesRdcImmeuble === val)}>
                        <input
                          type="radio"
                          name="commercesRdcImmeuble"
                          value={val}
                          checked={formData.commercesRdcImmeuble === val}
                          onChange={handleChange}
                          className="mr-2 accent-white"
                        />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                <div>
                  <p className={sectionTitleClass} style={fontStyle}>Sécurité et confort</p>
                  <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                    Plusieurs choix possibles
                  </p>
                  <details
                    className="mt-2"
                    onToggle={(e) => setImmeubleSecuriteConfortMenuOpen(e.currentTarget.open)}
                  >
                    <summary
                      className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                      style={fontStyle}
                    >
                      <span className="truncate text-left">
                        {formData.immeubleSecuriteConfort.length === 0
                          ? 'Choisir une ou plusieurs options…'
                          : formData.immeubleSecuriteConfort.length === 1
                            ? formData.immeubleSecuriteConfort[0]
                            : `${formData.immeubleSecuriteConfort.length} options sélectionnées`}
                      </span>
                      <span
                        className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${immeubleSecuriteConfortMenuOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        {'\u25BC'}
                      </span>
                    </summary>
                    <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2 max-h-[min(60vh,28rem)] overflow-y-auto">
                      {[
                        'Vidéo surveillance',
                        'Interphone / visiophone',
                        'Résidence fermée',
                        'Résidence sécurisée',
                        'Gardien / concierge',
                        'Alarme',
                        'Aucun',
                      ].map((option) => (
                        <label key={option} className={`${getOptionClass(formData.immeubleSecuriteConfort.includes(option))} !p-2.5`}>
                          <input
                            type="checkbox"
                            checked={formData.immeubleSecuriteConfort.includes(option)}
                            onChange={() => toggleImmeubleSecuriteConfort(option)}
                            className="mr-2 accent-white shrink-0"
                          />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
                  </details>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <label className={labelClass} style={fontStyle}>Présence d&apos;un gardien ou concierge</label>
                  <div className="flex gap-4 mt-2">
                    {['oui', 'non'].map((val) => (
                      <label key={val} className={getOptionClass(formData.gardienConcierge === val)}>
                        <input type="radio" name="gardienConcierge" value={val} checked={formData.gardienConcierge === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                  </div>
                  
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <p className={sectionTitleClass} style={fontStyle}>Charges de copropriété</p>
                  <div>
                    <label className={labelClass} style={fontStyle}>Montant € TRIMESTRIEL</label>
                    <input
                      type="text"
                      name="chargesCoproTrimestriel"
                      value={formData.chargesCoproTrimestriel}
                      onChange={handleChange}
                      placeholder="Ex: 750 €"
                      className={inputClass}
                      style={fontStyle}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Ce qui est compris :</label>
                    <div className="grid md:grid-cols-3 gap-3 mt-2">
                      {['Chauffage', 'Eau chaude', 'Eau froide'].map((option) => (
                        <label key={option} className={getOptionClass(formData.chargesCoproContenu.includes(option))}>
                          <input
                            type="checkbox"
                            checked={formData.chargesCoproContenu.includes(option)}
                            onChange={() => handleCheckboxChange('chargesCoproContenu', option)}
                            className="mr-2 accent-white"
                          />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                    </label>
                      ))}
                    </div>
                  </div>
                </div>

              <div className="pt-6 border-t border-white/10">
                <h2 className={groupTitleClass} style={fontStyle}>Travaux de copropriété</h2>
                <div className="space-y-6 mt-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Votés et payés mais non encore réalisés (nature et coût)</label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <input type="text" name="travauxCoproVotesNature" value={formData.travauxCoproVotesNature} onChange={handleChange} placeholder="Nature des travaux" className={inputClass} style={fontStyle} />
                      <input type="text" name="travauxCoproVotesCout" value={formData.travauxCoproVotesCout} onChange={handleChange} placeholder="Coût (€)" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Récemment effectués (nature, coût pour le copropriétaire, année)</label>
                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                      <input type="text" name="travauxCoproRecentsDetail" value={formData.travauxCoproRecentsDetail} onChange={handleChange} placeholder="Nature" className={inputClass} style={fontStyle} />
                      <input type="text" name="travauxCoproRecentsMontant" value={formData.travauxCoproRecentsMontant} onChange={handleChange} placeholder="Coût copropriétaire (€)" className={inputClass} style={fontStyle} />
                      <input type="text" name="travauxCoproRecentsAnnee" value={formData.travauxCoproRecentsAnnee} onChange={handleChange} placeholder="Année" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Prévus mais non encore votés (nature, coût estimatif, date estimative)</label>
                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                      <input type="text" name="travauxCoproPrevusNature" value={formData.travauxCoproPrevusNature} onChange={handleChange} placeholder="Nature" className={inputClass} style={fontStyle} />
                      <input type="text" name="travauxCoproPrevusCout" value={formData.travauxCoproPrevusCout} onChange={handleChange} placeholder="Coût estimatif (€)" className={inputClass} style={fontStyle} />
                      <input type="text" name="travauxCoproPrevusDate" value={formData.travauxCoproPrevusDate} onChange={handleChange} placeholder="Date estimative mise en place" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className={sectionTitleClass} style={fontStyle}>Type de syndic</p>
                  <div className="flex gap-4 mt-4 flex-wrap">
                  {['Professionnel', 'Bénévole', 'Je ne sais pas'].map((val) => (
                    <label key={val} className={getOptionClass(formData.typeSyndic === val)}>
                      <input type="radio" name="typeSyndic" value={val} checked={formData.typeSyndic === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className={sectionTitleClass} style={fontStyle}>Juridique</p>
                  <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                    Plusieurs choix possibles
                  </p>
                  <details
                    className="mt-2"
                    onToggle={(e) => setJuridiqueMenuOpen(e.currentTarget.open)}
                  >
                    <summary
                      className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                      style={fontStyle}
                    >
                      <span className="truncate text-left">
                        {formData.situationJuridiqueTechnique.length === 0
                          ? 'Choisir une ou plusieurs options…'
                          : formData.situationJuridiqueTechnique.length === 1
                            ? formData.situationJuridiqueTechnique[0]
                            : `${formData.situationJuridiqueTechnique.length} options sélectionnées`}
                      </span>
                      <span
                        className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${juridiqueMenuOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        {'\u25BC'}
                      </span>
                    </summary>
                    <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2 max-h-[min(60vh,28rem)] overflow-y-auto">
                      {juridiqueSituationOptions.map((option) => (
                        <label key={option} className={`${getOptionClass(formData.situationJuridiqueTechnique.includes(option))} !p-2.5`}>
                          <input
                            type="checkbox"
                            checked={formData.situationJuridiqueTechnique.includes(option)}
                            onChange={() => toggleSituationJuridiqueTechnique(option)}
                            className="mr-2 accent-white shrink-0"
                          />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className={sectionTitleClass} style={fontStyle}>Autorisations d&apos;urbanisme</p>
                  <div className="mt-4">
                    <label className={labelClass} style={fontStyle}>Y a-t-il des autorisations d&apos;urbanisme déjà acceptées mais dont les travaux n&apos;ont pas été effectués ? (Permis de construire, déclaration préalable, changement d&apos;usage)</label>
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                        <label key={val} className={getOptionClass(formData.travauxUrbanisme === val)}>
                          <input type="radio" name="travauxUrbanisme" value={val} checked={formData.travauxUrbanisme === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {formData.travauxUrbanisme === 'Oui' && (
                    <div className="mt-3">
                      <label className={labelClass} style={fontStyle}>Lesquels et depuis quand ?</label>
                      <input type="text" name="travauxUrbanismeDetail" value={formData.travauxUrbanismeDetail} onChange={handleChange} placeholder="Ex: Permis de construire accepté en 2024 pour extension..." className={inputClass} style={fontStyle} />
                  </div>
            )}
                </div>

              <div className="pt-6 border-t border-white/10">
                  <p className={sectionTitleClass} style={fontStyle}>Technique et urbanistique</p>
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                    {['Fissures ou anomalies structurelles', 'Anomalies fondation', 'Anomalies toiture', 'Infiltration', 'Humidité', 'Défaut d\'assainissement', 'Non-conformité électrique', 'Non-conformité gaz', 'Sinistre déclaré (dégât des eaux, incendie...)', 'Travaux importants à prévoir', 'Aucun problème connu'].map((option) => (
                      <label key={option} className={getOptionClass(formData.situationTechniqueUrbanistique.includes(option))}>
                        <input type="checkbox" checked={formData.situationTechniqueUrbanistique.includes(option)} onChange={() => handleCheckboxChange('situationTechniqueUrbanistique', option)} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bien Vendu */}
                <div className="pt-6 border-t border-white/10">
                  <p className={sectionTitleClass} style={fontStyle}>Bien Vendu</p>
                  <div className="grid md:grid-cols-3 gap-3 mt-4">
                    {['Vide', 'Partiellement meublé', 'Entièrement meublé'].map((val) => (
                      <label key={val} className={getOptionClass(formData.typeVenteVideMeuble === val)}>
                        <input type="radio" name="typeVenteVideMeuble" value={val} checked={formData.typeVenteVideMeuble === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                  {(formData.typeVenteVideMeuble === 'Partiellement meublé' || formData.typeVenteVideMeuble === 'Entièrement meublé') && (
                    <div className="mt-3">
                      <label className={labelClass} style={fontStyle}>Si meublé, type de mobilier :</label>
                      <div className="grid md:grid-cols-3 gap-3 mt-2">
                        {['Mobilier standard', 'Mobilier design / marques reconnues', 'Mobilier sur-mesure'].map((val) => (
                          <label key={val} className={getOptionClass(formData.description === val)}>
                            <input type="radio" name="description" value={val} checked={formData.description === val} onChange={handleChange} className="mr-2 accent-white" />
                            <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

                <div className="pt-6 border-t border-white/10 space-y-6">
                  <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>

                  <div>
                    <p className={sectionTitleClass} style={fontStyle}>Délai de vente souhaité</p>
                    <div className="grid md:grid-cols-4 gap-4 mt-4">
                      {['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map((option) => (
                        <label key={option} className={getOptionClass(formData.delaiVente === option)}>
                          <input type="radio" name="delaiVente" value={option} checked={formData.delaiVente === option} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ LOTISSEMENT AVEC ASL (si Maison + Lotissement avec ASL) ═══ */}
            {formData.typeBien === 'Maison' && formData.maisonEnsembleOrganise === 'Lotissement avec ASL' && (
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Lotissement avec ASL — Informations juridiques</p>
                      <div className="space-y-4 mt-4">
                        <div>
                    <label className={labelClass} style={fontStyle}>Montant des charges ANNUELLES (€)</label>
                    <input type="text" name="chargesASL" value={formData.chargesASL} onChange={handleChange} placeholder="Ex: 1 500 €" className={inputClass} style={fontStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Ce qui est compris :</label>
                    <div className="grid md:grid-cols-3 gap-3 mt-2">
                      {['Entretien des voies privées', 'Réseau privé (eau et assainissement)', 'Portail motorisé et contrôle d\'accès', 'Entretien bassin de rétention', 'Pompe de relevage collective', 'Réseau électrique interne', 'Loisirs (Piscine, Tennis, Aire de jeux)'].map((option) => (
                        <label key={option} className={getOptionClass(formData.chargesASLContenu.includes(option))}>
                          <input type="checkbox" checked={formData.chargesASLContenu.includes(option)} onChange={() => handleCheckboxChange('chargesASLContenu', option)} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                          </label>
                      ))}
                        </div>
                  </div>

                        <div>
                    <label className={labelClass} style={fontStyle}>Y a-t-il des travaux effectués récemment dans le lotissement ?</label>
                    <div className="flex gap-4 mt-2">
                      {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                        <label key={val} className={getOptionClass(formData.travauxASLRecents === val)}>
                          <input type="radio" name="travauxASLRecents" value={val} checked={formData.travauxASLRecents === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                          </label>
                      ))}
                          </div>
                        </div>
                  {formData.travauxASLRecents === 'Oui' && (
                        <div className="grid md:grid-cols-2 gap-4">
                        <div>
                        <label className={labelClass} style={fontStyle}>Lesquels ?</label>
                        <input type="text" name="travauxASLRecentsDetail" value={formData.travauxASLRecentsDetail} onChange={handleChange} className={inputClass} style={fontStyle} />
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Montant</label>
                        <input type="text" name="travauxASLRecentsMontant" value={formData.travauxASLRecentsMontant} onChange={handleChange} className={inputClass} style={fontStyle} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClass} style={fontStyle}>Y a-t-il des travaux votés et payés mais non encore réalisés ?</label>
                    <div className="flex gap-4 mt-2">
                      {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                        <label key={val} className={getOptionClass(formData.travauxASLVotesNonRealises === val)}>
                          <input type="radio" name="travauxASLVotesNonRealises" value={val} checked={formData.travauxASLVotesNonRealises === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                          </label>
                      ))}
                        </div>
                  </div>
                  {formData.travauxASLVotesNonRealises === 'Oui' && (
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                        <label className={labelClass} style={fontStyle}>Lesquels ?</label>
                        <input type="text" name="travauxASLVotesDetail" value={formData.travauxASLVotesDetail} onChange={handleChange} className={inputClass} style={fontStyle} />
                      </div>
                      <div>
                        <label className={labelClass} style={fontStyle}>Quand ?</label>
                        <select name="travauxASLVotesDelai" value={formData.travauxASLVotesDelai} onChange={handleChange} className={selectClass} style={fontStyle}>
                          <option value="" className="bg-black text-white">Sélectionnez...</option>
                          <option value="Moins de 6 mois" className="bg-black text-white">Moins de 6 mois</option>
                          <option value="6 mois à 1 an" className="bg-black text-white">6 mois à 1 an</option>
                          <option value="1 à 2 ans" className="bg-black text-white">1 à 2 ans</option>
                          <option value="Plus de 2 ans" className="bg-black text-white">Plus de 2 ans</option>
                          <option value="Date non communiquée" className="bg-black text-white">Date non communiquée</option>
                        </select>
                        </div>
                      </div>
                    )}

                  <div>
                    <label className={labelClass} style={fontStyle}>Y a-t-il des travaux prévus dans le lotissement mais non encore votés ?</label>
                    <div className="grid md:grid-cols-3 gap-3 mt-2">
                      {['Voirie', 'Réseaux (eaux / assainissement)', 'Sécurité / portail', 'Espaces verts', 'Équipements communs', 'À l\'étude', 'Je ne sais pas', 'Aucun travaux à prévoir'].map((option) => (
                        <label key={option} className={getOptionClass(formData.travauxASLPrevusNonVotes.includes(option))}>
                          <input type="checkbox" checked={formData.travauxASLPrevusNonVotes.includes(option)} onChange={() => handleCheckboxChange('travauxASLPrevusNonVotes', option)} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{option}</span>
                          </label>
                      ))}
                  </div>
                </div>
                        <div>
                  <label className={labelClass} style={fontStyle}>Procédure en cours</label>
                  <input type="text" name="procedureEnCoursASL" value={formData.procedureEnCoursASL} onChange={handleChange} placeholder="Ex: Contentieux, litige..." className={inputClass} style={fontStyle} />
                </div>
              </div>
            </div>
            )}

            {/* ═══ COPROPRIÉTÉ HORIZONTALE (si Maison + Copropriété horizontale) ═══ */}
            {formData.typeBien === 'Maison' && formData.maisonEnsembleOrganise === 'Copropriété horizontale' && (
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Copropriété horizontale — Informations juridiques</p>
              <div className="space-y-4 mt-4">
                <div>
                  <label className={labelClass} style={fontStyle}>Nombre de lots</label>
                  <input type="text" name="nombreLotsCoproHorizontale" value={formData.nombreLotsCoproHorizontale} onChange={handleChange} placeholder="Ex: 12" className={inputClass} style={fontStyle} />
                  </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Charges annuelles (€)</label>
                  <input type="text" name="chargesCoproHorizontale" value={formData.chargesCoproHorizontale} onChange={handleChange} placeholder="Ex: 2 000 €" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Détail des charges</label>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    {['Entretien voies privées', 'Réseaux (eau, assainissement)', 'Espaces verts', 'Équipements communs', 'Autres'].map((option) => (
                      <label key={option} className={getOptionClass(formData.chargesCoproHorizontaleContenu.includes(option))}>
                        <input type="checkbox" checked={formData.chargesCoproHorizontaleContenu.includes(option)} onChange={() => handleCheckboxChange('chargesCoproHorizontaleContenu', option)} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{option}</span>
                          </label>
                    ))}
                        </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Travaux effectués récemment</label>
                  <div className="flex gap-4 mt-2">
                    {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                      <label key={val} className={getOptionClass(formData.travauxCoproHorizontaleRecents === val)}>
                        <input type="radio" name="travauxCoproHorizontaleRecents" value={val} checked={formData.travauxCoproHorizontaleRecents === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                  {formData.travauxCoproHorizontaleRecents === 'Oui' && (
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <input type="text" name="travauxCoproHorizontaleRecentsDetail" value={formData.travauxCoproHorizontaleRecentsDetail} onChange={handleChange} placeholder="Nature des travaux" className={inputClass} style={fontStyle} />
                      <input type="text" name="travauxCoproHorizontaleRecentsMontant" value={formData.travauxCoproHorizontaleRecentsMontant} onChange={handleChange} placeholder="Montant (€)" className={inputClass} style={fontStyle} />
                      </div>
                    )}
                  </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Travaux votés et payés mais non encore réalisés</label>
                  <div className="flex gap-4 mt-2">
                    {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                      <label key={val} className={getOptionClass(formData.travauxCoproHorizontaleVotesNonRealises === val)}>
                        <input type="radio" name="travauxCoproHorizontaleVotesNonRealises" value={val} checked={formData.travauxCoproHorizontaleVotesNonRealises === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                </div>
                  {formData.travauxCoproHorizontaleVotesNonRealises === 'Oui' && (
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <input type="text" name="travauxCoproHorizontaleVotesDetail" value={formData.travauxCoproHorizontaleVotesDetail} onChange={handleChange} placeholder="Lesquels ?" className={inputClass} style={fontStyle} />
                      <select name="travauxCoproHorizontaleVotesDelai" value={formData.travauxCoproHorizontaleVotesDelai} onChange={handleChange} className={selectClass} style={fontStyle}>
                        <option value="" className="bg-black text-white">Quand ?</option>
                        <option value="Moins de 6 mois" className="bg-black text-white">Moins de 6 mois</option>
                        <option value="6 mois à 1 an" className="bg-black text-white">6 mois à 1 an</option>
                        <option value="1 à 2 ans" className="bg-black text-white">1 à 2 ans</option>
                        <option value="Plus de 2 ans" className="bg-black text-white">Plus de 2 ans</option>
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Travaux prévus non encore votés</label>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    {['Voirie', 'Réseaux', 'Espaces verts', 'À l\'étude', 'Aucun'].map((option) => (
                      <label key={option} className={getOptionClass(formData.travauxCoproHorizontalePrevusNonVotes.includes(option))}>
                        <input type="checkbox" checked={formData.travauxCoproHorizontalePrevusNonVotes.includes(option)} onChange={() => handleCheckboxChange('travauxCoproHorizontalePrevusNonVotes', option)} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Procédure en cours</label>
                  <input type="text" name="procedureEnCoursCoproHorizontale" value={formData.procedureEnCoursCoproHorizontale} onChange={handleChange} placeholder="Ex: Contentieux, litige..." className={inputClass} style={fontStyle} />
                </div>
              </div>
            </div>
            )}

          {formData.typeBien === 'Maison' && (
            <>
          <div className="border-t border-white/10" />

          {/* ═══════════ SITUATION JURIDIQUE & TECHNIQUE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Situation Juridique & Technique</h2>

                {/* Juridique (appartement : après type de syndic) */}
                      <div>
              <p className={sectionTitleClass} style={fontStyle}>Juridique</p>
                  <p className="text-white/50 text-xs mt-1 mb-2 uppercase tracking-wide" style={fontStyle}>
                    Plusieurs choix possibles
                  </p>
                  <details
                    className="mt-2"
                    onToggle={(e) => setJuridiqueMenuOpen(e.currentTarget.open)}
                  >
                    <summary
                      className={`${selectClass} cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden`}
                      style={fontStyle}
                    >
                      <span className="truncate text-left">
                        {formData.situationJuridiqueTechnique.length === 0
                          ? 'Choisir une ou plusieurs options…'
                          : formData.situationJuridiqueTechnique.length === 1
                            ? formData.situationJuridiqueTechnique[0]
                            : `${formData.situationJuridiqueTechnique.length} options sélectionnées`}
                      </span>
                      <span
                        className={`shrink-0 text-white/50 text-xs transition-transform duration-200 ${juridiqueMenuOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        {'\u25BC'}
                      </span>
                    </summary>
                    <div className="mt-3 p-3 rounded-lg border border-white/10 bg-white/5 space-y-2 max-h-[min(60vh,28rem)] overflow-y-auto">
                      {juridiqueSituationOptions.map((option) => (
                        <label key={option} className={`${getOptionClass(formData.situationJuridiqueTechnique.includes(option))} !p-2.5`}>
                          <input
                            type="checkbox"
                            checked={formData.situationJuridiqueTechnique.includes(option)}
                            onChange={() => toggleSituationJuridiqueTechnique(option)}
                            className="mr-2 accent-white shrink-0"
                          />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                        </label>
                ))}
                      </div>
                  </details>
                    </div>
                <div className="pt-6 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Technique et urbanistique</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['Fissures ou anomalies structurelles', 'Anomalies fondation', 'Anomalies toiture', 'Infiltration', 'Humidité', 'Défaut d\'assainissement', 'Non-conformité électrique', 'Non-conformité gaz', 'Sinistre déclaré (dégât des eaux, incendie...)', 'Travaux importants à prévoir', 'Aucun problème connu'].map((option) => (
                  <label key={option} className={getOptionClass(formData.situationTechniqueUrbanistique.includes(option))}>
                    <input type="checkbox" checked={formData.situationTechniqueUrbanistique.includes(option)} onChange={() => handleCheckboxChange('situationTechniqueUrbanistique', option)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
                </div>
                {/* Bien Vendu */}
                <div className="pt-6 border-t border-white/10">
                  <p className={sectionTitleClass} style={fontStyle}>Bien Vendu</p>
                  <div className="grid md:grid-cols-3 gap-3 mt-4">
                    {['Vide', 'Partiellement meublé', 'Entièrement meublé'].map((val) => (
                      <label key={val} className={getOptionClass(formData.typeVenteVideMeuble === val)}>
                        <input type="radio" name="typeVenteVideMeuble" value={val} checked={formData.typeVenteVideMeuble === val} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{val}</span>
                      </label>
                    ))}
                  </div>
                  {(formData.typeVenteVideMeuble === 'Partiellement meublé' || formData.typeVenteVideMeuble === 'Entièrement meublé') && (
                    <div className="mt-3">
                      <label className={labelClass} style={fontStyle}>Si meublé, type de mobilier :</label>
                      <div className="grid md:grid-cols-3 gap-3 mt-2">
                        {['Mobilier standard', 'Mobilier design / marques reconnues', 'Mobilier sur-mesure'].map((val) => (
                          <label key={val} className={getOptionClass(formData.description === val)}>
                            <input type="radio" name="description" value={val} checked={formData.description === val} onChange={handleChange} className="mr-2 accent-white" />
                            <span className="text-white text-sm" style={fontStyle}>{val}</span>
                  </label>
                ))}
              </div>
            </div>
            )}
                  </div>
                <div className="pt-6 border-t border-white/10 space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>

                  <div>
              <p className={sectionTitleClass} style={fontStyle}>Délai de vente souhaité</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                {['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map((option) => (
                  <label key={option} className={getOptionClass(formData.delaiVente === option)}>
                    <input type="radio" name="delaiVente" value={option} checked={formData.delaiVente === option} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                    </label>
                ))}
                  </div>
                </div>
                </div>
            <div className="pt-4 border-t border-white/10">
                  <p className={sectionTitleClass} style={fontStyle}>Si copropriété / Lotissement / ASL</p>
                  <div className="grid md:grid-cols-2 gap-3 mt-4">
                    {['Procédure en cours', 'Immeuble mis en péril', 'Immeuble mis en sécurité', 'Contentieux syndic', 'Charges élevées', 'Aucun élément particulier'].map((option) => (
                      <label key={option} className={getOptionClass(formData.situationCoproLotissement.includes(option))}>
                        <input type="checkbox" checked={formData.situationCoproLotissement.includes(option)} onChange={() => handleCheckboxChange('situationCoproLotissement', option)} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="border-t border-white/10" />

          <div className="space-y-6 pt-6">
            {formData.typeBien !== 'Maison' && (
            <div>
              <p className={sectionTitleClass} style={fontStyle}>Situation actuelle du bien</p>
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                {['Occupé', 'Libre', 'Loué', 'Occupé sans droit ni titre', 'Bien en cours de libération', 'Autre (à préciser)'].map((option) => (
                  <label key={option} className={getOptionClass(formData.situationActuelle === option)}>
                    <input type="radio" name="situationActuelle" value={option} checked={formData.situationActuelle === option} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
              {formData.situationActuelle === 'Loué' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Type de bail</label>
                    <div className="grid md:grid-cols-3 gap-3 mt-2">
                      {['Classique', 'Meublé', 'Mobilité', 'Étudiant', 'Bail 1948', 'Bail réel solidaire (BRS)'].map((val) => (
                        <label key={val} className={getOptionClass(formData.typeBailLoue === val)}>
                          <input type="radio" name="typeBailLoue" value={val} checked={formData.typeBailLoue === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Date de fin de bail</label>
                    <div className="grid md:grid-cols-3 gap-3 mt-2">
                      {['Moins de 6 mois', '6 à 12 mois', '1 à 2 ans', '2 à 3 ans', 'Plus de 3 ans', 'Je ne sais pas'].map((val) => (
                        <label key={val} className={getOptionClass(formData.finBail === val)}>
                          <input type="radio" name="finBail" value={val} checked={formData.finBail === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Âge du/des locataire(s)</label>
                    <div className="flex gap-4 mt-2">
                      {['Entre 18 et 64 ans', '65 ans et plus'].map((val) => (
                        <label key={val} className={getOptionClass(formData.ageLocataire === val)}>
                          <input type="radio" name="ageLocataire" value={val} checked={formData.ageLocataire === val} onChange={handleChange} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={fontStyle}>Loyer hors charges (€)</label>
                      <input type="text" name="loyerHorsCharges" value={formData.loyerHorsCharges} onChange={handleChange} placeholder="Ex: 800 €" className={inputClass} style={fontStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Charges mensuelles (€)</label>
                      <input type="text" name="chargesMensuelles" value={formData.chargesMensuelles} onChange={handleChange} placeholder="Ex: 100 €" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Prix envisagé</p>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Avez-vous une idée de prix ?</label>
                <input type="text" name="prixEnvisage" value={formData.prixEnvisage} onChange={handleChange} placeholder="Ex: 350 000 €" className={inputClass} style={fontStyle} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="block text-sm font-medium text-white/70 mb-4 leading-relaxed" style={fontStyle}>
                Si l&apos;estimation proposée diffère du prix que vous aviez en tête, dans quelle mesure seriez-vous disposé(e) à ajuster le prix ?
                    </label>
                    <div className="flex items-center gap-4">
                <span className="text-sm text-white/50" style={fontStyle}>1</span>
                      <input
                        type="range"
                        name="ajustementPrix"
                        value={formData.ajustementPrix}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        step="1"
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                      />
                <span className="text-sm text-white/50" style={fontStyle}>10</span>
                      {formData.ajustementPrix && (
                  <span className="text-lg font-semibold text-white min-w-[2rem] text-center" style={fontStyle}>
                          {formData.ajustementPrix}
                        </span>
                      )}
                    </div>
              <div className="flex justify-between mt-2 text-xs text-white/40" style={fontStyle}>
                      <span>Pas du tout</span>
                      <span>Très disposé(e)</span>
                  </div>
                </div>
              </div>



          {/* ═══════════ MESSAGE LIBRE ═══════════ */}
                <div className="space-y-4">
            <h2 className={groupTitleClass} style={fontStyle}>Message libre</h2>
                  <div>
              <label className={labelClass} style={fontStyle}>Souhaitez-vous ajouter une information importante ?</label>
                    <textarea
                      name="messageLibre"
                      value={formData.messageLibre}
                      onChange={handleChange}
                      rows={5}
                placeholder="Toute information complémentaire utile à l'analyse de votre bien..."
                className={inputClass}
                style={fontStyle}
              />
                </div>
              </div>

          {/* ═══════════ VALIDATION ═══════════ */}
              {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

          {/* Bloc RGPD + consentement */}
          <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/70 leading-relaxed" style={fontStyle}>
              Les informations collectées via ce formulaire sont destinées à traiter votre demande d&apos;estimation. Elles sont conservées pendant une durée maximale de 5 ans et ne sont pas cédées à des tiers. Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, rectification ou suppression. Vous pouvez nous contacter à lagenceyl@gmail.com.
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-white focus:ring-white/30 cursor-pointer accent-white" />
              <span className="text-sm text-white/90" style={fontStyle}>J&apos;accepte la politique de confidentialité</span>
            </label>
          </div>

                <button
                  type="submit"
            disabled={submitting || !acceptPrivacy}
            className="w-full px-8 py-4 rounded-full font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '1rem',
            }}
          >
            {submitting ? (uploadProgress || 'Envoi en cours...') : 'Paiement de l\'estimation'}
                </button>
                
            </form>
          </div>
    </main>
    </EstimationFormErrorBoundary>
  )
}
