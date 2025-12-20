'use client'

import { useState } from 'react'
import Image from 'next/image'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'

interface FeatureData {
  image: string
  imageAlt: string
  title: string
  subtitle: string
  details: string[]
}

export default function Features() {
  const containerRef = null
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)

  const features: FeatureData[] = [
    {
      image: "/images/DSC04823.jpg",
      imageAlt: "Estimation - Agence Y L",
      title: "Estimation",
      subtitle: "Valorisons votre bien",
      details: [
        "Estimation gratuite de la valeur de votre bien",
        "Analyse du marché local",
        "Accompagnement de A à Z"
      ]
    },
    {
      image: "/images/terrasse.jpg",
      imageAlt: "Vente immobilière - Agence Y L",
      title: "Vente immobilière",
      subtitle: "Votre projet de vente, encadré de A à Z",
      details: [
        "Accompagnement personnalisé tout au long du projet",
        "Estimation fiable et conseils au bon prix",
        "Transaction sécurisée jusqu'à la signature"
      ]
    },
    {
      image: "/images/DSC04839.JPG",
      imageAlt: "Location immobilière - Agence Y L",
      title: "Location immobilière",
      subtitle: "Une location sécurisée, sans stress",
      details: [
        "Mise en location et recherche de locataires qualifiés",
        "Accompagnement pour trouver le bien idéal",
        "Gestion complète du dossier locatif"
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
    <section className="pt-20 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 max-w-4xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="Découvrez les services de l'Agence Y L"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>

          <div key={currentFeatureIndex} className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative">
              {/* Colonne de gauche - Image */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-2xl">
                <Image
                  src={currentFeature.image}
                  alt={currentFeature.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Colonne de droite - Contenu */}
              <div className="space-y-6">
                {/* Titre principal */}
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    <VariableProximity
                      label={currentFeature.title}
                      fromFontVariationSettings="'wght' 400"
                      toFontVariationSettings="'wght' 700"
                      containerRef={null}
                      radius={100}
                      falloff="linear"
                    />
                  </h3>
                  <p className="text-xl md:text-2xl" style={{ color: '#4682B4' }}>
                    <VariableProximity
                      label={currentFeature.subtitle}
                      fromFontVariationSettings="'wght' 400"
                      toFontVariationSettings="'wght' 600"
                      containerRef={null}
                      radius={80}
                      falloff="linear"
                    />
                  </p>
                </div>

                {/* Détails */}
                {currentFeature.details && currentFeature.details.length > 0 && (
                  <div className="space-y-3">
                    <ul className="space-y-3 text-gray-700">
                      {currentFeature.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1" style={{ color: '#4682B4' }}>•</span>
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
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Flèches de navigation - Positionnées à mi-hauteur de l'image, décalées vers la droite */}
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
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Indicateurs de navigation */}
            <div className="flex justify-center items-center gap-2 mt-12 mb-16">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleGoToFeature(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentFeatureIndex
                      ? 'w-8 h-1'
                      : 'w-1 h-1 bg-gray-300'
                  }`}
                  style={index === currentFeatureIndex ? { backgroundColor: '#4682B4' } : {}}
                  onMouseEnter={(e) => {
                    if (index !== currentFeatureIndex) {
                      e.currentTarget.style.backgroundColor = 'rgba(70, 130, 180, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentFeatureIndex) {
                      e.currentTarget.style.backgroundColor = '#d1d5db';
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

