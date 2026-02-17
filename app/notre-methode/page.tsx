'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import Link from 'next/link'
import Image from 'next/image'
import Stepper, { Step } from '@/components/Stepper'

export default function NotreMethodePage() {
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
    if (!isMobile) {
      setMobileRevealedBars(new Set())
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const barIndex = Number(entry.target.getAttribute('data-selectivite-index'))
            if (!isNaN(barIndex)) {
              setTimeout(() => {
                setMobileRevealedBars((prev) => {
                  const next = new Set(prev)
                  next.add(barIndex)
                  return next
                })
              }, barIndex * 300)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    barRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [isMobile])

  return (
    <main className="min-h-screen" role="main">
      <Navbar />
      
      <Hero 
        title="MÉTHODE, RIGUEUR ET TRANSPARENCE"
        subtitle="L'ESTIMATION DE LA VALEUR REELLE APPLIQUÉE À VOTRE PROJET IMMOBILIER. DÉCOUVREZ UN PROCESSUS D'ACCOMPAGNEMENT NORMÉ, OÙ CHAQUE DÉCISION EST APPUYÉE PAR UNE ANALYSE FINANCIÈRE ET TECHNIQUE"
        buttonText="Découvrir notre processus"
        buttonLink="#services"
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

      {/* Section Pourquoi une approche structurée est indispensable */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="approche-structuree-indispensable">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-structuree-indispensable" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                L'APPROCHE STRUCTUREE : VOTRE MEILLEURE GARANTIE DE SUCCÈS
              </h2>
            </div>
            <div className="text-lg text-white/80 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p>
                Un projet immobilier à Saint-Germain-en-Laye ne s'improvise pas. La réussite de votre projet de vente dépend d'un cadrage initial sans faille : un prix du marché scientifiquement établi, une stratégie de diffusion sur mesure et une maîtrise totale du marché local.
              </p>
              <p>
                L'Agence YL privilégie la méthode à la précipitation. Cette rigueur permet d'éviter les erreurs les plus coûteuses du marché actuel : le "bien brûlé" par une surestimation, les délais de vente qui s'allongent faute de préparation juridique, ou la perte de temps avec des acquéreurs non qualifiés.
              </p>
              <p>
                Votre patrimoine est unique. Une meulière, un appartement de réception dans l'hyper-centre ou une propriété à proximité du Lycée International ne suivent pas la même logique de vente. Notre estimation nous permet d'adapter nos outils d'analyse à la spécificité technique, géographique et juridique de votre bien.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#ffffff' }}>
                <p className="font-semibold text-white text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  LA COLLABORATION ENTRE LE PROPRIÉTAIRE ET LE CONSEILLER EST LA CLÉ. NOUS NE CHERCHONS PAS SEULEMENT À VENDRE VOTRE BIEN, NOUS CONSTRUISONS LA STRATÉGIE POUR LE VENDRE AU MEILLEUR PRIX.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Analyser avant d'agir */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="analyser-avant-agir">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Colonne gauche : Grand titre */}
              <div className="md:sticky md:top-32">
                <h2 id="analyser-avant-agir" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  ANALYSER AVANT D'AGIR :{' '}
                  <span className="font-light italic text-white/50">NOTRE MÉTHODE</span>
              </h2>
            </div>

              {/* Colonne droite : Liste d'éléments avec icônes */}
              <div className="space-y-0" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {/* Item 1 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">VOTRE BIEN</h3>
                      <p className="text-white/70 leading-relaxed">
                        État général, caractéristiques, points forts, contraintes éventuelles. Chaque détail compte pour établir une estimation réaliste.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">L'ENVIRONNEMENT</h3>
                      <p className="text-white/70 leading-relaxed">
                        Quartier, proximité des commodités, exposition, vis-à-vis, environnement immédiat. Le contexte influence directement la valeur et la capacité de vente.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">LE MARCHÉ LOCAL</h3>
                      <p className="text-white/70 leading-relaxed">
                        Analyse des biens similaires récemment vendus sur le même secteur. Les prix réels du marché, pas les annonces. Les délais de vente constatés. L'offre et la demande sur le secteur.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="py-8 border-b border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">VOTRE CONTEXTE JURIDIQUE ET PERSONNEL</h3>
                      <p className="text-white/70 leading-relaxed">
                        Succession, divorce, vente RP, investissement. Votre situation nécessite une approche adaptée. Les contraintes juridiques, les délais, et votre motivation influencent la stratégie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section La sélectivité — design process bars */}
      <section className="py-24 relative z-10" aria-labelledby="approche-selective-choix">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          {/* Header */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-sm text-white/50 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>0 - 5</p>
                <h2 id="approche-selective-choix" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  LA SÉLECTIVITÉ
              </h2>
                <p className="text-lg text-white/70 mt-4 max-w-xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  C'EST LE GAGE DE VOTRE RÉUSSITE. NOTRE PROCESSUS DE SÉLECTION GARANTIT UN ACCOMPAGNEMENT D'EXCELLENCE.
                </p>
              </div>
            </div>
            </div>

          {/* Process Bars */}
          <div className="w-full">
            {[
              { num: '0001', title: 'Prix cohérent', content: 'LES PROJETS AVEC UN PRIX COHÉRENT AVEC LE MARCHÉ RÉEL. NOUS ANALYSONS LES DONNÉES DE VENTES RÉCENTES POUR VALIDER LA FAISABILITÉ DE VOTRE PROJET.' },
              { num: '0002', title: 'Vendeurs impliqués', content: 'LES VENDEURS RÉFLÉCHIS, OUVERTS À L\'ANALYSE ET À LA DISCUSSION. VOTRE IMPLICATION EST LA CLÉ D\'UNE VENTE RÉUSSIE AU MEILLEUR PRIX.' },
              { num: '0003', title: 'Objectifs clairs', content: 'LES PROJETS STRUCTURÉS, AVEC DES OBJECTIFS CLAIRS. NOUS DÉFINISSONS ENSEMBLE UNE FEUILLE DE ROUTE PRÉCISE POUR ATTEINDRE VOS OBJECTIFS PATRIMONIAUX.' },
              { num: '0004', title: 'Valeur ajoutée', content: 'LES SITUATIONS OÙ L\'AGENCE PEUT APPORTER UNE VALEUR RÉELLE. NOTRE EXPERTISE DOIT FAIRE LA DIFFÉRENCE POUR JUSTIFIER NOTRE ENGAGEMENT À VOS CÔTÉS.' },
              { num: '0005', title: 'Sélectivité assumée', content: 'CETTE SÉLECTIVITÉ PROTÈGE LE CLIENT : ELLE GARANTIT QUE L\'AGENCE PEUT RÉELLEMENT ACCOMPAGNER LE PROJET AVEC EFFICACITÉ. DIRE NON FAIT PARTIE DU SÉRIEUX PROFESSIONNEL.' },
            ].map((item, index) => {
              const colors = [
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.12)',
                'rgba(255, 255, 255, 0.16)',
                'rgba(255, 255, 255, 0.22)',
                'rgba(255, 255, 255, 0.30)',
              ]
              const isExpandedDesktop = expandedBar === index
              const isExpandedMobile = mobileRevealedBars.has(index)
              const isExpanded = isMobile ? isExpandedMobile : isExpandedDesktop
              return (
                <div
                  key={index}
                  ref={(el) => setBarRef(el, index)}
                  data-selectivite-index={index}
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

      {/* Section Transparence totale et traçabilité */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="transparence-suivi">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-white mb-6 mx-auto" style={{ backgroundColor: '#ffffff' }} aria-hidden="true" role="presentation"></div>
              <h2 id="transparence-suivi" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                TRANSPARENCE TOTALE ET TRAÇABILITÉ
              </h2>
            </div>
            <div className="text-lg text-white/80 leading-relaxed space-y-6 text-center mb-16" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                Dans le cadre d'un processus de vente, la donnée n'a de valeur que si elle vous est partagée. Pour l'Agence YL, la transparence est le socle d'une collaboration saine : vous ne devez jamais être dans l'attente d'une information.
                </p>
                <p>
                Nous avons systématisé un protocole de suivi rigoureux pour chaque étape de votre projet :
              </p>
            </div>

            {/* Timeline verticale */}
            <div className="flex flex-col items-center">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  ),
                  title: 'DÉBRIEFING SYSTÉMATIQUE',
                  content: 'Après chaque visite, un compte-rendu oral et écrit vous est transmis sous 24h, analysant les points forts et les freins identifiés par l\'acquéreur.',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                  ),
                  title: 'REPORTING MENSUEL D\'ACTIVITÉ',
                  content: 'Un état des lieux complet de la stratégie (vues sur les portails, qualité des appels, positionnement par rapport à la concurrence directe).',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  ),
                  title: 'ANTICIPATION ET CONSEIL',
                  content: 'Nous n\'exposons pas seulement des faits, nous préconisons des ajustements stratégiques pour maintenir votre bien au sommet de son attractivité.',
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Icône dans un cercle */}
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-white/70">
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
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      ))}
                      </div>
                  )}
              </div>
              ))}
            </div>

            {/* Texte de conclusion */}
            <div className="text-lg text-white/80 leading-relaxed text-center mt-16" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p className="font-bold uppercase">
                L'OBJECTIF EST D'ÉLIMINER TOUTE ZONE D'OMBRE. CETTE CLARTÉ PERMANENTE VOUS PERMET DE PRENDRE DES DÉCISIONS ÉCLAIRÉES ET DE GARDER LA MAÎTRISE TOTALE DE VOTRE PATRIMOINE.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA Final — même design que page d'accueil */}
      <section className="relative z-10 py-32 md:py-44 flex items-center justify-center bg-black" aria-labelledby="cta-final-orientation">
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
              <h2 id="cta-final-orientation" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                PRÊT À DONNER UNE NOUVELLE DIMENSION À VOTRE PROJET ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-10 sm:mb-14 uppercase max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                QUE VOUS SOYEZ EN PHASE DE RÉFLEXION OU PRÊT À LANCER VOTRE VENTE, BÉNÉFICIEZ D'UNE APPROCHE RIGOUREUSE ET D'UN CONSEIL EXPERT POUR SÉCURISER VOTRE PATRIMOINE À SAINT-GERMAIN-EN-LAYE
              </p>
            </FadeContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/estimation#grille-tarifaire"
                aria-label="Demander une estimation immobilière à Saint-Germain-en-Laye"
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                DEMANDER MON ESTIMATION
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
              Frais d&apos;Agence
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
