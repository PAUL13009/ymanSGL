import { ESTIMATION_FORMULES, type EstimationFormuleKey } from '@/lib/estimation-pricing'

type Props = {
  formule: EstimationFormuleKey
}

const fontStyle = { fontFamily: 'var(--font-poppins), sans-serif' }

export default function FormulaireFormuleBanner({ formule }: Props) {
  const { label, prixEuros } = ESTIMATION_FORMULES[formule]

  return (
    <div
      className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 sm:px-8 sm:py-6 text-left backdrop-blur-sm"
      aria-label={`${label}, tarif`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="space-y-1">
          <p
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/45"
            style={fontStyle}
          >
            Formule sélectionnée
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight" style={fontStyle}>
            {label}
          </p>
        </div>
        <div className="flex items-baseline gap-2 shrink-0 sm:ml-auto">
          <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums" style={fontStyle}>
            {prixEuros}€
          </span>
          <span className="text-sm font-normal text-white/75" style={fontStyle}>
            TTC
          </span>
        </div>
      </div>
    </div>
  )
}
