'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useScrollImageAnimation } from '@/hooks/useScrollImageAnimation'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'
import Stepper, { Step } from '@/components/Stepper'
import { AnimatePresence, motion } from 'framer-motion'

export default function AProposPage() {
  const [isFondatriceImageHovered, setIsFondatriceImageHovered] = useState(false)
  const [isExpertiseImageHovered, setIsExpertiseImageHovered] = useState(false)
  const [selectiveToggleOn, setSelectiveToggleOn] = useState(false)
  const { imageRef: fondatriceImageRef, isAnimated: isFondatriceImageAnimated } = useScrollImageAnimation()
  const { imageRef: expertiseImageRef, isAnimated: isExpertiseImageAnimated } = useScrollImageAnimation()
  const venteButtonRef = useScrollButtonAnimation()
  const estimationButtonRef = useScrollButtonAnimation()
  return (
    <main className="min-h-screen bg-sable-50" role="main">
      <Navbar />
      
      <Hero 
        title="L'expertise au service de votre patrimoine"
        subtitle="Plus qu'une transaction, une analyse certifiée par une experte judiciaire née à Saint-Germain-en-Laye."
        buttonText="Échanger sur votre projet avec Yman"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/herosectionimage.png"
      />

      {/* Section Pourquoi l'agence existe */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-sable-50 relative z-10" aria-labelledby="pourquoi-agence-existe">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image à gauche avec titre superposé */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl">
                <Image
                  src="/images/loft.jpg"
                  alt="Loft moderne - L'Agence YL, agence immobilière"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre superposé avec fade in - positionné à mi-hauteur */}
                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="pourquoi-agence-existe" className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center text-white px-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      L'EXIGENCE AU SERVICE DU PATRIMOINE
                    </h2>
                  </FadeContent>
                </div>
              </div>
              
              {/* Texte à droite */}
              <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p className="font-bold uppercase">
                  L'Agence YL est née d'une conviction : l'immobilier de prestige ne tolère aucune approximation.
                </p>
                <p>
                  Après 10 ans d'expérience et un Master en Finance Immobilière (ESPI), sa fondatrice a choisi de bâtir une structure où la rigueur technique l'emporte sur le volume commercial. Dans un marché aussi complexe que celui de Saint-Germain-en-Laye, chaque mètre carré compte et chaque détail juridique pèse.
                </p>
                <p>
                  En tant qu'Expert Judiciaire, Yman Lahlou apporte une dimension rare à la transaction : la certitude de la valeur vénale réelle.
                </p>
                <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#000000' }}>
                  <p className="font-semibold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Aujourd'hui, l'agence assume une sélectivité totale : nous ne multiplions pas les mandats, nous sécurisons des projets de vie avec une précision chirurgicale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Notre façon de travailler */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-sable-50 relative z-10" aria-labelledby="notre-facon-de-travailler">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="notre-facon-de-travailler" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                UN SOCLE DE COMPÉTENCES HAUT DE BILAN
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Bloc 1 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Master en Finance Immobilière (ESPI)
                </h3>
                <p className="text-gray-800 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  « Diplômée de l'École Supérieure des Professions de l'Immobilier, j'appréhende chaque actif non pas comme un simple objet de transaction, mais comme un patrimoine financier complexe. Cette formation me permet de maîtriser les mécanismes de valorisation les plus pointus. »
                </p>
              </div>
              {/* Bloc 2 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Expert Judiciaire
                </h3>
                <p className="text-gray-800 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  « Titulaire d'une nomination d'Expert Judiciaire, j'exerce avec une déontologie stricte. Ma méthodologie d'analyse est celle exigée par les tribunaux : impartiale, technique et documentée. C'est cette même rigueur que j'applique à l'expertise de votre bien. »
                </p>
              </div>
              {/* Bloc 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  10 ans d'Ancrage Local
                </h3>
                <p className="text-gray-800 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  « Une décennie passée à décrypter les mutations du marché de Saint-Germain-en-Laye. Cette expérience terrain me permet de traduire les chiffres en réalité de marché, quartier par quartier, rue par rue. »
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Au-delà de l'estimation */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-sable-50 relative z-10" aria-labelledby="au-dela-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mx-auto mb-6" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="au-dela-estimation" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                AU-DELÀ DE L'ESTIMATION : LE RAPPORT D'EXPERTISE
              </h2>
            </div>
            <div className="text-lg text-gray-800 leading-relaxed space-y-6 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p>
                Là où une agence classique vous remettra une simple fourchette de prix, l'Agence YL vous délivre un véritable rapport d'expertise vénale.
              </p>
              <p>
                Nous utilisons les méthodes de capitalisation, de comparaison et d'analyse sol/construction pour définir le Prix Pivot : celui qui maximise votre net vendeur tout en garantissant une vente rapide. Cette approche élimine les marges d'erreur et désarme toute tentative de négociation agressive des acquéreurs.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Saint-Germain-en-Laye */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-sable-50 relative z-10" aria-labelledby="saint-germain-histoire">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="saint-germain-histoire" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                SAINT-GERMAIN-EN-LAYE : PLUS QU'UN SECTEUR, UNE HISTOIRE PERSONNELLE.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Texte à gauche */}
              <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  « On ne peut bien expertiser que ce que l'on connaît intimement. Née à Saint-Germain-en-Laye, j'ai grandi au rythme de ses rues, de son marché et de son histoire. J'y vis et j'y travaille aujourd'hui avec une conviction intacte.
                </p>
                <p>
                  Pour moi, expertiser un hôtel particulier près du Château ou une maison de ville dans le quartier Alsace, ce n'est pas seulement analyser des mètres carrés. C'est comprendre l'âme de ces lieux et l'évolution de notre ville.
                </p>
                <p>
                  Cette double culture — la rigueur de l'expertise financière et la sensibilité de l'enfant du pays — est ma plus grande force. Elle me permet de capter les nuances qui échappent aux algorithmes et aux agences nationales pour valoriser votre patrimoine comme il le mérite. »
                </p>
              </div>
              {/* Image d'Yman à droite */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl">
                <Image
                  src="/images/ymannew.png"
                  alt="Yman Lahlou, Experte Immobilier Agréé à Saint-Germain-en-Laye"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section CTA Final - même rendu que la page d'accueil */}
      <section className="relative z-10 min-h-screen flex items-center justify-center" aria-labelledby="cta-final-a-propos">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/herosectionimage.png"
              alt="L'Agence YL - Agence immobilière à Saint-Germain-en-Laye"
              fill
              className="object-cover"
              loading="lazy"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" role="presentation" />
          </div>
        </div>
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
              <h2 id="cta-final-a-propos" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight px-2 mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                PRÊT À OBTENIR UNE VISION CLAIRE DE VOTRE PATRIMOINE ?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-normal leading-relaxed px-2 mb-8 sm:mb-12" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Que vous ayez un projet de vente immédiat ou que vous souhaitiez simplement sécuriser la valeur de votre bien dans le cadre d'une réflexion patrimoniale, échangeons en toute confidentialité.
              </p>
            </FadeContent>
            <div className="flex justify-center">
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    ref={venteButtonRef as any}
                    href="/analyse"
                    aria-label="Prendre rendez-vous avec Yman Lahlou, experte immobilier"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Prendre rendez-vous avec Yman</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
