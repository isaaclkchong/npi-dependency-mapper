import { useNpiStore } from '@/store/useNpiStore'
import ViewToggle from './ViewToggle'

export default function Header() {
  const tasks = useNpiStore((s) => s.tasks)
  const resetToDemo = useNpiStore((s) => s.resetToDemo)

  return (
    <header className="h-14 bg-white border-b border-gray-200 shadow-sm flex items-center px-6 gap-4 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900 truncate">NPI Dependency Mapper</span>
        <span className="text-xs text-gray-400 shrink-0">{tasks.length} items</span>
      </div>

      {/* Center: view toggle */}
      <div className="flex-1 flex justify-center">
        <ViewToggle />
      </div>

      {/* Right actions */}
      <button
        onClick={resetToDemo}
        className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2.5 py-1.5 rounded-md transition-colors shrink-0"
      >
        Reset to demo
      </button>
    </header>
  )
}
