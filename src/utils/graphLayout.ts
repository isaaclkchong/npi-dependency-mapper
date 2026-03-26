import dagre from 'dagre'
import type { NpiTask } from '@/types'

const NODE_WIDTH = 200
const NODE_HEIGHT = 80

export function computeDagreLayout(
  tasks: NpiTask[],
  nodeWidth = NODE_WIDTH,
  nodeHeight = NODE_HEIGHT
): Map<string, { x: number; y: number }> {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({
    rankdir: 'LR',
    nodesep: 48,
    ranksep: 80,
    marginx: 40,
    marginy: 40,
  })

  for (const task of tasks) {
    g.setNode(task.id, { width: nodeWidth, height: nodeHeight })
  }

  for (const task of tasks) {
    for (const depId of task.dependencies) {
      if (g.hasNode(depId)) {
        g.setEdge(depId, task.id)
      }
    }
  }

  dagre.layout(g)

  const positions = new Map<string, { x: number; y: number }>()
  for (const task of tasks) {
    const node = g.node(task.id)
    if (node) {
      positions.set(task.id, {
        x: node.x - nodeWidth / 2,
        y: node.y - nodeHeight / 2,
      })
    }
  }
  return positions
}
