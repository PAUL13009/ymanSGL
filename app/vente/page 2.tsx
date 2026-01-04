'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function VentePage() {
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
        title="Vente immobilière Marseille : ne pas faire de votre vente un pari"
        subtitle="Vente immobilière Marseille avec méthode structurée et exigeante. Vendre un bien immobilier à Marseille au bon prix, dans des délais cohérents. Analyse du marché réel marseillais, stratégie claire, suivi personnalisé."
        buttonText="Découvrir notre méthode de vente"
        buttonLink="#contact"
      />
      
      {/* Texte d'introduction SEO */}
      <div className="sr-only">
        <p>
          L&apos;Agence Y L accompagne votre vente immobilière à Marseille avec une méthode structurée et exigeante. 
          Vendre un appartement ou une maison à Marseille nécessite une analyse du marché réel et une stratégie claire. 
          Notre agence immobilière vente Marseille privilégie la qualité à la quantité pour maximiser vos chances de vendre au bon prix.
        </p>
      </div>
      
      {/* Section Eligibilité */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              Cette vente immobilière Marseille est faite pour vous si…
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Colonne gauche - Oui si */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
                ✔️ Oui si :
              </h3>
              <ul className="space-y-4 w-full">
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous avez un projet réel de vente à Marseille
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous cherchez un prix cohérent avec le marché marseillais, pas une illusion
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous acceptez une stratégie de vente claire et assumée pour votre bien immobilier
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous voulez éviter une mise en vente ratée qui pénalise votre projet
                </li>
              </ul>
            </div>

            {/* Colonne droite - Non si */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
                ❌ Non si :
              </h3>
              <ul className="space-y-4 w-full">
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous voulez &quot;tester le marché&quot; sans engagement réel de vente
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous comparez les agences immobilières vente Marseille uniquement au prix annoncé
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous refusez toute remise en question du prix de votre bien à Marseille
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous cherchez juste la plus haute estimation pour vendre votre bien à Marseille
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi tant de biens restent invendus */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              Pourquoi tant de biens restent invendus à Marseille
            </h2>
          </div>
          
          <div className="bg-stone-50 rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-6 text-center">
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                À Marseille, la majorité des biens ne se vendent pas au prix affiché. Le marché immobilier marseillais est complexe et nécessite une analyse réelle.
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Surévaluations, annonces fantômes, mauvaise stratégie de mise en marché : une vente immobilière ratée à Marseille commence souvent dès la première semaine. Vendre un bien immobilier à Marseille nécessite une méthode structurée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Méthode de vente */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4" style={{ color: '#4682B4' }}>
              Notre méthode de vente immobilière Marseille
            </h2>
          </div>

          {/* Étapes */}
          <div className="space-y-8">
            {/* Étape 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Analyse du bien immobilier à Marseille
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Étude réelle de votre appartement ou maison à Marseille, de ses atouts et de ses limites, sans embellissement inutile. Analyse du contexte local marseillais.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Positionnement prix & marché immobilier marseillais
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Analyse des ventes réelles à Marseille, pas des annonces concurrentes. Prix cohérent avec le marché immobilier marseillais réel pour vendre votre bien dans des délais raisonnables.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Stratégie de mise en vente immobilière Marseille
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Ciblage des acquéreurs sérieux, diffusion maîtrisée sur le marché marseillais, mise en valeur cohérente de votre bien immobilier.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Suivi & ajustements de votre vente immobilière
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Analyse des retours du marché marseillais, ajustements rapides de la stratégie si nécessaire pour optimiser votre vente immobilière à Marseille.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Bénéfices */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              Concrètement, ce que notre méthode de vente immobilière Marseille vous apporte
            </h2>
          </div>

          {/* Liste des bénéfices */}
          <div className="bg-stone-50 rounded-lg shadow-lg p-8 md:p-12">
            <ul className="space-y-6">
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Un prix défendable pour vendre votre bien immobilier à Marseille au bon prix
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Des visites qualifiées d&apos;acquéreurs sérieux sur le marché marseillais
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Moins de perte de temps grâce à une stratégie de vente structurée
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Une vente immobilière cohérente avec votre projet à Marseille
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Une stratégie claire pour vendre votre appartement ou maison à Marseille, sans zones grises
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous refusons certains mandats */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              Pourquoi notre agence immobilière vente Marseille refuse certains mandats
            </h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-6 text-center">
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Nous préférons refuser un bien plutôt que de le mettre en vente immobilière à Marseille dans de mauvaises conditions. Notre méthode exigeante protège votre projet.
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Une vente mal préparée pénalise le vendeur, dévalorise le bien immobilier et bloque le projet. Vendre un bien à Marseille nécessite une stratégie claire dès le départ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Appel à l'action final */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-50 rounded-lg shadow-lg p-8 md:p-12 text-center">
            {/* Titre */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
              Vérifions si votre projet de vente immobilière Marseille a du sens
            </h2>
            
            {/* Texte */}
            <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
              Ce premier échange nous permet de comprendre votre situation et de déterminer si notre méthode de vente immobilière est adaptée à votre bien à Marseille et à vos objectifs.
            </p>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Demandez un premier échange pour vendre votre appartement ou maison à Marseille avec une méthode structurée et exigeante.
            </p>
            
            {/* CTA */}
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-full font-light tracking-wide transition-all hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: '#4682B4',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3a6a8f'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4682B4'
              }}
              aria-label="Demander un premier échange pour votre projet de vente immobilière Marseille"
            >
              Demander un premier échange pour vendre à Marseille
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

