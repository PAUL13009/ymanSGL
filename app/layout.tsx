import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ProximityProvider } from '@/components/ProximityProvider'

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
        <ProximityProvider>
          {children}
        </ProximityProvider>
      </body>
    </html>
  )
}

