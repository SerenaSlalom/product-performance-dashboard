import { Sparkles, ArrowRight } from 'lucide-react'

function Sparkline({ values, color, width = 96, height = 36 }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = width / (values.length - 1)
  const points = values.map((v, i) => [
    i * step,
    height - ((v - min) / range) * (height - 8) - 4,
  ])
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const [lastX, lastY] = points[points.length - 1]

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="shrink-0">
      <path d={path} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3.5" fill={color} />
    </svg>
  )
}

const TONE_COLOR = {
  success: 'var(--color-success)',
  danger: 'var(--color-danger)',
}

export default function InsightKPICard({
  label,
  value,
  valueSuffix,
  badge,
  tone = 'success',
  trend,
  deltaIcon: DeltaIcon,
  deltaText,
  insight,
  footerText,
  onFooterClick,
  onClick,
}) {
  const Wrapper = onClick ? 'button' : 'div'
  const toneTextClass = tone === 'danger' ? 'text-danger' : 'text-success'

  return (
    <Wrapper
      onClick={onClick}
      className={`rounded-2xl p-5 text-left shadow-[0_2px_8px_rgba(3,7,18,0.06)] transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-[0_6px_20px_rgba(3,7,18,0.08)]' : ''
      } ${badge ? 'border border-danger/25 bg-danger/5' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
        {badge && (
          <span className="rounded-full bg-danger/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-danger">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-start justify-between gap-3">
        <p className="font-display text-[30px] font-bold leading-none tracking-tight text-ink">
          {value}
          {valueSuffix && <span className="ml-1 text-[15px] font-medium text-muted">{valueSuffix}</span>}
        </p>
        <Sparkline values={trend} color={TONE_COLOR[tone]} />
      </div>

      <p className={`mt-2 flex items-center gap-1 text-[12.5px] font-semibold ${toneTextClass}`}>
        {DeltaIcon && <DeltaIcon size={13} strokeWidth={2.5} />}
        {deltaText}
        <span className="font-normal text-muted">&nbsp;vs prior period</span>
      </p>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-surface-inset px-3 py-2.5">
        <Sparkles size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-accent-deep" />
        <p className="text-[12.5px] leading-snug text-ink">{insight}</p>
      </div>

      {onFooterClick ? (
        <button
          type="button"
          onClick={onFooterClick}
          className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent-deep hover:underline"
        >
          {footerText}
          <ArrowRight size={13} />
        </button>
      ) : (
        <p className={`mt-3 text-[12.5px] font-semibold ${toneTextClass}`}>{footerText}</p>
      )}
    </Wrapper>
  )
}
