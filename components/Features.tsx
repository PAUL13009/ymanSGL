'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FadeContent from './FadeContent'

interface ServiceData {
  number: string
  image: string
  imageAlt: string
  title: string
  description: string
  link: string
  ctaText: string
}

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services: ServiceData[] = [
    {
      number: '01',
      image: "/images/heropropre.jpeg",
      imageAlt: "Estimation Réaliste - Agence YL",
      title: "ESTIMATION REALISTE",
      description: "Plus qu'une estimation, un dossier complet basé sur les méthodes de l'expertise immobilière pour sécuriser votre patrimoine",
      link: "/estimation",
      ctaText: "Obtenir mon estimation"
    },
    {
      number: '02',
      image: "/images/vente.webp",
      imageAlt: "Stratégie de Mise en Vente - Agence YL",
      title: "STRATÉGIE DE MISE EN VENTE",
      description: "Un plan d'action sur mesure : de la valorisation de votre bien à la sélection rigoureuse d'acquéreurs qualifiés",
      link: "/vente",
      ctaText: "Vendre mon bien"
    },
    {
      number: '03',
      image: "/images/locationyl.jpg",
      imageAlt: "Mise en location - Agence YL",
      title: "MISE EN LOCATION",
      description: "Accompagnement complet pour la mise en location de votre patrimoine. Recherche de locataire, suivi du dossier jusqu'à l'état des lieux d'entrée et la remise des clés.",
      link: "/location",
      ctaText: "Louer mon bien"
    },
  ]

  return (
    <section id="services" className="pt-20 pb-24 sm:pt-24 sm:pb-28 md:pt-28 md:pb-32 relative z-10" aria-labelledby="services-title">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre "NOS SERVICES" - très grand, aligné à gauche */}
          <h2 id="services-title" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-16 sm:mb-20 md:mb-24 text-white uppercase text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-0.02em' }}>
            NOS SERVICES
          </h2>

          {/* Grille de 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col">
                {/* Image - occupe environ 60-70% de l'espace vertical */}
                <div 
                  className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] mb-8 sm:mb-10 overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay avec CTA - apparaît au survol */}
                  <div 
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-500 ease-in-out ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Link
                      href={service.link}
                      className={`inline-flex items-center justify-center border border-white/80 px-8 py-4 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white hover:shadow-lg hover:shadow-white/20 transform ${
                        hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                        color: '#ffffff',
                        fontWeight: 500,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transitionDelay: hoveredIndex === index ? '0.1s' : '0s'
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {service.ctaText}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Numéro - très grand */}
                <div className="mb-5 sm:mb-6">
                  <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white/20 leading-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {service.number}
                  </span>
                </div>

                {/* Titre du service - blanc, gras, majuscules */}
                <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 text-white uppercase leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {service.title}
                </h3>

                {/* Description - gris clair, texte plus petit */}
                <p className="text-base sm:text-lg md:text-lg text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeContent>
    </section>
  )
}
