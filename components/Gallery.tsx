'use client'

import { useState, useEffect } from 'react'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import PropertyCard from './PropertyCard'
import { getLimitedProperties } from '@/lib/firebase-properties'

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

// Données par défaut si aucune propriété n'est trouvée
const defaultProperties: Property[] = [
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

interface GalleryProps {
  maxProperties?: number
  titleStyle?: 'default' | 'section'
}

export default function Gallery({ maxProperties, titleStyle = 'default' }: GalleryProps = {}) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const limit = maxProperties || 6
      const data = await getLimitedProperties(limit)

      // Transformer les données pour correspondre à l'interface
      const transformedProperties: Property[] = data.map((prop) => ({
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

  const allProperties = properties.length > 0 ? properties : defaultProperties
  const displayProperties = maxProperties ? allProperties.slice(0, maxProperties) : allProperties

  // État pour gérer l'index de l'image actuelle pour chaque propriété
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string | number, number>>({})

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
    <section id="galerie" className="pt-8 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {titleStyle === 'section' ? (
              <>
                <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Quelques biens que nous avons accompagnés
                </h2>
              </>
            ) : (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Quelques biens que nous avons accompagnés"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </h2>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
                <p className="text-gray-600">Chargement des biens...</p>
              </div>
            ) : displayProperties.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                <p>Aucun bien enregistré pour le moment.</p>
                <p className="text-sm mt-2">Ajoutez des biens via le dashboard admin.</p>
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
        </div>
      </FadeContent>
    </section>
  )
}
