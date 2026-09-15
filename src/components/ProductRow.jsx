import { ChevronDown, Star, Check } from 'lucide-react'
import StatusBadge from './StatusBadge'
import ProductDetailPanel from './ProductDetailPanel'
import MiniTrendBars from './MiniTrendBars'
import {
  getSizeCurveStatus,
  getTopReturnReason,
  getSentimentTone,
  isAtRisk,
  getMonthlySellThrough,
  getMonthlyReturnRate,
  ACTIVE_SEASON_MONTHS,
} from '../utils/dataHelpers'

const SENTIMENT_TEXT = {
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export default function ProductRow({ product, isExpanded, onToggle, reviewed, onToggleReviewed }) {
  const sizeCurveStatus = getSizeCurveStatus(product.size_curve)
  const topReturnReason = getTopReturnReason(product.return_reasons)
  const sentimentTone = getSentimentTone(product.reviews.avg_rating)
  const atRisk = isAtRisk(product)

  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer border-b border-border transition-colors last:border-b-0 ${
          isExpanded ? 'bg-surface-inset' : 'hover:bg-surface-inset/60'
        }`}
      >
        <td className="py-3 pl-5 pr-3">
          <div className="flex items-center gap-3">
            <img
              src={product.image_url}
              alt=""
              className="h-10 w-10 shrink-0 rounded-xl object-cover"
            />
            <div>
              <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
                {product.name}
                {reviewed && <Check size={13} strokeWidth={2.5} className="text-accent-deep" />}
              </p>
              <p className="text-[12px] text-muted">{product.colorway}</p>
            </div>
          </div>
        </td>
        <td className="px-3 py-3 text-[13px] text-ink">{product.category}</td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-1.5">
            <MiniTrendBars
              values={getMonthlySellThrough(product)}
              labels={ACTIVE_SEASON_MONTHS}
              target={product.sell_through_target_pct}
              color="var(--color-accent-deep)"
            />
            {atRisk && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-danger" title="At risk" />}
          </div>
        </td>
        <td className="px-3 py-3 text-[12.5px] text-muted">
          {sizeCurveStatus ?? <span className="text-border">—</span>}
        </td>
        <td className="px-3 py-3 text-[13px] text-ink">
          {product.markdown_depth_pct > 0 ? (
            <>
              <span className="font-mono-tab font-semibold">{product.markdown_depth_pct}%</span>
              <span className="text-[11px] text-muted"> · {product.markdown_weeks_ago}w ago</span>
            </>
          ) : (
            <span className="text-border">None</span>
          )}
        </td>
        <td className="px-3 py-3 font-mono-tab text-[13px] text-ink">{product.weeks_of_supply}w</td>
        <td className="px-3 py-3">
          <MiniTrendBars
            values={getMonthlyReturnRate(product)}
            labels={ACTIVE_SEASON_MONTHS}
            color="var(--color-danger)"
          />
        </td>
        <td className="px-3 py-3 text-[12.5px] text-muted">{topReturnReason}</td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-1">
            <Star size={13} className={SENTIMENT_TEXT[sentimentTone]} fill="currentColor" strokeWidth={0} />
            <span className={`font-mono-tab text-[13px] font-semibold ${SENTIMENT_TEXT[sentimentTone]}`}>
              {product.reviews.avg_rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-muted">({product.reviews.count})</span>
          </div>
        </td>
        <td className="px-3 py-3">
          <StatusBadge status={product.ai_insight.status} />
        </td>
        <td className="py-3 pl-3 pr-5">
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={`text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-border last:border-b-0">
          <td colSpan={11} className="p-0">
            <ProductDetailPanel product={product} reviewed={reviewed} onToggleReviewed={onToggleReviewed} />
          </td>
        </tr>
      )}
    </>
  )
}
