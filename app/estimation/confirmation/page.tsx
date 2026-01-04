'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'

export default function EstimationConfirmationPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SECTION 1 — CONFIRMATION CLAIRE */}
            <div className="text-center mb-16">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.3}
                delay={0}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Votre demande d'estimation a bien été reçue
                </h1>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.3}
                delay={0.2}
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nous allons maintenant analyser votre bien de façon précise et réaliste.
                </p>
              </AnimatedContent>
            </div>

            {/* SECTION 2 — CE QUI VA SE PASSER MAINTENANT */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.3}
              >
                <h2 className="text-2xl md:text-3xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Prochaine étape
                </h2>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.4}
              >
                <ul className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>Nous analysons manuellement les informations transmises</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>Nous comparons votre bien aux ventes réelles du secteur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>Nous évaluons sa capacité à se vendre dans un délai de 2 à 3 mois</span>
                  </li>
                </ul>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.5}
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold italic" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  📌 Chaque estimation est réalisée avec l'objectif de vendre vite, au juste prix, et sans promesse irréaliste.
                </p>
              </AnimatedContent>
            </div>

            {/* SECTION 3 — LE FILTRE (NON NÉGOCIABLE) */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.6}
              >
                <div className="bg-white border-2 rounded-lg p-8 md:p-10 shadow-lg" style={{ borderColor: '#4682B4' }}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                      ⚠️ Notre engagement est simple :
                    </h3>
                  </div>
                  
                  <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <p className="font-semibold text-center" style={{ color: '#4682B4' }}>
                      Nous refusons de prendre des mandats lorsque le prix attendu n'est pas cohérent avec le marché.
                    </p>
                    
                    <div className="pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                      <p className="font-semibold mb-4" style={{ color: '#4682B4' }}>
                        Pourquoi ?
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span>Parce qu'un bien surévalué ne se vend pas</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span>Parce qu'il se dévalorise avec le temps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                          <span>Parce que notre rôle est de protéger votre projet, pas de flatter un prix</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                      <p className="font-semibold text-center" style={{ color: '#dc2626' }}>
                        Si votre objectif est d'obtenir une estimation complaisante, notre méthode ne sera probablement pas adaptée.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* SECTION 4 — DÉLAI & PRISE DE CONTACT */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.7}
              >
                <h2 className="text-2xl md:text-3xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Quand serez-vous recontacté ?
                </h2>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.8}
              >
                <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    Vous serez contacté <span className="font-semibold">sous 24 à 48h ouvrées</span>
                  </p>
                  <p>
                    <span className="font-semibold">Par téléphone ou email</span>
                  </p>
                  <p>
                    Afin de vous restituer une estimation argumentée et exploitable
                  </p>
                  <p className="font-semibold mt-4" style={{ color: '#4682B4' }}>
                    📌 Si votre bien correspond à notre méthode, nous vous expliquerons précisément la stratégie de mise en vente.
                  </p>
                </div>
              </AnimatedContent>
            </div>

            {/* SECTION 5 — RESPONSABILISATION DU VENDEUR */}
            <div className="mb-12">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={0.9}
              >
                <h2 className="text-2xl md:text-3xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                  Pour aller plus loin
                </h2>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={1.0}
              >
                <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    Afin de tirer le meilleur parti de notre échange, nous vous invitons à réfléchir aux points suivants :
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span><span className="font-semibold">Suis-je prêt à vendre au prix du marché réel ?</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span><span className="font-semibold">Mon objectif est-il de vendre vite ou de tester un prix ?</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }}>•</span>
                      <span><span className="font-semibold">Suis-je ouvert à une stratégie fondée sur les faits plutôt que sur l'affect ?</span></span>
                    </li>
                  </ul>
                </div>
              </AnimatedContent>
            </div>

            {/* SECTION 6 — SORTIE PROPRE */}
            <div className="text-center">
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0.2}
                delay={1.1}
              >
                <div className="space-y-4">
                  <a
                    href="/"
                    className="inline-block text-base text-gray-600 hover:text-gray-900 underline transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Retour au site
                  </a>
                  <span className="mx-4 text-gray-400">•</span>
                  <a
                    href="/vente"
                    className="inline-block text-base text-gray-600 hover:text-gray-900 underline transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Découvrir notre méthode de vente
                  </a>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}
