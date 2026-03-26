import type { Phase } from '@/types'

const PHASE_COLORS: Record<Phase, string> = {
  EVT: 'bg-blue-100 text-blue-800',
  DVT: 'bg-purple-100 text-purple-800',
  PVT: 'bg-orange-100 text-orange-800',
  MP:  'bg-green-100 text-green-800',
}

interface PhaseBadgeProps {
  phase: Phase
  size?: 'sm' | 'md'
}

export default function PhaseBadge({ phase, size = 'md' }: PhaseBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-[9px] px-1 py-0' : 'text-xs px-1.5 py-0.5'
  return (
    <span className={`inline-flex items-center rounded font-semibold ${sizeClass} ${PHASE_COLORS[phase]}`}>
      {phase}
    </span>
  )
}
