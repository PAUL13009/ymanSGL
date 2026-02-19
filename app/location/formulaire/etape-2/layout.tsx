import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulaire recherche de locataire | Étape 2 - L\'Agence YL',
  description: 'Formulaire de recherche de locataire à Saint-Germain-en-Laye. Étape 2 : détails du bien à louer.',
  alternates: {
    canonical: 'https://www.lagenceyl.fr/location/formulaire/etape-2',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LocationEtape2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
