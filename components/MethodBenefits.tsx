'use client'

import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import AnimatedContent from './AnimatedContent'

export default function MethodBenefits() {
  const containerRef = null

  const benefits = [
    {
      icon: '⏱️',
      title: '1 — Moins de temps perdu',
      subtitle: 'Votre bien est positionné correctement dès le départ.',
      items: [
        'Moins de semaines sans visite',
        'Moins de repositionnements tardifs',
        'Un calendrier de vente maîtrisé'
      ],
      conclusion: 'Le vendeur se projette immédiatement.'
    },
    {
      icon: '📉',
      title: '2 — Moins de dévalorisation',
      subtitle: 'Un prix cohérent protège la valeur de votre bien.',
      items: [
        'Pas d\'historique d\'annonces à rallonge',
        'Pas d\'image de bien "invendu"',
        'Une négociation basée sur des faits, pas sur l\'urgence'
      ],
      conclusion: 'Tu parles à sa peur numéro 1.'
    },
    {
      icon: '🎯',
      title: '3 — Des acheteurs réellement qualifiés',
      subtitle: 'Les visites sont ciblées et utiles.',
      items: [
        'Acheteurs capables de financer',
        'Compréhension claire du prix',
        'Moins de curiosité, plus de décisions'
      ],
      conclusion: 'Tu valorises son temps.'
    },
    {
      icon: '🧠',
      title: '4 — Des décisions prises en confiance',
      subtitle: 'Chaque choix est expliqué et argumenté.',
      items: [
        'Ajustements basés sur des données',
        'Vision claire à chaque étape',
        'Aucune pression inutile'
      ],
      conclusion: 'Tu montres que vous pilotez.'
    }
  ]

  return (
    <section className="pt-20 pb-12 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-12" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              Ce que cette méthode change concrètement pour vous
            </h2>
            <div className="max-w-4xl mx-auto mb-16">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Vendre un bien immobilier n'est pas une question de chance, mais de décisions prises au bon moment."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Une méthode claire de vente immobilière permet d'éviter les erreurs les plus fréquentes : surévaluation, perte de temps et négociations subies."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
            </div>
          </div>

          {/* 4 blocs */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <AnimatedContent
                key={index}
                distance={50}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={index * 0.1}
              >
                <div className="bg-white rounded-lg p-6 md:p-8 h-full shadow-md">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-base md:text-lg font-semibold mb-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {benefit.subtitle}
                  </p>
                  <ul className="text-sm md:text-base text-gray-600 leading-relaxed space-y-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            ))}
          </div>

          {/* Phrase de synthèse */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Vendre efficacement, ce n'est pas vendre plus vite à n'importe quel prix."
                  fromFontVariationSettings="'wght' 500"
                  toFontVariationSettings="'wght' 700"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mt-4 font-semibold" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="C'est vendre dans les bonnes conditions, sans subir le marché."
                  fromFontVariationSettings="'wght' 500"
                  toFontVariationSettings="'wght' 700"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-16 flex flex-col items-center">
            <a
              href="/analyse"
              className="inline-block px-8 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105"
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
              <VariableProximity
                label="Demander une analyse de valeur réaliste de mon bien"
                fromFontVariationSettings="'wght' 500"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <p className="mt-4 text-sm md:text-base text-gray-600 font-light text-center max-w-2xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Analyse offerte et argumentée – mandat accepté uniquement si le prix est cohérent avec le marché.
            </p>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

