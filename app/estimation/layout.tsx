import type { Metadata } from 'next'

const PREVIEW =
  'Mon dossier d’estimation immobilière en ligne / Prix réel du marché'

export const metadata: Metadata = {
  title: PREVIEW,
  description: PREVIEW,
  alternates: {
    canonical: 'https://www.lagenceyl.fr/estimation',
  },
  openGraph: {
    title: PREVIEW,
    description: PREVIEW,
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.lagenceyl.fr/estimation',
  },
}

export default function EstimationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
