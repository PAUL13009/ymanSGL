'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createAnalyseLead, uploadEstimationPhotos } from '@/lib/firebase-admin'

export default function EstimationInvestisseurEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [formData, setFormData] = useState({
    // PROJET DE VENTE — Type de structure
    typeStructure: '',
    typeStructureAutre: '',
    // Stratégie société
    nbBiensSociete: '',
    pctActifImmobilier: '',
    besoinRedistributionTresorerie: '',
    projetAcquisitionFutur: '',
    projetAcquisitionDetail: '',
    refinancementEnvisage: '',
    objectifRefinancement: [] as string[],
    objectifRefinancementAutre: '',
    extraireTresorerieMontant: '',
    ameliorerCashflow: '',
    optimiserTauxDette: '',
    financerNouveauProjet: '',
    // Contexte
    contexte: [] as string[],
    contexteAutre: '',
    // Objectifs
    objectifs: [] as string[],
    // IDENTIFICATION DU BIEN
    adresseComplete: '',
    codePostal: '',
    ville: '',
    typeBien: '',
    typeBienAppartement: '',
    typeBienAutre: '',
    surfaceCarrez: '',
    surfaceSolTotale: '',
    etage: '',
    dernierEtage: '',
    rdc: '',
    anneeConstruction: '',
    // DESTINATION ACTUELLE
    destinationActuelle: '',
    destinationMultiplesDetail: '',
    destinationAutre: '',
    // USAGE ACTUEL
    usageActuel: '',
    usageAutre: '',
    // PHOTOS — géré par photos state
    // ÉTAT GÉNÉRAL
    etatGlobal: '',
    travauxEstimatifsCourtTerme: '',
    budgetEstimatif: '',
    // EXTÉRIEURS & ANNEXES
    exterieursAnnexes: [] as string[],
    // COPROPRIÉTÉ
    nbLots: '',
    etatPartiesCommunes: '',
    travauxVotesPrevus: '',
    travauxVotesPrevusNatureMontant: '',
    chargesAnnuelles: '',
    procedureEnCours: '',
    procedureEnCoursNature: '',
    // PERFORMANCE ÉNERGÉTIQUE
    classeDpe: '',
    classeGes: '',
    anneeDpe: '',
    chauffageIndividuelCollectif: '',
    systemeChauffage: '',
    travauxEnergetiques: '',
    travauxEnergetiquesDetail: '',
    // DONNÉES LOCATIVES
    bienLoue: '',
    loyerAnnuelHorsCharges: '',
    dateDebutBail: '',
    dateFinBail: '',
    derniereRevision: '',
    irl: '',
    encadrement: '',
    potentielAugmentation: '',
    loyerEnvisage: '',
    chargesCoproAnnuelles: '',
    chargesNonRecuperables: '',
    fraisGestionLocative: '',
    assurancePno: '',
    vacanceLocative: '',
    historiqueImpayes: '',
    // FINANCEMENT
    dateAcquisition: '',
    prixAcquisition: '',
    creditEnCours: '',
    montantInitialEmprunte: '',
    montantRestantDu: '',
    mensualiteActuelle: '',
    tauxCredit: '',
    dureeRestante: '',
    garantie: '',
    // TRAVAUX ET VALORISATION
    travauxRealises: '',
    travauxRealisesDetail: '',
    travauxNecessaires: '',
    travauxNecessairesDetail: '',
    travauxAutre: '',
    // POTENTIEL D'OPTIMISATION
    potentielOptimisation: [] as string[],
    potentielOptimisationAutre: '',
    // HYPOTHÈSE DE PROJECTION
    horizonInvestissement: '',
    // PLUS-VALUE
    prixAcquisitionActeInclus: '',
    fraisAcquisitionInitiaux: '',
    travauxImmobilises: '',
    prixVenteEnvisage: '',
    objectifPrixMinimum: '',
    dateExacteAcquisition: '',
    // TAXE FONCIÈRE
    taxeFonciereTotale: '',
    taxeFonciereRecuperable: '',
    taxeFonciereSupportee: '',
    // DÉLAI DE VENTE
    delaiVente: '',
    // FOURCHETTE DE NÉGOCIATION
    fourchetteNegociation: '',
    // ENJEU PARTICULIER
    enjeuParticulier: '',
    // AUTRES ACTIFS
    autresActifs: '',
    autresActifsDetail: ''
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  useEffect(() => {
    const etape1 = sessionStorage.getItem('estimation_investisseur_etape1')
    if (!etape1) {
      router.push('/estimation/investisseur/formulaire')
      return
    }
    setEtape1Data(JSON.parse(etape1))
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = (prev[name as keyof typeof prev] as string[]) || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [name]: newArray }
    })
  }

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newFiles = Array.from(files)
    const validFiles = newFiles.filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024)
    if (photos.length + validFiles.length > 20) {
      setSubmitError('Vous pouvez ajouter 20 photos maximum.')
      return
    }
    setPhotos(prev => [...prev, ...validFiles])
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreviews(prev => [...prev, reader.result as string])
      reader.readAsDataURL(file)
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
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
      const completeData: Record<string, any> = {
        prenom: etape1Data.prenom,
        nom: etape1Data.nom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        personne_morale: etape1Data.personnesMorale || null,
        siret: etape1Data.siret || null,

        type_structure: formData.typeStructure || null,
        type_structure_autre: formData.typeStructureAutre || null,
        nb_biens_societe: formData.nbBiensSociete || null,
        pct_actif_immobilier: formData.pctActifImmobilier || null,
        besoin_redistribution_tresorerie: formData.besoinRedistributionTresorerie || null,
        projet_acquisition_futur: formData.projetAcquisitionFutur || null,
        projet_acquisition_detail: formData.projetAcquisitionDetail || null,
        refinancement_envisage: formData.refinancementEnvisage || null,
        objectif_refinancement: formData.objectifRefinancement?.length ? formData.objectifRefinancement : null,
        objectif_refinancement_autre: formData.objectifRefinancementAutre || null,
        extraire_tresorerie_montant: formData.extraireTresorerieMontant || null,
        ameliorer_cashflow: formData.ameliorerCashflow || null,
        optimiser_taux_dette: formData.optimiserTauxDette || null,
        financer_nouveau_projet: formData.financerNouveauProjet || null,
        contexte: formData.contexte?.length ? formData.contexte : null,
        contexte_autre: formData.contexteAutre || null,
        objectifs: formData.objectifs?.length ? formData.objectifs : null,

        adresse_complete: formData.adresseComplete || null,
        code_postal: formData.codePostal || null,
        ville: formData.ville || null,
        type_bien: formData.typeBienAppartement || formData.typeBien || null,
        type_bien_autre: formData.typeBienAutre || null,
        surface_carrez: formData.surfaceCarrez || null,
        surface_sol_totale: formData.surfaceSolTotale || null,
        etage: formData.etage || null,
        dernier_etage: formData.dernierEtage || null,
        rdc: formData.rdc || null,
        annee_construction: formData.anneeConstruction || null,
        destination_actuelle: formData.destinationActuelle || null,
        destination_multiples_detail: formData.destinationMultiplesDetail || null,
        destination_autre: formData.destinationAutre || null,
        usage_actuel: formData.usageActuel || null,
        usage_autre: formData.usageAutre || null,

        etat_global: formData.etatGlobal || null,
        travaux_estimatifs_court_terme: formData.travauxEstimatifsCourtTerme || null,
        budget_estimatif: formData.budgetEstimatif || null,
        exterieurs_annexes: formData.exterieursAnnexes?.length ? formData.exterieursAnnexes : null,
        nb_lots: formData.nbLots || null,
        etat_parties_communes: formData.etatPartiesCommunes || null,
        travaux_votes_prevus: formData.travauxVotesPrevus || null,
        travaux_votes_prevus_nature_montant: formData.travauxVotesPrevusNatureMontant || null,
        charges_annuelles: formData.chargesAnnuelles || null,
        procedure_en_cours: formData.procedureEnCours || null,
        procedure_en_cours_nature: formData.procedureEnCoursNature || null,

        classe_dpe: formData.classeDpe || null,
        classe_ges: formData.classeGes || null,
        annee_dpe: formData.anneeDpe || null,
        chauffage_individuel_collectif: formData.chauffageIndividuelCollectif || null,
        systeme_chauffage: formData.systemeChauffage || null,
        travaux_energetiques: formData.travauxEnergetiques || null,
        travaux_energetiques_detail: formData.travauxEnergetiquesDetail || null,

        bien_loue: formData.bienLoue || null,
        loyer_annuel_hors_charges: formData.loyerAnnuelHorsCharges || null,
        date_debut_bail: formData.dateDebutBail || null,
        date_fin_bail: formData.dateFinBail || null,
        derniere_revision: formData.derniereRevision || null,
        irl: formData.irl || null,
        encadrement: formData.encadrement || null,
        potentiel_augmentation: formData.potentielAugmentation || null,
        loyer_envisage: formData.loyerEnvisage || null,
        charges_copro_annuelles: formData.chargesCoproAnnuelles || null,
        charges_non_recuperables: formData.chargesNonRecuperables || null,
        frais_gestion_locative: formData.fraisGestionLocative || null,
        assurance_pno: formData.assurancePno || null,
        vacance_locative: formData.vacanceLocative || null,
        historique_impayes: formData.historiqueImpayes || null,

        date_acquisition: formData.dateAcquisition || null,
        prix_acquisition: formData.prixAcquisition || null,
        credit_en_cours: formData.creditEnCours || null,
        montant_initial_emprunte: formData.montantInitialEmprunte || null,
        montant_restant_du: formData.montantRestantDu || null,
        mensualite_actuelle: formData.mensualiteActuelle || null,
        taux_credit: formData.tauxCredit || null,
        duree_restante: formData.dureeRestante || null,
        garantie: formData.garantie || null,

        travaux_realises: formData.travauxRealises || null,
        travaux_realises_detail: formData.travauxRealisesDetail || null,
        travaux_necessaires: formData.travauxNecessaires || null,
        travaux_necessaires_detail: formData.travauxNecessairesDetail || null,
        travaux_autre: formData.travauxAutre || null,
        potentiel_optimisation: formData.potentielOptimisation?.length ? formData.potentielOptimisation : null,
        potentiel_optimisation_autre: formData.potentielOptimisationAutre || null,
        horizon_investissement: formData.horizonInvestissement || null,

        prix_acquisition_acte_inclus: formData.prixAcquisitionActeInclus || null,
        frais_acquisition_initiaux: formData.fraisAcquisitionInitiaux || null,
        travaux_immobilises: formData.travauxImmobilises || null,
        prix_vente_envisage: formData.prixVenteEnvisage || null,
        objectif_prix_minimum: formData.objectifPrixMinimum || null,
        date_exacte_acquisition: formData.dateExacteAcquisition || null,

        taxe_fonciere_totale: formData.taxeFonciereTotale || null,
        taxe_fonciere_recuperable: formData.taxeFonciereRecuperable || null,
        taxe_fonciere_supportee: formData.taxeFonciereSupportee || null,

        delai_vente: formData.delaiVente || null,
        fourchette_negociation: formData.fourchetteNegociation ? parseInt(formData.fourchetteNegociation) : null,
        enjeu_particulier: formData.enjeuParticulier || null,
        autres_actifs: formData.autresActifs || null,
        autres_actifs_detail: formData.autresActifsDetail || null,

        type_demande: 'estimation_investisseur',
        maturite: 'estimation_investisseur',
        ajustement_prix: 'oui',
        motivation: `Estimation investisseur — ${formData.enjeuParticulier || 'Demande d\'estimation immobilière.'}`,
        status: 'nouveau'
      }

      const requiredFields = ['prenom', 'telephone', 'email']
      const missingFields = requiredFields.filter(field => !completeData[field])
      if (missingFields.length > 0) {
        setSubmitError(`Champs obligatoires manquants: ${missingFields.join(', ')}`)
        setSubmitting(false)
        return
      }

      let photoUrls: string[] = []
      if (photos.length > 0) {
        const tempId = `temp_${Date.now()}`
        setUploadProgress(`Upload des photos (0/${photos.length})...`)
        photoUrls = await uploadEstimationPhotos(photos, tempId, (uploaded, total) => {
          setUploadProgress(`Upload des photos (${uploaded}/${total})...`)
        })
      }
      if (photoUrls.length > 0) completeData.photos_urls = photoUrls

      setUploadProgress('Enregistrement des données...')
      await createAnalyseLead(completeData)

      sessionStorage.removeItem('estimation_investisseur_etape1')
      window.location.href = 'https://buy.stripe.com/14A6oH9ho7841yd05leQM02'
    } catch (error: any) {
      console.error('Erreur:', error)
      setSubmitError(error.message || 'Une erreur est survenue. Veuillez réessayer.')
      setSubmitting(false)
    }
  }

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

          {/* ═══════════ PROJET DE VENTE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Type de structure</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['SCI à IR', 'SCI à IS', 'Foncière', 'Holding', 'SAS / SARL', 'Marchand de biens', 'Autres à préciser'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.typeStructure === opt)}>
                    <input type="radio" name="typeStructure" value={opt} checked={formData.typeStructure === opt} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
              {formData.typeStructure === 'Autres à préciser' && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Précisez</label>
                  <input type="text" name="typeStructureAutre" value={formData.typeStructureAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Stratégie société</p>
              <div className="space-y-4 mt-4">
                <div>
                  <label className={labelClass} style={fontStyle}>Nombre total de biens détenus par la société ?</label>
                  <input type="text" name="nbBiensSociete" value={formData.nbBiensSociete} onChange={handleChange} placeholder="Ex: 5" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Ce bien représente environ % de l&apos;actif immobilier</label>
                  <input type="text" name="pctActifImmobilier" value={formData.pctActifImmobilier} onChange={handleChange} placeholder="Ex: 25" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Besoin de redistribution de trésorerie ?</label>
                  <input type="text" name="besoinRedistributionTresorerie" value={formData.besoinRedistributionTresorerie} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Projet d&apos;acquisition futur ?</label>
                  <div className="flex gap-4 mt-2 mb-2">
                    {['Oui', 'Non'].map((v) => (
                      <label key={v} className={getOptionClass(formData.projetAcquisitionFutur === v)}>
                        <input type="radio" name="projetAcquisitionFutur" value={v} checked={formData.projetAcquisitionFutur === v} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{v}</span>
                      </label>
                    ))}
                  </div>
                  {formData.projetAcquisitionFutur === 'Oui' && (
                    <input type="text" name="projetAcquisitionDetail" value={formData.projetAcquisitionDetail} onChange={handleChange} placeholder="Si oui, lequel ?" className={inputClass} style={fontStyle} />
                  )}
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Refinancement envisagé ?</label>
                  <div className="flex gap-4 mt-2">
                    {['Oui', 'Non', 'À étudier'].map((v) => (
                      <label key={v} className={getOptionClass(formData.refinancementEnvisage === v)}>
                        <input type="radio" name="refinancementEnvisage" value={v} checked={formData.refinancementEnvisage === v} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.refinancementEnvisage === 'Oui' && (
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <p className={sectionTitleClass} style={fontStyle}>Objectif recherché</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {['Extraire de la trésorerie', 'Améliorer le cash-flow', 'Optimiser le taux / structure de la dette', 'Financer un nouveau projet', 'Autre à préciser'].map((opt) => (
                        <label key={opt} className={getOptionClass(formData.objectifRefinancement.includes(opt))}>
                          <input type="checkbox" checked={formData.objectifRefinancement.includes(opt)} onChange={() => handleCheckboxChange('objectifRefinancement', opt)} className="mr-2 accent-white" />
                          <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {formData.objectifRefinancement.includes('Extraire de la trésorerie') && (
                      <div>
                        <label className={labelClass} style={fontStyle}>Montant à extraire (€)</label>
                        <input type="text" name="extraireTresorerieMontant" value={formData.extraireTresorerieMontant} onChange={handleChange} placeholder="Ex: 50 000" className={inputClass} style={fontStyle} />
                      </div>
                    )}
                    {formData.objectifRefinancement.includes('Autre à préciser') && (
                      <input type="text" name="objectifRefinancementAutre" value={formData.objectifRefinancementAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Contexte</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['Audit préalable à acquisition', 'Apport en société', 'Restructuration d\'actif (Baisse de rentabilité / mauvaise gestion)', 'Travaux importants à venir', 'Autre à préciser'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.contexte.includes(opt))}>
                    <input type="checkbox" checked={formData.contexte.includes(opt)} onChange={() => handleCheckboxChange('contexte', opt)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
              {formData.contexte.includes('Autre à préciser') && (
                <div className="mt-4">
                  <input type="text" name="contexteAutre" value={formData.contexteAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Objectifs (plusieurs choix possibles)</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['Arbitrage patrimonial', 'Sécurisation patrimoniale', 'Optimisation fiscale via PV uniquement', 'Besoin de liquidité', 'Valorisation avant cession', 'Rendement maximum', 'Valorisation long terme'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.objectifs.includes(opt))}>
                    <input type="checkbox" checked={formData.objectifs.includes(opt)} onChange={() => handleCheckboxChange('objectifs', opt)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ IDENTIFICATION DU BIEN ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Identification du bien</h2>

            <div>
              <label className={labelClass} style={fontStyle}>Adresse complète</label>
              <input type="text" name="adresseComplete" value={formData.adresseComplete} onChange={handleChange} placeholder="Ex: 12 rue de la Paix" className={inputClass} style={fontStyle} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>Code postal</label>
                <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} placeholder="Ex: 78100" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Ville</label>
                <input type="text" name="ville" value={formData.ville} onChange={handleChange} placeholder="Ex: Saint-Germain-en-Laye" className={inputClass} style={fontStyle} />
              </div>
            </div>

            <div>
              <label className={labelClass} style={fontStyle}>Type de bien</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {['Appartement', 'Maison', 'Immeuble de rapport (mono-propriété)', 'Local commercial', 'Local professionnel / Bureaux', 'Entrepôt / Stockage', 'Autre à préciser'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.typeBien === opt)}>
                    <input type="radio" name="typeBien" value={opt} checked={formData.typeBien === opt} onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, typeBienAppartement: '' })); }} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
              {formData.typeBien === 'Appartement' && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Sous-type</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {['Studio / T1', 'T2', 'T3', 'T4 et +'].map((opt) => (
                      <label key={opt} className={getOptionClass(formData.typeBienAppartement === opt)}>
                        <input type="radio" name="typeBienAppartement" value={opt} checked={formData.typeBienAppartement === opt} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {formData.typeBien === 'Autre à préciser' && (
                <div className="mt-4">
                  <input type="text" name="typeBienAutre" value={formData.typeBienAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(formData.typeBien === 'Appartement' || formData.typeBien === 'Immeuble de rapport (mono-propriété)') && (
                <div>
                  <label className={labelClass} style={fontStyle}>Surface Loi Carrez (m²)</label>
                  <input type="text" name="surfaceCarrez" value={formData.surfaceCarrez} onChange={handleChange} placeholder="Ex: 75" className={inputClass} style={fontStyle} />
                </div>
              )}
              <div>
                <label className={labelClass} style={fontStyle}>Surface au sol total si différente (m²)</label>
                <input type="text" name="surfaceSolTotale" value={formData.surfaceSolTotale} onChange={handleChange} placeholder="Ex: 80" className={inputClass} style={fontStyle} />
              </div>
            </div>

            <div>
              <label className={labelClass} style={fontStyle}>Étage / Dernier étage / RDC</label>
              <div className="flex flex-wrap gap-3 mt-2">
                <input type="text" name="etage" value={formData.etage} onChange={handleChange} placeholder="Étage" className="w-24 px-3 py-2 border border-white/20 rounded-lg bg-white/5 text-white" style={fontStyle} />
                {['Dernier étage', 'RDC'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData[opt === 'Dernier étage' ? 'dernierEtage' : 'rdc'] === 'oui')}>
                    <input type="checkbox" checked={formData[opt === 'Dernier étage' ? 'dernierEtage' : 'rdc'] === 'oui'} onChange={(e) => setFormData(prev => ({ ...prev, [opt === 'Dernier étage' ? 'dernierEtage' : 'rdc']: e.target.checked ? 'oui' : '' }))} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass} style={fontStyle}>Année de construction</label>
              <input type="text" name="anneeConstruction" value={formData.anneeConstruction} onChange={handleChange} placeholder="Ex: 1985" className={inputClass} style={fontStyle} />
            </div>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Destination actuelle</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['Habitation', 'Commerce et activité de service', 'Bureaux', 'Entrepôt / Stockage', 'Agricole', 'Destinations Multiples', 'Je ne sais pas', 'Autres à préciser'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.destinationActuelle === opt)}>
                    <input type="radio" name="destinationActuelle" value={opt} checked={formData.destinationActuelle === opt} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
              {formData.destinationActuelle === 'Destinations Multiples' && (
                <div className="mt-4">
                  <label className={labelClass} style={fontStyle}>Précisez</label>
                  <input type="text" name="destinationMultiplesDetail" value={formData.destinationMultiplesDetail} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              )}
              {formData.destinationActuelle === 'Autres à préciser' && (
                <div className="mt-4">
                  <input type="text" name="destinationAutre" value={formData.destinationAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>

            <div>
              <p className={sectionTitleClass} style={fontStyle}>Usage actuel</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['Location nue (Résidence principale du locataire)', 'Location meublée longue durée', 'Location saisonnière / courte durée', 'Local occupé par exploitant', 'Colocation', 'Bail mobilité', 'Bail commercial (3/6/9)', 'Bail professionnel', 'Activité exploitée par commerçant / société', 'Occupé à titre gratuit', 'Vacant', 'Autre à préciser'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.usageActuel === opt)}>
                    <input type="radio" name="usageActuel" value={opt} checked={formData.usageActuel === opt} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
              {formData.usageActuel === 'Autre à préciser' && (
                <div className="mt-4">
                  <input type="text" name="usageAutre" value={formData.usageAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PHOTOS DU BIEN ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Photos du bien</h2>
            <p className="text-white/60 text-sm -mt-2" style={fontStyle}>
              Ajoutez jusqu&apos;à 20 photos. Formats : JPG, PNG, WEBP (max 10 Mo par photo).
            </p>
            <div
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all"
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
              <svg className="w-10 h-10 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-white/60 text-sm" style={fontStyle}>Cliquez pour ajouter des photos</p>
              {photos.length > 0 && <p className="text-white/40 text-xs mt-1" style={fontStyle}>{photos.length} photo(s)</p>}
            </div>
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                    <Image src={preview} alt={`Photo ${index + 1}`} fill className="object-cover" />
                    <button type="button" onClick={() => handlePhotoRemove(index)} className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/70 text-[10px] text-center py-0.5" style={fontStyle}>{index + 1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ ÉTAT GÉNÉRAL ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>État général</h2>
            <div>
              <label className={labelClass} style={fontStyle}>État global du bien</label>
              <div className="flex gap-4 mt-2">
                {['Bon état', 'À rafraîchir', 'À rénover'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.etatGlobal === opt)}>
                    <input type="radio" name="etatGlobal" value={opt} checked={formData.etatGlobal === opt} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Travaux estimatifs à court terme ?</label>
              <input type="text" name="travauxEstimatifsCourtTerme" value={formData.travauxEstimatifsCourtTerme} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Budget estimatif si connu (€)</label>
              <input type="text" name="budgetEstimatif" value={formData.budgetEstimatif} onChange={handleChange} placeholder="Ex: 15 000" className={inputClass} style={fontStyle} />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ EXTÉRIEURS & ANNEXES ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Extérieurs & annexes</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {['Balcon / Terrasse / Jardin', 'Cave', 'Parking / Box'].map((opt) => (
                <label key={opt} className={getOptionClass(formData.exterieursAnnexes.includes(opt))}>
                  <input type="checkbox" checked={formData.exterieursAnnexes.includes(opt)} onChange={() => handleCheckboxChange('exterieursAnnexes', opt)} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ COPROPRIÉTÉ ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Copropriété (si applicable)</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Nombre de lots</label>
              <input type="text" name="nbLots" value={formData.nbLots} onChange={handleChange} placeholder="Ex: 24" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>État des parties communes</label>
              <input type="text" name="etatPartiesCommunes" value={formData.etatPartiesCommunes} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Travaux votés ou prévus ?</label>
              <textarea name="travauxVotesPrevus" value={formData.travauxVotesPrevus} onChange={handleChange} placeholder="Si oui, nature et montant" rows={2} className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Charges annuelles (€)</label>
              <input type="text" name="chargesAnnuelles" value={formData.chargesAnnuelles} onChange={handleChange} placeholder="Ex: 2 000" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Procédure en cours ?</label>
              <div className="flex gap-4 mt-2 mb-2">
                {['Oui', 'Non'].map((v) => (
                  <label key={v} className={getOptionClass(formData.procedureEnCours === v)}>
                    <input type="radio" name="procedureEnCours" value={v} checked={formData.procedureEnCours === v} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{v}</span>
                  </label>
                ))}
              </div>
              {formData.procedureEnCours === 'Oui' && (
                <input type="text" name="procedureEnCoursNature" value={formData.procedureEnCoursNature} onChange={handleChange} placeholder="Si oui, nature" className={inputClass} style={fontStyle} />
              )}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PERFORMANCE ÉNERGÉTIQUE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Performance énergétique</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>Classe DPE</label>
                <select name="classeDpe" value={formData.classeDpe} onChange={handleChange} className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black">Sélectionnez...</option>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((c) => <option key={c} value={c} className="bg-black">{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Classe GES</label>
                <select name="classeGes" value={formData.classeGes} onChange={handleChange} className={selectClass} style={fontStyle}>
                  <option value="" className="bg-black">Sélectionnez...</option>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((c) => <option key={c} value={c} className="bg-black">{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Année du DPE</label>
              <input type="text" name="anneeDpe" value={formData.anneeDpe} onChange={handleChange} placeholder="Ex: 2023" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Chauffage individuel ou collectif ?</label>
              <div className="flex gap-4 mt-2">
                {['Individuel', 'Collectif'].map((v) => (
                  <label key={v} className={getOptionClass(formData.chauffageIndividuelCollectif === v)}>
                    <input type="radio" name="chauffageIndividuelCollectif" value={v} checked={formData.chauffageIndividuelCollectif === v} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Système chauffage</label>
              <input type="text" name="systemeChauffage" value={formData.systemeChauffage} onChange={handleChange} placeholder="Ex: Gaz, électrique..." className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Travaux énergétiques réalisés ou à prévoir ?</label>
              <textarea name="travauxEnergetiquesDetail" value={formData.travauxEnergetiquesDetail} onChange={handleChange} placeholder="Si oui : montant, nature, date (Isolation, Fenêtres, Système de chauffage, Ventilation)" rows={3} className={inputClass} style={fontStyle} />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ DONNÉES LOCATIVES ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Données locatives</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Le bien est-il actuellement loué ?</label>
              <div className="flex gap-4 mt-2">
                {['Oui', 'Non'].map((v) => (
                  <label key={v} className={getOptionClass(formData.bienLoue === v)}>
                    <input type="radio" name="bienLoue" value={v} checked={formData.bienLoue === v} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.bienLoue === 'Oui' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <label className={labelClass} style={fontStyle}>Loyer annuel hors charges (€)</label>
                  <input type="text" name="loyerAnnuelHorsCharges" value={formData.loyerAnnuelHorsCharges} onChange={handleChange} placeholder="Ex: 12 000" className={inputClass} style={fontStyle} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Date début bail</label>
                    <input type="text" name="dateDebutBail" value={formData.dateDebutBail} onChange={handleChange} placeholder="Ex: 01/01/2022" className={inputClass} style={fontStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={fontStyle}>Date fin bail</label>
                    <input type="text" name="dateFinBail" value={formData.dateFinBail} onChange={handleChange} placeholder="Ex: 31/12/2027" className={inputClass} style={fontStyle} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Dernière révision</label>
                  <input type="text" name="derniereRevision" value={formData.derniereRevision} onChange={handleChange} placeholder="Ex: 01/01/2024" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>IRL</label>
                  <input type="text" name="irl" value={formData.irl} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Encadrement</label>
                  <input type="text" name="encadrement" value={formData.encadrement} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Potentiel augmentation</label>
                  <input type="text" name="potentielAugmentation" value={formData.potentielAugmentation} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              </div>
            )}

            {formData.bienLoue === 'Non' && (
              <div className="pt-4 border-t border-white/10">
                <label className={labelClass} style={fontStyle}>Loyer annuel hors charges envisagé (€)</label>
                <input type="text" name="loyerEnvisage" value={formData.loyerEnvisage} onChange={handleChange} placeholder="Ex: 12 000" className={inputClass} style={fontStyle} />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>Charges de copropriété annuelles (€)</label>
                <input type="text" name="chargesCoproAnnuelles" value={formData.chargesCoproAnnuelles} onChange={handleChange} placeholder="Ex: 2 000" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Charges non récupérables annuelles (€)</label>
                <input type="text" name="chargesNonRecuperables" value={formData.chargesNonRecuperables} onChange={handleChange} placeholder="Ex: 500" className={inputClass} style={fontStyle} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Frais de gestion locative (si applicable)</label>
              <input type="text" name="fraisGestionLocative" value={formData.fraisGestionLocative} onChange={handleChange} placeholder="Ex: 8%" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Assurance propriétaire non occupant (€)</label>
              <input type="text" name="assurancePno" value={formData.assurancePno} onChange={handleChange} placeholder="Ex: 200" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Vacance locative estimée (mois/an ou %)</label>
              <input type="text" name="vacanceLocative" value={formData.vacanceLocative} onChange={handleChange} placeholder="Ex: 1 mois/an ou 8%" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Historique d&apos;impayés ?</label>
              <div className="flex gap-4 mt-2">
                {['Oui', 'Non'].map((v) => (
                  <label key={v} className={getOptionClass(formData.historiqueImpayes === v)}>
                    <input type="radio" name="historiqueImpayes" value={v} checked={formData.historiqueImpayes === v} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{v}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ FINANCEMENT ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Financement</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>Date d&apos;acquisition</label>
                <input type="text" name="dateAcquisition" value={formData.dateAcquisition} onChange={handleChange} placeholder="Ex: 15/03/2018" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Prix d&apos;acquisition (€)</label>
                <input type="text" name="prixAcquisition" value={formData.prixAcquisition} onChange={handleChange} placeholder="Ex: 250 000" className={inputClass} style={fontStyle} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Crédit en cours ?</label>
              <div className="flex gap-4 mt-2">
                {['Oui', 'Non'].map((v) => (
                  <label key={v} className={getOptionClass(formData.creditEnCours === v)}>
                    <input type="radio" name="creditEnCours" value={v} checked={formData.creditEnCours === v} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{v}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.creditEnCours === 'Oui' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <label className={labelClass} style={fontStyle}>Montant initial emprunté (€)</label>
                  <input type="text" name="montantInitialEmprunte" value={formData.montantInitialEmprunte} onChange={handleChange} placeholder="Ex: 200 000" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Montant restant dû (€)</label>
                  <input type="text" name="montantRestantDu" value={formData.montantRestantDu} onChange={handleChange} placeholder="Ex: 150 000" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Mensualité actuelle (€)</label>
                  <input type="text" name="mensualiteActuelle" value={formData.mensualiteActuelle} onChange={handleChange} placeholder="Ex: 1 200" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Taux du crédit (%)</label>
                  <input type="text" name="tauxCredit" value={formData.tauxCredit} onChange={handleChange} placeholder="Ex: 2.5" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Durée restante</label>
                  <input type="text" name="dureeRestante" value={formData.dureeRestante} onChange={handleChange} placeholder="Ex: 15 ans" className={inputClass} style={fontStyle} />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Garantie (hypothèque / caution)</label>
                  <input type="text" name="garantie" value={formData.garantie} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ TRAVAUX ET VALORISATION ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Travaux et valorisation</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Travaux réalisés ? (nature / date / montant)</label>
              <textarea name="travauxRealisesDetail" value={formData.travauxRealisesDetail} onChange={handleChange} placeholder="Si oui, nature, date, montant" rows={2} className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Travaux nécessaires avant vente ?</label>
              <textarea name="travauxNecessairesDetail" value={formData.travauxNecessairesDetail} onChange={handleChange} placeholder="Si oui, nature, montant estimé" rows={2} className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Autres à préciser / Je ne sais pas</label>
              <input type="text" name="travauxAutre" value={formData.travauxAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ POTENTIEL D'OPTIMISATION ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Potentiel d&apos;optimisation</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Amélioration rendement (colocation, meublé, division…)', 'Changement d\'usage', 'Revente à la découpe', 'Revalorisation par travaux', 'Surélévation / Extension', 'Je ne sais pas', 'Autre à préciser'].map((opt) => (
                <label key={opt} className={getOptionClass(formData.potentielOptimisation.includes(opt))}>
                  <input type="checkbox" checked={formData.potentielOptimisation.includes(opt)} onChange={() => handleCheckboxChange('potentielOptimisation', opt)} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                </label>
              ))}
            </div>
            {formData.potentielOptimisation.includes('Autre à préciser') && (
              <div className="mt-4">
                <input type="text" name="potentielOptimisationAutre" value={formData.potentielOptimisationAutre} onChange={handleChange} placeholder="Précisez..." className={inputClass} style={fontStyle} />
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ HYPOTHÈSE DE PROJECTION ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Hypothèse de projection</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Horizon d&apos;investissement souhaité ?</label>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {['5 ans', '10 ans', '15 ans', '+15 ans', 'Je ne sais pas'].map((opt) => (
                  <label key={opt} className={getOptionClass(formData.horizonInvestissement === opt)}>
                    <input type="radio" name="horizonInvestissement" value={opt} checked={formData.horizonInvestissement === opt} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PLUS-VALUE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Plus-value (Optimisation fiscale via PV uniquement)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={fontStyle}>Prix d&apos;acquisition acte inclus (€)</label>
                <input type="text" name="prixAcquisitionActeInclus" value={formData.prixAcquisitionActeInclus} onChange={handleChange} placeholder="Ex: 255 000" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Frais d&apos;acquisition initiaux (€)</label>
                <input type="text" name="fraisAcquisitionInitiaux" value={formData.fraisAcquisitionInitiaux} onChange={handleChange} placeholder="Ex: 15 000" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Travaux immobilisés (€)</label>
                <input type="text" name="travauxImmobilises" value={formData.travauxImmobilises} onChange={handleChange} placeholder="Ex: 20 000" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Prix de vente envisagé (€)</label>
                <input type="text" name="prixVenteEnvisage" value={formData.prixVenteEnvisage} onChange={handleChange} placeholder="Ex: 350 000" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Objectif de prix minimum (€)</label>
                <input type="text" name="objectifPrixMinimum" value={formData.objectifPrixMinimum} onChange={handleChange} placeholder="Ex: 320 000" className={inputClass} style={fontStyle} />
              </div>
              <div>
                <label className={labelClass} style={fontStyle}>Date exacte d&apos;acquisition</label>
                <input type="text" name="dateExacteAcquisition" value={formData.dateExacteAcquisition} onChange={handleChange} placeholder="Ex: 15/03/2018" className={inputClass} style={fontStyle} />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ TAXE FONCIÈRE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Taxe foncière annuelle (€)</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Montant total</label>
              <input type="text" name="taxeFonciereTotale" value={formData.taxeFonciereTotale} onChange={handleChange} placeholder="Ex: 1 500" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Part récupérable (si applicable)</label>
              <input type="text" name="taxeFonciereRecuperable" value={formData.taxeFonciereRecuperable} onChange={handleChange} placeholder="Ex: 800" className={inputClass} style={fontStyle} />
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Part réellement supportée par la société</label>
              <input type="text" name="taxeFonciereSupportee" value={formData.taxeFonciereSupportee} onChange={handleChange} placeholder="Ex: 700" className={inputClass} style={fontStyle} />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ DÉLAI DE VENTE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Délai de vente</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map((opt) => (
                <label key={opt} className={getOptionClass(formData.delaiVente === opt)}>
                  <input type="radio" name="delaiVente" value={opt} checked={formData.delaiVente === opt} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ FOURCHETTE DE NÉGOCIATION ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Fourchette de négociation</h2>
            <label className="block text-sm font-medium text-white/70 mb-4 leading-relaxed" style={fontStyle}>
              Échelle de 1 à 10 — Dans quelle mesure seriez-vous disposé à ajuster le prix ?
            </label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/50" style={fontStyle}>1</span>
              <input
                type="range"
                name="fourchetteNegociation"
                value={formData.fourchetteNegociation}
                onChange={handleChange}
                min="1"
                max="10"
                step="1"
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-sm text-white/50" style={fontStyle}>10</span>
              {formData.fourchetteNegociation && (
                <span className="text-lg font-semibold text-white min-w-[2rem] text-center" style={fontStyle}>{formData.fourchetteNegociation}</span>
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40" style={fontStyle}>
              <span>Pas du tout</span>
              <span>Très disposé(e)</span>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ ENJEU PARTICULIER ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Enjeu particulier</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Y a-t-il un enjeu particulier que vous souhaitez voir intégré à l&apos;analyse ?</label>
              <textarea
                name="enjeuParticulier"
                value={formData.enjeuParticulier}
                onChange={handleChange}
                rows={5}
                placeholder="Zone libre..."
                className={inputClass}
                style={fontStyle}
              />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ AUTRES ACTIFS IMMOBILIERS ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Autres actifs immobiliers</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Disposez-vous d&apos;autres biens immobiliers que vous souhaiteriez intégrer à une analyse stratégique globale ?</label>
              <div className="flex gap-4 mt-2 mb-4">
                {['Oui', 'Non'].map((v) => (
                  <label key={v} className={getOptionClass(formData.autresActifs === v)}>
                    <input type="radio" name="autresActifs" value={v} checked={formData.autresActifs === v} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{v}</span>
                  </label>
                ))}
              </div>
              {formData.autresActifs === 'Oui' && (
                <textarea name="autresActifsDetail" value={formData.autresActifsDetail} onChange={handleChange} placeholder="Si oui, précisez brièvement..." rows={3} className={inputClass} style={fontStyle} />
              )}
            </div>
          </div>

          {/* ═══════════ VALIDATION ═══════════ */}
          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
              {submitError}
            </div>
          )}

          <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/70 leading-relaxed" style={fontStyle}>
              Les informations collectées via ce formulaire sont destinées à traiter votre demande d&apos;estimation. Elles sont conservées pendant une durée maximale de 5 ans et ne sont pas cédées à des tiers. Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, rectification ou suppression. Contact : lagenceyl@gmail.com.
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 accent-white" />
              <span className="text-sm text-white/90" style={fontStyle}>J&apos;accepte la politique de confidentialité</span>
            </label>
          </div>

          <p className="text-white/50 text-sm text-center mb-4" style={fontStyle}>
            Méthode par comparaison et capitalisation
          </p>

          <button
            type="submit"
            disabled={submitting || !acceptPrivacy}
            className="w-full px-8 py-4 rounded-full font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1rem' }}
          >
            {submitting ? (uploadProgress || 'Envoi en cours...') : 'Paiement de l\'estimation'}
          </button>
        </form>
      </div>
    </main>
  )
}
