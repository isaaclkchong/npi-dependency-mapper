import { useMemo } from 'react'
import { useNpiStore } from '@/store/useNpiStore'

export function useSelectedTask() {
  const selectedTaskId = useNpiStore((s) => s.selectedTaskId)
  const setSelectedTask = useNpiStore((s) => s.setSelectedTask)
  const tasks = useNpiStore((s) => s.tasks)
  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedTaskId) ?? null,
    [tasks, selectedTaskId]
  )
  return { selectedTaskId, selectedTask, setSelectedTask }
}
