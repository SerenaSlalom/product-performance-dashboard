const SIZES = {
  sm: { height: 26, barWidth: 9, gap: 4, labelText: 'text-[8px]', valueText: 'text-[12px]' },
  md: { height: 40, barWidth: 14, gap: 6, labelText: 'text-[9.5px]', valueText: 'text-[15px]' },
}

export default function MiniTrendBars({
  values,
  labels,
  target,
  color = 'var(--color-ink)',
  formatValue = (v) => `${v}%`,
  size = 'sm',
  dark = false,
}) {
  const { height, barWidth, gap, labelText, valueText } = SIZES[size]
  const max = Math.max(...values, target ?? 0) * 1.15 || 1
  const targetTop = target != null ? height - (target / max) * height : null
  const trackColor = dark ? 'rgba(255,255,255,0.16)' : 'var(--color-border)'
  const labelColor = dark ? 'text-white/50' : 'text-muted'
  const valueColor = dark ? 'text-white' : 'text-ink'
  const targetColor = dark ? 'var(--color-accent)' : 'var(--color-accent-deep)'

  const tooltip = [
    ...values.map((v, i) => `${labels[i]} ${formatValue(v)}`),
    target != null ? `Plan ${formatValue(target)}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="inline-flex flex-col items-start gap-1" title={tooltip}>
      <div className="relative flex items-end" style={{ height, gap }}>
        {targetTop != null && (
          <div
            className="absolute inset-x-0 border-t border-dashed"
            style={{ top: targetTop, borderColor: targetColor }}
          />
        )}
        {values.map((v, i) => {
          const isCurrent = i === values.length - 1
          return (
            <div
              key={labels[i] ?? i}
              className="rounded-[2px]"
              style={{
                width: barWidth,
                height: Math.max((v / max) * height, 2),
                backgroundColor: isCurrent ? color : trackColor,
              }}
            />
          )
        })}
      </div>
      <div className="flex items-center" style={{ gap }}>
        {labels.map((l) => (
          <span key={l} className={`${labelText} font-medium uppercase ${labelColor}`} style={{ width: barWidth, textAlign: 'center' }}>
            {l[0]}
          </span>
        ))}
        <span className={`font-mono-tab ${valueText} ml-1 font-semibold ${valueColor}`}>
          {formatValue(values[values.length - 1])}
        </span>
      </div>
    </div>
  )
}
