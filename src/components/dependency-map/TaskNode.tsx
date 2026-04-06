import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { AppNode } from '@/types'
import { TaskStatus } from '@/types'
import PhaseBadge from '@/components/spreadsheet/PhaseBadge'

const STATUS_DOT: Record<TaskStatus, string> = {
  [TaskStatus.NotStarted]: 'bg-zinc-300',
  [TaskStatus.InProgress]: 'bg-blue-400',
  [TaskStatus.Complete]: 'bg-emerald-400',
  [TaskStatus.Blocked]: 'bg-red-400',
}

const STATUS_ICONS: Record<TaskStatus, string> = {
  [TaskStatus.NotStarted]: '●',
  [TaskStatus.InProgress]: '▶',
  [TaskStatus.Complete]: '✓',
  [TaskStatus.Blocked]: '⚠',
}

const PHASE_BORDER: Record<string, string> = {
  EVT: 'border-l-sky-400',
  DVT: 'border-l-violet-400',
  PVT: 'border-l-amber-400',
  MP: 'border-l-emerald-400',
}

function TaskNode({ data }: NodeProps<AppNode>) {
  const { task, isCritical, isSelected, isFiltered } = data

  const dimClass = !isFiltered
    ? 'opacity-35'
    : task.status === TaskStatus.Complete
      ? 'opacity-70'
      : ''

  const selectedRing = isSelected
    ? 'ring-2 ring-indigo-500 ring-offset-2'
    : ''

  const criticalGlow = isCritical && isFiltered && !isSelected
    ? 'shadow-md shadow-amber-100'
    : ''

  return (
    <div
      className={`
        relative bg-white rounded-lg border border-zinc-200 border-l-[3px] ${PHASE_BORDER[task.phase]}
        shadow-sm p-2.5 w-[190px] min-h-[72px]
        flex flex-col justify-between
        ${selectedRing} ${dimClass} ${criticalGlow}
        transition-all hover:shadow-md cursor-pointer
      `}
    >
      {/* Target handle (left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-zinc-300 !border-zinc-400 !w-2 !h-2"
      />

      {/* Header row */}
      <div className="flex items-start gap-1.5">
        <span
          className={`mt-1 h-2 w-2 rounded-full shrink-0 ${STATUS_DOT[task.status]}`}
          aria-label={task.status}
          title={task.status}
        />
        <span className="text-[12px] font-semibold text-zinc-800 leading-tight line-clamp-2 flex-1">
          {task.name}
        </span>
      </div>

      {/* Footer row */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-zinc-400 truncate max-w-[90px] font-medium">{task.owner || '—'}</span>
        <div className="flex items-center gap-1 shrink-0 ml-1">
          <PhaseBadge phase={task.phase} size="sm" />
          <span className="text-[10px] font-semibold text-zinc-500 tabular-nums font-mono">
            {task.duration}d
          </span>
        </div>
      </div>

      {/* Critical indicator */}
      {isCritical && isFiltered && (
        <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 border-2 border-white" />
      )}

      {/* Source handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-zinc-300 !border-zinc-400 !w-2 !h-2"
      />
    </div>
  )
}

export default memo(TaskNode)
