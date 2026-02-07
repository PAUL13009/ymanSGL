'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPropertyById } from '@/lib/firebase-properties'
import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'

interface Property {
  id: string
  title: string
  price: string
  location: string
  status?: string
  description?: string
  rooms?: string
  bathrooms?: string
  surface_habitable?: string
  surface_totale?: string
  parking?: boolean
  terrasse?: boolean
  piscine?: boolean
  ascenseur?: boolean
  cave?: boolean
  jardin?: boolean
  balcon?: boolean
  garage?: boolean
  climatisation?: boolean
  interphone?: boolean
  local_velo?: boolean
  internet?: boolean
  digicode?: boolean
  fibre_optique?: boolean
  gardien?: boolean
  autres_prestations?: string | null
  consommation_energetique?: string
  emissions_ges?: string
  images: Array<{ src: string; alt: string }>
  created_at?: Date | Timestamp | string
}

export default function PropertyDetail() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'prestations'>('description')

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string)
    }
  }, [params.id])

  // Données d'exemple pour les biens de démonstration
  const exampleProperties: Record<string, Property> = {
    'exemple-1': {
      id: 'exemple-1',
      title: 'Appartement moderne',
      price: '450000',
      location: 'Saint-Germain-en-Laye',
      status: 'À vendre',
      description: 'Magnifique appartement moderne situé dans un quartier résidentiel calme de Saint-Germain-en-Laye. Cet appartement de 85 m² dispose de 3 chambres, 2 salles de bain et bénéficie d\'une exposition optimale. Entièrement rénové, il allie confort moderne et charme authentique. Proche des commerces, des écoles et des transports en commun.',
      rooms: '3',
      bathrooms: '2',
      surface_habitable: '85',
      surface_totale: '95',
      parking: true,
      terrasse: true,
      piscine: false,
      ascenseur: true,
      cave: true,
      jardin: false,
      balcon: true,
      garage: false,
      climatisation: true,
      interphone: true,
      local_velo: false,
      internet: true,
      digicode: true,
      fibre_optique: true,
      gardien: true,
      autres_prestations: null,
      consommation_energetique: 'C',
      emissions_ges: 'B',
      images: [
        { src: '/images/DSC04823.jpg', alt: 'Appartement moderne à Saint-Germain-en-Laye - Vue extérieure' },
        { src: '/images/DSC02414.jpg', alt: 'Appartement moderne à Saint-Germain-en-Laye - Séjour' },
        { src: '/images/DSC02823.jpg', alt: 'Appartement moderne à Saint-Germain-en-Laye - Chambre' },
        { src: '/images/DSC02417.jpg', alt: 'Appartement moderne à Saint-Germain-en-Laye - Cuisine' },
        { src: '/images/DSC02494.jpg', alt: 'Appartement moderne à Saint-Germain-en-Laye - Salle de bain' }
      ]
    },
    'exemple-2': {
      id: 'exemple-2',
      title: 'Maison avec terrasse',
      price: '680000',
      location: 'Saint-Germain-en-Laye',
      status: 'À vendre',
      description: 'Charmante maison familiale de 120 m² avec une magnifique terrasse et un jardin privé. Cette propriété dispose de 4 chambres, 2 salles de bain et offre de beaux volumes. Idéale pour une famille, elle se situe dans un quartier résidentiel prisé de Saint-Germain-en-Laye, à proximité des commodités et des espaces verts.',
      rooms: '4',
      bathrooms: '2',
      surface_habitable: '120',
      surface_totale: '150',
      parking: true,
      terrasse: true,
      piscine: false,
      ascenseur: false,
      cave: true,
      jardin: true,
      balcon: false,
      garage: true,
      climatisation: false,
      interphone: false,
      local_velo: false,
      internet: true,
      digicode: false,
      fibre_optique: true,
      gardien: false,
      autres_prestations: 'Chauffage au gaz',
      consommation_energetique: 'D',
      emissions_ges: 'C',
      images: [
        { src: '/images/terrasse.jpg', alt: 'Maison avec terrasse à Saint-Germain-en-Laye - Vue extérieure' },
        { src: '/images/DSC04844.jpg', alt: 'Maison avec terrasse à Saint-Germain-en-Laye - Intérieur' },
        { src: '/images/DSC04848.jpg', alt: 'Maison avec terrasse à Saint-Germain-en-Laye - Jardin' },
        { src: '/images/DSC02758.jpg', alt: 'Maison avec terrasse à Saint-Germain-en-Laye - Terrasse' },
        { src: '/images/loft.jpg', alt: 'Maison avec terrasse à Saint-Germain-en-Laye - Espace de vie' }
      ]
    },
    'exemple-3': {
      id: 'exemple-3',
      title: 'Villa de standing',
      price: '950000',
      location: 'Saint-Germain-en-Laye',
      status: 'À vendre',
      description: 'Prestigieuse villa contemporaine de 180 m² avec piscine et jardin paysager. Cette propriété d\'exception dispose de 5 chambres, 3 salles de bain et offre un standing remarquable. Architecture moderne, matériaux de qualité et finitions soignées. Située dans un secteur calme et résidentiel de Saint-Germain-en-Laye, cette villa représente une opportunité rare.',
      rooms: '5',
      bathrooms: '3',
      surface_habitable: '180',
      surface_totale: '250',
      parking: true,
      terrasse: true,
      piscine: true,
      ascenseur: false,
      cave: true,
      jardin: true,
      balcon: true,
      garage: true,
      climatisation: true,
      interphone: true,
      local_velo: true,
      internet: true,
      digicode: true,
      fibre_optique: true,
      gardien: true,
      autres_prestations: 'Domotique, alarme, portail électrique',
      consommation_energetique: 'B',
      emissions_ges: 'A',
      images: [
        { src: '/images/DSC04839.JPG', alt: 'Villa de standing à Saint-Germain-en-Laye - Vue principale' },
        { src: '/images/DSC04868.jpg', alt: 'Villa de standing à Saint-Germain-en-Laye - Piscine' },
        { src: '/images/DSC04893.jpg', alt: 'Villa de standing à Saint-Germain-en-Laye - Salon' },
        { src: '/images/modern.webp', alt: 'Villa de standing à Saint-Germain-en-Laye - Architecture moderne' },
        { src: '/images/chateau_saint_germain_en_laye.webp', alt: 'Villa de standing à Saint-Germain-en-Laye - Vue sur le château' }
      ]
    }
  }

  const fetchProperty = async (id: string) => {
    try {
      // Vérifier d'abord si c'est un bien d'exemple
      if (exampleProperties[id]) {
        setProperty(exampleProperties[id])
        setLoading(false)
        return
      }

      // Sinon, récupérer depuis Firebase
      const data = await getPropertyById(id)
      if (!data) {
        router.push('/')
        return
      }
      setProperty(data)
    } catch (error: any) {
      console.error('Error fetching property:', error.message)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const goToPrevious = () => {
    if (!property || !property.images) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    if (!property || !property.images) return
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Fonction pour formater le prix avec espace au millième et euro à la fin
  const formatPrice = (price: string): string => {
    // Extraire les chiffres du prix
    const numericPrice = price.replace(/[^\d]/g, '')
    if (!numericPrice) return price
    
    // Formater avec espace au millième
    const formattedPrice = parseInt(numericPrice).toLocaleString('fr-FR')
    
    // Ajouter l'euro à la fin
    return `${formattedPrice} €`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" style={{ borderColor: '#4682B4' }}></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Annonce introuvable</p>
          <Link href="/" className="text-blue-600 hover:underline" style={{ color: '#4682B4' }}>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const prestations = [
    { key: 'parking', label: 'Parking' },
    { key: 'terrasse', label: 'Terrasse' },
    { key: 'piscine', label: 'Piscine' },
    { key: 'ascenseur', label: 'Ascenseur' },
    { key: 'cave', label: 'Cave' },
    { key: 'jardin', label: 'Jardin' },
    { key: 'balcon', label: 'Balcon' },
    { key: 'garage', label: 'Garage' },
    { key: 'climatisation', label: 'Climatisation' },
    { key: 'interphone', label: 'Interphone' },
    { key: 'local_velo', label: 'Local vélo' },
    { key: 'internet', label: 'Internet' },
    { key: 'digicode', label: 'Digicode' },
    { key: 'fibre_optique', label: 'Fibre optique' },
    { key: 'gardien', label: 'Gardien' },
  ]

  const prestationsActives = prestations.filter(p => property[p.key as keyof Property] === true)

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link 
            href="/catalogue"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Retour au catalogue</span>
          </Link>
        </div>

        {/* Titre et prix */}
        <div className="mb-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              {property.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{property.location}</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              {property.status && (
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  property.status === 'À vendre' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {property.status}
                </span>
              )}
              <p className="text-3xl font-bold" style={{ color: '#4682B4' }}>
                {formatPrice(property.price)}
              </p>
            </div>
          </div>
        </div>

        {/* Layout principal : Carrousel à gauche, Onglets à droite */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne de gauche : Carrousel de photos + Carte de contact */}
          <div className="space-y-8">
            {/* Carrousel de photos */}
            {property.images && property.images.length > 0 && (
              <div className="space-y-4">
                {/* Grande photo principale */}
                <div className="relative rounded-lg overflow-hidden bg-gray-200" style={{ height: '500px' }}>
                  <Image
                    src={property.images[currentImageIndex]?.src || property.images[0].src}
                    alt={property.images[currentImageIndex]?.alt || property.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Grille de miniatures */}
                {property.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                          index === currentImageIndex
                            ? 'ring-2 ring-blue-500 ring-offset-2'
                            : 'opacity-75 hover:opacity-100'
                        }`}
                        aria-label={`Voir l'image ${index + 1}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `${property.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Carte de contact sous les photos - Desktop uniquement */}
            <div className="hidden lg:block bg-gray-900 rounded-lg p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Intéressé par ce bien ?
              </h2>
              <p className="text-lg md:text-xl mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Contactez l'Agence YL et programmez une visite !
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+33661736438" className="text-lg hover:text-blue-400 transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    +33 6 61 73 64 38
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:lagenceyl@gmail.com" className="text-lg hover:text-blue-400 transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    lagenceyl@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets Description et Prestations à droite */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* En-tête des onglets */}
            <div className="border-b border-gray-200 flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('prestations')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === 'prestations'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Prestations
              </button>
            </div>

            {/* Contenu des onglets */}
            <div className="p-6">
              {/* Onglet Description */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  {property.description && (
                    <div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {property.description}
                      </p>
                    </div>
                  )}

                  {/* Caractéristiques principales */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="mb-6">
                      <div className="w-16 h-1 bg-black mb-4" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
                      <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Caractéristiques principales
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {property.rooms && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Chambres</p>
                          <p className="text-lg font-semibold">{property.rooms}</p>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Salles de bain</p>
                          <p className="text-lg font-semibold">{property.bathrooms}</p>
                        </div>
                      )}
                      {property.surface_habitable && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Surface habitable</p>
                          <p className="text-lg font-semibold">{property.surface_habitable} m²</p>
                        </div>
                      )}
                      {property.surface_totale && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Surface totale</p>
                          <p className="text-lg font-semibold">{property.surface_totale} m²</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DPE */}
                  {(property.consommation_energetique && property.consommation_energetique !== 'Non renseigné') || (property.emissions_ges && property.emissions_ges !== 'Non renseigné') ? (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="mb-6">
                        <div className="w-16 h-1 bg-black mb-4" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
                        <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Diagnostic de Performance Énergétique (DPE)
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {property.consommation_energetique && property.consommation_energetique !== 'Non renseigné' && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Consommation énergétique</p>
                            <p className="text-lg font-semibold">{property.consommation_energetique}</p>
                          </div>
                        )}
                        {property.emissions_ges && property.emissions_ges !== 'Non renseigné' && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Émissions de GES</p>
                            <p className="text-lg font-semibold">{property.emissions_ges}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Onglet Prestations */}
              {activeTab === 'prestations' && (
                <div>
                  {prestationsActives.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {prestationsActives.map((prestation) => (
                        <span key={prestation.key} className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {prestation.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Aucune prestation renseignée.
                    </p>
                  )}
                  {property.autres_prestations && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Autres prestations</p>
                      <p className="text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{property.autres_prestations}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Carte de contact en bas - Mobile uniquement */}
        <div className="lg:hidden mt-8">
          <div className="bg-gray-900 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Intéressé par ce bien ?
            </h2>
            <p className="text-lg mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Contactez l'Agence YL et programmez une visite !
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+33661736438" className="text-lg hover:text-blue-400 transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  +33 6 61 73 64 38
                </a>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:lagenceyl@gmail.com" className="text-lg hover:text-blue-400 transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  lagenceyl@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


