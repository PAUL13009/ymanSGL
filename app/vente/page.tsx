'use client'

import { useRef, useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import { useProximityContainer } from '@/components/ProximityProvider'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

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

const benefits = [
  {
    title: '1 — Moins de temps perdu',
    subtitle: 'Votre bien est positionné correctement dès le départ.',
    items: [
      'Moins de semaines sans visite',
      'Moins de repositionnements tardifs',
      'Un calendrier de vente maîtrisé'
    ]
  },
  {
    title: '2 — Moins de dévalorisation',
    subtitle: 'Un prix cohérent protège la valeur de votre bien.',
    items: [
      'Pas d\'historique d\'annonces à rallonge',
      'Pas d\'image de bien "invendu"',
      'Une négociation basée sur des faits, pas sur l\'urgence'
    ]
  },
  {
    title: '3 — Des acheteurs réellement qualifiés',
    subtitle: 'Les visites sont ciblées et utiles.',
    items: [
      'Acheteurs capables de financer',
      'Compréhension claire du prix',
      'Moins de curiosité, plus de décisions'
    ]
  },
  {
    title: '4 — Des décisions prises en confiance',
    subtitle: 'Chaque choix est expliqué et argumenté.',
    items: [
      'Ajustements basés sur des données',
      'Vision claire à chaque étape',
      'Aucune pression inutile'
    ]
  }
]

export default function VentePage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const cta1ButtonRef = useScrollButtonAnimation()
  const cta2ButtonRef = useScrollButtonAnimation()
  const cta3ButtonRef = useScrollButtonAnimation()

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

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
    <>
      {/* Données structurées Schema.org pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "L'Agence YL",
            "description": "Agence immobilière indépendante spécialisée dans l'estimation et la vente de biens immobiliers à Marseille, 6e arrondissement (Vauban) et quartiers limitrophes. Accompagnement des vendeurs particuliers de résidence principale avec une méthode exigeante basée sur l'analyse précise du marché immobilier local.",
            "url": "https://www.agence-yl.fr",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Marseille",
              "addressRegion": "Provence-Alpes-Côte d'Azur",
              "postalCode": "13006",
              "addressCountry": "FR"
            },
            "areaServed": {
              "@type": "City",
              "name": "Marseille",
              "containedIn": {
                "@type": "AdministrativeArea",
                "name": "6e arrondissement"
              }
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.2965",
              "longitude": "5.3698"
            },
            "serviceType": [
              "Estimation immobilière",
              "Vente immobilière",
              "Accompagnement vendeur particulier"
            ],
            "priceRange": "$$",
            "@id": "https://www.agence-yl.fr/#organization"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "L'Agence YL",
            "image": "https://www.agence-yl.fr/images/Logo-removebg-preview.png",
            "@id": "https://www.agence-yl.fr",
            "url": "https://www.agence-yl.fr",
            "telephone": "+33-X-XX-XX-XX-XX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Vauban",
              "addressLocality": "Marseille",
              "addressRegion": "Provence-Alpes-Côte d'Azur",
              "postalCode": "13006",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.2965",
              "longitude": "5.3698"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": []
          })
        }}
      />
      <main ref={mainRef} className="min-h-screen">
        <Navbar />
        <Hero 
          title="À Marseille, un bien se vend au prix du marché. Le reste n'est qu'illusion"
          subtitle="L'Agence YL accompagne uniquement les vendeurs de résidence principale prêts à vendre efficacement, sur la base d'une analyse précise du marché réel"
          microText="Vauban – 6ᵉ arrondissement – quartiers centraux de Marseille"
          buttonText="Demander une analyse de valeur réaliste de mon bien"
          buttonSubtext="Analyse argumentée – Sans engagement – Mandat accepté uniquement si le prix est cohérent"
          buttonLink="/analyse"
          imagePath="/images/vue7e.png"
        />
        <StatsSection />

        {/* Section Notre méthode de vente */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                  Notre méthode de vente : précise, rationnelle, assumée
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Chaque bien immobilier est analysé dans son contexte réel.
                </p>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous ne vendons pas des promesses, nous vendons des biens au prix auquel le marché immobilier marseillais achète.
                </p>
              </div>

              {/* Carrousel des étapes */}
              <div className="mt-16">
                <div key={currentStepIndex} className="animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative max-w-5xl mx-auto">
                    {/* Colonne de gauche - Numéro d'étape */}
                    <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg flex items-center justify-center">
                      <div className="text-center px-8">
                        <div className="text-6xl md:text-7xl font-light mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {currentStepIndex + 1}
                        </div>
                        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                      </div>
                    </div>

                    {/* Colonne de droite - Contenu */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {currentStep.title}
                        </h3>
                        <p className="text-lg md:text-xl text-gray-700 mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {currentStep.description}
                        </p>
                      </div>

                      {/* Détails */}
                      {currentStep.items && currentStep.items.length > 0 && (
                        <div className="space-y-3">
                          <ul className="space-y-3 text-gray-700">
                            {currentStep.items.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="mt-1" style={{ color: '#4682B4' }}>•</span>
                                <span className="leading-relaxed text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Flèches de navigation - Mobile */}
                      <div className="flex md:hidden justify-center items-center gap-2 mt-6">
                        <button 
                          onClick={handlePrevious}
                          className="w-10 h-10 flex items-center justify-center transition-all rounded-full"
                          style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#4682B4';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#4682B4';
                          }}
                          aria-label="Étape précédente"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={handleNext}
                          className="w-10 h-10 flex items-center justify-center transition-all rounded-full"
                          style={{ border: '1px solid #4682B4', color: '#4682B4' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#4682B4';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#4682B4';
                          }}
                          aria-label="Étape suivante"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Flèches de navigation - Desktop */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 flex gap-2 hidden md:flex" style={{ marginLeft: 'calc(8rem / 2 + 28rem)' }}>
                        <button 
                          onClick={handlePrevious}
                          className="w-10 h-10 flex items-center justify-center transition-all rounded-full"
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
                          className="w-10 h-10 flex items-center justify-center transition-all rounded-full"
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
                  <div className="flex justify-center items-center gap-3 mt-12 mb-8">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleGoToStep(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentStepIndex
                            ? 'w-12 h-2'
                            : 'w-2 h-2 bg-gray-400'
                        }`}
                        style={index === currentStepIndex ? { backgroundColor: '#4682B4' } : {}}
                        onMouseEnter={(e) => {
                          if (index !== currentStepIndex) {
                            e.currentTarget.style.backgroundColor = 'rgba(70, 130, 180, 0.7)';
                            e.currentTarget.style.width = '1.5rem';
                            e.currentTarget.style.height = '0.5rem';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (index !== currentStepIndex) {
                            e.currentTarget.style.backgroundColor = '#9ca3af';
                            e.currentTarget.style.width = '';
                            e.currentTarget.style.height = '';
                          }
                        }}
                        aria-label={`Aller à l'étape ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Encadré informatif */}
                  <div className="mt-8 max-w-4xl mx-auto">
                    <div className="bg-white border-2 rounded-xl p-6 md:p-8 shadow-lg" style={{ borderColor: '#4682B4' }}>
                      <div className="text-lg md:text-xl text-center leading-relaxed space-y-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <p>
                          Nous refusons les mandats lorsque le prix demandé n'est pas cohérent avec le marché.
                        </p>
                        <p>
                          Accepter un mandat surévalué fait perdre du temps au vendeur et décrédibilise la vente dès les premières semaines.
                        </p>
                        <p>
                          C'est une condition indispensable pour vendre efficacement.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-12 flex flex-col items-center">
                    <a
                      ref={cta1ButtonRef as any}
                      href="/analyse"
                      className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                      style={{
                        backgroundColor: 'white',
                        color: '#4682B4',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: '1.125rem',
                        textDecoration: 'none',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        letterSpacing: '0.3px'
                      }}
                      onMouseEnter={(e) => {
                        const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                        const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                        const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                        const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                        if (fill) {
                          fill.style.width = '100%'
                          fill.style.transform = 'translateX(-50%) scaleY(1)'
                        }
                        if (arrow) {
                          arrow.style.opacity = '1'
                          arrow.style.right = '-14px'
                        }
                        if (text) text.style.color = 'white'
                        if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                      }}
                      onMouseLeave={(e) => {
                        const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                        const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                        const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                        const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                        if (fill) {
                          fill.style.width = '0%'
                          fill.style.transform = 'translateX(-50%) scaleY(0)'
                        }
                        if (arrow) {
                          arrow.style.opacity = '0'
                          arrow.style.right = '-30px'
                        }
                        if (text) text.style.color = '#4682B4'
                        if (textSpan) textSpan.style.transform = 'translateX(0)'
                      }}
                    >
                      {/* Fond bleu qui se remplit */}
                      <span
                        className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                        style={{
                          width: '0%',
                          backgroundColor: '#4682B4',
                          transform: 'translateX(-50%) scaleY(0)',
                          transformOrigin: 'center bottom',
                          transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                          zIndex: 1
                        }}
                      ></span>
                      
                      {/* Contenu du bouton */}
                      <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                        <span className="transition-transform duration-300">Vérifier si votre bien peut être vendu dans ces conditions</span>
                        <svg
                          className="button-arrow absolute w-5 h-5 transition-all duration-300"
                          style={{
                            opacity: 0,
                            right: '-30px',
                            transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
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

        {/* Section Pourquoi cette approche fonctionne */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                  Pourquoi cette approche fonctionne à Vauban et dans le 6ᵉ arrondissement
                </h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Les quartiers centraux de Marseille ne fonctionnent pas comme le reste du marché immobilier.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    À Vauban et dans le 6ᵉ arrondissement, les acheteurs sont informés, attentifs aux prix et très réactifs à la cohérence d'une estimation immobilière.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Dans ce contexte, l'approximation se paie immédiatement en temps perdu
                  </p>
                </div>
              </div>

              {/* Trois blocs */}
              <div className="mt-16 grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                {/* Bloc 1 */}
                <div className="bg-white rounded-lg p-6 md:p-8 h-full shadow-lg border border-gray-100">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Des vendeurs informés, peu sensibles aux discours commerciaux
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Les vendeurs de ces quartiers comparent, analysent et cherchent à comprendre avant de décider.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Ils attendent une lecture claire du marché, pas des promesses de surévaluation qui retardent la vente et fragilisent la négociation.
                  </p>
                </div>

                {/* Bloc 2 */}
                <div className="bg-white rounded-lg p-6 md:p-8 h-full shadow-lg border border-gray-100">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Un marché qui sanctionne rapidement les erreurs de prix
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    À Vauban, un bien mal positionné est identifié en quelques semaines par les acheteurs.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'historique des annonces est observé, les comparaisons sont immédiates, et une correction tardive entraîne souvent une perte de crédibilité — et de valeur.
                  </p>
                </div>

                {/* Bloc 3 */}
                <div className="bg-white rounded-lg p-6 md:p-8 h-full shadow-lg border border-gray-100">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                    La vente repose sur la précision, pas sur le volume
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Dans ces quartiers, vendre efficacement repose sur :
                  </p>
                  <ul className="text-base text-gray-600 leading-relaxed mb-3 space-y-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span>une analyse micro-locale,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span>un positionnement tarifaire défendable,</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span>et un pilotage rigoureux dès la mise en marché.</span>
                    </li>
                  </ul>
                  <p className="text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    C'est pourquoi nous privilégions peu de mandats, mais des mandats cohérents, traités avec méthode et exigence.
                  </p>
                </div>
              </div>

              {/* Phrase de positionnement */}
              <div className="mt-16 text-center">
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Chaque vente est abordée comme un projet unique, avec un objectif clair : vendre dans les meilleures conditions du marché réel, sans dévalorisation progressive
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col items-center">
                <a
                  ref={cta2ButtonRef as any}
                  href="/analyse"
                  className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: 'white',
                    color: '#4682B4',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                    const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                    const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                    const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                    if (fill) {
                      fill.style.width = '100%'
                      fill.style.transform = 'translateX(-50%) scaleY(1)'
                    }
                    if (arrow) {
                      arrow.style.opacity = '1'
                      arrow.style.right = '-14px'
                    }
                    if (text) text.style.color = 'white'
                    if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                  }}
                  onMouseLeave={(e) => {
                    const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                    const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                    const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                    const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                    if (fill) {
                      fill.style.width = '0%'
                      fill.style.transform = 'translateX(-50%) scaleY(0)'
                    }
                    if (arrow) {
                      arrow.style.opacity = '0'
                      arrow.style.right = '-30px'
                    }
                    if (text) text.style.color = '#4682B4'
                    if (textSpan) textSpan.style.transform = 'translateX(0)'
                  }}
                >
                  {/* Fond bleu qui se remplit */}
                  <span
                    className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                    style={{
                      width: '0%',
                      backgroundColor: '#4682B4',
                      transform: 'translateX(-50%) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                      zIndex: 1
                    }}
                  ></span>
                  
                  {/* Contenu du bouton */}
                  <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                    <span className="transition-transform duration-300">Vérifiez si votre bien correspond à cette approche</span>
                    <svg
                      className="button-arrow absolute w-5 h-5 transition-all duration-300"
                      style={{
                        opacity: 0,
                        right: '-30px',
                        transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Ce que cette méthode change concrètement */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                  Ce que cette méthode change concrètement pour vous
                </h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Vendre un bien immobilier n'est pas une question de chance, mais de décisions prises au bon moment.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Une méthode claire de vente immobilière permet d'éviter les erreurs les plus fréquentes : surévaluation, perte de temps et négociations subies.
                  </p>
                </div>
              </div>

              {/* 4 blocs */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-stone-50 rounded-lg p-6 md:p-8 h-full shadow-lg border border-gray-100">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-base md:text-lg font-semibold mb-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {benefit.subtitle}
                    </p>
                    <ul className="text-base text-gray-600 leading-relaxed space-y-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {benefit.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Phrase de synthèse */}
              <div className="mt-16 text-center">
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Vendre efficacement, ce n'est pas vendre plus vite à n'importe quel prix.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    C'est vendre dans les bonnes conditions, sans subir le marché.
                  </p>
                </div>
              </div>

              {/* CTA Final */}
              <div className="mt-16 flex flex-col items-center">
                <a
                  ref={cta3ButtonRef as any}
                  href="/analyse"
                  className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: 'white',
                    color: '#4682B4',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                    const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                    const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                    const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                    if (fill) {
                      fill.style.width = '100%'
                      fill.style.transform = 'translateX(-50%) scaleY(1)'
                    }
                    if (arrow) {
                      arrow.style.opacity = '1'
                      arrow.style.right = '-14px'
                    }
                    if (text) text.style.color = 'white'
                    if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                  }}
                  onMouseLeave={(e) => {
                    const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                    const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                    const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                    const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                    if (fill) {
                      fill.style.width = '0%'
                      fill.style.transform = 'translateX(-50%) scaleY(0)'
                    }
                    if (arrow) {
                      arrow.style.opacity = '0'
                      arrow.style.right = '-30px'
                    }
                    if (text) text.style.color = '#4682B4'
                    if (textSpan) textSpan.style.transform = 'translateX(0)'
                  }}
                >
                  {/* Fond bleu qui se remplit */}
                  <span
                    className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                    style={{
                      width: '0%',
                      backgroundColor: '#4682B4',
                      transform: 'translateX(-50%) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                      zIndex: 1
                    }}
                  ></span>
                  
                  {/* Contenu du bouton */}
                  <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                    <span className="transition-transform duration-300">Demander une analyse de valeur réaliste de mon bien</span>
                    <svg
                      className="button-arrow absolute w-5 h-5 transition-all duration-300"
                      style={{
                        opacity: 0,
                        right: '-30px',
                        transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <p className="mt-4 text-sm md:text-base text-gray-600 font-light text-center max-w-2xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Analyse offerte et argumentée – mandat accepté uniquement si le prix est cohérent avec le marché.
                </p>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Notre rôle */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                  Notre rôle
                </h2>
              </div>
              <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
                <div className="max-w-4xl mx-auto space-y-6">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous accompagnons exclusivement des vendeurs particuliers dans la vente immobilière de leur résidence principale à Marseille, principalement sur les secteurs du 6ᵉ arrondissement et quartiers limitrophes.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Notre mission couvre l'ensemble du processus : analyse du marché immobilier local, estimation immobilière réaliste, définition d'un prix cohérent, stratégie de mise en vente et accompagnement jusqu'à la signature définitive.
                  </p>
                  <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-6" style={{ borderColor: '#4682B4' }}>
                    <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Nous n'intervenons pas sur des mandats surévalués. Cette exigence est la condition pour vendre efficacement, dans des délais maîtrisés et sans négociation destructrice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        <Gallery />
        <Footer />
      </main>
    </>
  )
}
