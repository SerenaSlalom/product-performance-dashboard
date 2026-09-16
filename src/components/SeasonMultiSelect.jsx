import { useRef, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SeasonMultiSelect({ seasons, selectedSeasons, onSeasonChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggleSeason = (season) => {
    const next = new Set(selectedSeasons)
    if (next.has(season)) {
      next.delete(season)
    } else {
      next.add(season)
    }
    onSeasonChange(next)
  }

  const handleSelectAll = () => {
    onSeasonChange(new Set(seasons))
  }

  const handleClear = () => {
    onSeasonChange(new Set())
  }

  const displayText = selectedSeasons.size === 0 ? 'Select seasons' : selectedSeasons.size === seasons.length ? 'All seasons' : Array.from(selectedSeasons).join(', ')

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-ink outline-none hover:border-accent-deep focus:border-accent-deep"
      >
        {displayText}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full z-10 mt-2 min-w-[200px] rounded-lg border border-border bg-white shadow-lg">
          <div className="p-3">
            {seasons.map((season) => (
              <label key={season} className="flex items-center gap-2 px-2 py-2 text-[13px] text-ink hover:bg-surface-inset rounded">
                <input
                  type="checkbox"
                  checked={selectedSeasons.has(season)}
                  onChange={() => handleToggleSeason(season)}
                  className="cursor-pointer"
                />
                <span className="cursor-pointer">{season}</span>
              </label>
            ))}

            <div className="border-t border-border my-2" />

            <button
              onClick={handleSelectAll}
              className="w-full text-left px-2 py-2 text-[13px] font-medium text-accent-deep hover:bg-surface-inset rounded"
            >
              Select all
            </button>
            <button
              onClick={handleClear}
              className="w-full text-left px-2 py-2 text-[13px] text-muted hover:bg-surface-inset rounded"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
