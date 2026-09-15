const CHART_HEIGHT = 84
const LABEL_HEADROOM = 40

export default function TrendKPICard({
  label,
  icon: Icon,
  accent = false,
  values,
  labels,
  target,
  color,
  formatValue = (v) => `${v}%`,
  sublabel,
  onClick,
}) {
  const Wrapper = onClick ? 'button' : 'div'
  const max = Math.max(...values, target ?? 0) * 1.2 || 1
  const barHeights = values.map((v) => Math.max((v / max) * CHART_HEIGHT, 3))
  const targetTop = target != null ? CHART_HEIGHT - (target / max) * CHART_HEIGHT : null
  const currentIndex = values.length - 1

  const trackColor = accent ? 'rgba(255,255,255,0.16)' : 'var(--color-border)'
  const labelColor = accent ? 'text-white/50' : 'text-muted'
  const valueColor = accent ? 'text-white' : 'text-ink'
  const targetColor = accent ? 'var(--color-accent)' : 'var(--color-accent-deep)'

  return (
    <Wrapper
      onClick={onClick}
      className={`rounded-2xl p-6 text-left shadow-[0_2px_8px_rgba(3,7,18,0.06)] transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-[0_6px_20px_rgba(3,7,18,0.08)]' : ''
      } ${accent ? 'bg-ink text-white' : 'bg-white text-ink'}`}
    >
      <div className="flex items-start justify-between">
        <p className={`text-[13px] font-medium ${accent ? 'text-white/60' : 'text-muted'}`}>{label}</p>
        {Icon && (
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              accent ? 'bg-white/10' : 'bg-surface-inset'
            }`}
          >
            <Icon size={16} strokeWidth={1.75} className={accent ? 'text-accent' : 'text-ink'} />
          </span>
        )}
      </div>

      <div className="relative mt-2" style={{ height: CHART_HEIGHT + LABEL_HEADROOM }}>
        {targetTop != null && (
          <div
            className="absolute inset-x-0 border-t border-dashed"
            style={{ bottom: (target / max) * CHART_HEIGHT }}
            title={`Plan ${formatValue(target)}`}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3">
          {values.map((v, i) => {
            const isCurrent = i === currentIndex
            return (
              <div key={labels[i] ?? i} className="relative flex flex-1 flex-col items-center">
                {isCurrent && (
                  <span
                    className={`font-display absolute whitespace-nowrap text-[26px] font-bold leading-none tracking-tight ${valueColor}`}
                    style={{ bottom: barHeights[i] + 10 }}
                  >
                    {formatValue(v)}
                  </span>
                )}
                <div
                  className="w-full max-w-[40px] rounded-md transition-[height]"
                  style={{ height: barHeights[i], backgroundColor: isCurrent ? color : trackColor }}
                  title={`${labels[i]} ${formatValue(v)}`}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        {labels.map((l, i) => (
          <span
            key={l}
            className={`flex-1 text-center text-[10.5px] font-semibold uppercase tracking-wide ${
              i === currentIndex ? valueColor : labelColor
            }`}
          >
            {l}
          </span>
        ))}
      </div>

      {sublabel && <p className={`mt-3 text-[13px] ${accent ? 'text-white/70' : 'text-muted'}`}>{sublabel}</p>}
    </Wrapper>
  )
}
