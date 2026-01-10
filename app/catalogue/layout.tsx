import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalogue biens immobiliers Marseille | Vente et location - L\'Agence YL',
  description: 'Catalogue de biens immobiliers à vendre et à louer à Marseille. Sélection rigoureuse de propriétés étudiées et accompagnées selon notre approche. Expertise 6e-15e arrondissements.',
  alternates: {
    canonical: 'https://www.agence-yl.fr/catalogue',
  },
  openGraph: {
    title: 'Catalogue biens immobiliers Marseille | Vente et location',
    description: 'Catalogue de biens immobiliers à vendre et à louer à Marseille. Sélection rigoureuse de propriétés étudiées et accompagnées selon notre approche.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/catalogue',
  },
}

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
