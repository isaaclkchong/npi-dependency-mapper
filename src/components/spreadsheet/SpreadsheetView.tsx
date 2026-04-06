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
      <div className="shrink-0 px-4 py-2 bg-[#0f1011] border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5e6ad2] text-white text-[12px] font-[590] rounded-md hover:bg-[#828fff] transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add task
        </button>

        <div className="h-4 w-px bg-[rgba(255,255,255,0.08)]" />

        <div className="flex items-center gap-1.5 text-[11px] font-[510] text-[#8a8f98]">
          <span className="inline-block h-3 w-0.5 bg-[#d97706] rounded-full" />
          Critical path
        </div>

        {/* Phase filter */}
        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value as typeof phaseFilter)}
          className="ml-1 border border-[rgba(255,255,255,0.08)] rounded-md px-2 py-1 text-[11px] font-[510] text-[#8a8f98] focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]/30 bg-[rgba(255,255,255,0.02)] cursor-pointer"
          aria-label="Filter by phase"
        >
          <option value="all">All Phases</option>
          {PHASES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {projectDuration > 0 && (
          <span className="text-[11px] text-[#62666d] ml-auto font-[510] tabular-nums">
            Project duration: <strong className="text-[#d0d6e0] font-[590]">{projectDuration} days</strong>
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
