import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vente immobilière Marseille | Méthode sérieuse et exigeante',
  description: 'Vente immobilière Marseille : méthode structurée pour vendre votre appartement ou maison au bon prix. Analyse du marché réel, stratégie claire, suivi personnalisé. Évitez les ventes ratées.',
  keywords: 'vente immobilière Marseille, vendre un bien immobilier à Marseille, vente appartement Marseille, vente maison Marseille, agence immobilière vente Marseille, vendre son bien à Marseille',
  openGraph: {
    title: 'Vente immobilière Marseille | Méthode sérieuse et exigeante',
    description: 'Vente immobilière Marseille : méthode structurée pour vendre votre appartement ou maison au bon prix. Analyse du marché réel, stratégie claire, suivi personnalisé.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/vente',
    siteName: "L'Agence YL",
  },
  alternates: {
    canonical: 'https://www.agence-yl.fr/vente',
  },
}

export default function VenteLayout({
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
            "description": "Agence immobilière à Marseille spécialisée dans la vente immobilière avec méthode structurée et exigeante",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Marseille",
              "addressCountry": "FR"
            },
            "areaServed": {
              "@type": "City",
              "name": "Marseille"
            },
            "serviceType": "Vente immobilière",
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
            "serviceType": "Vente immobilière",
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
            "description": "Vente immobilière à Marseille avec méthode structurée : analyse du bien, positionnement prix, stratégie de mise en vente, suivi et ajustements. Pour vendre votre appartement ou maison au bon prix."
          })
        }}
      />
    </>
  )
}




