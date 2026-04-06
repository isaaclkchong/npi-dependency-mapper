import { useNpiStore } from '@/store/useNpiStore'
import ViewToggle from './ViewToggle'

export default function Header() {
  const tasks = useNpiStore((s) => s.tasks)
  const resetToDemo = useNpiStore((s) => s.resetToDemo)

  return (
    <header className="h-14 bg-white border-b border-zinc-200/80 flex items-center px-5 gap-4 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-[15px] text-zinc-900 tracking-tight">NPI Dependency Mapper</span>
          <span className="text-[11px] font-medium text-zinc-400 tabular-nums">{tasks.length} items</span>
        </div>
      </div>

      {/* Center: view toggle */}
      <div className="flex-1 flex justify-center">
        <ViewToggle />
      </div>

      {/* Right actions */}
      <button
        onClick={resetToDemo}
        className="text-[11px] font-medium text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 px-2.5 py-1.5 rounded-md transition-colors shrink-0"
      >
        Reset to demo
      </button>
    </header>
  )
}
