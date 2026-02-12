'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'


export default function VentePage() {
  const mainRef = useRef<HTMLElement>(null)
  const ctaFinalButtonRef = useScrollButtonAnimation()
  const [expandedValeur, setExpandedValeur] = useState<number | null>(null)
  const [expandedFiltrage, setExpandedFiltrage] = useState<number | null>(null)
  const [mobileRevealedValeur, setMobileRevealedValeur] = useState<Set<number>>(new Set())
  const [mobileRevealedFiltrage, setMobileRevealedFiltrage] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const valeurBarRefs = useRef<(HTMLDivElement | null)[]>([])
  const filtrageBarRefs = useRef<(HTMLDivElement | null)[]>([])

  const setValeurBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    valeurBarRefs.current[index] = el
  }, [])
  const setFiltrageBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    filtrageBarRefs.current[index] = el
  }, [])

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // IntersectionObserver — barres "mise en valeur"
  useEffect(() => {
    if (!isMobile) { setMobileRevealedValeur(new Set()); return }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-valeur-index'))
            if (!isNaN(idx)) {
              setTimeout(() => {
                setMobileRevealedValeur((prev) => { const next = new Set(prev); next.add(idx); return next })
              }, idx * 350)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )
    valeurBarRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [isMobile])

  // IntersectionObserver — barres "filtrage acquéreurs"
  useEffect(() => {
    if (!isMobile) { setMobileRevealedFiltrage(new Set()); return }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-filtrage-index'))
            if (!isNaN(idx)) {
              setTimeout(() => {
                setMobileRevealedFiltrage((prev) => { const next = new Set(prev); next.add(idx); return next })
              }, idx * 350)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )
    filtrageBarRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <>
      {/* Données structurées Schema.org pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "L'Agence YL",
            "description": "Agence immobilière indépendante spécialisée dans l'estimation et la vente de biens immobiliers à Marseille, 6e arrondissement (Vauban) et quartiers limitrophes. Accompagnement des vendeurs particuliers de résidence principale avec une méthode exigeante basée sur l'analyse précise du marché immobilier local.",
            "url": "https://www.lagenceyl.fr",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Marseille",
              "addressRegion": "Provence-Alpes-Côte d'Azur",
              "postalCode": "13006",
              "addressCountry": "FR"
            },
            "areaServed": {
              "@type": "City",
              "name": "Marseille",
              "containedIn": {
                "@type": "AdministrativeArea",
                "name": "6e arrondissement"
              }
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.2965",
              "longitude": "5.3698"
            },
            "serviceType": [
              "Estimation immobilière",
              "Vente immobilière",
              "Accompagnement vendeur particulier"
            ],
            "priceRange": "$$",
            "@id": "https://www.lagenceyl.fr/#organization"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "L'Agence YL",
            "image": "https://www.lagenceyl.fr/images/Logo-removebg-preview.png",
            "@id": "https://www.lagenceyl.fr",
            "url": "https://www.lagenceyl.fr",
            "telephone": "+33-X-XX-XX-XX-XX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Vauban",
              "addressLocality": "Marseille",
              "addressRegion": "Provence-Alpes-Côte d'Azur",
              "postalCode": "13006",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.2965",
              "longitude": "5.3698"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": []
          })
        }}
      />
      <main ref={mainRef} className="min-h-screen">
        <Navbar />
        <Hero 
          title="VENDRE AU PRIX DE L'ESTIMATION, L'ESPRIT LIBRE"
          subtitle="CONFIEZ VOTRE PATRIMOINE À UNE CONSEILLÈRE POUR UNE TRANSACTION SÉCURISÉE, UN FILTRAGE RIGOUREUX DES ACQUÉREURS ET UNE VALORISATION FINANCIÈREMENT EXACTE"
          buttonText="Soumettre mon projet à l'estimation"
          buttonLink="/estimation#grille-tarifaire"
          imagePath="/images/herosectionimage.png"
          centered={true}
        />
        {/* Wrapper avec image d'arrière-plan pour toutes les sections */}
        <div className="relative z-10">
          {/* Image de fond */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/herosectionimage.png"
              alt=""
              fill
              className="object-cover blur-md"
              loading="lazy"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          </div>
        {/* Section L'estimation immobilière au service de votre net vendeur */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  L'estimation immobilière au service de votre net vendeur
                </h2>
              </div>
              <div className="text-lg text-white/80 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  La mise en vente de votre bien commence par une analyse structurelle et financière complète. Grâce à notre maîtrise des méthodes d'estimation (comparaison, capitalisation, sol et construction), nous fixons le prix du marché.
                </p>
                <div className="bg-white/10 backdrop-blur-sm border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#ffffff' }}>
                  <p className="font-semibold text-white text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Le bénéfice client : Un prix justifié techniquement est un prix qui ne se négocie pas. Vous évitez l'écueil du "bien brûlé" par une surestimation complaisante.
                  </p>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Le Marketing de Précision */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
                {/* Colonne gauche — titre + description */}
                <div className="md:sticky md:top-32">
                  <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-none uppercase mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Une mise en valeur de haut niveau
                  </h2>
                  <p className="text-base sm:text-lg text-white/50 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Pour attirer des acquéreurs qualifiés, l'image doit être à la hauteur du patrimoine. Nous déployons un arsenal marketing premium.
                  </p>
                </div>

                {/* Colonne droite — barres expandables */}
                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: 'Photographie d\'architecture',
                      subtitle: 'IMAGE & VOLUMES',
                      content: 'POUR CAPTURER L\'ÂME ET LES VOLUMES DE VOTRE BIEN.',
                    },
                    {
                      title: 'Dossier de présentation technique',
                      subtitle: 'DOCUMENT COMPLET',
                      content: 'UN DOCUMENT COMPLET INCLUANT PLANS, DIAGNOSTICS AUDITÉS ET ANALYSE DU QUARTIER POUR RASSURER L\'ACHETEUR DÈS LA PREMIÈRE LECTURE.',
                    },
                    {
                      title: 'Diffusion ciblée',
                      subtitle: 'VISIBILITÉ PREMIUM',
                      content: 'UNE VISIBILITÉ SUR LES PORTAILS DE PRESTIGE ET AUPRÈS DE NOTRE RÉSEAU D\'INVESTISSEURS TRIÉS SUR LE VOLET.',
                    },
                  ].map((item, index) => {
                    const isExpanded = isMobile ? mobileRevealedValeur.has(index) : expandedValeur === index
                    return (
                      <div
                        key={index}
                        ref={(el) => setValeurBarRef(el, index)}
                        data-valeur-index={index}
                        className="rounded-xl cursor-pointer overflow-hidden transition-all duration-700 ease-in-out"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          height: isExpanded ? '220px' : '80px',
                        }}
                        onMouseEnter={!isMobile ? () => setExpandedValeur(index) : undefined}
                        onMouseLeave={!isMobile ? () => setExpandedValeur(null) : undefined}
                      >
                        <div className="px-6 sm:px-8 h-full flex flex-col justify-center">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {item.title}
                              </h3>
                              <p className="text-xs text-white/40 uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {item.subtitle}
                              </p>
                            </div>
                            <span className="text-white/30 transition-transform duration-300 text-xl" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>↓</span>
                          </div>
                          <div
                            className="overflow-hidden transition-all duration-700 ease-in-out"
                            style={{ maxHeight: isExpanded ? '120px' : '0px', opacity: isExpanded ? 1 : 0 }}
                          >
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Filtrage des acquéreurs */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
                {/* Barres expandables — order-2 sur mobile pour passer sous le titre */}
                <div className="flex flex-col gap-4 order-2 md:order-1">
                  {[
                    {
                      title: 'Vérification de la solvabilité',
                      subtitle: 'FINANCEMENT',
                      content: 'ANALYSE PRÉALABLE DU PLAN DE FINANCEMENT ET ATTESTATION BANCAIRE SYSTÉMATIQUE.',
                    },
                    {
                      title: 'Validation du projet',
                      subtitle: 'QUALIFICATION',
                      content: 'NOUS NE FAISONS VISITER QU\'AUX ACQUÉREURS DONT LES CRITÈRES CORRESPONDENT RÉELLEMENT À VOTRE BIEN.',
                    },
                    {
                      title: 'Compte-rendu sous 24h',
                      subtitle: 'TRANSPARENCE',
                      content: 'VOUS RECEVEZ UNE ANALYSE PRÉCISE DE CHAQUE VISITE, SANS FILTRE ET SANS ATTENTE.',
                    },
                  ].map((item, index) => {
                    const isExpanded = isMobile ? mobileRevealedFiltrage.has(index) : expandedFiltrage === index
                    return (
                      <div
                        key={index}
                        ref={(el) => setFiltrageBarRef(el, index)}
                        data-filtrage-index={index}
                        className="rounded-xl cursor-pointer overflow-hidden transition-all duration-700 ease-in-out"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          height: isExpanded ? '220px' : '80px',
                        }}
                        onMouseEnter={!isMobile ? () => setExpandedFiltrage(index) : undefined}
                        onMouseLeave={!isMobile ? () => setExpandedFiltrage(null) : undefined}
                      >
                        <div className="px-6 sm:px-8 h-full flex flex-col justify-center">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {item.title}
                              </h3>
                              <p className="text-xs text-white/40 uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {item.subtitle}
                              </p>
                            </div>
                            <span className="text-white/30 transition-transform duration-300 text-xl" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>↓</span>
                          </div>
                          <div
                            className="overflow-hidden transition-all duration-700 ease-in-out"
                            style={{ maxHeight: isExpanded ? '120px' : '0px', opacity: isExpanded ? 1 : 0 }}
                          >
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Titre + description — order-1 sur mobile pour passer au-dessus des barres */}
                <div className="md:sticky md:top-32 order-1 md:order-2">
                  <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-none uppercase mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous ne vendons pas des "tickets de visite"
                  </h2>
                  <p className="text-base sm:text-lg text-white/50 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Votre temps est précieux et votre intimité doit être protégée. L'Agence YL applique un protocole de sélection strict.
                  </p>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Compromis de vente blindé */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Un compromis de vente "blindé"
                </h2>
              </div>
              <div className="text-lg text-white/80 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  25% des ventes échouent entre le compromis et l'acte authentique à cause d'un dossier mal préparé. En tant que votre conseillère unique, j'anticipe chaque point de friction : urbanisme, servitudes, conformité des PV d'AG et des diagnostics.
                </p>
                <div className="bg-white/10 backdrop-blur-sm border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#ffffff' }}>
                  <p className="font-semibold text-white text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Promesse : Nous préparons le dossier pour les notaires avec une rigueur chirurgicale afin de garantir une signature sans surprise et sans délais.
                  </p>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* CTA Final — même design que page d'accueil */}
        <section className="relative z-10 py-32 md:py-44 flex items-center justify-center bg-black" aria-labelledby="cta-final-vente">
          <div className="relative z-10 w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
                <h2 id="cta-final-vente" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  VOTRE PATRIMOINE MÉRITE UNE EVALUATION APPROFONDIE
                </h2>
              </FadeContent>
              <div className="flex flex-col items-center gap-6">
                <a
                  ref={ctaFinalButtonRef as any}
                  href="/estimation#grille-tarifaire"
                  aria-label="Demander une estimation immobilière"
                  className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                  }}
                >
                  Demander mon estimation
                </a>
                <a
                  href="/notre-methode"
                  className="text-white/50 text-sm sm:text-base underline underline-offset-4 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Consultez notre méthode de travail
                </a>
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-black py-6" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-white/70 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              2026 — L'AGENCE YL
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/mentions-legales" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Politique de confidentialité
              </Link>
              <Link href="/honoraires" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Honoraires
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
