import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services immobiliers Marseille | Estimation, vente et location - L\'Agence YL',
  description: 'Services immobiliers à Marseille : estimation gratuite, vente accompagnée, location encadrée. Approche structurée et sélective pour projets immobiliers cohérents. Expertise locale 6e-15e arrondissements.',
  alternates: {
    canonical: 'https://www.agence-yl.fr/services',
  },
  openGraph: {
    title: 'Services immobiliers Marseille | Estimation, vente et location - L\'Agence YL',
    description: 'Services immobiliers à Marseille : estimation gratuite, vente accompagnée, location encadrée. Approche structurée et sélective pour projets immobiliers cohérents.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
