import { useMemo } from 'react'
import { useNpiStore } from '@/store/useNpiStore'
import { computeCriticalPath } from '@/utils/criticalPath'

export function useCriticalPath() {
  const tasks = useNpiStore((state) => state.tasks)
  return useMemo(() => computeCriticalPath(tasks), [tasks])
}
