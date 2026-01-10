import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Location immobilière Marseille | Gestion locative et sélection de locataires - L\'Agence YL',
  description: 'Service de location immobilière à Marseille : accompagnement structuré pour propriétaires, sélection rigoureuse des locataires, gestion encadrée et transparente. Expertise 6e-15e arrondissements.',
  alternates: {
    canonical: 'https://www.agence-yl.fr/location',
  },
  openGraph: {
    title: 'Location immobilière Marseille | Gestion locative et sélection de locataires',
    description: 'Service de location immobilière à Marseille : accompagnement structuré pour propriétaires, sélection rigoureuse des locataires, gestion encadrée et transparente.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/location',
  },
}

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
