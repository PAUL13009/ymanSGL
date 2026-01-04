'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'
import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

export default function EstimationEtape2Page() {
  const router = useRouter()
  const [etape1Data, setEtape1Data] = useState<any>(null)
  const [formData, setFormData] = useState({
    // 6️⃣ Composition
    nombrePieces: '',
    nombreChambres: '',
    
    // 7️⃣ Étage & accès
    etage: '',
    dernierEtage: '',
    ascenseur: '',
    
    // 8️⃣ Extérieurs
    exterieur: [] as string[],
    
    // 9️⃣ Stationnement
    stationnement: '',
    
    // 🔟 État général
    etatBien: '',
    
    // 1️⃣1️⃣ Travaux récents
    travauxRecents: '',
    natureTravaux: '',
    anneeTravaux: '',
    
    // 1️⃣2️⃣ Prestations
    prestations: [] as string[],
    autresPrestations: '',
    
    // 1️⃣3️⃣ Exposition
    exposition: '',
    
    // 1️⃣4️⃣ Vis-à-vis
    visAVis: '',
    
    // 1️⃣6️⃣ Délai de vente
    delaiVente: '',
    
    // 1️⃣7️⃣ Situation actuelle
    situationActuelle: '',
    
    // 1️⃣8️⃣ Prix envisagé
    prixEnvisage: '',
    
    // 1️⃣9️⃣ Message libre
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
      // Préparer les données complètes pour Supabase avec conversion des types
      const completeData: any = {
        // Données étape 1
        localisation: etape1Data.localisation,
        type_bien: etape1Data.typeBien,
        surface: etape1Data.surface || null,
        description_initiale: etape1Data.description || null,
        prenom: etape1Data.prenom,
        telephone: etape1Data.telephone,
        email: etape1Data.email,
        
        // Données étape 2 - Conversion des types
        nombre_pieces: formData.nombrePieces ? parseInt(formData.nombrePieces) : null,
        nombre_chambres: formData.nombreChambres ? parseInt(formData.nombreChambres) : null,
        etage: formData.etage ? parseInt(formData.etage) : null,
        dernier_etage: formData.dernierEtage === 'oui' ? true : formData.dernierEtage === 'non' ? false : null,
        ascenseur: formData.ascenseur === 'oui' ? true : formData.ascenseur === 'non' ? false : null,
        exterieurs: formData.exterieur.length > 0 ? formData.exterieur : null,
        stationnement: formData.stationnement || null,
        etat_bien: formData.etatBien || null,
        travaux_recents: formData.travauxRecents === 'oui' ? true : formData.travauxRecents === 'non' ? false : null,
        nature_travaux: formData.natureTravaux || null,
        annee_travaux: formData.anneeTravaux ? parseInt(formData.anneeTravaux) : null,
        prestations: formData.prestations.length > 0 ? formData.prestations : null,
        autres_prestations: formData.autresPrestations || null,
        exposition: formData.exposition || null,
        vis_a_vis: formData.visAVis || null,
        delai_vente: formData.delaiVente || null,
        situation_actuelle: formData.situationActuelle || null,
        prix_envisage: formData.prixEnvisage || null,
        message_libre: formData.messageLibre || null,
        
        // Métadonnées
        type_demande: 'estimation',
        // Champs obligatoires de la table (valeurs par défaut pour les estimations)
        maturite: 'estimation', // Champ NOT NULL de la table originale
        ajustement_prix: 'oui', // Champ NOT NULL de la table originale
        motivation: `Estimation détaillée demandée. ${formData.messageLibre || 'Demande d\'estimation immobilière.'}`, // Champ NOT NULL de la table originale
        status: 'nouveau'
      }

      // Enregistrer dans Supabase
      console.log('Envoi des données vers Supabase...', completeData)
      
      // Vérifier que tous les champs NOT NULL sont présents
      const requiredFields = ['localisation', 'type_bien', 'maturite', 'ajustement_prix', 'motivation', 'prenom', 'telephone', 'email']
      const missingFields = requiredFields.filter(field => !completeData[field])
      if (missingFields.length > 0) {
        console.error('Champs manquants:', missingFields)
        setSubmitError(`Des champs obligatoires sont manquants: ${missingFields.join(', ')}`)
        setSubmitting(false)
        return
      }
      
      // S'assurer qu'on n'utilise pas de session authentifiée
      // En se déconnectant d'abord si une session existe
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        console.log('Session détectée, déconnexion pour utiliser le rôle anon...')
        await supabase.auth.signOut()
      }
      
      // Créer un client Supabase frais pour cette requête (sans session)
      // Cela force l'utilisation du rôle 'anon' au lieu d'une session authentifiée
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Variables d\'environnement Supabase manquantes')
      }
      
      const freshSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        },
        global: {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        }
      })
      
      console.log('Tentative d\'insertion avec client Supabase frais (rôle anon)...')
      
      const { data, error } = await freshSupabase
        .from('analyse_leads')
        .insert([completeData])
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de l\'enregistrement:', error)
        console.error('Détails de l\'erreur:', JSON.stringify(error, null, 2))
        
        // Message d'erreur plus détaillé
        let errorMessage = 'Une erreur est survenue lors de l\'enregistrement.'
        if (error.code === '42501') {
          errorMessage = 'Erreur de permissions. Veuillez contacter l\'administrateur.'
        } else if (error.code === '23502') {
          errorMessage = 'Des champs obligatoires sont manquants. Veuillez vérifier le formulaire.'
        } else if (error.message) {
          errorMessage = `Erreur: ${error.message}`
        }
        
        setSubmitError(errorMessage)
        setSubmitting(false)
        return
      }

      // Vérifier que les données ont bien été enregistrées
      if (!data) {
        throw new Error('Aucune donnée retournée par Supabase')
      }

      console.log('✅ Données enregistrées avec succès:', data)

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
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-light" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  ÉTAPE 2
                </span>
                <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  —
                </span>
                <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Affinage de l'estimation (Précision max)
                </span>
              </div>
              <p className="text-sm text-gray-600 italic" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                👉 Page suivante uniquement • 👉 Là, on devient chirurgical
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8">
              {/* 🏠 CARACTÉRISTIQUES DU BIEN */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  🏠 CARACTÉRISTIQUES DU BIEN
                </h2>

                {/* 6️⃣ Composition */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      6️⃣ Composition
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                </div>

                {/* 7️⃣ Étage & accès */}
                {etape1Data.typeBien === 'Appartement' && (
                  <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                        7️⃣ Étage & accès
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

                {/* 8️⃣ Extérieurs */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      8️⃣ Extérieurs
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
                </div>

                {/* 9️⃣ Stationnement */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      9️⃣ Stationnement
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
                </div>
              </div>

              {/* 🏗️ ÉTAT & PRESTATIONS */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  🏗️ ÉTAT & PRESTATIONS
                </h2>

                {/* 🔟 État général */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      🔟 État général du bien
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

                {/* 1️⃣1️⃣ Travaux récents */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣1️⃣ Travaux récents
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
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
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
                    )}
                  </div>
                </div>

                {/* 1️⃣2️⃣ Prestations */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣2️⃣ Prestations
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

              {/* 🌞 CONFORT & ENVIRONNEMENT */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  🌞 CONFORT & ENVIRONNEMENT
                </h2>

                {/* 1️⃣3️⃣ Exposition */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣3️⃣ Exposition
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

                {/* 1️⃣4️⃣ Vis-à-vis */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣4️⃣ Vis-à-vis
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

              {/* 📊 PROJET DE VENTE */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  📊 PROJET DE VENTE (ULTRA QUALIFICATION)
                </h2>

                {/* 1️⃣5️⃣ Délai de vente */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣5️⃣ Délai de vente souhaité
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

                {/* 1️⃣6️⃣ Situation actuelle */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣6️⃣ Situation actuelle
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
                </div>

                {/* 1️⃣7️⃣ Prix envisagé */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣7️⃣ Prix envisagé (OPTIONNEL mais puissant)
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
                    <p className="text-xs text-gray-600 italic mt-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      ➡️ Champ clé pour détecter : vendeurs réalistes • vendeurs hors marché
                    </p>
                  </div>
                </div>
              </div>

              {/* 🧠 MESSAGE FINAL */}
              <div className="space-y-6 pb-6 border-b-2" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  🧠 MESSAGE FINAL (TRÈS IMPORTANT)
                </h2>

                {/* 1️⃣8️⃣ Message libre */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1️⃣8️⃣ Message libre
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
                      placeholder="Toute information supplémentaire qui pourrait être utile pour l'estimation..."
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
                  className="w-full px-8 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#4682B4',
                    color: 'white',
                    fontFamily: 'var(--font-poppins), sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.backgroundColor = '#3a6a8f'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.backgroundColor = '#4682B4'
                    }
                  }}
                >
                  {submitting ? 'Envoi en cours...' : 'Recevoir mon estimation personnalisée'}
                </button>
                
                <p className="text-xs text-gray-600 text-center mt-4 italic" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  📌 Chaque estimation est analysée manuellement.
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

