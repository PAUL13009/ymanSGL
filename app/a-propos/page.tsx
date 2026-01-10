'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useScrollImageAnimation } from '@/hooks/useScrollImageAnimation'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

export default function AProposPage() {
  const [isFondatriceImageHovered, setIsFondatriceImageHovered] = useState(false)
  const [isExpertiseImageHovered, setIsExpertiseImageHovered] = useState(false)
  const { imageRef: fondatriceImageRef, isAnimated: isFondatriceImageAnimated } = useScrollImageAnimation()
  const { imageRef: expertiseImageRef, isAnimated: isExpertiseImageAnimated } = useScrollImageAnimation()
  const venteButtonRef = useScrollButtonAnimation()
  const estimationButtonRef = useScrollButtonAnimation()
  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="Une agence immobilière indépendante, fondée sur l'expérience et la méthode"
        subtitle="Depuis plus de 10 ans, nous accompagnons des projets immobiliers à Marseille avec une approche structurée, exigeante et volontairement sélective."
        buttonText="Faire estimer mon bien"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/vue7e.png"
      />

      {/* Section Pourquoi l'agence existe */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="pourquoi-agence-existe">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image à gauche avec titre superposé */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl">
                <Image
                  src="/images/Notre-Dame-de-la-Garde-Marseille.jpg"
                  alt="Vue de Notre-Dame de la Garde à Marseille depuis l'agence immobilière"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="pourquoi-agence-existe" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center text-white px-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Pourquoi l'agence existe ?
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Texte à droite */}
              <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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
                <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#4682B4' }}>
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
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="notre-facon-de-travailler">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="notre-facon-de-travailler" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Notre façon de travailler
              </h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6 text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p>
                Chaque projet immobilier nécessite une méthode rigoureuse. Avant tout engagement, 
                l'agence procède à une analyse complète qui comprend :
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8" role="list">
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 cursor-pointer group" role="listitem" aria-labelledby="estimation-realiste">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl font-bold" aria-hidden="true">1</span>
                  </div>
                  <h3 id="estimation-realiste" className="text-lg font-semibold mb-2 text-gray-900 transition-colors duration-300 group-hover:text-blue-600 text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Estimation réaliste
                  </h3>
                  <p className="text-gray-700 text-sm text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Basée sur l'analyse du bien, de son environnement et de son état.
                  </p>
                </article>
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 cursor-pointer group" role="listitem" aria-labelledby="contexte-juridique">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl font-bold" aria-hidden="true">2</span>
                </div>
                  <h3 id="contexte-juridique" className="text-lg font-semibold mb-2 text-gray-900 transition-colors duration-300 group-hover:text-blue-600 text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Contexte juridique
                  </h3>
                  <p className="text-gray-700 text-sm text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Succession, divorce, vente classique, investissement. Chaque situation nécessite une approche adaptée.
                  </p>
                </article>
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 cursor-pointer group" role="listitem" aria-labelledby="marche-local">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl font-bold" aria-hidden="true">3</span>
                </div>
                  <h3 id="marche-local" className="text-lg font-semibold mb-2 text-gray-900 transition-colors duration-300 group-hover:text-blue-600 text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Marché local
                  </h3>
                  <p className="text-gray-700 text-sm text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Analyse des biens similaires récemment vendus sur le même secteur pour établir une estimation précise.
                  </p>
                </article>
                </div>
              <p className="mt-8 text-center md:text-left">
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
              <div className="w-16 h-1 bg-blue-600 mx-auto mb-6" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="agence-selective-par-choix" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Une agence sélective par choix
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8" role="list">
              {/* Accepté */}
              <article className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group" style={{ borderColor: '#4682B4' }} role="listitem" aria-labelledby="agence-accepte">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 id="agence-accepte" className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                    L'agence accepte
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
                      <span>Les vendeurs réfléchis, avec un projet structuré</span>
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
                      <span>Les biens standards ou à forte valeur</span>
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
                      <span>Les résidences principales, investisseurs, successions</span>
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
                      <span>Les projets avec des objectifs réalistes et cohérents</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
              
              {/* Refusé */}
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-400 cursor-pointer group" role="listitem" aria-labelledby="agence-refuse">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                  <h3 id="agence-refuse" className="text-xl font-bold text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'agence refuse
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
                      <span>Les prix irréalistes, déconnectés du marché</span>
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
                      <span>Les mandats simples sans analyse préalable</span>
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
                      <span>Les projets flous ou non aboutis</span>
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
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Les situations où l'agence ne peut pas apporter de valeur réelle</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
            </div>
            <div className="text-center mt-10">
              <p className="text-lg text-gray-600 italic max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette sélectivité est un choix assumé. Elle garantit un accompagnement de qualité 
                pour chaque projet accepté.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Un accompagnement transparent */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="accompagnement-transparent">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="accompagnement-transparent" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Un accompagnement transparent
              </h2>
            </div>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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

      {/* Section Expertise locale à Marseille */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="expertise-locale-marseille">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image - En premier sur mobile */}
              <div 
                ref={expertiseImageRef}
                className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl order-1 md:order-2"
                onMouseEnter={() => setIsExpertiseImageHovered(true)}
                onMouseLeave={() => setIsExpertiseImageHovered(false)}
              >
                <Image
                  src="/images/marseille-hauteur.jpg"
                  alt="Vue aérienne de Marseille - Expertise immobilière locale 6e au 15e arrondissement"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="expertise-locale-marseille" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center text-white px-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Expertise locale à Marseille
                    </h2>
                  </FadeContent>
                </div>
                {/* CTA overlay sur l'image - Desktop */}
                <div 
                  className={`hidden md:flex absolute inset-x-0 items-center justify-center transition-opacity duration-1000 ease-in-out ${
                    isExpertiseImageHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ top: 'calc(50% + 2cm)', zIndex: 10 }}
                >
                  <a
                    href="/estimation"
                    aria-label="Faire estimer mon bien immobilier à Marseille gratuitement"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isExpertiseImageHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                    Estimer mon bien
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
                  className={`md:hidden absolute inset-x-0 bottom-0 flex items-end justify-center bg-black/40 transition-opacity duration-1000 ease-in-out pb-8 ${
                    isExpertiseImageAnimated ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ zIndex: 10 }}
                  aria-hidden="true"
                >
                  <a
                    href="/estimation"
                    aria-label="Faire estimer mon bien immobilier à Marseille gratuitement"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isExpertiseImageAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                  >
                    Estimer mon bien
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: isExpertiseImageAnimated ? '100%' : '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                      aria-hidden="true"
                      role="presentation"
                    ></span>
                  </a>
                </div>
              </div>
              
              {/* Contenu à droite avec arrondissements animés */}
              <div className="space-y-8 order-2 md:order-1">
                {/* Arrondissements avec animation de glissement */}
                <div className="space-y-4 text-center md:text-left">
                  <h3 id="arrondissements-intervention" className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Arrondissements d'intervention
                  </h3>
                  <div className="space-y-3" role="list">
                    <AnimatedContent 
                      direction="horizontal" 
                      distance={100} 
                      reverse={false}
                      duration={0.8}
                      delay={0}
                      threshold={0.2}
                    >
                      <div className="bg-stone-50 rounded-lg p-4 border border-gray-200" role="listitem">
                        <p className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          6e arrondissement
                        </p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent 
                      direction="horizontal" 
                      distance={100} 
                      reverse={false}
                      duration={0.8}
                      delay={0.1}
                      threshold={0.2}
                    >
                      <div className="bg-stone-50 rounded-lg p-4 border border-gray-200" role="listitem">
                        <p className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          7e arrondissement
                        </p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent 
                      direction="horizontal" 
                      distance={100} 
                      reverse={false}
                      duration={0.8}
                      delay={0.2}
                      threshold={0.2}
                    >
                      <div className="bg-stone-50 rounded-lg p-4 border border-gray-200" role="listitem">
                        <p className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          8e arrondissement
                        </p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent 
                      direction="horizontal" 
                      distance={100} 
                      reverse={false}
                      duration={0.8}
                      delay={0.3}
                      threshold={0.2}
                    >
                      <div className="bg-stone-50 rounded-lg p-4 border border-gray-200" role="listitem">
                        <p className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          9e arrondissement
                        </p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent 
                      direction="horizontal" 
                      distance={100} 
                      reverse={false}
                      duration={0.8}
                      delay={0.4}
                      threshold={0.2}
                    >
                      <div className="bg-stone-50 rounded-lg p-4 border border-gray-200" role="listitem">
                        <p className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          15e arrondissement
                        </p>
                      </div>
                    </AnimatedContent>
                  </div>
                </div>
                
                <div className="text-lg text-gray-700 leading-relaxed text-center md:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    Cette spécialisation locale permet une analyse précise des prix, des délais de vente 
                    et des attentes réelles des acheteurs sur ces secteurs spécifiques.
                  </p>
                </div>
                
                <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-8 text-center md:text-left" style={{ borderColor: '#4682B4' }}>
                  <p className="text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'agence YL est spécialisée dans la vente d'appartements et de maisons dans l'ancien et n'intervient pas sur la VEFA (Vente en l'État Futur d'Achèvement).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section La fondatrice */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="la-fondatrice">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Titre */}
            <div className="mb-8 md:mb-12">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="la-fondatrice" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
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
                  alt="Yman Lahlou, Fondatrice et Directrice de l'Agence YL à Marseille"
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
                <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    L'Agence YL est une agence à taille humaine. Une seule interlocutrice : la présidente 
                    et fondatrice, qui gère personnellement chaque dossier.
                  </p>
                  <p>
                    Cette structure volontairement réduite garantit un suivi précis, une parfaite 
                    connaissance de chaque bien et une prise de décision rapide. Chaque propriétaire 
                    sait exactement à qui s'adresser, à chaque étape de son projet.
                  </p>
                  <div className="bg-white border-l-4 pl-6 py-4 mt-6" style={{ borderColor: '#4682B4' }}>
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

      {/* CTA Final discret */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="cta-final-a-propos">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-final-a-propos" className="sr-only">Contactez l'agence immobilière à Marseille</h2>
            <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Un projet immobilier mérite une vraie réflexion. Commencez par la bonne étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Bouton principal */}
              <a
                ref={venteButtonRef as any}
                href="/vente"
                aria-label="Accéder au service de vente immobilière à Marseille"
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
                  <span className="transition-transform duration-300">Accéder au service Vente</span>
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
              
              {/* Bouton secondaire */}
              <a
                ref={estimationButtonRef as any}
                href="/estimation"
                aria-label="Demander une estimation immobilière gratuite à Marseille"
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
                  <span className="transition-transform duration-300">Demander une estimation</span>
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
