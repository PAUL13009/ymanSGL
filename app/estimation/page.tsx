'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function EstimationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

  return (
    <main ref={mainRef} className="min-h-screen">
      <Navbar />
      
      {/* SECTION 1 — HERO */}
      <Hero 
        title="Estimation immobilière à Marseille basée sur le prix réel du marché"
        subtitle="Pour les propriétaires de résidence principale qui souhaitent vendre efficacement, sans surévaluer leur bien et sans perdre de temps."
        microText="Une estimation juste est la condition indispensable pour vendre dans de bons délais. Nous réalisons des estimations 100 % gratuites, fondées sur les ventes réelles du marché marseillais, et non sur des algorithmes approximatifs."
        buttonText="Demander une estimation réaliste"
        buttonLink="/estimation/formulaire"
      />

      {/* SECTION 2 — LE PROBLÈME (MIROIR MARCHÉ) */}
      <section className="py-16 bg-white">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Pourquoi de nombreuses estimations échouent à Marseille
              </h2>
            </div>
            
            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0}
              >
                <p>
                  À Marseille, une grande partie des biens mis en vente restent plusieurs mois sur le marché.
                </p>
              </AnimatedContent>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.1}
              >
                <p>
                  La cause principale n'est ni la qualité du bien, ni la demande, mais un prix de départ mal positionné.
                </p>
              </AnimatedContent>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.2}
              >
                <p className="font-semibold mb-4" style={{ color: '#4682B4' }}>
                  Une estimation trop optimiste entraîne :
                </p>
              </AnimatedContent>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.3}
                >
                  <li>une perte d'attractivité dès les premières semaines,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.4}
                >
                  <li>des visites peu qualifiées,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.5}
                >
                  <li>des négociations tardives et agressives,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.6}
                >
                  <li>parfois l'échec pur et simple de la vente.</li>
                </AnimatedContent>
              </ul>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.7}
              >
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Le prix affiché dès le départ conditionne toute la suite du processus.
                </p>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 3 — NOTRE DIFFÉRENCE */}
      <section className="py-16 bg-stone-50">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Une estimation fondée sur la réalité du marché, pas sur des promesses
              </h2>
            </div>
            
            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0}
              >
                <p>
                  Notre approche de l'estimation immobilière repose sur un principe simple :
                  <br />
                  <span className="font-semibold" style={{ color: '#4682B4' }}>un bien se vend au prix que le marché est prêt à payer, pas au prix espéré.</span>
                </p>
              </AnimatedContent>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.2}
              >
                <p className="font-semibold mb-4" style={{ color: '#4682B4' }}>
                  Contrairement aux estimateurs automatiques ou aux avis approximatifs :
                </p>
              </AnimatedContent>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.3}
                >
                  <li>nous analysons les ventes réelles récentes,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.4}
                >
                  <li>nous tenons compte du secteur précis,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.5}
                >
                  <li>nous intégrons les spécificités du bien,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.6}
                >
                  <li>nous positionnons un prix vendable, cohérent et défendable.</li>
                </AnimatedContent>
              </ul>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.7}
              >
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  L'objectif n'est pas d'annoncer le chiffre le plus élevé, mais le prix qui permet de vendre dans de bons délais.
                </p>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 4 — NOTRE MÉTHODE D'ESTIMATION */}
      <section className="py-16 bg-white">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Comment nous réalisons votre estimation immobilière
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Étape 1 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0}
              >
                <div className="bg-stone-50 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                        Analyse du marché local
                      </h3>
                      <p className="text-gray-700 font-light leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Étude des ventes récentes comparables dans votre secteur à Marseille, en tenant compte de la réalité actuelle du marché.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              {/* Étape 2 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.1}
              >
                <div className="bg-stone-50 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                        Analyse détaillée de votre bien
                      </h3>
                      <p className="text-gray-700 font-light leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Surface, état, étage, exposition, environnement, prestations, contraintes éventuelles : chaque élément est pris en compte.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              {/* Étape 3 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.2}
              >
                <div className="bg-stone-50 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                        Positionnement stratégique du prix
                      </h3>
                      <p className="text-gray-700 font-light leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Définition d'un prix cohérent avec le marché, permettant de susciter une demande qualifiée dès la mise en vente.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              {/* Étape 4 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.3}
              >
                <div className="bg-stone-50 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                        Projection des délais de vente
                      </h3>
                      <p className="text-gray-700 font-light leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Objectif visé : une vente maîtrisée sous 2,5 à 3 mois, dans des conditions normales de marché.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 5 — LE FILTRE (ASSUMÉ) */}
      <section className="py-16 bg-stone-50">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 rounded-lg p-8 md:p-12 shadow-lg" style={{ borderColor: '#4682B4' }}>
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  ⚠️ Nous refusons les estimations destinées à surévaluer un bien.
                </h3>
              </div>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0}
                >
                  <p>
                    Si votre objectif est d'afficher un prix déconnecté du marché, nous préférons ne pas intervenir.
                  </p>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.1}
                >
                  <p>
                    Cette exigence est volontaire et assumée : elle conditionne la qualité de notre travail et l'efficacité de la vente.
                  </p>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.2}
                >
                  <p>
                    Nous privilégions les projets sérieux, basés sur une estimation réaliste et une stratégie claire.
                  </p>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 6 — À QUI S'ADRESSE CETTE ESTIMATION */}
      <section className="py-16 bg-white">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                À qui s'adresse cette estimation
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Colonne gauche - OUI */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0}
              >
                <div className="bg-stone-50 rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
                  <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Cette estimation est adaptée si :
                  </h3>
                  <ul className="space-y-4 w-full text-left">
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>✓</span>
                      <span>vous êtes propriétaire d'une résidence principale à Marseille,</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>✓</span>
                      <span>vous envisagez une vente à court ou moyen terme,</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>✓</span>
                      <span>vous êtes ouvert à un prix fondé sur le marché réel,</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>✓</span>
                      <span>vous recherchez une approche claire, honnête et structurée.</span>
                    </li>
                  </ul>
                </div>
              </AnimatedContent>

              {/* Colonne droite - NON */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.1}
              >
                <div className="bg-stone-50 rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
                  <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Cette estimation n'est pas adaptée si :
                  </h3>
                  <ul className="space-y-4 w-full text-left">
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#dc2626' }}>✗</span>
                      <span>vous cherchez uniquement à connaître un prix "maximum" sans projet réel,</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#dc2626' }}>✗</span>
                      <span>vous souhaitez comparer des chiffres sans intention de vendre,</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed font-light flex items-start" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="mr-3 mt-1" style={{ color: '#dc2626' }}>✗</span>
                      <span>vous refusez toute remise en question du prix.</span>
                    </li>
                  </ul>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 7 — FORMULAIRE D'ESTIMATION (INTRO TEXTE) */}
      <section className="py-16 bg-stone-50">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Demander une estimation immobilière gratuite
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0}
                >
                  <p>
                    L'estimation peut être réalisée :
                  </p>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.1}
                >
                  <ul className="list-disc list-inside space-y-2 text-left max-w-xl mx-auto">
                    <li>en ligne, à partir des informations et des photos de votre bien,</li>
                    <li>ou sur place, si la configuration du bien le nécessite.</li>
                  </ul>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.2}
                >
                  <p className="font-semibold mt-4" style={{ color: '#4682B4' }}>
                    Merci de fournir des informations précises.
                    <br />
                    Elles conditionnent la qualité et la fiabilité de l'estimation.
                  </p>
                </AnimatedContent>
              </div>
            </div>

            {/* CTA vers le formulaire */}
            <div className="text-center">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.3}
              >
                <a
                  href="/estimation/formulaire"
                  className="inline-block px-8 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: '#4682B4',
                    color: 'white',
                    fontFamily: 'var(--font-poppins), sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3a6a8f'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4'
                  }}
                >
                  Recevoir mon estimation réaliste
                </a>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 8 — RÉASSURANCE SOBRE */}
      <section className="py-16 bg-white">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0}
              >
                <p>
                  Agence immobilière indépendante à Marseille, nous travaillons volontairement sur un nombre limité de projets afin de garantir :
                </p>
              </AnimatedContent>
              <ul className="list-disc list-inside space-y-2 max-w-2xl mx-auto text-left">
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.1}
                >
                  <li>une analyse précise,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.2}
                >
                  <li>une vraie disponibilité,</li>
                </AnimatedContent>
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  threshold={0.2}
                  delay={0.3}
                >
                  <li>et une stratégie cohérente pour chaque bien.</li>
                </AnimatedContent>
              </ul>
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.4}
              >
                <p className="font-semibold mt-6" style={{ color: '#4682B4' }}>
                  Notre approche privilégie la qualité des projets, pas le volume.
                </p>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="py-16 bg-stone-50">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Questions fréquentes sur l'estimation immobilière
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Question 1 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Comment est calculée l'estimation ?
                  </h3>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'estimation repose sur l'analyse des ventes réelles comparables, l'étude du marché local et les caractéristiques spécifiques du bien.
                  </p>
                </div>
              </AnimatedContent>

              {/* Question 2 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.1}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    L'estimation est-elle vraiment gratuite ?
                  </h3>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Oui. L'estimation est entièrement gratuite et sans engagement.
                  </p>
                </div>
              </AnimatedContent>

              {/* Question 3 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.2}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Combien de temps l'estimation est-elle valable ?
                  </h3>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Une estimation reflète un marché à un instant donné. Elle est généralement valable quelques semaines, selon l'évolution du marché.
                  </p>
                </div>
              </AnimatedContent>

              {/* Question 4 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.3}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Intervenez-vous sur tout Marseille ?
                  </h3>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous intervenons principalement sur Marseille, avec une forte expertise sur les secteurs centraux et résidentiels.
                  </p>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-white">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedContent
              distance={50}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0}
            >
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Vous souhaitez une estimation honnête, réaliste et exploitable pour vendre dans de bons délais ?
              </p>
            </AnimatedContent>
            <AnimatedContent
              distance={50}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.1}
            >
              <a
                href="/estimation/formulaire"
                className="inline-block px-8 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: '#4682B4',
                  color: 'white',
                  fontFamily: 'var(--font-poppins), sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a6a8f'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4682B4'
                }}
              >
                Demander une estimation immobilière
              </a>
            </AnimatedContent>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}
