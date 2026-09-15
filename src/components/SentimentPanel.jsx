import { Star } from 'lucide-react'
import { getSentimentTone } from '../utils/dataHelpers'

const TONE_TEXT = {
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export default function SentimentPanel({ reviews }) {
  const tone = getSentimentTone(reviews.avg_rating)

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-muted">Review sentiment</p>
        <div className="flex items-center gap-1">
          <Star size={15} className={TONE_TEXT[tone]} fill="currentColor" strokeWidth={0} />
          <span className="font-mono-tab text-[14px] font-semibold text-ink">{reviews.avg_rating.toFixed(1)}</span>
          <span className="text-[12px] text-muted">({reviews.count} reviews)</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-success">Positive themes</p>
          <ul className="mt-1.5 space-y-1">
            {reviews.positive_themes.map((theme) => (
              <li key={theme} className="text-[12.5px] leading-snug text-ink">
                {theme}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-danger">Negative themes</p>
          <ul className="mt-1.5 space-y-1">
            {reviews.negative_themes.map((theme) => (
              <li key={theme} className="text-[12.5px] leading-snug text-ink">
                {theme}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {reviews.excerpts.map((excerpt, i) => (
          <div key={i} className="rounded-xl bg-surface-inset px-3 py-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={11}
                  className={idx < excerpt.rating ? 'text-ink' : 'text-border'}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <p className="mt-1 text-[12.5px] italic leading-snug text-muted">&ldquo;{excerpt.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  )
}
