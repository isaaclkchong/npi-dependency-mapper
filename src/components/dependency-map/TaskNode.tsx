import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { AppNode } from '@/types'
import { TaskStatus } from '@/types'
import PhaseBadge from '@/components/spreadsheet/PhaseBadge'

const STATUS_DOT: Record<TaskStatus, string> = {
  [TaskStatus.NotStarted]: 'bg-[#62666d]',
  [TaskStatus.InProgress]: 'bg-[#7170ff]',
  [TaskStatus.Complete]: 'bg-[#27a644]',
  [TaskStatus.Blocked]: 'bg-[#ef4444]',
}

const PHASE_BORDER: Record<string, string> = {
  EVT: 'border-l-[#38bdf8]',
  DVT: 'border-l-[#a78bfa]',
  PVT: 'border-l-[#fbbf24]',
  MP: 'border-l-[#10b981]',
}

function TaskNode({ data }: NodeProps<AppNode>) {
  const { task, isCritical, isSelected, isFiltered } = data

  const dimClass = !isFiltered
    ? 'opacity-35'
    : task.status === TaskStatus.Complete
      ? 'opacity-70'
      : ''

  const selectedRing = isSelected
    ? 'ring-2 ring-[#5e6ad2] ring-offset-2 ring-offset-[#08090a]'
    : ''

  const criticalGlow = isCritical && isFiltered && !isSelected
    ? 'shadow-[0_0_12px_rgba(217,119,6,0.15)]'
    : ''

  return (
    <div
      className={`
        relative bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.08)] border-l-[3px] ${PHASE_BORDER[task.phase]}
        p-2.5 w-[190px] min-h-[72px]
        flex flex-col justify-between
        ${selectedRing} ${dimClass} ${criticalGlow}
        transition-all hover:bg-[rgba(255,255,255,0.05)] cursor-pointer
      `}
    >
      {/* Target handle (left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-[#62666d] !border-[#8a8f98] !w-2 !h-2"
      />

      {/* Header row */}
      <div className="flex items-start gap-1.5">
        <span
          className={`mt-1 h-2 w-2 rounded-full shrink-0 ${STATUS_DOT[task.status]}`}
          aria-label={task.status}
          title={task.status}
        />
        <span className="text-[12px] font-[590] text-[#f7f8f8] leading-tight line-clamp-2 flex-1">
          {task.name}
        </span>
      </div>

      {/* Footer row */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-[#62666d] truncate max-w-[90px] font-[510]">{task.owner || '—'}</span>
        <div className="flex items-center gap-1 shrink-0 ml-1">
          <PhaseBadge phase={task.phase} size="sm" />
          <span className="text-[10px] font-[590] text-[#8a8f98] tabular-nums font-mono">
            {task.duration}d
          </span>
        </div>
      </div>

      {/* Critical indicator */}
      {isCritical && isFiltered && (
        <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#d97706] border-2 border-[#08090a]" />
      )}

      {/* Source handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-[#62666d] !border-[#8a8f98] !w-2 !h-2"
      />
    </div>
  )
}

export default memo(TaskNode)
