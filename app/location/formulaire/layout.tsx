import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulaire recherche de locataire | Étape 1 - L\'Agence YL',
  description: 'Formulaire de recherche de locataire à Saint-Germain-en-Laye. Étape 1 : vos coordonnées.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/location/formulaire',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LocationFormulaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
