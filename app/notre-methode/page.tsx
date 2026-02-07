'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Stepper, { Step } from '@/components/Stepper'

export default function NotreMethodePage() {
  const [selectiveToggleOn, setSelectiveToggleOn] = useState(false)
  const [quiToggleOn, setQuiToggleOn] = useState(false)
  return (
    <main className="min-h-screen bg-white" role="main">
      <Navbar />
      
      <Hero 
        title="méthode, rigueur et transparence"
        subtitle=""
        buttonText="Faire estimer mon bien"
        buttonSubtext="Estimation gratuite – sans engagement"
        buttonLink="/estimation"
        secondaryButtonText="→ Découvrir nos biens"
        secondaryButtonLink="/catalogue"
        imagePath="/images/modern.webp"
      />

      {/* Section Pourquoi une approche structurée est indispensable */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="approche-structuree-indispensable">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-structuree-indispensable" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Pourquoi une approche structurée est indispensable
              </h2>
            </div>
            <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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
              <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-8" style={{ borderColor: '#000000' }}>
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
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="analyser-avant-agir">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="analyser-avant-agir" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Analyser avant d'agir
              </h2>
            </div>
            <div className="text-lg text-gray-800 leading-relaxed space-y-6 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p className="max-w-2xl mx-auto">
                Avant tout engagement, chaque projet est étudié selon plusieurs critères complémentaires. 
                Cette analyse préalable est indispensable pour déterminer si l'agence peut accompagner 
                efficacement le projet.
              </p>
              <div className="mt-8 w-full flex justify-center [&_.stepper-step-default]:text-center [&_.stepper-step-default]:text-gray-800">
                <Stepper
                  variant="light"
                  backButtonText="Précédent"
                  nextButtonText="Suivant"
                  completeButtonText="Terminer"
                  contentClassName="!mb-4"
                >
                  <Step>
                    <h3 id="bien-lui-meme" className="text-xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Le bien lui-même
                    </h3>
                    <p className="text-gray-800 text-center leading-relaxed max-w-lg mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      État général, caractéristiques, points forts, contraintes éventuelles. 
                      Chaque détail compte pour établir une estimation réaliste.
                    </p>
                  </Step>
                  <Step>
                    <h3 id="environnement-bien" className="text-xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      L'environnement
                    </h3>
                    <p className="text-gray-800 text-center leading-relaxed max-w-lg mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Quartier, proximité des commodités, exposition, vis-à-vis, environnement 
                      immédiat. Le contexte influence directement la valeur et la capacité de vente.
                    </p>
                  </Step>
                  <Step>
                    <h3 id="marche-local-marseille" className="text-xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Le marché local
                    </h3>
                    <p className="text-gray-800 text-center leading-relaxed max-w-lg mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Analyse des biens similaires récemment vendus sur le même secteur. 
                      Les prix réels du marché, pas les annonces. Les délais de vente constatés. 
                      L'offre et la demande sur le secteur.
                    </p>
                  </Step>
                  <Step>
                    <h3 id="contexte-juridique-personnel" className="text-xl font-semibold mb-3 text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Le contexte juridique et personnel
                    </h3>
                    <p className="text-gray-800 text-center leading-relaxed max-w-lg mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Succession, divorce, vente classique, investissement. Chaque situation 
                      nécessite une approche adaptée. Les contraintes juridiques, les délais, 
                      les motivations du vendeur influencent la stratégie.
                    </p>
                  </Step>
                </Stepper>
              </div>
              <p className="mt-8 text-center max-w-2xl mx-auto">
                Cette analyse permet de déterminer si le prix envisagé est cohérent avec le marché réel, 
                si le bien peut se vendre dans des délais réalistes, et si l'agence peut apporter 
                une valeur réelle au projet.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Une approche sélective par choix — design toggle comme à propos */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="approche-selective-choix">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="approche-selective-choix" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Une approche sélective par choix
              </h2>
            </div>
            <div className="text-lg text-gray-800 leading-relaxed space-y-6 mb-12 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <p className="max-w-3xl mx-auto">
                L'agence ne prend pas tous les mandats. Cette sélectivité n'est pas un caprice, 
                mais un choix professionnel assumé. Dire non fait partie du sérieux professionnel.
              </p>
              <p className="max-w-3xl mx-auto">
                Cette sélectivité protège le client : elle garantit que l'agence peut réellement 
                accompagner le projet avec efficacité. Accepter un mandat qu'on sait difficile 
                à vendre ne sert ni le vendeur, ni l'agence.
              </p>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-xl relative overflow-hidden min-h-[26rem]">
                <AnimatePresence initial={false}>
                  {!selectiveToggleOn ? (
                    <motion.article
                      key="accepte"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="agence-accepte-approche"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-emerald-300" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✓</span>
                        </div>
                        <h3 id="agence-accepte-approche" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          L'agence accepte
                        </h3>
                      </div>
                      <ul className="flex flex-col items-center gap-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Les projets avec un prix cohérent avec le marché réel
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.1}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Les vendeurs réfléchis, ouverts à l'analyse et à la discussion
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.2}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Les projets structurés, avec des objectifs clairs
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.3}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Les situations où l'agence peut apporter une valeur réelle
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  ) : (
                    <motion.article
                      key="refuse"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-400 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="agence-refuse-approche"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✗</span>
                        </div>
                        <h3 id="agence-refuse-approche" className="text-xl font-bold text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Cette agence n'accepte pas
                        </h3>
                      </div>
                      <ul className="flex flex-col items-center gap-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Les prix irréalistes, déconnectés du marché
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.1}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Les mandats simples sans analyse préalable
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.2}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Les projets flous ou non aboutis
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.3}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Les situations où l'agence ne peut pas apporter de valeur
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={selectiveToggleOn}
                  aria-label={selectiveToggleOn ? 'Désactiver' : 'Activer'}
                  onClick={() => setSelectiveToggleOn((prev) => !prev)}
                  className={`relative inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors duration-300 ease-out w-[5rem] h-8 ${selectiveToggleOn ? 'bg-red-500' : 'bg-emerald-300'}`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span
                    className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-[transform] duration-300 ease-out"
                    style={{ transform: selectiveToggleOn ? 'translateX(calc(5rem - 1.5rem - 0.5rem))' : 'translateX(0)' }}
                  />
                  <span className="sr-only">{selectiveToggleOn ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-lg text-gray-700 italic max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette sélectivité est un choix assumé. Elle garantit un accompagnement de qualité 
                pour chaque projet accepté.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Section Transparence et suivi */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="transparence-suivi">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="transparence-suivi" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Transparence et suivi
              </h2>
            </div>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg border border-gray-200">
              <div className="text-lg text-gray-800 leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
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
                <div className="bg-stone-50 border-l-4 pl-6 py-4 mt-6" style={{ borderColor: '#000000' }}>
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

      {/* Section À qui s'adresse cette approche — design toggle comme Une approche sélective */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white" aria-labelledby="qui-sadresse-approche">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="w-16 h-1 bg-black mb-6 mx-auto" style={{ backgroundColor: '#000000' }} aria-hidden="true" role="presentation"></div>
              <h2 id="qui-sadresse-approche" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight uppercase text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                À qui s'adresse cette approche
              </h2>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-xl relative overflow-hidden min-h-[30rem]">
                <AnimatePresence initial={false}>
                  {!quiToggleOn ? (
                    <motion.article
                      key="adaptee"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-300 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="approche-adaptee-si"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 bg-emerald-300" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✓</span>
                        </div>
                        <h3 id="approche-adaptee-si" className="text-xl font-bold text-center text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Cette approche est adaptée si
                        </h3>
                      </div>
                      <ul className="flex flex-col items-center gap-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Vous souhaitez vendre avec une vision claire et réaliste du marché
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.1}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Vous êtes ouvert à l'analyse et à la discussion sur le prix
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.2}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Vous privilégiez la méthode à la précipitation
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.3}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Vous recherchez un accompagnement structuré et transparent
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.4}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-emerald-300 px-5 py-2.5 text-center text-gray-900 text-sm font-medium">
                              Vous comprenez qu'un projet immobilier nécessite du temps et de la réflexion
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  ) : (
                    <motion.article
                      key="pas-adaptee"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
                      className="absolute left-0 top-0 w-full bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 cursor-pointer group hover:border-gray-400 hover:shadow-xl transition-shadow duration-300"
                      role="article"
                      aria-labelledby="approche-pas-adaptee-si"
                    >
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-red-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" role="presentation">
                          <span className="text-white text-xl" aria-hidden="true">✗</span>
                        </div>
                        <h3 id="approche-pas-adaptee-si" className="text-xl font-bold text-black text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Cette approche n'est pas adaptée si
                        </h3>
                      </div>
                      <ul className="flex flex-col items-center gap-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }} role="list">
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Vous souhaitez &quot;tester le marché&quot; sans engagement réel
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.1}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Vous refusez toute remise en question du prix envisagé
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.2}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Vous recherchez une validation plutôt qu'une analyse objective
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.3}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Vous comparez plusieurs agences uniquement sur des promesses de prix
                            </span>
                          </li>
                        </AnimatedContent>
                        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} threshold={0.2} delay={0.4}>
                          <li className="w-full flex justify-center" role="listitem">
                            <span className="inline-block rounded-full bg-red-500 px-5 py-2.5 text-center text-white text-sm font-medium">
                              Vous privilégiez la rapidité à la méthode
                            </span>
                          </li>
                        </AnimatedContent>
                      </ul>
                    </motion.article>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={quiToggleOn}
                  aria-label={quiToggleOn ? 'Désactiver' : 'Activer'}
                  onClick={() => setQuiToggleOn((prev) => !prev)}
                  className={`relative inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors duration-300 ease-out w-[5rem] h-8 ${quiToggleOn ? 'bg-red-500' : 'bg-emerald-300'}`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span
                    className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-[transform] duration-300 ease-out"
                    style={{ transform: quiToggleOn ? 'translateX(calc(5rem - 1.5rem - 0.5rem))' : 'translateX(0)' }}
                  />
                  <span className="sr-only">{quiToggleOn ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-lg text-gray-700 italic max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Cette qualification permet de s'assurer que l'approche correspond aux attentes 
                et aux besoins réels du projet.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* CTA Final d'orientation — même design que page à propos, texte notre approche */}
      <section className="relative min-h-screen flex items-center justify-center" aria-labelledby="cta-final-orientation">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/modern.webp"
              alt="L'Agence YL - Notre approche immobilière"
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
              <h2 id="cta-final-orientation" className="sr-only">Découvrir les services de l'agence immobilière</h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed px-2 mb-8 sm:mb-12 uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Si cette approche correspond à votre projet, vous pouvez poursuivre votre réflexion en découvrant nos services.
              </p>
            </FadeContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    href="/vente"
                    aria-label="Accéder au service de vente immobilière"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Accéder au service Vente</span>
                  </a>
                </div>
              </div>
              <div className="group/cta relative flex flex-col border border-white/60 px-8 py-6 md:px-10 md:py-8 rounded-3xl backdrop-blur-sm bg-white/5 transition-all duration-500 hover:border-white/90 hover:shadow-lg hover:shadow-white/10">
                <div className="flex justify-center w-full">
                  <a
                    href="/estimation"
                    aria-label="Demander une estimation immobilière gratuite"
                    className="group relative inline-flex items-center text-white font-medium transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                      textDecoration: 'none',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Demander une estimation</span>
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
