'use client'

import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'

export default function OurRole() {
  const containerRef = null

  return (
    <section className="pt-20 pb-12 bg-white">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-12" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              Notre rôle
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Nous accompagnons exclusivement des vendeurs particuliers dans la vente immobilière de leur résidence principale à Marseille, principalement sur les secteurs du 6ᵉ arrondissement et quartiers limitrophes."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Notre mission couvre l'ensemble du processus : analyse du marché immobilier local, estimation immobilière réaliste, définition d'un prix cohérent, stratégie de mise en vente et accompagnement jusqu'à la signature définitive."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Nous n'intervenons pas sur des mandats surévalués. Cette exigence est la condition pour vendre efficacement, dans des délais maîtrisés et sans négociation destructrice."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

