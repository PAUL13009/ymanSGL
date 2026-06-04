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

const SERVICE_LABELS = ['ESTIMER', 'VENDRE'] as const

export default function Features() {
  const cursor = useCursor()

  const services: ServiceData[] = [
    {
      number: '01',
      image: "/images/heropropre.jpeg",
      imageAlt: "Estimation Réaliste - Agence YL",
      title: "ESTIMATION RÉALISTE",
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
  ]

  return (
    <section id="services" className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 relative z-10" aria-labelledby="services-title">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Version mobile/tablette — grille avec images */}
          <div className="lg:hidden">
            <h2 id="services-title" className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-16 sm:mb-20 md:mb-24 text-white uppercase text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              NOS SERVICES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col">
                  <Link
                    href={service.link}
                    className="relative block w-full h-[350px] sm:h-[400px] md:h-[450px] mb-8 sm:mb-10 overflow-hidden rounded-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10"
                    onMouseEnter={() => cursor?.setOverServiceImage(SERVICE_LABELS[index] ?? null)}
                    onMouseLeave={() => cursor?.setOverServiceImage(null)}
                  >
                    <Image src={service.image} alt={service.imageAlt} fill className="object-cover" loading="lazy" />
                  </Link>
                  <div className="mb-5 sm:mb-6">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-light text-white/20 leading-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{service.number}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-white uppercase leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{service.title}</h3>
                  <p className="text-sm sm:text-base text-white/70 leading-snug line-clamp-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Version desktop — design type Services (screenshot) */}
          <div className="hidden lg:block">
            <div className="flex flex-col justify-start pt-4 lg:pt-6 xl:pt-8 pb-10">
              {/* Header : titre massif plaqué à gauche */}
              <div className="mb-12 -ml-8 sm:-ml-12 lg:-ml-16 xl:-ml-20">
                <h2 id="services-title" className="text-8xl xl:text-9xl 2xl:text-[14rem] font-extrabold leading-none text-white uppercase inline-block tracking-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  NOS SERVICES
                  <sup className="text-xl xl:text-2xl font-normal ml-1 align-super">(2)</sup>
                </h2>
              </div>

              {/* Liste des services — lignes avec séparateurs */}
              <div className="mt-12 lg:ml-[25%] xl:ml-[35%] 2xl:ml-[40%] max-w-4xl">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.link}
                    className="block py-8 border-b border-white/10 last:border-b-0 -mx-4 px-4"
                    onMouseEnter={() => cursor?.setOverServiceImage(SERVICE_LABELS[index] ?? null)}
                    onMouseLeave={() => cursor?.setOverServiceImage(null)}
                  >
                    <div className="grid grid-cols-[4rem_14rem_1fr] gap-8 xl:gap-12 items-start">
                      <span className="text-base text-white/70 font-normal -ml-[calc(3rem+6cm)] xl:-ml-[calc(4rem+7cm)]" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{service.number}</span>
                      <h3 className="text-lg xl:text-xl font-bold text-white uppercase leading-tight whitespace-nowrap -ml-[calc(2rem+5cm)] xl:-ml-[calc(2.5rem+5.5cm)]" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{service.title}</h3>
                      <p className="text-sm xl:text-base text-white/70 leading-snug min-w-0 line-clamp-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{service.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}
