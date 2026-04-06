import { memo } from 'react'
import {
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
} from '@xyflow/react'
import type { AppEdge } from '@/types'

function CriticalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<AppEdge>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const isCritical = data?.isCritical ?? false
  const isCrossPhase = data?.isCrossPhase ?? false

  const stroke = isCrossPhase ? '#d4d4d8' : isCritical ? '#d97706' : '#a1a1aa'
  const strokeWidth = isCrossPhase ? 1.2 : isCritical ? 2 : 1.2
  const strokeDasharray = isCrossPhase ? '5 3' : undefined

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke, strokeWidth, strokeDasharray }}
      />
      {/* Invisible wider stroke for easier hover/click */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
      />
      <EdgeLabelRenderer>{null}</EdgeLabelRenderer>
    </>
  )
}

export default memo(CriticalEdge)
