'use client'

import FadeContent from './FadeContent'

export default function StatsSection() {
  return (
    <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 bg-sable-50 font-sans relative z-10" aria-labelledby="estimation-comparison" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 id="estimation-comparison" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Pourquoi une estimation gratuite peut vous coûter cher
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              À Saint-Germain-en-Laye, l'approximation ne pardonne pas. Choisissez la certitude de l'Expertise YL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Colonne A : L'Estimation Classique */}
            <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 shadow-lg">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                L'Estimation Classique
              </h3>
              <ul className="space-y-5 sm:space-y-6">
                <li>
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'approche "Prix Plaisir"
                  </h4>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Un prix volontairement haut pour obtenir votre signature, suivi de baisses de prix répétées qui dévalorisent votre bien.
                  </p>
                </li>
                <li>
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Données de surface
                  </h4>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Une simple comparaison avec les annonces en cours sur les portails immobiliers (souvent déconnectées de la réalité des ventes).
                  </p>
                </li>
                <li>
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Le risque de "Bien Brûlé"
                  </h4>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Après 3 mois sans offre, votre bien devient suspect aux yeux des acheteurs qualifiés. La négociation devient agressive.
                  </p>
                </li>
                <li>
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Zéro garantie technique
                  </h4>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Pas d'analyse approfondie du PLU, des servitudes ou du dossier technique avant la mise en vente.
                  </p>
                </li>
              </ul>
            </div>

            {/* Colonne B : L'Expertise YL */}
            <div className="bg-sable-100 rounded-lg p-6 sm:p-8 md:p-10 shadow-lg border-2 border-black">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                L'Expertise YL
              </h3>
              <ul className="space-y-5 sm:space-y-6">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      La Valeur Vénale Réelle
                    </h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Un prix pivot basé sur des méthodes d'expertise reconnues (comparative, capitalisation, sol et construction).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Accès aux "Ventes Réelles"
                    </h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Nous analysons les prix définitifs actés chez les notaires de Saint-Germain, pas seulement les prix d'affichage.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Vente en moins de 45 jours
                    </h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      En fixant le juste prix dès le départ, nous créons un climat de confiance qui limite la négociation et accélère la décision.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Sécurisation Totale
                    </h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Audit complet. Nous préparons votre dossier pour qu'aucune condition suspensive ne vienne bloquer la vente.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

