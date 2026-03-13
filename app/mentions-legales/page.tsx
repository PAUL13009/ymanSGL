'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function MentionsLegalesPage() {
  const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }

  return (
    <main className="min-h-screen bg-black" role="main">
      <Navbar />
      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-12" style={fontStyle}>
            Mentions légales
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80 text-base leading-relaxed" style={fontStyle}>
            <p>
              Conformément aux articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie numérique (LCEN), les informations suivantes sont portées à la connaissance des utilisateurs du site lagenceyl.fr :
            </p>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Éditeur du site</h2>
              <p>Le site lagenceyl.fr est édité par :</p>
              <p className="mt-2">Paul Nogaro</p>
              <p>Adresse e-mail : paul.nogaro@gmail.com</p>
              <p>Téléphone : 06 95 10 77 10</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Hébergement du site</h2>
              <p>Le site est hébergé par :</p>
              <p className="mt-2">Vercel</p>
              <p>201 Mission St #300, San Francisco, CA 94105</p>
              <p>Site : www.vercel.com</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes, visuels, logo, graphismes, etc.) est la propriété exclusive de L&apos;Agence Y L, sauf mention contraire, et est protégé par le droit de la propriété intellectuelle.
              </p>
              <p className="mt-4">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite préalable de L&apos;Agence Y L.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Responsabilité</h2>
              <p>
                L&apos;éditeur s&apos;efforce de fournir sur le site lagenceyl.fr des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes ou des carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait de tiers partenaires.
              </p>
              <p className="mt-4">
                L&apos;utilisateur reste seul responsable de l&apos;utilisation qu&apos;il fait du contenu du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Données personnelles</h2>
              <p>
                Les informations personnelles collectées via les formulaires (nom, e-mail, téléphone, etc.) sont strictement destinées à répondre aux demandes de l&apos;utilisateur ou à assurer la bonne gestion des relations commerciales.
              </p>
              <p className="mt-4">
                Ces données ne sont ni revendues ni communiquées à des tiers, et sont conservées uniquement pendant la durée nécessaire au traitement de la demande ou à la bonne conduite des affaires.
              </p>
              <p className="mt-4">
                Conformément à la loi Informatique et Libertés et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de vos données personnelles.
              </p>
              <p className="mt-4">
                Pour exercer ce droit, vous pouvez adresser un e-mail à : paul.nogaro@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Cookies</h2>
              <p>
                Le site peut être amené à utiliser des cookies pour améliorer l&apos;expérience utilisateur.
              </p>
              <p className="mt-4">
                L&apos;utilisateur peut configurer son navigateur pour refuser les cookies ou être alerté lorsqu&apos;un cookie est installé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">Droit applicable</h2>
              <p>
                Le site est soumis au droit français.
              </p>
              <p className="mt-4">
                En cas de litige, la juridiction compétente sera celle du ressort du siège social de l&apos;éditeur, sauf disposition légale contraire.
              </p>
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
