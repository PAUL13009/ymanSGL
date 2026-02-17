'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import FadeContent from './FadeContent'

export default function StatsSection() {
  const [expandedBar, setExpandedBar] = useState<number | null>(null)
  const [mobileRevealedBars, setMobileRevealedBars] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  const setBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    barRefs.current[index] = el
  }, [])

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // IntersectionObserver pour ouverture séquentielle sur mobile
  useEffect(() => {
    if (!isMobile) {
      setMobileRevealedBars(new Set())
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const barIndex = Number(entry.target.getAttribute('data-bar-index'))
            if (!isNaN(barIndex)) {
              // Délai séquentiel basé sur l'index pour un effet cascade
              setTimeout(() => {
                setMobileRevealedBars((prev) => {
                  const next = new Set(prev)
                  next.add(barIndex)
                  return next
                })
              }, barIndex * 300)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    barRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [isMobile])

  const items = [
    { num: '0001', title: 'La Valeur Réelle', content: 'LE PRIX DU MARCHE BASÉ SUR DES MÉTHODES D\'ESTIMATION PRÉCISES RECONNUES (COMPARATIVE, CAPITALISATION, SOL, CONSTRUCTION ET VALEUR VÉNALE).' },
    { num: '0002', title: 'Accès aux "Ventes Réelles"', content: 'NOUS ANALYSONS LES PRIX DE VENTE RÉCENTS AVEC DES DONNÉES OFFICIELLES, PAS SEULEMENT LES PRIX D\'AFFICHAGE.' },
    { num: '0003', title: 'Vente Rapide et Fluide', content: 'EN FIXANT LE JUSTE PRIX DÈS LE DÉPART, NOUS CRÉONS UN CLIMAT DE CONFIANCE QUI LIMITE LA NÉGOCIATION ET ACCÉLÈRE LA DÉCISION.' },
    { num: '0004', title: 'Sécurisation Totale', content: 'NOUS PRÉPARONS VOTRE DOSSIER POUR QU\'AUCUNE CONDITION SUSPENSIVE NE VIENNE BLOQUER LA VENTE.' },
  ]

  const colors = [
    'rgba(255, 255, 255, 0.05)',
    'rgba(255, 255, 255, 0.12)',
    'rgba(255, 255, 255, 0.16)',
    'rgba(255, 255, 255, 0.22)',
  ]

  return (
    <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 font-sans relative z-10" aria-labelledby="estimation-comparison" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        {/* Header — titre et sous-titre à gauche */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm text-white/50 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>0 - 4</p>
              <h2 id="estimation-comparison" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Pourquoi une estimation gratuite peut vous coûter cher ?
              </h2>
              <p className="text-lg text-white/70 mt-4 max-w-xl uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                À Saint-Germain-en-Laye, l'approximation ne pardonne pas. Choisissez la certitude de l'Estimation YL.
              </p>
            </div>
          </div>
        </div>

        {/* Process Bars */}
        <div className="w-full">
          {items.map((item, index) => {
            const isExpandedDesktop = expandedBar === index
            const isExpandedMobile = mobileRevealedBars.has(index)
            const isExpanded = isMobile ? isExpandedMobile : isExpandedDesktop

            return (
              <div
                key={index}
                ref={(el) => setBarRef(el, index)}
                data-bar-index={index}
                className="w-full cursor-pointer overflow-hidden transition-all duration-700 ease-in-out"
                style={{
                  backgroundColor: colors[index],
                  height: isExpanded ? '260px' : '70px',
                }}
                onMouseEnter={!isMobile ? () => setExpandedBar(index) : undefined}
                onMouseLeave={!isMobile ? () => setExpandedBar(null) : undefined}
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-white transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>↓</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/10 leading-none select-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {item.num}
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-700 ease-in-out"
                    style={{ maxHeight: isExpanded ? '120px' : '0px', opacity: isExpanded ? 1 : 0 }}
                  >
                    <p className="text-base md:text-lg text-white/80 leading-relaxed mt-4 max-w-3xl" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </FadeContent>
    </section>
  )
}
