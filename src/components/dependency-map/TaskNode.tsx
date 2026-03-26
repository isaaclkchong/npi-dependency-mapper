import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { AppNode } from '@/types'
import { TaskStatus } from '@/types'
import PhaseBadge from '@/components/spreadsheet/PhaseBadge'

const STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.NotStarted]: 'bg-slate-100 text-slate-600',
  [TaskStatus.InProgress]: 'bg-blue-100 text-blue-700',
  [TaskStatus.Complete]: 'bg-teal-100 text-teal-700',
  [TaskStatus.Blocked]: 'bg-orange-100 text-orange-700',
}

const STATUS_ICONS: Record<TaskStatus, string> = {
  [TaskStatus.NotStarted]: '●',
  [TaskStatus.InProgress]: '▶',
  [TaskStatus.Complete]: '✓',
  [TaskStatus.Blocked]: '⚠',
}

function TaskNode({ data }: NodeProps<AppNode>) {
  const { task, isCritical, isSelected, isFiltered } = data

  let borderClass = 'border-gray-200'
  if (!isFiltered) borderClass = 'border-gray-200'
  else if (isCritical) borderClass = 'border-amber-400'
  else if (task.status === TaskStatus.Blocked) borderClass = 'border-orange-400'
  if (isSelected) borderClass = 'border-blue-500'

  const ringClass = isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
  const dimClass = !isFiltered ? 'opacity-40' : task.status === TaskStatus.Complete ? 'opacity-75' : ''

  return (
    <div
      className={`
        relative bg-white rounded-lg border-2 shadow-sm p-2.5 w-[190px] min-h-[72px]
        flex flex-col justify-between
        ${borderClass} ${ringClass} ${dimClass}
        transition-shadow hover:shadow-md cursor-pointer
      `}
    >
      {/* Target handle (left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-gray-300 !border-gray-400 !w-2 !h-2"
      />

      {/* Header row */}
      <div className="flex items-start gap-1.5">
        <span
          className={`mt-0.5 inline-flex items-center justify-center shrink-0 rounded-full text-[9px] font-semibold px-1 py-0.5 ${STATUS_COLORS[task.status]}`}
          aria-label={task.status}
          title={task.status}
        >
          {STATUS_ICONS[task.status]}
        </span>
        <span className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2 flex-1">
          {task.name}
        </span>
      </div>

      {/* Footer row */}
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 truncate max-w-[90px]">{task.owner || '—'}</span>
        <div className="flex items-center gap-1 shrink-0 ml-1">
          <PhaseBadge phase={task.phase} size="sm" />
          <span className="text-[10px] font-medium text-gray-500">
            {task.duration}d
          </span>
        </div>
      </div>

      {/* Critical indicator */}
      {isCritical && isFiltered && (
        <div className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-amber-400 border-2 border-white" />
      )}

      {/* Source handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-gray-300 !border-gray-400 !w-2 !h-2"
      />
    </div>
  )
}

export default memo(TaskNode)
