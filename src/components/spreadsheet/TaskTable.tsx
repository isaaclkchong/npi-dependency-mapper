import { useRef, useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { useNpiStore } from '@/store/useNpiStore'
import { useCriticalPath } from '@/hooks/useCriticalPath'
import type { NpiTask } from '@/types'
import { TaskStatus } from '@/types'
import EditableCell from './EditableCell'
import StatusBadge from './StatusBadge'
import PhaseBadge from './PhaseBadge'
import DeleteConfirmDialog from './DeleteConfirmDialog'

const columnHelper = createColumnHelper<NpiTask>()

interface TaskTableProps {
  tasks: NpiTask[]
}

export default function TaskTable({ tasks }: TaskTableProps) {
  const updateTask = useNpiStore((s) => s.updateTask)
  const deleteTask = useNpiStore((s) => s.deleteTask)
  const selectedTaskId = useNpiStore((s) => s.selectedTaskId)
  const setSelectedTask = useNpiStore((s) => s.setSelectedTask)
  const { criticalTaskIds } = useCriticalPath()

  const [sorting, setSorting] = useState<SortingState>([])
  const [deleteTarget, setDeleteTarget] = useState<NpiTask | null>(null)

  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map())

  // Scroll selected row into view when selection changes
  useEffect(() => {
    if (selectedTaskId) {
      const el = rowRefs.current.get(selectedTaskId)
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedTaskId])

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      size: 72,
      cell: (info) => (
        <span className="font-mono text-[11px] font-medium text-zinc-400">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('phase', {
      header: 'Phase',
      size: 80,
      cell: (info) => <PhaseBadge phase={info.getValue()} />,
    }),
    columnHelper.accessor('name', {
      header: 'Task name',
      size: 260,
      cell: (info) => (
        <EditableCell
          value={info.getValue()}
          type="text"
          onChange={(v) => updateTask(info.row.original.id, { name: v as string })}
          className="font-medium text-zinc-800 w-full"
          placeholder="Task name"
        />
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 150,
      cell: (info) => (
        <EditableCell
          value={info.getValue()}
          type="select-status"
          onChange={(v) => updateTask(info.row.original.id, { status: v as TaskStatus })}
        />
      ),
    }),
    columnHelper.accessor('owner', {
      header: 'Owner',
      size: 140,
      cell: (info) => (
        <EditableCell
          value={info.getValue()}
          type="text"
          onChange={(v) => updateTask(info.row.original.id, { owner: v as string })}
          placeholder="—"
          className="text-zinc-600"
        />
      ),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due date',
      size: 120,
      cell: (info) => {
        const val = info.getValue()
        const isOverdue =
          val && new Date(val) < new Date() && info.row.original.status !== TaskStatus.Complete
        return (
          <EditableCell
            value={val}
            type="date"
            onChange={(v) => updateTask(info.row.original.id, { dueDate: v as string })}
            className={isOverdue ? 'text-red-600 font-medium' : 'text-zinc-600'}
            placeholder="—"
          />
        )
      },
    }),
    columnHelper.accessor('duration', {
      header: 'Days',
      size: 72,
      cell: (info) => (
        <EditableCell
          value={info.getValue()}
          type="number"
          onChange={(v) => updateTask(info.row.original.id, { duration: Number(v) })}
          className="text-right tabular-nums text-zinc-600"
        />
      ),
    }),
    columnHelper.accessor('dependencies', {
      header: 'Depends on',
      size: 140,
      enableSorting: false,
      cell: (info) => {
        const deps = info.getValue()
        if (deps.length === 0) return <span className="text-zinc-300 text-[11px]">—</span>
        return (
          <span
            className="text-[11px] text-zinc-500 font-mono font-medium bg-zinc-100 px-1.5 py-0.5 rounded"
            title={deps.join(', ')}
          >
            {deps.join(', ')}
          </span>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      size: 48,
      cell: (info) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setDeleteTarget(info.row.original)
          }}
          className="opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-red-500 transition-all p-1 rounded"
          aria-label="Delete task"
          title="Delete task"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      ),
    }),
  ]

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div className="overflow-auto h-full">
        <table className="w-full border-collapse text-[13px]">
          <thead className="sticky top-0 z-10 bg-zinc-50/95 backdrop-blur-sm border-b border-zinc-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={`px-3 py-2 text-left text-[11px] font-semibold text-zinc-400 uppercase tracking-wider select-none ${
                      header.column.getCanSort() ? 'cursor-pointer hover:text-zinc-600' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' && (
                        <svg className="h-3 w-3 text-indigo-500" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3l5 6H3z"/></svg>
                      )}
                      {header.column.getIsSorted() === 'desc' && (
                        <svg className="h-3 w-3 text-indigo-500" viewBox="0 0 16 16" fill="currentColor"><path d="M8 13l5-6H3z"/></svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => {
              const isSelected = row.original.id === selectedTaskId
              const isCritical = criticalTaskIds.has(row.original.id)
              return (
                <tr
                  key={row.id}
                  ref={(el) => {
                    if (el) rowRefs.current.set(row.original.id, el)
                    else rowRefs.current.delete(row.original.id)
                  }}
                  onClick={() =>
                    setSelectedTask(isSelected ? null : row.original.id)
                  }
                  className={`group border-b border-zinc-100 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/60 ring-1 ring-inset ring-indigo-200'
                      : 'hover:bg-zinc-50/80'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 ${
                        isCritical && cell.column.id === 'id'
                          ? 'border-l-[3px] border-l-amber-400'
                          : ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center text-zinc-400 text-[13px]">
                  No tasks yet. Add a task to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="shrink-0 px-4 py-2 border-t border-zinc-100 bg-white flex items-center gap-4 text-[11px] text-zinc-400 font-medium">
        {Object.values(TaskStatus).map((s) => {
          const count = tasks.filter((t) => t.status === s).length
          return (
            <span key={s} className="flex items-center gap-1.5">
              <StatusBadge status={s} size="sm" />
              <span className="tabular-nums">{count}</span>
            </span>
          )
        })}
        <span className="ml-auto tabular-nums">{criticalTaskIds.size} critical path tasks</span>
      </div>

      {deleteTarget && (
        <DeleteConfirmDialog
          taskName={deleteTarget.name}
          onConfirm={() => {
            deleteTask(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}
