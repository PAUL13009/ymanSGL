import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos de l\'agence immobilière Marseille | L\'Agence YL - Histoire et méthode',
  description: 'Agence immobilière indépendante à Marseille depuis 4 ans. Méthode exigeante, sélectivité assumée, expertise locale 6e-15e arrondissements. Accompagnement personnalisé par la fondatrice Yman Lahlou.',
  alternates: {
    canonical: 'https://www.agence-yl.fr/a-propos',
  },
  openGraph: {
    title: 'À propos de l\'agence immobilière Marseille | L\'Agence YL',
    description: 'Agence immobilière indépendante à Marseille depuis 4 ans. Méthode exigeante, sélectivité assumée, expertise locale 6e-15e arrondissements.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/a-propos',
  },
}

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
