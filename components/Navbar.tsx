'use client'

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { gsap } from 'gsap'
import './StaggeredMenu.css'

export default function Navbar() {
  const containerRef = null
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [isOnHero, setIsOnHero] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })
  
  // Refs pour le menu animé
  const panelRef = useRef<HTMLElement>(null)
  const preLayersRef = useRef<HTMLDivElement>(null)
  const preLayerElsRef = useRef<HTMLElement[]>([])
  const plusHRef = useRef<HTMLSpanElement>(null)
  const plusVRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const spinTweenRef = useRef<gsap.core.Tween | null>(null)
  const busyRef = useRef(false)

  const menuItems = [
    { label: 'Accueil', link: '/', ariaLabel: 'Aller à la page d\'accueil' },
    { label: 'À propos', link: '/a-propos', ariaLabel: 'Aller à la page À propos' },
    { label: 'Notre approche', link: '/notre-methode', ariaLabel: 'Aller à la page Notre approche' },
    { label: 'Services', link: '/services', ariaLabel: 'Aller à la page Services' },
    { label: 'À vendre', link: '/vente', ariaLabel: 'Aller à la page Vente' },
    { label: 'À louer', link: '/location', ariaLabel: 'Aller à la page Location' },
    { label: 'Estimation', link: '/estimation', ariaLabel: 'Aller à la page Estimation' },
    { label: 'Catalogue', link: '/catalogue', ariaLabel: 'Aller au catalogue des biens' },
    { label: 'Devis Personnalisé', link: '/devis-personnalise', ariaLabel: 'Demander un devis personnalisé' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      setScrolled(scrollY > 20)
      setIsOnHero(scrollY < 50)
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Vérifier aussi au montage
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    
    handleScroll()
    handleResize()
    checkMobile()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current
      const plusH = plusHRef.current
      const plusV = plusVRef.current
      const icon = iconRef.current
      if (!panel || !plusH || !plusV || !icon) return

      let preLayers: HTMLElement[] = []
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[]
      }
      preLayerElsRef.current = preLayers

      gsap.set([panel, ...preLayers], { xPercent: 100 })
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 })
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 })
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
    })
    return () => ctx.revert()
  }, [])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return null

    openTlRef.current?.kill()
    if (closeTweenRef.current) {
      closeTweenRef.current.kill()
      closeTweenRef.current = null
    }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[]

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }))
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'))

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 })
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 })
    }

    const tl = gsap.timeline({ paused: true })

    // On n'anime pas les prelayers (même design sur toutes les pages)
    const lastTime = 0
    const panelInsertTime = 0
    const panelDuration = 0.65
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    )

    if (itemEls.length) {
      const itemsStartRatio = 0.15
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      )
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        )
      }
    }

    openTlRef.current = tl
    return tl
  }, [])

  const playOpen = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    const tl = buildOpenTimeline()
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false
      })
      tl.play(0)
    } else {
      busyRef.current = false
    }
  }, [buildOpenTimeline])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null

    const panel = panelRef.current
    if (!panel) return

    // On n'anime que le panel (même design sur toutes les pages)
    const all = [panel]
    closeTweenRef.current?.kill()
    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 })
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[]
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 })
        }
        busyRef.current = false
      }
    })
  }, [])

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current
    if (!icon) return
    spinTweenRef.current?.kill()
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' })
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' })
    }
  }, [])

  // Fonction animateText supprimée car le texte n'est plus utilisé

  const toggleMenu = useCallback(() => {
    const target = !menuOpen
    setMenuOpen(target)
    if (target) {
      playOpen()
    } else {
      playClose()
    }
    animateIcon(target)
  }, [menuOpen, playOpen, playClose, animateIcon])

  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !(event.target as HTMLElement)?.closest('.sm-toggle')
      ) {
        setMenuOpen(false)
        playClose()
        animateIcon(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen, playClose, animateIcon])

  // Détection du curseur à l'extrémité droite pour ouvrir le menu automatiquement (uniquement sur desktop)
  useEffect(() => {
    // Désactiver cette fonctionnalité sur mobile
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      const mouseX = e.clientX
      const threshold = 50 // Distance en pixels depuis le bord droit pour déclencher l'ouverture
      
      // Si le curseur est proche du bord droit (dans les 50px)
      if (mouseX >= windowWidth - threshold && !menuOpen) {
        setMenuOpen(true)
        playOpen()
        animateIcon(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [menuOpen, playOpen, animateIcon, isMobile])

  // Fermeture automatique du menu quand le curseur quitte le menu
  useEffect(() => {
    if (!menuOpen) return

    const panel = panelRef.current
    if (!panel) return

    const handleMouseLeave = () => {
      setMenuOpen(false)
      playClose()
      animateIcon(false)
    }

    panel.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      panel.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [menuOpen, playClose, animateIcon])

  return (
    <div data-open={menuOpen || undefined}>
      {/* Les prelayers ne sont plus affichés pour avoir le même design sur toutes les pages */}
      
      <header 
        className="staggered-menu-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out" 
        role="banner"
        style={{
          background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transform: scrolled && !isOnHero ? 'translateY(-100%)' : 'translateY(0)',
          opacity: scrolled && !isOnHero ? 0 : 1,
          pointerEvents: scrolled && !isOnHero ? 'none' : 'auto',
        }}
      >
        <nav className="sm-logo" style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)', top: 'calc(50% - 10px)', display: 'flex', alignItems: 'center' }} role="navigation" aria-label="Navigation principale">
          <a href="/" aria-label="Accueil - L'Agence YL, agence immobilière à Marseille" className="flex items-center justify-center">
            <Image
              src="/images/Logo-removebg-preview.png"
              alt="Logo L'Agence YL - Agence immobilière à Marseille"
              width={isOnHero ? 100 : 90}
              height={isOnHero ? 100 : 90}
              className="transition-all duration-500 ease-out rounded-full object-cover sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]"
              style={{
                width: isOnHero ? '100px' : '90px',
                height: isOnHero ? '100px' : '90px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              priority
            />
          </a>
        </nav>
        
        <button
          className="sm-toggle"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
          style={{ 
            color: '#ffffff'
          }}
        >
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      {/* Panel menu mobile */}
      <nav
        id="staggered-menu-panel"
        ref={panelRef as any}
        className="staggered-menu-panel"
        aria-hidden={!menuOpen}
        role="navigation"
        aria-label="Menu de navigation"
      >
        {/* Bouton de fermeture mobile uniquement */}
        <button
          className="sm-close-button"
          aria-label="Fermer le menu"
          onClick={() => {
            setMenuOpen(false)
            playClose()
            animateIcon(false)
          }}
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering>
            {menuItems.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                <a
                  className="sm-panel-item"
                  href={it.link}
                  aria-label={it.ariaLabel}
                  data-index={idx + 1}
                  onClick={() => {
                    setMenuOpen(false)
                    playClose()
                    animateIcon(false)
                  }}
                >
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

