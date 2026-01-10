import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estimation immobilière gratuite Marseille | Prix réel du marché - L\'Agence YL',
  description: 'Estimation immobilière gratuite à Marseille basée sur les ventes réelles du marché. Analyse précise du bien et du secteur pour un prix vendable et réaliste. Expertise 6e-15e arrondissements.',
  alternates: {
    canonical: 'https://www.agence-yl.fr/estimation',
  },
  openGraph: {
    title: 'Estimation immobilière gratuite Marseille | Prix réel du marché',
    description: 'Estimation immobilière gratuite à Marseille basée sur les ventes réelles du marché. Analyse précise du bien et du secteur pour un prix vendable et réaliste.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/estimation',
  },
}

export default function EstimationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
