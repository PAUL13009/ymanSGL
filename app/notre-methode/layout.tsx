import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre approche immobilière Marseille | Méthode, rigueur et transparence - L\'Agence YL',
  description: 'Approche structurée pour projets immobiliers maîtrisés à Marseille. Analyse préalable, méthode exigeante, transparence et suivi personnalisé. Sélectivité assumée pour un accompagnement de qualité.',
  alternates: {
    canonical: 'https://www.agence-yl.fr/notre-methode',
  },
  openGraph: {
    title: 'Notre approche immobilière Marseille | Méthode, rigueur et transparence',
    description: 'Approche structurée pour projets immobiliers maîtrisés à Marseille. Analyse préalable, méthode exigeante, transparence et suivi personnalisé.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.agence-yl.fr/notre-methode',
  },
}

export default function NotreMethodeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
