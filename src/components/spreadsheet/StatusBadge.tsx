import { TaskStatus } from '@/types'

interface StatusBadgeProps {
  status: TaskStatus
  size?: 'sm' | 'md'
}

const STATUS_CONFIG: Record<
  TaskStatus,
  { bg: string; text: string; dot: string; label: string; icon: string }
> = {
  [TaskStatus.NotStarted]: {
    bg: 'bg-zinc-50',
    text: 'text-zinc-500',
    dot: 'bg-zinc-300',
    label: 'Not Started',
    icon: '●',
  },
  [TaskStatus.InProgress]: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    dot: 'bg-blue-400',
    label: 'In Progress',
    icon: '▶',
  },
  [TaskStatus.Complete]: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    dot: 'bg-emerald-400',
    label: 'Complete',
    icon: '✓',
  },
  [TaskStatus.Blocked]: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    dot: 'bg-red-400',
    label: 'Blocked',
    icon: '⚠',
  },
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  const sizeClass = size === 'sm'
    ? 'text-[11px] px-1.5 py-0.5 gap-1'
    : 'text-[11px] px-2 py-1 gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${config.bg} ${config.text} ${sizeClass}`}
      aria-label={config.label}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} shrink-0`} aria-hidden="true" />
      {config.label}
    </span>
  )
}

export { STATUS_CONFIG }
