'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import About from '@/components/About'
import LocalApproach from '@/components/LocalApproach'
import MethodBenefits from '@/components/MethodBenefits'
import OurRole from '@/components/OurRole'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()

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
            "url": "https://www.agence-yl.com",
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
            "@id": "https://www.agence-yl.com/#organization"
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
            "image": "https://www.agence-yl.com/images/Logo-removebg-preview.png",
            "@id": "https://www.agence-yl.com",
            "url": "https://www.agence-yl.com",
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
          imagePath="/images/images.jpg"
        />
        <StatsSection />
        <About />
        <LocalApproach />
        <MethodBenefits />
        <OurRole />
        <Gallery />
        <Footer />
      </main>
    </>
  )
}
