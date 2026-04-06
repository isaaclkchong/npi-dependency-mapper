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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.85)]"
      onClick={onCancel}
    >
      <div
        className="bg-[#191a1b] rounded-xl border border-[rgba(255,255,255,0.08)] p-6 w-96 max-w-[90vw]"
        style={{ boxShadow: 'rgba(0,0,0,0) 0px 8px 2px, rgba(0,0,0,0.01) 0px 5px 2px, rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.08) 0px 0px 1px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-[rgba(239,68,68,0.12)] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="h-4 w-4 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
          <div>
            <h2 className="text-[15px] font-[590] text-[#f7f8f8] tracking-[-0.165px]">Delete task?</h2>
            <p className="text-[13px] text-[#8a8f98] mt-1 leading-relaxed">
              <strong className="text-[#d0d6e0] font-[510]">"{taskName}"</strong> will be permanently deleted and
              removed from all dependency lists.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 text-[13px] rounded-md border border-[rgba(255,255,255,0.08)] text-[#8a8f98] font-[510] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#d0d6e0] transition-colors bg-[rgba(255,255,255,0.02)]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3.5 py-1.5 text-[13px] rounded-md bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors font-[590]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
