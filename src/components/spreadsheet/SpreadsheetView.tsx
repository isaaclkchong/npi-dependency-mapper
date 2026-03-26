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
      <div className="shrink-0 px-4 py-2.5 bg-white border-b border-gray-200 flex items-center gap-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add task
        </button>

        <div className="h-4 w-px bg-gray-200" />

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="inline-block h-3 w-0.5 bg-amber-400 rounded" />
          Critical path
        </div>

        {/* Phase filter */}
        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value as typeof phaseFilter)}
          className="ml-2 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          aria-label="Filter by phase"
        >
          <option value="all">All Phases</option>
          {PHASES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {projectDuration > 0 && (
          <span className="text-xs text-gray-400 ml-auto">
            Project duration: <strong className="text-gray-700">{projectDuration} days</strong>
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
