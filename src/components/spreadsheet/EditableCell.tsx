import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { TaskStatus } from '@/types'
import StatusBadge from './StatusBadge'

type CellType = 'text' | 'select-status' | 'date' | 'number'

interface EditableCellProps {
  value: string | number
  type: CellType
  onChange: (value: string | number) => void
  className?: string
  placeholder?: string
}

const STATUS_OPTIONS = Object.values(TaskStatus)

export default function EditableCell({
  value,
  type,
  onChange,
  className = '',
  placeholder,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<string | number>(value)
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select()
      }
    }
  }, [editing])

  function commit() {
    setEditing(false)
    if (draft !== value) {
      onChange(type === 'number' ? Number(draft) : draft)
    }
  }

  function cancel() {
    setEditing(false)
    setDraft(value)
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') cancel()
  }

  if (!editing) {
    return (
      <div
        className={`cursor-text rounded px-1 py-0.5 hover:bg-gray-100 transition-colors min-h-[24px] ${className}`}
        onClick={(e) => {
          e.stopPropagation()
          setEditing(true)
        }}
      >
        {type === 'select-status' ? (
          <StatusBadge status={value as TaskStatus} />
        ) : (
          <span className={!value ? 'text-gray-400 italic text-xs' : ''}>
            {value || placeholder || '—'}
          </span>
        )}
      </div>
    )
  }

  if (type === 'select-status') {
    return (
      <select
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        value={draft as string}
        onChange={(e) => {
          setDraft(e.target.value)
          onChange(e.target.value)
          setEditing(false)
        }}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="text-xs rounded border border-blue-400 bg-white px-1 py-0.5 outline-none focus:ring-1 focus:ring-blue-500"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'}
      value={draft as string}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      placeholder={placeholder}
      min={type === 'number' ? 1 : undefined}
      className={`w-full rounded border border-blue-400 bg-white px-1 py-0.5 text-sm outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
    />
  )
}
