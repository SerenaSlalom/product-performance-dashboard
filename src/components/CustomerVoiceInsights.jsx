import { useState } from 'react'
import { Star, ArrowRight } from 'lucide-react'
import { CUSTOMER_VOICE, ACTIVE_SEASON } from '../utils/dataHelpers'

export default function CustomerVoiceInsights({ onViewBreakdown }) {
  const [activeTone, setActiveTone] = useState(CUSTOMER_VOICE.tones[0].key)
  const tone = CUSTOMER_VOICE.tones.find((t) => t.key === activeTone)
  const roundedRating = Math.round(CUSTOMER_VOICE.avgRating)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-semibold text-ink">Customer Voice Insights</p>
          <p className="mt-1 text-[13px] text-muted">
            {CUSTOMER_VOICE.reviewsAnalyzed.toLocaleString()} reviews analyzed · {ACTIVE_SEASON}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={0}
                className={i < roundedRating ? 'fill-warning text-warning' : 'fill-border text-border'}
              />
            ))}
          </div>
          <p className="text-[15px] font-bold text-ink">
            {CUSTOMER_VOICE.avgRating.toFixed(1)} <span className="text-[13px] font-medium text-muted">/ 5</span>
          </p>
          <button
            type="button"
            onClick={onViewBreakdown}
            className="inline-flex items-center gap-1 rounded-full border border-[#6D5DFC]/30 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#6D5DFC] hover:bg-[#6D5DFC]/5"
          >
            View full breakdown
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {CUSTOMER_VOICE.tones.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTone(t.key)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
              activeTone === t.key ? 'text-ink' : 'border-border text-muted hover:text-ink'
            }`}
            style={activeTone === t.key ? { borderColor: t.color, backgroundColor: `${t.color}14` } : undefined}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tone.themes.map((theme) => (
          <div key={theme.title} className="rounded-xl bg-surface-inset px-4 py-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13.5px] font-semibold text-ink">{theme.title}</p>
              <span className="text-[12px] font-semibold" style={{ color: tone.color }}>
                {theme.delta}
              </span>
            </div>
            <p className="mt-1 text-[22px] font-bold" style={{ color: tone.color }}>
              {theme.value}
            </p>
            <p className="mt-1 text-[12px] text-muted">Products: {theme.products}</p>
            <p className="text-[12px] text-muted">Sizes: {theme.sizes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
