import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estimation immobilière Marseille | Méthode sérieuse et humaine',
  description: 'Estimation immobilière Marseille : méthode humaine et contextualisée pour votre appartement ou maison. Analyse du marché réel, prix cohérent et recommandation argumentée. Demandez votre pré-analyse.',
  keywords: 'estimation immobilière Marseille, estimation appartement Marseille, estimation maison Marseille, estimer un bien immobilier à Marseille, prix immobilier Marseille, estimation bien immobilier Marseille',
  openGraph: {
    title: 'Estimation immobilière Marseille | Méthode sérieuse et humaine',
    description: 'Estimation immobilière Marseille : méthode humaine et contextualisée pour votre appartement ou maison. Analyse du marché réel, prix cohérent et recommandation argumentée.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/estimation',
    siteName: "L'Agence YL",
  },
  alternates: {
    canonical: 'https://www.agence-yl.fr/estimation',
  },
}

export default function EstimationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "L'Agence Y L",
            "description": "Agence immobilière à Marseille spécialisée dans l'estimation immobilière sérieuse et humaine",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Marseille",
              "addressCountry": "FR"
            },
            "areaServed": {
              "@type": "City",
              "name": "Marseille"
            },
            "serviceType": "Estimation immobilière",
            "priceRange": "$$"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Estimation immobilière",
            "provider": {
              "@type": "LocalBusiness",
              "name": "L'Agence Y L",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Marseille",
                "addressCountry": "FR"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": "Marseille"
            },
            "description": "Estimation immobilière humaine et contextualisée pour appartements et maisons à Marseille. Analyse du marché réel, prix cohérent et recommandation argumentée."
          })
        }}
      />
    </>
  )
}

