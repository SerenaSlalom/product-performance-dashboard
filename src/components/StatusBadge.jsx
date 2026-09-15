import { STATUS_LABELS } from '../utils/dataHelpers'

const STYLES = {
  action_needed: 'bg-danger text-white',
  watch: 'bg-warning text-ink',
  on_track: 'bg-success text-white',
}

export default function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${STYLES[status]} ${className}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
