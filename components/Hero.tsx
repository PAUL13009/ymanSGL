'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
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
  imageAlt?: string
  centered?: boolean
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
  imageAlt,
  centered = false
}: HeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const heroButtonRef = useScrollButtonAnimation()
  const heroSecondaryButtonRef = useScrollButtonAnimation()

  // Preload hero image for better LCP
  useEffect(() => {
    if (imagePath && typeof window !== 'undefined') {
      // Check if link already exists
      const existingLink = document.querySelector(`link[rel="preload"][as="image"][href="${imagePath}"]`)
      if (existingLink) return
      
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imagePath
      link.setAttribute('fetchpriority', 'high')
      document.head.appendChild(link)
      
      return () => {
        const linkToRemove = document.querySelector(`link[rel="preload"][as="image"][href="${imagePath}"]`)
        if (linkToRemove) {
          document.head.removeChild(linkToRemove)
        }
      }
    }
  }, [imagePath])

  return (
    <>
      {/* Image fixe en arrière-plan pour toute la page */}
      {imagePath && (
        <div className="fixed inset-0 z-0" style={{ marginTop: 0, paddingTop: 0 }}>
          <div className="relative w-full h-full">
            <Image
              src={imagePath}
              alt={imageAlt || "Agence immobilière à Marseille - Estimation, vente et location immobilière"}
              fill
              priority
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
      
      <section ref={containerRef as any} id={id} className={`relative h-screen flex ${centered ? 'items-center' : 'items-end'} overflow-hidden z-10`} style={{ marginTop: 0, paddingTop: 0 }} aria-labelledby="hero-title">

      {/* Contenu */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          {centered ? (
            /* Layout centré avec bouton en dessous */
            <div className="flex flex-col items-center text-center gap-6 md:gap-8">
              <div className="mb-4 sm:mb-6">
                <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
                  {title}
                </h1>
              </div>
              
              {subtitle ? (
                <div className="mb-6 md:mb-8">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-normal leading-relaxed max-w-4xl mx-auto">
                    {subtitle}
                  </p>
                </div>
              ) : null}
              
              {/* CTA en dessous */}
              {buttonText && (
                <div className="group/cta relative flex flex-col items-center border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                  <div className="flex justify-center w-full">
                    <a 
                      ref={heroButtonRef as any}
                      href={buttonLink === "#contact" ? "/analyse" : buttonLink}
                      aria-label={
                        buttonText === "Faire estimer mon bien" ? "Faire estimer mon bien immobilier à Marseille gratuitement" :
                        buttonText === "Voir les biens" ? "Voir les biens immobiliers à vendre et à louer à Marseille" :
                        buttonText
                      }
                      className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                      style={{ 
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{buttonText}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Layout original avec texte à gauche et CTA à droite */
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
              {/* Texte à gauche */}
              <div className="flex-1">
                <div className="mb-4 sm:mb-6">
                  <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white text-left leading-tight uppercase">
                    {title}
                  </h1>
                </div>
                
                {subtitle ? (
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-normal text-left leading-relaxed uppercase">
                      {subtitle}
                    </p>
                  </div>
                ) : null}
              </div>
              
              {/* CTA à droite */}
              {buttonText && (
                <div className="group/cta relative flex flex-col md:items-end border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                  <div className="flex justify-start md:justify-end w-full">
                    <a 
                      ref={heroButtonRef as any}
                      href={buttonLink === "#contact" ? "/analyse" : buttonLink}
                      aria-label={
                        buttonText === "Faire estimer mon bien" ? "Faire estimer mon bien immobilier à Marseille gratuitement" :
                        buttonText === "Voir les biens" ? "Voir les biens immobiliers à vendre et à louer à Marseille" :
                        buttonText
                      }
                      className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                      style={{ 
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{buttonText}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </section>
    </>
  )
}

