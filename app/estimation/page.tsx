'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import { useProximityContainer } from '@/components/ProximityProvider'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

export default function EstimationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const cta1ButtonRef = useScrollButtonAnimation()
  const cta2ButtonRef = useScrollButtonAnimation()

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
        title="Estimation immobilière à Marseille basée sur le prix réel du marché"
        subtitle="Pour les propriétaires de résidence principale qui souhaitent vendre efficacement, sans surévaluer leur bien et sans perdre de temps."
        microText="Une estimation juste est la condition indispensable pour vendre dans de bons délais. Nous réalisons des estimations 100 % gratuites, fondées sur les ventes réelles du marché marseillais, et non sur des algorithmes approximatifs."
        buttonText="Demander une estimation réaliste"
        buttonLink="/estimation/formulaire"
        imagePath="/images/vue7e.png"
      />

      {/* SECTION 2 — LE PROBLÈME */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="probleme-estimations-marseille">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="probleme-estimations-marseille" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Pourquoi de nombreuses estimations échouent à Marseille
              </h2>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  À Marseille, une grande partie des biens mis en vente restent plusieurs mois sur le marché.
                </p>
                <p>
                  La cause principale n'est ni la qualité du bien, ni la demande, mais un prix de départ mal positionné.
                </p>
                <p className="font-semibold mb-4" style={{ color: '#4682B4' }}>
                  Une estimation trop optimiste entraîne :
                </p>
                <ul className="space-y-3 list-disc list-inside ml-4" role="list">
                  <li role="listitem">une perte d'attractivité dès les premières semaines,</li>
                  <li role="listitem">des visites peu qualifiées,</li>
                  <li role="listitem">des négociations tardives et agressives,</li>
                  <li role="listitem">parfois l'échec pur et simple de la vente.</li>
                </ul>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Le prix affiché dès le départ conditionne toute la suite du processus.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 3 — NOTRE DIFFÉRENCE */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="estimation-realite-marche">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="estimation-realite-marche" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Une estimation fondée sur la réalité du marché, pas sur des promesses
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Notre approche de l'estimation immobilière repose sur un principe simple :
                  <br />
                  <span className="font-semibold" style={{ color: '#4682B4' }}>un bien se vend au prix que le marché est prêt à payer, pas au prix espéré.</span>
                </p>
                <p className="font-semibold mb-4" style={{ color: '#4682B4' }}>
                  Contrairement aux estimateurs automatiques ou aux avis approximatifs :
                </p>
                <ul className="space-y-3 list-disc list-inside ml-4" role="list">
                  <li role="listitem">nous analysons les ventes réelles récentes,</li>
                  <li role="listitem">nous tenons compte du secteur précis,</li>
                  <li role="listitem">nous intégrons les spécificités du bien,</li>
                  <li role="listitem">nous positionnons un prix vendable, cohérent et défendable.</li>
                </ul>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  L'objectif n'est pas d'annoncer le chiffre le plus élevé, mais le prix qui permet de vendre dans de bons délais.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 4 — NOTRE MÉTHODE D'ESTIMATION */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="methode-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="methode-estimation" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Comment nous réalisons votre estimation immobilière
              </h2>
            </div>
            
            <div className="space-y-6" role="list">
              {/* Étape 1 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-1-estimation">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-1-estimation" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse du marché local
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Étude des ventes récentes comparables dans votre secteur à Marseille, en tenant compte de la réalité actuelle du marché.
                    </p>
                  </div>
                </div>
              </article>

              {/* Étape 2 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-2-estimation">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-2-estimation" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse détaillée de votre bien
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Surface, état, étage, exposition, environnement, prestations, contraintes éventuelles : chaque élément est pris en compte.
                    </p>
                  </div>
                </div>
              </article>

              {/* Étape 3 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-3-estimation">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-3-estimation" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Positionnement stratégique du prix
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Définition d'un prix cohérent avec le marché, permettant de susciter une demande qualifiée dès la mise en vente.
                    </p>
                  </div>
                </div>
              </article>

              {/* Étape 4 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-4-estimation">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-4-estimation" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Projection des délais de vente
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Objectif visé : une vente maîtrisée sous 2,5 à 3 mois, dans des conditions normales de marché.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 5 — LE FILTRE */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="filtre-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border-2 rounded-xl p-8 md:p-12 shadow-lg" style={{ borderColor: '#4682B4' }}>
              <div className="text-center mb-6">
                <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
                <h3 id="filtre-estimation" className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous refusons les estimations destinées à surévaluer un bien.
                </h3>
              </div>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Si votre objectif est d'afficher un prix déconnecté du marché, nous préférons ne pas intervenir.
                </p>
                <p>
                  Cette exigence est volontaire et assumée : elle conditionne la qualité de notre travail et l'efficacité de la vente.
                </p>
                <p>
                  Nous privilégions les projets sérieux, basés sur une estimation réaliste et une stratégie claire.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 6 — À QUI S'ADRESSE CETTE ESTIMATION */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="qui-sadresse-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="qui-sadresse-estimation" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                À qui s'adresse cette estimation
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12" role="list">
              {/* Colonne gauche - OUI */}
              <article className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-600 cursor-pointer group" style={{ borderColor: '#4682B4' }} role="listitem" aria-labelledby="estimation-adaptee-si">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] md:min-w-0 md:min-h-0 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4', aspectRatio: '1 / 1' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 id="estimation-adaptee-si" className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                    Cette estimation est adaptée si :
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>vous êtes propriétaire d'une résidence principale à Marseille,</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.1}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>vous envisagez une vente à court ou moyen terme,</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.2}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>vous êtes ouvert à un prix fondé sur le marché réel,</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.3}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>vous recherchez une approche claire, honnête et structurée.</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>

              {/* Colonne droite - NON */}
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-400 cursor-pointer group" role="listitem" aria-labelledby="estimation-pas-adaptee-si">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] md:min-w-0 md:min-h-0 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" style={{ aspectRatio: '1 / 1' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                  <h3 id="estimation-pas-adaptee-si" className="text-xl font-bold text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Cette estimation n'est pas adaptée si :
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>vous cherchez uniquement à connaître un prix "maximum" sans projet réel,</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.1}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>vous souhaitez comparer des chiffres sans intention de vendre,</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.2}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>vous refusez toute remise en question du prix.</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 7 — FORMULAIRE D'ESTIMATION */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="formulaire-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="formulaire-estimation" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Demander une estimation immobilière gratuite
              </h2>
            </div>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  L'estimation peut être réalisée :
                </p>
                <ul className="list-disc list-inside space-y-2 text-left max-w-xl mx-auto" role="list">
                  <li role="listitem">en ligne, à partir des informations et des photos de votre bien,</li>
                  <li role="listitem">ou sur place, si la configuration du bien le nécessite.</li>
                </ul>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Merci de fournir des informations précises.
                  <br />
                  Elles conditionnent la qualité et la fiabilité de l'estimation.
                </p>
              </div>

              {/* CTA vers le formulaire */}
              <div className="text-center mt-8">
                <a
                  ref={cta1ButtonRef as any}
                  href="/estimation/formulaire"
                  aria-label="Recevoir mon estimation immobilière gratuite et réaliste à Marseille"
                  className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: 'white',
                    color: '#4682B4',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                    const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                    const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                    const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                    if (fill) {
                      fill.style.width = '100%'
                      fill.style.transform = 'translateX(-50%) scaleY(1)'
                    }
                    if (arrow) {
                      arrow.style.opacity = '1'
                      arrow.style.right = '-14px'
                    }
                    if (text) text.style.color = 'white'
                    if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                  }}
                  onMouseLeave={(e) => {
                    const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                    const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                    const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                    const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                    if (fill) {
                      fill.style.width = '0%'
                      fill.style.transform = 'translateX(-50%) scaleY(0)'
                    }
                    if (arrow) {
                      arrow.style.opacity = '0'
                      arrow.style.right = '-30px'
                    }
                    if (text) text.style.color = '#4682B4'
                    if (textSpan) textSpan.style.transform = 'translateX(0)'
                  }}
                >
                  {/* Fond bleu qui se remplit */}
                  <span
                    className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                    style={{
                      width: '0%',
                      backgroundColor: '#4682B4',
                      transform: 'translateX(-50%) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                      zIndex: 1
                    }}
                  ></span>
                  
                  {/* Contenu du bouton */}
                  <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                    <span className="transition-transform duration-300">Recevoir mon estimation réaliste</span>
                    <svg
                      className="button-arrow absolute w-5 h-5 transition-all duration-300"
                      style={{
                        opacity: 0,
                        right: '-30px',
                        transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 8 — RÉASSURANCE */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="approche-qualite-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-qualite-estimation" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Une approche privilégiant la qualité
              </h2>
            </div>
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="text-center space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Agence immobilière indépendante à Marseille, nous travaillons volontairement sur un nombre limité de projets afin de garantir :
                </p>
                <ul className="list-disc list-inside space-y-2 max-w-2xl mx-auto text-left" role="list">
                  <li role="listitem">une analyse précise,</li>
                  <li role="listitem">une vraie disponibilité,</li>
                  <li role="listitem">et une stratégie cohérente pour chaque bien.</li>
                </ul>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Notre approche privilégie la qualité des projets, pas le volume.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="faq-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="faq-estimation" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Questions fréquentes sur l'estimation immobilière
              </h2>
            </div>
            
            <div className="space-y-6" role="list">
              {/* Question 1 */}
              <article className="bg-white rounded-lg shadow-lg p-8 border border-gray-100" role="listitem" aria-labelledby="faq-calcul-estimation">
                <h3 id="faq-calcul-estimation" className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Comment est calculée l'estimation ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  L'estimation repose sur l'analyse des ventes réelles comparables, l'étude du marché local et les caractéristiques spécifiques du bien.
                </p>
              </article>

              {/* Question 2 */}
              <article className="bg-white rounded-lg shadow-lg p-8 border border-gray-100" role="listitem" aria-labelledby="faq-estimation-gratuite">
                <h3 id="faq-estimation-gratuite" className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  L'estimation est-elle vraiment gratuite ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Oui. L'estimation est entièrement gratuite et sans engagement.
                </p>
              </article>

              {/* Question 3 */}
              <article className="bg-white rounded-lg shadow-lg p-8 border border-gray-100" role="listitem" aria-labelledby="faq-validite-estimation">
                <h3 id="faq-validite-estimation" className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Combien de temps l'estimation est-elle valable ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Une estimation reflète un marché à un instant donné. Elle est généralement valable quelques semaines, selon l'évolution du marché.
                </p>
              </article>

              {/* Question 4 */}
              <article className="bg-white rounded-lg shadow-lg p-8 border border-gray-100" role="listitem" aria-labelledby="faq-secteurs-marseille">
                <h3 id="faq-secteurs-marseille" className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Intervenez-vous sur tout Marseille ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous intervenons principalement sur Marseille, avec une forte expertise sur les secteurs centraux et résidentiels.
                </p>
              </article>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA FINAL */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="cta-final-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto text-center">
            <h2 id="cta-final-estimation" className="sr-only">Demander une estimation immobilière gratuite à Marseille</h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 md:p-10 shadow-lg border border-blue-200">
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Vous souhaitez une estimation honnête, réaliste et exploitable pour vendre dans de bons délais ?
              </p>
              <a
                ref={cta2ButtonRef as any}
                href="/estimation/formulaire"
                aria-label="Demander une estimation immobilière gratuite et réaliste à Marseille"
                className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: 'white',
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                  const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                  const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                  if (fill) {
                    fill.style.width = '100%'
                    fill.style.transform = 'translateX(-50%) scaleY(1)'
                  }
                  if (arrow) {
                    arrow.style.opacity = '1'
                    arrow.style.right = '-14px'
                  }
                  if (text) text.style.color = 'white'
                  if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                }}
                onMouseLeave={(e) => {
                  const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                  const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                  const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                  if (fill) {
                    fill.style.width = '0%'
                    fill.style.transform = 'translateX(-50%) scaleY(0)'
                  }
                  if (arrow) {
                    arrow.style.opacity = '0'
                    arrow.style.right = '-30px'
                  }
                  if (text) text.style.color = '#4682B4'
                  if (textSpan) textSpan.style.transform = 'translateX(0)'
                }}
              >
                {/* Fond bleu qui se remplit */}
                <span
                  className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                  style={{
                    width: '0%',
                    backgroundColor: '#4682B4',
                    transform: 'translateX(-50%) scaleY(0)',
                    transformOrigin: 'center bottom',
                    transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                    zIndex: 1
                  }}
                ></span>
                
                {/* Contenu du bouton */}
                <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                  <span className="transition-transform duration-300">Demander une estimation immobilière</span>
                  <svg
                    className="button-arrow absolute w-5 h-5 transition-all duration-300"
                    style={{
                      opacity: 0,
                      right: '-30px',
                      transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}
