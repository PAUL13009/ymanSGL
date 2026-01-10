import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ProximityProvider } from '@/components/ProximityProvider'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Agence immobilière Marseille | Estimation, vente et location - L\'Agence YL',
  description: 'Agence immobilière Marseille : estimation immobilière gratuite, vente et location accompagnées. Expertise locale, méthode structurée pour projets immobiliers clairs à Marseille et environs.',
  keywords: [
    'estimation immobilière Marseille',
    'vente immobilière Marseille',
    'agence immobilière 6e arrondissement',
    'estimation bien immobilier Vauban',
    'vendre appartement Marseille',
    'vendre maison Marseille',
    'prix immobilier Marseille',
    'marché immobilier local',
    'vendeur particulier Marseille',
    'estimation réaliste bien immobilier'
  ],
  openGraph: {
    title: 'Agence immobilière Marseille | Estimation, vente et location - L\'Agence YL',
    description: 'Agence immobilière Marseille : estimation immobilière gratuite, vente et location accompagnées. Expertise locale, méthode structurée pour projets immobiliers clairs à Marseille et environs.',
    type: 'website',
    locale: 'fr_FR',
    siteName: "L'Agence YL",
  },
  alternates: {
    canonical: 'https://www.agence-yl.fr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/Logo-removebg-preview.png',
    shortcut: '/images/Logo-removebg-preview.png',
    apple: '/images/Logo-removebg-preview.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <ProximityProvider>
          {children}
        </ProximityProvider>
      </body>
    </html>
  )
}

