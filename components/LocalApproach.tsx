'use client'

import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'
import AnimatedContent from './AnimatedContent'

export default function LocalApproach() {
  const containerRef = null

  return (
    <section className="pt-20 pb-12 bg-white">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-12" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              Pourquoi cette approche fonctionne à Vauban et dans le 6ᵉ arrondissement
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Les quartiers centraux de Marseille ne fonctionnent pas comme le reste du marché immobilier."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="À Vauban et dans le 6ᵉ arrondissement, les acheteurs sont informés, attentifs aux prix et très réactifs à la cohérence d'une estimation immobilière."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Dans ce contexte, l'approximation se paie immédiatement en temps perdu"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
            </div>
          </div>

          {/* Trois blocs */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Bloc 1 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0}
            >
              <div className="bg-stone-50 rounded-lg p-6 md:p-8 h-full">
                <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Des vendeurs informés, peu sensibles aux discours commerciaux
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Les vendeurs de ces quartiers comparent, analysent et cherchent à comprendre avant de décider.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Ils attendent une lecture claire du marché, pas des promesses de surévaluation qui retardent la vente et fragilisent la négociation.
                </p>
              </div>
            </AnimatedContent>

            {/* Bloc 2 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.1}
            >
              <div className="bg-stone-50 rounded-lg p-6 md:p-8 h-full">
                <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Un marché qui sanctionne rapidement les erreurs de prix
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  À Vauban, un bien mal positionné est identifié en quelques semaines par les acheteurs.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  L'historique des annonces est observé, les comparaisons sont immédiates, et une correction tardive entraîne souvent une perte de crédibilité — et de valeur.
                </p>
              </div>
            </AnimatedContent>

            {/* Bloc 3 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.2}
            >
              <div className="bg-stone-50 rounded-lg p-6 md:p-8 h-full">
                <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  La vente repose sur la précision, pas sur le volume
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Dans ces quartiers, vendre efficacement repose sur :
                </p>
                <ul className="text-sm md:text-base text-gray-600 leading-relaxed mb-3 space-y-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>une analyse micro-locale,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>un positionnement tarifaire défendable,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>et un pilotage rigoureux dès la mise en marché.</span>
                  </li>
                </ul>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  C'est pourquoi nous privilégions peu de mandats, mais des mandats cohérents, traités avec méthode et exigence.
                </p>
              </div>
            </AnimatedContent>
          </div>

          {/* Phrase de positionnement */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                <VariableProximity
                  label="Chaque vente est abordée comme un projet unique, avec un objectif clair : vendre dans les meilleures conditions du marché réel, sans dévalorisation progressive"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={100}
                  falloff="linear"
                />
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center">
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
                label="Vérifiez si votre bien correspond à cette approche"
                fromFontVariationSettings="'wght' 500"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

