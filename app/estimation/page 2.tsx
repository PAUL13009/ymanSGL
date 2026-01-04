'use client'

import { useRef, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useProximityContainer } from '@/components/ProximityProvider'

export default function EstimationPage() {
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
        title="Estimation immobilière Marseille : une analyse sérieuse"
        subtitle="Estimation immobilière Marseille sans prix automatique. Méthode précise adaptée au contexte réel de votre bien et du marché marseillais. Estimer un bien immobilier à Marseille avec une analyse humaine."
        buttonText="Vérifier si votre bien est éligible à notre estimation"
        buttonLink="#contact"
      />
      
      {/* Texte d'introduction SEO (visuellement intégré dans le Hero via subtitle) */}
      <div className="sr-only">
        <p>
          L&apos;Agence Y L propose une estimation immobilière Marseille sérieuse et humaine pour votre appartement ou maison. 
          Notre méthode d&apos;estimation immobilière à Marseille analyse le marché réel marseillais pour vous donner un prix cohérent et défendable. 
          Estimer un bien immobilier à Marseille nécessite une expertise locale que nous maîtrisons parfaitement.
        </p>
      </div>
      
      {/* Section Eligibilité */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Colonne gauche - Pour vous */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
                Cette estimation immobilière Marseille est faite pour vous si :
              </h2>
              <ul className="space-y-4 w-full">
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous avez un projet réel de vente à Marseille (pas une simple curiosité)
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous cherchez un prix immobilier Marseille cohérent avec le marché réel, pas le plus haut possible
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous êtes prêt à entendre une analyse argumentée de votre bien immobilier à Marseille
                </li>
              </ul>
            </div>

            {/* Colonne droite - Pas pour vous */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
                Ce n&apos;est pas pour vous si :
              </h2>
              <ul className="space-y-4 w-full">
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous voulez &quot;voir à combien ça pourrait partir&quot; sans analyse sérieuse
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous cherchez à comparer 5 agences pour obtenir le prix le plus haut
                </li>
                <li className="text-gray-700 leading-relaxed font-light">
                  Vous voulez un chiffre sans justification ni étude du marché marseillais
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Méthode d'estimation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4" style={{ color: '#4682B4' }}>
              NOTRE MÉTHODE D&apos;ESTIMATION IMMOBILIÈRE MARSEILLE
            </h2>
            <h3 className="text-2xl md:text-3xl font-light tracking-wide" style={{ color: '#4682B4' }}>
              Notre méthode d&apos;estimation immobilière à Marseille
            </h3>
          </div>

          {/* Objectif */}
          <div className="bg-stone-50 rounded-lg p-8 mb-12 text-center">
            <h4 className="text-xl md:text-2xl font-light tracking-wide mb-4" style={{ color: '#4682B4' }}>
              🎯 Objectif
            </h4>
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
              Remplacer les avis clients par le process.
            </p>
          </div>

          {/* Étapes */}
          <div className="space-y-8">
            {/* Étape 1 */}
            <div className="bg-stone-50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Analyse du bien immobilier à Marseille
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Surface, état, distribution, atouts et contraintes réelles de votre appartement ou maison à Marseille.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="bg-stone-50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Étude du marché immobilier marseillais
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Analyse des biens réellement vendus à Marseille, délais de vente, tension du secteur, prix immobilier Marseille réel, pas les annonces fantômes.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="bg-stone-50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Mise en perspective du projet de vente
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Urgence de vente, objectif du vendeur, stratégie de mise en vente adaptée au marché marseillais.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="bg-stone-50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light" style={{ color: '#4682B4' }}>
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3" style={{ color: '#4682B4' }}>
                    Recommandation de prix immobilier Marseille argumentée
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Un prix défendable, cohérent avec le marché marseillais réel et assumé. Estimation bien immobilier Marseille basée sur des faits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous refusons les estimations automatiques */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              Pourquoi nous refusons les estimations automatiques à Marseille
            </h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-6 text-center">
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Estimer un bien immobilier à Marseille ne se résume pas à une surface et une adresse. Le marché immobilier marseillais est complexe et nécessite une analyse approfondie.
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Deux appartements identiques sur le papier peuvent se vendre avec plusieurs dizaines de milliers d&apos;euros d&apos;écart selon leur contexte réel à Marseille : quartier, exposition, état, environnement.
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                C&apos;est pour cette raison que notre estimation immobilière Marseille privilégie une approche humaine, contextualisée et honnête, adaptée au marché réel de la ville.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Ce que vous obtenez concrètement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8" style={{ color: '#4682B4' }}>
              CE QUE VOUS OBTENEZ CONCRÈTEMENT AVEC NOTRE ESTIMATION IMMOBILIÈRE MARSEILLE
            </h2>
          </div>

          {/* Objectif */}
          <div className="bg-stone-50 rounded-lg p-8 mb-12 text-center">
            <h3 className="text-xl md:text-2xl font-light tracking-wide mb-4" style={{ color: '#4682B4' }}>
              🎯 Objectif
            </h3>
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
              Transformer notre méthode d&apos;estimation immobilière Marseille en valeur tangible pour votre projet de vente.
            </p>
          </div>

          {/* Liste */}
          <div className="bg-stone-50 rounded-lg p-8 md:p-12">
            <ul className="space-y-6">
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Une estimation immobilière Marseille argumentée et compréhensible pour votre appartement ou maison
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Une analyse du marché immobilier marseillais réel, basée sur les ventes effectives
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Un avis honnête sur le prix immobilier Marseille, même s&apos;il ne va pas dans votre sens
              </li>
              <li className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Une recommandation claire sur la suite (ou non) à donner pour estimer votre bien immobilier à Marseille
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section Appel à l'action final */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            {/* Titre */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6" style={{ color: '#4682B4' }}>
              Vérifions si votre bien immobilier à Marseille correspond à notre méthode d&apos;estimation
            </h2>
            
            {/* Micro-texte */}
            <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
              Ce premier échange nous permet de comprendre votre projet de vente à Marseille et de déterminer si une estimation immobilière sérieuse est pertinente dans votre situation.
            </p>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Demandez votre pré-analyse gratuite pour estimer votre appartement ou maison à Marseille avec notre méthode humaine et contextualisée.
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
              aria-label="Demander une pré-analyse gratuite pour estimation immobilière Marseille"
            >
              Demander une pré-analyse de mon bien à Marseille
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

