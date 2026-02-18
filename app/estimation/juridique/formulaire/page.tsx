'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAnalyseLead } from '@/lib/firebase-admin'

export default function EstimationJuridiqueFormulairePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    professionJuridique: '',
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    nomDossier: '',
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

    if (!formData.prenom || !formData.nom || !formData.telephone || !formData.email) {
      setSubmitError('Veuillez remplir tous les champs obligatoires.')
      setSubmitting(false)
      return
    }

    try {
      // Envoyer les données partielles à Firebase
      await createAnalyseLead({
        prenom: formData.prenom,
        nom: formData.nom,
        telephone: formData.telephone,
        email: formData.email,
        nom_dossier: formData.nomDossier || null,
        profession_juridique: formData.professionJuridique || null,
        type_demande: 'estimation_partielle_juridique',
        status: 'nouveau'
      })

      // Sauvegarder en sessionStorage pour l'étape 2
      sessionStorage.setItem('estimation_juridique_etape1', JSON.stringify(formData))
      router.push('/estimation/juridique/formulaire/etape-2')
    } catch (error: any) {
      console.error('Erreur:', error)
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Estimation Activités juridiques
          </h1>
          <p className="text-white/50 text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Étape 1 / 2 — Vos coordonnées
          </p>
          <p className="text-white text-base mt-6 max-w-lg mx-auto leading-relaxed font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Afin de maximiser la précision de l&apos;estimation de la valeur de votre bien, veuillez préparer s&apos;il vous plaît des photos de votre bien.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profession */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Profession
            </label>
            <select
              name="professionJuridique"
              value={formData.professionJuridique}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              <option value="" className="bg-black text-white">Sélectionnez...</option>
              <option value="Notaire" className="bg-black text-white">Notaire</option>
              <option value="Avocat" className="bg-black text-white">Avocat</option>
              <option value="Expert-comptable" className="bg-black text-white">Expert-comptable</option>
              <option value="Administrateur judiciaire" className="bg-black text-white">Administrateur judiciaire</option>
              <option value="Autres" className="bg-black text-white">Autres</option>
            </select>
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Prénom *
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              placeholder="Votre prénom"
              className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            />
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Nom *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Téléphone *
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre.email@exemple.com"
              className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            />
          </div>

          {/* Nom du dossier */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Nom du dossier
            </label>
            <input
              type="text"
              name="nomDossier"
              value={formData.nomDossier}
              onChange={handleChange}
              placeholder="Ex: Succession Dupont, Divorce Martin..."
              className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            />
          </div>

          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
              {submitError}
            </div>
          )}

          {/* CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-8 py-4 rounded-full font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide mt-4"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '1rem',
            }}
          >
            {submitting ? 'Envoi en cours...' : 'Continuer'}
          </button>
        </form>
      </div>
    </main>
  )
}
