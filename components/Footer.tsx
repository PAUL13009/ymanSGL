'use client'

import Image from 'next/image'
import VariableProximity from './VariableProximity'

export default function Footer() {
  const containerRef = null
  return (
    <footer className="bg-white text-gray-900 py-8 sm:py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo centré */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Image
            src="/images/Logo-removebg-preview.png"
            alt="Logo L'Agence YL - Agence immobilière à Marseille"
            width={200}
            height={200}
            className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
            style={{
              width: '128px',
              height: '128px'
            }}
            priority
          />
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm mb-4">
          <p>
            <VariableProximity
              label={`© ${new Date().getFullYear()} L'Agence Y L. Tous droits réservés.`}
              fromFontVariationSettings="'wght' 200"
              toFontVariationSettings="'wght' 300"
              containerRef={null}
              radius={60}
              falloff="linear"
            />
          </p>
        </div>
        
        {/* Lien Espace Admin */}
        <div className="text-center">
          <a
            href="/admin/login"
            aria-label="Accéder à l'espace administrateur"
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Espace Admin
          </a>
        </div>
      </div>
    </footer>
  )
}

