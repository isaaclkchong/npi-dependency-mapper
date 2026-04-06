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
    bg: 'bg-[rgba(255,255,255,0.04)]',
    text: 'text-[#8a8f98]',
    dot: 'bg-[#62666d]',
    label: 'Not Started',
    icon: '●',
  },
  [TaskStatus.InProgress]: {
    bg: 'bg-[rgba(94,106,210,0.12)]',
    text: 'text-[#828fff]',
    dot: 'bg-[#7170ff]',
    label: 'In Progress',
    icon: '▶',
  },
  [TaskStatus.Complete]: {
    bg: 'bg-[rgba(39,166,68,0.12)]',
    text: 'text-[#10b981]',
    dot: 'bg-[#27a644]',
    label: 'Complete',
    icon: '✓',
  },
  [TaskStatus.Blocked]: {
    bg: 'bg-[rgba(239,68,68,0.12)]',
    text: 'text-[#ef4444]',
    dot: 'bg-[#ef4444]',
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
      className={`inline-flex items-center rounded-md font-[510] ${config.bg} ${config.text} ${sizeClass}`}
      aria-label={config.label}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} shrink-0`} aria-hidden="true" />
      {config.label}
    </span>
  )
}

export { STATUS_CONFIG }
