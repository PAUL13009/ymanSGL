'use client'

import Image from 'next/image'
import Link from 'next/link'
import FadeContent from './FadeContent'
import { useCursor } from '@/context/CursorContext'

interface ServiceData {
  number: string
  image: string
  imageAlt: string
  title: string
  description: string
  link: string
  ctaText: string
}

const SERVICE_LABELS = ['ESTIMER', 'VENDRE', 'LOUER'] as const

export default function Features() {
  const cursor = useCursor()

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
      title: "STRATÉGIE DE VENTE",
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
          <h2 id="services-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-16 sm:mb-20 md:mb-24 text-white uppercase text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            NOS SERVICES
          </h2>

          {/* Grille de 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col">
                {/* Image - effet hover uniquement au survol de l'image */}
                <Link
                  href={service.link}
                  className="relative block w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] mb-8 sm:mb-10 overflow-hidden rounded-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10"
                  onMouseEnter={() => cursor?.setOverServiceImage(SERVICE_LABELS[index] ?? null)}
                  onMouseLeave={() => cursor?.setOverServiceImage(null)}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </Link>

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
