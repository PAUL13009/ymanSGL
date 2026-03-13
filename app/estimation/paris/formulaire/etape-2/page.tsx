'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createAnalyseLead, uploadEstimationPhotos } from '@/lib/firebase-admin'

const CODES_POSTAUX_PARIS = Array.from({ length: 20 }, (_, i) => `750${String(i + 1).padStart(2, '0')}`)

const APPARTEMENT_SOUS_CATEGORIES = ['Studio / type 1', 'T2', 'T3', 'T4', 'T5 et +', 'Duplex / Triplex', 'Atelier / Loft', 'Penthouse', 'Chambre de service', 'Autre à préciser']

const MAISON_SOUS_CATEGORIES = ['Maison avec cour ou jardin', 'Maison de ville / bourgeoise', 'Hôtel particulier', 'Autre à préciser']

const STATUT_ACTUEL = ['Résidence principale', 'Résidence secondaire', 'Loué', 'Occupé par un proche', 'Autre (à préciser)']

const TYPE_IMMEUBLE_OPTIONS = ['Haussmannien', 'Ancien — avant 1948', 'Ancien — 1948–1970', 'Récent — 1970–2000', 'Récent — 2000+']

const STANDING_OPTIONS = ['Standard', 'Bon standing', 'Haut standing', 'Luxe']

const VUE_OPTIONS = ['Complètement dégagée', 'Partiellement dégagée', 'Rue', 'Cour', 'Jardin', 'Monument, Bâtiments remarquables', 'Immeuble en vis-à-vis', 'Toits de Paris', 'Aucune vue particulière']

const EXTERIEURS_OPTIONS = ['Balcon', 'Balcon filant', 'Terrasse', 'Rooftop', 'Jardin privatif', 'Aucun extérieur']

const ANNEXES_OPTIONS = ['Cave', 'Box', 'Parking privé', 'Local vélo', 'Chambre de service']

const OBJECTIF_OPTIONS = ['Estimation pour mise en vente', 'Analyse patrimoniale', 'Estimation locative', 'Arbitrage patrimonial', 'Autre']

const DOCUMENTS_OPTIONS = ['Diagnostics techniques', 'Titre de propriété', 'Plans', 'Règlement de copropriété', 'Dernier PV d\'AG', 'Taxe foncière']

