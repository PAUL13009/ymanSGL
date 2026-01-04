'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function LocationPage() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

  return (
    <main ref={mainRef} className="min-h-screen">
      <Navbar />
      <Hero 
        title="Location immobilière à Marseille, sans gestion locative"
        subtitle="Mise en location, sélection du locataire ou accompagnement à la recherche, dans un cadre clair et structuré."
        buttonText="Découvrir nos services de location"
        buttonLink="#contact"
      />
      
      {/* Section À qui s'adresse ce service */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              À QUI S&apos;ADRESSE CE SERVICE ?
            </h2>
          </div>

          {/* Objectif */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
            <h3 className="text-xl md:text-2xl font-light tracking-wide mb-4" style={{ color: '#4682B4' }}>
              🎯 Objectif
            </h3>
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
              Éviter les mauvaises demandes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Colonne gauche - Ce service s'adresse */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
                Ce service s&apos;adresse :
              </h3>
              <ul className="space-y-4 w-full">
                <li className="text-gray-700 leading-relaxed font-light">
                  Aux propriétaires souhaitant louer leur bien sans déléguer la gestion
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Aux locataires avec un dossier solide et un projet clair
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Aux biens situés à Marseille et ses environs
                </li>
              </ul>
            </div>

            {/* Colonne droite - Ce service ne comprend pas */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
                Ce service ne comprend pas :
              </h3>
              <ul className="space-y-4 w-full">
                <li className="text-gray-700 leading-relaxed font-light">
                  La gestion locative
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Le suivi des loyers
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  La gestion administrative après la mise en location
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

