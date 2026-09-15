import SellThroughChart from './SellThroughChart'
import SizeCurveChart from './SizeCurveChart'
import ReturnBreakdown from './ReturnBreakdown'
import SentimentPanel from './SentimentPanel'
import AIInsightCard from './AIInsightCard'

export default function ProductDetailPanel({ product, reviewed, onToggleReviewed }) {
  return (
    <div className="bg-surface-inset px-4 py-6 md:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-5 rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
          <p className="font-display text-[15px] font-semibold text-ink">Performance metrics</p>
          <SellThroughChart trend={product.sell_through_trend} target={product.sell_through_target_pct} />
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
            <div>
              <p className="text-[11px] text-muted">Markdown timeline</p>
              <p className="mt-1 text-[13.5px] font-medium text-ink">
                {product.markdown_depth_pct > 0
                  ? `${product.markdown_depth_pct}% off, taken ${product.markdown_weeks_ago}w ago`
                  : 'No markdown taken'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted">Weeks of supply</p>
              <p className="font-mono-tab mt-1 text-[13.5px] font-medium text-ink">{product.weeks_of_supply} weeks</p>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <SizeCurveChart sizeCurve={product.size_curve} />
          </div>
        </div>

        <div className="space-y-5 rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
          <p className="font-display text-[15px] font-semibold text-ink">Customer voice</p>
          <ReturnBreakdown returnReasons={product.return_reasons} returnRatePct={product.return_rate_pct} />
          <div className="border-t border-border pt-4">
            <SentimentPanel reviews={product.reviews} />
          </div>
        </div>

        <div>
          <AIInsightCard insight={product.ai_insight} reviewed={reviewed} onToggleReviewed={onToggleReviewed} />
        </div>
      </div>
    </div>
  )
}
