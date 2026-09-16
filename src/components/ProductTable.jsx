import { useMemo } from 'react'
import { PackageSearch } from 'lucide-react'
import ProductRow from './ProductRow'
import { CATEGORIES, ACTIVE_SEASON, isAtRisk } from '../utils/dataHelpers'

const COLUMNS = [
  'Style',
  'Category',
  'Sell-Through',
  'Size Curve',
  'Markdown',
  'Wks of Supply',
  'Return Rate',
  'Top Return Reason',
  'Sentiment',
  'AI Insight',
  '',
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Default order' },
  { value: 'sell_through_desc', label: 'Sell-Through (High to Low)' },
  { value: 'sell_through_asc', label: 'Sell-Through (Low to High)' },
  { value: 'return_rate_desc', label: 'Return Rate (High to Low)' },
  { value: 'return_rate_asc', label: 'Return Rate (Low to High)' },
  { value: 'sentiment_desc', label: 'Sentiment (High to Low)' },
  { value: 'sentiment_asc', label: 'Sentiment (Low to High)' },
]

export default function ProductTable({
  products,
  selectedSeasons,
  selectedCategories,
  onToggleCategory,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  expandedId,
  onToggleExpand,
  reviewedIds,
  onToggleReviewed,
}) {
  const filteredAndSorted = useMemo(() => {
    let result = selectedSeasons.has(ACTIVE_SEASON) ? [...products] : []

    if (selectedCategories.size > 0) {
      result = result.filter((p) => selectedCategories.has(p.category))
    }
    if (statusFilter === 'at-risk') {
      result = result.filter(isAtRisk)
    }

    switch (sortBy) {
      case 'sell_through_desc':
        result.sort((a, b) => b.sell_through_pct - a.sell_through_pct)
        break
      case 'sell_through_asc':
        result.sort((a, b) => a.sell_through_pct - b.sell_through_pct)
        break
      case 'return_rate_desc':
        result.sort((a, b) => b.return_rate_pct - a.return_rate_pct)
        break
      case 'return_rate_asc':
        result.sort((a, b) => a.return_rate_pct - b.return_rate_pct)
        break
      case 'sentiment_desc':
        result.sort((a, b) => b.reviews.avg_rating - a.reviews.avg_rating)
        break
      case 'sentiment_asc':
        result.sort((a, b) => a.reviews.avg_rating - b.reviews.avg_rating)
        break
      default:
        break
    }

    return result
  }, [products, selectedSeasons, selectedCategories, statusFilter, sortBy])

  return (
    <div className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onToggleCategory(null)}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                selectedCategories.size === 0
                  ? 'bg-ink text-white'
                  : 'bg-surface-inset text-muted hover:text-ink'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onToggleCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  selectedCategories.has(cat)
                    ? 'bg-ink text-white'
                    : 'bg-surface-inset text-muted hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-surface-inset p-1">
            <button
              type="button"
              onClick={() => onStatusFilterChange('all')}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-white text-ink shadow-[0_1px_2px_rgba(3,7,18,0.08)]' : 'text-muted'
              }`}
            >
              All Styles
            </button>
            <button
              type="button"
              onClick={() => onStatusFilterChange('at-risk')}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                statusFilter === 'at-risk' ? 'bg-white text-ink shadow-[0_1px_2px_rgba(3,7,18,0.08)]' : 'text-muted'
              }`}
            >
              At-Risk Only
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-ink outline-none focus:border-accent-deep"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <PackageSearch size={28} strokeWidth={1.5} className="text-border" />
          <p className="text-[14px] font-medium text-ink">No styles match these filters</p>
          <p className="max-w-sm text-[13px] text-muted">
            {!selectedSeasons.has(ACTIVE_SEASON)
              ? 'No assortment data is loaded for the selected seasons yet.'
              : 'Try clearing a category filter or switching back to All Styles.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted first:pl-5 last:pr-5"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isExpanded={expandedId === product.id}
                  onToggle={() => onToggleExpand(product.id)}
                  reviewed={reviewedIds.has(product.id)}
                  onToggleReviewed={() => onToggleReviewed(product.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
