'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VariableProximity from '@/components/VariableProximity'
import FadeContent from '@/components/FadeContent'

export default function AnalysePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    localisation: '',
    typeBien: '',
    maturite: '',
    ajustementPrix: '',
    motivation: '',
    prenom: '',
    telephone: '',
    email: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    // Validation
    if (!formData.localisation || !formData.typeBien || !formData.maturite || !formData.ajustementPrix || !formData.motivation || !formData.prenom || !formData.telephone || !formData.email) {
      setSubmitError('Veuillez remplir tous les champs obligatoires.')
      setSubmitting(false)
      return
    }

    try {
      // Enregistrer les données dans Supabase
      const { data, error } = await supabase
        .from('analyse_leads')
        .insert([
          {
            localisation: formData.localisation,
            type_bien: formData.typeBien,
            maturite: formData.maturite,
            ajustement_prix: formData.ajustementPrix,
            motivation: formData.motivation,
            prenom: formData.prenom,
            telephone: formData.telephone,
            email: formData.email
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de l\'enregistrement:', error)
        throw error
      }

      // Redirection vers la page de confirmation
      router.push('/analyse/confirmation')
    } catch (error: any) {
      console.error('Erreur:', error)
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Titre et sous-titre */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Analyse de valeur réaliste de votre bien
              </h1>
              <p className="text-lg md:text-xl text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette analyse est réservée aux vendeurs prêts à vendre au prix du marché.
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8">
              {/* Question 1 - Localisation */}
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Où se situe votre bien ?
                </label>
                <div className="space-y-3">
                  {['Vauban (6ᵉ)', 'Autre quartier du 6ᵉ', 'Quartiers centraux de Marseille', 'Autre secteur'].map((option) => (
                    <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors" style={{ borderColor: formData.localisation === option ? '#4682B4' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        name="localisation"
                        value={option}
                        checked={formData.localisation === option}
                        onChange={handleChange}
                        className="mr-3"
                        style={{ accentColor: '#4682B4' }}
                        required
                      />
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 2 - Type de bien */}
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Quel type de bien souhaitez-vous vendre ?
                </label>
                <div className="space-y-3">
                  {['Appartement', 'Maison', 'Autre'].map((option) => (
                    <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors" style={{ borderColor: formData.typeBien === option ? '#4682B4' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        name="typeBien"
                        value={option}
                        checked={formData.typeBien === option}
                        onChange={handleChange}
                        className="mr-3"
                        style={{ accentColor: '#4682B4' }}
                        required
                      />
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 3 - Maturité */}
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  À quel stade en êtes-vous dans votre projet de vente ?
                </label>
                <div className="space-y-3">
                  {['Je souhaite vendre dans les 3 mois', 'Je souhaite vendre dans les 6 mois', 'Je me renseigne, sans échéance précise'].map((option) => (
                    <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors" style={{ borderColor: formData.maturite === option ? '#4682B4' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        name="maturite"
                        value={option}
                        checked={formData.maturite === option}
                        onChange={handleChange}
                        className="mr-3"
                        style={{ accentColor: '#4682B4' }}
                        required
                      />
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 4 - Ajustement prix */}
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Êtes-vous prêt à ajuster votre prix si l'analyse montre qu'il n'est pas cohérent avec le marché ?
                </label>
                <div className="space-y-3">
                  {['Oui', 'Non', 'Je souhaite en discuter sur la base d\'éléments concrets'].map((option) => (
                    <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors" style={{ borderColor: formData.ajustementPrix === option ? '#4682B4' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        name="ajustementPrix"
                        value={option}
                        checked={formData.ajustementPrix === option}
                        onChange={handleChange}
                        className="mr-3"
                        style={{ accentColor: '#4682B4' }}
                        required
                      />
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 5 - Motivation */}
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Quelle est la raison principale de votre vente ?
                </label>
                <div className="space-y-3">
                  {['Projet de vie / changement de situation', 'Achat d\'un autre bien', 'Contraintes personnelles ou professionnelles', 'Autre'].map((option) => (
                    <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors" style={{ borderColor: formData.motivation === option ? '#4682B4' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        name="motivation"
                        value={option}
                        checked={formData.motivation === option}
                        onChange={handleChange}
                        className="mr-3"
                        style={{ accentColor: '#4682B4' }}
                        required
                      />
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 6 - Contact */}
              <div className="space-y-6 pt-4 border-t-2" style={{ borderColor: '#e5e7eb' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Vos coordonnées
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                    style={{ borderColor: '#e5e7eb', fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                    style={{ borderColor: '#e5e7eb', fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                    style={{ borderColor: '#e5e7eb', fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>
              </div>

              {/* Message avant le bouton */}
              <div className="bg-blue-50 border-2 rounded-lg p-6" style={{ borderColor: '#4682B4' }}>
                <p className="text-sm md:text-base text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Les demandes sont analysées manuellement.
                  <br />
                  Nous revenons uniquement vers les projets correspondant à notre approche.
                </p>
              </div>

              {/* Message d'erreur */}
              {submitError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {submitError}
                  </p>
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: submitting ? '#9ca3af' : '#4682B4',
                  color: 'white',
                  fontFamily: 'var(--font-poppins), sans-serif'
                }}
              >
                {submitting ? 'Traitement...' : 'Soumettre ma demande d\'analyse'}
              </button>
            </form>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}

