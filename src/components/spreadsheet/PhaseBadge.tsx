import type { Phase } from '@/types'

const PHASE_STYLES: Record<Phase, { bg: string; text: string; border: string }> = {
  EVT: { bg: 'bg-[rgba(56,189,248,0.1)]', text: 'text-[#38bdf8]', border: 'border-[rgba(56,189,248,0.2)]' },
  DVT: { bg: 'bg-[rgba(139,92,246,0.1)]', text: 'text-[#a78bfa]', border: 'border-[rgba(139,92,246,0.2)]' },
  PVT: { bg: 'bg-[rgba(217,119,6,0.1)]', text: 'text-[#fbbf24]', border: 'border-[rgba(217,119,6,0.2)]' },
  MP:  { bg: 'bg-[rgba(16,185,129,0.1)]', text: 'text-[#10b981]', border: 'border-[rgba(16,185,129,0.2)]' },
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
      className={`inline-flex items-center rounded font-[590] tracking-wide border ${sizeClass} ${s.bg} ${s.text} ${s.border}`}
    >
      {phase}
    </span>
  )
}
