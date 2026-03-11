'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createAnalyseLead, uploadEstimationPhotos } from '@/lib/firebase-admin'

const CONTEXTE_JURIDIQUE_OPTIONS = [
  'Projet de cession / arbitrage patrimonial',
  'Succession / partage successoral',
  'Sortie d\'indivision',
  'Divorce / séparation / liquidation du régime matrimonial',
  'Donation / donation-partage / transmission patrimoniale',
  'Apport d\'un bien à une société',
  'Entrée ou sortie d\'associé',
  'Évaluation d\'un actif immobilier dans un patrimoine sociétaire',
  'Litige entre parties (indivisaires, associés, etc.)',
  'Procédure judiciaire en cours',
  'Évaluation dans un cadre fiscal (IFI, donation, contrôle fiscal…)',
  'Garantie ou analyse dans un cadre bancaire / financier',
  'Audit patrimonial / analyse stratégique d\'actif',
  'Autre (à préciser)'
]

const TYPE_BIEN_OPTIONS = [
  'Appartement', 'Maison mitoyenne', 'Maison individuelle', 'Villa',
  'Propriété / demeure de caractère', 'Mas / bastide / corps de ferme',
  'Château / domaine', 'Hôtel particulier', 'Immeuble de rapport (mono-propriété)',
  'Local commercial', 'Local professionnel / bureaux', 'Entrepôt / stockage / activité',
  'Terrain à bâtir', 'Terrain agricole / foncier rural', 'Bien mixte (habitation + activité)',
  'Autre (à préciser)'
]

const DESTINATION_OPTIONS = ['Habitation', 'Commerce', 'Bureaux', 'Entrepôt / logistique / activité', 'Mixte (habitation et activité)', 'Agricole', 'Autre (à préciser)']

const USAGE_OPTIONS = ['Location nue', 'Location meublée', 'Location courte durée', 'Bail commercial', 'Bail professionnel', 'Occupé par le propriétaire', 'Occupé à titre gratuit', 'Occupé par un usufruitier', 'Occupation sans droit ni titre', 'Vacant', 'Autre (à préciser)']

const SITUATION_JURIDIQUE_OPTIONS = ['Pleine propriété', 'Indivision', 'Usufruit / nue-propriété', 'Bien détenu en société (SCI, SAS…)', 'Autre (à préciser)']

const SERVITUDES_OPTIONS = [
  'Servitude de passage', 'Servitude de vue', 'Servitude de réseaux (eau, électricité, canalisation…)',
  'Servitude d\'urbanisme (PLU, zone protégée, etc.)', 'Droit de passage agricole / rural',
  'Droit de préemption particulier', 'Servitude d\'urbanisme ou protection patrimoniale',
  'Autre contrainte juridique connue', 'Aucune servitude connue', 'Ne sait pas'
]

const DOCUMENTS_OPTIONS = ['Titre de propriété', 'Diagnostics techniques', 'Baux en cours', 'Plans du bien', 'Taxe foncière', 'Documents de copropriété', 'Autres documents utiles']

