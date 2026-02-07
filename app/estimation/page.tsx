'use client'

import { useRef, useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Image from 'next/image'
import Stepper, { Step } from '@/components/Stepper'
import { AnimatePresence, motion } from 'framer-motion'
import { useProximityContainer } from '@/components/ProximityProvider'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

export default function EstimationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const cta2ButtonRef = useScrollButtonAnimation()
  const ctaFinalButtonRef = useScrollButtonAnimation()
  const [estimationToggleOn, setEstimationToggleOn] = useState(false)

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
        title="Estimation immobilière basée sur le prix réel du marché"
        subtitle=""
        buttonText="Demander une estimation réaliste"
        buttonLink="/estimation/formulaire"
        imagePath="/images/modern.webp"
      />

      {/* SECTION 2 — LE PROBLÈME */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="probleme-estimations-marseille">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="probleme-estimations-marseille" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Pourquoi de nombreuses estimations échouent ?
              </h2>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Une grande partie des biens mis en vente restent plusieurs mois sur le marché.
                </p>
                <p>
                  La cause principale n'est ni la qualité du bien, ni la demande, mais un prix de départ mal positionné.
                </p>
                <p className="font-semibold mb-4 text-black">
                  Une estimation trop optimiste entraîne :
                </p>
                <div className="flex flex-col items-center gap-3">
                  <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    une perte d'attractivité dès les premières semaines
                  </span>
                  <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    des visites peu qualifiées
                  </span>
                  <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    des négociations tardives et agressives
                  </span>
                  <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    parfois l'échec pur et simple de la vente
                  </span>
                </div>
                <p className="font-semibold mt-6 text-black">
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
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="estimation-realite-marche" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Une estimation fondée sur la réalité du marché, pas sur des promesses
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Notre approche de l'estimation immobilière repose sur un principe simple :
                  <br />
                  <span className="font-semibold text-black">un bien se vend au prix que le marché est prêt à payer, pas au prix espéré.</span>
                </p>
                <p className="font-semibold mb-4 text-black">
                  Contrairement aux estimateurs automatiques ou aux avis approximatifs :
                </p>
                <div className="flex flex-col items-center gap-3">
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    nous analysons les ventes réelles récentes
                  </span>
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    nous tenons compte du secteur précis
                  </span>
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    nous intégrons les spécificités du bien
                  </span>
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    nous positionnons un prix vendable, cohérent et défendable
                  </span>
                </div>
                <p className="font-semibold mt-6 text-black">
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
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="methode-estimation" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Comment nous réalisons votre estimation immobilière
              </h2>
            </div>
            
            <div className="w-full flex justify-center">
              <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                <Step>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse du marché local
                    </h3>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Étude des ventes récentes comparables dans votre secteur à Marseille, en tenant compte de la réalité actuelle du marché.
                    </span>
                  </div>
                </Step>
                <Step>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse détaillée de votre bien
                    </h3>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Surface, état, étage, exposition, environnement, prestations, contraintes éventuelles : chaque élément est pris en compte.
                    </span>
                  </div>
                </Step>
                <Step>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Positionnement stratégique du prix
                    </h3>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Définition d'un prix cohérent avec le marché, permettant de susciter une demande qualifiée dès la mise en vente.
                    </span>
                  </div>
                </Step>
                <Step>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Projection des délais de vente
                    </h3>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Objectif visé : une vente maîtrisée sous 2,5 à 3 mois, dans des conditions normales de marché.
                    </span>
                  </div>
                </Step>
              </Stepper>
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
                <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
                <h3 id="filtre-estimation" className="text-2xl md:text-3xl font-light mb-4 uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="qui-sadresse-estimation" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                À qui s'adresse cette estimation
              </h2>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              {/* Conteneur pour la transition fluide gauche ↔ droite */}
              <div className="w-full max-w-xl relative overflow-hidden min-h-[22rem]">
                <AnimatePresence initial={false}>
                  {!estimationToggleOn ? (
                    <motion.article
                      key="adaptee"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="estimation-adaptee-si"
                    >
                <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-emerald-300" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                        <h3 id="estimation-adaptee-si" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Cette estimation est adaptée si :
                  </h3>
                </div>
                      <ul className="flex flex-col items-center gap-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              vous êtes propriétaire d'une résidence principale à Marseille
                            </span>
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              vous envisagez une vente à court ou moyen terme
                            </span>
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              vous êtes ouvert à un prix fondé sur le marché réel
                            </span>
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              vous recherchez une approche claire, honnête et structurée
                            </span>
                    </li>
                  </AnimatedContent>
                </ul>
                    </motion.article>
                  ) : (
                    <motion.article
                      key="pas-adaptee"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="estimation-pas-adaptee-si"
                    >
                <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-red-500" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                        <h3 id="estimation-pas-adaptee-si" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Cette estimation n'est pas adaptée si :
                  </h3>
                </div>
                      <ul className="flex flex-col items-center gap-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              vous cherchez uniquement à connaître un prix "maximum" sans projet réel
                            </span>
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              vous souhaitez comparer des chiffres sans intention de vendre
                            </span>
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
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              vous refusez toute remise en question du prix
                            </span>
                    </li>
                  </AnimatedContent>
                </ul>
                    </motion.article>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle On/Off — design épuré et moderne */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={estimationToggleOn}
                  aria-label={estimationToggleOn ? 'Désactiver' : 'Activer'}
                  onClick={() => setEstimationToggleOn((prev) => !prev)}
                  className={`relative inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors duration-300 ease-out w-[5rem] h-8 ${estimationToggleOn ? 'bg-red-500' : 'bg-emerald-300'}`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span
                    className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-[transform] duration-300 ease-out"
                    style={{ transform: estimationToggleOn ? 'translateX(calc(5rem - 1.5rem - 0.5rem))' : 'translateX(0)' }}
                  />
                  <span className="sr-only">{estimationToggleOn ? 'On' : 'Off'}</span>
                </button>
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
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-qualite-estimation" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Une approche privilégiant la qualité
              </h2>
            </div>
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="text-center space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Agence immobilière indépendante à Marseille, nous travaillons volontairement sur un nombre limité de projets afin de garantir :
                </p>
                <div className="flex flex-col items-center gap-3 mt-6">
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    une analyse précise
                  </span>
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    une vraie disponibilité
                  </span>
                  <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    une stratégie cohérente pour chaque bien
                  </span>
                </div>
                <p className="font-semibold mt-6 text-black">
                  Notre approche privilégie la qualité des projets, pas le volume.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA FINAL */}
      <section className="relative min-h-screen flex items-center justify-center" aria-labelledby="cta-final-estimation">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/modern.webp"
              alt="L'Agence YL - Estimation immobilière à Saint-Germain-en-Laye"
              fill
              className="object-cover"
              loading="lazy"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" role="presentation" />
          </div>
        </div>
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
              <h2 id="cta-final-estimation" className="sr-only">Demander une estimation immobilière gratuite</h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed px-2 mb-8 sm:mb-12 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Vous souhaitez une estimation honnête, réaliste et exploitable pour vendre dans de bons délais ?
              </p>
            </FadeContent>
            <div className="flex justify-center items-center">
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
              <a
                    ref={ctaFinalButtonRef as any}
                href="/estimation/formulaire"
                    aria-label="Demander une estimation immobilière gratuite et réaliste"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Demander une estimation immobilière</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
