'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import Features from '@/components/Features'
import PropertyCard from '@/components/PropertyCard'
import FadeContent from '@/components/FadeContent'
import VariableProximity from '@/components/VariableProximity'
import Image from 'next/image'
import { getLimitedProperties } from '@/lib/firebase-properties'
import { useProximityContainer } from '@/components/ProximityProvider'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'
import { useScrollImageAnimation } from '@/hooks/useScrollImageAnimation'

interface PropertyImage {
  src: string
  alt: string
}

interface Property {
  id: string | number
  images: PropertyImage[]
  title: string
  location: string
  price: string
  surface: string
  surface_habitable?: string
  rooms: string
  bathrooms: string
  type: string
  status?: string
}

const defaultProperties: Property[] = [
  {
    id: 'exemple-1',
    images: [
      { src: '/images/DSC02414.jpg', alt: 'Appartement haussmannien Paris - Séjour avec moulures' },
      { src: '/images/DSC04823.jpg', alt: 'Appartement haussmannien Paris - Vue intérieure' },
      { src: '/images/DSC02823.jpg', alt: 'Appartement haussmannien Paris - Chambre' },
      { src: '/images/DSC02417.jpg', alt: 'Appartement haussmannien Paris - Espace de vie' },
      { src: '/images/DSC02494.jpg', alt: 'Appartement haussmannien Paris - Détails architecturaux' }
    ],
    title: 'Appartement 3 pièces - Quartier historique',
    location: 'Saint-Germain-en-Laye (78)',
    price: '450 000',
    surface: '85',
    rooms: '3',
    bathrooms: '2',
    type: 'À vendre'
  },
  {
    id: 'exemple-2',
    images: [
      { src: '/images/DSC04844.jpg', alt: 'Appartement haussmannien Paris - Séjour avec hauteur sous plafond' },
      { src: '/images/loft.jpg', alt: 'Appartement haussmannien Paris - Espace de réception' },
      { src: '/images/DSC02758.jpg', alt: 'Appartement haussmannien Paris - Balcon' },
      { src: '/images/DSC04848.jpg', alt: 'Appartement haussmannien Paris - Intérieur élégant' },
      { src: '/images/IMG_2678.jpg', alt: 'Appartement haussmannien Paris - Détails architecturaux' }
    ],
    title: 'Appartement 4 pièces haussmannien',
    location: 'Paris 16ème (75)',
    price: '1 680 000',
    surface: '120',
    rooms: '4',
    bathrooms: '2',
    type: 'À vendre'
  },
  {
    id: 'exemple-3',
    images: [
      { src: '/images/DSC04893.jpg', alt: 'Appartement haussmannien Paris - Salon de réception' },
      { src: '/images/DSC04868.jpg', alt: 'Appartement haussmannien Paris - Espace de vie' },
      { src: '/images/DSC04839.JPG', alt: 'Appartement haussmannien Paris - Vue intérieure' },
      { src: '/images/IMG_2699.jpg', alt: 'Appartement haussmannien Paris - Détails architecturaux' },
      { src: '/images/IMG_2700.jpg', alt: 'Appartement haussmannien Paris - Chambre' }
    ],
    title: 'Appartement 5 pièces avec balcon',
    location: 'Paris 7ème (75)',
    price: '2 450 000',
    surface: '180',
    rooms: '5',
    bathrooms: '3',
    type: 'À vendre'
  },
  {
    id: 'exemple-4',
    images: [
      { src: '/images/gratteciel.jpg', alt: 'Appartement haussmannien Paris - Vue sur les boulevards' },
      { src: '/images/IMG_2720.jpg', alt: 'Appartement haussmannien Paris - Séjour avec moulures' },
      { src: '/images/maison15esejour2.webp', alt: 'Appartement haussmannien Paris - Espace de vie' },
      { src: '/images/vue7e.png', alt: 'Appartement haussmannien Paris - Vue extérieure' },
      { src: '/images/foto2.jpg', alt: 'Appartement haussmannien Paris - Détails architecturaux' }
    ],
    title: 'Appartement 4 pièces vue panoramique',
    location: 'Paris 16ème (75)',
    price: '1 250 000',
    surface: '95',
    rooms: '4',
    bathrooms: '2',
    type: 'À vendre'
  },
]

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string | number, number>>({})
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [isAgenceButtonHovered, setIsAgenceButtonHovered] = useState(false)
  const [isConfianceImageHovered, setIsConfianceImageHovered] = useState(false)
  const [isConfianceButtonHovered, setIsConfianceButtonHovered] = useState(false)
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | number | null>(null)
  
  // Refs pour les boutons CTA avec animation au scroll sur mobile
  const catalogueButtonRef = useScrollButtonAnimation()
  const estimationButtonRef = useScrollButtonAnimation()
  const contactButtonRef = useScrollButtonAnimation()
  
  // Hook pour l'animation de l'image de la fondatrice au scroll sur mobile
  const { imageRef: confianceImageRef, isAnimated: isConfianceImageAnimated } = useScrollImageAnimation()
  const { imageRef: agenceImageRef, isAnimated: isAgenceImageAnimated } = useScrollImageAnimation()

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      // Pour la page d'accueil, utiliser toujours les propriétés par défaut avec les images haussmanniennes
      setProperties(defaultProperties.slice(0, 4))
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
      // En cas d'erreur, utiliser les biens d'exemple
      setProperties(defaultProperties.slice(0, 4))
    } finally {
      setLoading(false)
    }
  }

  // Toujours afficher les 4 biens par défaut avec images haussmanniennes
  const displayProperties = useMemo(() => {
    return defaultProperties.slice(0, 4)
  }, [])

  useEffect(() => {
    if (displayProperties.length > 0) {
      const initialIndex: Record<string | number, number> = {}
      displayProperties.forEach(prop => {
        initialIndex[prop.id] = 0
      })
      setCurrentImageIndex(initialIndex)
    }
  }, [displayProperties])

  const goToPrevious = (propertyId: string | number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[propertyId] || 0
      const property = displayProperties.find(p => p.id === propertyId)
      if (!property) return prev
      const newIndex = currentIndex === 0 ? property.images.length - 1 : currentIndex - 1
      return { ...prev, [propertyId]: newIndex }
    })
  }

  const goToNext = (propertyId: string | number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[propertyId] || 0
      const property = displayProperties.find(p => p.id === propertyId)
      if (!property) return prev
      const newIndex = currentIndex === property.images.length - 1 ? 0 : currentIndex + 1
      return { ...prev, [propertyId]: newIndex }
    })
  }

  const goToImage = (propertyId: string | number, imageIndex: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: imageIndex
    }))
  }

  return (
    <main ref={mainRef} className="min-h-screen bg-transparent relative" role="main">
      <Navbar />
      <Hero 
        title="Vendez au juste prix. Estimation réaliste à Saint-Germain-en-Laye"
        subtitle="Ne vous contentez pas d'une estimation automatique. Obtenez un dossier d'estimation complet pour sécuriser votre vente et valoriser votre patrimoine"
        buttonText="Obtenir mon estimation sous 24h"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation#grille-tarifaire"
        imagePath="/images/herosectionimage.png"
        imageAlt="L'Agence YL - Agence immobilière nouvelle génération à Marseille"
        centered={true}
      />
      {/* Wrapper avec image d'arrière-plan pour toutes les sections */}
      <div className="relative z-10">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/herosectionimage.png"
            alt=""
            fill
            className="object-cover blur-md"
            loading="lazy"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </div>

      <StatsSection />
      <Features />
      
      {/* Section Biens à la une */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 relative z-10" aria-labelledby="biens-a-la-une">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête avec titre et bouton */}
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-3">
                    <h2 id="biens-a-la-une" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-left uppercase text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Découvrez Nos Biens
                    </h2>
                    <Link
                      href="/catalogue"
                      className="group/cta relative hidden sm:inline-flex items-center border border-white/60 px-6 py-3 rounded-lg transition-all duration-300 hover:border-white"
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                        color: '#ffffff',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                        Notre catalogue
                      </span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base text-white/70 uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      NOS BIENS
                    </span>
                    <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="2" y="10" width="2" height="4" rx="1"/>
                      <rect x="6" y="8" width="2" height="8" rx="1"/>
                      <rect x="10" y="6" width="2" height="12" rx="1"/>
                      <rect x="14" y="4" width="2" height="16" rx="1"/>
                      <rect x="18" y="7" width="2" height="10" rx="1"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {loading ? (
                <div className="col-span-full text-center py-8" role="status" aria-live="polite">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
                  <p className="text-white/70" aria-label="Chargement des biens immobiliers en cours">Chargement des biens...</p>
                </div>
              ) : displayProperties.length === 0 ? (
                <div className="col-span-full text-center py-8 text-white/70">
                  <p>Aucun bien enregistré pour le moment.</p>
                </div>
              ) : (
                displayProperties.slice(0, 4).map((property, index) => {
                  const mainImage = property.images && property.images.length > 0 ? property.images[0] : null
                  const isHovered = hoveredPropertyId === property.id
                  
                  return (
                    <Link
                      key={property.id}
                      href={`/properties/${property.id}`}
                      className="group relative block rounded-lg overflow-hidden aspect-square"
                      onMouseEnter={() => setHoveredPropertyId(property.id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                    >
                      {mainImage ? (
                        <>
                          <div className="absolute inset-0">
                            <Image
                              src={mainImage.src}
                              alt={mainImage.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                          
                          {/* Overlay avec texte en bas à gauche */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                            <div className="absolute bottom-6 left-6 right-6">
                              <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                L'AGENCE YL
                              </p>
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {property.title}
                              </h3>
                              {property.location && (
                                <p className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                  {property.location}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* CTA qui apparaît au survol — masqué sur mobile */}
                          <div 
                            className={`absolute inset-0 bg-black/80 hidden sm:flex items-center justify-center transition-all duration-500 ease-in-out ${
                              isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <span 
                              className={`inline-block px-8 py-4 rounded-lg border-2 border-white text-white font-semibold transition-all duration-500 transform ${
                                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                              }`}
                              style={{
                                fontFamily: 'var(--font-poppins), sans-serif',
                                fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)',
                                transitionDelay: isHovered ? '0.1s' : '0s'
                              }}
                            >
                              Voir les détails
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                          <p className="text-gray-600">Aucune image</p>
                        </div>
                      )}
                    </Link>
                  )
                })
              )}
            </div>

            {/* Bouton catalogue mobile - centré sous les cartes */}
            <div className="flex sm:hidden justify-center mt-8">
              <Link
                href="/catalogue"
                ref={catalogueButtonRef as React.RefObject<HTMLAnchorElement>}
                className="group/cta relative inline-flex items-center border border-white/60 px-6 py-3 rounded-lg transition-all duration-300 hover:border-white"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                }}
              >
                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                  Découvrir notre catalogue
                </span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Confiance */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 relative z-10" aria-labelledby="message-fondatrice">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Colonne gauche : Texte */}
              <div className="order-2 md:order-1 space-y-6 sm:space-y-8">
                <h2 id="message-fondatrice" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous ne promettons pas l'impossible
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous privilégions les projets cohérents, avec des propriétaires impliqués et des objectifs réalistes.
                  </p>
                  
                  <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Chaque bien est étudié avant d'être accepté, afin de garantir une stratégie adaptée et un suivi sérieux.
                  </p>
                  
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold leading-relaxed uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nous sélectionnons nos mandats pour garantir une vente au prix du marché.
                  </p>
                </div>
              </div>
              
              {/* Colonne droite : Image sans bordure */}
              <div className="order-1 md:order-2">
                <div className="relative">
                  {/* Image sans bordure blanche avec effet hover */}
                  <div 
                    className="relative aspect-[3/4] overflow-hidden group"
                    onMouseEnter={() => setIsConfianceImageHovered(true)}
                    onMouseLeave={() => setIsConfianceImageHovered(false)}
                  >
                    <Image
                      src="/images/ymannew.png"
                      alt="Yman Lahlou, Experte Immobilier Agréé"
                      fill
                      className={`object-contain transition-all duration-500 ${
                        isConfianceImageHovered ? 'scale-105' : ''
                      } ${
                        isConfianceButtonHovered ? 'blur-md' : ''
                      }`}
                      priority
                      unoptimized={false}
                    />
                    {/* Overlay avec bouton CTA au survol — masqué sur mobile */}
                    <div className={`absolute inset-0 bg-black/60 hidden sm:flex items-center justify-center transition-all duration-500 ${
                      isConfianceImageHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Link
                        href="/notre-methode"
                        className={`transform transition-all duration-500 ${
                          isConfianceImageHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                        onMouseEnter={() => setIsConfianceButtonHovered(true)}
                        onMouseLeave={() => setIsConfianceButtonHovered(false)}
                      >
                        <button
                          className="px-6 py-3 sm:px-8 sm:py-4 bg-sable-50 text-black font-medium rounded-lg hover:bg-sable-100 transition-colors duration-300"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          Découvrir notre approche
                        </button>
                      </Link>
                    </div>
                  </div>
                  {/* Caption en bas - centré */}
                  <div className="-mt-2 sm:-mt-3 p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Yman Lahlou
                    </p>
                    <p className="text-sm sm:text-base text-white/70 font-light" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Fondatrice de l'Agence YL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton mobile — centré en bas de la section */}
            <div className="flex sm:hidden justify-center mt-8">
              <Link
                href="/notre-methode"
                className="group/cta relative inline-flex items-center border border-white/60 px-6 py-3 rounded-lg transition-all duration-300 hover:border-white"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                }}
              >
                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                  Découvrir notre approche
                </span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Présentation de l'agence */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 relative z-10" aria-labelledby="presentation-agence">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12">
              {/* Image à gauche */}
              <div 
                ref={agenceImageRef}
                className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-lg group"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <Image
                  src="/images/chateau_saint_germain_en_laye.webp"
                  alt="Château de Saint-Germain-en-Laye - L'Agence YL, agence immobilière à Saint-Germain-en-Laye"
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isImageHovered ? 'scale-105' : ''
                  } ${
                    isAgenceButtonHovered ? 'blur-md' : ''
                  }`}
                  loading="lazy"
                />
                {/* Overlay avec bouton CTA au survol */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-500 ${
                  isImageHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Link
                    href="/a-propos"
                    className={`transform transition-all duration-500 ${
                      isImageHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    onMouseEnter={() => setIsAgenceButtonHovered(true)}
                    onMouseLeave={() => setIsAgenceButtonHovered(false)}
                  >
                    <button
                      className="px-6 py-3 sm:px-8 sm:py-4 bg-sable-50 text-black font-medium rounded-lg hover:bg-sable-100 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      Découvrir l'agence
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Texte à droite */}
              <div className="space-y-4 sm:space-y-6 text-center">
                <h3 id="presentation-agence" className="sr-only">Présentation de l'agence immobilière à Saint-Germain-en-Laye</h3>
                <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-2 mb-4 sm:mb-6 uppercase" style={{ color: '#ffffff', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  L'expertise au cœur de Saint-Germain-en-Laye.
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl px-2" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Parce que le marché de l'hyper-centre ne ressemble pas à celui de Pereire ou de l'Ermitage, l'Agence YL déploie une connaissance granulaire de chaque quartier.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl px-2" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous ne nous contentons pas de vendre des surfaces ; nous valorisons des emplacements historiques et des cadres de vie uniques. Notre priorité : transformer votre patrimoine en une transaction sereine, certifiée et sans surprise.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section CTA Final */}
      <section className="relative z-10 py-32 md:py-44 flex items-center justify-center bg-black" aria-labelledby="cta-final">
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
              <h2 id="cta-final" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Sécurisez votre patrimoine dès aujourd'hui.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-10 sm:mb-14 uppercase max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Que vous soyez prêt à vendre ou simplement en phase de réflexion, échangez avec une experte qui connaît la réalité de votre quartier.
              </p>
            </FadeContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                ref={estimationButtonRef as any}
                href="/estimation#grille-tarifaire"
                aria-label="DEMANDER MON ESTIMATION"
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                }}
              >
                DEMANDER MON ESTIMATION
              </a>
              <a
                ref={contactButtonRef as any}
                href="/analyse"
                aria-label="Prendre un simple rendez-vous conseil"
                className="inline-flex items-center justify-center bg-black/80 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 hover:bg-black hover:border-white/60 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                }}
              >
                RDV DE CONSEIL
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-6" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/70 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            2026 — L'AGENCE YL
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/mentions-legales" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Politique de confidentialité
            </Link>
            <Link href="/honoraires" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Honoraires
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
