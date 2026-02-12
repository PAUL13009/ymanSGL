'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function EstimationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const [expandedBar, setExpandedBar] = useState<number | null>(null)
  const [expandedAccompagnement, setExpandedAccompagnement] = useState<number | null>(null)
  const [mobileRevealedBars, setMobileRevealedBars] = useState<Set<number>>(new Set())
  const [mobileRevealedAccomp, setMobileRevealedAccomp] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const accompBarRefs = useRef<(HTMLDivElement | null)[]>([])

  const setBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    barRefs.current[index] = el
  }, [])
  const setAccompBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    accompBarRefs.current[index] = el
  }, [])

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // IntersectionObserver — barres "Bien plus qu'un chiffre"
  useEffect(() => {
    if (!isMobile) { setMobileRevealedBars(new Set()); return }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-chiffre-index'))
            if (!isNaN(idx)) {
              setTimeout(() => {
                setMobileRevealedBars((prev) => { const next = new Set(prev); next.add(idx); return next })
              }, idx * 300)
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

  // IntersectionObserver — barres "Accompagnement stratégique"
  useEffect(() => {
    if (!isMobile) { setMobileRevealedAccomp(new Set()); return }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-accomp-index'))
            if (!isNaN(idx)) {
              setTimeout(() => {
                setMobileRevealedAccomp((prev) => { const next = new Set(prev); next.add(idx); return next })
              }, idx * 350)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )
    accompBarRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
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
        title="Estimation immobilière basée sur la valeur vénale réelle"
        subtitle="Au-delà d'une simple estimation, nous réalisons un audit technique et financier complet de votre bien. Une approche rigoureuse et impartiale pour sécuriser vos prises de décision à Saint-Germain-en-Laye"
        buttonText="Demander mon dossier d'estimation"
        buttonLink="#grille-tarifaire"
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

      {/* SECTION 2 — BIEN PLUS QU'UN CHIFFRE */}
      <section className="py-24 relative z-10" aria-labelledby="dossier-reference">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          {/* Header */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-sm text-white/50 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>0 - 4</p>
                <h2 id="dossier-reference" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  BIEN PLUS QU&apos;UN CHIFFRE
              </h2>
                <p className="text-lg text-white/70 mt-4 max-w-xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  UN DOSSIER DE RÉFÉRENCE. L&apos;ESTIMATION GRATUITE EST SOUVENT UNE PORTE D&apos;ENTRÉE COMMERCIALE. NOTRE APPROCHE EST DIFFÉRENTE.
                </p>
              </div>
            </div>
          </div>

          {/* Texte d'introduction */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-4xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Nous réalisons une étude de valeur vénale indépendante, documentée et objective. Ce travail de synthèse vous est remis sous la forme d&apos;un Rapport d&apos;Audit complet, indispensable pour sécuriser vos décisions patrimoniales.
            </p>
          </div>

          {/* Process Bars */}
          <div className="w-full">
            {[
              { num: '0001', title: 'ANALYSE COMPARATIVE DE MARCHÉ', content: 'ÉTUDE DÉTAILLÉE DES VENTES RÉELLES (BASE NOTARIALE) ET DES BIENS ACTUELLEMENT EN CONCURRENCE À SAINT-GERMAIN-EN-LAYE.' },
              { num: '0002', title: 'AUDIT TECHNIQUE & INTRINSÈQUE', content: 'ÉVALUATION DE LA QUALITÉ DU BÂTI, DES VOLUMES, DE L\'ÉTAT DES PRESTATIONS ET DU POTENTIEL DE VALORISATION DE VOTRE BIEN.' },
              { num: '0003', title: 'ÉTUDE DE LA DEMANDE', content: 'ANALYSE DE LA DEMANDE POUR VOTRE TYPE DE BIEN, CRUCIALE POUR LES INVESTISSEURS OU POUR ÉVALUER LA LIQUIDITÉ DU PATRIMOINE.' },
              { num: '0004', title: 'MÉTHODES FINANCIÈRES', content: 'APPLICATION DES MÉTHODES PAR CAPITALISATION ET COMPARAISON POUR CROISER LES DONNÉES ET OBTENIR UN PRIX PIVOT INDISCUTABLE.' },
            ].map((item, index) => {
              const colors = [
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.10)',
                'rgba(255, 255, 255, 0.18)',
                'rgba(255, 255, 255, 0.26)',
              ]
              const isExpanded = isMobile ? mobileRevealedBars.has(index) : expandedBar === index
              return (
                <div
                  key={index}
                  ref={(el) => setBarRef(el, index)}
                  data-chiffre-index={index}
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

      {/* SECTION 3 — ACCOMPAGNEMENT STRATÉGIQUE */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="accompagnement-strategique">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
              {/* Barres expandables — order-2 sur mobile pour passer sous le titre */}
              <div className="flex flex-col gap-4 order-2 md:order-1">
                {[
                  {
                    title: 'Vente de Prestige',
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    ),
                    content: 'POUR FIXER UN "PRIX PIVOT" COHÉRENT, DÉSARMER LES NÉGOCIATIONS AGRESSIVES ET RACCOURCIR LES DÉLAIS DE VENTE EN RASSURANT LES ACQUÉREURS PAR UNE ANALYSE FACTUELLE.',
                  },
                  {
                    title: 'Succession & Partage',
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    content: 'POUR GARANTIR UNE ÉQUITÉ TOTALE ENTRE LES HÉRITIERS ET PRÉVENIR LES TENSIONS FAMILIALES GRÂCE À UNE ÉVALUATION NEUTRE, INDÉPENDANTE ET ACCEPTÉE PAR TOUS.',
                  },
                  {
                    title: 'Déclaration Fiscale & IFI',
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                    ),
                    content: 'POUR DISPOSER D\'UN DOSSIER SOLIDE ET ARGUMENTÉ FACE À L\'ADMINISTRATION FISCALE, LIMITANT AINSI LES RISQUES DE REDRESSEMENT SUR LA VALEUR DE VOTRE PATRIMOINE IMMOBILIER.',
                  },
                  {
                    title: 'Arbitrage Patrimonial',
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    ),
                    content: 'POUR ÉVALUER LA RENTABILITÉ RÉELLE DE VOS ACTIFS ET PRENDRE DES DÉCISIONS D\'INVESTISSEMENT (CONSERVER, VENDRE OU RÉNOVER) BASÉES SUR DES DONNÉES DE MARCHÉ ACTUALISÉES.',
                  },
                ].map((item, index) => {
                  const isExpanded = isMobile ? mobileRevealedAccomp.has(index) : expandedAccompagnement === index
                  return (
                    <div
                      key={index}
                      ref={(el) => setAccompBarRef(el, index)}
                      data-accomp-index={index}
                      className="rounded-xl cursor-pointer overflow-hidden transition-all duration-700 ease-in-out"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        height: isExpanded ? '220px' : '80px',
                      }}
                      onMouseEnter={!isMobile ? () => setExpandedAccompagnement(index) : undefined}
                      onMouseLeave={!isMobile ? () => setExpandedAccompagnement(null) : undefined}
                    >
                      <div className="px-6 sm:px-8 h-full flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              {item.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                              {item.title}
                            </h3>
                          </div>
                          <span className="text-white/30 transition-transform duration-300 text-xl" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>↓</span>
                        </div>
                        <div
                          className="overflow-hidden transition-all duration-700 ease-in-out"
                          style={{ maxHeight: isExpanded ? '120px' : '0px', opacity: isExpanded ? 1 : 0 }}
                        >
                          <p className="text-sm sm:text-base text-white/70 leading-relaxed mt-4 pl-14" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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
                <h2 id="accompagnement-strategique" className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-none uppercase mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Un accompagnement stratégique pour chaque étape de vie.
                </h2>
                <p className="text-base sm:text-lg text-white/50 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  L'estimation de complaisance n'a pas sa place dans les dossiers à enjeux. Notre rapport de valeur vénale est conçu pour apporter une réponse ferme et documentée dans les contextes où l'improvisation peut coûter cher.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 4 — L'INDÉPENDANCE */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="independance-serenite">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }} aria-hidden="true" role="presentation"></div>
              <h2 id="independance-serenite" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                L&apos;INDÉPENDANCE AU SERVICE DE VOTRE SÉRÉNITÉ.
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-base md:text-lg text-white/70 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Facturer une analyse de valeur est la garantie de notre impartialité. Contrairement aux estimations gratuites, notre rémunération ne dépend pas de la signature d&apos;un mandat de vente immédiat, mais de la précision de notre conseil. Vous obtenez une vérité de marché, sans influence commerciale.
              </p>
                  </div>

            {/* Encadré mise en avant */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Investissement déductible
                    </h3>
                  </div>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Le montant du rapport d&apos;analyse est <span className="font-bold uppercase">intégralement remboursé</span> si vous nous confiez la vente de votre bien.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 5 — PARLONS DE VOTRE PROJET */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="parlons-projet">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }} aria-hidden="true" role="presentation"></div>
              <h2 id="parlons-projet" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                PARLONS DE VOTRE PROJET.
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Chaque patrimoine est unique et chaque situation mérite une attention particulière. Avant d&apos;engager un audit, nous vous proposons un premier échange téléphonique pour comprendre vos objectifs et valider la pertinence de notre intervention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Engagement 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-white/20">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>RÉACTIVITÉ</h3>
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Une réponse sous 24h pour organiser notre premier rendez-vous.
                </p>
              </div>

              {/* Engagement 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-white/20">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>CONFIDENTIALITÉ</h3>
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Une discrétion absolue sur l&apos;ensemble de vos données patrimoniales et personnelles.
                </p>
              </div>

              {/* Engagement 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-white/20">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>TRANSPARENCE</h3>
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Un devis clair et détaillé avant tout démarrage de mission.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 6 — GRILLE TARIFAIRE */}
      <section id="grille-tarifaire" className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="grille-tarifaire-title">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }} aria-hidden="true" role="presentation"></div>
              <h2 id="grille-tarifaire-title" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                GRILLE TARIFAIRE — ESTIMATIONS IMMOBILIÈRES
              </h2>
              <p className="text-base md:text-lg text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Estimations indépendantes · Sans engagement · Sans démarchage
              </p>
            </div>
            
            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
              
              {/* Card 1 — Essentielle */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-10 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Estimation Essentielle</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>55€</span>
                    <span className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>TTC</span>
                  </div>
                  <p className="text-xs italic text-white/40 mb-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Montant intégralement déductible des honoraires en cas de signature d'un mandat exclusif confié à l'agence</p>
                  <p className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Particuliers · Hors Paris Intramuros</p>
                </div>
                <div className="mb-6">
                  <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Se projeter, décider</span>
                </div>
                <p className="text-sm text-white/50 mb-6 uppercase tracking-wider font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Analyse structurée</p>
                <ul className="space-y-3 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Analyse du marché local</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Biens comparables (méthode d&apos;estimation par comparaison)</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Affichage du prix recommandé + fourchette de valeur haute et basse</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Utilisable comme support de raisonnement</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Document PDF remis</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Utilisable cadre bancaire</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Non-sollicitation commerciale</li>
                  <li className="flex items-center gap-3 text-sm text-white/50"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg><span className="line-through">Analyse du positionnement prix</span></li>
                  <li className="flex items-center gap-3 text-sm text-white/50"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg><span className="line-through">Lecture investissement</span></li>
                  <li className="flex items-center gap-3 text-sm text-white/50"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg><span className="line-through">Spécificités locales</span></li>
                </ul>
                <a href="/estimation/formulaire" className="mt-8 block w-full text-center py-3.5 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Demander cette estimation
                </a>
              </div>

              {/* Card 2 — Investisseur */}
              <div className="bg-black rounded-2xl border border-black p-8 md:p-10 flex flex-col relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Populaire</div>
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Estimation Investisseur</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>89€</span>
                    <span className="text-sm text-white/60" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>TTC</span>
                  </div>
                  <p className="text-xs italic text-white/40 mb-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Montant intégralement déductible des honoraires en cas de signature d'un mandat exclusif confié à l'agence</p>
                  <p className="text-sm text-white/60" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Investisseurs / SCI · France entière</p>
                </div>
                <div className="mb-6">
                  <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Arbitrer, financer</span>
                </div>
                <p className="text-sm text-white/50 mb-6 uppercase tracking-wider font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Analyse approfondie</p>
                <ul className="space-y-3 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Analyse du marché local</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Biens comparables (méthode d&apos;estimation par comparaison)</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Affichage du prix recommandé + fourchette de valeur haute et basse</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Utilisable comme support de raisonnement</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Document PDF remis</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Utilisable cadre bancaire</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Non-sollicitation commerciale</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Analyse du positionnement prix</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Lecture investissement</li>
                  <li className="flex items-center gap-3 text-sm text-white/90"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Spécificités locales</li>
                </ul>
                <a href="/estimation/investisseur/formulaire" className="mt-8 block w-full text-center py-3.5 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Demander cette estimation
                </a>
              </div>

              {/* Card 3 — Paris */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-10 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Estimation Paris</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>129€</span>
                    <span className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>TTC</span>
              </div>
                  <p className="text-xs italic text-white/40 mb-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Montant intégralement déductible des honoraires en cas de signature d'un mandat exclusif confié à l'agence</p>
                  <p className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Particuliers · Paris Intramuros</p>
            </div>
                <div className="mb-6">
                  <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Sécuriser une décision à fort enjeu</span>
                </div>
                <p className="text-sm text-white/50 mb-6 uppercase tracking-wider font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Analyse très approfondie</p>
                <ul className="space-y-3 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Analyse du marché local <span className="text-xs text-white/40 ml-1">(micro-marché)</span></li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Biens comparables (méthode d&apos;estimation par comparaison) <span className="text-xs text-white/40 ml-1">(sélection fine)</span></li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Affichage du prix recommandé + fourchette de valeur haute et basse</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Utilisable comme support de raisonnement</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Document PDF remis</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Utilisable cadre bancaire</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Non-sollicitation commerciale</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Analyse du positionnement prix</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Spécificités locales <span className="text-xs text-white/40 ml-1">(très détaillé)</span></li>
                  <li className="flex items-center gap-3 text-sm text-white/50"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg><span className="line-through">Lecture investissement</span></li>
                </ul>
                <a href="/estimation/paris/formulaire" className="mt-8 block w-full text-center py-3.5 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Demander cette estimation
                </a>
              </div>
            </div>

            {/* Note de bas */}
            <p className="text-sm text-white/50 text-center max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Les tarifs sont définis selon la complexité du marché et le niveau d&apos;analyse requis, et non selon le profil du client. Certains biens à forte valeur ou atypiques peuvent faire l&apos;objet d&apos;une analyse complémentaire ou d&apos;un devis sur mesure.
            </p>

            {/* Mentions importantes */}
            <div className="mt-12 max-w-4xl mx-auto text-center">
              <p className="text-xs italic text-white/40 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <strong className="text-white/50">Mentions importantes.</strong> Pour chaque dossier : documents non contractuels ; ils ne constituent ni une expertise immobilière au sens juridique du terme ni une garantie de prix de vente ; ce document ne peut être utilisé dans le cadre d&apos;une procédure judiciaire ou assimilée sans validation par un expert agréé.
              </p>
              <p className="text-xs italic text-white/40 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Les documents constituent un avis de valeur établi sur la base des éléments communiqués par le vendeur et des données de marché disponibles à la date de son élaboration. La valeur indiquée représente une estimation théorique susceptible d&apos;évolution selon les conditions du marché, l&apos;état réel du bien et les informations complémentaires qui pourraient être portées à notre connaissance.
              </p>
              <p className="text-xs italic text-white/40 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Il est recommandé à toute partie (banque, investisseur, notaire ou autre) de procéder à ses propres vérifications ou expertises avant toute prise de décision. L&apos;agence ne saurait être tenue responsable des conséquences résultant de l&apos;utilisation de cette estimation en dehors de son cadre d&apos;application.
              </p>
              <p className="text-xs italic text-white/40 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Les estimations sont établies avec diligence et professionnalisme par nos soins, sur la base des meilleures données disponibles et de notre connaissance du marché.
              </p>
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
              Honoraires
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
