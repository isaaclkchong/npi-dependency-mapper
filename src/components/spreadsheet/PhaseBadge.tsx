import type { Phase } from '@/types'

const PHASE_STYLES: Record<Phase, { bg: string; text: string; ring: string }> = {
  EVT: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-200' },
  DVT: { bg: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-200' },
  PVT: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200' },
  MP:  { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
}

interface PhaseBadgeProps {
  phase: Phase
  size?: 'sm' | 'md'
}

export default function PhaseBadge({ phase, size = 'md' }: PhaseBadgeProps) {
  const s = PHASE_STYLES[phase]
  const sizeClass = size === 'sm'
    ? 'text-[9px] px-1 py-0 leading-4'
    : 'text-[11px] px-1.5 py-0.5 leading-4'

  return (
    <span
      className={`inline-flex items-center rounded font-semibold tracking-wide ring-1 ring-inset ${sizeClass} ${s.bg} ${s.text} ${s.ring}`}
    >
      {phase}
    </span>
  )
}
