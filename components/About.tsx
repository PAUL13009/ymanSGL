'use client'

import { useState } from 'react'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import AnimatedContent from './AnimatedContent'

const steps = [
  {
    title: "ÉTAPE 1 — Analyse du marché réel",
    description: "Nous basons nos estimations sur les ventes réellement conclues, pas sur les annonces affichées.",
    items: [
      "Étude des ventes notariées récentes",
      "Analyse micro-locale (rue / immeuble / typologie)",
      "Prise en compte du contexte du bien (état, étage, luminosité, charges, DPE)"
    ]
  },
  {
    title: "ÉTAPE 2 — Définition d'un prix défendable",
    description: "Le prix est fixé pour déclencher des visites qualifiées, pas pour flatter le vendeur.",
    items: [
      "Fourchette argumentée",
      "Scénarios possibles (rapide / équilibré / risqué)",
      "Décision prise avec le vendeur, en toute transparence"
    ]
  },
  {
    title: "ÉTAPE 3 — Mise en marché ciblée",
    description: "Chaque bien est présenté uniquement là où se trouvent les acheteurs capables d'acheter.",
    items: [
      "Diffusion maîtrisée",
      "Mise en valeur sobre et factuelle",
      "Filtrage des contacts pour éviter les visites inutiles"
    ]
  },
  {
    title: "ÉTAPE 4 — Pilotage actif jusqu'à l'offre",
    description: "La vente est suivie, ajustée et pilotée jusqu'à la signature.",
    items: [
      "Analyse des retours de visites",
      "Ajustements si nécessaires",
      "Négociation fondée sur les données, pas sur l'émotion"
    ]
  }
]

export default function About() {
  const containerRef = null
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentStepIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const handleGoToStep = (index: number) => {
    setCurrentStepIndex(index)
  }

  const currentStep = steps[currentStepIndex]

  return (
    <section id="a-propos" className="pt-20 pb-12 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-12" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              Notre méthode de vente : précise, rationnelle, assumée
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-5xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
              <VariableProximity
                label="Chaque bien immobilier est analysé dans son contexte réel."
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
              <br /><br />
              <VariableProximity
                label="Nous ne vendons pas des promesses, nous vendons des biens au prix auquel le marché immobilier marseillais achète."
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          {/* Carrousel des étapes */}
          <div className="mt-16">
            <div key={currentStepIndex} className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative max-w-5xl mx-auto">
                {/* Colonne de gauche - Espace pour contenu visuel (vide pour l'instant) */}
                <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="text-6xl md:text-7xl font-light mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                      {currentStepIndex + 1}
                    </div>
                    <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                  </div>
                </div>

                {/* Colonne de droite - Contenu */}
                <div className="space-y-6">
                  {/* Titre principal */}
                  <div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                      <VariableProximity
                        label={currentStep.title}
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 700"
                        containerRef={null}
                        radius={100}
                        falloff="linear"
                      />
                    </h3>
                    <p className="text-xl md:text-2xl mt-4" style={{ color: '#4682B4' }}>
                      <VariableProximity
                        label={currentStep.description}
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 600"
                        containerRef={null}
                        radius={80}
                        falloff="linear"
                      />
                    </p>
                  </div>

                  {/* Détails */}
                  {currentStep.items && currentStep.items.length > 0 && (
                    <div className="space-y-3">
                      <ul className="space-y-3 text-gray-700">
                        {currentStep.items.map((item, index) => (
                          <AnimatedContent
                            key={index}
                            distance={50}
                            direction="vertical"
                            reverse={false}
                            duration={0.8}
                            ease="power3.out"
                            initialOpacity={0}
                            animateOpacity={true}
                            threshold={0.2}
                            delay={index * 0.1}
                          >
                            <li className="flex items-start gap-3">
                              <span className="mt-1" style={{ color: '#4682B4' }}>•</span>
                              <span className="leading-relaxed">
                                <VariableProximity
                                  label={item}
                                  fromFontVariationSettings="'wght' 300"
                                  toFontVariationSettings="'wght' 500"
                                  containerRef={null}
                                  radius={70}
                                  falloff="linear"
                                />
                              </span>
                            </li>
                          </AnimatedContent>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Flèches de navigation - Positionnées à mi-hauteur, décalées vers la droite */}
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
              </div>
              
              {/* Indicateurs de navigation */}
              <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleGoToStep(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentStepIndex
                        ? 'w-8 h-1'
                        : 'w-1 h-1 bg-gray-300'
                    }`}
                    style={index === currentStepIndex ? { backgroundColor: '#4682B4' } : {}}
                    onMouseEnter={(e) => {
                      if (index !== currentStepIndex) {
                        e.currentTarget.style.backgroundColor = 'rgba(70, 130, 180, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentStepIndex) {
                        e.currentTarget.style.backgroundColor = '#d1d5db';
                      }
                    }}
                    aria-label={`Aller à l'étape ${index + 1}`}
                  />
                ))}
              </div>

              {/* Encadré informatif */}
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-white border-2 rounded-lg p-6 md:p-8 shadow-md" style={{ borderColor: '#4682B4' }}>
                  <div className="text-lg md:text-xl text-center leading-relaxed space-y-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <p>
                      <VariableProximity
                        label="Nous refusons les mandats lorsque le prix demandé n'est pas cohérent avec le marché."
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 600"
                        containerRef={null}
                        radius={100}
                        falloff="linear"
                      />
                    </p>
                    <p>
                      <VariableProximity
                        label="Accepter un mandat surévalué fait perdre du temps au vendeur et décrédibilise la vente dès les premières semaines."
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 600"
                        containerRef={null}
                        radius={100}
                        falloff="linear"
                      />
                    </p>
                    <p>
                      <VariableProximity
                        label="C'est une condition indispensable pour vendre efficacement."
                        fromFontVariationSettings="'wght' 400"
                        toFontVariationSettings="'wght' 600"
                        containerRef={null}
                        radius={100}
                        falloff="linear"
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col items-center">
                <a
                  href="/analyse"
                  className="inline-block px-8 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: '#4682B4',
                    color: 'white',
                    fontFamily: 'var(--font-poppins), sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3a6a8f'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4'
                  }}
                >
                  <VariableProximity
                    label="Vérifier si votre bien peut être vendu dans ces conditions"
                    fromFontVariationSettings="'wght' 500"
                    toFontVariationSettings="'wght' 700"
                    containerRef={null}
                    radius={60}
                    falloff="linear"
                  />
                </a>
                <p className="mt-4 text-sm md:text-base text-gray-600 font-light" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Analyse offerte – Mandat accepté uniquement si le prix est réaliste
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

