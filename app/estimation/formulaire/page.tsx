'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'
// Migration vers Firebase - plus besoin d'import Supabase

export default function EstimationFormulairePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    prenom: '',
    telephone: '',
    email: '',
    localisation: '',
    typeBien: '',
    surface: '',
    surfaceTerrain: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    if (!formData.prenom || !formData.telephone || !formData.email || !formData.localisation || !formData.typeBien || !formData.surface) {
      setSubmitError('Veuillez remplir tous les champs obligatoires.')
      setSubmitting(false)
      return
    }

    try {
      // Sauvegarder les données de l'étape 1 dans sessionStorage pour les passer à l'étape 2
      sessionStorage.setItem('estimation_etape1', JSON.stringify(formData))
      
      // Redirection vers l'étape 2
      router.push('/estimation/formulaire/etape-2')
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
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Demander une estimation immobilière gratuite
              </h1>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0}
                >
                  <p>
                    L'estimation peut être réalisée :
                  </p>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.1}
                >
                  <ul className="list-disc list-inside space-y-2 text-left max-w-xl mx-auto">
                    <li>en ligne, à partir des informations et des photos de votre bien,</li>
                    <li>ou sur place, si la configuration du bien le nécessite.</li>
                  </ul>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.2}
                >
                  <p className="font-semibold mt-4" style={{ color: '#4682B4' }}>
                    Merci de fournir des informations précises.
                    <br />
                    Elles conditionnent la qualité et la fiabilité de l'estimation.
                  </p>
                </AnimatedContent>
              </div>
            </div>

            {/* Formulaire - ÉTAPE 1 */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-10">
              {/* En-tête ÉTAPE 1 */}
              <div className="mb-8 pb-6 border-b-2" style={{ borderColor: '#4682B4' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-light" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    ÉTAPE 1
                  </span>
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    —
                  </span>
                  <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Prise de contact & Identification du bien
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* 1. Coordonnées */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      1. Coordonnées
                    </span>
                  </div>
                  
                  {/* Prénom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre.email@exemple.com"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* 2. Localisation */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      2. Localisation
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Adresse du bien ou quartier *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="localisation"
                        value={formData.localisation}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Vauban, 6ᵉ arrondissement, ou adresse complète"
                        list="localisation-suggestions"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: '#e5e7eb' }}
                      />
                      <datalist id="localisation-suggestions">
                        <option value="Vauban (6ᵉ arrondissement)" />
                        <option value="6ᵉ arrondissement" />
                        <option value="Quartiers centraux de Marseille" />
                        <option value="Autre secteur de Marseille" />
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* 3. Type de bien */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      3. Type de bien
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Type de bien *
                    </label>
                    <select
                      name="typeBien"
                      value={formData.typeBien}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="Appartement">Appartement</option>
                      <option value="Maison">Maison</option>
                      <option value="Loft">Loft</option>
                      <option value="Immeuble">Immeuble</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                {/* 4. Surface */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      4. Surface
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Surface habitable (m²) *
                    </label>
                    <input
                      type="number"
                      name="surface"
                      value={formData.surface}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="Ex: 75"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                  
                  {formData.typeBien === 'Maison' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Surface du terrain (m²)
                      </label>
                      <input
                        type="number"
                        name="surfaceTerrain"
                        value={formData.surfaceTerrain}
                        onChange={handleChange}
                        min="1"
                        placeholder="Ex: 200"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: '#e5e7eb' }}
                      />
                    </div>
                  )}
                </div>

                {/* 5. Description libre (TRÈS IMPORTANT) */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      5. Description libre
                    </span>
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#4682B4', color: 'white', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      TRÈS IMPORTANT
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Description du bien
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="État général, points forts, contraintes éventuelles, travaux à prévoir…"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {submitError}
                  </div>
                )}

                {/* CTA ÉTAPE 1 */}
                <div className="pt-6 border-t-2" style={{ borderColor: '#4682B4' }}>
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
                        {submitting ? 'Envoi en cours...' : 'Recevoir une estimation réaliste'}
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
                </div>
              </div>
            </form>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}

