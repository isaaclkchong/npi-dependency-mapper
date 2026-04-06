import { useState } from 'react'
import { useNpiStore } from '@/store/useNpiStore'
import { useCriticalPath } from '@/hooks/useCriticalPath'
import TaskTable from './TaskTable'
import AddTaskModal from './AddTaskModal'

const PHASES = ['EVT', 'DVT', 'PVT', 'MP'] as const

export default function SpreadsheetView() {
  const [showAddModal, setShowAddModal] = useState(false)
  const { projectDuration } = useCriticalPath()
  const tasks = useNpiStore((s) => s.tasks)
  const phaseFilter = useNpiStore((s) => s.phaseFilter)
  const setPhaseFilter = useNpiStore((s) => s.setPhaseFilter)

  const filteredTasks = phaseFilter === 'all' ? tasks : tasks.filter((t) => t.phase === phaseFilter)

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="shrink-0 px-4 py-2 bg-white border-b border-zinc-200/80 flex items-center gap-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[12px] font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add task
        </button>

        <div className="h-4 w-px bg-zinc-200" />

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
          <span className="inline-block h-3 w-0.5 bg-amber-500 rounded-full" />
          Critical path
        </div>

        {/* Phase filter */}
        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value as typeof phaseFilter)}
          className="ml-1 border border-zinc-200 rounded-lg px-2 py-1 text-[11px] font-medium text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 bg-white cursor-pointer"
          aria-label="Filter by phase"
        >
          <option value="all">All Phases</option>
          {PHASES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {projectDuration > 0 && (
          <span className="text-[11px] text-zinc-400 ml-auto font-medium tabular-nums">
            Project duration: <strong className="text-zinc-700 font-semibold">{projectDuration} days</strong>
          </span>
        )}
      </div>

      {/* Table area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <TaskTable tasks={filteredTasks} />
      </div>

      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}
