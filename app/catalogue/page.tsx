'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import PropertyCard from '@/components/PropertyCard'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProperties } from '@/lib/firebase-properties'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

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
  const ctaFinalButtonRef = useScrollButtonAnimation()
  
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
      const data = await getAllProperties()

      const transformedProperties: Property[] = data.map((prop) => ({
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

  return (
    <main className="min-h-screen" role="main">
      <Navbar />
      
      <Hero 
        title="Notre catalogue de biens"
        subtitle=""
        buttonText="Voir les biens"
        buttonLink="#biens"
        imagePath="/images/herosectionimage.png"
        imageAlt="Catalogue de biens immobiliers à Marseille - Vente et location immobilière"
        mobileCenter
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

      {/* Barre de filtrage */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 border-b border-white/20" aria-labelledby="filtres-catalogue">
        <FadeContent duration={500} ease="power2.out" threshold={0.1}>
          <div className="max-w-7xl mx-auto">
            <h2 id="filtres-catalogue" className="sr-only">Filtres de recherche de biens immobiliers</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" role="list">
                {/* Statut */}
                <div role="listitem">
                  <label htmlFor="filter-type" className="block text-sm font-medium text-white/80 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Type
                  </label>
                  <select
                    id="filter-type"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    aria-label="Filtrer par type de bien"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/10 backdrop-blur-sm text-white"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <option value="">Tous</option>
                    <option value="À vendre">À vendre</option>
                    <option value="À louer">À louer</option>
                  </select>
                </div>

                {/* Prix minimum */}
                <div role="listitem">
                  <label htmlFor="filter-min-price" className="block text-sm font-medium text-white/80 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Budget min (€)
                  </label>
                  <input
                    id="filter-min-price"
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="Ex: 200000"
                    aria-label="Filtrer par prix minimum en euros"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Prix maximum */}
                <div role="listitem">
                  <label htmlFor="filter-max-price" className="block text-sm font-medium text-white/80 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Budget max (€)
                  </label>
                  <input
                    id="filter-max-price"
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="Ex: 500000"
                    aria-label="Filtrer par prix maximum en euros"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Surface minimum */}
                <div role="listitem">
                  <label htmlFor="filter-min-surface" className="block text-sm font-medium text-white/80 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Surface min (m²)
                  </label>
                  <input
                    id="filter-min-surface"
                    type="number"
                    value={filters.minSurface}
                    onChange={(e) => handleFilterChange('minSurface', e.target.value)}
                    placeholder="Ex: 50"
                    aria-label="Filtrer par surface minimum en mètres carrés"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Nombre de pièces */}
                <div role="listitem">
                  <label htmlFor="filter-min-rooms" className="block text-sm font-medium text-white/80 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Pièces min
                  </label>
                  <input
                    id="filter-min-rooms"
                    type="number"
                    value={filters.minRooms}
                    onChange={(e) => handleFilterChange('minRooms', e.target.value)}
                    placeholder="Ex: 2"
                    aria-label="Filtrer par nombre minimum de pièces"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  />
                </div>

                {/* Localisation */}
                <div role="listitem">
                  <label htmlFor="filter-location" className="block text-sm font-medium text-white/80 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Quartier
                  </label>
                  <input
                    id="filter-location"
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Ex: Marseille 13008"
                    aria-label="Filtrer par quartier ou arrondissement"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
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
                    className="px-6 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
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
      <section id="biens" className="relative px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="resultats-catalogue">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <h2 id="resultats-catalogue" className="sr-only">Résultats de recherche de biens immobiliers à Marseille</h2>
            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="status" aria-live="polite">
                {filteredProperties.length} {filteredProperties.length > 1 ? 'biens trouvés' : 'bien trouvé'}
                {hasActiveFilters && ` (sur ${properties.length} au total)`}
              </p>
            </div>

            {/* Cartes de biens dynamiques */}
            <div>
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white/70" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Chargement des biens...</p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-white/70 text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {hasActiveFilters ? 'Aucun bien ne correspond à vos critères.' : 'Aucun bien disponible pour le moment.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {filteredProperties.map((bien) => {
                    const mainImage = bien.images && bien.images.length > 0 ? bien.images[0] : null
                    return (
                      <Link
                        key={bien.id}
                        href={`/properties/${bien.id}`}
                        className="group relative block rounded-lg overflow-hidden aspect-square"
                      >
                        {mainImage ? (
                          <div className="absolute inset-0">
                            <Image
                              src={mainImage.src}
                              alt={mainImage.alt || bien.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                            <p className="text-white/50" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>Aucune image</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                          <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                              L&apos;AGENCE YL
                            </p>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                              {bien.title}
                            </h3>
                            <p className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                              {bien.location}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                          <span
                            className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white font-semibold transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                            style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}
                          >
                            Voir les détails
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Message de qualification */}
      {!loading && filteredProperties.length > 0 && (
        <section className="relative px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="qualification-catalogue">
          <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="qualification-catalogue" className="sr-only">Qualité de la sélection des biens immobiliers</h2>
              <p className="text-lg text-white/70 italic" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Chaque bien présenté ici fait l'objet d'une analyse préalable et s'inscrit dans une stratégie cohérente avec le marché local.
              </p>
            </div>
          </FadeContent>
        </section>
      )}
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
              Frais d&apos;Agence
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
