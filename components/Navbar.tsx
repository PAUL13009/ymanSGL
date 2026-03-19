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
    { label: 'Mon dossier d\'estimation', link: '/estimation', ariaLabel: 'Aller à la page Mon dossier d\'estimation' },
    { label: 'Vendre à Saint-Germain-en-Laye & Environs', link: '/vente', ariaLabel: 'Vendre à Saint-Germain-en-Laye et environs' },
    { label: 'Louer à Saint-Germain-en-Laye & Environs', link: '/location', ariaLabel: 'Louer à Saint-Germain-en-Laye et environs' },
    { label: 'Notre Méthode', link: '/notre-methode', ariaLabel: 'Aller à la page Notre méthode' },
    { label: 'Notre Sélection', link: '/catalogue', ariaLabel: 'Aller à notre sélection des biens' },
    { label: 'A propos', link: '/a-propos', ariaLabel: 'Aller à la page A propos' },
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
            {menuItems.map((it, idx) => {
              const isActive = it.link === '/' ? pathname === '/' : pathname === it.link || pathname.startsWith(it.link + '/')
              return (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                <a
                  className={`sm-panel-item${isActive ? ' sm-panel-item--active' : ''}`}
                  href={it.link}
                  aria-label={it.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
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
            )
            })}
          </ul>

          <div className="sm-socials">
            <div className="sm-socials-icons">
              <a
                href="https://wa.me/33600000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="sm-social-icon sm-social-whatsapp"
                onClick={() => {
                  setMenuOpen(false)
                  playClose()
                  animateIcon(false)
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/lagenceyl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="sm-social-icon sm-social-instagram"
                onClick={() => {
                  setMenuOpen(false)
                  playClose()
                  animateIcon(false)
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/lagenceyl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="sm-social-icon sm-social-linkedin"
                onClick={() => {
                  setMenuOpen(false)
                  playClose()
                  animateIcon(false)
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

