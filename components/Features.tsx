'use client'

import { useState } from 'react'
import Image from 'next/image'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import AnimatedContent from './AnimatedContent'
import { useScrollButtonAnimationWithReset } from '@/hooks/useScrollButtonAnimationWithReset'

interface FeatureData {
  image?: string
  video?: string
  imageAlt: string
  title: string
  subtitle: string
  details: string[]
}

export default function Features() {
  const containerRef = null
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
  // Utiliser le hook avec reset pour réinitialiser l'animation à chaque changement de service
  const featuresButtonRef = useScrollButtonAnimationWithReset(currentFeatureIndex)

  const features: FeatureData[] = [
    {
      image: "/images/DSC04823.jpg",
      imageAlt: "Service d'estimation immobilière à Marseille - Agence YL",
      title: "Estimation",
      subtitle: "Valorisons votre bien",
      details: [
        "Une estimation sérieuse pour poser les bonnes bases",
        "Prendre des décisions éclairées dès le départ",
        "Éviter les erreurs de prix préjudiciables"
      ]
    },
    {
      video: "/videos/transaction.mov",
      imageAlt: "Service de vente immobilière à Marseille - Agence YL",
      title: "Vente immobilière",
      subtitle: "Votre projet de vente, encadré de A à Z",
      details: [
        "Un accompagnement rigoureux tout au long de la vente",
        "Une stratégie adaptée à votre bien",
        "Un positionnement cohérent avec votre marché"
      ]
    },
    {
      video: "/videos/location.mov",
      imageAlt: "Service de location immobilière à Marseille - Agence YL",
      title: "Location immobilière",
      subtitle: "Une location sécurisée, sans stress",
      details: [
        "Mise en location ou accompagnement à l'achat",
        "Sélection rigoureuse selon la nature du projet",
        "Prise en compte de vos priorités"
      ]
    },
  ]

  const handlePrevious = () => {
    setCurrentFeatureIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentFeatureIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1))
  }

  const handleGoToFeature = (index: number) => {
    setCurrentFeatureIndex(index)
  }

  const currentFeature = features[currentFeatureIndex]

  return (
    <section id="services" className="pt-8 pb-6 sm:pt-12 sm:pb-8 bg-stone-50" aria-labelledby="services-title">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="w-12 sm:w-16 h-1 bg-blue-600 mb-4 sm:mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
            <h2 id="services-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 max-w-4xl mx-auto px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
              <VariableProximity
                label="Une méthode immobilière, pas une liste de prestations"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>

          <div key={currentFeatureIndex} className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center relative">
              {/* Colonne de gauche - Image ou Vidéo */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-2xl">
                {currentFeature.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-label={`Vidéo de présentation du service ${currentFeature.title} - ${currentFeature.subtitle}`}
                  >
                    <source src={currentFeature.video} type="video/mp4" />
                    <source src={currentFeature.video} type="video/quicktime" />
                  </video>
                ) : currentFeature.image ? (
                  <Image
                    src={currentFeature.image}
                    alt={currentFeature.imageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : null}
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-center text-white px-4 sm:px-6 md:px-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {currentFeature.title}
                    </h3>
                  </FadeContent>
                </div>
              </div>

              {/* Colonne de droite - Contenu */}
              <div className="space-y-4 sm:space-y-6">
                {/* Sous-titre */}
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl text-center md:text-left" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {currentFeature.subtitle}
                  </p>
                </div>

                {/* Détails */}
                {currentFeature.details && currentFeature.details.length > 0 && (
                  <div className="space-y-3">
                    <ul className="space-y-3 text-gray-700">
                      {currentFeature.details.map((detail, index) => (
                        <AnimatedContent
                          key={index}
                          distance={50}
                          direction="vertical"
                          reverse={false}
                          duration={0.8}
                          ease="power3.out"
                          initialOpacity={0}
                          animateOpacity={true}
                          threshold={0.2}
                          delay={index * 0.1}
                        >
                          <li className="flex items-start gap-3">
                            {currentFeatureIndex !== 0 && currentFeatureIndex !== 1 && currentFeatureIndex !== 2 && (
                              <span className="mt-1" style={{ color: '#4682B4' }}>•</span>
                            )}
                            <span className="leading-relaxed">
                              <VariableProximity
                                label={detail}
                                fromFontVariationSettings="'wght' 300"
                                toFontVariationSettings="'wght' 500"
                                containerRef={null}
                                radius={70}
                                falloff="linear"
                              />
                            </span>
                          </li>
                        </AnimatedContent>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bouton "En savoir plus" */}
                <div className="pt-4 sm:pt-6">
                  <a
                    ref={featuresButtonRef as any}
                    href={currentFeatureIndex === 0 ? "/estimation" : currentFeatureIndex === 1 ? "/vente" : currentFeatureIndex === 2 ? "/location" : "/analyse"}
                    aria-label={currentFeatureIndex === 0 ? "Faire une estimation immobilière à Marseille" : currentFeatureIndex === 1 ? "Vendre un bien immobilier à Marseille" : currentFeatureIndex === 2 ? "Louer un bien immobilier à Marseille" : "Contacter l'agence immobilière à Marseille"}
                    className="group relative inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium overflow-hidden transition-all duration-500 w-full sm:w-auto text-center"
                    style={{
                      backgroundColor: 'white',
                      color: '#4682B4',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      letterSpacing: '0.3px'
                    }}
                    data-original-color="#4682B4"
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
                      <span className="transition-transform duration-300">
                        <VariableProximity
                          label={currentFeatureIndex === 0 ? "Estimer mon bien" : currentFeatureIndex === 1 ? "Vendre mon bien" : currentFeatureIndex === 2 ? "Louer mon bien" : "En savoir plus"}
                          fromFontVariationSettings="'wght' 500"
                          toFontVariationSettings="'wght' 700"
                          containerRef={null}
                          radius={60}
                          falloff="linear"
                        />
                      </span>
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

                {/* Flèches de navigation - Positionnées sous le bouton CTA sur mobile, à côté de l'image sur desktop */}
                <div className="flex md:hidden justify-center items-center gap-2 mt-4 sm:mt-6">
                  <button 
                    onClick={handlePrevious}
                    className="w-10 h-10 flex items-center justify-center transition-all rounded-full"
                    style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4682B4';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4682B4';
                    }}
                    aria-label="Service précédent"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 flex items-center justify-center transition-all rounded-full"
                    style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4682B4';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4682B4';
                    }}
                    aria-label="Service suivant"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Flèches de navigation - Positionnées à mi-hauteur de l'image, décalées vers la droite sur desktop */}
              <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 flex gap-2 hidden md:flex" style={{ marginLeft: 'calc(8rem / 2 + 28rem)' }}>
                <button 
                  onClick={handlePrevious}
                  className="w-10 h-10 flex items-center justify-center transition-all"
                  style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#4682B4';
                  }}
                  aria-label="Service précédent"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 flex items-center justify-center transition-all"
                  style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#4682B4';
                  }}
                  aria-label="Service suivant"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Indicateurs de navigation */}
            <div className="flex justify-center items-center gap-3 mt-8 sm:mt-12 mb-8 sm:mb-16">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleGoToFeature(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentFeatureIndex
                      ? 'w-12 h-2'
                      : 'w-2 h-2 bg-gray-400'
                  }`}
                  style={index === currentFeatureIndex ? { backgroundColor: '#4682B4' } : {}}
                  onMouseEnter={(e) => {
                    if (index !== currentFeatureIndex) {
                      e.currentTarget.style.backgroundColor = 'rgba(70, 130, 180, 0.7)';
                      e.currentTarget.style.width = '1.5rem';
                      e.currentTarget.style.height = '0.5rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentFeatureIndex) {
                      e.currentTarget.style.backgroundColor = '#9ca3af';
                      e.currentTarget.style.width = '';
                      e.currentTarget.style.height = '';
                    }
                  }}
                  aria-label={`Aller à la caractéristique ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

