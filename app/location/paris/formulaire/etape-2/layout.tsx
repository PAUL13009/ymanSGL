import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulaire Location Paris | Étape 2 - L\'Agence YL',
  description: 'Formulaire de recherche de locataire à Paris. Étape 2 : détails du bien à louer.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/location/paris/formulaire/etape-2',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LocationParisEtape2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
