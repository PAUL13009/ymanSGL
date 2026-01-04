'use client'

import { useState } from 'react'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import { supabase } from '@/lib/supabase'

export default function LocationSection() {
  const containerRef = null
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    pays: '',
    projet: '',
    contactMethod: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, contactMethod: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      // Insérer le message dans la base de données
      console.log('Inserting message:', formData)
      const { data: insertedData, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            nom: formData.nom,
            prenom: formData.prenom || null,
            email: formData.email,
            telephone: formData.telephone || null,
            pays: formData.pays || null,
            projet: formData.projet || null,
            contact_method: formData.contactMethod
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de l\'insertion du message:', error)
        console.error('Détails:', JSON.stringify(error, null, 2))
        throw error
      }

      console.log('Message inséré avec succès:', insertedData)

      // Appeler la Edge Function pour envoyer l'email
      console.log('Calling Edge Function with data:', insertedData)
      try {
        const { data: functionData, error: functionError } = await supabase.functions.invoke('send-contact-email', {
          body: {
            record: {
              id: insertedData.id,
              nom: insertedData.nom,
              prenom: insertedData.prenom,
              email: insertedData.email,
              telephone: insertedData.telephone,
              pays: insertedData.pays,
              projet: insertedData.projet,
              contact_method: insertedData.contact_method,
              created_at: insertedData.created_at
            }
          }
        })

        if (functionError) {
          console.error('Erreur lors de l\'envoi de l\'email:', functionError)
          console.error('Détails de l\'erreur:', JSON.stringify(functionError, null, 2))
        } else {
          console.log('Email envoyé avec succès:', functionData)
        }
      } catch (emailError: any) {
        console.error('Erreur lors de l\'appel de la fonction email:', emailError)
        console.error('Stack trace:', emailError.stack)
        // On continue même si l'email échoue
      }

      setSubmitSuccess(true)
      // Réinitialiser le formulaire après soumission
      setFormData({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        pays: '',
        projet: '',
        contactMethod: ''
      })

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="pt-20 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre de la section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 max-w-4xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="Évaluons ensemble la faisabilité de votre projet"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 700"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>

          {/* Messages de succès/erreur */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
              <p style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.
              </p>
            </div>
          )}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
              <p style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {submitError}
              </p>
            </div>
          )}

          {/* Carte Google Maps et Informations */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Carte Google Maps - Colonne de gauche */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps?q=142+Boulevard+Notre+Dame,+13008+Marseille,+France&output=embed"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            {/* Colonne de droite - Formulaire de contact */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Champs du formulaire */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Nom et prénom */}
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium mb-3 text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Nom et prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      className="w-full bg-transparent border-0 border-b focus:outline-none transition-colors pb-2 text-gray-800 disabled:opacity-50"
                      style={{ borderColor: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Adresse email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      className="w-full bg-transparent border-0 border-b focus:outline-none transition-colors pb-2 text-gray-800 disabled:opacity-50"
                      style={{ borderColor: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                    />
                      </div>

                  {/* Téléphone */}
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium mb-3 text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full bg-transparent border-0 border-b focus:outline-none transition-colors pb-2 text-gray-800 disabled:opacity-50"
                      style={{ borderColor: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                    />
                    </div>

                  {/* Pays de résidence */}
                  <div>
                    <label htmlFor="pays" className="block text-sm font-medium mb-3 text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Pays de résidence
                    </label>
                    <input
                      type="text"
                      id="pays"
                      name="pays"
                      value={formData.pays}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full bg-transparent border-0 border-b focus:outline-none transition-colors pb-2 text-gray-800 disabled:opacity-50"
                      style={{ borderColor: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                    />
                  </div>
              </div>

                {/* Description du projet */}
              <div>
                  <label htmlFor="projet" className="block text-sm font-medium mb-3 text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Décrivez votre projet
                  </label>
                  <textarea
                    id="projet"
                    name="projet"
                    value={formData.projet}
                    onChange={handleInputChange}
                    rows={5}
                    disabled={submitting}
                    className="w-full bg-transparent border-0 border-b focus:outline-none transition-colors pb-2 resize-none text-gray-800 disabled:opacity-50"
                    style={{ borderColor: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Méthode de contact préférée */}
                <div className="pt-4">
                  <p className="text-xs mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Sélectionnez autant que nécessaire
                  </p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Je préfère être contacté par <span className="text-red-500">*</span>
                      </p>
                      <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="telephone-whatsapp"
                            checked={formData.contactMethod === 'telephone-whatsapp'}
                            onChange={handleRadioChange}
                            required
                            disabled={submitting}
                            className="w-4 h-4"
                            style={{ accentColor: '#4682B4' }}
                          />
                          <span className="text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            Via Téléphone/WhatsApp
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleRadioChange}
                            required
                            disabled={submitting}
                            className="w-4 h-4"
                            style={{ accentColor: '#4682B4' }}
                          />
                          <span className="text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                            Via Mail
                          </span>
                        </label>
                      </div>
                    </div>
                    {/* Bouton de soumission */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="text-lg font-semibold transition-all hover:opacity-80 hover:scale-105 hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      {submitting ? 'Envoi...' : 'CONTINUER'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

