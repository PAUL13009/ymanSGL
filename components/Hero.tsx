'use client'

import { useRef } from 'react'
import AnimatedContent from './AnimatedContent'
import VariableProximity from './VariableProximity'

interface HeroProps {
  title?: string
  subtitle?: string
  microText?: string
  buttonText?: string
  buttonSubtext?: string
  buttonLink?: string
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
  id = "accueil",
  videoPath,
  imagePath
}: HeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section ref={containerRef as any} id={id} className="relative h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Image ou Vidéo de fond */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {imagePath ? (
            <img
              src={imagePath}
              alt="Agence immobilière Marseille 6e arrondissement - Estimation et vente de résidence principale"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : videoPath ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoPath} type="video/mp4" />
            </video>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
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
          className="mb-6 flex justify-center items-center"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white whitespace-nowrap text-center">
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
          className="mb-4"
        >
          <p className="text-xl md:text-2xl text-white/90 font-light">
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
            className="mb-8"
          >
            <p className="text-sm md:text-base text-white/80 font-light">
              {microText}
            </p>
          </AnimatedContent>
        )}
        
        <div className="flex flex-col items-center mt-8">
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
            className="flex justify-center"
          >
            <a 
              href={buttonLink === "#contact" ? "/analyse" : buttonLink}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/30"
            >
              <VariableProximity
                label={buttonText}
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={containerRef}
                radius={60}
                falloff="linear"
              />
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
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

