'use client'

import Image from 'next/image'
import { useRef } from 'react'
import AnimatedContent from './AnimatedContent'
import VariableProximity from './VariableProximity'

interface HeroProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  id?: string
  backgroundImage?: string
  alt?: string
}

export default function Hero({ 
  title = "L'agence Y L",
  subtitle = "Votre agence immobilière de confiance",
  buttonText = "Découvrir nos biens",
  buttonLink = "#a-propos",
  id = "accueil",
  backgroundImage = "/images/maison15esejour2.webp",
  alt = "Agence immobilière Y L - Intérieur moderne"
}: HeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section ref={containerRef as any} id={id} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src={backgroundImage}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
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
          className="mb-8"
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
          className="flex justify-center mt-8"
        >
          <a 
            href={buttonLink}
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

