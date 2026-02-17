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

const f = { fontFamily: 'var(--font-poppins), sans-serif' }

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
      if (exampleProperties[id]) {
        setProperty(exampleProperties[id])
        setLoading(false)
        return
      }
      const data = await getPropertyById(id)
      if (!data) {
        router.push('/catalogue')
        return
      }
      setProperty(data)
    } catch (error: any) {
      console.error('Error fetching property:', error.message)
      router.push('/catalogue')
    } finally {
      setLoading(false)
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
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

  const formatPrice = (price: string): string => {
    const numericPrice = price.replace(/[^\d]/g, '')
    if (!numericPrice) return price
    const formattedPrice = parseInt(numericPrice).toLocaleString('fr-FR')
    return `${formattedPrice} €`
  }

  // ─── Loading state ─────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/60" style={f}>Chargement...</p>
          </div>
        </div>
      </main>
    )
  }

  // ─── Not found state ───────────────────────────────────
  if (!property) {
    return (
      <main className="min-h-screen bg-black">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-white/60 mb-6 text-lg" style={f}>Annonce introuvable</p>
            <Link
              href="/catalogue"
              className="inline-flex items-center border border-white/60 px-6 py-3 rounded-lg text-white hover:border-white transition-all duration-300"
              style={{ ...f, letterSpacing: '0.5px' }}
            >
              Retour au catalogue
            </Link>
          </div>
        </div>
      </main>
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
    <main className="min-h-screen bg-black">

      {/* Background image floutée */}
      <div className="relative z-10">
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
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

          {/* Bouton retour */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/catalogue')}
              className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer bg-transparent border-none"
              style={f}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium uppercase tracking-wider">Retour au catalogue</span>
            </button>
          </div>

          {/* En-tête : Titre, localisation, prix */}
          <div className="mb-10 sm:mb-14 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight uppercase text-white" style={f}>
              {property.title}
            </h1>
            <p className="text-base sm:text-lg text-white/70 mb-6 uppercase tracking-wider" style={f}>
              {property.location}
            </p>
            <div className="flex items-center justify-center gap-4">
              {property.status && (
                <span className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider border ${
                  property.status === 'À vendre'
                    ? 'border-white/40 text-white bg-white/10'
                    : 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10'
                }`} style={f}>
                  {property.status}
                </span>
              )}
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={f}>
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          {/* Layout principal : Photos + Infos */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">

            {/* ── Colonne gauche : Galerie photos ── */}
            <div className="space-y-4">
              {property.images && property.images.length > 0 && (
                <>
                  {/* Photo principale */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 aspect-[4/3]">
                    <Image
                      src={property.images[currentImageIndex]?.src || property.images[0].src}
                      alt={property.images[currentImageIndex]?.alt || property.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Flèches de navigation */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevious}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all"
                          aria-label="Image précédente"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all"
                          aria-label="Image suivante"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        {/* Compteur */}
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-xs" style={f}>
                          {currentImageIndex + 1} / {property.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Miniatures */}
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                              : 'opacity-60 hover:opacity-100'
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
                </>
              )}

              {/* Carte contact — Desktop */}
              <div className="hidden lg:block bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-8 md:p-10 text-center mt-6">
                <h2 className="text-xl md:text-2xl font-bold mb-3 uppercase tracking-wide text-white" style={f}>
                  Intéressé par ce bien ?
                </h2>
                <p className="text-base md:text-lg mb-8 text-white/70" style={f}>
                  Contactez l&apos;Agence YL et programmez une visite.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+33661736438" className="text-white/80 hover:text-white transition-colors" style={f}>
                      +33 6 61 73 64 38
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:lagenceyl@gmail.com" className="text-white/80 hover:text-white transition-colors" style={f}>
                      lagenceyl@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Colonne droite : Description / Prestations ── */}
            <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
              {/* Onglets */}
              <div className="border-b border-white/10 flex">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 uppercase tracking-wider text-sm ${
                    activeTab === 'description'
                      ? 'border-b-2 border-white text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                  style={f}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('prestations')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 uppercase tracking-wider text-sm ${
                    activeTab === 'prestations'
                      ? 'border-b-2 border-white text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                  style={f}
                >
                  Prestations
                </button>
              </div>

              {/* Contenu des onglets */}
              <div className="p-6 sm:p-8">
                {/* ── Onglet Description ── */}
                {activeTab === 'description' && (
                  <div className="space-y-8">
                    {property.description && (
                      <p className="text-white/80 leading-relaxed whitespace-pre-line text-base" style={f}>
                        {property.description}
                      </p>
                    )}

                    {/* Caractéristiques */}
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-lg sm:text-xl font-bold mb-6 uppercase tracking-wide text-white" style={f}>
                        Caractéristiques
                      </h3>
                      <div className="grid grid-cols-2 gap-5">
                        {property.rooms && (
                          <div className="bg-white/[0.04] rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider" style={f}>Chambres</p>
                            <p className="text-xl font-semibold text-white" style={f}>{property.rooms}</p>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="bg-white/[0.04] rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider" style={f}>Salles de bain</p>
                            <p className="text-xl font-semibold text-white" style={f}>{property.bathrooms}</p>
                          </div>
                        )}
                        {property.surface_habitable && (
                          <div className="bg-white/[0.04] rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider" style={f}>Surface habitable</p>
                            <p className="text-xl font-semibold text-white" style={f}>{property.surface_habitable} m²</p>
                          </div>
                        )}
                        {property.surface_totale && (
                          <div className="bg-white/[0.04] rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider" style={f}>Surface totale</p>
                            <p className="text-xl font-semibold text-white" style={f}>{property.surface_totale} m²</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DPE */}
                    {((property.consommation_energetique && property.consommation_energetique !== 'Non renseigné') || (property.emissions_ges && property.emissions_ges !== 'Non renseigné')) && (
                      <div className="pt-6 border-t border-white/10">
                        <h3 className="text-lg sm:text-xl font-bold mb-6 uppercase tracking-wide text-white" style={f}>
                          Diagnostic de Performance Énergétique
                        </h3>
                        <div className="grid grid-cols-2 gap-5">
                          {property.consommation_energetique && property.consommation_energetique !== 'Non renseigné' && (
                            <div className="bg-white/[0.04] rounded-lg p-4 border border-white/5">
                              <p className="text-xs text-white/50 mb-1 uppercase tracking-wider" style={f}>Consommation</p>
                              <p className="text-xl font-semibold text-white" style={f}>{property.consommation_energetique}</p>
                            </div>
                          )}
                          {property.emissions_ges && property.emissions_ges !== 'Non renseigné' && (
                            <div className="bg-white/[0.04] rounded-lg p-4 border border-white/5">
                              <p className="text-xs text-white/50 mb-1 uppercase tracking-wider" style={f}>Émissions GES</p>
                              <p className="text-xl font-semibold text-white" style={f}>{property.emissions_ges}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Onglet Prestations ── */}
                {activeTab === 'prestations' && (
                  <div>
                    {prestationsActives.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {prestationsActives.map((prestation) => (
                          <span
                            key={prestation.key}
                            className="inline-block rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-center text-white text-sm font-medium"
                            style={f}
                          >
                            {prestation.label}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/50" style={f}>
                        Aucune prestation renseignée.
                      </p>
                    )}
                    {property.autres_prestations && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-xs text-white/50 mb-2 uppercase tracking-wider" style={f}>Autres prestations</p>
                        <p className="text-white/80" style={f}>{property.autres_prestations}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Carte contact — Mobile */}
          <div className="lg:hidden mb-12">
            <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 uppercase tracking-wide text-white" style={f}>
                Intéressé par ce bien ?
              </h2>
              <p className="text-base mb-8 text-white/70" style={f}>
                Contactez l&apos;Agence YL et programmez une visite.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+33661736438" className="text-white/80 hover:text-white transition-colors" style={f}>
                    +33 6 61 73 64 38
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:lagenceyl@gmail.com" className="text-white/80 hover:text-white transition-colors" style={f}>
                    lagenceyl@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-6" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/70 uppercase tracking-wider mb-3" style={f}>
            2026 — L&apos;AGENCE YL
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/mentions-legales" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={f}>
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={f}>
              Politique de confidentialité
            </Link>
            <Link href="/honoraires" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={f}>
              Frais d&apos;Agence
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
