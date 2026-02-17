'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createAnalyseLead } from '@/lib/firebase-admin'

const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }

export default function DevisPersonnalisePage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    typeBien: '',
    adresse: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await createAnalyseLead({
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        type_bien: formData.typeBien,
        localisation: formData.adresse,
        type_demande: 'devis_personnalise',
        status: 'nouveau',
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors duration-300 text-sm'
  const labelClass = 'block text-white/70 text-sm font-medium mb-2'
  const selectClass = 'w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors duration-300 text-sm appearance-none'

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* Hero + Formulaire */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/herosectionimage.png)' }}
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto">
          {/* Titre */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-white mb-4"
              style={fontStyle}
            >
              Devis Personnalisé
            </h1>
            <p className="text-sm sm:text-base text-white/50" style={fontStyle}>
              Votre bien est atypique ou d&apos;exception ? Recevez une proposition sur mesure.
            </p>
          </div>

          {/* Formulaire ou confirmation */}
          {submitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 sm:p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-white mb-3 uppercase" style={fontStyle}>
                Demande envoyée
              </h2>
              <p className="text-white/50 text-sm mb-8" style={fontStyle}>
                Nous avons bien reçu votre demande de devis personnalisé. Nous reviendrons vers vous dans les meilleurs délais.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 border border-white/60 rounded-lg text-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300"
                style={fontStyle}
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 sm:p-10 space-y-5">
              {/* Prénom / Nom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={fontStyle}>Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Votre prénom"
                    className={inputClass}
                    style={fontStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={fontStyle}>Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className={inputClass}
                    style={fontStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} style={fontStyle}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  className={inputClass}
                  style={fontStyle}
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className={labelClass} style={fontStyle}>Téléphone *</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  placeholder="06 00 00 00 00"
                  className={inputClass}
                  style={fontStyle}
                />
              </div>

              {/* Type de bien */}
              <div>
                <label className={labelClass} style={fontStyle}>Type de bien *</label>
                <select
                  name="typeBien"
                  value={formData.typeBien}
                  onChange={handleChange}
                  required
                  className={selectClass}
                  style={fontStyle}
                >
                  <option value="" disabled className="bg-black text-white/50">Sélectionnez un type de bien</option>
                  <option value="Château" className="bg-black text-white">Château</option>
                  <option value="Propriété" className="bg-black text-white">Propriété</option>
                  <option value="Bastide" className="bg-black text-white">Bastide</option>
                  <option value="Mas" className="bg-black text-white">Mas</option>
                  <option value="Ferme" className="bg-black text-white">Ferme</option>
                </select>
              </div>

              {/* Adresse du bien */}
              <div>
                <label className={labelClass} style={fontStyle}>Adresse du bien *</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                  placeholder="Adresse ou localisation du bien"
                  className={inputClass}
                  style={fontStyle}
                />
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                style={fontStyle}
              >
                {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-6" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/70 uppercase tracking-wider mb-3" style={fontStyle}>
            2026 — L&apos;AGENCE YL
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/mentions-legales" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={fontStyle}>
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={fontStyle}>
              Politique de confidentialité
            </Link>
            <Link href="/honoraires" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={fontStyle}>
              Frais d&apos;Agence
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
