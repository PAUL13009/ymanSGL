'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import Image from 'next/image'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      image: "/images/heropropre.jpeg",
      imageAlt: "Estimation Réaliste - Agence YL",
      title: "ESTIMATION RÉALISTE",
      description: "PLUS QU'UNE ESTIMATION, UN DOSSIER COMPLET BASÉ SUR LES MÉTHODES DE L'EXPERTISE IMMOBILIÈRE POUR SÉCURISER VOTRE PATRIMOINE",
      link: "/estimation",
    },
    {
      image: "/images/vente.webp",
      imageAlt: "Stratégie de Mise en Vente - Agence YL",
      title: "STRATÉGIE DE MISE EN VENTE",
      description: "UN PLAN D'ACTION SUR MESURE : DE LA VALORISATION DE VOTRE BIEN À LA SÉLECTION RIGOUREUSE D'ACQUÉREURS QUALIFIÉS",
      link: "/vente",
    },
    {
      image: "/images/chateau_saint_germain_en_laye.webp",
      imageAlt: "Mise en location - Agence YL",
      title: "MISE EN LOCATION",
      description: "ACCOMPAGNEMENT COMPLET POUR LA MISE EN LOCATION DE VOTRE PATRIMOINE. RECHERCHE DE LOCATAIRE, SUIVI DU DOSSIER JUSQU'À L'ÉTAT DES LIEUX D'ENTRÉE ET LA REMISE DES CLÉS.",
      link: "/location",
    },
  ]

  return (
    <main className="min-h-screen" role="main">
      <Navbar />
      
      <Hero 
        title="DES SERVICES SUR MESURE, UNE RIGUEUR ABSOLUE"
        subtitle="DU DOSSIER D'ESTIMATION À LA STRATÉGIE DE MISE EN VENTE, DÉCOUVREZ COMMENT L'AGENCE YL SÉCURISE ET VALORISE CHAQUE ÉTAPE DE VOTRE PROJET IMMOBILIER À SAINT-GERMAIN-EN-LAYE"
        buttonText="Explorez nos services"
        buttonLink="#services"
        imagePath="/images/herosectionimage.png"
        centered={true}
      />

      {/* Wrapper avec image d'arrière-plan pour toutes les sections */}
      <div className="relative z-10">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/herosectionimage.png"
            alt=""
            fill
            className="object-cover blur-md"
            loading="lazy"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </div>

      {/* Section Services — design bento grid */}
      <section id="services" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 relative z-10" aria-labelledby="services-title">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-7xl mx-auto">
            {/* Ligne du haut : Titre à gauche + Grande carte à droite */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 lg:mb-8">
              {/* Bloc titre */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <h2 id="services-title" className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-none mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  NOS<br />SERVICES
                </h2>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  NOUS N'INTERVENONS PAS SUR TOUS LES PROJETS, ET C'EST UN CHOIX ASSUMÉ. CHAQUE SERVICE REPOSE SUR UNE ANALYSE PRÉALABLE, UNE MÉTHODE CLAIRE ET UN CADRE DE TRAVAIL DÉFINI.
                </p>
              </div>

              {/* Grande carte service 1 */}
              <div className="lg:col-span-8">
                <Link href={services[0].link} className="group block relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden">
                  <Image
                    src={services[0].image}
                    alt={services[0].imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Flèche en haut à droite */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/40">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  {/* Titre en bas à gauche */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {services[0].title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 mt-2 max-w-md" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {services[0].description}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Ligne du bas : Deux cartes côte à côte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services.slice(1).map((service, index) => (
                <Link key={index} href={service.link} className="group block relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Flèche en haut à droite */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/40">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  {/* Titre en bas à gauche */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 mt-2 max-w-md" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeContent>
      </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-6" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/70 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            2026 — L'AGENCE YL
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/mentions-legales" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Politique de confidentialité
            </Link>
            <Link href="/honoraires" className="text-xs text-white/50 uppercase tracking-wider hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Frais d&apos;Agence
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
