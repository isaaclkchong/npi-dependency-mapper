import type { NpiTask, CriticalPathResult, CpmNode } from '@/types'

export function computeCriticalPath(tasks: NpiTask[]): CriticalPathResult {
  if (tasks.length === 0) {
    return {
      criticalTaskIds: new Set(),
      criticalEdges: new Set(),
      projectDuration: 0,
      cpmNodes: new Map(),
    }
  }

  // Build lookup and adjacency maps
  const taskMap = new Map(tasks.map((t) => [t.id, t]))
  const successors = new Map<string, Set<string>>()
  const predecessors = new Map<string, Set<string>>()

  for (const task of tasks) {
    if (!successors.has(task.id)) successors.set(task.id, new Set())
    if (!predecessors.has(task.id)) predecessors.set(task.id, new Set())
    for (const depId of task.dependencies) {
      if (taskMap.has(depId)) {
        if (!successors.has(depId)) successors.set(depId, new Set())
        successors.get(depId)!.add(task.id)
        predecessors.get(task.id)!.add(depId)
      }
    }
  }

  // Topological sort via Kahn's algorithm
  const inDegree = new Map<string, number>()
  for (const task of tasks) {
    inDegree.set(task.id, predecessors.get(task.id)!.size)
  }

  const queue: string[] = []
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id)
  }

  const topoOrder: string[] = []
  while (queue.length > 0) {
    const id = queue.shift()!
    topoOrder.push(id)
    for (const succId of successors.get(id) ?? []) {
      const newDeg = (inDegree.get(succId) ?? 1) - 1
      inDegree.set(succId, newDeg)
      if (newDeg === 0) queue.push(succId)
    }
  }

  // If cycle detected, fall back to partial result
  if (topoOrder.length < tasks.length) {
    const partialIds = new Set(topoOrder)
    const cyclicTasks = tasks.filter((t) => !partialIds.has(t.id))
    console.warn('Cycle detected in task dependencies:', cyclicTasks.map((t) => t.id))
  }

  // Forward pass — Earliest Start / Earliest Finish
  const ES = new Map<string, number>()
  const EF = new Map<string, number>()

  for (const id of topoOrder) {
    const task = taskMap.get(id)!
    const preds = predecessors.get(id) ?? new Set()
    let es = 0
    for (const predId of preds) {
      es = Math.max(es, EF.get(predId) ?? 0)
    }
    ES.set(id, es)
    EF.set(id, es + task.duration)
  }

  const projectDuration = Math.max(...tasks.map((t) => EF.get(t.id) ?? 0), 0)

  // Backward pass — Latest Start / Latest Finish
  const LS = new Map<string, number>()
  const LF = new Map<string, number>()

  for (const id of [...topoOrder].reverse()) {
    const task = taskMap.get(id)!
    const succs = successors.get(id) ?? new Set()
    let lf = projectDuration
    for (const succId of succs) {
      lf = Math.min(lf, LS.get(succId) ?? projectDuration)
    }
    LF.set(id, lf)
    LS.set(id, lf - task.duration)
  }

  // Build CpmNode map
  const cpmNodes = new Map<string, CpmNode>()
  const criticalTaskIds = new Set<string>()

  for (const task of tasks) {
    const es = ES.get(task.id) ?? 0
    const ef = EF.get(task.id) ?? task.duration
    const ls = LS.get(task.id) ?? 0
    const lf = LF.get(task.id) ?? task.duration
    const totalFloat = ls - es
    const isCritical = totalFloat === 0

    cpmNodes.set(task.id, {
      taskId: task.id,
      earliestStart: es,
      earliestFinish: ef,
      latestStart: ls,
      latestFinish: lf,
      totalFloat,
      isCritical,
    })

    if (isCritical) criticalTaskIds.add(task.id)
  }

  // Identify critical edges: A→B is critical if both critical AND EF[A] === ES[B]
  const criticalEdges = new Set<string>()
  for (const task of tasks) {
    for (const depId of task.dependencies) {
      if (
        criticalTaskIds.has(depId) &&
        criticalTaskIds.has(task.id) &&
        EF.get(depId) === ES.get(task.id)
      ) {
        criticalEdges.add(`${depId}->${task.id}`)
      }
    }
  }

  return { criticalTaskIds, criticalEdges, projectDuration, cpmNodes }
}
