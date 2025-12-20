'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import VariableProximity from './VariableProximity'

export default function Navbar() {
  const containerRef = null
  const [scrolled, setScrolled] = useState(false)
  const [isOnHero, setIsOnHero] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      setScrolled(scrollY > 20)
      setIsOnHero(scrollY < 50) // L'effet se déclenche dès qu'on commence à scroller (dès que scrollY > 50px)
    }
    
    // Vérifier l'état initial
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      scrolled ? 'bg-stone-50 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ease-out ${
          isOnHero ? 'h-24' : 'h-20'
        }`}>
          <div className="flex-1"></div>
          <div className={`hidden md:flex items-center transition-all duration-500 ease-out ${
            isOnHero ? 'space-x-8' : 'space-x-6'
          }`}>
            <a href="/" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="Accueil"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="#a-propos" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="À propos"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="#services" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="Services"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="#a-vendre" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="À vendre"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="/" className="flex items-center justify-center">
              <Image
                src="/images/Logo-removebg-preview.png"
                alt="L'Agence Y L"
                width={isOnHero ? 120 : 100}
                height={isOnHero ? 120 : 100}
                className="transition-all duration-500 ease-out"
                priority
              />
            </a>
            <a href="#a-louer" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="À louer"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="#estimation" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="Estimation"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="#equipe" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="Équipe"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
            <a href="#contact" className={`transition-all duration-500 ease-out hover:opacity-80 text-white ${
              isOnHero ? 'text-lg' : 'text-base'
            }`}>
              <VariableProximity
                label="Contact"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 600"
                containerRef={null}
                radius={60}
                falloff="linear"
              />
            </a>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </nav>
  )
}

