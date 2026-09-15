const SOLD_OUT_THRESHOLD_PCT = 90

export default function SizeCurveChart({ sizeCurve }) {
  const sizes = Object.entries(sizeCurve)

  return (
    <div>
      <p className="text-[13px] font-medium text-muted">Size availability</p>
      <div className="mt-3 space-y-2.5">
        {sizes.map(([size, { purchased, sold }]) => {
          const pctSold = purchased > 0 ? (sold / purchased) * 100 : 0
          const isSoldOut = pctSold >= SOLD_OUT_THRESHOLD_PCT
          return (
            <div key={size} className="flex items-center gap-3">
              <span className="w-7 shrink-0 font-mono-tab text-[12px] font-medium text-ink">{size}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-inset">
                <div
                  className={`h-full rounded-full ${isSoldOut ? 'bg-danger' : 'bg-ink'}`}
                  style={{ width: `${Math.min(pctSold, 100)}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-right text-[11px] text-muted">
                {isSoldOut ? (
                  <span className="font-medium text-danger">Sold out</span>
                ) : (
                  `${sold}/${purchased} sold`
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
