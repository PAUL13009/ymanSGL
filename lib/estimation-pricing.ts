/** Tarifs TTC des formules d'estimation (grille + formulaires étape 1). */
export const ESTIMATION_FORMULES = {
  essentielle: {
    label: 'Estimation Essentielle',
    prixEuros: '59',
    cardTitle: 'Essentielle',
  },
  urbain: {
    label: 'Estimation Urbain',
    prixEuros: '99',
    cardTitle: 'Urbain',
  },
  investisseur: {
    label: 'Estimation Investisseur',
    prixEuros: '119',
    cardTitle: 'Investisseur',
  },
  juridique: {
    label: 'Estimation Juridique',
    prixEuros: '139',
    cardTitle: 'Professionnels du droit',
  },
} as const

export type EstimationFormuleKey = keyof typeof ESTIMATION_FORMULES

export function formatPrixTTC(prixEuros: string): string {
  return `${prixEuros}€`
}
