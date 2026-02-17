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
    messageLibre: ''
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')

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
        nom_succession: formData.nomSuccession || null,
        delai_vente: formData.delaiVente || null,
        situation_actuelle: formData.situationActuelle || null,
        type_location: formData.typeLocation || null,
        loyer_mensuel: formData.loyerMensuel || null,
        prix_envisage: formData.prixEnvisage || null,
        ajustement_prix_echelle: formData.ajustementPrix ? parseInt(formData.ajustementPrix) : null,
        message_libre: formData.messageLibre || null,
        
        type_demande: 'estimation_juridique',
        maturite: 'estimation',
        ajustement_prix: 'oui',
        motivation: `Estimation activités juridiques demandée. ${formData.messageLibre || 'Demande d\'estimation immobilière.'}`,
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
      // TODO: Remplacer par le lien Stripe spécifique
      window.location.href = 'https://buy.stripe.com/test_eVq14f8kecbQgDFcZZ04800'
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

          {/* ═══════════ IDENTIFICATION DU BIEN ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Identification du bien</h2>

            {/* Localisation */}
            <div>
              <label className={labelClass} style={fontStyle}>Adresse du bien ou quartier</label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                placeholder="Ex: Quartier Alsace, ou adresse complète"
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

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Travaux récents</p>
              <div className="flex gap-4 mt-4 mb-4">{['oui', 'non'].map((val) => (<label key={val} className={getOptionClass(formData.travauxRecents === val)}><input type="radio" name="travauxRecents" value={val} checked={formData.travauxRecents === val} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm capitalize" style={fontStyle}>{val}</span></label>))}</div>
              {formData.travauxRecents === 'oui' && (
                <div className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className={labelClass} style={fontStyle}>Nature des travaux</label><input type="text" name="natureTravaux" value={formData.natureTravaux} onChange={handleChange} placeholder="Ex: Rénovation complète..." className={inputClass} style={fontStyle} /></div>
                    <div><label className={labelClass} style={fontStyle}>Année approximative</label><input type="text" name="anneeTravaux" value={formData.anneeTravaux} onChange={handleChange} placeholder="Ex: 2023" className={inputClass} style={fontStyle} /></div>
                  </div>
                  <div><label className={labelClass} style={fontStyle}>Montant total des travaux</label><input type="text" name="montantTravaux" value={formData.montantTravaux} onChange={handleChange} placeholder="Ex: 25 000 €" className={inputClass} style={fontStyle} /></div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Travaux prévus</p>
              <div className="flex gap-4 mt-4 mb-4">{['oui', 'non'].map((val) => (<label key={val} className={getOptionClass(formData.travauxPrevus === val)}><input type="radio" name="travauxPrevus" value={val} checked={formData.travauxPrevus === val} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm capitalize" style={fontStyle}>{val}</span></label>))}</div>
              {formData.travauxPrevus === 'oui' && (
                <div className="space-y-4 mt-4"><div className="grid md:grid-cols-3 gap-4">
                  <div><label className={labelClass} style={fontStyle}>Nature des travaux prévus</label><input type="text" name="natureTravauxPrevus" value={formData.natureTravauxPrevus} onChange={handleChange} placeholder="Ex: Ravalement, extension..." className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Budget estimé</label><input type="text" name="budgetTravauxPrevus" value={formData.budgetTravauxPrevus} onChange={handleChange} placeholder="Ex: 15 000 €" className={inputClass} style={fontStyle} /></div>
                  <div><label className={labelClass} style={fontStyle}>Date prévue</label><input type="text" name="dateTravauxPrevus" value={formData.dateTravauxPrevus} onChange={handleChange} placeholder="Ex: Été 2026" className={inputClass} style={fontStyle} /></div>
                </div></div>
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
            <div><p className={sectionTitleClass} style={fontStyle}>Charges de copropriété</p><div className="mt-4"><label className={labelClass} style={fontStyle}>Montant mensuel (€)</label><input type="text" name="chargesCopro" value={formData.chargesCopro} onChange={handleChange} placeholder="Ex: 250 €" className={inputClass} style={fontStyle} /></div></div>
            <div><p className={sectionTitleClass} style={fontStyle}>Diagnostic de Performance Énergétique (DPE)</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non réalisé'].map((option) => (
                  <label key={option} className={getOptionClass(formData.dpe === option)}><input type="radio" name="dpe" value={option} checked={formData.dpe === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ═══════════ PROJET DE VENTE ═══════════ */}
          <div className="space-y-6">
            <h2 className={groupTitleClass} style={fontStyle}>Projet de vente</h2>

            <div><p className={sectionTitleClass} style={fontStyle}>Contexte</p><div className="mt-4">
              <select name="contexteVente" value={formData.contexteVente} onChange={handleChange} className={selectClass} style={fontStyle}>
                <option value="" className="bg-black text-white">Sélectionnez...</option>
                <option value="Mutation" className="bg-black text-white">Mutation</option>
                <option value="Mariage" className="bg-black text-white">Mariage</option>
                <option value="Naissance" className="bg-black text-white">Naissance</option>
                <option value="Départ des enfants" className="bg-black text-white">Départ des enfants</option>
                <option value="Problème de santé" className="bg-black text-white">Problème de santé</option>
                <option value="Besoin de liquidité" className="bg-black text-white">Besoin de liquidité</option>
                <option value="Difficultés financières" className="bg-black text-white">Difficultés financières</option>
                <option value="Vente pour rachat plus adapté" className="bg-black text-white">Vente pour rachat plus adapté</option>
                <option value="Arbitrage patrimonial" className="bg-black text-white">Arbitrage patrimonial</option>
                <option value="Revente pour réinvestir ailleurs" className="bg-black text-white">Revente pour réinvestir ailleurs</option>
                <option value="Donation / partage" className="bg-black text-white">Donation / partage</option>
                <option value="Indivision compliquée" className="bg-black text-white">Indivision compliquée</option>
                <option value="Fin de dispositif fiscal" className="bg-black text-white">Fin de dispositif fiscal</option>
                <option value="Arbitrage SCI" className="bg-black text-white">Arbitrage SCI</option>
                <option value="Optimisation fiscale" className="bg-black text-white">Optimisation fiscale</option>
                <option value="Marché favorable" className="bg-black text-white">Marché favorable</option>
                <option value="Changement de projet de vie / déménagement" className="bg-black text-white">Changement de projet de vie / déménagement</option>
                <option value="Divorce" className="bg-black text-white">Divorce</option>
                <option value="Succession" className="bg-black text-white">Succession</option>
              </select>
            </div>
            {formData.contexteVente === 'Succession' && (
              <div className="mt-4">
                <label className={labelClass} style={fontStyle}>Nom de la succession</label>
                <input type="text" name="nomSuccession" value={formData.nomSuccession} onChange={handleChange} placeholder="Ex: Succession Dupont" className={inputClass} style={fontStyle} />
              </div>
            )}
            </div>

            <div><p className={sectionTitleClass} style={fontStyle}>Délai de vente souhaité</p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">{['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map((option) => (<label key={option} className={getOptionClass(formData.delaiVente === option)}><input type="radio" name="delaiVente" value={option} checked={formData.delaiVente === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className={sectionTitleClass} style={fontStyle}>Situation actuelle</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">{['Occupé', 'Libre', 'Loué'].map((option) => (<label key={option} className={getOptionClass(formData.situationActuelle === option)}><input type="radio" name="situationActuelle" value={option} checked={formData.situationActuelle === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div>
              {formData.situationActuelle === 'Loué' && (
                <div className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">{['Nue', 'Meublée'].map((option) => (<label key={option} className={getOptionClass(formData.typeLocation === option)}><input type="radio" name="typeLocation" value={option} checked={formData.typeLocation === option} onChange={handleChange} className="mr-2 accent-white" /><span className="text-white text-sm" style={fontStyle}>{option}</span></label>))}</div>
                  <div><label className={labelClass} style={fontStyle}>Loyer mensuel</label><input type="text" name="loyerMensuel" value={formData.loyerMensuel} onChange={handleChange} placeholder="Ex: 800 €" className={inputClass} style={fontStyle} /></div>
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

          <button type="submit" disabled={submitting} className="w-full px-8 py-4 rounded-full font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1rem' }}>
            {submitting ? (uploadProgress || 'Envoi en cours...') : 'Paiement de l\'estimation'}
          </button>

          <p className="text-xs text-white/40 text-center italic" style={fontStyle}>
            Chaque estimation est analysée manuellement.<br />Nous nous réservons le droit de refuser les biens dont le prix attendu n&apos;est pas cohérent avec le marché.
          </p>
        </form>
      </div>
    </main>
  )
}
