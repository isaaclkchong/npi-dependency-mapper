import { useState, FormEvent } from 'react'
import { TaskStatus } from '@/types'
import type { NpiTask, Phase } from '@/types'
import { useNpiStore } from '@/store/useNpiStore'

const PHASES: Phase[] = ['EVT', 'DVT', 'PVT', 'MP']

interface AddTaskModalProps {
  onClose: () => void
}

const inputClass =
  'w-full border border-[rgba(255,255,255,0.08)] rounded-md px-3 py-2 text-[13px] text-[#d0d6e0] focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]/30 bg-[rgba(255,255,255,0.02)] placeholder:text-[#62666d] transition-colors'
const labelClass = 'block text-[11px] font-[590] text-[#62666d] uppercase tracking-wider mb-1.5'

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
  const tasks = useNpiStore((s) => s.tasks)
  const addTask = useNpiStore((s) => s.addTask)

  const [form, setForm] = useState<Omit<NpiTask, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    phase: 'EVT',
    status: TaskStatus.NotStarted,
    owner: '',
    startDate: '',
    dueDate: '',
    duration: 5,
    dependencies: [],
    notes: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    addTask(form)
    onClose()
  }

  function toggleDep(id: string) {
    setForm((prev) => ({
      ...prev,
      dependencies: prev.dependencies.includes(id)
        ? prev.dependencies.filter((d) => d !== id)
        : [...prev.dependencies, id],
    }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.85)]"
      onClick={onClose}
    >
      <div
        className="bg-[#191a1b] rounded-xl border border-[rgba(255,255,255,0.08)] w-[520px] max-w-[95vw] max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: 'rgba(0,0,0,0) 0px 8px 2px, rgba(0,0,0,0.01) 0px 5px 2px, rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.08) 0px 0px 1px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <h2 className="text-[15px] font-[590] text-[#f7f8f8] tracking-[-0.165px]">Add task</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className={labelClass}>Task name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="e.g. Component sourcing"
              autoFocus
            />
          </div>

          {/* Phase */}
          <div>
            <label className={labelClass}>Phase</label>
            <select
              value={form.phase}
              onChange={(e) => setForm({ ...form, phase: e.target.value as Phase })}
              className={inputClass}
            >
              {PHASES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Status + Owner */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                className={inputClass}
              >
                {Object.values(TaskStatus).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Owner</label>
              <input
                type="text"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className={inputClass}
                placeholder="e.g. Jane Smith"
              />
            </div>
          </div>

          {/* Dates + Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Start date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Due date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Duration (days)</label>
              <input
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Dependencies */}
          {tasks.length > 0 && (
            <div>
              <label className={labelClass}>
                Dependencies <span className="text-[#62666d] font-normal normal-case tracking-normal">(predecessors)</span>
              </label>
              <div className="max-h-36 overflow-y-auto border border-[rgba(255,255,255,0.08)] rounded-lg divide-y divide-[rgba(255,255,255,0.03)]">
                {tasks.map((t) => (
                  <label
                    key={t.id}
                    className="flex items-center gap-2.5 px-3 py-2 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={form.dependencies.includes(t.id)}
                      onChange={() => toggleDep(t.id)}
                      className="h-3.5 w-3.5 rounded border-[#34343a] text-[#5e6ad2] focus:ring-[#5e6ad2]/30 bg-[rgba(255,255,255,0.02)]"
                    />
                    <span className="text-[11px] text-[#62666d] font-mono font-[510] w-10 shrink-0">{t.id}</span>
                    <span className="text-[13px] text-[#d0d6e0] truncate">{t.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-[13px] rounded-md border border-[rgba(255,255,255,0.08)] text-[#8a8f98] font-[510] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#d0d6e0] transition-colors bg-[rgba(255,255,255,0.02)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-[13px] rounded-md bg-[#5e6ad2] text-white hover:bg-[#828fff] transition-colors font-[590]"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
