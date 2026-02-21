'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import Image from 'next/image'
import Link from 'next/link'
import { useProximityContainer } from '@/components/ProximityProvider'
export default function LocationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const [expandedBar, setExpandedBar] = useState<number | null>(null)
  const [mobileRevealedBars, setMobileRevealedBars] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  const setBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    barRefs.current[index] = el
  }, [])

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // IntersectionObserver pour ouverture séquentielle sur mobile
  useEffect(() => {
    if (!isMobile) { setMobileRevealedBars(new Set()); return }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-protocole-index'))
            if (!isNaN(idx)) {
              setTimeout(() => {
                setMobileRevealedBars((prev) => { const next = new Set(prev); next.add(idx); return next })
              }, idx * 350)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )
    barRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

  return (
    <main ref={mainRef} className="min-h-screen" role="main">
      <Navbar />
      
      {/* SECTION 1 — HERO */}
      <Hero 
        title="UNE MISE EN LOCATION SÉCURISÉE, UN PATRIMOINE PRÉSERVÉ"
        subtitle="CONFIEZ LA RECHERCHE DE VOTRE LOCATAIRE À UN AGENT IMMOBILIER. DE LA STRATÉGIE DE LOYER À LA SIGNATURE DU BAIL, BÉNÉFICIEZ D'UNE SÉLECTION DRASTIQUE ET D'UN FORMALISME JURIDIQUE DE HAUT NIVEAU POUR VOTRE BIEN À SAINT-GERMAIN-EN-LAYE"
        buttonText="Trouver mon locataire idéal"
        buttonLink="#contact"
        imagePath="/images/herosectionimage.png"
        centered={true}
      />

      {/* Wrapper avec image d'arrière-plan pour toutes les sections */}
      <div className="relative z-10">
        {/* Image de fond fixe */}
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

      {/* SECTION 2 — Protocole de sélection — design process bars */}
      <section className="py-24 relative z-10" aria-labelledby="protocole-selection">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          {/* Header */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-sm text-white/50 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>0 - 3</p>
                <h2 id="protocole-selection" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  NOTRE PROTOCOLE
                </h2>
                <p className="text-lg text-white/70 mt-4 max-w-xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  UN PROTOCOLE DE SÉLECTION À LA RIGOUREUX. DECOUVREZ LES 3 ÉTAPES CLÉS DE NOTRE INTERVENTION.
                </p>
              </div>
            </div>
          </div>

          {/* Process Bars */}
          <div className="w-full">
            {[
              { num: '0001', title: 'VALORISATION & DIFFUSION STRATÉGIQUE', content: 'NOUS NE NOUS CONTENTONS PAS DE PUBLIER UNE ANNONCE. NOUS RÉALISONS UNE EXPERTISE DE LA VALEUR LOCATIVE ET UNE MISE EN VALEUR VISUELLE PREMIUM POUR ATTIRER DES PROFILS DE LOCATAIRES À HAUT DOSSIER (CADRES EN MOBILITÉ, EXPATRIÉS, INSTITUTIONNELS).' },
              { num: '0002', title: 'AUDIT DE SOLVABILITÉ CHIRURGICAL', content: 'C\'EST NOTRE CŒUR DE MÉTIER D\'EXPERTE. CHAQUE DOSSIER EST PASSÉ AU CRIBLE : VÉRIFICATION DE L\'AUTHENTICITÉ DES PIÈCES, ANALYSE DU RATIO D\'ENDETTEMENT, ET VALIDATION DES GARANTIES (PHYSIQUES OU INSTITUTIONNELLES). NOUS NE VOUS PRÉSENTONS QUE L\'EXCELLENCE.' },
              { num: '0003', title: 'SÉCURISATION DE L\'ENTRÉE', content: 'RÉDACTION D\'UN BAIL CONFORME AUX DERNIÈRES ÉVOLUTIONS LÉGISLATIVES ET RÉALISATION D\'UN ÉTAT DES LIEUX CONTRADICTOIRE D\'UNE PRÉCISION TOTALE. VOUS RÉCUPÉREZ UN DOSSIER COMPLET, PRÊT POUR L\'ENCAISSEMENT DE VOS LOYERS.' },
            ].map((item, index) => {
              const colors = [
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.10)',
                'rgba(255, 255, 255, 0.18)',
              ]
              const isExpanded = isMobile ? mobileRevealedBars.has(index) : expandedBar === index
              return (
                <div
                  key={index}
                  ref={(el) => setBarRef(el, index)}
                  data-protocole-index={index}
                  className="w-full cursor-pointer overflow-hidden transition-all duration-700 ease-in-out"
                  style={{
                    backgroundColor: colors[index],
                    height: isExpanded ? '260px' : '70px',
                  }}
                  onMouseEnter={!isMobile ? () => setExpandedBar(index) : undefined}
                  onMouseLeave={!isMobile ? () => setExpandedBar(null) : undefined}
                >
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-white transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>↓</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/10 leading-none select-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {item.num}
                      </span>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-700 ease-in-out"
                      style={{ maxHeight: isExpanded ? '120px' : '0px', opacity: isExpanded ? 1 : 0 }}
                    >
                      <p className="text-base md:text-lg text-white/80 leading-relaxed mt-4 max-w-3xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeContent>
      </section>

      {/* SECTION 3 — Kit Sérénité de Bailleur — design deux colonnes */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="kit-serenite">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Colonne gauche : Grand titre sticky (statique sur mobile) */}
              <div className="md:sticky md:top-32">
                <h2 id="kit-serenite" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  VOTRE "KIT SÉRÉNITÉ" DE BAILLEUR
                </h2>
              </div>

              {/* Colonne droite : Liste d'éléments avec icônes */}
              <div className="space-y-0" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {/* Item 1 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">LE DOSSIER DE CANDIDATURE AUDITÉ</h3>
                      <p className="text-white/70 leading-relaxed">
                        Un dossier complet, vérifié pièce par pièce, avec une analyse de solvabilité certifiée par l'agence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">LE BAIL SUR-MESURE</h3>
                      <p className="text-white/70 leading-relaxed">
                        Un contrat de location rédigé selon les dernières normes juridiques (Loi Alur, décrets récents) pour protéger vos intérêts.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">L'ÉTAT DES LIEUX D'EXPERT</h3>
                      <p className="text-white/70 leading-relaxed">
                        Un document contradictoire d'une précision chirurgicale, avec photos HD, pour éviter toute contestation lors du départ du locataire.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">LE GUIDE DE GESTION</h3>
                      <p className="text-white/70 leading-relaxed">
                        Un mémo pratique pour vous aider à gérer la relation avec votre locataire (indexation des loyers, charges, calendrier) en toute autonomie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 4 — Pourquoi me confier votre dossier — design timeline verticale */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="pourquoi-confier">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" aria-hidden="true" role="presentation"></div>
              <h2 id="pourquoi-confier" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Pourquoi me confier votre dossier ?
              </h2>
            </div>

            {/* Timeline verticale */}
            <div className="flex flex-col items-center">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: 'MAÎTRISE DU RISQUE',
                  content: 'Contrairement à un agent classique, mon regard de professionnelle de l\'immobilier identifie immédiatement les incohérences d\'un dossier de candidature.',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  title: 'CONNAISSANCE DU MARCHÉ LOCAL',
                  content: 'Une estimation précise du loyer pour attirer le bon profil sans subir de vacance locative prolongée à Saint-Germain-en-Laye.',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                    </svg>
                  ),
                  title: 'NEUTRALITÉ ET DÉONTOLOGIE',
                  content: 'Une approche basée sur des faits et des chiffres, garantissant une sélection impartiale et sécurisée pour votre patrimoine.',
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Icône dans un cercle */}
                  <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  {/* Titre */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-5 mb-3 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className="text-base md:text-lg text-white/70 leading-relaxed text-center max-w-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {item.content}
                  </p>
                  {/* Ligne pointillée de séparation */}
                  {index < 2 && (
                    <div className="flex flex-col items-center gap-2 py-8">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 5 — GRILLE TARIFAIRE LOCATION */}
      <section id="grille-tarifaire-location" className="relative z-10 px-4 sm:px-6 lg:px-8 py-24" aria-labelledby="grille-tarifaire-location-title">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" aria-hidden="true" role="presentation"></div>
              <h2 id="grille-tarifaire-location-title" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                GRILLE TARIFAIRE — RECHERCHE DE LOCATAIRE
              </h2>
              <p className="text-base md:text-lg text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Mise en location sécurisée · Saint-Germain-en-Laye et alentours
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Card 1 — Location Essentielle */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-10 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Location Essentielle</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>35€</span>
                    <span className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>TTC</span>
                  </div>
                  <p className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Particuliers · Hors Paris Intramuros</p>
                </div>
                <div className="mb-6">
                  <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Mise en location sereine</span>
                </div>
                <ul className="space-y-3 flex-1 w-full flex flex-col items-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Valorisation &amp; diffusion stratégique</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Audit de solvabilité du dossier</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Bail conforme + État des lieux</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Guide de gestion bailleur</li>
                </ul>
                <a href="/location/formulaire" className="mt-8 block w-full text-center py-3.5 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Confier ma recherche de locataire
                </a>
                <p className="mt-4 text-sm text-white/70 text-center font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Dossier remis en 24h (jours ouvrés)</p>
              </div>

              {/* Card 2 — Location Paris */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-10 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Location Paris</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>59€</span>
                    <span className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>TTC</span>
                  </div>
                  <p className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Particuliers · Paris Intramuros</p>
                </div>
                <div className="mb-6">
                  <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Marché parisien exigeant</span>
                </div>
                <ul className="space-y-3 flex-1 w-full flex flex-col items-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Valorisation &amp; diffusion (micro-marché)</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Audit de solvabilité renforcé</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Bail conforme + État des lieux</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Spécificités Paris (DPE, loyer encadré…)</li>
                  <li className="flex items-center justify-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Guide de gestion bailleur</li>
                </ul>
                <a href="/location/paris/formulaire" className="mt-8 block w-full text-center py-3.5 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Confier ma recherche de locataire
                </a>
                <p className="mt-4 text-sm text-white/70 text-center font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Dossier remis en 24h (jours ouvrés)</p>
              </div>
            </div>
          </div>
        </FadeContent>
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
              Frais d&apos;Agence
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
