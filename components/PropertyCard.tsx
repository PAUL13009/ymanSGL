'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VariableProximity from './VariableProximity'
import CountUp from './CountUp'

interface PropertyImage {
  src: string
  alt: string
}

interface Property {
  id: string | number
  images: PropertyImage[]
  title?: string
  location?: string
  surface: string
  rooms: string
  bathrooms: string
  price: string
}

interface PropertyCardProps {
  property: Property
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  onGoToImage: (index: number) => void
}

export default function PropertyCard({ property, currentIndex, onPrevious, onNext, onGoToImage }: PropertyCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  
  // Fonction pour formater le prix avec des espaces entre les milliers
  const formatPrice = (price: string): string => {
    // Si le prix contient déjà "€", on le retire temporairement
    const hasEuro = price.includes('€')
    const hasPerMonth = price.includes('/mois')
    
    // Extraire uniquement les chiffres
    const numbers = price.replace(/[^\d]/g, '')
    if (!numbers) return price
    
    // Formater avec des espaces entre les milliers
    const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    
    // Reconstruire le prix formaté
    let result = formatted
    if (hasPerMonth) {
      result += '/mois'
    }
    
    return result
  }
  
  return (
    <article
      ref={cardRef}
      className="bg-white shadow-lg overflow-hidden transition-all duration-500 group cursor-pointer block relative hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1"
      style={{ aspectRatio: '1 / 1', minHeight: '300px' }}
      role="listitem"
      aria-labelledby={`property-${property.id}`}
    >
      {/* Carrousel d'images - 80% de la hauteur */}
      <div className="relative w-full" style={{ height: '80%' }}>
        {/* Images du carrousel */}
        <div className="relative w-full h-full">
          {property.images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Flèches de navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onPrevious()
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-gray-700 rounded-full p-1.5 shadow-md z-40 transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-80"
              aria-label="Image précédente"
              onMouseEnter={(e) => {
                if (window.innerWidth >= 768) {
                  e.currentTarget.style.opacity = '0.8'
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth >= 768) {
                  e.currentTarget.style.opacity = '0'
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-gray-700 rounded-full p-1.5 shadow-md z-40 transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-80"
              aria-label="Image suivante"
              onMouseEnter={(e) => {
                if (window.innerWidth >= 768) {
                  e.currentTarget.style.opacity = '0.8'
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth >= 768) {
                  e.currentTarget.style.opacity = '0'
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicateurs de position */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" role="list" aria-label="Indicateurs de navigation des images">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onGoToImage(index)
                }}
                className={`transition-all duration-300 rounded-full pointer-events-auto ${
                  index === currentIndex
                    ? 'w-8 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Aller à l'image ${index + 1} sur ${property.images.length}`}
                role="listitem"
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fine bande blanche en bas - 20% de la hauteur */}
      <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 flex flex-col items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden" style={{ height: '20%' }}>
        {/* Informations de base */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap" role="list" aria-label={`Caractéristiques du bien ${property.id}`}>
          <span className="text-xs sm:text-sm text-gray-700 font-medium" role="listitem" aria-label={`Surface habitable : ${property.surface} mètres carrés`}>
            <CountUp
              to={parseInt(property.surface)}
              from={0}
              duration={1.5}
              delay={0.1}
              className="inline"
            />
            <span> m²</span>
          </span>
          <span className="text-xs sm:text-sm text-gray-700 font-medium" role="listitem" aria-label={`Nombre de chambres : ${property.rooms}`}>
            <CountUp
              to={parseInt(property.rooms)}
              from={0}
              duration={1.5}
              delay={0.2}
              className="inline"
            />
            <span> ch.</span>
          </span>
          <span className="text-xs sm:text-sm text-gray-700 font-medium" role="listitem" aria-label={`Nombre de salles de bain : ${property.bathrooms}`}>
            <CountUp
              to={parseInt(property.bathrooms)}
              from={0}
              duration={1.5}
              delay={0.3}
              className="inline"
            />
            <span> SDB</span>
          </span>
          <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 ml-1 sm:ml-2" role="listitem" aria-label={`Prix : ${formatPrice(property.price)} euros`}>
            {formatPrice(property.price)} €
          </span>
        </div>

        {/* CTA "Voir le bien" - apparaît au survol en dessous */}
        <Link
          href={`/properties/${property.id}`}
          id={`property-${property.id}`}
          aria-label={`Voir les détails du bien immobilier : ${property.title || 'Bien'}, ${property.location || ''}, ${formatPrice(property.price)} euros`}
          className="text-xs sm:text-sm font-semibold opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out"
          style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <VariableProximity
            label="Voir le bien"
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 700"
            containerRef={cardRef}
            radius={60}
            falloff="linear"
          />
        </Link>
      </div>
    </article>
  )
}
