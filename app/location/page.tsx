'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function LocationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()

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
        title="Location immobilière à Marseille, avec méthode et sélection"
        subtitle="Un accompagnement structuré pour les propriétaires qui souhaitent louer leur bien dans de bonnes conditions, en toute transparence."
        buttonText="Nous contacter pour un projet de location"
        buttonLink="#contact"
        imagePath="/images/vue7e.png"
      />

      {/* SECTION 2 — INTRODUCTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="introduction-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <h2 id="introduction-location" className="sr-only">Introduction au service de location immobilière à Marseille</h2>
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Mettre un bien en location ne se résume pas à publier une annonce.
                </p>
                <p>
                  C'est un processus qui engage le propriétaire sur le plan juridique, financier et humain.
                </p>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Notre rôle est d'encadrer cette mise en location avec rigueur, en sélectionnant des dossiers sérieux et en assurant un suivi clair à chaque étape.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 3 — À QUI S'ADRESSE CE SERVICE */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="qui-sadresse-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="qui-sadresse-location" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                À qui s'adresse ce service
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Ce service s'adresse aux propriétaires qui :
              </p>
              <ul className="space-y-4 text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                    <span>Souhaitent louer leur bien dans un cadre sécurisé</span>
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
                    <span>Accordent de l'importance à la sélection des locataires</span>
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
                    <span>Veulent un interlocuteur unique et impliqué</span>
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
                    <span>Privilégient la qualité des dossiers plutôt que la rapidité à tout prix</span>
                  </li>
                </AnimatedContent>
              </ul>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 4 — NOTRE MÉTHODE DE MISE EN LOCATION */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="methode-mise-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="methode-mise-location" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Notre méthode de mise en location
              </h2>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg mb-8">
              <h3 id="methode-claire-depart" className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Une méthode claire, dès le départ
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Chaque mise en location débute par une analyse du bien et de son contexte.
                </p>
                <p>
                  Nous définissons ensemble les conditions de location, le positionnement du bien et les critères de sélection des locataires.
                </p>
              </div>
            </div>

            <div className="space-y-6" role="list">
              {/* Étape 1 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-1-location">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-1-location" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse du bien et de sa conformité
                    </h3>
                  </div>
                </div>
              </article>

              {/* Étape 2 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-2-location">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-2-location" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Définition du loyer en cohérence avec le marché
                    </h3>
                  </div>
                </div>
              </article>

              {/* Étape 3 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-3-location">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-3-location" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Rédaction et diffusion de l'annonce
                    </h3>
                  </div>
                </div>
              </article>

              {/* Étape 4 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-4-location">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-4-location" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Organisation et gestion des visites
                    </h3>
                  </div>
                </div>
              </article>

              {/* Étape 5 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-5-location">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-5-location" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Sélection rigoureuse des dossiers
                    </h3>
                  </div>
                </div>
              </article>

              {/* Étape 6 */}
              <article className="bg-stone-50 rounded-lg p-8 shadow-lg border border-gray-100" role="listitem" aria-labelledby="etape-6-location">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-md" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }} aria-hidden="true" role="presentation">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 id="etape-6-location" className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Accompagnement jusqu'à la signature
                    </h3>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 5 — LA SÉLECTION DES LOCATAIRES */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="selection-locataires">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="selection-locataires" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                La sélection des locataires
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <h3 id="selection-rigoureuse-dossiers" className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Une sélection rigoureuse des dossiers
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Tous les dossiers sont étudiés avec attention.
                </p>
                <p>
                  Notre priorité est de présenter au propriétaire des candidatures sérieuses, cohérentes et compatibles avec le bien proposé.
                </p>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Chaque dossier fait l'objet d'une analyse complète avant toute décision.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 6 — TRANSPARENCE ET SUIVI */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="transparence-suivi-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="transparence-suivi-location" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Transparence et suivi
              </h2>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <h3 id="suivi-clair-regulier" className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Un suivi clair et régulier
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Tout au long du processus, le propriétaire est informé des avancées :
                  visites réalisées, retours, candidatures reçues et étapes à venir.
                </p>
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Cette transparence permet de prendre des décisions éclairées, sans précipitation.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 7 — CE QUE NOUS ACCEPTONS / CE QUE NOUS REFUSONS */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="acceptons-refusons-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="acceptons-refusons-location" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Ce que nous acceptons / Ce que nous refusons
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12" role="list">
              {/* Colonne gauche - ACCEPTÉ */}
              <article className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-600 cursor-pointer group" style={{ borderColor: '#4682B4' }} role="listitem" aria-labelledby="nous-accompagnons-location">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 id="nous-accompagnons-location" className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                    Nous accompagnons
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
                      <span>Les projets de location clairs et structurés</span>
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
                      <span>Les propriétaires souhaitant s'inscrire dans un cadre légal et cohérent</span>
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
                      <span>Les biens correctement positionnés sur le marché</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>

              {/* Colonne droite - REFUSÉ */}
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-400 cursor-pointer group" role="listitem" aria-labelledby="nous-refusons-location">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                  <h3 id="nous-refusons-location" className="text-xl font-bold text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous refusons
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
                      <span>Les conditions irréalistes</span>
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
                      <span>Les projets flous ou non définis</span>
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
                      <span>Les démarches sans cadre ni suivi</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 8 — CTA FINAL */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="cta-final-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto text-center">
            <h2 id="cta-final-location" className="sr-only">Contacter l'agence pour un projet de location immobilière à Marseille</h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 md:p-10 shadow-lg border border-blue-200">
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Chaque projet de location est différent.
                <br />
                Le plus important est de vérifier que notre approche correspond à vos attentes.
              </p>
              <a
                href="#contact"
                aria-label="Nous contacter pour un projet de location immobilière à Marseille"
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
                  <span className="transition-transform duration-300">Nous contacter pour un projet de location</span>
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