export default function EstimationJuridiqueEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [formData, setFormData] = useState({
    contexteJuridique: [] as string[],
    contexteJuridiqueAutre: '',
    precisionsContexte: '',
    horizonActif: '',
    adresseComplete: '',
    codePostal: '',
    ville: '',
    typeBien: '',
    typeBienAutre: '',
    destinationActuelle: '',
    destinationAutre: '',
    usageActuel: '',
    usageAutre: '',
    situationJuridique: '',
    situationJuridiqueAutre: '',
    demembrementNature: [] as string[],
    ageUsufruitier: '',
    dureeUsufruit: '',
    surfacePrincipale: '',
    surfaceSolTotale: '',
    surfaceTerrain: '',
    nombreNiveaux: '',
    etage: '',
    anneeConstruction: '',
    elementsAnnexes: [] as string[],
    etatGlobal: '',
    travauxRecents: '',
    travauxAPrevoir: '',
    bienLoue: '',
    loyerAnnuelHorsCharges: '',
    dateDebutBail: '',
    dateFinBail: '',
    typeBail: '',
    derniereRevision: '',
    encadrementLoyers: '',
    vacanceLocative: '',
    historiqueImpayes: '',
    nbLots: '',
    chargesAnnuellesCopro: '',
    travauxVotesPrevus: '',
    procedureEnCoursCopro: '',
    classeDpe: '',
    classeGes: '',
    anneeDpe: '',
    chauffageIndividuelCollectif: '',
    travauxEnergetiques: '',
    travauxEnergetiquesDetail: '',
    dateAcquisition: '',
    prixAcquisition: '',
    travauxSignificatifs: '',
    montantTravauxTotal: '',
    modeAcquisition: '',
    taxeFonciere: '',
    servitudes: [] as string[],
    servitudesPrecisions: '',
    dateReference: '',
    dateSpecifique: '',
    objectifAnalyse: '',
    objectifAnalyseAutre: '',
    referenceValeur: '',
    natureReference: '',
    natureReferenceAutre: '',
    montantReference: '',
    documentsDisponibles: [] as string[],
    informationsComplementaires: '',
    problematiqueSpecifique: ''
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
    try {
      const d: Record<string, any> = {
        prenom: etape1Data.prenom,
        nom: etape1Data.nom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        profession_juridique: etape1Data.professionJuridique || null,
        profession_juridique_autre: etape1Data.professionJuridiqueAutre || null,
        nom_structure: etape1Data.nomStructure || null,
        contexte_juridique: formData.contexteJuridique?.length ? formData.contexteJuridique : null,
        contexte_juridique_autre: formData.contexteJuridiqueAutre || null,
        precisions_contexte: formData.precisionsContexte || null,
        horizon_actif: formData.horizonActif || null,
        adresse_complete: formData.adresseComplete || null,
        code_postal: formData.codePostal || null,
        ville: formData.ville || null,
        type_bien: formData.typeBien || null,
        type_bien_autre: formData.typeBienAutre || null,
        destination_actuelle: formData.destinationActuelle || null,
        destination_autre: formData.destinationAutre || null,
        usage_actuel: formData.usageActuel || null,
        usage_autre: formData.usageAutre || null,
        situation_juridique: formData.situationJuridique || null,
        situation_juridique_autre: formData.situationJuridiqueAutre || null,
        demembrement_nature: formData.demembrementNature?.length ? formData.demembrementNature : null,
        age_usufruitier: formData.ageUsufruitier || null,
        duree_usufruit: formData.dureeUsufruit || null,
        surface_principale: formData.surfacePrincipale || null,
        surface_sol_totale: formData.surfaceSolTotale || null,
        surface_terrain: formData.surfaceTerrain || null,
        nombre_niveaux: formData.nombreNiveaux || null,
        etage: formData.etage || null,
        annee_construction: formData.anneeConstruction || null,
        elements_annexes: formData.elementsAnnexes?.length ? formData.elementsAnnexes : null,
        etat_global: formData.etatGlobal || null,
        travaux_recents: formData.travauxRecents || null,
        travaux_a_prevoir: formData.travauxAPrevoir || null,
        bien_loue: formData.bienLoue || null,
        loyer_annuel_hors_charges: formData.loyerAnnuelHorsCharges || null,
        date_debut_bail: formData.dateDebutBail || null,
        date_fin_bail: formData.dateFinBail || null,
        type_bail: formData.typeBail || null,
        derniere_revision: formData.derniereRevision || null,
        encadrement_loyers: formData.encadrementLoyers || null,
        vacance_locative: formData.vacanceLocative || null,
        historique_impayes: formData.historiqueImpayes || null,
        nb_lots: formData.nbLots || null,
        charges_annuelles_copro: formData.chargesAnnuellesCopro || null,
        travaux_votes_prevus: formData.travauxVotesPrevus || null,
        procedure_en_cours_copro: formData.procedureEnCoursCopro || null,
        classe_dpe: formData.classeDpe || null,
        classe_ges: formData.classeGes || null,
        annee_dpe: formData.anneeDpe || null,
        chauffage_individuel_collectif: formData.chauffageIndividuelCollectif || null,
        travaux_energetiques: formData.travauxEnergetiques || null,
        travaux_energetiques_detail: formData.travauxEnergetiquesDetail || null,
        date_acquisition: formData.dateAcquisition || null,
        prix_acquisition: formData.prixAcquisition || null,
        travaux_significatifs: formData.travauxSignificatifs || null,
        montant_travaux_total: formData.montantTravauxTotal || null,
        mode_acquisition: formData.modeAcquisition || null,
        taxe_fonciere: formData.taxeFonciere || null,
        servitudes: formData.servitudes?.length ? formData.servitudes : null,
        servitudes_precisions: formData.servitudesPrecisions || null,
        date_reference: formData.dateReference || null,
        date_specifique: formData.dateSpecifique || null,
        objectif_analyse: formData.objectifAnalyse || null,
        objectif_analyse_autre: formData.objectifAnalyseAutre || null,
        reference_valeur: formData.referenceValeur || null,
        nature_reference: formData.natureReference || null,
        nature_reference_autre: formData.natureReferenceAutre || null,
        montant_reference: formData.montantReference || null,
        documents_disponibles: formData.documentsDisponibles?.length ? formData.documentsDisponibles : null,
        informations_complementaires: formData.informationsComplementaires || null,
        problematique_specifique: formData.problematiqueSpecifique || null,
        type_demande: 'estimation_juridique',
        maturite: 'estimation',
        motivation: `Estimation professions juridiques. ${formData.problematiqueSpecifique || formData.informationsComplementaires || ''}`,
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
      sessionStorage.removeItem('estimation_juridique_etape1')
      window.location.href = 'https://buy.stripe.com/6oUfZhbpw8c86Sxg4jeQM03'
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
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-4" style={fontStyle}>Questionnaire Professions Juridiques</h1>
          <p className="text-white/50 text-sm uppercase tracking-widest" style={fontStyle}>Étape 2 / 2</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* CONTEXTE JURIDIQUE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Contexte juridique de la demande</h2>
            <p className="text-white/60 text-sm -mt-2" style={fontStyle}>Plusieurs choix possibles</p>
            <div className="grid md:grid-cols-2 gap-3">
              {CONTEXTE_JURIDIQUE_OPTIONS.map(opt => (
                <label key={opt} className={getOptionClass(formData.contexteJuridique.includes(opt))}>
                  <input type="checkbox" checked={formData.contexteJuridique.includes(opt)} onChange={() => handleCheckboxChange('contexteJuridique', opt)} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                </label>
              ))}
            </div>
            {formData.contexteJuridique.includes('Autre (à préciser)') && (
              <div><label className={labelClass} style={fontStyle}>Précisez</label><input type="text" name="contexteJuridiqueAutre" value={formData.contexteJuridiqueAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            )}
            <div>
              <label className={labelClass} style={fontStyle}>Précisions éventuelles</label>
              <textarea name="precisionsContexte" value={formData.precisionsContexte} onChange={handleChange} rows={4} placeholder="Zone de texte libre" className={inputClass} style={fontStyle} />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* HORIZON */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Horizon envisagé pour l&apos;actif immobilier</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Vente envisagée à court terme', 'Vente envisagée à moyen terme', 'Analyse patrimoniale uniquement', 'Non déterminé à ce stade'].map(opt => (
                <label key={opt} className={getOptionClass(formData.horizonActif === opt)}>
                  <input type="radio" name="horizonActif" value={opt} checked={formData.horizonActif === opt} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* IDENTIFICATION DU BIEN */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Identification du bien</h2>
            <div><label className={labelClass} style={fontStyle}>Adresse complète</label><input type="text" name="adresseComplete" value={formData.adresseComplete} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className={labelClass} style={fontStyle}>Code postal</label><input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Ville</label><input type="text" name="ville" value={formData.ville} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Type de bien</label>
              <select name="typeBien" value={formData.typeBien} onChange={handleChange} className={selectClass} style={fontStyle}>
                <option value="" className="bg-black">Sélectionnez...</option>
                {TYPE_BIEN_OPTIONS.map(o => <option key={o} value={o} className="bg-black">{o}</option>)}
              </select>
              {formData.typeBien === 'Autre (à préciser)' && <div className="mt-4"><input type="text" name="typeBienAutre" value={formData.typeBienAutre} onChange={handleChange} placeholder="Précisez" className={inputClass} style={fontStyle} /></div>}
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Destination actuelle</label>
              <div className="grid md:grid-cols-2 gap-3">
                {DESTINATION_OPTIONS.map(o => (
                  <label key={o} className={getOptionClass(formData.destinationActuelle === o)}>
                    <input type="radio" name="destinationActuelle" value={o} checked={formData.destinationActuelle === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
              {formData.destinationActuelle === 'Autre (à préciser)' && <div className="mt-4"><input type="text" name="destinationAutre" value={formData.destinationAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Usage actuel</label>
              <div className="grid md:grid-cols-2 gap-3">
                {USAGE_OPTIONS.map(o => (
                  <label key={o} className={getOptionClass(formData.usageActuel === o)}>
                    <input type="radio" name="usageActuel" value={o} checked={formData.usageActuel === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
              {formData.usageActuel === 'Autre (à préciser)' && <div className="mt-4"><input type="text" name="usageAutre" value={formData.usageAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* SITUATION JURIDIQUE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Situation juridique du bien</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {SITUATION_JURIDIQUE_OPTIONS.map(o => (
                <label key={o} className={getOptionClass(formData.situationJuridique === o)}>
                  <input type="radio" name="situationJuridique" value={o} checked={formData.situationJuridique === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            {formData.situationJuridique === 'Autre (à préciser)' && <div className="mt-4"><input type="text" name="situationJuridiqueAutre" value={formData.situationJuridiqueAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
            {formData.situationJuridique === 'Usufruit / nue-propriété' && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <p className={sectionTitleClass} style={fontStyle}>Nature du démembrement</p>
                <div className="flex gap-4">
                  {['Viager', 'Temporaire', 'Je ne sais pas'].map(o => (
                    <label key={o} className={getOptionClass(formData.demembrementNature.includes(o))}>
                      <input type="checkbox" checked={formData.demembrementNature.includes(o)} onChange={() => handleCheckboxChange('demembrementNature', o)} className="mr-2 accent-white" />
                      <span className="text-white text-sm" style={fontStyle}>{o}</span>
                    </label>
                  ))}
                </div>
                {formData.demembrementNature.includes('Viager') && <div><label className={labelClass} style={fontStyle}>Âge de l&apos;usufruitier (si viager)</label><input type="text" name="ageUsufruitier" value={formData.ageUsufruitier} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
                {formData.demembrementNature.includes('Temporaire') && <div><label className={labelClass} style={fontStyle}>Durée restante de l&apos;usufruit (si temporaire)</label><input type="text" name="dureeUsufruit" value={formData.dureeUsufruit} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* CARACTÉRISTIQUES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Caractéristiques principales</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className={labelClass} style={fontStyle}>Surface principale (m²)</label><input type="text" name="surfacePrincipale" value={formData.surfacePrincipale} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Surface au sol totale (si différente)</label><input type="text" name="surfaceSolTotale" value={formData.surfaceSolTotale} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Surface du terrain (si applicable)</label><input type="text" name="surfaceTerrain" value={formData.surfaceTerrain} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div><label className={labelClass} style={fontStyle}>Nombre de niveaux</label><input type="text" name="nombreNiveaux" value={formData.nombreNiveaux} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Étage</label><input type="text" name="etage" value={formData.etage} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Année de construction</label><input type="text" name="anneeConstruction" value={formData.anneeConstruction} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Éléments annexes</label>
              <div className="flex flex-wrap gap-3">
                {['Balcon', 'Terrasse', 'Jardin', 'Cave', 'Parking', 'Box', 'Dépendance'].map(o => (
                  <label key={o} className={getOptionClass(formData.elementsAnnexes.includes(o))}>
                    <input type="checkbox" checked={formData.elementsAnnexes.includes(o)} onChange={() => handleCheckboxChange('elementsAnnexes', o)} className="mr-2 accent-white" />
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

          {/* ÉTAT GÉNÉRAL */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>État général du bien</h2>
            <div>
              <label className={labelClass} style={fontStyle}>État global</label>
              <div className="flex flex-wrap gap-3">
                {['Bon état', 'À rafraîchir', 'À rénover', 'Travaux importants à prévoir'].map(o => (
                  <label key={o} className={getOptionClass(formData.etatGlobal === o)}>
                    <input type="radio" name="etatGlobal" value={o} checked={formData.etatGlobal === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div><label className={labelClass} style={fontStyle}>Travaux récents réalisés : Nature / année / montant</label><textarea name="travauxRecents" value={formData.travauxRecents} onChange={handleChange} rows={2} className={inputClass} style={fontStyle} /></div>
            <div><label className={labelClass} style={fontStyle}>Travaux à prévoir : Nature / estimation</label><textarea name="travauxAPrevoir" value={formData.travauxAPrevoir} onChange={handleChange} rows={2} className={inputClass} style={fontStyle} /></div>
          </div>

          <div className="border-t border-white/10" />

          {/* SITUATION LOCATIVE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Situation locative (si applicable)</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Le bien est-il actuellement loué ?</label>
              <div className="flex gap-4">
                {['Oui', 'Non'].map(o => (
                  <label key={o} className={getOptionClass(formData.bienLoue === o)}>
                    <input type="radio" name="bienLoue" value={o} checked={formData.bienLoue === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.bienLoue === 'Oui' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div><label className={labelClass} style={fontStyle}>Loyer annuel hors charges</label><input type="text" name="loyerAnnuelHorsCharges" value={formData.loyerAnnuelHorsCharges} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={labelClass} style={fontStyle}>Date début bail</label><input type="text" name="dateDebutBail" value={formData.dateDebutBail} onChange={handleChange} placeholder="Ex: 01/01/2022" className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Date fin bail</label><input type="text" name="dateFinBail" value={formData.dateFinBail} onChange={handleChange} placeholder="Ex: 31/12/2027" className={inputClass} style={fontStyle} /></div>
                </div>
                <div><label className={labelClass} style={fontStyle}>Type de bail</label><input type="text" name="typeBail" value={formData.typeBail} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div><label className={labelClass} style={fontStyle}>Dernière révision du loyer</label><input type="text" name="derniereRevision" value={formData.derniereRevision} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
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
                <div><label className={labelClass} style={fontStyle}>Vacance locative éventuelle</label><input type="text" name="vacanceLocative" value={formData.vacanceLocative} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
                <div>
                  <label className={labelClass} style={fontStyle}>Historique d&apos;impayés</label>
                  <div className="flex gap-4">
                    {['Oui', 'Non'].map(o => (
                      <label key={o} className={getOptionClass(formData.historiqueImpayes === o)}>
                        <input type="radio" name="historiqueImpayes" value={o} checked={formData.historiqueImpayes === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* COPROPRIÉTÉ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Copropriété (si applicable)</h2>
            <div><label className={labelClass} style={fontStyle}>Nombre de lots dans l&apos;immeuble</label><input type="text" name="nbLots" value={formData.nbLots} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div><label className={labelClass} style={fontStyle}>Charges annuelles de copropriété</label><input type="text" name="chargesAnnuellesCopro" value={formData.chargesAnnuellesCopro} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div><label className={labelClass} style={fontStyle}>Travaux votés ou prévus : Nature / montant</label><textarea name="travauxVotesPrevus" value={formData.travauxVotesPrevus} onChange={handleChange} rows={2} className={inputClass} style={fontStyle} /></div>
            <div>
              <label className={labelClass} style={fontStyle}>Procédure en cours</label>
              <div className="flex gap-4">
                {['Oui', 'Non'].map(o => (
                  <label key={o} className={getOptionClass(formData.procedureEnCoursCopro === o)}>
                    <input type="radio" name="procedureEnCoursCopro" value={o} checked={formData.procedureEnCoursCopro === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* PERFORMANCE ÉNERGÉTIQUE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Performance énergétique</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className={labelClass} style={fontStyle}>Classe DPE</label><select name="classeDpe" value={formData.classeDpe} onChange={handleChange} className={selectClass} style={fontStyle}><option value="" className="bg-black">—</option>{['A','B','C','D','E','F','G'].map(c=>(<option key={c} value={c} className="bg-black">{c}</option>))}</select></div>
              <div><label className={labelClass} style={fontStyle}>Classe GES</label><select name="classeGes" value={formData.classeGes} onChange={handleChange} className={selectClass} style={fontStyle}><option value="" className="bg-black">—</option>{['A','B','C','D','E','F','G'].map(c=>(<option key={c} value={c} className="bg-black">{c}</option>))}</select></div>
            </div>
            <div><label className={labelClass} style={fontStyle}>Année du diagnostic</label><input type="text" name="anneeDpe" value={formData.anneeDpe} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div>
              <label className={labelClass} style={fontStyle}>Système de chauffage</label>
              <div className="flex gap-4">
                {['Individuel', 'Collectif'].map(o => (
                  <label key={o} className={getOptionClass(formData.chauffageIndividuelCollectif === o)}>
                    <input type="radio" name="chauffageIndividuelCollectif" value={o} checked={formData.chauffageIndividuelCollectif === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={fontStyle}>Travaux énergétiques réalisés ou envisagés</label>
              <div className="flex gap-4 mb-2">
                {['Oui', 'Non'].map(o => (
                  <label key={o} className={getOptionClass(formData.travauxEnergetiques === o)}>
                    <input type="radio" name="travauxEnergetiques" value={o} checked={formData.travauxEnergetiques === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
              {formData.travauxEnergetiques === 'Oui' && <textarea name="travauxEnergetiquesDetail" value={formData.travauxEnergetiquesDetail} onChange={handleChange} placeholder="Si oui, lesquels ?" rows={2} className={inputClass} style={fontStyle} />}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* DONNÉES FINANCIÈRES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Données financières</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className={labelClass} style={fontStyle}>Date d&apos;acquisition</label><input type="text" name="dateAcquisition" value={formData.dateAcquisition} onChange={handleChange} placeholder="Ex: 15/03/2018" className={inputClass} style={fontStyle} /></div>
              <div><label className={labelClass} style={fontStyle}>Prix d&apos;acquisition</label><input type="text" name="prixAcquisition" value={formData.prixAcquisition} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            </div>
            <div><label className={labelClass} style={fontStyle}>Travaux significatifs réalisés depuis l&apos;acquisition</label><textarea name="travauxSignificatifs" value={formData.travauxSignificatifs} onChange={handleChange} rows={2} className={inputClass} style={fontStyle} /></div>
            <div><label className={labelClass} style={fontStyle}>Montant total estimé</label><input type="text" name="montantTravauxTotal" value={formData.montantTravauxTotal} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
            <div>
              <label className={labelClass} style={fontStyle}>Mode d&apos;acquisition</label>
              <div className="flex flex-wrap gap-3">
                {['Achat', 'Donation', 'Succession', 'Apport en société', 'Autre'].map(o => (
                  <label key={o} className={getOptionClass(formData.modeAcquisition === o)}>
                    <input type="radio" name="modeAcquisition" value={o} checked={formData.modeAcquisition === o} onChange={handleChange} className="mr-2 accent-white" />
                    <span className="text-white text-sm" style={fontStyle}>{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div><label className={labelClass} style={fontStyle}>Taxe foncière</label><input type="text" name="taxeFonciere" value={formData.taxeFonciere} onChange={handleChange} className={inputClass} style={fontStyle} /></div>
          </div>

          <div className="border-t border-white/10" />

          {/* SERVITUDES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Servitudes ou contraintes juridiques connues</h2>
            <p className="text-white/60 text-sm -mt-2" style={fontStyle}>Le bien est-il concerné par une servitude ou une contrainte particulière ?</p>
            <div className="grid md:grid-cols-2 gap-3">
              {SERVITUDES_OPTIONS.map(o => (
                <label key={o} className={getOptionClass(formData.servitudes.includes(o))}>
                  <input type="checkbox" checked={formData.servitudes.includes(o)} onChange={() => handleCheckboxChange('servitudes', o)} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            <div><label className={labelClass} style={fontStyle}>Si oui, précisions éventuelles</label><textarea name="servitudesPrecisions" value={formData.servitudesPrecisions} onChange={handleChange} rows={3} className={inputClass} style={fontStyle} /></div>
          </div>

          <div className="border-t border-white/10" />

          {/* DATE DE RÉFÉRENCE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Date de référence souhaitée pour l&apos;évaluation</h2>
            <div className="flex gap-4">
              {['Valeur actuelle', 'Valeur à une date spécifique'].map(o => (
                <label key={o} className={getOptionClass(formData.dateReference === o)}>
                  <input type="radio" name="dateReference" value={o} checked={formData.dateReference === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            {formData.dateReference === 'Valeur à une date spécifique' && <div><label className={labelClass} style={fontStyle}>Date spécifique</label><input type="text" name="dateSpecifique" value={formData.dateSpecifique} onChange={handleChange} placeholder="Champ libre" className={inputClass} style={fontStyle} /></div>}
          </div>

          <div className="border-t border-white/10" />

          {/* OBJECTIF ANALYSE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Objectif principal de l&apos;analyse</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Détermination d\'une valeur vénale', 'Arbitrage patrimonial', 'Évaluation dans un cadre juridique', 'Analyse de valeur locative', 'Analyse stratégique d\'actif', 'Autre (à préciser)'].map(o => (
                <label key={o} className={getOptionClass(formData.objectifAnalyse === o)}>
                  <input type="radio" name="objectifAnalyse" value={o} checked={formData.objectifAnalyse === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            {formData.objectifAnalyse === 'Autre (à préciser)' && <div><input type="text" name="objectifAnalyseAutre" value={formData.objectifAnalyseAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
          </div>

          <div className="border-t border-white/10" />

          {/* RÉFÉRENCE DE VALEUR */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Référence de valeur éventuelle</h2>
            <p className="text-white/60 text-sm -mt-2" style={fontStyle}>Le client ou le conseil dispose-t-il d&apos;une référence de valeur préalable ?</p>
            <div className="flex gap-4">
              {['Oui', 'Non'].map(o => (
                <label key={o} className={getOptionClass(formData.referenceValeur === o)}>
                  <input type="radio" name="referenceValeur" value={o} checked={formData.referenceValeur === o} onChange={handleChange} className="mr-2 accent-white" />
                  <span className="text-white text-sm" style={fontStyle}>{o}</span>
                </label>
              ))}
            </div>
            {formData.referenceValeur === 'Oui' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <label className={labelClass} style={fontStyle}>Nature de cette référence</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['Estimation d\'agence', 'Évaluation notariale', 'Référence de marché', 'Valeur déclarative (fiscale, succession…)', 'Autre à préciser'].map(o => (
                      <label key={o} className={getOptionClass(formData.natureReference === o)}>
                        <input type="radio" name="natureReference" value={o} checked={formData.natureReference === o} onChange={handleChange} className="mr-2 accent-white" />
                        <span className="text-white text-sm" style={fontStyle}>{o}</span>
                      </label>
                    ))}
                  </div>
                  {formData.natureReference === 'Autre à préciser' && <div className="mt-4"><input type="text" name="natureReferenceAutre" value={formData.natureReferenceAutre} onChange={handleChange} className={inputClass} style={fontStyle} /></div>}
                </div>
                <div><label className={labelClass} style={fontStyle}>Montant indicatif (€)</label><input type="text" name="montantReference" value={formData.montantReference} onChange={handleChange} placeholder="Champ libre" className={inputClass} style={fontStyle} /></div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* DOCUMENTS */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Documents éventuellement disponibles</h2>
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

          {/* INFORMATIONS COMPLÉMENTAIRES */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Informations complémentaires</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Merci de préciser tout élément juridique, technique ou contextuel pouvant être utile à l&apos;analyse de la valeur du bien :</label>
              <textarea name="informationsComplementaires" value={formData.informationsComplementaires} onChange={handleChange} rows={5} placeholder="Zone de texte libre" className={inputClass} style={fontStyle} />
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* PROBLÉMATIQUE SPÉCIFIQUE */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Problématique spécifique</h2>
            <div>
              <label className={labelClass} style={fontStyle}>Souhaitez-vous intégrer une problématique spécifique à votre dossier ?</label>
              <textarea name="problematiqueSpecifique" value={formData.problematiqueSpecifique} onChange={handleChange} rows={4} placeholder="Zone libre" className={inputClass} style={fontStyle} />
            </div>
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
