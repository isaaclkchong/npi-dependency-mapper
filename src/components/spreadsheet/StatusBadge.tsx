import { TaskStatus } from '@/types'

interface StatusBadgeProps {
  status: TaskStatus
  size?: 'sm' | 'md'
}

const STATUS_CONFIG: Record<
  TaskStatus,
  { bg: string; text: string; icon: string; label: string }
> = {
  [TaskStatus.NotStarted]: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    icon: '●',
    label: 'Not Started',
  },
  [TaskStatus.InProgress]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: '▶',
    label: 'In Progress',
  },
  [TaskStatus.Complete]: {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    icon: '✓',
    label: 'Complete',
  },
  [TaskStatus.Blocked]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    icon: '⚠',
    label: 'Blocked',
  },
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${config.bg} ${config.text} ${sizeClass}`}
      aria-label={config.label}
    >
      <span aria-hidden="true" className="text-[10px] leading-none">
        {config.icon}
      </span>
      {config.label}
    </span>
  )
}

export { STATUS_CONFIG }
