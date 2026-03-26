import type { Node, Edge } from '@xyflow/react'

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum TaskStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Complete = 'Complete',
  Blocked = 'Blocked',
}

export enum ViewMode {
  Spreadsheet = 'spreadsheet',
  DependencyMap = 'dependency-map',
}

export type Phase = 'EVT' | 'DVT' | 'PVT' | 'MP'

// ─── Core Data Model ──────────────────────────────────────────────────────────

export interface NpiTask {
  id: string
  name: string
  phase: Phase
  status: TaskStatus
  owner: string
  startDate: string   // ISO date string
  dueDate: string     // ISO date string
  duration: number    // working days
  dependencies: string[]  // array of NpiTask.id
  notes: string
  createdAt: string
  updatedAt: string
}

// ─── Critical Path Analysis ───────────────────────────────────────────────────

export interface CpmNode {
  taskId: string
  earliestStart: number
  earliestFinish: number
  latestStart: number
  latestFinish: number
  totalFloat: number
  isCritical: boolean
}

export interface CriticalPathResult {
  criticalTaskIds: Set<string>
  criticalEdges: Set<string>   // "sourceId->targetId"
  projectDuration: number
  cpmNodes: Map<string, CpmNode>
}

// ─── React Flow Types ─────────────────────────────────────────────────────────

export interface TaskNodeData extends Record<string, unknown> {
  task: NpiTask
  isCritical: boolean
  isSelected: boolean
  isFiltered: boolean
  cpmNode?: CpmNode
}

export interface EdgeData extends Record<string, unknown> {
  isCritical: boolean
  isCrossPhase: boolean
}

export type AppNode = Node<TaskNodeData, 'taskNode'>
export type AppEdge = Edge<EdgeData>

// ─── Store Shape ──────────────────────────────────────────────────────────────

export interface NpiStoreState {
  tasks: NpiTask[]
  selectedTaskId: string | null
  viewMode: ViewMode
  phaseFilter: Phase | 'all'
}

export interface NpiStoreActions {
  addTask: (task: Omit<NpiTask, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, patch: Partial<NpiTask>) => void
  deleteTask: (id: string) => void
  setSelectedTask: (id: string | null) => void
  setViewMode: (mode: ViewMode) => void
  setPhaseFilter: (phase: Phase | 'all') => void
  resetToDemo: () => void
}

export type NpiStore = NpiStoreState & NpiStoreActions
