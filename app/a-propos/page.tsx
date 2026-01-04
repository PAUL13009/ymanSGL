'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION - Titre et statistiques */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal avec deux couleurs */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-black">L'immobilier</span>
              <br />
              <span className="text-gray-400">réinventé.</span>
            </h1>
          </div>

          {/* Statistiques clés avec carrés colorés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-sm flex-shrink-0"></div>
              <p className="text-sm md:text-base font-medium text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                25+ TRANSACTIONS RÉALISÉES
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-sm flex-shrink-0"></div>
              <p className="text-sm md:text-base font-medium text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                30+ LOCATIONS ACCOMPAGNÉES
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-sm flex-shrink-0"></div>
              <p className="text-sm md:text-base font-medium text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                SÉLECTION VOLONTAIRE DES MANDATS
              </p>
            </div>
          </div>

          {/* Mission statement */}
          <div className="max-w-3xl mb-16">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Nous réinventons l'approche immobilière en combinant une analyse précise du marché, 
              une transparence totale et un accompagnement personnalisé pour vendre votre bien 
              au juste prix, dans des délais réalistes, à Marseille.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
              alt="Bien immobilier moderne à Marseille"
              fill
              className="object-cover"
              priority
            />
            {/* Badge de satisfaction */}
            <div className="absolute bottom-6 right-6 bg-white rounded-lg px-6 py-4 shadow-lg">
              <p className="text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                98% des vendeurs recommandent
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Nous réinventons l'approche immobilière—en combinant une analyse précise du marché, 
            une transparence totale et un accompagnement personnalisé pour vendre votre bien 
            au juste prix, dans des délais réalistes, à Marseille.
          </h2>
          <Link
            href="/estimation/formulaire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors mt-8"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Demander une estimation réaliste
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* WHY WE'RE DIFFERENT SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-12" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            POURQUOI NOUS SOMMES DIFFÉRENTS
          </p>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Image gauche */}
            <div className="lg:col-span-1">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1884&q=80"
                  alt="Équipe professionnelle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Statistiques au centre */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#4682B4' }}>25+</div>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Transactions de vente réalisées à Marseille
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#4682B4' }}>30+</div>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Locations accompagnées avec succès
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#4682B4' }}>100%</div>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Sélection volontaire des mandats acceptés
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#4682B4' }}>98%</div>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Des vendeurs recommandent notre approche
                </p>
              </div>
            </div>

            {/* Image droite */}
            <div className="lg:col-span-1">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
                  alt="Accompagnement personnalisé"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FONDATRICE SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Yman Lahlou, fondatrice de l'Agence YL
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            <p>
              Titulaire d'un BAC+5 en immobilier et finance immobilière, Yman Lahlou exerce dans l'immobilier depuis plus de 10 ans.
            </p>
            <p>
              Après plusieurs années d'expérience terrain, elle crée l'Agence YL avec une conviction forte :
              un projet immobilier doit être analysé objectivement, pas vendu à coups de promesses.
            </p>
            <p className="font-semibold text-gray-900">
              Aujourd'hui, Yman gère personnellement chaque dossier, de l'estimation à la signature finale.
              Ce choix volontaire garantit un suivi précis, une parfaite connaissance de chaque bien et une prise de décision rapide.
            </p>
          </div>
        </div>
      </section>

      {/* CE QUE NOUS REFUSONS */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Ce que nous refusons catégoriquement
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <span className="text-2xl text-red-500">✗</span>
              <p className="text-lg text-gray-700 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Surestimer un bien pour obtenir un mandat
              </p>
            </div>
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <span className="text-2xl text-red-500">✗</span>
              <p className="text-lg text-gray-700 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Accumuler des mandats invendables
              </p>
            </div>
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <span className="text-2xl text-red-500">✗</span>
              <p className="text-lg text-gray-700 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Mettre une pression commerciale inutile sur les vendeurs
              </p>
            </div>
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <span className="text-2xl text-red-500">✗</span>
              <p className="text-lg text-gray-700 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Vendre au rabais pour "aller vite"
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-red-500">✗</span>
              <p className="text-lg text-gray-700 flex-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Tenir un discours enjolivé ou imprécis
              </p>
            </div>
          </div>
          <p className="mt-8 text-lg text-gray-600 italic" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Ces refus sont une condition indispensable pour obtenir des ventes efficaces, maîtrisées et sans mauvaises surprises.
          </p>
        </div>
      </section>

      {/* À QUI S'ADRESSE L'AGENCE */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            À qui s'adresse réellement l'Agence YL
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-green-500">
              <h3 className="text-xl font-bold mb-6 text-green-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                ✓ L'Agence YL s'adresse aux propriétaires qui souhaitent vendre :
              </h3>
              <ul className="space-y-3 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>avec une vision claire du marché</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>dans des délais réalistes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>avec une stratégie adaptée à leur bien</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-red-500">
              <h3 className="text-xl font-bold mb-6 text-red-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                ✗ En revanche, nous ne sommes pas l'agence adaptée si :
              </h3>
              <ul className="space-y-3 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>vous souhaitez "tester le marché"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>vous refusez toute remise en question du prix</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>vous comparez plusieurs agences sur des promesses irréalistes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>vous recherchez une validation plutôt qu'une analyse</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ZONES DE MAÎTRISE */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Une parfaite connaissance des secteurs à forte valeur patrimoniale
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            <p>
              L'Agence YL intervient principalement sur :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>les 6e, 7e et 8e arrondissements de Marseille</li>
              <li>le centre-ville</li>
              <li>les quartiers à forte valeur patrimoniale</li>
            </ul>
            <p>
              Cette spécialisation permet une analyse fine des prix, des délais de vente et des attentes réelles des acheteurs sur ces secteurs spécifiques.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Un projet clair mérite une stratégie claire
          </h2>
          <p className="text-lg text-gray-600 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Si vous souhaitez vendre votre bien avec une approche réaliste, transparente et structurée, nous pouvons en discuter.
          </p>
          <p className="text-lg text-gray-600 italic mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Dans le cas contraire, d'autres agences seront sans doute plus adaptées à votre projet.
          </p>
          <Link
            href="/estimation/formulaire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Demander une estimation réaliste
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
