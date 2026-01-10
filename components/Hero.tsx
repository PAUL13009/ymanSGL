'use client'

import { useRef } from 'react'
import AnimatedContent from './AnimatedContent'
import VariableProximity from './VariableProximity'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

interface HeroProps {
  title?: string
  subtitle?: string
  microText?: string
  buttonText?: string
  buttonSubtext?: string
  buttonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  id?: string
  videoPath?: string
  imagePath?: string
}

export default function Hero({ 
  title = "Une autre manière de vendre et d'accompagner l'immobilier",
  subtitle = "Une agence immobilière qui applique une méthode exigeante pour des projets sérieux, à Marseille et ses environs.",
  microText,
  buttonText = "Découvrir nos biens",
  buttonSubtext,
  buttonLink = "#a-propos",
  secondaryButtonText,
  secondaryButtonLink,
  id = "accueil",
  videoPath,
  imagePath,
  imageAlt
}: HeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const heroButtonRef = useScrollButtonAnimation()
  const heroSecondaryButtonRef = useScrollButtonAnimation()

  return (
    <section ref={containerRef as any} id={id} className="relative h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }} aria-labelledby="hero-title">
      {/* Image ou Vidéo de fond */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {imagePath ? (
            <img
                src={imagePath}
                alt={imageAlt || "Agence immobilière à Marseille - Estimation, vente et location immobilière"}
                className="absolute inset-0 w-full h-full object-cover"
              />
          ) : videoPath ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              aria-label="Présentation de l'agence immobilière à Marseille"
            >
              <source src={videoPath} type="video/mp4" />
            </video>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" aria-hidden="true" role="presentation" />
        </div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity={true}
          threshold={0.3}
          delay={0}
          className="mb-4 sm:mb-6 flex justify-center items-center"
        >
          <h1 id="hero-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white text-center max-w-3xl mx-auto px-2">
            <VariableProximity
              label={title}
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 400"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </h1>
        </AnimatedContent>
        
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity={true}
          threshold={0.3}
          delay={0.2}
          className="mb-3 sm:mb-4"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-2xl mx-auto px-2">
            <VariableProximity
              label={subtitle}
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 500"
              containerRef={containerRef}
              radius={80}
              falloff="linear"
            />
          </p>
        </AnimatedContent>
        
        {microText && (
          <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity={true}
            threshold={0.3}
            delay={0.3}
            className="mb-6 sm:mb-8"
          >
            <p className="text-xs sm:text-sm md:text-base text-white/80 font-light px-2">
              {microText}
            </p>
          </AnimatedContent>
        )}
        
        {buttonText && (
          <div className="flex flex-col items-center mt-6 sm:mt-8">
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.3}
              delay={microText ? 0.4 : 0.3}
              className="flex justify-center w-full sm:w-auto"
            >
              <a 
                ref={heroButtonRef as any}
                href={buttonLink === "#contact" ? "/analyse" : buttonLink}
                aria-label={
                  buttonText === "Faire estimer mon bien" ? "Faire estimer mon bien immobilier à Marseille gratuitement" :
                  buttonText === "Voir les biens" ? "Voir les biens immobiliers à vendre et à louer à Marseille" :
                  buttonText
                }
                className="group relative inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium overflow-hidden transition-all duration-500 backdrop-blur-md border border-white/30 w-full sm:w-auto max-w-xs md:max-w-md"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                  textDecoration: 'none',
                  letterSpacing: '0.3px'
                }}
                data-original-color="white"
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
                  if (text) text.style.color = 'white'
                  if (textSpan) textSpan.style.transform = 'translateX(0)'
                }}
              >
                {/* Fond blanc qui se remplit */}
                <span
                  className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                  style={{
                    width: '0%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateX(-50%) scaleY(0)',
                    transformOrigin: 'center bottom',
                    transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                    zIndex: 1
                  }}
                ></span>
                
                  {/* Contenu du bouton */}
                  <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: 'white' }}>
                    <span className="transition-transform duration-300">
                      <VariableProximity
                        label={buttonText}
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 600"
                        containerRef={containerRef}
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
            </AnimatedContent>
            {buttonSubtext && (
              <AnimatedContent
                distance={50}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.3}
                delay={(microText ? 0.4 : 0.3) + 0.1}
                className="mt-3"
              >
                <p className="text-xs md:text-sm text-white/70 font-light">
                  {buttonSubtext}
                </p>
              </AnimatedContent>
            )}
            {secondaryButtonText && (
              <AnimatedContent
                distance={50}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.3}
                delay={(microText ? 0.4 : 0.3) + (buttonSubtext ? 0.2 : 0.1)}
                className="mt-6"
              >
                <a 
                  ref={heroSecondaryButtonRef as any}
                  href={secondaryButtonLink || "/catalogue"}
                  aria-label={secondaryButtonText === "Découvrir nos biens" ? "Découvrir nos biens immobiliers à Marseille" : secondaryButtonText}
                  className="group relative inline-block px-6 py-3 sm:px-6 sm:py-3 rounded-full font-medium overflow-hidden transition-all duration-500 border-2 border-white/50 w-full sm:w-auto max-w-xs"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: 'white',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                    textDecoration: 'none',
                    letterSpacing: '0.3px'
                  }}
                  data-original-color="white"
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)'
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
                    if (text) text.style.color = 'white'
                    if (textSpan) textSpan.style.transform = 'translateX(0)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  {/* Fond blanc qui se remplit */}
                  <span
                    className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                    style={{
                      width: '0%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateX(-50%) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                      zIndex: 1
                    }}
                  ></span>
                  
                  {/* Contenu du bouton */}
                  <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: 'white' }}>
                    <span className="transition-transform duration-300">
                      <VariableProximity
                        label={secondaryButtonText}
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 500"
                        containerRef={containerRef}
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
              </AnimatedContent>
            )}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce" aria-hidden="true" role="presentation">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

