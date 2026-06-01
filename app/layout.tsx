import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ProximityProvider } from '@/components/ProximityProvider'
import CustomCursor from '@/components/CustomCursor'
import { CursorProvider } from '@/context/CursorContext'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Agence d\'expertise immobilière Marq | Région parisienne - L\'Agence YL',
  description:
    'Agence d\'expertise immobilière à Marq, en région parisienne. Estimation, vente et location accompagnées. Méthode structurée et analyse de marché pour des projets immobiliers clairs.',
  keywords: [
    'expertise immobilière Marq',
    'agence expertise immobilière région parisienne',
    'estimation immobilière Marq',
    'estimation immobilière Île-de-France',
    'vente immobilière Marq',
    'location immobilière Marq',
    'prix immobilier Marq',
    'marché immobilier local',
    'estimation réaliste bien immobilier',
    'L\'Agence YL',
  ],
  openGraph: {
    title: 'Agence d\'expertise immobilière Marq | Région parisienne - L\'Agence YL',
    description:
      'Agence d\'expertise immobilière à Marq, en région parisienne. Estimation, vente et location accompagnées. Méthode structurée et analyse de marché pour des projets immobiliers clairs.',
    type: 'website',
    locale: 'fr_FR',
    siteName: "L'Agence YL",
  },
  alternates: {
    canonical: 'https://www.lagenceyl.fr',
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
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57WMHVFC');
          `,
        }}
      />
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57WMHVFC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <CursorProvider>
          <CustomCursor />
          <ProximityProvider>
            {children}
          </ProximityProvider>
        </CursorProvider>
      </body>
    </html>
  )
}

