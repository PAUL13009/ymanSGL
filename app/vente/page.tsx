'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import Gallery from '@/components/Gallery'
import Navbar from '@/components/Navbar'
import FadeContent from '@/components/FadeContent'
import Stepper, { Step } from '@/components/Stepper'
import Image from 'next/image'
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
  const cta1ButtonRef = useScrollButtonAnimation()
  const cta3ButtonRef = useScrollButtonAnimation()
  const ctaFinalButtonRef = useScrollButtonAnimation()

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

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
            "url": "https://www.lagenceyl.fr",
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
            "@id": "https://www.lagenceyl.fr/#organization"
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
            "image": "https://www.lagenceyl.fr/images/Logo-removebg-preview.png",
            "@id": "https://www.lagenceyl.fr",
            "url": "https://www.lagenceyl.fr",
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
          title="un bien se vend au prix du marché. Le reste n'est qu'illusion"
          subtitle=""
          microText="Vauban – 6ᵉ arrondissement – quartiers centraux de Marseille"
          buttonText="Demander une analyse de valeur réaliste de mon bien"
          buttonSubtext="Analyse argumentée – Sans engagement – Mandat accepté uniquement si le prix est cohérent"
          buttonLink="/analyse"
          imagePath="/images/modern.webp"
        />
        <StatsSection />

        {/* Section Notre méthode de vente */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Notre méthode de vente : précise, rationnelle, assumée
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Chaque bien immobilier est analysé dans son contexte réel.
                </p>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous ne vendons pas des promesses, nous vendons des biens au prix du marché.
                </p>
              </div>

              {/* Stepper pour naviguer entre les étapes */}
              <div className="mt-16 w-full flex justify-center">
                <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                  <Step>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[0].title}
                    </h3>
                    <p className="text-gray-800 text-center mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[0].description}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      {steps[0].items.map((item, index) => (
                        <span key={index} className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </Step>
                  <Step>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[1].title}
                    </h3>
                    <p className="text-gray-800 text-center mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[1].description}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      {steps[1].items.map((item, index) => (
                        <span key={index} className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </Step>
                  <Step>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[2].title}
                    </h3>
                    <p className="text-gray-800 text-center mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[2].description}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      {steps[2].items.map((item, index) => (
                        <span key={index} className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </Step>
                  <Step>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[3].title}
                    </h3>
                    <p className="text-gray-800 text-center mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {steps[3].description}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      {steps[3].items.map((item, index) => (
                        <span key={index} className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </Step>
                </Stepper>
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
              <div className="mt-12 text-center">
                <div className="group/cta relative inline-flex border border-black/70 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-black hover:shadow-lg hover:shadow-black/10">
                  <a
                    ref={cta1ButtonRef as any}
                    href="/analyse"
                    aria-label="Vérifier si votre bien peut être vendu dans ces conditions"
                    className="inline-flex items-center justify-center text-black font-medium transition-all duration-300 hover:opacity-80"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">Vérifier si votre bien peut être vendu dans ces conditions</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Ce que cette méthode change concrètement */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-base md:text-lg font-semibold mb-4 text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {benefit.subtitle}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      {benefit.items.map((item, itemIndex) => (
                        <span key={itemIndex} className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {item}
                        </span>
                      ))}
                    </div>
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
              <div className="mt-16 text-center">
                <div className="group/cta relative inline-flex border border-black/70 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-black hover:shadow-lg hover:shadow-black/10">
                  <a
                    ref={cta3ButtonRef as any}
                    href="/analyse"
                    aria-label="Demander une analyse de valeur réaliste de mon bien"
                    className="inline-flex items-center justify-center text-black font-medium transition-all duration-300 hover:opacity-80"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">Demander une analyse de valeur réaliste de mon bien</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Section Notre rôle */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Notre rôle
                </h2>
              </div>
              <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
                <div className="max-w-4xl mx-auto space-y-6">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous accompagnons exclusivement des vendeurs particuliers dans la vente immobilière de leur résidence principale à Saint-Germain-en-Laye.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Notre mission couvre l'ensemble du processus : analyse du marché immobilier local, estimation immobilière réaliste, définition d'un prix cohérent, stratégie de mise en vente et accompagnement jusqu'à la signature définitive.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous n'intervenons pas sur des mandats surévalués. Cette exigence est la condition pour vendre efficacement, dans des délais maîtrisés et sans négociation destructrice.
                  </p>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        <Gallery maxProperties={3} titleStyle="section" />

        {/* CTA Final */}
        <section className="relative min-h-screen flex items-center justify-center" aria-labelledby="cta-final-vente">
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <Image
                src="/images/modern.webp"
                alt="L'Agence YL - Service de vente immobilière à Saint-Germain-en-Laye"
                fill
                className="object-cover"
                loading="lazy"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/20" aria-hidden="true" role="presentation" />
            </div>
          </div>
          <div className="relative z-10 w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
                <h2 id="cta-final-vente" className="sr-only">Demander une estimation immobilière</h2>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed px-2 mb-8 sm:mb-12 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Un projet immobilier mérite une vraie réflexion. Commencez par la bonne étape.
                </p>
              </FadeContent>
              <div className="flex justify-center items-center">
                <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                  <div className="flex justify-center w-full">
                    <a
                      ref={ctaFinalButtonRef as any}
                      href="/estimation"
                      aria-label="Demander une estimation immobilière gratuite"
                      className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">Faire estimer mon bien</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
