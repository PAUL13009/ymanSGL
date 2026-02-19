import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulaire Location Paris | Étape 1 - L\'Agence YL',
  description: 'Formulaire de recherche de locataire à Paris. Étape 1 : vos coordonnées.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/location/paris/formulaire',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LocationParisFormulaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
