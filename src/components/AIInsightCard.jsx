import { Sparkles, Check } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function AIInsightCard({ insight, reviewed, onToggleReviewed }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(3,7,18,0.06)]" style={{ borderLeft: '4px solid var(--color-accent)' }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft">
            <Sparkles size={14} strokeWidth={1.75} className="text-ink" />
          </span>
          <p className="font-display text-[15px] font-semibold text-ink">AI Insight</p>
        </div>
        <StatusBadge status={insight.status} />
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">What&rsquo;s happening</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{insight.summary}</p>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Signals driving this</p>
        <ul className="mt-1.5 space-y-1.5">
          {insight.signals.map((signal, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-ink">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink" />
              {signal}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-xl bg-ink p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Recommended action</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">{insight.recommendation}</p>
      </div>

      <button
        type="button"
        onClick={onToggleReviewed}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors ${
          reviewed
            ? 'bg-accent-soft text-ink'
            : 'bg-accent text-ink hover:bg-accent-deep'
        }`}
      >
        <Check size={15} strokeWidth={2.5} />
        {reviewed ? 'Marked as reviewed' : 'Mark as reviewed'}
      </button>
    </div>
  )
}
