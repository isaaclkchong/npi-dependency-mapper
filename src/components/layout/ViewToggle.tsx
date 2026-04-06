import { useNpiStore } from '@/store/useNpiStore'
import { ViewMode } from '@/types'

export default function ViewToggle() {
  const viewMode = useNpiStore((s) => s.viewMode)
  const setViewMode = useNpiStore((s) => s.setViewMode)

  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="flex rounded-lg bg-zinc-100 p-0.5 gap-0.5"
    >
      <button
        role="tab"
        aria-selected={viewMode === ViewMode.Spreadsheet}
        onClick={() => setViewMode(ViewMode.Spreadsheet)}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-all ${
          viewMode === ViewMode.Spreadsheet
            ? 'bg-white text-zinc-900 shadow-sm shadow-zinc-200/60'
            : 'text-zinc-400 hover:text-zinc-600'
        }`}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
          <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
          <line x1="1.5" y1="9.5" x2="14.5" y2="9.5" />
          <line x1="6" y1="5.5" x2="6" y2="14.5" />
        </svg>
        Spreadsheet
      </button>
      <button
        role="tab"
        aria-selected={viewMode === ViewMode.DependencyMap}
        onClick={() => setViewMode(ViewMode.DependencyMap)}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-all ${
          viewMode === ViewMode.DependencyMap
            ? 'bg-white text-zinc-900 shadow-sm shadow-zinc-200/60'
            : 'text-zinc-400 hover:text-zinc-600'
        }`}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="3" cy="8" r="2" />
          <circle cx="9" cy="4" r="2" />
          <circle cx="9" cy="12" r="2" />
          <circle cx="14" cy="8" r="1.5" />
          <line x1="5" y1="7" x2="7" y2="5" />
          <line x1="5" y1="9" x2="7" y2="11" />
          <line x1="11" y1="5" x2="12.5" y2="7" />
          <line x1="11" y1="11" x2="12.5" y2="9" />
        </svg>
        Dependency Map
      </button>
    </div>
  )
}
