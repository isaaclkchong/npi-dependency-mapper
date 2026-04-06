import { useNpiStore } from '@/store/useNpiStore'
import ViewToggle from './ViewToggle'

export default function Header() {
  const tasks = useNpiStore((s) => s.tasks)
  const resetToDemo = useNpiStore((s) => s.resetToDemo)

  return (
    <header className="h-12 bg-[#0f1011] border-b border-[rgba(255,255,255,0.05)] flex items-center px-5 gap-4 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-[510] text-[15px] text-[#f7f8f8] tracking-[-0.165px]">NPI Dependency Mapper</span>
          <span className="text-[11px] font-[510] text-[#62666d] tabular-nums">{tasks.length} items</span>
        </div>
      </div>

      {/* Center: view toggle */}
      <div className="flex-1 flex justify-center">
        <ViewToggle />
      </div>

      {/* Right actions */}
      <button
        onClick={resetToDemo}
        className="text-[11px] font-[510] text-[#62666d] hover:text-[#d0d6e0] px-2.5 py-1.5 rounded-md transition-colors shrink-0 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)]"
      >
        Reset to demo
      </button>
    </header>
  )
}
