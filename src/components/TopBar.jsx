export default function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4 md:px-10">
      <span
        className="select-none"
        style={{
          fontFamily: "'Anton', 'Arial Black', sans-serif",
          fontSize: '42px',
          fontWeight: 900,
          letterSpacing: '4px',
          WebkitTextStroke: '0.6px var(--color-ink)',
          color: 'transparent',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        Maverick
      </span>

      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-inset text-[13px] font-semibold text-ink">
          SE
        </span>
        <div className="text-right">
          <p className="text-[13px] font-semibold leading-tight text-ink">Serena Engquist</p>
          <p className="text-[12px] leading-tight text-muted">Category Manager</p>
        </div>
      </div>
    </header>
  )
}
