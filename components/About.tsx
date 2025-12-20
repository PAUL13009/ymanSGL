'use client'

import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'

export default function About() {
  const containerRef = null

  return (
    <section id="a-propos" className="pt-20 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed max-w-5xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="L'Agence YL, agence immobilière à Marseille fondée par une professionnelle diplômée d'un Bac+5, s'appuie sur plus de 8 ans d'expérience. Notre agence immobilière accompagne ses clients avec expertise dans leurs projets d'achat, de vente ou de location immobilière"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
              <br /><br />
              <VariableProximity
                label="Grâce à un réseau solide de professionnels, notre agence immobilière à Marseille garantit un service sur mesure et des transactions sécurisées. Nous collaborons avec des experts pour vous offrir un accompagnement optimal et répondre à tous vos besoins immobiliers"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

