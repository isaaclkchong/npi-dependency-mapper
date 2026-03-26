import { Panel, useReactFlow } from '@xyflow/react'
import { TaskStatus } from '@/types'
import { STATUS_CONFIG } from '@/components/spreadsheet/StatusBadge'
import { useCriticalPath } from '@/hooks/useCriticalPath'

interface MapControlsProps {
  onRelayout: () => void
}

export default function MapControls({ onRelayout }: MapControlsProps) {
  const { fitView } = useReactFlow()
  const { projectDuration, criticalTaskIds } = useCriticalPath()

  return (
    <Panel
      position="bottom-left"
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 w-52 space-y-3"
    >
      {/* Legend */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Legend</p>

        {/* Edge types */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg width="24" height="8" className="shrink-0">
            <line x1="0" y1="4" x2="24" y2="4" stroke="#f59e0b" strokeWidth="2.5" />
            <polygon points="20,1 24,4 20,7" fill="#f59e0b" />
          </svg>
          Critical path
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg width="24" height="8" className="shrink-0">
            <line x1="0" y1="4" x2="24" y2="4" stroke="#9ca3af" strokeWidth="1.5" />
            <polygon points="20,2 24,4 20,6" fill="#9ca3af" />
          </svg>
          Dependency
        </div>

        <div className="border-t border-gray-100 pt-1.5 space-y-1">
          {Object.values(TaskStatus).map((s) => {
            const cfg = STATUS_CONFIG[s]
            return (
              <div key={s} className="flex items-center gap-2 text-xs text-gray-600">
                <span className={`text-[10px] font-bold ${cfg.text}`}>{cfg.icon}</span>
                {s}
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-gray-100 pt-2 space-y-0.5">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Critical tasks</span>
          <span className="font-medium text-amber-600">{criticalTaskIds.size}</span>
        </div>
        {projectDuration > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Project duration</span>
            <span className="font-medium text-gray-700">{projectDuration}d</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 pt-2 flex flex-col gap-1.5">
        <button
          onClick={onRelayout}
          className="w-full text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 py-1.5 rounded-md transition-colors text-left px-2"
        >
          ⟳ Re-layout graph
        </button>
        <button
          onClick={() => fitView({ padding: 0.1, duration: 400 })}
          className="w-full text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 py-1.5 rounded-md transition-colors text-left px-2"
        >
          ⊞ Fit to view
        </button>
      </div>
    </Panel>
  )
}
