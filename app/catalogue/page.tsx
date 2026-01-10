'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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

interface Filters {
  status: string
  minPrice: string
  maxPrice: string
  minSurface: string
  minRooms: string
  location: string
}

export default function CataloguePage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string | number, number>>({})
  const estimationCtaRef = useRef<HTMLAnchorElement>(null)
  const approcheCtaRef = useRef<HTMLAnchorElement>(null)
  const observersRef = useRef<IntersectionObserver[]>([])
  
  const [filters, setFilters] = useState<Filters>({
    status: '',
    minPrice: '',
    maxPrice: '',
    minSurface: '',
    minRooms: '',
    location: ''
  })

  // Récupérer tous les biens au chargement
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
        type: prop.status || prop.type || 'À vendre',
        status: prop.status || prop.type || 'À vendre'
      }))

      setProperties(transformedProperties)
    } catch (error: any) {
      console.error('Error fetching properties:', error.message)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  // Initialiser les index d'images
  useEffect(() => {
    if (properties.length > 0) {
      const initialIndex: Record<string | number, number> = {}
      properties.forEach(prop => {
        initialIndex[prop.id] = 0
      })
      setCurrentImageIndex(initialIndex)
    }
  }, [properties])

  // Fonction pour extraire le prix numérique d'une chaîne
  const extractPrice = (priceStr: string): number => {
    const numbers = priceStr.replace(/[^\d]/g, '')
    return numbers ? parseInt(numbers) : 0
  }

  // Filtrer les biens en temps réel
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Filtre par statut
      if (filters.status && property.status !== filters.status) {
        return false
      }

      // Filtre par prix
      const propertyPrice = extractPrice(property.price)
      if (filters.minPrice && propertyPrice < parseInt(filters.minPrice)) {
        return false
      }
      if (filters.maxPrice && propertyPrice > parseInt(filters.maxPrice)) {
        return false
      }

      // Filtre par surface
      if (filters.minSurface) {
        const propertySurface = parseInt(property.surface) || 0
        if (propertySurface < parseInt(filters.minSurface)) {
          return false
        }
      }

      // Filtre par nombre de pièces
      if (filters.minRooms) {
        const propertyRooms = parseInt(property.rooms) || 0
        if (propertyRooms < parseInt(filters.minRooms)) {
          return false
        }
      }

      // Filtre par localisation (recherche partielle)
      if (filters.location) {
        const searchLocation = filters.location.toLowerCase()
        const propertyLocation = property.location.toLowerCase()
        if (!propertyLocation.includes(searchLocation)) {
          return false
        }
      }

      return true
    })
  }, [properties, filters])

  // Mettre à jour les index d'images pour les biens filtrés
  useEffect(() => {
    if (filteredProperties.length > 0) {
      setCurrentImageIndex(prev => {
        const newIndex: Record<string | number, number> = { ...prev }
        filteredProperties.forEach(prop => {
          if (!(prop.id in newIndex)) {
            newIndex[prop.id] = 0
          }
        })
        return newIndex
      })
    }
  }, [filteredProperties])

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: '',
      minPrice: '',
      maxPrice: '',
      minSurface: '',
      minRooms: '',
      location: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  const goToPrevious = (propertyId: string | number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[propertyId] || 0
      const property = filteredProperties.find(p => p.id === propertyId)
      if (!property) return prev
      const newIndex = currentIndex === 0 ? property.images.length - 1 : currentIndex - 1
      return { ...prev, [propertyId]: newIndex }
    })
  }

  const goToNext = (propertyId: string | number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[propertyId] || 0
      const property = filteredProperties.find(p => p.id === propertyId)
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

  // Extraire les localisations uniques pour le filtre
  const uniqueLocations = useMemo(() => {
    const locations = properties.map(p => p.location).filter(Boolean)
    return Array.from(new Set(locations)).sort()
  }, [properties])

  // Hook pour l'animation au scroll sur mobile uniquement pour les boutons CTA
  useEffect(() => {
    // Attendre que les boutons soient rendus (quand !loading)
    if (loading) return

    const isMobile = () => window.innerWidth < 768
    if (!isMobile()) return

    // Nettoyer les anciens observers
    observersRef.current.forEach(observer => observer.disconnect())
    observersRef.current = []

    const triggerAnimation = (button: HTMLElement) => {
      const fill = button.querySelector('.button-fill') as HTMLElement
      const arrow = button.querySelector('.button-arrow') as HTMLElement
      const text = button.querySelector('.button-text') as HTMLElement
      const textSpan = button.querySelector('.button-text span') as HTMLElement

      if (fill) {
        fill.style.width = '100%'
        fill.style.transform = 'translateX(-50%) scaleY(1)'
      }
      if (arrow) {
        arrow.style.opacity = '1'
        arrow.style.right = '-14px'
      }
      if (text) {
        text.style.color = 'white'
      }
      if (textSpan) {
        textSpan.style.transform = 'translateX(-8px)'
      }
    }

    const resetAnimation = (button: HTMLElement) => {
      const fill = button.querySelector('.button-fill') as HTMLElement
      const arrow = button.querySelector('.button-arrow') as HTMLElement
      const text = button.querySelector('.button-text') as HTMLElement
      const textSpan = button.querySelector('.button-text span') as HTMLElement

      if (fill) {
        fill.style.width = '0%'
        fill.style.transform = 'translateX(-50%) scaleY(0)'
      }
      if (arrow) {
        arrow.style.opacity = '0'
        arrow.style.right = '-30px'
      }
      if (text) {
        text.style.color = '#4682B4'
      }
      if (textSpan) {
        textSpan.style.transform = 'translateX(0)'
      }
    }

    const setupObservers = (buttons: HTMLElement[]) => {
      observersRef.current = buttons.map((button) => {
        let isAnimated = false
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (isMobile()) {
                if (entry.isIntersecting && !isAnimated) {
                  // Déclencher l'animation dès que le bouton est visible
                  triggerAnimation(button)
                  isAnimated = true
                } else if (!entry.isIntersecting && isAnimated) {
                  // Réinitialiser uniquement quand le bouton sort complètement du viewport
                  resetAnimation(button)
                  isAnimated = false
                }
              }
            })
          },
          {
            threshold: 0.01, // Déclencher dès que 1% du bouton est visible
            rootMargin: '50px 0px' // Déclencher 50px avant que le bouton entre dans le viewport
          }
        )

        observer.observe(button)
        return observer
      })
    }

    // Utiliser setTimeout pour s'assurer que les boutons sont dans le DOM
    const timer = setTimeout(() => {
      const buttons = [estimationCtaRef.current, approcheCtaRef.current].filter(Boolean) as HTMLElement[]
      if (buttons.length === 0) {
        // Si les boutons ne sont pas encore disponibles, réessayer
        return
      }

      // Vérifier que les boutons ont bien les éléments nécessaires
      const hasRequiredElements = buttons.every(button => {
        const fill = button.querySelector('.button-fill')
        const arrow = button.querySelector('.button-arrow')
        const text = button.querySelector('.button-text')
        return fill && arrow && text
      })

      if (!hasRequiredElements) {
        // Si les éléments ne sont pas encore rendus, réessayer après un délai
        setTimeout(() => {
          const retryButtons = [estimationCtaRef.current, approcheCtaRef.current].filter(Boolean) as HTMLElement[]
          if (retryButtons.length > 0) {
            setupObservers(retryButtons)
          }
        }, 200)
        return
      }

      setupObservers(buttons)
    }, 300) // Délai augmenté pour s'assurer que les boutons sont rendus

    return () => {
      clearTimeout(timer)
      observersRef.current.forEach(observer => observer.disconnect())
      observersRef.current = []
    }
  }, [loading])

  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="Notre catalogue de biens"
        subtitle="Une sélection de biens actuellement proposés par l'agence, étudiés et accompagnés selon notre approche."
        buttonText="Voir les biens"
        buttonLink="#biens"
        imagePath="/images/vue7e.png"
        imageAlt="Catalogue de biens immobiliers à Marseille - Vente et location immobilière"
      />

      {/* Barre de filtrage */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-stone-50 border-b border-gray-200" aria-labelledby="filtres-catalogue">
        <FadeContent duration={500} ease="power2.out" threshold={0.1}>
          <div className="max-w-7xl mx-auto">
            <h2 id="filtres-catalogue" className="sr-only">Filtres de recherche de biens immobiliers</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" role="list">
                {/* Statut */}
                <div role="listitem">
                  <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Type
                  </label>
                  <select
                    id="filter-type"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    aria-label="Filtrer par type de bien"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <option value="">Tous</option>
                    <option value="À vendre">À vendre</option>
                    <option value="À louer">À louer</option>
                  </select>
                </div>

                {/* Prix minimum */}
                <div role="listitem">
                  <label htmlFor="filter-min-price" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Budget min (€)
                  </label>
                  <input
                    id="filter-min-price"
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="Ex: 200000"
                    aria-label="Filtrer par prix minimum en euros"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Prix maximum */}
                <div role="listitem">
                  <label htmlFor="filter-max-price" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Budget max (€)
                  </label>
                  <input
                    id="filter-max-price"
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="Ex: 500000"
                    aria-label="Filtrer par prix maximum en euros"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Surface minimum */}
                <div role="listitem">
                  <label htmlFor="filter-min-surface" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Surface min (m²)
                  </label>
                  <input
                    id="filter-min-surface"
                    type="number"
                    value={filters.minSurface}
                    onChange={(e) => handleFilterChange('minSurface', e.target.value)}
                    placeholder="Ex: 50"
                    aria-label="Filtrer par surface minimum en mètres carrés"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Nombre de pièces */}
                <div role="listitem">
                  <label htmlFor="filter-min-rooms" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Pièces min
                  </label>
                  <input
                    id="filter-min-rooms"
                    type="number"
                    value={filters.minRooms}
                    onChange={(e) => handleFilterChange('minRooms', e.target.value)}
                    placeholder="Ex: 2"
                    aria-label="Filtrer par nombre minimum de pièces"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Localisation */}
                <div role="listitem">
                  <label htmlFor="filter-location" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Quartier
                  </label>
                  <input
                    id="filter-location"
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Ex: Marseille 13008"
                    aria-label="Filtrer par quartier ou arrondissement"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    list="locations-list"
                  />
                  <datalist id="locations-list">
                    {uniqueLocations.map((loc, idx) => (
                      <option key={idx} value={loc} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Bouton réinitialiser */}
              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    aria-label="Réinitialiser tous les filtres de recherche"
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Résultats */}
      <section id="biens" className="px-4 sm:px-6 lg:px-8 py-12 bg-white" aria-labelledby="resultats-catalogue">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <h2 id="resultats-catalogue" className="sr-only">Résultats de recherche de biens immobiliers à Marseille</h2>
            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="status" aria-live="polite">
                {filteredProperties.length} {filteredProperties.length > 1 ? 'biens trouvés' : 'bien trouvé'}
                {hasActiveFilters && ` (sur ${properties.length} au total)`}
              </p>
            </div>

            {/* Grille de biens */}
            {loading ? (
              <div className="col-span-full text-center py-16" role="status" aria-live="polite" aria-busy="true">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Chargement des biens...
                </p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-16" role="status" aria-live="polite">
                <p className="text-lg text-gray-700 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Aucun bien ne correspond aux critères sélectionnés.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    aria-label="Réinitialiser tous les filtres pour afficher tous les biens immobiliers"
                    className="px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
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
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Liste des biens immobiliers à Marseille">
                {filteredProperties.map((property) => {
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
                })}
              </div>
            )}
          </div>
        </FadeContent>
      </section>

      {/* Message de qualification */}
      {!loading && filteredProperties.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-stone-50" aria-labelledby="qualification-catalogue">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="qualification-catalogue" className="sr-only">Qualité de la sélection des biens immobiliers</h2>
              <p className="text-lg text-gray-700 italic" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Chaque bien présenté ici fait l'objet d'une analyse préalable et s'inscrit dans une stratégie cohérente avec le marché local.
              </p>
            </div>
          </FadeContent>
        </section>
      )}

      {/* CTA stratégiques */}
      {!loading && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white" aria-labelledby="cta-strategiques-catalogue">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-4xl mx-auto">
              <h2 id="cta-strategiques-catalogue" className="sr-only">Actions complémentaires pour votre projet immobilier</h2>
              <div className="grid md:grid-cols-2 gap-8" role="list">
                {/* CTA Estimation */}
                <article className="bg-stone-50 rounded-lg p-8 text-center" role="listitem" aria-labelledby="cta-estimation-catalogue">
                  <h3 id="cta-estimation-catalogue" className="text-xl font-semibold mb-4 text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    Vous ne trouvez pas le bien correspondant à votre recherche ?
                  </h3>
                  <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Faites estimer votre bien pour connaître sa valeur réelle sur le marché.
                  </p>
                  <Link
                    ref={estimationCtaRef}
                    href="/estimation"
                    aria-label="Faire estimer mon bien immobilier gratuitement à Marseille"
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
                      if (window.innerWidth >= 768) {
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
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth >= 768) {
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
                      }
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
                  </Link>
                </article>

                {/* CTA Approche */}
                <article className="bg-stone-50 rounded-lg p-8 text-center" role="listitem" aria-labelledby="cta-approche-catalogue">
                  <h3 id="cta-approche-catalogue" className="text-xl font-semibold mb-4 text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    Vous avez un projet immobilier à Marseille ?
                  </h3>
                  <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Découvrez notre approche structurée et transparente.
                  </p>
                  <Link
                    ref={approcheCtaRef}
                    href="/notre-methode"
                    aria-label="Découvrir notre approche immobilière structurée et transparente à Marseille"
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
                      if (window.innerWidth >= 768) {
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
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth >= 768) {
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
                      }
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
                      <span className="transition-transform duration-300">Découvrir notre approche</span>
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
                  </Link>
                </article>
              </div>
            </div>
          </FadeContent>
        </section>
      )}

      <Footer />
    </main>
  )
}
