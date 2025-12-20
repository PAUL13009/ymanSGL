'use client'

import { useState } from 'react'
import Image from 'next/image'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import CountUp from './CountUp'

interface PropertyImage {
  src: string
  alt: string
}

interface Property {
  id: number
  images: PropertyImage[]
  title: string
  location: string
  price: string
  surface: string
  rooms: string
  bathrooms: string
  type: string
}

export default function Gallery() {
  const containerRef = null
  
  const properties: Property[] = [
    {
      id: 1,
      images: [
        { src: '/images/DSC04823.jpg', alt: 'Appartement moderne - Vue extérieure' },
        { src: '/images/DSC02414.jpg', alt: 'Appartement moderne - Séjour' },
        { src: '/images/DSC02823.jpg', alt: 'Appartement moderne - Chambre' }
      ],
      title: 'Appartement moderne',
      location: 'Marseille 13008',
      price: '450 000 €',
      surface: '85',
      rooms: '3',
      bathrooms: '2',
      type: 'À vendre'
    },
    {
      id: 2,
      images: [
        { src: '/images/terrasse.jpg', alt: 'Maison avec terrasse - Vue extérieure' },
        { src: '/images/DSC04844.jpg', alt: 'Maison avec terrasse - Intérieur' },
        { src: '/images/DSC04848.jpg', alt: 'Maison avec terrasse - Jardin' }
      ],
      title: 'Maison avec terrasse',
      location: 'Marseille 13009',
      price: '680 000 €',
      surface: '120',
      rooms: '4',
      bathrooms: '2',
      type: 'À vendre'
    },
    {
      id: 3,
      images: [
        { src: '/images/DSC04839.JPG', alt: 'Villa de standing - Vue principale' },
        { src: '/images/DSC04868.jpg', alt: 'Villa de standing - Piscine' },
        { src: '/images/DSC04893.jpg', alt: 'Villa de standing - Salon' }
      ],
      title: 'Villa de standing',
      location: 'Marseille 13013',
      price: '950 000 €',
      surface: '180',
      rooms: '5',
      bathrooms: '3',
      type: 'À vendre'
    },
    {
      id: 4,
      images: [
        { src: '/images/DSC02414.jpg', alt: 'Appartement centre-ville - Vue extérieure' },
        { src: '/images/IMG_2678.jpg', alt: 'Appartement centre-ville - Cuisine' },
        { src: '/images/IMG_2699.jpg', alt: 'Appartement centre-ville - Chambre' }
      ],
      title: 'Appartement centre-ville',
      location: 'Marseille 13001',
      price: '1 200 €/mois',
      surface: '65',
      rooms: '2',
      bathrooms: '1',
      type: 'À louer'
    },
    {
      id: 5,
      images: [
        { src: '/images/DSC02823.jpg', alt: 'Maison de ville - Façade' },
        { src: '/images/IMG_2700.jpg', alt: 'Maison de ville - Séjour' },
        { src: '/images/IMG_2720.jpg', alt: 'Maison de ville - Terrasse' }
      ],
      title: 'Maison de ville',
      location: 'Marseille 13005',
      price: '1 800 €/mois',
      surface: '95',
      rooms: '3',
      bathrooms: '2',
      type: 'À louer'
    },
    {
      id: 6,
      images: [
        { src: '/images/DSC04844.jpg', alt: 'Penthouse avec vue - Vue panoramique' },
        { src: '/images/DSC02417.jpg', alt: 'Penthouse avec vue - Salon' },
        { src: '/images/DSC02494.jpg', alt: 'Penthouse avec vue - Terrasse' }
      ],
      title: 'Penthouse avec vue',
      location: 'Marseille 13007',
      price: '2 500 €/mois',
      surface: '110',
      rooms: '4',
      bathrooms: '2',
      type: 'À louer'
    },
  ]

  // État pour gérer l'index de l'image actuelle pour chaque propriété
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    properties.reduce((acc, prop) => {
      acc[prop.id] = 0
      return acc
    }, {} as Record<number, number>)
  )

  const goToPrevious = (propertyId: number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[propertyId]
      const property = properties.find(p => p.id === propertyId)
      if (!property) return prev
      const newIndex = currentIndex === 0 ? property.images.length - 1 : currentIndex - 1
      return { ...prev, [propertyId]: newIndex }
    })
  }

  const goToNext = (propertyId: number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[propertyId]
      const property = properties.find(p => p.id === propertyId)
      if (!property) return prev
      const newIndex = currentIndex === property.images.length - 1 ? 0 : currentIndex + 1
      return { ...prev, [propertyId]: newIndex }
    })
  }

  const goToImage = (propertyId: number, imageIndex: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: imageIndex
    }))
  }

  return (
    <section id="galerie" className="pt-20 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 max-w-4xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="Nos biens immobiliers"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => {
              const currentIndex = currentImageIndex[property.id] || 0
              const currentImage = property.images[currentIndex]
              
              return (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  {/* Carrousel d'images */}
                  <div className="relative h-64 w-full">
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

                    {/* Badge type */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        property.type === 'À vendre' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}>
                        {property.type}
                      </span>
                    </div>

                    {/* Flèches de navigation */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            goToPrevious(property.id)
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-gray-700 rounded-full p-1.5 shadow-md z-10 transition-all duration-300 opacity-0 group-hover:opacity-80"
                          aria-label="Image précédente"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            goToNext(property.id)
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-gray-700 rounded-full p-1.5 shadow-md z-10 transition-all duration-300 opacity-0 group-hover:opacity-80"
                          aria-label="Image suivante"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Indicateurs de position */}
                    {property.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              goToImage(property.id, index)
                            }}
                            className={`transition-all duration-300 rounded-full ${
                              index === currentIndex
                                ? 'w-8 h-1.5 bg-white'
                                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Aller à l'image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    <VariableProximity
                      label={property.title}
                      fromFontVariationSettings="'wght' 400"
                      toFontVariationSettings="'wght' 600"
                      containerRef={null}
                      radius={80}
                      falloff="linear"
                    />
                  </h3>
                  <p className="text-gray-600 mb-4">
                    <VariableProximity
                      label={property.location}
                      fromFontVariationSettings="'wght' 300"
                      toFontVariationSettings="'wght' 500"
                      containerRef={null}
                      radius={70}
                      falloff="linear"
                    />
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-2xl font-semibold" style={{ color: '#4682B4' }}>
                        <VariableProximity
                          label={property.price}
                          fromFontVariationSettings="'wght' 400"
                          toFontVariationSettings="'wght' 600"
                          containerRef={null}
                          radius={70}
                          falloff="linear"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* Surface */}
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span className="text-xs text-gray-600 font-medium">
                        <CountUp
                          to={parseInt(property.surface)}
                          from={0}
                          duration={1.5}
                          delay={0.1}
                          className="inline"
                        />
                        <span> m²</span>
                      </span>
                    </div>

                    {/* Chambres */}
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7h-4m0 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M4 7h16M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0h8" />
                      </svg>
                      <span className="text-xs text-gray-600 font-medium">
                        <CountUp
                          to={parseInt(property.rooms)}
                          from={0}
                          duration={1.5}
                          delay={0.2}
                          className="inline"
                        />
                        <span> ch.</span>
                      </span>
                    </div>

                    {/* Salles de bain */}
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 7c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7M6 7h12M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7M10 11h4M10 15h4" />
                      </svg>
                      <span className="text-xs text-gray-600 font-medium">
                        <CountUp
                          to={parseInt(property.bathrooms)}
                          from={0}
                          duration={1.5}
                          delay={0.3}
                          className="inline"
                        />
                        <span> SDB</span>
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              )
            })}
          </div>
        </div>
      </FadeContent>
    </section>
  )
}
