const CHART_HEIGHT = 26
const BAR_WIDTH = 9

export default function MiniTrendBars({ values, labels, target, color = 'var(--color-ink)', formatValue = (v) => `${v}%` }) {
  const max = Math.max(...values, target ?? 0) * 1.15 || 1
  const targetTop = target != null ? CHART_HEIGHT - (target / max) * CHART_HEIGHT : null

  const tooltip = [
    ...values.map((v, i) => `${labels[i]} ${formatValue(v)}`),
    target != null ? `Plan ${formatValue(target)}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="inline-flex flex-col items-start gap-1" title={tooltip}>
      <div className="relative flex items-end gap-1" style={{ height: CHART_HEIGHT }}>
        {targetTop != null && (
          <div
            className="absolute inset-x-0 border-t border-dashed"
            style={{ top: targetTop, borderColor: 'var(--color-accent-deep)' }}
          />
        )}
        {values.map((v, i) => {
          const isCurrent = i === values.length - 1
          return (
            <div
              key={labels[i] ?? i}
              className="rounded-[2px]"
              style={{
                width: BAR_WIDTH,
                height: Math.max((v / max) * CHART_HEIGHT, 2),
                backgroundColor: isCurrent ? color : 'var(--color-border)',
              }}
            />
          )
        })}
      </div>
      <div className="flex items-center gap-1">
        {labels.map((l) => (
          <span key={l} className="text-[8px] font-medium uppercase text-muted" style={{ width: BAR_WIDTH, textAlign: 'center' }}>
            {l[0]}
          </span>
        ))}
        <span className="font-mono-tab ml-1 text-[12px] font-semibold text-ink">
          {formatValue(values[values.length - 1])}
        </span>
      </div>
    </div>
  )
}
