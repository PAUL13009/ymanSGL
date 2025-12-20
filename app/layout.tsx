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
  title: 'Le Nid Céleste - Villa en Bambou à Bali',
  description: 'Découvrez Le Nid Céleste, une villa exceptionnelle en bambou nichée au cœur de Bali. Réservez votre séjour paradisiaque.',
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

