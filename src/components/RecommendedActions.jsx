import { Sparkles } from 'lucide-react'
import { RECOMMENDED_ACTIONS } from '../utils/dataHelpers'

const PRIORITY_CLASS = {
  High: 'bg-danger/10 text-danger',
  Medium: 'bg-warning/15 text-[#966400]',
}

export default function RecommendedActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-semibold text-ink">Recommended Product Actions</p>
          <p className="mt-1 text-[13px] text-muted">Ranked by projected business impact</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#6D5DFC]/10 px-3 py-1.5 text-[12px] font-semibold text-[#6D5DFC]">
          <Sparkles size={13} strokeWidth={2.5} />
          AI-generated
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {RECOMMENDED_ACTIONS.map((action) => (
          <div
            key={action.rank}
            className="rounded-xl border px-4 py-3.5"
            style={{ borderColor: `${action.color}30`, backgroundColor: `${action.color}0D` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: action.color }}
                >
                  {action.rank}
                </span>
                <p className="text-[14px] font-semibold text-ink">{action.title}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide ${PRIORITY_CLASS[action.priority]}`}
              >
                {action.priority}
              </span>
            </div>
            <p className="mt-2 pl-9 text-[12.5px] leading-snug text-muted">{action.description}</p>
            <p
              className="mt-3 ml-9 rounded-lg px-3 py-2 text-[12.5px] font-semibold"
              style={{ backgroundColor: `${action.color}1A`, color: action.color }}
            >
              {action.impact}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
