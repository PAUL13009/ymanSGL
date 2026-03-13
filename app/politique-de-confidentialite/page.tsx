'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function PolitiqueConfidentialitePage() {
  const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }

  return (
    <main className="min-h-screen bg-black" role="main">
      <Navbar />
      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-4" style={fontStyle}>
            Politique de confidentialité
          </h1>
          <p className="text-white/50 text-sm mb-12" style={fontStyle}>Dernière mise à jour : 11 mars 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80 text-base leading-relaxed" style={fontStyle}>
            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">1. Préambule</h2>
              <p>
                La présente politique de confidentialité a pour objectif d&apos;informer les utilisateurs du site lagenceyl.fr sur la manière dont leurs données personnelles sont collectées, traitées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">2. Identité du responsable du traitement</h2>
              <p>Le responsable du traitement des données est :</p>
              <p className="mt-2">Paul Nogaro</p>
              <p>Adresse e-mail : paul.nogaro@gmail.com</p>
              <p>Téléphone : 06 95 10 77 10</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">3. Données collectées</h2>
              <p>Le site peut collecter les données suivantes :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone</li>
                <li>Nom de l&apos;entreprise</li>
                <li>Message libre via les formulaires d&apos;estimation et de contact</li>
              </ul>
              <p className="mt-4">
                Ces données sont fournies volontairement par l&apos;utilisateur lors de l&apos;envoi d&apos;un message via un formulaire ou par e-mail.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">4. Finalité du traitement</h2>
              <p>Les données collectées sont exclusivement utilisées pour :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Répondre aux demandes de contact ou d&apos;information</li>
                <li>Échanger dans le cadre d&apos;une relation commerciale ou précontractuelle</li>
                <li>Gérer le suivi des projets ou demandes en cours</li>
              </ul>
              <p className="mt-4">
                Aucune donnée n&apos;est utilisée à des fins commerciales ou publicitaires sans consentement préalable explicite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">5. Durée de conservation</h2>
              <p>
                Les données personnelles sont conservées uniquement pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées.
              </p>
              <p className="mt-4">
                En l&apos;absence de relation commerciale, les données sont supprimées dans un délai maximum de 12 mois après le dernier contact.
              </p>
              <p className="mt-4">
                En cas de relation commerciale, les données peuvent être conservées plus longtemps conformément aux obligations comptables ou juridiques applicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">6. Destinataires des données</h2>
              <p>
                Les données sont strictement confidentielles et ne sont jamais transmises à des tiers sans consentement, sauf obligation légale ou réglementaire.
              </p>
              <p className="mt-4">
                Aucune donnée n&apos;est vendue ou cédée à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">7. Droits des utilisateurs</h2>
              <p>
                Conformément au RGPD, chaque utilisateur dispose des droits suivants sur ses données personnelles :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Droit d&apos;accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d&apos;opposition</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p className="mt-4">
                Pour exercer l&apos;un de ces droits, il suffit d&apos;envoyer une demande par e-mail à paul.nogaro@gmail.com, en joignant une pièce d&apos;identité en cours de validité si nécessaire.
              </p>
              <p className="mt-4">
                Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-white underline hover:no-underline">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">8. Cookies</h2>
              <p>
                Le site lagenceyl.fr peut utiliser des cookies techniques ou de mesure d&apos;audience (par exemple via Google Analytics) afin d&apos;améliorer la navigation et l&apos;expérience utilisateur.
              </p>
              <p className="mt-4">
                L&apos;utilisateur peut configurer son navigateur pour bloquer ou supprimer les cookies. Pour en savoir plus, consultez la section &quot;Aide&quot; de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">9. Sécurité des données</h2>
              <p>
                Toutes les précautions raisonnables sont prises pour protéger les données personnelles contre la perte, le vol, la divulgation ou l&apos;accès non autorisé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4 mt-10">10. Modifications</h2>
              <p>
                La présente politique peut être modifiée à tout moment afin de garantir sa conformité avec la législation en vigueur.
              </p>
              <p className="mt-4">
                La date de mise à jour sera indiquée en bas de la page.
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
