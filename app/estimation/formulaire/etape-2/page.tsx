'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'
import { createAnalyseLead } from '@/lib/firebase-admin'

export default function EstimationEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [formData, setFormData] = useState({
    // 6. Composition
    nombrePieces: '',
    nombreChambres: '',
    nombreSallesDeBain: '',
    
    // 7. Étage & accès
    etage: '',
    dernierEtage: '',
    ascenseur: '',
    
    // 7. Extérieurs
    exterieur: [] as string[],
    surfaceExterieur: '',
    
    // 8. Stationnement
    stationnement: '',
    stationnementType: '',
    
    // 10. État général
    etatBien: '',
    
    // 11. Travaux récents
    travauxRecents: '',
    natureTravaux: '',
    anneeTravaux: '',
    montantTravaux: '',
    
    // 12. Prestations
    prestations: [] as string[],
    autresPrestations: '',
    showAutresPrestations: false,
    
    // 13. Exposition
    exposition: '',
    
    // 14. Vis-à-vis
    visAVis: '',
    
    // 15. Délai de vente
    delaiVente: '',
    
    // 16. Situation actuelle
    situationActuelle: '',
    typeLocation: '',
    loyerMensuel: '',
    
    // 17. Prix envisagé
    prixEnvisage: '',
    
    // 17b. Ajustement prix (échelle 1-10)
    ajustementPrix: '',
    
    // 18. Message libre
    messageLibre: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    // Récupérer les données de l'étape 1
    const etape1 = sessionStorage.getItem('estimation_etape1')
    if (!etape1) {
      // Si pas de données étape 1, rediriger vers l'étape 1
      router.push('/estimation/formulaire')
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

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      // Préparer les données complètes pour Firebase avec conversion des types
      const completeData: any = {
        // Données étape 1
        localisation: etape1Data.localisation,
        type_bien: etape1Data.typeBien,
        surface: etape1Data.surface || null,
        surface_terrain: etape1Data.surfaceTerrain || null,
        description_initiale: etape1Data.description || null,
        prenom: etape1Data.prenom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        
        // Données étape 2 - Conversion des types
        nombre_pieces: formData.nombrePieces ? parseInt(formData.nombrePieces) : null,
        nombre_chambres: formData.nombreChambres ? parseInt(formData.nombreChambres) : null,
        nombre_salles_de_bain: formData.nombreSallesDeBain ? parseInt(formData.nombreSallesDeBain) : null,
        etage: formData.etage ? parseInt(formData.etage) : null,
        dernier_etage: formData.dernierEtage === 'oui' ? true : formData.dernierEtage === 'non' ? false : null,
        ascenseur: formData.ascenseur === 'oui' ? true : formData.ascenseur === 'non' ? false : null,
        exterieurs: formData.exterieur.length > 0 ? formData.exterieur : null,
        surface_exterieur: formData.surfaceExterieur || null,
        stationnement: formData.stationnement || null,
        stationnement_type: formData.stationnementType || null,
        etat_bien: formData.etatBien || null,
        travaux_recents: formData.travauxRecents === 'oui' ? true : formData.travauxRecents === 'non' ? false : null,
        nature_travaux: formData.natureTravaux || null,
        annee_travaux: formData.anneeTravaux ? parseInt(formData.anneeTravaux) : null,
        montant_travaux: formData.montantTravaux || null,
        prestations: formData.prestations.length > 0 ? formData.prestations : null,
        autres_prestations: formData.autresPrestations || null,
        exposition: formData.exposition || null,
        vis_a_vis: formData.visAVis || null,
        delai_vente: formData.delaiVente || null,
        situation_actuelle: formData.situationActuelle || null,
        type_location: formData.typeLocation || null,
        loyer_mensuel: formData.loyerMensuel || null,
        prix_envisage: formData.prixEnvisage || null,
        ajustement_prix_echelle: formData.ajustementPrix ? parseInt(formData.ajustementPrix) : null,
        message_libre: formData.messageLibre || null,
        
        // Métadonnées
        type_demande: 'estimation',
        // Champs obligatoires de la table (valeurs par défaut pour les estimations)
        maturite: 'estimation', // Champ NOT NULL de la table originale
        ajustement_prix: 'oui', // Champ NOT NULL de la table originale
        motivation: `Estimation détaillée demandée. ${formData.messageLibre || 'Demande d\'estimation immobilière.'}`, // Champ NOT NULL de la table originale
        status: 'nouveau'
      }

      // Enregistrer dans Firebase
      console.log('Envoi des données vers Firebase...', completeData)
      
      // Vérifier que tous les champs obligatoires sont présents
      const requiredFields = ['localisation', 'type_bien', 'prenom', 'telephone', 'email']
      const missingFields = requiredFields.filter(field => !completeData[field])
      if (missingFields.length > 0) {
        console.error('Champs manquants:', missingFields)
        setSubmitError(`Des champs obligatoires sont manquants: ${missingFields.join(', ')}`)
        setSubmitting(false)
        return
      }
      
      try {
        // Créer le lead dans Firebase
        const leadId = await createAnalyseLead(completeData)
        console.log('✅ Données enregistrées avec succès, ID:', leadId)
      } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement:', error)
        
        // Message d'erreur plus détaillé
        let errorMessage = 'Une erreur est survenue lors de l\'enregistrement.'
        if (error.code === 'permission-denied') {
          errorMessage = 'Erreur de permissions. Veuillez contacter l\'administrateur.'
        } else if (error.message) {
          errorMessage = `Erreur: ${error.message}`
        }
        
        setSubmitError(errorMessage)
        setSubmitting(false)
        return
      }

      // Nettoyer sessionStorage
      sessionStorage.removeItem('estimation_etape1')
      
      // Rediriger vers la page de confirmation
      router.push('/estimation/confirmation')
    } catch (error: any) {
      console.error('Erreur:', error)
      console.error('Stack trace:', error.stack)
      
      let errorMessage = 'Une erreur est survenue. Veuillez réessayer.'
      if (error.message) {
        errorMessage = error.message
      }
      
      setSubmitError(errorMessage)
      setSubmitting(false)
    }
  }

  if (!etape1Data) {
    return (
      <main className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p>Chargement...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête ÉTAPE 2 */}
            <div className="mb-8 pb-6 border-b-2" style={{ borderColor: '#4682B4' }}>
              <div className="mb-3">
                <span className="text-2xl font-light" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Etape 2 : Affinage de l'estimation ( une précision maximale est souhaitée afin de produire l'estimation la plus réalister possible )
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8">
              {/* CARACTÉRISTIQUES DU BIEN */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  CARACTÉRISTIQUES DU BIEN
                </h2>

                {/* 6. Composition */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      6. Composition
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Nombre de pièces
                      </label>
                      <input
                        type="number"
                        name="nombrePieces"
                        value={formData.nombrePieces}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: '#e5e7eb' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Nombre de chambres
                      </label>
                      <input
                        type="number"
                        name="nombreChambres"
                        value={formData.nombreChambres}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: '#e5e7eb' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Nombre de salle de bain
                      </label>
                      <input
                        type="number"
                        name="nombreSallesDeBain"
                        value={formData.nombreSallesDeBain}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: '#e5e7eb' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 7. Étage & accès */}
                {etape1Data.typeBien === 'Appartement' && (
                  <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                        7. Étage & accès
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Étage
                        </label>
                        <input
                          type="text"
                          name="etage"
                          value={formData.etage}
                          onChange={handleChange}
                          placeholder="Ex: 3"
                          className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ borderColor: '#e5e7eb' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Dernier étage ?
                        </label>
                        <select
                          name="dernierEtage"
                          value={formData.dernierEtage}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ borderColor: '#e5e7eb' }}
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Ascenseur
                        </label>
                        <select
                          name="ascenseur"
                          value={formData.ascenseur}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ borderColor: '#e5e7eb' }}
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Extérieurs */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      7. Extérieurs
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    {['Balcon', 'Terrasse', 'Jardin', 'Aucun'].map((option) => (
                      <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.exterieur.includes(option) ? '#4682B4' : '#e5e7eb' }}>
                        <input
                          type="checkbox"
                          checked={formData.exterieur.includes(option)}
                          onChange={() => handleCheckboxChange('exterieur', option)}
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Champ conditionnel surface extérieure */}
                  {(formData.exterieur.includes('Balcon') || formData.exterieur.includes('Terrasse') || formData.exterieur.includes('Jardin')) && (
                    <div className="mt-4 transition-all duration-300 ease-in-out">
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Surface approximative de l'extérieur (facultatif)
                      </label>
                      <input
                        type="text"
                        name="surfaceExterieur"
                        value={formData.surfaceExterieur}
                        onChange={handleChange}
                        placeholder="Ex: 15 m²"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: '#e5e7eb' }}
                      />
                    </div>
                  )}
                </div>

                {/* 8. Stationnement */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      8. Stationnement
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    {['Aucun', 'Place de parking', 'Garage', 'Box'].map((option) => (
                      <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.stationnement === option ? '#4682B4' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="stationnement"
                          value={option}
                          checked={formData.stationnement === option}
                          onChange={handleChange}
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Champ conditionnel type de stationnement */}
                  {formData.stationnement && formData.stationnement !== 'Aucun' && (
                    <div className="mt-4 transition-all duration-300 ease-in-out">
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Stationnement couvert / extérieur (optionnel)
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {['Couvert', 'Extérieur'].map((option) => (
                          <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.stationnementType === option ? '#4682B4' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="stationnementType"
                              value={option}
                              checked={formData.stationnementType === option}
                              onChange={handleChange}
                              className="mr-2"
                              style={{ accentColor: '#4682B4' }}
                            />
                            <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ÉTAT & PRESTATIONS */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  ÉTAT & PRESTATIONS
                </h2>

                {/* 10. État général */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      10. État général du bien
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    {['À rénover', 'À rafraîchir', 'Bon état', 'Excellent état'].map((option) => (
                      <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.etatBien === option ? '#4682B4' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="etatBien"
                          value={option}
                          checked={formData.etatBien === option}
                          onChange={handleChange}
                          required
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 11. Travaux récents */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      11. Travaux récents
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Des travaux ont-ils été réalisés récemment ?
                    </label>
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="travauxRecents"
                          value="oui"
                          checked={formData.travauxRecents === 'oui'}
                          onChange={handleChange}
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Oui</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="travauxRecents"
                          value="non"
                          checked={formData.travauxRecents === 'non'}
                          onChange={handleChange}
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Non</span>
                      </label>
                    </div>
                    
                    {formData.travauxRecents === 'oui' && (
                      <div className="space-y-4 mt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            Nature des travaux
                          </label>
                          <input
                            type="text"
                            name="natureTravaux"
                            value={formData.natureTravaux}
                            onChange={handleChange}
                            placeholder="Ex: Rénovation complète, ravalement..."
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            style={{ borderColor: '#e5e7eb' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            Année approximative
                          </label>
                          <input
                            type="text"
                            name="anneeTravaux"
                            value={formData.anneeTravaux}
                            onChange={handleChange}
                            placeholder="Ex: 2023"
                              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              style={{ borderColor: '#e5e7eb' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            Montant total des travaux réalisés
                          </label>
                          <input
                            type="text"
                            name="montantTravaux"
                            value={formData.montantTravaux}
                            onChange={handleChange}
                            placeholder="Ex: 25 000 €"
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            style={{ borderColor: '#e5e7eb' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 12. Prestations principales */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      12. Prestations principales
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Double vitrage', 'Climatisation', 'Cuisine équipée', 'Cave', 'Local vélo', 'Cheminée'].map((option) => (
                      <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.prestations.includes(option) ? '#4682B4' : '#e5e7eb' }}>
                        <input
                          type="checkbox"
                          checked={formData.prestations.includes(option)}
                          onChange={() => handleCheckboxChange('prestations', option)}
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Bouton Autres prestations */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, showAutresPrestations: !formData.showAutresPrestations })}
                      className="text-sm text-gray-600 hover:text-gray-800 underline"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      {formData.showAutresPrestations ? 'Masquer' : 'Autres prestations'}
                    </button>
                  </div>
                  
                  {/* Liste masquée des autres prestations */}
                  {formData.showAutresPrestations && (
                    <div className="mt-4 transition-all duration-300 ease-in-out">
                      <div className="grid md:grid-cols-3 gap-4">
                        {['Ascenseur', 'Fibre optique', 'Volets roulants / électriques', 'Chauffage individuel / collectif', 'Chauffage au sol', 'Alarme', 'Porte blindée'].map((option) => (
                          <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.prestations.includes(option) ? '#4682B4' : '#e5e7eb' }}>
                            <input
                              type="checkbox"
                              checked={formData.prestations.includes(option)}
                              onChange={() => handleCheckboxChange('prestations', option)}
                              className="mr-2"
                              style={{ accentColor: '#4682B4' }}
                            />
                            <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Autres prestations
                    </label>
                    <input
                      type="text"
                      name="autresPrestations"
                      value={formData.autresPrestations}
                      onChange={handleChange}
                      placeholder="Précisez d'autres prestations..."
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>
              </div>

              {/* CONFORT & ENVIRONNEMENT */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  CONFORT & ENVIRONNEMENT
                </h2>

                {/* 13. Exposition */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      13. Exposition
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Exposition principale
                    </label>
                    <div className="grid md:grid-cols-5 gap-4">
                      {['Nord', 'Sud', 'Est', 'Ouest', 'Traversant'].map((option) => (
                        <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.exposition === option ? '#4682B4' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="exposition"
                            value={option}
                            checked={formData.exposition === option}
                            onChange={handleChange}
                            className="mr-2"
                            style={{ accentColor: '#4682B4' }}
                          />
                          <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 14. Vis-à-vis */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      14. Vis-à-vis
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Important', 'Modéré', 'Aucun'].map((option) => (
                      <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.visAVis === option ? '#4682B4' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="visAVis"
                          value={option}
                          checked={formData.visAVis === option}
                          onChange={handleChange}
                          className="mr-2"
                          style={{ accentColor: '#4682B4' }}
                        />
                        <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* PROJET DE VENTE */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  PROJET DE VENTE
                </h2>

                {/* 15. Délai de vente */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      15. Délai de vente souhaité
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Quand souhaitez-vous vendre ?
                    </label>
                    <div className="grid md:grid-cols-4 gap-4">
                      {['Moins de 3 mois', '3 à 6 mois', 'Plus de 6 mois', 'Je me renseigne'].map((option) => (
                        <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.delaiVente === option ? '#4682B4' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="delaiVente"
                            value={option}
                            checked={formData.delaiVente === option}
                            onChange={handleChange}
                            className="mr-2"
                            style={{ accentColor: '#4682B4' }}
                          />
                          <span className="text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 16. Situation actuelle */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      16. Situation actuelle
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Le bien est :
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {['Occupé', 'Libre', 'Loué'].map((option) => (
                        <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.situationActuelle === option ? '#4682B4' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="situationActuelle"
                            value={option}
                            checked={formData.situationActuelle === option}
                            onChange={handleChange}
                            className="mr-2"
                            style={{ accentColor: '#4682B4' }}
                          />
                          <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Champs conditionnels si "Loué" */}
                  {formData.situationActuelle === 'Loué' && (
                    <div className="mt-4 space-y-4 transition-all duration-300 ease-in-out">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Type de location (optionnel)
                        </label>
                        <div className="grid md:grid-cols-2 gap-4">
                          {['Nue', 'Meublée'].map((option) => (
                            <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-stone-50" style={{ borderColor: formData.typeLocation === option ? '#4682B4' : '#e5e7eb' }}>
                              <input
                                type="radio"
                                name="typeLocation"
                                value={option}
                                checked={formData.typeLocation === option}
                                onChange={handleChange}
                                className="mr-2"
                                style={{ accentColor: '#4682B4' }}
                              />
                              <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Loyer mensuel (optionnel)
                        </label>
                        <input
                          type="text"
                          name="loyerMensuel"
                          value={formData.loyerMensuel}
                          onChange={handleChange}
                          placeholder="Ex: 800 €"
                          className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ borderColor: '#e5e7eb' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 17. Prix envisagé */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      17. Prix envisagé
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Avez-vous une idée de prix ?
                    </label>
                    <input
                      type="text"
                      name="prixEnvisage"
                      value={formData.prixEnvisage}
                      onChange={handleChange}
                      placeholder="Ex: 350 000 €"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* 17b. Ajustement prix */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Si l'estimation proposée par le professionnel diffère du prix que vous aviez en tête, dans quelle mesure seriez-vous disposé(e) à ajuster le prix de votre bien ?
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>1</span>
                      <input
                        type="range"
                        name="ajustementPrix"
                        value={formData.ajustementPrix}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        step="1"
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          accentColor: '#4682B4'
                        }}
                      />
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>10</span>
                      {formData.ajustementPrix && (
                        <span className="text-lg font-semibold min-w-[2rem] text-center" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {formData.ajustementPrix}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span>Pas du tout</span>
                      <span>Très disposé(e)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MESSAGE FINAL */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  MESSAGE FINAL (TRÈS IMPORTANT)
                </h2>

                {/* 18. Message libre */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      18. Message libre
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Souhaitez-vous ajouter une information importante ?
                    </label>
                    <textarea
                      name="messageLibre"
                      value={formData.messageLibre}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Toute information complémentaire utile à l'analyse de votre bien (copropriété, vue, environnement, contexte particulier…)"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>
              </div>

              {/* ✅ VALIDATION */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {submitError}
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'white',
                    color: '#4682B4',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '1.125rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                      const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                      if (fill) {
                        fill.style.width = '100%'
                        fill.style.transform = 'translateX(-50%) scaleY(1)'
                      }
                      if (arrow) {
                        arrow.style.opacity = '1'
                        arrow.style.right = '-14px'
                      }
                      if (text) text.style.color = 'white'
                      if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                      const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                      const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                      const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                      if (fill) {
                        fill.style.width = '0%'
                        fill.style.transform = 'translateX(-50%) scaleY(0)'
                      }
                      if (arrow) {
                        arrow.style.opacity = '0'
                        arrow.style.right = '-30px'
                      }
                      if (text) text.style.color = '#4682B4'
                      if (textSpan) textSpan.style.transform = 'translateX(0)'
                    }
                  }}
                >
                  {/* Fond bleu qui se remplit */}
                  <span
                    className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                    style={{
                      width: '0%',
                      backgroundColor: '#4682B4',
                      transform: 'translateX(-50%) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                      zIndex: 1
                    }}
                  ></span>
                  
                  {/* Contenu du bouton */}
                  <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                    <span className="transition-transform duration-300">
                  {submitting ? 'Envoi en cours...' : 'Recevoir mon estimation personnalisée'}
                    </span>
                    {!submitting && (
                      <svg
                        className="button-arrow absolute w-5 h-5 transition-all duration-300"
                        style={{
                          opacity: 0,
                          right: '-30px',
                          transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </span>
                </button>
                
                <p className="text-xs text-gray-600 text-center mt-4 italic" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Chaque estimation est analysée manuellement.
                  <br />
                  Nous nous réservons le droit de refuser les biens dont le prix attendu n'est pas cohérent avec le marché.
                </p>
              </div>
            </form>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}

