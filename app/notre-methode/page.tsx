'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'

export default function NotreMethodePage() {
  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="Notre approche : méthode, rigueur et transparence"
        subtitle="Une approche structurée pour des projets immobiliers maîtrisés, de l'analyse préalable à l'accompagnement personnalisé"
        buttonText="Faire estimer mon bien"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="→ Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/vue7e.png"
      />

      {/* Section Pourquoi une approche structurée est indispensable */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="approche-structuree-indispensable">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-structuree-indispensable" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Pourquoi une approche structurée est indispensable
              </h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p>
                Un projet immobilier doit être réfléchi, pas improvisé. La réussite d'une vente 
                dépend avant tout du cadrage initial : du prix fixé, de la stratégie choisie, 
                de la compréhension du marché réel.
              </p>
              <p>
                L'agence privilégie la méthode à la précipitation. Cette approche structurée permet 
                d'éviter les erreurs coûteuses : un bien surévalué qui ne se vend pas, une stratégie 
                inadaptée qui fait perdre du temps, un manque de préparation qui complique la vente.
              </p>
              <p>
                Chaque projet est unique. Tous les biens ne se vendent pas de la même manière. 
                Un appartement dans le 6e arrondissement ne suit pas la même logique qu'une maison 
                dans le 15e. Un bien en succession nécessite une approche différente d'une vente 
                classique. Un investisseur a des attentes distinctes d'un particulier vendant 
                sa résidence principale.
              </p>
              <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#4682B4' }}>
                <p className="font-semibold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  La collaboration entre le propriétaire et l'agence est centrale. Sans cette 
                  collaboration, aucune stratégie ne peut fonctionner efficacement.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Analyser avant d'agir */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="analyser-avant-agir">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="analyser-avant-agir" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Analyser avant d'agir
              </h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p>
                Avant tout engagement, chaque projet est étudié selon plusieurs critères complémentaires. 
                Cette analyse préalable est indispensable pour déterminer si l'agence peut accompagner 
                efficacement le projet.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8" role="list">
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" role="listitem" aria-labelledby="bien-lui-meme">
                  <h3 id="bien-lui-meme" className="text-xl font-semibold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Le bien lui-même
                  </h3>
                  <p className="text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    État général, caractéristiques, points forts, contraintes éventuelles. 
                    Chaque détail compte pour établir une estimation réaliste.
                  </p>
                </article>
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" role="listitem" aria-labelledby="environnement-bien">
                  <h3 id="environnement-bien" className="text-xl font-semibold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'environnement
                  </h3>
                  <p className="text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Quartier, proximité des commodités, exposition, vis-à-vis, environnement 
                    immédiat. Le contexte influence directement la valeur et la capacité de vente.
                  </p>
                </article>
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" role="listitem" aria-labelledby="marche-local-marseille">
                  <h3 id="marche-local-marseille" className="text-xl font-semibold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Le marché local
                  </h3>
                  <p className="text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Analyse des biens similaires récemment vendus sur le même secteur. 
                    Les prix réels du marché, pas les annonces. Les délais de vente constatés. 
                    L'offre et la demande sur le secteur.
                  </p>
                </article>
                <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" role="listitem" aria-labelledby="contexte-juridique-personnel">
                  <h3 id="contexte-juridique-personnel" className="text-xl font-semibold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Le contexte juridique et personnel
                  </h3>
                  <p className="text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Succession, divorce, vente classique, investissement. Chaque situation 
                    nécessite une approche adaptée. Les contraintes juridiques, les délais, 
                    les motivations du vendeur influencent la stratégie.
                  </p>
                </article>
              </div>
              <p className="mt-8">
                Cette analyse permet de déterminer si le prix envisagé est cohérent avec le marché réel, 
                si le bien peut se vendre dans des délais réalistes, et si l'agence peut apporter 
                une valeur réelle au projet.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Une approche sélective par choix */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="approche-selective-choix">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-selective-choix" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Une approche sélective par choix
              </h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6 mb-12" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p className="text-center max-w-3xl mx-auto">
                L'agence ne prend pas tous les mandats. Cette sélectivité n'est pas un caprice, 
                mais un choix professionnel assumé. Dire non fait partie du sérieux professionnel.
              </p>
              <p className="text-center max-w-3xl mx-auto">
                Cette sélectivité protège le client : elle garantit que l'agence peut réellement 
                accompagner le projet avec efficacité. Accepter un mandat qu'on sait difficile 
                à vendre ne sert ni le vendeur, ni l'agence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8" role="list">
              {/* Accepté */}
              <article className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-600 cursor-pointer group" style={{ borderColor: '#4682B4' }} role="listitem" aria-labelledby="agence-accepte-approche">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 id="agence-accepte-approche" className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                    L'agence accepte
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Les projets avec un prix cohérent avec le marché réel</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Les vendeurs réfléchis, ouverts à l'analyse et à la discussion</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Les projets structurés, avec des objectifs clairs</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.3}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Les situations où l'agence peut apporter une valeur réelle</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
              
              {/* Refusé */}
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-400 cursor-pointer group" role="listitem" aria-labelledby="agence-refuse-approche">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                  <h3 id="agence-refuse-approche" className="text-xl font-bold text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    L'agence refuse
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Les prix irréalistes, déconnectés du marché</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Les mandats simples sans analyse préalable</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Les projets flous ou non aboutis</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.3}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Les situations où l'agence ne peut pas apporter de valeur</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
            </div>
            <div className="text-center mt-10">
              <p className="text-lg text-gray-600 italic max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette sélectivité est un choix assumé. Elle garantit un accompagnement de qualité 
                pour chaque projet accepté.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Transparence et suivi */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="transparence-suivi">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="transparence-suivi" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                Transparence et suivi
              </h2>
            </div>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                <p>
                  Le suivi est central dans l'accompagnement d'un projet immobilier. Un propriétaire 
                  doit savoir où en est son projet, quelles actions ont été menées, quels résultats 
                  ont été obtenus.
                </p>
                <p>
                  L'agence privilégie une communication régulière et transparente. Après chaque étape 
                  franchie, un compte-rendu est transmis. Après chaque visite, un débrief est effectué. 
                  Les retours des visiteurs sont partagés, les questions sont anticipées, les décisions 
                  sont expliquées.
                </p>
                <p>
                  L'objectif est simple : que le propriétaire comprenne parfaitement l'avancement de 
                  son projet. Aucune opacité, aucun flou. Cette transparence permanente permet au 
                  propriétaire de prendre des décisions éclairées et de collaborer efficacement 
                  avec l'agence.
                </p>
                <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-6" style={{ borderColor: '#4682B4' }}>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    La clarté est un gage de confiance. Elle permet une collaboration efficace et 
                    des résultats cohérents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section À qui s'adresse cette approche */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="qui-sadresse-approche">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation"></div>
              <h2 id="qui-sadresse-approche" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                À qui s'adresse cette approche
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8" role="list">
              {/* Adaptée */}
              <article className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-600 cursor-pointer group" style={{ borderColor: '#4682B4' }} role="listitem" aria-labelledby="approche-adaptee-si">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#4682B4' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 id="approche-adaptee-si" className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#4682B4' }}>
                    Cette approche est adaptée si
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Vous souhaitez vendre avec une vision claire et réaliste du marché</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Vous êtes ouvert à l'analyse et à la discussion sur le prix</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Vous privilégiez la méthode à la précipitation</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.3}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Vous recherchez un accompagnement structuré et transparent</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.4}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1" style={{ color: '#4682B4' }} aria-hidden="true">•</span>
                      <span>Vous comprenez qu'un projet immobilier nécessite du temps et de la réflexion</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
              
              {/* Pas adaptée */}
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-400 cursor-pointer group" role="listitem" aria-labelledby="approche-pas-adaptee-si">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" style={{ borderRadius: '50%', minWidth: '2.5rem', minHeight: '2.5rem' }} aria-hidden="true" role="presentation">
                    <span className="text-white text-xl" aria-hidden="true">✗</span>
                  </div>
                  <h3 id="approche-pas-adaptee-si" className="text-xl font-bold text-gray-700 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Cette approche n'est probablement pas adaptée si
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Vous souhaitez "tester le marché" sans engagement réel</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Vous refusez toute remise en question du prix envisagé</span>
                    </li>
                  </AnimatedContent>
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
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Vous recherchez une validation plutôt qu'une analyse objective</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.3}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Vous comparez plusieurs agences uniquement sur des promesses de prix</span>
                    </li>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={true}
                    threshold={0.2}
                    delay={0.4}
                  >
                    <li className="flex items-start" role="listitem">
                      <span className="mr-3 mt-1 text-gray-500" aria-hidden="true">•</span>
                      <span>Vous privilégiez la rapidité à la méthode</span>
                    </li>
                  </AnimatedContent>
                </ul>
              </article>
            </div>
            <div className="text-center mt-10">
              <p className="text-lg text-gray-600 italic max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette qualification permet de s'assurer que l'approche correspond aux attentes 
                et aux besoins réels du projet.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA Final d'orientation */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-stone-50" aria-labelledby="cta-final-orientation">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-final-orientation" className="sr-only">Découvrir les services de l'agence immobilière à Marseille</h2>
            <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Si cette approche correspond à votre projet, vous pouvez poursuivre votre réflexion 
              en découvrant nos services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Bouton principal */}
              <a
                href="/vente"
                aria-label="Accéder au service de vente immobilière à Marseille"
                className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: 'white',
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                  const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                  const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                  if (fill) {
                    fill.style.width = '100%'
                    fill.style.transform = 'translateX(-50%) scaleY(1)'
                  }
                  if (arrow) {
                    arrow.style.opacity = '1'
                    arrow.style.right = '-14px'
                  }
                  if (text) text.style.color = 'white'
                  if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                }}
                onMouseLeave={(e) => {
                  const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                  const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                  const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                  if (fill) {
                    fill.style.width = '0%'
                    fill.style.transform = 'translateX(-50%) scaleY(0)'
                  }
                  if (arrow) {
                    arrow.style.opacity = '0'
                    arrow.style.right = '-30px'
                  }
                  if (text) text.style.color = '#4682B4'
                  if (textSpan) textSpan.style.transform = 'translateX(0)'
                }}
              >
                {/* Fond bleu qui se remplit */}
                <span
                  className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                  style={{
                    width: '0%',
                    backgroundColor: '#4682B4',
                    transform: 'translateX(-50%) scaleY(0)',
                    transformOrigin: 'center bottom',
                    transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                    zIndex: 1
                  }}
                ></span>
                
                {/* Contenu du bouton */}
                <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                  <span className="transition-transform duration-300">Accéder au service Vente</span>
                  <svg
                    className="button-arrow absolute w-5 h-5 transition-all duration-300"
                    style={{
                      opacity: 0,
                      right: '-30px',
                      transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              {/* Bouton secondaire */}
              <a
                href="/estimation"
                aria-label="Demander une estimation immobilière gratuite à Marseille"
                className="group relative inline-block px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: 'white',
                  color: '#4682B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                  const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                  const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                  if (fill) {
                    fill.style.width = '100%'
                    fill.style.transform = 'translateX(-50%) scaleY(1)'
                  }
                  if (arrow) {
                    arrow.style.opacity = '1'
                    arrow.style.right = '-14px'
                  }
                  if (text) text.style.color = 'white'
                  if (textSpan) textSpan.style.transform = 'translateX(-8px)'
                }}
                onMouseLeave={(e) => {
                  const fill = e.currentTarget.querySelector('.button-fill') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.button-arrow') as HTMLElement
                  const text = e.currentTarget.querySelector('.button-text') as HTMLElement
                  const textSpan = e.currentTarget.querySelector('.button-text span') as HTMLElement
                  if (fill) {
                    fill.style.width = '0%'
                    fill.style.transform = 'translateX(-50%) scaleY(0)'
                  }
                  if (arrow) {
                    arrow.style.opacity = '0'
                    arrow.style.right = '-30px'
                  }
                  if (text) text.style.color = '#4682B4'
                  if (textSpan) textSpan.style.transform = 'translateX(0)'
                }}
              >
                {/* Fond bleu qui se remplit */}
                <span
                  className="button-fill absolute bottom-0 left-1/2 h-full rounded-full"
                  style={{
                    width: '0%',
                    backgroundColor: '#4682B4',
                    transform: 'translateX(-50%) scaleY(0)',
                    transformOrigin: 'center bottom',
                    transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out',
                    zIndex: 1
                  }}
                ></span>
                
                {/* Contenu du bouton */}
                <span className="button-text relative z-10 flex items-center justify-center transition-all duration-300" style={{ color: '#4682B4' }}>
                  <span className="transition-transform duration-300">Demander une estimation</span>
                  <svg
                    className="button-arrow absolute w-5 h-5 transition-all duration-300"
                    style={{
                      opacity: 0,
                      right: '-30px',
                      transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out'
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}
