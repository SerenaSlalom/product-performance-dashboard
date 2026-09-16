import { Sparkles } from 'lucide-react'
import { RETURN_COST_IMPACT } from '../utils/dataHelpers'

const TONE_CLASS = {
  danger: 'text-danger',
  warning: 'text-warning',
}

export default function CostImpactCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <p className="font-display text-[16px] font-semibold text-ink">Cost Impact</p>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-muted">Annual Return Cost</p>
      <p className="font-display mt-1 text-[34px] font-bold leading-none tracking-tight text-ink">
        {RETURN_COST_IMPACT.annualReturnCost}
      </p>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Potential Annual Savings</p>
          <p className="text-[15px] font-bold text-success">{RETURN_COST_IMPACT.potentialSavings}</p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-inset-deep">
          <div
            className="h-full rounded-full bg-success"
            style={{ width: `${RETURN_COST_IMPACT.recoverablePct}%` }}
          />
        </div>
        <p className="mt-1.5 text-[12.5px] text-muted">
          {RETURN_COST_IMPACT.recoverablePct}% of total return cost recoverable
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {RETURN_COST_IMPACT.breakdown.map((item) => (
          <div key={item.label} className="rounded-xl bg-surface-inset px-3.5 py-3">
            <p className="text-[12px] text-muted">{item.label}</p>
            <p className={`mt-1 text-[18px] font-bold ${TONE_CLASS[item.tone]}`}>{item.pct}%</p>
            <p className="text-[12px] text-muted">{item.amount}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#EEEBFF] px-3.5 py-3">
        <Sparkles size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#6D5DFC]" />
        <p className="text-[12.5px] leading-snug text-ink">
          <span className="font-semibold">Top action:</span> {RETURN_COST_IMPACT.topAction}
        </p>
      </div>
    </div>
  )
}
