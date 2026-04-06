import { useCallback, useMemo, useState, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  MarkerType,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useNpiStore } from '@/store/useNpiStore'
import { useCriticalPath } from '@/hooks/useCriticalPath'
import { computeDagreLayout } from '@/utils/graphLayout'
import type { AppNode, AppEdge } from '@/types'
import TaskNode from './TaskNode'
import CriticalEdge from './CriticalEdge'
import MapControls from './MapControls'

const nodeTypes = { taskNode: TaskNode }
const edgeTypes = { taskEdge: CriticalEdge }

const defaultEdgeOptions = {
  type: 'taskEdge',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 14,
    height: 14,
  },
}

export default function DependencyMapView() {
  const tasks = useNpiStore((s) => s.tasks)
  const selectedTaskId = useNpiStore((s) => s.selectedTaskId)
  const setSelectedTask = useNpiStore((s) => s.setSelectedTask)
  const phaseFilter = useNpiStore((s) => s.phaseFilter)
  const { criticalTaskIds, criticalEdges } = useCriticalPath()

  const [layoutKey, setLayoutKey] = useState(0)

  const layoutPositions = useMemo(
    () => computeDagreLayout(tasks),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasks, layoutKey]
  )

  const initialNodes = useMemo<AppNode[]>(
    () =>
      tasks.map((task) => ({
        id: task.id,
        type: 'taskNode' as const,
        position: layoutPositions.get(task.id) ?? { x: 0, y: 0 },
        data: {
          task,
          isCritical: criticalTaskIds.has(task.id),
          isSelected: task.id === selectedTaskId,
          isFiltered: phaseFilter === 'all' || task.phase === phaseFilter,
        },
      })),
    [tasks, layoutPositions, criticalTaskIds, selectedTaskId, phaseFilter]
  )

  const initialEdges = useMemo<AppEdge[]>(
    () =>
      tasks.flatMap((task) =>
        task.dependencies
          .filter((depId) => tasks.some((t) => t.id === depId))
          .map((depId) => {
            const edgeKey = `${depId}->${task.id}`
            const isCritical = criticalEdges.has(edgeKey)
            const srcTask = tasks.find((t) => t.id === depId)
            const isCrossPhase =
              phaseFilter !== 'all' &&
              (srcTask?.phase !== phaseFilter || task.phase !== phaseFilter)
            const edgeColor = isCrossPhase ? '#34343a' : isCritical ? '#d97706' : '#62666d'
            return {
              id: edgeKey,
              source: depId,
              target: task.id,
              type: 'taskEdge' as const,
              data: { isCritical, isCrossPhase },
              animated: isCritical && !isCrossPhase,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: edgeColor,
                width: 14,
                height: 14,
              },
            } satisfies AppEdge
          })
      ),
    [tasks, criticalEdges, phaseFilter]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes, setNodes])

  useEffect(() => {
    setEdges(initialEdges)
  }, [initialEdges, setEdges])

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedTask(selectedTaskId === node.id ? null : node.id)
    },
    [selectedTaskId, setSelectedTask]
  )

  const onPaneClick = useCallback(() => {
    setSelectedTask(null)
  }, [setSelectedTask])

  const handleRelayout = useCallback(() => {
    setLayoutKey((k) => k + 1)
  }, [])

  if (tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-[#62666d]">
        <div className="text-center">
          <svg className="h-10 w-10 mx-auto mb-3 text-[#34343a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-[13px] font-[510]">No tasks to display</p>
          <p className="text-[11px] mt-1 text-[#62666d]">Switch to Spreadsheet view to add tasks</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-right"
        style={{ background: '#08090a' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={0.8} color="#23252a" />
        <Controls showInteractive={false} />
        <MapControls onRelayout={handleRelayout} />
      </ReactFlow>
    </div>
  )
}
