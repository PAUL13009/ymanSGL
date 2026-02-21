'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollImageAnimation } from '@/hooks/useScrollImageAnimation'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'
import Stepper, { Step } from '@/components/Stepper'
import { AnimatePresence, motion } from 'framer-motion'

export default function AProposPage() {
  const [isFondatriceImageHovered, setIsFondatriceImageHovered] = useState(false)
  const [isExpertiseImageHovered, setIsExpertiseImageHovered] = useState(false)
  const [selectiveToggleOn, setSelectiveToggleOn] = useState(false)
  const [expandedCompetence, setExpandedCompetence] = useState<number | null>(null)
  const [mobileRevealedCompetences, setMobileRevealedCompetences] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const competenceBarRefs = useRef<(HTMLDivElement | null)[]>([])

  const setCompetenceBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    competenceBarRefs.current[index] = el
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
      setMobileRevealedCompetences(new Set())
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const barIndex = Number(entry.target.getAttribute('data-competence-index'))
            if (!isNaN(barIndex)) {
              setTimeout(() => {
                setMobileRevealedCompetences((prev) => {
                  const next = new Set(prev)
                  next.add(barIndex)
                  return next
                })
              }, barIndex * 350)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    competenceBarRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [isMobile])

  const { imageRef: fondatriceImageRef, isAnimated: isFondatriceImageAnimated } = useScrollImageAnimation()
  const { imageRef: expertiseImageRef, isAnimated: isExpertiseImageAnimated } = useScrollImageAnimation()
  const venteButtonRef = useScrollButtonAnimation()
  const estimationButtonRef = useScrollButtonAnimation()
  return (
    <main className="min-h-screen bg-sable-50" role="main">
      <Navbar />
      
      <Hero 
        title="L'estimation au service de votre patrimoine"
        subtitle="Plus qu'une transaction, une analyse détaillée par une professionnelle de l'immobilier à Saint-Germain-en-Laye."
        buttonText="Échanger sur votre projet avec Yman"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/herosectionimage.png"
        mobileCenter
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

      {/* Section Pourquoi l'agence existe */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="pourquoi-agence-existe">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image à gauche avec titre superposé */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl">
                <Image
                  src="/images/loft.jpg"
                  alt="Loft moderne - L'Agence YL, agence immobilière"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="pourquoi-agence-existe" className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center text-white px-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      L'EXIGENCE AU SERVICE DU PATRIMOINE
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Texte à droite */}
              <div className="text-lg text-white/70 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p className="font-bold uppercase text-white">
                  L'Agence YL est née d'une conviction : l'immobilier de prestige ne tolère aucune approximation.
                </p>
                <p>
                  Après 8 ans d'expérience et un Master en Finance Immobilière (ESPI), sa fondatrice a choisi de bâtir une structure où la rigueur technique l'emporte sur le volume commercial. Dans un marché aussi spécifique que celui de Saint-Germain-en-Laye, chaque mètre carré compte et chaque détail juridique pèse.
                </p>
                <p>
                  En tant qu'agent immobilier, Yman Lahlou apporte une dimension rare à la transaction : la certitude de la valeur réelle.
                </p>
                <div className="bg-white/10 backdrop-blur-sm border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#ffffff' }}>
                  <p className="font-semibold text-white text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Aujourd'hui, l'agence assume une sélectivité totale : nous ne multiplions pas les mandats, nous sécurisons des projets de vie avec une précision chirurgicale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Notre façon de travailler */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="notre-facon-de-travailler">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
              {/* Colonne gauche — titre + description */}
              <div className="md:sticky md:top-32">
                <h2 id="notre-facon-de-travailler" className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-none uppercase mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Un socle de compétences haut de bilan
                </h2>
                <p className="text-base sm:text-lg text-white/50 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Une triple expertise — académique, judiciaire et terrain — au service de la valorisation de votre patrimoine immobilier.
                </p>
              </div>

              {/* Colonne droite — barres expandables */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: 'Master en Finance Immobilière (ESPI)',
                    subtitle: 'FORMATION ACADÉMIQUE',
                    content: 'DIPLÔMÉE DE L\'ÉCOLE SUPÉRIEURE DES PROFESSIONS DE L\'IMMOBILIER, J\'APPRÉHENDE CHAQUE ACTIF NON PAS COMME UN SIMPLE OBJET DE TRANSACTION, MAIS COMME UN PATRIMOINE FINANCIER COMPLEXE. CETTE FORMATION ME PERMET DE MAÎTRISER LES MÉCANISMES DE VALORISATION LES PLUS POINTUS.',
                  },
                  {
                    title: 'Expert judiciaire bientôt disponible',
                    subtitle: 'CERTIFICATION JURIDIQUE',
                    content: 'PROCHAINEMENT TITULAIRE D\'UNE NOMINATION D\'EXPERT JUDICIAIRE, J\'EXERCE AVEC UNE DÉONTOLOGIE STRICTE. MA MÉTHODOLOGIE D\'ANALYSE EST CELLE EXIGÉE PAR LES TRIBUNAUX : IMPARTIALE, TECHNIQUE ET DOCUMENTÉE. C\'EST CETTE MÊME RIGUEUR QUE J\'APPLIQUE À L\'EXPERTISE DE VOTRE BIEN.',
                  },
                  {
                    title: '8 ans d\'expérience',
                    subtitle: 'EXPÉRIENCE TERRAIN',
                    content: 'HUIT ANNÉES PASSÉES À DÉCRYPTER LES MUTATIONS DU MARCHÉ IMMOBILIER. CETTE EXPÉRIENCE TERRAIN ME PERMET DE TRADUIRE LES CHIFFRES EN RÉALITÉ DE MARCHÉ, QUARTIER PAR QUARTIER, RUE PAR RUE.',
                  },
                ].map((item, index) => {
                  const isExpandedDesktop = expandedCompetence === index
                  const isExpandedMobile = mobileRevealedCompetences.has(index)
                  const isExpanded = isMobile ? isExpandedMobile : isExpandedDesktop
                  return (
                    <div
                      key={index}
                      ref={(el) => setCompetenceBarRef(el, index)}
                      data-competence-index={index}
                      className="rounded-xl cursor-pointer overflow-hidden transition-all duration-700 ease-in-out"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        height: isExpanded ? '220px' : '80px',
                      }}
                      onMouseEnter={!isMobile ? () => setExpandedCompetence(index) : undefined}
                      onMouseLeave={!isMobile ? () => setExpandedCompetence(null) : undefined}
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

      {/* Section Au-delà de l'estimation */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="au-dela-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto text-center">
            <h2 id="au-dela-estimation" className="sr-only">Au-delà de l'estimation</h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight uppercase mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              L'Agence YL vous délivre un véritable dossier d'estimation détaillé.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/70 font-normal leading-tight uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Nous utilisons les méthodes de capitalisation, de comparaison et d'analyse sol/construction pour définir le prix du marché: celui qui maximise votre net vendeur tout en garantissant une vente rapide. Cette approche élimine les marges d'erreur et désarme toute tentative de négociation agressive des acquéreurs.
            </p>
          </div>
        </FadeContent>
      </section>

      {/* Section Saint-Germain-en-Laye */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative z-10" aria-labelledby="saint-germain-histoire">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Image à gauche + légende */}
              <div>
                <div className="relative h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-lg">
                  <Image
                    src="/images/ymannew.png"
                    alt="Yman Lahlou, Experte Immobilier Agréé à Saint-Germain-en-Laye"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-center mt-4">
                  <p className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Yman Lahlou</p>
                  <p className="text-sm text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Fondatrice de l'Agence YL</p>
                </div>
              </div>

              {/* Contenu à droite */}
              <div className="flex flex-col justify-center h-full space-y-8">
                {/* Titre principal — grande typographie bold */}
                <h2 id="saint-germain-histoire" className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  On expertise bien que ce que l'on connaît intimement.
                </h2>

                {/* Paragraphe intermédiaire */}
                <p className="text-lg sm:text-xl md:text-2xl text-white font-bold leading-relaxed uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Née à Paris, la rigueur de ma méthode et la sensibilité de l'enfant du pays est ma plus grande force.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section CTA Final - même design que la page d'accueil */}
      <section className="relative z-10 py-32 md:py-44 flex items-center justify-center bg-black" aria-labelledby="cta-final-a-propos">
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
              <h2 id="cta-final-a-propos" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                PRÊT À OBTENIR UNE VISION CLAIRE DE VOTRE PATRIMOINE ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-10 sm:mb-14 uppercase max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Que vous ayez un projet de vente immédiat ou que vous souhaitiez simplement sécuriser la valeur de votre bien dans le cadre d'une réflexion patrimoniale, échangeons en toute confidentialité.
              </p>
            </FadeContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                ref={venteButtonRef as any}
                href="/analyse"
                aria-label="Prendre rendez-vous avec Yman Lahlou, experte immobilier"
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                }}
              >
                PRENDRE RENDEZ-VOUS AVEC YMAN
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
