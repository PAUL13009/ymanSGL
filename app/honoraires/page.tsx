'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function HonorairesPage() {
  const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }

  return (
    <main className="min-h-screen bg-black" role="main">
      <Navbar />
      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-12" style={fontStyle}>
            Frais d&apos;Agence
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80 text-base leading-relaxed" style={fontStyle}>
            <p>
              L&apos;Agence Y L applique des honoraires transparents et conformes aux usages du marché immobilier. Les conditions tarifaires vous sont communiquées lors de la signature du mandat de vente ou de location.
            </p>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Vente immobilière</h2>
              <p>
                Les honoraires d&apos;agence sont fixés librement entre les parties, conformément à la loi n° 2014-366 du 24 mars 2014 (loi ALUR). Le montant et les modalités sont précisés dans le mandat de vente signé avec l&apos;agence.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Estimations</h2>
              <p>
                Le montant des rapports d&apos;estimation (Essentielle, Urbain, Investissement, Professionnels du droit) est intégralement déductible des honoraires en cas de signature d&apos;un mandat exclusif confié à L&apos;Agence Y L.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Contact</h2>
              <p>
                Pour toute question relative aux honoraires ou aux conditions tarifaires, vous pouvez nous contacter :
              </p>
              <p className="mt-4">Paul Nogaro</p>
              <p>E-mail : paul.nogaro@gmail.com</p>
              <p>Téléphone : 06 95 10 77 10</p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <Link href="/" className="text-white/70 hover:text-white text-sm uppercase tracking-wider transition-colors" style={fontStyle}>
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>

      <footer className="relative z-10 bg-black py-6 border-t border-white/10" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/70 uppercase tracking-wider mb-3" style={fontStyle}>2026 — L&apos;AGENCE Y L</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/mentions-legales" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors" style={fontStyle}>Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors" style={fontStyle}>Politique de confidentialité</Link>
            <Link href="/honoraires" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors" style={fontStyle}>Frais d&apos;Agence</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
