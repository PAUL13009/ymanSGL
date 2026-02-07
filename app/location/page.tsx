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

export default function LocationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const ctaFinalButtonRef = useScrollButtonAnimation()
  const [locationToggleOn, setLocationToggleOn] = useState(false)

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
        title="Location immobilière avec méthode et sélection"
        subtitle=""
        buttonText="Nous contacter pour un projet de location"
        buttonLink="#contact"
        imagePath="/images/modern.webp"
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
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="qui-sadresse-location" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                À qui s'adresse ce service
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Ce service s'adresse aux propriétaires qui :
              </p>
              <div className="w-full flex justify-center">
                <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                  <Step>
                    <div className="flex justify-center">
                      <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Souhaitent louer leur bien dans un cadre sécurisé
                      </span>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex justify-center">
                      <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Accordent de l'importance à la sélection des locataires
                      </span>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex justify-center">
                      <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Veulent un interlocuteur unique et impliqué
                      </span>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex justify-center">
                      <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Privilégient la qualité des dossiers plutôt que la rapidité à tout prix
                      </span>
                    </div>
                  </Step>
                </Stepper>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 4 — NOTRE MÉTHODE DE MISE EN LOCATION */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="methode-mise-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="methode-mise-location" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Notre méthode de mise en location
              </h2>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg mb-8">
              <h3 id="methode-claire-depart" className="text-2xl md:text-3xl font-light mb-6 text-center uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Une méthode claire, dès le départ
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Chaque mise en location débute par une analyse du bien et de son contexte.
                </p>
                <p>
                  Nous définissons ensemble les conditions de location, le positionnement du bien et les critères de sélection des locataires.
                </p>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                <Step>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse du bien et de sa conformité
                    </span>
                  </div>
                </Step>
                <Step>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Définition du loyer en cohérence avec le marché
                    </span>
                  </div>
                </Step>
                <Step>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Rédaction et diffusion de l'annonce
                    </span>
                  </div>
                </Step>
                <Step>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Organisation et gestion des visites
                    </span>
                  </div>
                </Step>
                <Step>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Sélection rigoureuse des dossiers
                    </span>
                  </div>
                </Step>
                <Step>
                  <div className="flex justify-center">
                    <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Accompagnement jusqu'à la signature
                    </span>
                  </div>
                </Step>
              </Stepper>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 5 — LA SÉLECTION DES LOCATAIRES */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="selection-locataires">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="selection-locataires" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                La sélection des locataires
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <h3 id="selection-rigoureuse-dossiers" className="text-2xl md:text-3xl font-light mb-6 text-center uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Une sélection rigoureuse des dossiers
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Tous les dossiers sont étudiés avec attention.
                </p>
                <p>
                  Notre priorité est de présenter au propriétaire des candidatures sérieuses, cohérentes et compatibles avec le bien proposé.
                </p>
                <p className="font-semibold mt-6 text-black">
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
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="transparence-suivi-location" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Transparence et suivi
              </h2>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <h3 id="suivi-clair-regulier" className="text-2xl md:text-3xl font-light mb-6 text-center uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Un suivi clair et régulier
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Tout au long du processus, le propriétaire est informé des avancées :
                  visites réalisées, retours, candidatures reçues et étapes à venir.
                </p>
                <p className="font-semibold mt-6 text-black">
                  Cette transparence permet de prendre des décisions éclairées, sans précipitation.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 7 — CE QUE NOUS ACCEPTONS / CE QUE NOUS REFUSONS */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="acceptons-refusons-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mx-auto mb-6" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="acceptons-refusons-location" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Ce que nous acceptons / Ce que nous refusons
              </h2>
            </div>
            <div className="flex flex-col items-center mb-8">
              {/* Conteneur pour la transition fluide gauche ↔ droite */}
              <div className="w-full max-w-xl relative overflow-hidden min-h-[22rem]">
                <AnimatePresence initial={false}>
                  {!locationToggleOn ? (
                    <motion.article
                      key="accompagnons"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="nous-accompagnons-location"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-emerald-300" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✓</span>
                        </div>
                        <h3 id="nous-accompagnons-location" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Nous accompagnons
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
                              Les projets de location clairs et structurés
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
                              Les propriétaires souhaitant s'inscrire dans un cadre légal
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
                              Les biens correctement positionnés sur le marché
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  ) : (
                    <motion.article
                      key="refusons"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="nous-refusons-location"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-red-500" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✗</span>
                        </div>
                        <h3 id="nous-refusons-location" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Nous refusons
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
                              Les conditions irréalistes
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
                              Les projets flous ou non définis
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
                              Les démarches sans cadre ni suivi
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
                  aria-checked={locationToggleOn}
                  aria-label={locationToggleOn ? 'Désactiver' : 'Activer'}
                  onClick={() => setLocationToggleOn((prev) => !prev)}
                  className={`relative inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors duration-300 ease-out w-[5rem] h-8 ${locationToggleOn ? 'bg-red-500' : 'bg-emerald-300'}`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span
                    className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-[transform] duration-300 ease-out"
                    style={{ transform: locationToggleOn ? 'translateX(calc(5rem - 1.5rem - 0.5rem))' : 'translateX(0)' }}
                  />
                  <span className="sr-only">{locationToggleOn ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* SECTION 8 — CTA FINAL */}
      <section className="relative min-h-screen flex items-center justify-center" aria-labelledby="cta-final-location">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/modern.webp"
              alt="L'Agence YL - Service de location immobilière à Saint-Germain-en-Laye"
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
              <h2 id="cta-final-location" className="sr-only">Contacter l'agence pour un projet de location immobilière</h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed px-2 mb-8 sm:mb-12 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Chaque projet de location est différent.
                <br />
                Le plus important est de vérifier que notre approche correspond à vos attentes.
              </p>
            </FadeContent>
            <div className="flex justify-center items-center">
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    ref={ctaFinalButtonRef as any}
                    href="#contact"
                    aria-label="Nous contacter pour un projet de location immobilière"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Nous contacter pour un projet de location</span>
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
