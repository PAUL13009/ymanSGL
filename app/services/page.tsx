'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Image from 'next/image'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

export default function ServicesPage() {
  const estimationButtonRef = useScrollButtonAnimation()
  const venteButtonRef = useScrollButtonAnimation()
  const locationButtonRef = useScrollButtonAnimation()
  const venteFinalButtonRef = useScrollButtonAnimation()
  const estimationFinalButtonRef = useScrollButtonAnimation()
  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="Nos services immobiliers à Marseille"
        subtitle="Une approche structurée, sélective et adaptée à chaque projet immobilier, selon sa nature et son contexte."
        buttonText="Découvrir nos services"
        buttonLink="#estimation"
        imagePath="/images/vue7e.png"
      />

      {/* Introduction - Cadre général */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="introduction-services">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="introduction-services" className="sr-only">Présentation des services immobiliers à Marseille</h2>
            </div>
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Nous n'intervenons pas sur tous les projets, et c'est un choix assumé.
                  Chaque service repose sur une analyse préalable, une méthode claire et un cadre de travail défini dès le départ.
                </p>
                <p>
                  Notre rôle n'est pas de multiplier les mandats, mais d'accompagner efficacement les projets cohérents, avec transparence et rigueur.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Service - Estimation immobilière */}
      <section id="estimation" className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="service-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image à gauche avec titre superposé */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl">
                <Image
                  src="/images/DSC04823.jpg"
                  alt="Service d'estimation immobilière à Marseille - Analyse de bien et étude de marché locale"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="service-estimation" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center text-white px-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Estimation immobilière
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Contenu à droite */}
              <div>
                <div className="text-lg text-gray-700 leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    Une estimation fiable repose sur bien plus qu'un prix au mètre carré.
                  </p>
                  <p>
                    Chaque estimation est fondée sur l'analyse du bien, de son environnement, de son contexte juridique et des ventes réellement conclues sur le secteur.
                  </p>
                  <p>
                    Ce service s'adresse aux propriétaires souhaitant obtenir une vision réaliste et exploitable de la valeur de leur bien.
                  </p>
                </div>
                <ul className="space-y-3 mb-8" role="list">
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Étude de marché locale approfondie
                    </span>
                  </li>
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse du bien et de son contexte
                    </span>
                  </li>
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Estimation argumentée et cohérente
                    </span>
                  </li>
                </ul>
                <div className="flex justify-center md:justify-start">
                  <a
                    ref={estimationButtonRef as any}
                    href="/estimation"
                    aria-label="Faire estimer mon bien immobilier à Marseille gratuitement"
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
                    <span className="transition-transform duration-300">Faire estimer mon bien</span>
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
          </div>
        </FadeContent>
      </section>

      {/* Service - Vente immobilière */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="service-vente">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Vidéo en premier sur mobile */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl order-1 md:order-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="Vidéo de présentation du service de vente immobilière à Marseille"
                >
                  <source src="/videos/transaction.mov" type="video/mp4" />
                  <source src="/videos/transaction.mov" type="video/quicktime" />
                </video>
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="service-vente" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center text-white px-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Vente immobilière
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Contenu à droite */}
              <div className="order-2 md:order-2">
                <div className="text-lg text-gray-700 leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    La vente d'un bien ne se résume pas à sa mise en ligne.
                    Elle nécessite une analyse approfondie du marché, un positionnement juste et une stratégie adaptée au bien comme à son environnement.
                  </p>
                  <p>
                    Nous accompagnons les vendeurs ayant un projet clair, un objectif réaliste et la volonté de s'inscrire dans un processus structuré.
                  </p>
                </div>
                <ul className="space-y-3 mb-8" role="list">
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse complète avant engagement
                    </span>
                  </li>
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Stratégie de commercialisation adaptée
                    </span>
                  </li>
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Suivi et reporting tout au long du processus
                    </span>
                  </li>
                </ul>
                <div className="flex justify-center md:justify-start">
                  <a
                    ref={venteButtonRef as any}
                    href="/vente"
                    aria-label="Découvrir le service de vente immobilière à Marseille"
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
                    <span className="transition-transform duration-300">Découvrir le service Vente</span>
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
          </div>
        </FadeContent>
      </section>

      {/* Service - Location immobilière */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="service-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Vidéo en premier sur mobile */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl order-1 md:order-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="Vidéo de présentation du service de location immobilière à Marseille"
                >
                  <source src="/videos/location.mov" type="video/mp4" />
                  <source src="/videos/location.mov" type="video/quicktime" />
                </video>
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="service-location" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center text-white px-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Location immobilière
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Contenu à droite */}
              <div className="order-2 md:order-2">
                <div className="text-lg text-gray-700 leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    La mise en location d'un bien nécessite rigueur, conformité et sélection.
                  </p>
                  <p>
                    Nous accompagnons les propriétaires dans la recherche de locataires sérieux, avec une gestion structurée du dossier et un suivi transparent à chaque étape.
                  </p>
                </div>
                <ul className="space-y-3 mb-8" role="list">
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Mise en location conforme et encadrée
                    </span>
                  </li>
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Sélection rigoureuse des dossiers
                    </span>
                  </li>
                  <li className="flex items-start" role="listitem">
                    <span className="mr-3" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                    <span className="text-lg text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Communication claire avec le propriétaire
                    </span>
                  </li>
                </ul>
                <div className="flex justify-center md:justify-start">
                  <a
                    ref={locationButtonRef as any}
                    href="/location"
                    aria-label="Découvrir le service de location immobilière à Marseille"
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
                    <span className="transition-transform duration-300">Découvrir le service Location</span>
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
          </div>
        </FadeContent>
      </section>

      {/* Bloc de filtrage - Pour qui / Pour qui pas */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="faits-pour-travailler-ensemble">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="faits-pour-travailler-ensemble" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Sommes-nous faits pour travailler ensemble ?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8" role="list">
              {/* Ce qui correspond */}
              <article className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-600 cursor-pointer group" style={{ borderColor: '#4682B4' }} role="listitem" aria-labelledby="correspond-approche">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4', aspectRatio: '1 / 1' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 id="correspond-approche" className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                    Ce qui correspond à notre approche
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
                      <span>Projets clairs et structurés</span>
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
                      <span>Objectifs réalistes</span>
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
                      <span>Volonté de s'appuyer sur une analyse professionnelle</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
              
              {/* Ce que nous refusons */}
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-400 cursor-pointer group" role="listitem" aria-labelledby="refusons-services">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                  <h3 id="refusons-services" className="text-xl font-bold text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Ce que nous refusons
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
                      <span>Prix irréalistes</span>
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
                      <span>Mandats sans stratégie</span>
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
                      <span>Projets flous ou non aboutis</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA Final - Orientation */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="cta-final-services">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-final-services" className="sr-only">Choisir un service immobilier à Marseille</h2>
            <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Chaque projet est différent.
              Le plus important est de choisir le service adapté à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Bouton principal */}
              <a
                ref={venteFinalButtonRef as any}
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
                ref={estimationFinalButtonRef as any}
                href="/estimation"
                aria-label="Faire estimer mon bien immobilier à Marseille gratuitement"
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
                  <span className="transition-transform duration-300">Faire estimer mon bien</span>
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
