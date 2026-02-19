'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createAnalyseLead, uploadEstimationPhotos } from '@/lib/firebase-admin'

export default function EstimationJuridiqueEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [formData, setFormData] = useState({
    // Localisation
    localisation: '',
    ville: '',
    codePostal: '',
    // Type de bien
    typeBien: '',
    // Surface
    surface: '',
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
    ascenseur: '',
    // Extérieurs
    exterieur: [] as string[],
    surfaceExterieur: '',
    // Stationnement
    stationnement: '',
    stationnementEmplacement: '',
    stationnementCouvert: '',
    stationnementFerme: '',
    surfaceStationnement: '',
    // État général
    etatBien: '',
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
    // Prestations
    prestations: [] as string[],
    autresPrestations: '',
    showAutresPrestations: false,
    // Exposition
    exposition: '',
    expositionTraversant: '',
    // Vis-à-vis
    visAVis: '',
    distanceVisAVis: '',
    // Charges & DPE
    taxeFonciere: '',
    chargesCopro: '',
    dpe: '',
    // Contexte
    contexteVente: '',
    nomSuccession: '',
    raisonDemandeJuridique: '',
    contexteJuridiqueLibre: '',
    // Délai de vente
    delaiVente: '',
    // Situation actuelle
    situationActuelle: '',
    typeLocation: '',
    loyerMensuel: '',
    // Prix envisagé
    prixEnvisage: '',
    // Ajustement prix
    ajustementPrix: '',
    // Description / Message libre
    description: '',
    messageLibre: '',
    // Mitoyenneté
    mitoyennete: '',
    // Vue
    vue: '',
    // Année de construction
    anneeConstruction: '',
    // État extérieur
    etatToiture: '',
    etatFacade: '',
    etatTerrainExt: '',
    // Sécurité & Confort
    securiteConfort: [] as string[],
    // État intérieur
    etatMurs: '',
    etatSols: '',
    etatPlafonds: '',
    etatMenuiserie: '',
    // Prestations détaillées
    standing: '',
    materiaux: '',
    cuisineElectromenager: '',
    marquesCuisine: '',
    typeVenteVideMeuble: '',
    equipementsPremium: [] as string[],
    atoutPrincipal: '',
    // Chauffage & Eau chaude
    chauffageType: '',
    chauffageProduction: '',
    eauChaudeProduction: '',
    ancienneteInstallation: '',
    // Assainissement
    assainissementType: '',
    spancValidite: '',
    raccordabilite: '',
    // Situation juridique & technique
    situationJuridiqueTechnique: [] as string[],
    situationTechniqueUrbanistique: [] as string[],
    situationCoproLotissement: [] as string[],
    // DPE
    dpeValide: '',
    // Classe GES
    classeGes: '',
    // Résidence
    residenceType: '',
    // Charges copro
    chargesCoproContenu: [] as string[],
    // Eau chaude type
    eauChaudeType: '',
    // Travaux autorisations
    travauxAutorisations: '',
    travauxPrevusAutorisations: '',
    travauxUrbanisme: '',
    travauxUrbanismeDetail: '',
    // Travaux copropriété
    travauxCoproRecents: '',
    travauxCoproRecentsDetail: '',
    travauxCoproRecentsMontant: '',
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
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  useEffect(() => {
    const etape1 = sessionStorage.getItem('estimation_juridique_etape1')
    if (!etape1) {
      router.push('/estimation/juridique/formulaire')
      return
    }
    setEtape1Data(JSON.parse(etape1))
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof typeof prev] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return {
        ...prev,
        [name]: newArray
      }
    })
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

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePhotoRemove = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const completeData: any = {
        // Données étape 1
        prenom: etape1Data.prenom,
        nom: etape1Data.nom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        nom_dossier: etape1Data.nomDossier || null,
        profession_juridique: etape1Data.professionJuridique || null,
        
        // Données étape 2
        localisation: formData.localisation,
        ville: formData.ville || null,
        code_postal: formData.codePostal || null,
        type_bien: formData.typeBien,
        surface: formData.surface || null,
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
        exterieurs: formData.exterieur.length > 0 ? formData.exterieur : null,
        surface_exterieur: formData.surfaceExterieur || null,
        stationnement: formData.stationnement || null,
        stationnement_emplacement: formData.stationnementEmplacement || null,
        stationnement_couvert: formData.stationnementCouvert || null,
        stationnement_ferme: formData.stationnementFerme || null,
        surface_stationnement: formData.surfaceStationnement || null,
        etat_bien: formData.etatBien || null,
        travaux_recents: formData.travauxRecents === 'oui' ? true : formData.travauxRecents === 'non' ? false : null,
        nature_travaux: formData.natureTravaux || null,
        annee_travaux: formData.anneeTravaux ? parseInt(formData.anneeTravaux) : null,
        montant_travaux: formData.montantTravaux || null,
        travaux_prevus: formData.travauxPrevus === 'oui' ? true : formData.travauxPrevus === 'non' ? false : null,
        nature_travaux_prevus: formData.natureTravauxPrevus || null,
        budget_travaux_prevus: formData.budgetTravauxPrevus || null,
        date_travaux_prevus: formData.dateTravauxPrevus || null,
        prestations: formData.prestations.length > 0 ? formData.prestations : null,
        autres_prestations: formData.autresPrestations || null,
        exposition: formData.exposition || null,
        exposition_traversant: formData.expositionTraversant || null,
        vis_a_vis: formData.visAVis || null,
        distance_vis_a_vis: formData.distanceVisAVis || null,
        taxe_fonciere: formData.taxeFonciere || null,
        charges_copro: formData.chargesCopro || null,
        dpe: formData.dpe || null,
        contexte_vente: formData.contexteVente || null,
        raison_demande_juridique: formData.raisonDemandeJuridique || null,
        contexte_juridique_libre: formData.contexteJuridiqueLibre || null,
        nom_succession: formData.raisonDemandeJuridique === 'Succession' ? formData.nomSuccession || null : null,
        delai_vente: formData.delaiVente || null,
        situation_actuelle: formData.situationActuelle || null,
        type_location: formData.typeLocation || null,
        loyer_mensuel: formData.loyerMensuel || null,
        prix_envisage: formData.prixEnvisage || null,
        ajustement_prix_echelle: formData.ajustementPrix ? parseInt(formData.ajustementPrix) : null,
        message_libre: formData.messageLibre || null,

        // Nouveaux champs communs
        mitoyennete: formData.mitoyennete || null,
        vue: formData.vue || null,
        annee_construction: formData.anneeConstruction || null,
        etat_toiture: formData.etatToiture || null,
        etat_facade: formData.etatFacade || null,
        etat_terrain_ext: formData.etatTerrainExt || null,
        securite_confort: formData.securiteConfort.length > 0 ? formData.securiteConfort : null,
        etat_murs: formData.etatMurs || null,
        etat_sols: formData.etatSols || null,
        etat_plafonds: formData.etatPlafonds || null,
        etat_menuiserie: formData.etatMenuiserie || null,
        standing: formData.standing || null,
        materiaux: formData.materiaux || null,
        cuisine_electromenager: formData.cuisineElectromenager || null,
        marques_cuisine: formData.marquesCuisine || null,
        type_vente_vide_meuble: formData.typeVenteVideMeuble || null,
        equipements_premium: formData.equipementsPremium.length > 0 ? formData.equipementsPremium : null,
        atout_principal: formData.atoutPrincipal || null,
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
        charges_copro_contenu: formData.chargesCoproContenu.length > 0 ? formData.chargesCoproContenu : null,
        eau_chaude_type: formData.eauChaudeType || null,
        travaux_autorisations: formData.travauxAutorisations || null,
        travaux_prevus_autorisations: formData.travauxPrevusAutorisations || null,
        travaux_urbanisme: formData.travauxUrbanisme || null,
        travaux_urbanisme_detail: formData.travauxUrbanismeDetail || null,
        travaux_copro_recents: formData.travauxCoproRecents || null,
        travaux_copro_recents_detail: formData.travauxCoproRecentsDetail || null,
        travaux_copro_recents_montant: formData.travauxCoproRecentsMontant || null,
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
        type_bail_loue: formData.typeBailLoue || null,
        fin_bail: formData.finBail || null,
        age_locataire: formData.ageLocataire || null,
        loyer_hors_charges: formData.loyerHorsCharges || null,
        charges_mensuelles: formData.chargesMensuelles || null,
        
        type_demande: 'estimation_juridique',
        maturite: 'estimation',
        ajustement_prix: 'oui',
        motivation: `Estimation activités juridiques demandée. ${formData.messageLibre || 'Demande d\'estimation immobilière pour activités juridiques.'}`,
        status: 'nouveau'
      }

      const requiredFields = ['prenom', 'telephone', 'email']
      const missingFields = requiredFields.filter(field => !completeData[field])
      if (missingFields.length > 0) {
        setSubmitError(`Des champs obligatoires sont manquants: ${missingFields.join(', ')}`)
        setSubmitting(false)
        return
      }
      
      // 1. Uploader les photos d'abord (si il y en a)
      let photoUrls: string[] = []
      if (photos.length > 0) {
        const tempId = `temp_${Date.now()}`
        setUploadProgress(`Upload des photos (0/${photos.length})...`)
        photoUrls = await uploadEstimationPhotos(photos, tempId, (uploaded, total) => {
          setUploadProgress(`Upload des photos (${uploaded}/${total})...`)
        })
      }

      // 2. Créer le lead avec TOUTES les données
      setUploadProgress('Enregistrement des données...')
      if (photoUrls.length > 0) {
        completeData.photos_urls = photoUrls
      }

      await createAnalyseLead(completeData)

      sessionStorage.removeItem('estimation_juridique_etape1')
      window.location.href = 'https://buy.stripe.com/6oUfZhbpw8c86Sxg4jeQM03'
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

  if (!etape1Data) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50" style={fontStyle}>Chargement...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-4" style={fontStyle}>
            Détails du bien
          </h1>
          <p className="text-white/50 text-sm uppercase tracking-widest" style={fontStyle}>
            Étape 2 / 2 — Affinage de l&apos;estimation
          </p>
          <p className="text-white text-base mt-6 max-w-lg mx-auto leading-relaxed font-medium" style={fontStyle}>
            Une précision maximale est souhaitée afin de produire l&apos;estimation la plus réaliste possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ═══════════ PROJET DE VENTE (Raison de la demande) ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>
            <div>
              <p className={sectionTitleClass} style={fontStyle}>Raison de la demande</p>
              <div className="mt-4">
                <select name="raisonDemandeJuridique" value={formData.raisonDemandeJuridique} onChange={handleChange} required className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black text-white">Sélectionnez... *</option>
                  <option value="Succession" className="bg-black text-white">Succession</option>
                  <option value="Changement de régime matrimonial" className="bg-black text-white">Changement de régime matrimonial</option>
                  <option value="Divorce / Liquidation de communauté" className="bg-black text-white">Divorce / Liquidation de communauté</option>
                  <option value="Donation / donation-partage" className="bg-black text-white">Donation / donation-partage</option>
                  <option value="Indivision conflictuelle" className="bg-black text-white">Indivision conflictuelle</option>
                  <option value="Vente sous tutelle curatelle" className="bg-black text-white">Vente sous tutelle curatelle</option>
                  <option value="Préemption / vente encadrée" className="bg-black text-white">Préemption / vente encadrée</option>
                  <option value="Saisie immobilière" className="bg-black text-white">Saisie immobilière</option>
                  <option value="Redressement fiscal / contrôles" className="bg-black text-white">Redressement fiscal / contrôles</option>
                  <option value="Contentieux successoral" className="bg-black text-white">Contentieux successoral</option>
                  <option value="Litige entre associés (SCI)" className="bg-black text-white">Litige entre associés (SCI)</option>
                </select>
              </div>
              {formData.raisonDemandeJuridique === 'Succession' && (
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

            {/* Localisation */}
            <div>
              <label className={labelClass} style={fontStyle}>Adresse exacte du bien</label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
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
                  className={inputClass}
                  style={fontStyle}
                />
              </div>
            </div>

            {/* Type de bien */}
            <div>
              <label className={labelClass} style={fontStyle}>Type de bien</label>
              <select
                name="typeBien"
                value={formData.typeBien}
                onChange={handleChange}
                className={selectClass}
                style={fontStyle}
              >
                <option value="" className="bg-black text-white">Sélectionnez...</option>
                <option value="Appartement" className="bg-black text-white">Appartement</option>
                <option value="Maison" className="bg-black text-white">Maison</option>
                <option value="Villa" className="bg-black text-white">Villa</option>
                <option value="Maison de ville" className="bg-black text-white">Maison de ville</option>
                <option value="Hôtel particulier" className="bg-black text-white">Hôtel particulier</option>
                <option value="Loft" className="bg-black text-white">Loft</option>
                <option value="Studio" className="bg-black text-white">Studio</option>
                <option value="Duplex" className="bg-black text-white">Duplex</option>
                <option value="Triplex" className="bg-black text-white">Triplex</option>
                <option value="Penthouse" className="bg-black text-white">Penthouse</option>
                <option value="Chambre de bonne" className="bg-black text-white">Chambre de bonne</option>
                <option value="Terrain" className="bg-black text-white">Terrain</option>
                <option value="Parking / Box" className="bg-black text-white">Parking / Box</option>
                <option value="Cave" className="bg-black text-white">Cave</option>
                <option value="Château" className="bg-black text-white">Château</option>
                <option value="Propriété" className="bg-black text-white">Propriété</option>
                <option value="Ferme" className="bg-black text-white">Ferme</option>
                <option value="Autre" className="bg-black text-white">Autre</option>
              </select>
            </div>

            {/* Surface */}
            <div className="grid md:grid-cols-2 gap-4">
              {formData.typeBien !== 'Terrain' && (
                <div>
                  <label className={labelClass} style={fontStyle}>Surface habitable (m²)</label>
                  <input type="number" name="surface" value={formData.surface} onChange={handleChange} min="1" placeholder="Ex: 75" className={inputClass} style={fontStyle} />
                </div>
              )}
              {['Maison', 'Villa', 'Maison de ville', 'Hôtel particulier', 'Propriété', 'Ferme', 'Château', 'Terrain'].includes(formData.typeBien) && (
                <div>
                  <label className={labelClass} style={fontStyle}>Surface du terrain (m²)</label>
                  <input type="number" name="surfaceTerrain" value={formData.surfaceTerrain} onChange={handleChange} min="1" placeholder="Ex: 200" className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>

            {/* Le bien est actuellement */}
            <div>
              <label className={labelClass} style={fontStyle}>Le bien est actuellement :</label>
              <div className="grid md:grid-cols-3 gap-4 mt-2">
                {['Résidence principale', 'Résidence secondaire', 'Investissement', 'Bien vacant', 'Occupé par un proche', 'Autre (à préciser)'].map((option) => (
                  <label key={option} className={getOptionClass(formData.residenceType === option)}>
                    <input type="radio" name="residenceType" value={option} checked={formData.residenceType === option} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PHOTOS DU BIEN ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Photos du bien</h2>
            <p className="text-white/60 text-sm leading-relaxed -mt-2" style={fontStyle}>
              Ajoutez jusqu&apos;à 20 photos de votre bien pour affiner l&apos;estimation. Formats acceptés : JPG, PNG, WEBP (max 10 Mo par photo).
            </p>

            <div
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
              <div className="flex flex-col items-center gap-3">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/60 text-sm" style={fontStyle}>
                  <span className="text-white font-medium">Cliquez pour ajouter des photos</span><br />ou glissez-déposez vos fichiers ici
                </p>
                {photos.length > 0 && (
                  <p className="text-white/40 text-xs mt-1" style={fontStyle}>{photos.length} photo{photos.length > 1 ? 's' : ''} ajoutée{photos.length > 1 ? 's' : ''}</p>
                )}
              </div>
            </div>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                    <Image src={preview} alt={`Photo ${index + 1}`} fill className="object-cover" />
                    <button type="button" onClick={() => handlePhotoRemove(index)} className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/70 text-[10px] text-center py-0.5" style={fontStyle}>{index + 1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ CARACTÉRISTIQUES ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Caractéristiques</h2>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Composition</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div><label className={labelClass} style={fontStyle}>Nombre de pièces</label><input type="number" name="nombrePieces" value={formData.nombrePieces} onChange={handleChange} min="1" className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Nombre de chambres</label><input type="number" name="nombreChambres" value={formData.nombreChambres} onChange={handleChange} min="0" className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Salles de bain</label><input type="number" name="nombreSallesDeBain" value={formData.nombreSallesDeBain} onChange={handleChange} min="0" className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Salles d&apos;eau</label><input type="number" name="nombreSallesDEau" value={formData.nombreSallesDEau} onChange={handleChange} min="0" className={inputClass} style={fontStyle} /></div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div><label className={labelClass} style={fontStyle}>Nombre de WC</label><input type="number" name="nombreWC" value={formData.nombreWC} onChange={handleChange} min="0" className={inputClass} style={fontStyle} /></div>
                {formData.nombreWC && parseInt(formData.nombreWC) > 0 && (
                  <div className="flex items-end"><div><label className={labelClass} style={fontStyle}>WC séparés ?</label><div className="flex gap-3 mt-1">{['oui', 'non'].map((val) => (<label key={val} className={getOptionClass(formData.wcSepares === val)}><input type="radio" name="wcSepares" value={val} checked={formData.wcSepares === val} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm capitalize" style={fontStyle}>{val}</span></label>))}</div></div></div>
                )}
              </div>

              {['Maison', 'Villa', 'Maison de ville', 'Hôtel particulier', 'Propriété', 'Ferme'].includes(formData.typeBien) && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div><label className={labelClass} style={fontStyle}>Nombre de niveaux</label>
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

              {/* Mitoyenneté (maisons et similaires) */}
              {['Maison', 'Villa', 'Maison de ville', 'Hôtel particulier', 'Propriété', 'Ferme'].includes(formData.typeBien) && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <label className={labelClass} style={fontStyle}>Mitoyenneté</label>
                    <select name="mitoyennete" value={formData.mitoyennete} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="Non mitoyenne" className="bg-black text-white">Non mitoyenne</option>
                      <option value="Mitoyenneté 1 côté" className="bg-black text-white">Mitoyenneté 1 côté</option>
                      <option value="Mitoyenne 2 côtés" className="bg-black text-white">Mitoyenne 2 côtés</option>
                      <option value="Mitoyenneté par annexe (garage)" className="bg-black text-white">Mitoyenneté par annexe (garage)</option>
                      <option value="Mitoyenneté en bande (maisons accolées)" className="bg-black text-white">Mitoyenneté en bande (maisons accolées)</option>
                      <option value="Je ne sais pas" className="bg-black text-white">Je ne sais pas</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {['Appartement', 'Loft', 'Studio', 'Chambre de bonne', 'Duplex', 'Triplex', 'Penthouse'].includes(formData.typeBien) && (
              <div className="pt-4 border-t border-white/10">
                <p className={sectionTitleClass} style={fontStyle}>Étage & accès</p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div><label className={labelClass} style={fontStyle}>Étage</label>
                    <select name="etage" value={formData.etage} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="RDC" className="bg-black text-white">RDC</option>
                      {[1,2,3,4,5,6,7,8,9].map(n => (<option key={n} value={String(n)} className="bg-black text-white">{n === 1 ? '1er' : `${n}ème`}</option>))}
                      <option value="10+" className="bg-black text-white">10ème et +</option>
                    </select>
                  </div>
                  <div><label className={labelClass} style={fontStyle}>Nombre d&apos;étages de l&apos;immeuble</label><input type="number" name="nombreEtagesImmeuble" value={formData.nombreEtagesImmeuble} onChange={handleChange} min="1" placeholder="Ex: 5" className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Dernier étage ?</label>
                    <select name="dernierEtage" value={formData.dernierEtage} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="oui" className="bg-black text-white">Oui</option>
                      <option value="non" className="bg-black text-white">Non</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div><label className={labelClass} style={fontStyle}>Ascenseur</label>
                    <select name="ascenseur" value={formData.ascenseur} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="oui" className="bg-black text-white">Oui</option>
                      <option value="non" className="bg-black text-white">Non</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Vue */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>La vue</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {['Complètement dégagée', 'Partiellement dégagée', 'Vue sur cour', 'Vue sur rue', 'Vue sur mer', 'Vue sur montagne', 'Vue sur jardin', 'Vue immeuble', 'Aucune'].map((option) => (
                  <label key={option} className={getOptionClass(formData.vue === option)}>
                    <input type="radio" name="vue" value={option} checked={formData.vue === option} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Extérieurs */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Extérieurs</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                {['Balcon', 'Terrasse', 'Jardin', 'Rooftop', 'Cour', 'Loggia', 'Aucun'].map((option) => (
                  <label key={option} className={getOptionClass(formData.exterieur.includes(option))}><input type="checkbox" checked={formData.exterieur.includes(option)} onChange={() => handleCheckboxChange('exterieur', option)} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
              {(formData.exterieur.includes('Balcon') || formData.exterieur.includes('Terrasse') || formData.exterieur.includes('Jardin') || formData.exterieur.includes('Rooftop') || formData.exterieur.includes('Cour') || formData.exterieur.includes('Loggia')) && (
                <div className="mt-4"><label className={labelClass} style={fontStyle}>Surface approximative de l&apos;extérieur</label><input type="text" name="surfaceExterieur" value={formData.surfaceExterieur} onChange={handleChange} placeholder="Ex: 15 m²" className={inputClass} style={fontStyle} /></div>
              )}
            </div>

            {/* Stationnement */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Stationnement</p>
              <div className="grid md:grid-cols-5 gap-4 mt-4">
                {['Aucun', 'Parking', 'Box', 'Garage'].map((option) => (
                  <label key={option} className={getOptionClass(formData.stationnement === option)}><input type="radio" name="stationnement" value={option} checked={formData.stationnement === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
              {formData.stationnement && formData.stationnement !== 'Aucun' && (
                <div className="mt-4 space-y-4">
                  {formData.stationnement === 'Parking' && (
                    <div><label className={labelClass} style={fontStyle}>Emplacement</label><div className="grid md:grid-cols-2 gap-4 mt-2">{['Intérieur', 'Extérieur'].map((option) => (<label key={option} className={getOptionClass(formData.stationnementEmplacement === option)}><input type="radio" name="stationnementEmplacement" value={option} checked={formData.stationnementEmplacement === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div></div>
                  )}
                  <div><label className={labelClass} style={fontStyle}>Couverture</label><div className="grid md:grid-cols-2 gap-4 mt-2">{['Couvert', 'Non couvert'].map((option) => (<label key={option} className={getOptionClass(formData.stationnementCouvert === option)}><input type="radio" name="stationnementCouvert" value={option} checked={formData.stationnementCouvert === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div></div>
                  {(formData.stationnement === 'Box' || formData.stationnement === 'Garage') && (
                    <div><label className={labelClass} style={fontStyle}>Fermé ?</label><div className="grid md:grid-cols-2 gap-4 mt-2">{['Fermé', 'Non fermé'].map((option) => (<label key={option} className={getOptionClass(formData.stationnementFerme === option)}><input type="radio" name="stationnementFerme" value={option} checked={formData.stationnementFerme === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div></div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4"><div><label className={labelClass} style={fontStyle}>Superficie (m²)</label><input type="text" name="surfaceStationnement" value={formData.surfaceStationnement} onChange={handleChange} placeholder="Ex: 15 m²" className={inputClass} style={fontStyle} /></div></div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ ÉTAT & PRESTATIONS ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>État & Prestations</h2>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>État général du bien</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                {['À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'].map((option) => (
                  <label key={option} className={getOptionClass(formData.etatBien === option)}><input type="radio" name="etatBien" value={option} checked={formData.etatBien === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
            </div>

            {/* ═══ TRAVAUX EFFECTUÉS ═══ */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Travaux effectués</p>
              <div className="flex gap-4 mt-4 mb-4">
                {['oui', 'non'].map((val) => (
                  <label key={val} className={getOptionClass(formData.travauxRecents === val)}>
                    <input type="radio" name="travauxRecents" value={val} checked={formData.travauxRecents === val} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                  </label>
                ))}
              </div>
              {formData.travauxRecents === 'oui' && (
                <div className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={fontStyle}>Nature des travaux</label>
                      <input type="text" name="natureTravaux" value={formData.natureTravaux} onChange={handleChange} placeholder="Ex: Rénovation complète..." className={inputClass} style={fontStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Année approximative</label>
                      <input type="text" name="anneeTravaux" value={formData.anneeTravaux} onChange={handleChange} placeholder="Ex: 2023" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Montant total des travaux</label>
                    <input type="text" name="montantTravaux" value={formData.montantTravaux} onChange={handleChange} placeholder="Ex: 25 000 €" className={inputClass} style={fontStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Les travaux effectués ont-ils fait l&apos;objet des autorisations nécessaires ?</label>
                    <div className="grid md:grid-cols-4 gap-3 mt-2">
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

            {/* ═══ TRAVAUX PRÉVUS ═══ */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Travaux prévus</p>
              <div className="flex gap-4 mt-4 mb-4">
                {['oui', 'non'].map((val) => (
                  <label key={val} className={getOptionClass(formData.travauxPrevus === val)}>
                    <input type="radio" name="travauxPrevus" value={val} checked={formData.travauxPrevus === val} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm capitalize" style={fontStyle}>{val}</span>
                  </label>
                ))}
              </div>
              {formData.travauxPrevus === 'oui' && (
                <div className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass} style={fontStyle}>Nature des travaux prévus</label>
                      <input type="text" name="natureTravauxPrevus" value={formData.natureTravauxPrevus} onChange={handleChange} placeholder="Ex: Ravalement, extension..." className={inputClass} style={fontStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Budget estimé</label>
                      <input type="text" name="budgetTravauxPrevus" value={formData.budgetTravauxPrevus} onChange={handleChange} placeholder="Ex: 15 000 €" className={inputClass} style={fontStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={fontStyle}>Date prévue</label>
                      <input type="text" name="dateTravauxPrevus" value={formData.dateTravauxPrevus} onChange={handleChange} placeholder="Ex: Été 2026" className={inputClass} style={fontStyle} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Les travaux prévus ont-ils fait l&apos;objet des autorisations nécessaires ?</label>
                    <div className="grid md:grid-cols-4 gap-3 mt-2">
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

            {/* ═══ AUTORISATIONS D'URBANISME ═══ */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Autorisations d&apos;urbanisme</p>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Y a-t-il des autorisations d&apos;urbanisme déjà acceptées mais dont les travaux n&apos;ont pas été effectués ? (Permis de construire, déclaration préalable, changement d&apos;usage)</label>
                <div className="flex gap-4 mt-2">
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

            {/* ═══ TRAVAUX DE COPROPRIÉTÉ ═══ */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Travaux de copropriété</p>

              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Y a-t-il des travaux effectués récemment dans la copropriété ?</label>
                <div className="flex gap-4 mt-2">
                  {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                    <label key={val} className={getOptionClass(formData.travauxCoproRecents === val)}>
                      <input type="radio" name="travauxCoproRecents" value={val} checked={formData.travauxCoproRecents === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.travauxCoproRecents === 'Oui' && (
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className={labelClass} style={fontStyle}>Lesquels ?</label>
                    <input type="text" name="travauxCoproRecentsDetail" value={formData.travauxCoproRecentsDetail} onChange={handleChange} placeholder="Ex: Ravalement façade..." className={inputClass} style={fontStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Montant</label>
                    <input type="text" name="travauxCoproRecentsMontant" value={formData.travauxCoproRecentsMontant} onChange={handleChange} placeholder="Ex: 50 000 €" className={inputClass} style={fontStyle} />
                  </div>
                </div>
              )}

              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Y a-t-il des travaux de copropriété prévus mais non encore votés ?</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {['Ravalement de façade', 'Réfection complète toiture', 'Étanchéité toiture terrasse', 'Reprise fissures structurelles', 'Consolidation fondations', 'Réfection balcons / garde-corps', 'Réfection plancher', 'À l\'étude', 'Je ne sais pas', 'Aucun travaux à prévoir'].map((option) => (
                    <label key={option} className={getOptionClass(formData.travauxCoproPrevusNonVotes.includes(option))}>
                      <input type="checkbox" checked={formData.travauxCoproPrevusNonVotes.includes(option)} onChange={() => handleCheckboxChange('travauxCoproPrevusNonVotes', option)} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Y a-t-il des travaux votés et payés mais non encore réalisés ?</label>
                <div className="flex gap-4 mt-2">
                  {['Oui', 'Non', 'Je ne sais pas'].map((val) => (
                    <label key={val} className={getOptionClass(formData.travauxVotesNonRealises === val)}>
                      <input type="radio" name="travauxVotesNonRealises" value={val} checked={formData.travauxVotesNonRealises === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.travauxVotesNonRealises === 'Oui' && (
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className={labelClass} style={fontStyle}>Lesquels ?</label>
                    <input type="text" name="travauxVotesNonRealisesDetail" value={formData.travauxVotesNonRealisesDetail} onChange={handleChange} placeholder="Ex: Ravalement..." className={inputClass} style={fontStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Quand seront-ils réalisés ?</label>
                    <select name="travauxVotesNonRealisesDelai" value={formData.travauxVotesNonRealisesDelai} onChange={handleChange} className={selectClass} style={fontStyle}>
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
            </div>

            {/* ═══ LOTISSEMENT AVEC ASL ═══ */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Lotissement avec ASL</p>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Le bien fait-il partie d&apos;un lotissement avec ASL ?</label>
                <div className="flex gap-4 mt-2">
                  {['Oui', 'Non'].map((val) => (
                    <label key={val} className={getOptionClass(formData.lotissementASL === val)}>
                      <input type="radio" name="lotissementASL" value={val} checked={formData.lotissementASL === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.lotissementASL === 'Oui' && (
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
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Prestations principales</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {['Double vitrage', 'Climatisation', 'Cuisine équipée', 'Cave', 'Local vélo', 'Cheminée', 'Eau chaude', 'Eau froide', 'Chauffage collectif', 'Chauffage individuel', 'Chauffage au sol', 'Volets électriques', 'Volets manuels', 'Piscine', 'Immeuble sécurisé', 'Ascenseur', 'Fibre optique', 'Alarme', 'Porte blindée'].map((option) => (
                  <label key={option} className={getOptionClass(formData.prestations.includes(option))}><input type="checkbox" checked={formData.prestations.includes(option)} onChange={() => handleCheckboxChange('prestations', option)} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
              <div className="mt-4"><label className={labelClass} style={fontStyle}>Autres prestations</label><input type="text" name="autresPrestations" value={formData.autresPrestations} onChange={handleChange} placeholder="Précisez d'autres prestations..." className={inputClass} style={fontStyle} /></div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ ÉTAT DÉTAILLÉ ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>État détaillé</h2>

            {/* État extérieur */}
            <div>
              <p className={sectionTitleClass} style={fontStyle}>État extérieur</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {[
                  { name: 'etatToiture', label: 'Toiture' },
                  { name: 'etatFacade', label: 'Façade' },
                  { name: 'etatTerrainExt', label: 'Terrain' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className={labelClass} style={fontStyle}>{field.label}</label>
                    <select name={field.name} value={(formData as any)[field.name]} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      <option value="À rénover" className="bg-black text-white">À rénover</option>
                      <option value="À rafraîchir" className="bg-black text-white">À rafraîchir</option>
                      <option value="Bon état" className="bg-black text-white">Bon état</option>
                      <option value="Excellent état" className="bg-black text-white">Excellent état</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Sécurité & Confort */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Sécurité & Confort</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {['Clôture', 'Vidéosurveillance', 'Interphone / Visiophone', 'Éclairage extérieur', 'Portail automatique', 'Résidence fermée', 'Résidence sécurisée', 'Gardien / Concierge', 'Alarme', 'Volets roulants électriques'].map((option) => (
                  <label key={option} className={getOptionClass(formData.securiteConfort.includes(option))}>
                    <input type="checkbox" checked={formData.securiteConfort.includes(option)} onChange={() => handleCheckboxChange('securiteConfort', option)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* État intérieur */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>État intérieur</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  { name: 'etatMurs', label: 'Murs', options: ['À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'] },
                  { name: 'etatSols', label: 'Sols', options: ['À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'] },
                  { name: 'etatPlafonds', label: 'Plafonds', options: ['À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'] },
                  { name: 'etatMenuiserie', label: 'Menuiserie', options: ['À rénover', 'Passable', 'Bon état', 'Excellent état'] },
                ].map((field) => (
                  <div key={field.name}>
                    <label className={labelClass} style={fontStyle}>{field.label}</label>
                    <select name={field.name} value={(formData as any)[field.name]} onChange={handleChange} className={selectClass} style={fontStyle}>
                      <option value="" className="bg-black text-white">Sélectionnez...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Prestations détaillées (6 niveaux) */}
            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Prestations détaillées</p>

              {/* 1. Niveau global */}
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>1. Niveau global du bien</label>
                <div className="grid md:grid-cols-4 gap-3 mt-2">
                  {['Standard', 'Bon standing', 'Haut de gamme', 'Luxe / Exceptionnel'].map((val) => (
                    <label key={val} className={getOptionClass(formData.standing === val)}>
                      <input type="radio" name="standing" value={val} checked={formData.standing === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Matériaux & finitions */}
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>2. Matériaux & finitions</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {['Parquet massif / Point de Hongrie', 'Pierre naturelle / Marbre', 'Moulures / Hauteur sous plafond remarquable', 'Menuiseries sur-mesure', 'Cuisine sur-mesure', 'Aucun élément particulier'].map((val) => (
                    <label key={val} className={getOptionClass(formData.materiaux === val)}>
                      <input type="radio" name="materiaux" value={val} checked={formData.materiaux === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Cuisine & électroménager */}
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>3. Cuisine</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {['Standard', 'Aménagée', 'Sur-mesure / Architecte'].map((val) => (
                    <label key={val} className={getOptionClass(formData.cuisineElectromenager === val)}>
                      <input type="radio" name="cuisineElectromenager" value={val} checked={formData.cuisineElectromenager === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
                <label className={`${labelClass} mt-3`} style={fontStyle}>Électroménager</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {['Non inclus', 'Inclus (entrée / milieu de gamme)', 'Inclus (haut de gamme)'].map((val) => (
                    <label key={val} className={getOptionClass(formData.autresPrestations === val)}>
                      <input type="radio" name="autresPrestations" value={val} checked={formData.autresPrestations === val} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{val}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <label className={labelClass} style={fontStyle}>Marques principales (si connues)</label>
                  <input type="text" name="marquesCuisine" value={formData.marquesCuisine} onChange={handleChange} placeholder="Ex: Miele, Siemens, Boffi..." className={inputClass} style={fontStyle} />
                </div>
              </div>

              {/* 4. Bien vendu */}
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>4. Bien vendu</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
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

              {/* 5. Équipements premium */}
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>5. Équipements premium</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {['Climatisation intégrée', 'Domotique', 'Dressing sur-mesure', 'Cheminée', 'Terrasse / Rooftop', 'Piscine', 'Jacuzzi', 'Bassin', 'Fontaine', 'Salle de sport / Spa', 'Cave à vin', 'Aucun'].map((option) => (
                    <label key={option} className={getOptionClass(formData.equipementsPremium.includes(option))}>
                      <input type="checkbox" checked={formData.equipementsPremium.includes(option)} onChange={() => handleCheckboxChange('equipementsPremium', option)} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 6. Atout principal */}
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>6. Selon vous, quel est l&apos;atout principal de votre bien ?</label>
                <input type="text" name="atoutPrincipal" value={formData.atoutPrincipal} onChange={handleChange} placeholder="Ex: Vue exceptionnelle, jardin privatif..." className={inputClass} style={fontStyle} />
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

          <div className="border-t border-white/10" />

          {/* ═══════════ ASSAINISSEMENT ═══════════ */}
          <div className="space-y-6">
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

          <div className="border-t border-white/10" />

          {/* ═══════════ SITUATION JURIDIQUE & TECHNIQUE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Situation Juridique & Technique</h2>

            {/* Juridique */}
            <div>
              <p className={sectionTitleClass} style={fontStyle}>Juridique</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['Servitudes (passage, vue, canalisation...)', 'Droit de passage', 'Mitoyenneté particulière', 'Indivision', 'Usufruit', 'Nue-propriété', 'Procédure en cours', 'Litige avec voisin', 'Hypothèque en cours', 'Saisie ou procédure bancaire', 'Aucune situation particulière'].map((option) => (
                  <label key={option} className={getOptionClass(formData.situationJuridiqueTechnique.includes(option))}>
                    <input type="checkbox" checked={formData.situationJuridiqueTechnique.includes(option)} onChange={() => handleCheckboxChange('situationJuridiqueTechnique', option)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Technique et urbanistique */}
            <div className="pt-4 border-t border-white/10">
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

            {/* Si copropriété / Lotissement / ASL */}
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

          <div className="border-t border-white/10" />

          {/* ═══════════ CONFORT & ENVIRONNEMENT ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Confort & Environnement</h2>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Exposition principale</p>
              <div className="grid md:grid-cols-5 gap-4 mt-4">
                {['Nord', 'Sud', 'Est', 'Ouest', 'Traversant'].map((option) => (
                  <label key={option} className={getOptionClass(formData.exposition === option)}><input type="radio" name="exposition" value={option} checked={formData.exposition === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
              {formData.exposition === 'Traversant' && (
                <div className="grid md:grid-cols-2 gap-4 mt-4">{['Nord / Sud', 'Est / Ouest'].map((option) => (<label key={option} className={getOptionClass(formData.expositionTraversant === option)}><input type="radio" name="expositionTraversant" value={option} checked={formData.expositionTraversant === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Vis-à-vis</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                {['Important', 'Modéré', 'Faible', 'Aucun'].map((option) => (
                  <label key={option} className={getOptionClass(formData.visAVis === option)}><input type="radio" name="visAVis" value={option} checked={formData.visAVis === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
              {formData.visAVis && formData.visAVis !== 'Aucun' && (
                <div className="grid md:grid-cols-2 gap-4 mt-4"><div><label className={labelClass} style={fontStyle}>Distance du voisin le plus proche</label><input type="text" name="distanceVisAVis" value={formData.distanceVisAVis} onChange={handleChange} placeholder="Ex: 5 mètres" className={inputClass} style={fontStyle} /></div></div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ CHARGES & DPE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Charges & DPE</h2>
            <div><p className={sectionTitleClass} style={fontStyle}>Taxe foncière</p><div className="mt-4"><label className={labelClass} style={fontStyle}>Montant annuel (€)</label><input type="text" name="taxeFonciere" value={formData.taxeFonciere} onChange={handleChange} placeholder="Ex: 1 500 €" className={inputClass} style={fontStyle} /></div></div>
            {/* Charges de copropriété */}
            <div>
              <p className={sectionTitleClass} style={fontStyle}>Charges de copropriété</p>
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Montant ANNUEL (€)</label>
                <input type="text" name="chargesCopro" value={formData.chargesCopro} onChange={handleChange} placeholder="Ex: 3 000 €" className={inputClass} style={fontStyle} />
              </div>
              <div className="mt-3">
                <label className={labelClass} style={fontStyle}>Ce qui est compris dans les charges :</label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {['Eau chaude', 'Chauffage', 'Eau froide'].map((option) => (
                    <label key={option} className={getOptionClass(formData.chargesCoproContenu.includes(option))}>
                      <input type="checkbox" checked={formData.chargesCoproContenu.includes(option)} onChange={() => handleCheckboxChange('chargesCoproContenu', option)} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* DPE */}
            <div>
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
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PROJET DE VENTE (suite) ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>

            <div className="mt-4">
              <label className={labelClass} style={fontStyle}>Message libre / Contexte juridique</label>
              <textarea name="contexteJuridiqueLibre" value={formData.contexteJuridiqueLibre} onChange={handleChange} rows={4} placeholder="Décrivez le contexte juridique de votre demande..." className={inputClass} style={fontStyle} />
            </div>

            <div><p className={sectionTitleClass} style={fontStyle}>Délai de vente souhaité</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">{['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map((option) => (<label key={option} className={getOptionClass(formData.delaiVente === option)}><input type="radio" name="delaiVente" value={option} checked={formData.delaiVente === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Situation actuelle</p>
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

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Prix envisagé</p>
              <div className="mt-4"><label className={labelClass} style={fontStyle}>Avez-vous une idée de prix ?</label><input type="text" name="prixEnvisage" value={formData.prixEnvisage} onChange={handleChange} placeholder="Ex: 350 000 €" className={inputClass} style={fontStyle} /></div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="block text-sm font-medium text-white/70 mb-4 leading-relaxed" style={fontStyle}>Si l&apos;estimation proposée diffère du prix que vous aviez en tête, dans quelle mesure seriez-vous disposé(e) à ajuster le prix ?</label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/50" style={fontStyle}>1</span>
                <input type="range" name="ajustementPrix" value={formData.ajustementPrix} onChange={handleChange} min="1" max="10" step="1" className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" />
                <span className="text-sm text-white/50" style={fontStyle}>10</span>
                {formData.ajustementPrix && (<span className="text-lg font-semibold text-white min-w-[2rem] text-center" style={fontStyle}>{formData.ajustementPrix}</span>)}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40" style={fontStyle}><span>Pas du tout</span><span>Très disposé(e)</span></div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ MESSAGE LIBRE ═══════════ */}
          <div className="space-y-4">
            <h2 className={groupTitleClass} style={fontStyle}>Message libre</h2>
            <div><label className={labelClass} style={fontStyle}>Souhaitez-vous ajouter une information importante ?</label>
              <textarea name="messageLibre" value={formData.messageLibre} onChange={handleChange} rows={5} placeholder="Toute information complémentaire utile à l'analyse de votre bien..." className={inputClass} style={fontStyle} />
            </div>
          </div>

          {/* ═══════════ VALIDATION ═══════════ */}
          {submitError && (<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">{submitError}</div>)}

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

          <button type="submit" disabled={submitting || !acceptPrivacy} className="w-full px-8 py-4 rounded-full font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1rem' }}>
            {submitting ? (uploadProgress || 'Envoi en cours...') : 'Paiement de l\'estimation'}
          </button>

        </form>
      </div>
    </main>
  )
}
