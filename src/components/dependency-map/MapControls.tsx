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
      className="bg-[#0f1011]/95 backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.08)] p-3.5 w-52 space-y-3"
      style={{ boxShadow: 'rgba(0,0,0,0.2) 0px 0px 0px 1px' }}
    >
      {/* Legend */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-[590] text-[#62666d] uppercase tracking-wider">Legend</p>

        {/* Edge types */}
        <div className="flex items-center gap-2.5 text-[11px] text-[#8a8f98] font-[510]">
          <svg width="20" height="6" className="shrink-0">
            <line x1="0" y1="3" x2="16" y2="3" stroke="#d97706" strokeWidth="2" />
            <polygon points="14,0.5 18,3 14,5.5" fill="#d97706" />
          </svg>
          Critical path
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-[#8a8f98] font-[510]">
          <svg width="20" height="6" className="shrink-0">
            <line x1="0" y1="3" x2="16" y2="3" stroke="#62666d" strokeWidth="1.5" />
            <polygon points="14,1 18,3 14,5" fill="#62666d" />
          </svg>
          Dependency
        </div>

        <div className="border-t border-[rgba(255,255,255,0.05)] pt-2 space-y-1">
          {Object.values(TaskStatus).map((s) => {
            const cfg = STATUS_CONFIG[s]
            return (
              <div key={s} className="flex items-center gap-2.5 text-[11px] text-[#8a8f98] font-[510]">
                <span className={`h-2 w-2 rounded-full ${cfg.dot} shrink-0`} />
                {cfg.label}
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-[rgba(255,255,255,0.05)] pt-2.5 space-y-1">
        <div className="flex justify-between text-[11px]">
          <span className="text-[#62666d] font-[510]">Critical tasks</span>
          <span className="font-[590] text-[#d97706] tabular-nums">{criticalTaskIds.size}</span>
        </div>
        {projectDuration > 0 && (
          <div className="flex justify-between text-[11px]">
            <span className="text-[#62666d] font-[510]">Project duration</span>
            <span className="font-[590] text-[#d0d6e0] tabular-nums">{projectDuration}d</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-[rgba(255,255,255,0.05)] pt-2.5 flex flex-col gap-1">
        <button
          onClick={onRelayout}
          className="w-full text-[11px] font-[510] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.04)] py-1.5 rounded-md transition-colors text-left px-2 flex items-center gap-1.5"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
          </svg>
          Re-layout graph
        </button>
        <button
          onClick={() => fitView({ padding: 0.1, duration: 400 })}
          className="w-full text-[11px] font-[510] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.04)] py-1.5 rounded-md transition-colors text-left px-2 flex items-center gap-1.5"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          Fit to view
        </button>
      </div>
    </Panel>
  )
}
