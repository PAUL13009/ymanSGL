'use client'

import { useState, useEffect } from 'react'
import { signInAdmin } from '@/lib/firebase-auth'

const f = { fontFamily: 'var(--font-poppins), sans-serif' }

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await signInAdmin(email, password)

      if (!user) {
        throw new Error('Aucune session créée')
      }

      window.location.href = '/admin/dashboard'
    } catch (error: any) {
      let errorMessage = 'Erreur de connexion'
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Aucun compte trouvé avec cet email'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Mot de passe incorrect'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email invalide'
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Ce compte a été désactivé'
      } else if (error.message) {
        errorMessage = error.message
      }
      setError(errorMessage)
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/50 text-sm" style={f}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest" style={f}>
            Espace Admin
          </h1>
          <p className="text-white/40 text-sm mt-2" style={f}>L&apos;Agence YL</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm" style={f}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2" style={f}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none transition-all text-sm"
                style={f}
                placeholder="admin@agence-yl.fr"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2" style={f}>
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none transition-all text-sm"
                style={f}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-white text-black rounded-lg font-semibold uppercase tracking-wider text-sm hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={f}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span>
                  Connexion...
                </span>
              ) : 'Se connecter'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6" style={f}>
          Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  )
}
