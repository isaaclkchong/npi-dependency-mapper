import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { nanoid } from 'nanoid'
import type { NpiStore, NpiTask, Phase } from '@/types'
import { ViewMode } from '@/types'
import { DEMO_TASKS } from '@/data/demoData'

export const useNpiStore = create<NpiStore>()(
  persist(
    immer((set) => ({
      // ── State ────────────────────────────────────────────────────────────────
      tasks: DEMO_TASKS,
      selectedTaskId: null,
      viewMode: ViewMode.Spreadsheet,
      phaseFilter: 'all' as Phase | 'all',

      // ── Actions ───────────────────────────────────────────────────────────────

      addTask: (taskInput) =>
        set((state) => {
          const now = new Date().toISOString()
          const newTask: NpiTask = {
            ...taskInput,
            id: nanoid(8),
            createdAt: now,
            updatedAt: now,
          }
          state.tasks.push(newTask)
        }),

      updateTask: (id, patch) =>
        set((state) => {
          const idx = state.tasks.findIndex((t) => t.id === id)
          if (idx !== -1) {
            Object.assign(state.tasks[idx], patch, {
              updatedAt: new Date().toISOString(),
            })
          }
        }),

      deleteTask: (id) =>
        set((state) => {
          state.tasks = state.tasks.filter((t) => t.id !== id)
          // Cascade: remove id from other tasks' dependency lists
          state.tasks.forEach((t) => {
            t.dependencies = t.dependencies.filter((dep) => dep !== id)
          })
          if (state.selectedTaskId === id) {
            state.selectedTaskId = null
          }
        }),

      setSelectedTask: (id) =>
        set((state) => {
          state.selectedTaskId = id
        }),

      setViewMode: (mode) =>
        set((state) => {
          state.viewMode = mode
        }),

      setPhaseFilter: (phase) =>
        set((state) => {
          state.phaseFilter = phase
        }),

      resetToDemo: () =>
        set((state) => {
          state.tasks = DEMO_TASKS
          state.selectedTaskId = null
          state.phaseFilter = 'all'
        }),
    })),
    {
      name: 'npi-tool-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        viewMode: state.viewMode,
        phaseFilter: state.phaseFilter,
      }),
      version: 2,
    }
  )
)
