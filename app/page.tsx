'use client'

import { useRef, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import Features from '@/components/Features'
import PropertyCard from '@/components/PropertyCard'
import FadeContent from '@/components/FadeContent'
import VariableProximity from '@/components/VariableProximity'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
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
    id: 1,
    images: [
      { src: '/images/DSC04823.jpg', alt: 'Appartement moderne à Marseille 13008 - Vue extérieure' },
      { src: '/images/DSC02414.jpg', alt: 'Appartement moderne à Marseille 13008 - Séjour' },
      { src: '/images/DSC02823.jpg', alt: 'Appartement moderne à Marseille 13008 - Chambre' }
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
      { src: '/images/terrasse.jpg', alt: 'Maison avec terrasse à Marseille 13009 - Vue extérieure' },
      { src: '/images/DSC04844.jpg', alt: 'Maison avec terrasse à Marseille 13009 - Intérieur' },
      { src: '/images/DSC04848.jpg', alt: 'Maison avec terrasse à Marseille 13009 - Jardin' }
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
      { src: '/images/DSC04839.JPG', alt: 'Villa de standing à Marseille 13013 - Vue principale' },
      { src: '/images/DSC04868.jpg', alt: 'Villa de standing à Marseille 13013 - Piscine' },
      { src: '/images/DSC04893.jpg', alt: 'Villa de standing à Marseille 13013 - Salon' }
    ],
    title: 'Villa de standing',
    location: 'Marseille 13013',
    price: '950 000 €',
    surface: '180',
    rooms: '5',
    bathrooms: '3',
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
  const [isConfianceImageHovered, setIsConfianceImageHovered] = useState(false)
  
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
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error

      const transformedProperties: Property[] = (data || []).map((prop: any) => ({
        id: prop.id,
        images: prop.images || [],
        title: prop.title,
        location: prop.location,
        price: prop.price,
        surface: prop.surface_habitable || prop.surface || '',
        rooms: prop.rooms || '',
        bathrooms: prop.bathrooms || '',
        type: prop.status || prop.type || 'À vendre'
      }))

      setProperties(transformedProperties)
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  const displayProperties = properties.length > 0 ? properties : defaultProperties.slice(0, 3)

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
    <main ref={mainRef} className="min-h-screen" role="main">
      <Navbar />
      <Hero 
        title="Votre agence immobilière à Marseille au service de projets clairs et maîtrisés"
        subtitle="Estimation, vente, location et accompagnement des projets immobiliers pour propriétaires exigeants, avec une approche structurée et transparente"
        buttonText="Faire estimer mon bien"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/vue7e.png"
      />
      <StatsSection />
      <Features />
      
      {/* Section Biens à la une */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 bg-white" aria-labelledby="biens-a-la-une">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="w-12 sm:w-16 h-1 bg-blue-600 mb-4 sm:mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="biens-a-la-une" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 max-w-4xl mx-auto px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Découvrez une sélection de biens actuellement proposés par l'agence"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {loading ? (
                <div className="col-span-full text-center py-8" role="status" aria-live="polite">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }} aria-hidden="true"></div>
                  <p className="text-gray-600" aria-label="Chargement des biens immobiliers en cours">Chargement des biens...</p>
                </div>
              ) : displayProperties.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>Aucun bien enregistré pour le moment.</p>
                </div>
              ) : (
                displayProperties.map((property) => {
                  const currentIndex = currentImageIndex[property.id] || 0
                  
                  return (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      currentIndex={currentIndex}
                      onPrevious={() => goToPrevious(property.id)}
                      onNext={() => goToNext(property.id)}
                      onGoToImage={(index) => goToImage(property.id, index)}
                    />
                  )
                })
              )}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                ref={catalogueButtonRef as any}
                href="/catalogue"
                aria-label="Voir tous nos biens immobiliers à Marseille"
                className="group relative inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium overflow-hidden transition-all duration-500 w-full sm:w-auto max-w-xs mx-auto"
                style={{
                  backgroundColor: 'white',
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.3px'
                }}
                data-original-color="#4682B4"
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
                  <span className="transition-transform duration-300">Voir tous nos biens</span>
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
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Confiance */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 bg-stone-50" aria-labelledby="message-fondatrice">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12">
              {/* Texte à gauche */}
              <div className="space-y-4 sm:space-y-6 order-2 md:order-1 text-center">
                <blockquote>
                  <p id="message-fondatrice" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    "Nous ne promettons pas l'impossible.
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Nous privilégions les projets cohérents, avec des propriétaires impliqués et des objectifs réalistes.
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    Chaque bien est étudié avant d'être accepté, afin de garantir une stratégie adaptée et un suivi sérieux."
                  </p>
                  <footer className="text-xs sm:text-sm md:text-base text-gray-600 mt-3 sm:mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <cite>Yman Lahlou, Directrice de l'Agence YL</cite>
                  </footer>
                </blockquote>
              </div>
              
              {/* Image à droite */}
              <div 
                ref={confianceImageRef}
                className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-lg order-1 md:order-2 bg-white"
                onMouseEnter={() => setIsConfianceImageHovered(true)}
                onMouseLeave={() => setIsConfianceImageHovered(false)}
              >
                <Image
                  src="/images/Yman.png"
                  alt="Yman Lahlou, Directrice de l'Agence YL à Marseille"
                  fill
                  className="object-contain"
                  priority
                />
                {/* CTA overlay sur l'image - Desktop */}
                <div 
                  className={`hidden md:flex absolute inset-0 items-center justify-center bg-black/40 transition-opacity duration-1000 ease-in-out ${
                    isConfianceImageHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <a
                    href="/notre-methode"
                    aria-label="Comprendre notre approche immobilière à Marseille"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isConfianceImageHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector('.underline-animation') as HTMLElement
                      if (underline) {
                        underline.style.width = '100%'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector('.underline-animation') as HTMLElement
                      if (underline) {
                        underline.style.width = '0%'
                      }
                    }}
                  >
                    Comprendre notre approche
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    ></span>
                  </a>
                </div>
                
                {/* CTA overlay sur l'image - Mobile */}
                <div 
                  className={`md:hidden absolute inset-0 flex items-end justify-center bg-black/40 transition-opacity duration-1000 ease-in-out pb-8 ${
                    isConfianceImageAnimated ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <a
                    href="/notre-methode"
                    aria-label="Comprendre notre approche immobilière à Marseille"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isConfianceImageAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                  >
                    Comprendre notre approche
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: isConfianceImageAnimated ? '100%' : '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    ></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Présentation de l'agence */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 bg-white" aria-labelledby="presentation-agence">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12">
              {/* Image à gauche */}
              <div 
                ref={agenceImageRef}
                className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-lg"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <Image
                  src="/images/marseille-calanque.jpg"
                  alt="Vue des Calanques de Marseille depuis l'agence immobilière"
                  fill
                  className="object-cover"
                  priority
                />
                {/* CTA overlay sur l'image - Desktop */}
                <div 
                  className={`hidden md:flex absolute inset-0 items-center justify-center bg-black/40 transition-opacity duration-1000 ease-in-out ${
                    isImageHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <a
                    href="/a-propos"
                    aria-label="Découvrir l'agence immobilière à Marseille"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isImageHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector('.underline-animation') as HTMLElement
                      if (underline) {
                        underline.style.width = '100%'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector('.underline-animation') as HTMLElement
                      if (underline) {
                        underline.style.width = '0%'
                      }
                    }}
                  >
                    Découvrir l'agence
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    ></span>
                  </a>
                </div>
                
                {/* CTA overlay sur l'image - Mobile */}
                <div 
                  className={`md:hidden absolute inset-0 flex items-end justify-center bg-black/40 transition-opacity duration-1000 ease-in-out pb-8 ${
                    isAgenceImageAnimated ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <a
                    href="/a-propos"
                    aria-label="Découvrir l'agence immobilière à Marseille"
                    className={`inline-block relative font-medium cursor-pointer group ${
                      isAgenceImageAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.125rem',
                      textDecoration: 'none',
                      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                    }}
                  >
                    Découvrir l'agence
                    <span
                      className="underline-animation absolute bottom-0 left-0 h-0.5 bg-white"
                      style={{
                        width: isAgenceImageAnimated ? '100%' : '0%',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    ></span>
                  </a>
                </div>
              </div>
              
              {/* Texte à droite */}
              <div className="space-y-4 sm:space-y-6 text-center">
                <h3 id="presentation-agence" className="sr-only">Présentation de l'agence immobilière à Marseille</h3>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Implantée à Marseille, l'agence accompagne des projets immobiliers avec une approche structurée, locale et orientée résultats.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic px-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Notre priorité : la clarté, la transparence et un accompagnement professionnel à chaque étape.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section CTA Final */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 bg-stone-50" aria-labelledby="cta-final">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 id="cta-final" className="sr-only">Contactez l'agence immobilière à Marseille</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-light leading-relaxed px-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Un projet immobilier mérite une vraie réflexion. Commencez par la bonne étape.
              </p>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Bouton principal */}
              <a
                ref={estimationButtonRef as any}
                href="/estimation"
                aria-label="Faire estimer mon bien immobilier à Marseille gratuitement"
                className="group relative inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium overflow-hidden transition-all duration-500 w-full sm:w-auto max-w-xs"
                style={{
                  backgroundColor: 'white',
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.3px'
                }}
                data-original-color="#4682B4"
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
                  <span className="transition-transform duration-300">Faire estimer mon bien</span>
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
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              {/* Bouton secondaire */}
              <a
                ref={contactButtonRef as any}
                href="/analyse"
                aria-label="Contacter l'agence immobilière à Marseille"
                className="group relative inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium overflow-hidden transition-all duration-500 w-full sm:w-auto max-w-xs"
                style={{
                  backgroundColor: 'white',
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.3px'
                }}
                data-original-color="#4682B4"
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
                  <span className="transition-transform duration-300">Nous contacter</span>
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
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Page d'accueil à compléter */}
      <Footer />
    </main>
  )
}