export default function EstimationParisEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [formData, setFormData] = useState({
    adresseComplete: '',
    codePostal: '',
    typeBien: '',
    typeBienSousCategorie: '',
    typeBienAutre: '',
    surfaceHabitable: '',
    surfaceSolTotale: '',
    anneeConstruction: '',
    statutActuel: '',
    statutActuelAutre: '',
    typeBail: '',
    loyerMensuelHorsCharges: '',
    dateDebutBail: '',
    dateFinBail: '',
    surfaceCarrez: '',
    etageBien: '',
    etageSur: '',
    dernierEtage: '',
    ascenseur: '',
    typeImmeuble: '',
    standingImmeuble: '',
    nbLots: '',
    chargesAnnuelles: '',
    commercesRdc: '',
    commercesNature: '',
    travauxPrevus: '',
    travauxPrevusNature: '',
    ravalementFacade: '',
    ravalementToiture: '',
    procedureEnCours: '',
    etatPartiesCommunes: '',
    gardien: '',
    servitudes: [] as string[],
    nombrePieces: '',
    nombreChambres: '',
    nombreSallesDEau: '',
    nombreSallesDeBain: '',
    wcSepares: '',
    luminosite: '5',
    etatGeneral: '',
    travauxEffectues: '',
    travauxPrevusDetail: '',
    autorisationUrbanisme: '',
    etatMurs: '',
    etatSols: '',
    etatPlafonds: '',
    etatMenuiserie: '',
    niveauBien: '',
    materiauxFinitions: '',
    cuisine: '',
    electromenager: '',
    equipementsInterieur: [] as string[],
    hauteurPlafond: '',
    distributionLogement: '',
    exposition: '',
    expositionTraversant: '',
    visAVis: '',
    vue: [] as string[],
    exterieurs: [] as string[],
    annexes: [] as string[],
    encadrementLoyers: '',
    locationTouristique: '',
    changementUsage: '',
    residenceSecondaire: '',
    protectionImmeuble: '',
    prixAcquisition: '',
    dateAcquisition: '',
    taxeFonciere: '',
    objectifDemande: '',
    objectifDemandeAutre: '',
    documentsDisponibles: [] as string[],
    atoutPrincipal: '',
    elementNegatif: '',
    delaiVente: '',
    prixEnvisage: '',
    fourchetteNegociation: '',
    informationsComplementaires: ''
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  useEffect(() => {
    const etape1 = sessionStorage.getItem('estimation_paris_etape1')
    if (!etape1) {
      router.push('/estimation/paris/formulaire')
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
      const arr = (prev[name as keyof typeof prev] as string[]) || []
      const newArr = arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value]
      return { ...prev, [name]: newArr }
    })
  }

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const valid = Array.from(files).filter(f => f.type.startsWith('image/') && f.size <= 10 * 1024 * 1024)
    if (photos.length + valid.length > 20) {
      setSubmitError('Maximum 20 photos.')
      return
    }
    setPhotos(prev => [...prev, ...valid])
    valid.forEach(f => {
      const r = new FileReader()
      r.onloadend = () => setPhotoPreviews(prev => [...prev, r.result as string])
      r.readAsDataURL(f)
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePhotoRemove = (i: number) => {
    setPhotos(prev => prev.filter((_, idx) => idx !== i))
    setPhotoPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    if (formData.typeBien === 'Appartement' && !formData.surfaceCarrez) {
      setSubmitError('La surface Loi Carrez est obligatoire pour un appartement.')
      setSubmitting(false)
      return
    }

    try {
      const d: Record<string, any> = {
        civilite: etape1Data.civilite || null,
        prenom: etape1Data.prenom,
        nom: etape1Data.nom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        adresse_complete: formData.adresseComplete || null,
        code_postal: formData.codePostal || null,
        type_bien: formData.typeBienSousCategorie || formData.typeBien || null,
        type_bien_autre: formData.typeBienAutre || null,
        surface_habitable: formData.surfaceHabitable || null,
        surface_sol_totale: formData.surfaceSolTotale || null,
        annee_construction: formData.anneeConstruction || null,
        statut_actuel: formData.statutActuel || null,
        statut_actuel_autre: formData.statutActuelAutre || null,
        type_bail: formData.typeBail || null,
        loyer_mensuel_hors_charges: formData.loyerMensuelHorsCharges || null,
        date_debut_bail: formData.dateDebutBail || null,
        date_fin_bail: formData.dateFinBail || null,
        surface_carrez: formData.surfaceCarrez || null,
        etage_bien: formData.etageBien || null,
        etage_sur: formData.etageSur || null,
        dernier_etage: formData.dernierEtage || null,
        ascenseur: formData.ascenseur || null,
        type_immeuble: formData.typeImmeuble || null,
        standing_immeuble: formData.standingImmeuble || null,
        nb_lots: formData.nbLots || null,
        charges_annuelles: formData.chargesAnnuelles || null,
        commerces_rdc: formData.commercesRdc || null,
        commerces_nature: formData.commercesNature || null,
        travaux_prevus: formData.travauxPrevus || null,
        travaux_prevus_nature: formData.travauxPrevusNature || null,
        ravalement_facade: formData.ravalementFacade || null,
        ravalement_toiture: formData.ravalementToiture || null,
        procedure_en_cours: formData.procedureEnCours || null,
        etat_parties_communes: formData.etatPartiesCommunes || null,
        gardien: formData.gardien || null,
        servitudes: formData.servitudes?.length ? formData.servitudes : null,
        nombre_pieces: formData.nombrePieces || null,
        nombre_chambres: formData.nombreChambres || null,
        nombre_salles_d_eau: formData.nombreSallesDEau || null,
        nombre_salles_de_bain: formData.nombreSallesDeBain || null,
        wc_separes: formData.wcSepares || null,
        luminosite: formData.luminosite ? parseInt(formData.luminosite) : null,
        etat_general: formData.etatGeneral || null,
        travaux_effectues: formData.travauxEffectues || null,
        travaux_prevus_detail: formData.travauxPrevusDetail || null,
        autorisation_urbanisme: formData.autorisationUrbanisme || null,
        etat_murs: formData.etatMurs || null,
        etat_sols: formData.etatSols || null,
        etat_plafonds: formData.etatPlafonds || null,
        etat_menuiserie: formData.etatMenuiserie || null,
        niveau_bien: formData.niveauBien || null,
        materiaux_finitions: formData.materiauxFinitions || null,
        cuisine: formData.cuisine || null,
        electromenager: formData.electromenager || null,
        equipements_interieur: formData.equipementsInterieur?.length ? formData.equipementsInterieur : null,
        hauteur_plafond: formData.hauteurPlafond || null,
        distribution_logement: formData.distributionLogement || null,
        exposition: formData.exposition || null,
        exposition_traversant: formData.expositionTraversant || null,
        vis_a_vis: formData.visAVis || null,
        vue: formData.vue?.length ? formData.vue : null,
        exterieurs: formData.exterieurs?.length ? formData.exterieurs : null,
        annexes: formData.annexes?.length ? formData.annexes : null,
        encadrement_loyers: formData.encadrementLoyers || null,
        location_touristique: formData.locationTouristique || null,
        changement_usage: formData.changementUsage || null,
        residence_secondaire: formData.residenceSecondaire || null,
        protection_immeuble: formData.protectionImmeuble || null,
        prix_acquisition: formData.prixAcquisition || null,
        date_acquisition: formData.dateAcquisition || null,
        taxe_fonciere: formData.taxeFonciere || null,
        objectif_demande: formData.objectifDemande || null,
        objectif_demande_autre: formData.objectifDemandeAutre || null,
        documents_disponibles: formData.documentsDisponibles?.length ? formData.documentsDisponibles : null,
        atout_principal: formData.atoutPrincipal || null,
        element_negatif: formData.elementNegatif || null,
        delai_vente: formData.delaiVente || null,
        prix_envisage: formData.prixEnvisage || null,
        fourchette_negociation: formData.fourchetteNegociation ? parseInt(formData.fourchetteNegociation) : null,
        informations_complementaires: formData.informationsComplementaires || null,
        type_demande: 'estimation_paris',
        maturite: 'estimation',
        ajustement_prix: 'oui',
        motivation: `Estimation Paris. ${formData.informationsComplementaires || ''}`,
        status: 'nouveau'
      }

      const missing = ['prenom', 'telephone', 'email'].filter(f => !d[f])
      if (missing.length > 0) {
        setSubmitError(`Champs obligatoires manquants: ${missing.join(', ')}`)
        setSubmitting(false)
        return
      }

      let photoUrls: string[] = []
      if (photos.length > 0) {
        const tempId = `temp_${Date.now()}`
        setUploadProgress(`Upload des photos (0/${photos.length})...`)
        photoUrls = await uploadEstimationPhotos(photos, tempId, (u, t) => setUploadProgress(`Upload (${u}/${t})...`))
      }
      if (photoUrls.length > 0) d.photos_urls = photoUrls

      setUploadProgress('Enregistrement...')
      await createAnalyseLead(d)
      sessionStorage.removeItem('estimation_paris_etape1')
      window.location.href = 'https://buy.stripe.com/5kQbJ13X48c8dgVaJZeQM01'
    } catch (err: any) {
      setSubmitError(err.message || 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent"
  const selectClass = "w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent"
  const labelClass = "block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide"
  const sectionTitleClass = "text-lg font-semibold text-white uppercase tracking-wide"
  const groupTitleClass = "text-xl font-bold text-white uppercase tracking-wide mb-6"
  const optionBase = "flex items-center p-3 border rounded-lg cursor-pointer transition-all"
  const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }
  const getOptionClass = (sel: boolean) => `${optionBase} ${sel ? 'border-white/60 bg-white/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`

  if (!etape1Data) {
    return <main className="min-h-screen bg-black flex items-center justify-center"><p className="text-white/50" style={fontStyle}>Chargement...</p></main>
  }

  return (
    <main className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-4" style={fontStyle}>Estimation Paris</h1>
          <p className="text-white/50 text-sm uppercase tracking-widest" style={fontStyle}>Étape 2 / 2</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* IDENTIFICATION DU BIEN */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Identification du bien</h2>
            <div><label className={labelClass} style={fontStyle}>Adresse complète</label><input type="text" name="adresseComplete" value={formData.adresseComplete} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div>
              <label className={labelClass} style={fontStyle}>Code postal (75001 à 75020 uniquement)</label>
              <select name="codePostal" value={formData.codePostal} onChange={handleChange} className={selectClass} style={fontStyle}>
                <option value="" className="bg-black">Sélectionnez...</option>
                {CODES_POSTAUX_PARIS.map(cp => <option key={cp} value={cp} className="bg-black">{cp}</option>)}
              </select>
              {formData.codePostal && (
                <p className="mt-2 text-xs italic text-white/40" style={fontStyle}>
                  Montant intégralement déductible des honoraires en cas de signature d&apos;un mandat exclusif confié à l&apos;agence
                </p>
              )}
            </div>

            <div>
              <label className={labelClass} style={fontStyle}>Type de bien</label>
              <div className="flex gap-4 mb-4">
                {['Appartement', 'Maison'].map(o => (
                  <label key={o} className={getOptionClass(formData.typeBien === o)}>
                    <input type="radio" name="typeBien" value={o} checked={formData.typeBien === o} onChange={() => setFormData(prev => ({ ...prev, typeBien: o, typeBienSousCategorie: '' }))} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
              {formData.typeBien === 'Appartement' && (
                <div className="mt-4">
                  <label className="text-white/60 text-sm mb-2 block" style={fontStyle}>Sous-catégorie</label>
                  <div className="flex flex-wrap gap-2">
                    {APPARTEMENT_SOUS_CATEGORIES.map(o => (
                      <label key={o} className={getOptionClass(formData.typeBienSousCategorie === o)}>
                        <input type="radio" name="typeBienSousCategorie" value={o} checked={formData.typeBienSousCategorie === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {formData.typeBien === 'Maison' && (
                <div className="mt-4">
                  <label className="text-white/60 text-sm mb-2 block" style={fontStyle}>Sous-catégorie</label>
                  <div className="flex flex-wrap gap-2">
                    {MAISON_SOUS_CATEGORIES.map(o => (
                      <label key={o} className={getOptionClass(formData.typeBienSousCategorie === o)}>
                        <input type="radio" name="typeBienSousCategorie" value={o} checked={formData.typeBienSousCategorie === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {formData.typeBienSousCategorie === 'Autre à préciser' && <div className="mt-4"><input type="text" name="typeBienAutre" value={formData.typeBienAutre} onChange={handleChange} placeholder="Précisez" className={inputClass} style={fontStyle} /></div>}
            </div>

            {formData.typeBien === 'Maison' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className={labelClass} style={fontStyle}>Surface habitable (m²)</label><input type="text" name="surfaceHabitable" value={formData.surfaceHabitable} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Surface au sol totale (si différente)</label><input type="text" name="surfaceSolTotale" value={formData.surfaceSolTotale} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Année de construction</label><input type="text" name="anneeConstruction" value={formData.anneeConstruction} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* STATUT ACTUEL */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Statut actuel du bien</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {STATUT_ACTUEL.map(o => (
                <label key={o} className={getOptionClass(formData.statutActuel === o)}>
                  <input type="radio" name="statutActuel" value={o} checked={formData.statutActuel === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            {formData.statutActuel === 'Autre (à préciser)' && <div><input type="text" name="statutActuelAutre" value={formData.statutActuelAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
            {formData.statutActuel === 'Loué' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div><label className={labelClass} style={fontStyle}>Type de bail</label><input type="text" name="typeBail" value={formData.typeBail} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Loyer mensuel hors charges</label><input type="text" name="loyerMensuelHorsCharges" value={formData.loyerMensuelHorsCharges} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={labelClass} style={fontStyle}>Date début bail</label><input type="text" name="dateDebutBail" value={formData.dateDebutBail} onChange={handleChange} placeholder="Ex: 01/01/2022" className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Date fin bail</label><input type="text" name="dateFinBail" value={formData.dateFinBail} onChange={handleChange} placeholder="Ex: 31/12/2027" className={inputClass} style={fontStyle} /></div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* UNIQUEMENT SI APPARTEMENT */}
          {formData.typeBien === 'Appartement' && (
            <>
              <div className="space-y-6">
                <h2 className={groupTitleClass} style={fontStyle}>Uniquement si appartement</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={fontStyle}>Surface Loi Carrez (m²) *</label>
                    <input type="text" name="surfaceCarrez" value={formData.surfaceCarrez} onChange={handleChange} required={formData.typeBien === 'Appartement'} className={inputClass} style={fontStyle} />
                  </div>
                  <div><label className={labelClass} style={fontStyle}>Surface au sol totale (si différente)</label><input type="text" name="surfaceSolTotale" value={formData.surfaceSolTotale} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={labelClass} style={fontStyle}>Étage du bien</label><input type="text" name="etageBien" value={formData.etageBien} onChange={handleChange} placeholder="Ex: 3" className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>sur</label><input type="text" name="etageSur" value={formData.etageSur} onChange={handleChange} placeholder="Ex: 6" className={inputClass} style={fontStyle} /></div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Dernier étage</label>
                  <div className="flex gap-4">
                    {['Oui', 'Non'].map(o => (
                      <label key={o} className={getOptionClass(formData.dernierEtage === o)}>
                        <input type="radio" name="dernierEtage" value={o} checked={formData.dernierEtage === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Ascenseur</label>
                  <div className="flex gap-4">
                    {['Oui', 'Non'].map(o => (
                      <label key={o} className={getOptionClass(formData.ascenseur === o)}>
                        <input type="radio" name="ascenseur" value={o} checked={formData.ascenseur === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Type d&apos;immeuble</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {TYPE_IMMEUBLE_OPTIONS.map(o => (
                      <label key={o} className={getOptionClass(formData.typeImmeuble === o)}>
                        <input type="radio" name="typeImmeuble" value={o} checked={formData.typeImmeuble === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Standing de l&apos;immeuble</label>
                  <div className="flex gap-4">
                    {STANDING_OPTIONS.map(o => (
                      <label key={o} className={getOptionClass(formData.standingImmeuble === o)}>
                        <input type="radio" name="standingImmeuble" value={o} checked={formData.standingImmeuble === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* ÉLÉMENTS DE COPROPRIÉTÉ */}
              <div className="space-y-6">
                <h2 className={groupTitleClass} style={fontStyle}>Éléments de copropriété</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={labelClass} style={fontStyle}>Nombre de lots dans l&apos;immeuble</label><input type="text" name="nbLots" value={formData.nbLots} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Montant charges annuelles</label><input type="text" name="chargesAnnuelles" value={formData.chargesAnnuelles} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Présence de commerces dans l&apos;immeuble (rez-de-chaussée)</label>
                  <div className="flex gap-4 mb-2">
                    {['Oui', 'Non', 'Ne sait pas'].map(o => (
                      <label key={o} className={getOptionClass(formData.commercesRdc === o)}>
                        <input type="radio" name="commercesRdc" value={o} checked={formData.commercesRdc === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                  {formData.commercesRdc === 'Oui' && <input type="text" name="commercesNature" value={formData.commercesNature} onChange={handleChange} placeholder="Nature des commerces" className={inputClass} style={fontStyle} />}
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Travaux votés ou importants prévus dans l&apos;immeuble</label>
                  <div className="flex gap-4 mb-2">
                    {['Oui', 'Non', 'Ne sait pas'].map(o => (
                      <label key={o} className={getOptionClass(formData.travauxPrevus === o)}>
                        <input type="radio" name="travauxPrevus" value={o} checked={formData.travauxPrevus === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                  {formData.travauxPrevus === 'Oui' && <input type="text" name="travauxPrevusNature" value={formData.travauxPrevusNature} onChange={handleChange} placeholder="Nature des travaux" className={inputClass} style={fontStyle} />}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={labelClass} style={fontStyle}>Ravalement façade récent ou non ?</label><input type="text" name="ravalementFacade" value={formData.ravalementFacade} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Ravalement toiture récent ou non ?</label><input type="text" name="ravalementToiture" value={formData.ravalementToiture} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Procédure en cours dans la copropriété</label>
                  <div className="flex gap-4">
                    {['Oui', 'Non', 'Ne sait pas'].map(o => (
                      <label key={o} className={getOptionClass(formData.procedureEnCours === o)}>
                        <input type="radio" name="procedureEnCours" value={o} checked={formData.procedureEnCours === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>État général des parties communes</label>
                  <div className="flex gap-4">
                    {['Très bon état', 'Bon état', 'État moyen', 'Dégradé'].map(o => (
                      <label key={o} className={getOptionClass(formData.etatPartiesCommunes === o)}>
                        <input type="radio" name="etatPartiesCommunes" value={o} checked={formData.etatPartiesCommunes === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Présence d&apos;un gardien</label>
                  <div className="flex gap-4">
                    {['Oui', 'Non'].map(o => (
                      <label key={o} className={getOptionClass(formData.gardien === o)}>
                        <input type="radio" name="gardien" value={o} checked={formData.gardien === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Servitudes ou contraintes particulières connues</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['Servitude de passage', 'Cour commune', 'Passage privé', 'Aucune connue', 'Ne sait pas'].map(o => (
                      <label key={o} className={getOptionClass(formData.servitudes.includes(o))}>
                        <input type="checkbox" checked={formData.servitudes.includes(o)} onChange={() => handleCheckboxChange('servitudes', o)} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Si maison : année construction déjà au-dessus */}
          {formData.typeBien === 'Maison' && (
            <div className="space-y-6">
              <h2 className={groupTitleClass} style={fontStyle}>Servitudes ou contraintes particulières connues</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {['Servitude de passage', 'Cour commune', 'Passage privé', 'Aucune connue', 'Ne sait pas'].map(o => (
                  <label key={o} className={getOptionClass(formData.servitudes.includes(o))}>
                    <input type="checkbox" checked={formData.servitudes.includes(o)} onChange={() => handleCheckboxChange('servitudes', o)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/10" />

          {/* CARACTÉRISTIQUES GÉNÉRALES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Caractéristiques générales du bien</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className={labelClass} style={fontStyle}>Nombre de pièces</label><input type="text" name="nombrePieces" value={formData.nombrePieces} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Nombre de chambres</label><input type="text" name="nombreChambres" value={formData.nombreChambres} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Nombre de salles d&apos;eau</label><input type="text" name="nombreSallesDEau" value={formData.nombreSallesDEau} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Nombre de salles de bain</label><input type="text" name="nombreSallesDeBain" value={formData.nombreSallesDeBain} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div>
                <label className={labelClass} style={fontStyle}>WC séparés ou non</label>
                <div className="flex gap-4 mt-2">
                  {['Oui', 'Non'].map(o => (
                    <label key={o} className={getOptionClass(formData.wcSepares === o)}>
                      <input type="radio" name="wcSepares" value={o} checked={formData.wcSepares === o} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{o}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* LUMINOSITÉ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Luminosité</h2>
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-sm" style={fontStyle}>1</span>
              <input type="range" name="luminosite" min="1" max="10" value={formData.luminosite} onChange={(e) => setFormData(prev => ({ ...prev, luminosite: e.target.value }))} className="flex-1 h-2 bg-white/20 rounded-lg accent-white" />
              <span className="text-white font-semibold min-w-[2rem] text-center" style={fontStyle}>{formData.luminosite}</span>
              <span className="text-white/50 text-sm" style={fontStyle}>10</span>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ÉTAT DU BIEN */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>État du bien</h2>
            <div>
              <label className={labelClass} style={fontStyle}>État général du bien</label>
              <div className="grid md:grid-cols-2 gap-3">
                {['A RENOVER', 'RAFRAICHIR', 'BON ETAT', 'EXCELLENT ETAT'].map(o => (
                  <label key={o} className={getOptionClass(formData.etatGeneral === o)}>
                    <input type="radio" name="etatGeneral" value={o} checked={formData.etatGeneral === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className={labelClass} style={fontStyle}>Travaux effectués (année, nature, montant)</label><textarea name="travauxEffectues" value={formData.travauxEffectues} onChange={handleChange} rows={2} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Travaux prévus (année, nature, montant)</label><textarea name="travauxPrevusDetail" value={formData.travauxPrevusDetail} onChange={handleChange} rows={2} className={inputClass} style={fontStyle} /></div>
            </div>
            <div><label className={labelClass} style={fontStyle}>Autorisation d&apos;urbanisme ? (PC, DP, changement d&apos;usage, changement destination)</label><input type="text" name="autorisationUrbanisme" value={formData.autorisationUrbanisme} onChange={handleChange} placeholder="Si oui, lesquelles et quand ?" className={inputClass} style={fontStyle} /></div>
            <div>
              <label className={labelClass} style={fontStyle}>État intérieur du bien</label>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-white/60 text-sm mb-1" style={fontStyle}>Murs</label><input type="text" name="etatMurs" value={formData.etatMurs} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className="text-white/60 text-sm mb-1" style={fontStyle}>Sols</label><input type="text" name="etatSols" value={formData.etatSols} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className="text-white/60 text-sm mb-1" style={fontStyle}>Plafonds</label><input type="text" name="etatPlafonds" value={formData.etatPlafonds} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className="text-white/60 text-sm mb-1" style={fontStyle}>Menuiserie</label><input type="text" name="etatMenuiserie" value={formData.etatMenuiserie} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* PRESTATIONS */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Prestations du bien</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Niveau du bien</label>
              <div className="grid md:grid-cols-4 gap-3">
                {['Standard', 'Bon standing', 'Haut de gamme', 'Luxe / Exceptionnel'].map(o => (
                  <label key={o} className={getOptionClass(formData.niveauBien === o)}>
                    <input type="radio" name="niveauBien" value={o} checked={formData.niveauBien === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Matériaux et finitions</label>
              <div className="grid md:grid-cols-2 gap-3">
                {['Parquet massif / Point de Hongrie', 'Pierre naturelle / Marbre', 'Moulures / Hauteur sous plafond remarquable', 'Menuiseries sur-mesure', 'Cuisine sur-mesure', 'Aucun élément particulier'].map(o => (
                  <label key={o} className={getOptionClass(formData.materiauxFinitions === o)}>
                    <input type="radio" name="materiauxFinitions" value={o} checked={formData.materiauxFinitions === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Cuisine</label>
              <div className="flex flex-wrap gap-3">
                {['Équipée', 'Semi-équipée et ouverte', 'Fermée'].map(o => (
                  <label key={o} className={getOptionClass(formData.cuisine === o)}>
                    <input type="radio" name="cuisine" value={o} checked={formData.cuisine === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Électroménager</label>
              <div className="flex gap-4">
                {['Non inclus', 'Inclus (entrée / milieu de gamme)', 'Inclus (haut de gamme)'].map(o => (
                  <label key={o} className={getOptionClass(formData.electromenager === o)}>
                    <input type="radio" name="electromenager" value={o} checked={formData.electromenager === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Équipements intérieur</label>
              <div className="grid md:grid-cols-3 gap-3">
                {['Climatisation intégrée', 'Domotique', 'Dressing sur-mesure', 'Cheminée', 'Terrasse / Rooftop', 'Piscine', 'Jacuzzi', 'Bassin', 'Fontaine', 'Salle de sport / Spa', 'Cave à vin', 'Aucun'].map(o => (
                  <label key={o} className={getOptionClass(formData.equipementsInterieur.includes(o))}>
                    <input type="checkbox" checked={formData.equipementsInterieur.includes(o)} onChange={() => handleCheckboxChange('equipementsInterieur', o)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Hauteur sous plafond</label>
              <div className="flex gap-4">
                {['moins de 2,50 m', '2,50 – 2,80 m', '2,80 – 3 m', 'plus de 3 m'].map(o => (
                  <label key={o} className={getOptionClass(formData.hauteurPlafond === o)}>
                    <input type="radio" name="hauteurPlafond" value={o} checked={formData.hauteurPlafond === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Distribution du logement</label>
              <div className="flex gap-4">
                {['Plan optimisé', 'Plan traversant', 'Plan en étoile', 'Plan couloir'].map(o => (
                  <label key={o} className={getOptionClass(formData.distributionLogement === o)}>
                    <input type="radio" name="distributionLogement" value={o} checked={formData.distributionLogement === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* PHOTOS */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Photos du bien</h2>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40" onClick={() => fileInputRef.current?.click()}>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
              <svg className="w-10 h-10 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-white/60 text-sm" style={fontStyle}>Cliquez pour ajouter des photos</p>
              {photos.length > 0 && <p className="text-white/40 text-xs mt-1" style={fontStyle}>{photos.length} photo(s)</p>}
            </div>
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {photoPreviews.map((p, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                    <Image src={p} alt={`Photo ${i+1}`} fill className="object-cover" />
                    <button type="button" onClick={() => handlePhotoRemove(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/70 text-[10px] text-center py-0.5" style={fontStyle}>{i+1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* CONFORT ET ENVIRONNEMENT */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Confort et environnement</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Exposition (N/S/E/O)</label>
              <div className="flex gap-4 mb-2">
                {['Nord', 'Sud', 'Est', 'Ouest'].map(o => (
                  <label key={o} className={getOptionClass(formData.exposition === o)}>
                    <input type="radio" name="exposition" value={o} checked={formData.exposition === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block" style={fontStyle}>Traversant</label>
                <div className="flex gap-4">
                  {['Oui', 'Non'].map(o => (
                    <label key={o} className={getOptionClass(formData.expositionTraversant === o)}>
                      <input type="radio" name="expositionTraversant" value={o} checked={formData.expositionTraversant === o} onChange={handleChange} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{o}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Vis-à-vis</label>
              <div className="grid md:grid-cols-2 gap-3">
                {['Aucun vis-à-vis direct', 'Vis-à-vis très proche (moins de 10 m)', 'Vis-à-vis proche (10 à 20 m)', 'Vis-à-vis modéré (20 à 40 m)', 'Vis-à-vis lointain (plus de 40 m)', 'Je ne sais pas'].map(o => (
                  <label key={o} className={getOptionClass(formData.visAVis === o)}>
                    <input type="radio" name="visAVis" value={o} checked={formData.visAVis === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Vue (plusieurs choix possibles)</label>
              <div className="grid md:grid-cols-2 gap-3">
                {VUE_OPTIONS.map(o => (
                  <label key={o} className={getOptionClass(formData.vue.includes(o))}>
                    <input type="checkbox" checked={formData.vue.includes(o)} onChange={() => handleCheckboxChange('vue', o)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Extérieurs</label>
              <div className="flex flex-wrap gap-3">
                {EXTERIEURS_OPTIONS.map(o => (
                  <label key={o} className={getOptionClass(formData.exterieurs.includes(o))}>
                    <input type="checkbox" checked={formData.exterieurs.includes(o)} onChange={() => handleCheckboxChange('exterieurs', o)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Annexes</label>
              <div className="flex flex-wrap gap-3">
                {ANNEXES_OPTIONS.map(o => (
                  <label key={o} className={getOptionClass(formData.annexes.includes(o))}>
                    <input type="checkbox" checked={formData.annexes.includes(o)} onChange={() => handleCheckboxChange('annexes', o)} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* RÉGLEMENTATIONS */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Réglementations</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Encadrement des loyers applicable</label>
              <div className="flex gap-4">
                {['Oui', 'Non', 'Ne sait pas'].map(o => (
                  <label key={o} className={getOptionClass(formData.encadrementLoyers === o)}>
                    <input type="radio" name="encadrementLoyers" value={o} checked={formData.encadrementLoyers === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Location touristique autorisée</label>
              <div className="flex gap-4">
                {['Oui', 'Non', 'Ne sait pas'].map(o => (
                  <label key={o} className={getOptionClass(formData.locationTouristique === o)}>
                    <input type="radio" name="locationTouristique" value={o} checked={formData.locationTouristique === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Changement d&apos;usage effectué</label>
              <div className="flex gap-4">
                {['Oui', 'Non', 'Ne sait pas'].map(o => (
                  <label key={o} className={getOptionClass(formData.changementUsage === o)}>
                    <input type="radio" name="changementUsage" value={o} checked={formData.changementUsage === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Le bien est-il une résidence secondaire</label>
              <div className="flex gap-4">
                {['Oui', 'Non'].map(o => (
                  <label key={o} className={getOptionClass(formData.residenceSecondaire === o)}>
                    <input type="radio" name="residenceSecondaire" value={o} checked={formData.residenceSecondaire === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>L&apos;immeuble est-il</label>
              <div className="grid md:grid-cols-2 gap-3">
                {['Classé monument historique', 'Inscrit monument historique', 'Situé dans un périmètre de protection patrimoniale (ABF / secteur sauvegardé)', 'Aucune protection particulière', 'Je ne sais pas'].map(o => (
                  <label key={o} className={getOptionClass(formData.protectionImmeuble === o)}>
                    <input type="radio" name="protectionImmeuble" value={o} checked={formData.protectionImmeuble === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* DONNÉES FINANCIÈRES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Données financières</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div><label className={labelClass} style={fontStyle}>Prix d&apos;acquisition</label><input type="text" name="prixAcquisition" value={formData.prixAcquisition} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Date d&apos;acquisition</label><input type="text" name="dateAcquisition" value={formData.dateAcquisition} onChange={handleChange} placeholder="Ex: 15/03/2018" className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Taxe foncière</label><input type="text" name="taxeFonciere" value={formData.taxeFonciere} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* OBJECTIF DE LA DEMANDE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Objectif de la demande</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {OBJECTIF_OPTIONS.map(o => (
                <label key={o} className={getOptionClass(formData.objectifDemande === o)}>
                  <input type="radio" name="objectifDemande" value={o} checked={formData.objectifDemande === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            {formData.objectifDemande === 'Autre' && <div><input type="text" name="objectifDemandeAutre" value={formData.objectifDemandeAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
          </div>

          <div className="border-t border-white/10" />

          {/* DOCUMENTS */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Documents disponibles</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {DOCUMENTS_OPTIONS.map(o => (
                <label key={o} className={getOptionClass(formData.documentsDisponibles.includes(o))}>
                  <input type="checkbox" checked={formData.documentsDisponibles.includes(o)} onChange={() => handleCheckboxChange('documentsDisponibles', o)} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            <p className="text-white/50 text-sm italic" style={fontStyle}>Ces documents pourront être transmis ultérieurement si nécessaire à l&apos;analyse.</p>
          </div>

          <div className="border-t border-white/10" />

          {/* PERCEPTION */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Perception du bien</h2>
            <div><label className={labelClass} style={fontStyle}>Selon vous, quel est l&apos;atout principal de votre bien ?</label><input type="text" name="atoutPrincipal" value={formData.atoutPrincipal} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div><label className={labelClass} style={fontStyle}>Selon vous, y a-t-il un élément qui pourrait influencer négativement sa valorisation ?</label><input type="text" name="elementNegatif" value={formData.elementNegatif} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
          </div>

          <div className="border-t border-white/10" />

          {/* DÉLAI DE VENTE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Délai de vente</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map(o => (
                <label key={o} className={getOptionClass(formData.delaiVente === o)}>
                  <input type="radio" name="delaiVente" value={o} checked={formData.delaiVente === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* PRIX ENVISAGÉ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Prix envisagé</h2>
            <div><label className={labelClass} style={fontStyle}>Avez-vous une idée de prix ?</label><input type="text" name="prixEnvisage" value={formData.prixEnvisage} onChange={handleChange} placeholder="Ex: 350 000 €" className={inputClass} style={fontStyle} /></div>
          </div>

          <div className="border-t border-white/10" />

          {/* FOURCHETTE DE NÉGOCIATION */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Fourchette de négociation</h2>
            <label className="block text-sm font-medium text-white/70 mb-4 leading-relaxed" style={fontStyle}>Si l&apos;estimation proposée diffère du prix que vous aviez en tête, dans quelle mesure seriez-vous disposé(e) à ajuster le prix ?</label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/50" style={fontStyle}>1</span>
              <input type="range" name="fourchetteNegociation" value={formData.fourchetteNegociation} onChange={handleChange} min="1" max="10" step="1" className="flex-1 h-2 bg-white/20 rounded-lg accent-white" />
              <span className="text-sm text-white/50" style={fontStyle}>10</span>
              {formData.fourchetteNegociation && <span className="text-lg font-semibold text-white min-w-[2rem] text-center" style={fontStyle}>{formData.fourchetteNegociation}</span>}
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40" style={fontStyle}><span>Pas du tout</span><span>Très disposé(e)</span></div>
          </div>

          <div className="border-t border-white/10" />

          {/* INFORMATIONS COMPLÉMENTAIRES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Informations complémentaires</h2>
            <div><label className={labelClass} style={fontStyle}>Zone de texte libre</label><textarea name="informationsComplementaires" value={formData.informationsComplementaires} onChange={handleChange} rows={5} className={inputClass} style={fontStyle} /></div>
          </div>

          {submitError && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">{submitError}</div>}

          <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/70 leading-relaxed" style={fontStyle}>Les informations collectées sont destinées à traiter votre demande. Conservées 5 ans max. RGPD : droits d&apos;accès, rectification, suppression. Contact : lagenceyl@gmail.com.</p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={acceptPrivacy} onChange={e => setAcceptPrivacy(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/30 accent-white" />
              <span className="text-sm text-white/90" style={fontStyle}>J&apos;accepte la politique de confidentialité</span>
            </label>
          </div>

          <button type="submit" disabled={submitting || !acceptPrivacy} className="w-full px-8 py-4 rounded-full font-medium bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            {submitting ? (uploadProgress || 'Envoi...') : 'Paiement de l\'estimation'}
          </button>
        </form>
      </div>
    </main>
  )
}
