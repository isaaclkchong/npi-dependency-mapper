interface DeleteConfirmDialogProps {
  taskName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmDialog({
  taskName,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/20 backdrop-blur-[2px]"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-xl shadow-zinc-200/50 border border-zinc-200/60 p-6 w-96 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-zinc-900 tracking-tight">Delete task?</h2>
            <p className="text-[13px] text-zinc-500 mt-1 leading-relaxed">
              <strong className="text-zinc-700 font-medium">"{taskName}"</strong> will be permanently deleted and
              removed from all dependency lists.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 text-[13px] rounded-lg border border-zinc-200 text-zinc-500 font-medium hover:bg-zinc-50 hover:text-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3.5 py-1.5 text-[13px] rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
