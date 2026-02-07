'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Image from 'next/image'
import Stepper, { Step } from '@/components/Stepper'
import { useScrollButtonAnimation } from '@/hooks/useScrollButtonAnimation'

export default function ServicesPage() {
  const estimationButtonRef = useScrollButtonAnimation()
  const venteButtonRef = useScrollButtonAnimation()
  const locationButtonRef = useScrollButtonAnimation()
  const venteFinalButtonRef = useScrollButtonAnimation()
  const estimationFinalButtonRef = useScrollButtonAnimation()
  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="Découvrez nos services"
        subtitle=""
        buttonText="Découvrir nos services"
        buttonLink="#estimation"
        imagePath="/images/modern.webp"
      />

      {/* Introduction - Cadre général */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="introduction-services">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="introduction-services" className="sr-only">Présentation des services immobiliers à Marseille</h2>
            </div>
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 shadow-lg">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Nous n'intervenons pas sur tous les projets, et c'est un choix assumé.
                  Chaque service repose sur une analyse préalable, une méthode claire et un cadre de travail défini dès le départ.
                </p>
                <p>
                  Notre rôle n'est pas de multiplier les mandats, mais d'accompagner efficacement les projets cohérents, avec transparence et rigueur.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Service - Estimation immobilière */}
      <section id="estimation" className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="service-estimation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image à gauche avec titre superposé */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl">
                <Image
                  src="/images/DSC04823.jpg"
                  alt="Service d'estimation immobilière à Marseille - Analyse de bien et étude de marché locale"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre + CTA centrés, titre uppercase, CTA blur */}
                <div className="absolute inset-x-0 flex flex-col items-center justify-center gap-6 sm:gap-8" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="service-estimation" className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center text-white px-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Estimation immobilière
                    </h2>
                  </FadeContent>
                  <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                    <div className="flex justify-center w-full">
                      <a
                        ref={estimationButtonRef as any}
                        href="/estimation"
                        aria-label="Faire estimer mon bien immobilier gratuitement"
                        className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', textDecoration: 'none', letterSpacing: '0.5px' }}
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Faire estimer mon bien</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contenu à droite : description + Stepper */}
              <div>
                <div className="text-lg text-gray-800 leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    Une estimation fiable repose sur bien plus qu'un prix au mètre carré.
                  </p>
                  <p>
                    Chaque estimation est fondée sur l'analyse du bien, de son environnement, de son contexte juridique et des ventes réellement conclues sur le secteur.
                  </p>
                  <p>
                    Ce service s'adresse aux propriétaires souhaitant obtenir une vision réaliste et exploitable de la valeur de leur bien.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Étude de marché locale approfondie
                        </span>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Analyse du bien et de son contexte
                        </span>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Estimation argumentée et cohérente
                        </span>
                      </div>
                    </Step>
                  </Stepper>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Service - Vente immobilière */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="service-vente">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Vidéo en premier sur mobile */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl order-1 md:order-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="Vidéo de présentation du service de vente immobilière à Marseille"
                >
                  <source src="/videos/transaction.mov" type="video/mp4" />
                  <source src="/videos/transaction.mov" type="video/quicktime" />
                </video>
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre + CTA centrés, titre uppercase, CTA blur */}
                <div className="absolute inset-x-0 flex flex-col items-center justify-center gap-6 sm:gap-8" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="service-vente" className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center text-white px-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Vente immobilière
                    </h2>
                  </FadeContent>
                  <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                    <div className="flex justify-center w-full">
                      <a
                        ref={venteButtonRef as any}
                        href="/vente"
                        aria-label="Découvrir le service de vente immobilière"
                        className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', textDecoration: 'none', letterSpacing: '0.5px' }}
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Découvrir le service Vente</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contenu à droite : description + Stepper */}
              <div className="order-2 md:order-2">
                <div className="text-lg text-gray-800 leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    La vente d'un bien ne se résume pas à sa mise en ligne.
                    Elle nécessite une analyse approfondie du marché, un positionnement juste et une stratégie adaptée au bien comme à son environnement.
                  </p>
                  <p>
                    Nous accompagnons les vendeurs ayant un projet clair, un objectif réaliste et la volonté de s'inscrire dans un processus structuré.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Analyse complète avant engagement
                        </span>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Stratégie de commercialisation adaptée
                        </span>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Suivi et reporting tout au long du processus
                        </span>
                      </div>
                    </Step>
                  </Stepper>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Service - Location immobilière */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="service-location">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Vidéo en premier sur mobile */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-xl order-1 md:order-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="Vidéo de présentation du service de location immobilière à Marseille"
                >
                  <source src="/videos/location.mov" type="video/mp4" />
                  <source src="/videos/location.mov" type="video/quicktime" />
                </video>
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden="true" role="presentation"></div>
                {/* Titre + CTA centrés, titre uppercase, CTA blur */}
                <div className="absolute inset-x-0 flex flex-col items-center justify-center gap-6 sm:gap-8" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                  <FadeContent duration={2000} ease="power2.out" threshold={0.3} initialOpacity={0}>
                    <h2 id="service-location" className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center text-white px-8 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Location immobilière
                    </h2>
                  </FadeContent>
                  <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                    <div className="flex justify-center w-full">
                      <a
                        ref={locationButtonRef as any}
                        href="/location"
                        aria-label="Découvrir le service de location immobilière"
                        className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', textDecoration: 'none', letterSpacing: '0.5px' }}
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Découvrir le service Location</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contenu à droite : description + Stepper */}
              <div className="order-2 md:order-2">
                <div className="text-lg text-gray-800 leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <p>
                    La mise en location d'un bien nécessite rigueur, conformité et sélection.
                  </p>
                  <p>
                    Nous accompagnons les propriétaires dans la recherche de locataires sérieux, avec une gestion structurée du dossier et un suivi transparent à chaque étape.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <Stepper variant="light" backButtonText="Précédent" nextButtonText="Suivant" completeButtonText="Terminer" contentClassName="!mb-4">
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Mise en location conforme et encadrée
                        </span>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Sélection rigoureuse des dossiers
                        </span>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Communication claire avec le propriétaire
                        </span>
                      </div>
                    </Step>
                  </Stepper>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA Final - même design que page à propos, contenu actuel */}
      <section className="relative min-h-screen flex items-center justify-center" aria-labelledby="cta-final-services">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/modern.webp"
              alt="L'Agence YL - Nos services immobiliers"
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
              <h2 id="cta-final-services" className="sr-only">Choisir un service immobilier</h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed px-2 mb-8 sm:mb-12 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Chaque projet est différent.
                Le plus important est de choisir le service adapté à votre situation.
              </p>
            </FadeContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    ref={venteFinalButtonRef as any}
                    href="/vente"
                    aria-label="Accéder au service de vente immobilière"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', textDecoration: 'none', letterSpacing: '0.5px' }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Accéder au service Vente</span>
                  </a>
                </div>
              </div>
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    ref={estimationFinalButtonRef as any}
                    href="/estimation"
                    aria-label="Faire estimer mon bien immobilier gratuitement"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', textDecoration: 'none', letterSpacing: '0.5px' }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Faire estimer mon bien</span>
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
