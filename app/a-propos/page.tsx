'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useScrollImageAnimation } from '@/hooks/useScrollImageAnimation'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'
import Stepper, { Step } from '@/components/Stepper'
import { AnimatePresence, motion } from 'framer-motion'

export default function AProposPage() {
  const [isFondatriceImageHovered, setIsFondatriceImageHovered] = useState(false)
  const [isExpertiseImageHovered, setIsExpertiseImageHovered] = useState(false)
  const [selectiveToggleOn, setSelectiveToggleOn] = useState(false)
  const { imageRef: fondatriceImageRef, isAnimated: isFondatriceImageAnimated } = useScrollImageAnimation()
  const { imageRef: expertiseImageRef, isAnimated: isExpertiseImageAnimated } = useScrollImageAnimation()
  const venteButtonRef = useScrollButtonAnimation()
  const estimationButtonRef = useScrollButtonAnimation()
  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="Une agence immobilière expérimentée et méthodique"
        subtitle=""
        buttonText="Faire estimer mon bien"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/modern.webp"
      />

      {/* Section Pourquoi l'agence existe */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="pourquoi-agence-existe">
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
                      Pourquoi l'agence existe ?
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Texte à droite */}
              <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  L'Agence YL existe depuis environ 4 ans. Elle a été créée par sa présidente et fondatrice, 
                  qui exerce dans l'immobilier depuis plus de 10 ans.
                </p>
                <p>
                  Après plusieurs années d'expérience dans plusieurs agences indépendantes, la fondatrice 
                  a choisi de créer sa propre structure avec une conviction simple : un projet immobilier 
                  ne doit jamais être improvisé.
                </p>
                <p>
                  Chaque projet fait l'objet d'une analyse préalable avant tout engagement. L'agence 
                  privilégie les projets clairs, réfléchis et réalistes. Cette approche volontairement 
                  sélective garantit un accompagnement de qualité et des résultats cohérents.
                </p>
                <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#000000' }}>
                  <p className="font-semibold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Aujourd'hui, l'agence assume pleinement cette sélectivité. Elle préfère accompagner 
                    moins de projets, mais mieux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Notre façon de travailler */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="notre-facon-de-travailler">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="notre-facon-de-travailler" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Notre façon de travailler
              </h2>
            </div>
            <div className="text-lg text-gray-800 leading-relaxed space-y-6 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p>
                Chaque projet immobilier nécessite une méthode rigoureuse. Avant tout engagement, 
                l'agence procède à une analyse complète qui comprend :
              </p>
              <div className="mt-8 w-full flex justify-center [&_.stepper-step-default]:text-gray-800 [&_.stepper-step-default]:text-center">
                <Stepper
                  variant="light"
                  backButtonText="Précédent"
                  nextButtonText="Suivant"
                  completeButtonText="Terminer"
                  contentClassName="!mb-4"
                >
                  <Step>
                    <h3 id="estimation-realiste" className="text-lg font-semibold mb-2 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Estimation réaliste
                    </h3>
                    <p className="text-gray-800 text-sm leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Basée sur l'analyse du bien, de son environnement et de son état.
                    </p>
                  </Step>
                  <Step>
                    <h3 id="contexte-juridique" className="text-lg font-semibold mb-2 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Contexte juridique
                    </h3>
                    <p className="text-gray-800 text-sm leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Succession, divorce, vente classique, investissement. Chaque situation nécessite une approche adaptée.
                    </p>
                  </Step>
                  <Step>
                    <h3 id="marche-local" className="text-lg font-semibold mb-2 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Marché local
                    </h3>
                    <p className="text-gray-800 text-sm leading-relaxed text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse des biens similaires récemment vendus sur le même secteur pour établir une estimation précise.
                    </p>
                  </Step>
                </Stepper>
              </div>
              <p className="mt-8 text-center">
                Cette méthode permet d'identifier rapidement si un projet est viable et si l'agence 
                peut l'accompagner efficacement. Aucun engagement n'est pris sans cette analyse préalable.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Une agence sélective par choix */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="agence-selective-par-choix">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mx-auto mb-6" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="agence-selective-par-choix" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Une agence sélective par choix
              </h2>
            </div>
            <div className="flex flex-col items-center mb-8">
              {/* Conteneur pour la transition fluide gauche ↔ droite */}
              <div className="w-full max-w-xl relative overflow-hidden min-h-[22rem]">
                <AnimatePresence initial={false}>
                  {!selectiveToggleOn ? (
                    <motion.article
                      key="accepte"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="agence-accepte"
                    >
                      <div className="flex items-center justify-center mb-6">
<div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-emerald-300" aria-hidden="true" role="presentation">
                      <span className="text-white text-xl" aria-hidden="true">✓</span>
                    </div>
                    <h3 id="agence-accepte" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          L'agence accepte
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
                              Les vendeurs réfléchis, avec un projet structuré
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
                              Les biens standards ou à forte valeur
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
                              Les résidences principales, investisseurs, successions
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
                              Les projets avec des objectifs réalistes et cohérents
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  ) : (
                    <motion.article
                      key="refuse"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-400 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="agence-refuse"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✗</span>
                        </div>
                        <h3 id="agence-refuse" className="text-xl font-bold text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Cette agence n'accepte pas
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
                              Les prix irréalistes, déconnectés du marché
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
                              Les mandats simples sans analyse préalable
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
                              Les projets flous ou non aboutis
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
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Les situations où l'agence ne peut pas apporter de valeur
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle On/Off — design épuré et moderne */}
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  role="switch"
                  aria-checked={selectiveToggleOn}
                  aria-label={selectiveToggleOn ? 'Désactiver' : 'Activer'}
                  onClick={() => setSelectiveToggleOn((prev) => !prev)}
                  className={`relative inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors duration-300 ease-out w-[5rem] h-8 ${selectiveToggleOn ? 'bg-red-500' : 'bg-emerald-300'}`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span
                    className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-[transform] duration-300 ease-out"
                    style={{ transform: selectiveToggleOn ? 'translateX(calc(5rem - 1.5rem - 0.5rem))' : 'translateX(0)' }}
                  />
                  <span className="sr-only">{selectiveToggleOn ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-lg text-gray-700 italic max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette sélectivité est un choix assumé. Elle garantit un accompagnement de qualité 
                pour chaque projet accepté.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Un accompagnement transparent */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="accompagnement-transparent">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="accompagnement-transparent" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Un accompagnement transparent
              </h2>
            </div>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg border border-gray-200">
              <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  L'agence privilégie une communication régulière et transparente avec les propriétaires. 
                  Chaque étape est expliquée, chaque décision est justifiée.
                </p>
                <p>
                  Après chaque étape franchie, un compte-rendu est transmis. Après chaque visite, 
                  un débrief est effectué. Cette volonté de clarté permanente permet aux propriétaires 
                  de suivre l'avancement de leur projet en toute sérénité.
                </p>
                <p>
                  L'objectif est simple : que chaque propriétaire comprenne les actions menées, 
                  les résultats obtenus et les prochaines étapes. Aucune opacité, aucun flou.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Expertise à Saint-Germain-en-Laye */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="expertise-saint-germain">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image - En premier sur mobile */}
              <div
                ref={expertiseImageRef}
                className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl order-1 md:order-2"
              >
                <Image
                  src="/images/chateau_saint_germain_en_laye.webp"
                  alt="Château de Saint-Germain-en-Laye - Expertise immobilière locale"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre + CTA centrés, CTA avec design hero (blur) */}
                <div className="absolute inset-x-0 flex flex-col items-center justify-center gap-6 sm:gap-8" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="expertise-saint-germain" className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center text-white px-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Expertise à
                      <br />
                      Saint-Germain-en-Laye
                    </h2>
                  </FadeContent>
                  <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                    <div className="flex justify-center w-full">
                      <a
                        href="/estimation"
                        aria-label="Faire estimer mon bien immobilier à Saint-Germain-en-Laye gratuitement"
                        className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                        style={{
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                          textDecoration: 'none',
                          letterSpacing: '0.5px',
                        }}
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Estimer mon bien</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contenu à gauche */}
              <div className="space-y-6 order-2 md:order-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-light leading-tight text-black uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Une connaissance chirurgicale du patrimoine de Saint-Germain-en-Laye
                </h2>
                <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    Vendre ou acquérir un bien dans la cité royale ne s'improvise pas. Entre l'effervescence du centre-ville historique, le calme prisé du quartier d'Alsace ou la proximité immédiate du Lycée International, chaque rue possède sa propre dynamique de prix.
                  </p>
                  <p>
                    Notre approche repose sur une immersion quotidienne dans le marché saint-germanois. Nous ne nous contentons pas de moyennes statistiques : nous analysons l'architecture, l'histoire des copropriétés et les projets urbains qui valorisent votre patrimoine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section La fondatrice */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="la-fondatrice">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Titre */}
            <div className="mb-8 md:mb-12">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="la-fondatrice" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight text-center uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                La fondatrice
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image - Après le titre */}
              <div 
                ref={fondatriceImageRef}
                className="relative h-[400px] md:h-[500px] overflow-hidden shadow-xl order-1 md:order-1"
                onMouseEnter={() => setIsFondatriceImageHovered(true)}
                onMouseLeave={() => setIsFondatriceImageHovered(false)}
              >
                <Image
                  src="/images/Yman.png"
                  alt="Yman Lahlou, Fondatrice et Experte Immobilier Agréé à Marseille"
                  fill
                  className="object-cover"
                  priority
                />
                {/* CTA overlay sur l'image - Desktop */}
                <div 
                  className={`hidden md:flex absolute inset-0 items-center justify-center bg-black/40 transition-opacity duration-1000 ease-in-out ${
                    isFondatriceImageHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <a
                    href="mailto:lagenceyl@gmail.com"
                    aria-label="Contacter Yman Lahlou, fondatrice de l'agence immobilière à Marseille par email"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isFondatriceImageHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector('.underline-animation') as HTMLElement
                      if (underline) {
                        underline.style.width = '100%'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector('.underline-animation') as HTMLElement
                      if (underline) {
                        underline.style.width = '0%'
                      }
                    }}
                  >
                    Contacter Yman
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                      aria-hidden="true"
                      role="presentation"
                    ></span>
                  </a>
                </div>
                
                {/* CTA overlay sur l'image - Mobile */}
                <div 
                  className={`md:hidden absolute inset-0 flex items-end justify-center bg-black/40 transition-opacity duration-1000 ease-in-out pb-8 ${
                    isFondatriceImageAnimated ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                >
                  <a
                    href="mailto:lagenceyl@gmail.com"
                    aria-label="Contacter Yman Lahlou, fondatrice de l'agence immobilière à Marseille par email"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isFondatriceImageAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                  >
                    Contacter Yman
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: isFondatriceImageAnimated ? '100%' : '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                      aria-hidden="true"
                      role="presentation"
                    ></span>
                  </a>
                </div>
              </div>
              
              {/* Texte */}
              <div className="order-2 md:order-2">
                <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    L'Agence YL est une agence à taille humaine. Une seule interlocutrice : la présidente 
                    et fondatrice, qui gère personnellement chaque dossier.
                  </p>
                  <p>
                    Cette structure volontairement réduite garantit un suivi précis, une parfaite 
                    connaissance de chaque bien et une prise de décision rapide. Chaque propriétaire 
                    sait exactement à qui s'adresser, à chaque étape de son projet.
                  </p>
                  <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-6" style={{ borderColor: '#000000' }}>
                    <p className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      De l'estimation à la signature finale, la fondatrice accompagne personnellement 
                      chaque projet. Ce choix est un gage de qualité et de réactivité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Icônes réseaux sociaux */}
            <div className="flex justify-center items-center gap-6 mt-12">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                aria-label="Profil LinkedIn de Yman Lahlou, fondatrice de l'agence immobilière à Marseille"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="#0077B5"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                aria-label="Page Facebook de l'agence immobilière à Marseille"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                aria-label="Profil Instagram de l'agence immobilière à Marseille"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="url(#instagram-gradient)"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E4405F" />
                      <stop offset="50%" stopColor="#C13584" />
                      <stop offset="100%" stopColor="#833AB4" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section CTA Final - même rendu que la page d'accueil */}
      <section className="relative min-h-screen flex items-center justify-center" aria-labelledby="cta-final-a-propos">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/modern.webp"
              alt="L'Agence YL - Agence immobilière à Saint-Germain-en-Laye"
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
              <h2 id="cta-final-a-propos" className="sr-only">Contactez l'agence immobilière à Marseille</h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed px-2 mb-8 sm:mb-12 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Un projet immobilier mérite une vraie réflexion. Commencez par la bonne étape.
              </p>
            </FadeContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    ref={venteButtonRef as any}
                    href="/vente"
                    aria-label="Accéder au service de vente immobilière à Marseille"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Accéder au service Vente</span>
                  </a>
                </div>
              </div>
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    ref={estimationButtonRef as any}
                    href="/estimation"
                    aria-label="Demander une estimation immobilière gratuite à Marseille"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Demander une estimation</span>
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
