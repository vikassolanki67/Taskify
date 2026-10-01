import React, { useEffect } from 'react'
import { CheckCircle2, RotateCcw, X, Trash2 } from 'lucide-react'
import useStore from '../../store/taskStore'

function Toast() {

  const toast = useStore((state) => state.toast)
  const hideToast = useStore((state) => state.hideToast)
  const undoDelete = useStore((state) => state.undoDelete)

  const isDeleted = toast?.type === 'deleted'

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      hideToast()
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast, hideToast])

  return (
    <div
      className={`fixed right-6 top-6 z-[100] w-[350px] overflow-hidden rounded-2xl border bg-white ${
        isDeleted
          ? 'border-[#c0959c] shadow-[0_12px_32px_rgba(239,68,68,0.20),0_6px_14px_rgba(15,23,42,0.14)]'
          : 'border-[#83b29d] shadow-[0_16px_40px_rgba(22,166,110,0.22),0_8px_18px_rgba(15,23,42,0.18)]'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isDeleted ? 'bg-[#FFF0F1]' : 'bg-[#E8F9F2]'
          }`}
        >
          {isDeleted ? (
            <Trash2
              size={19}
              strokeWidth={2.2}
              className="text-[#EF4444]"
            />
          ) : (
            <CheckCircle2
              size={20}
              strokeWidth={2.3}
              className="text-[#16A66E]"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={`text-[14px] font-semibold ${
              isDeleted ? 'text-[#C93636]' : 'text-[#16875D]'
            }`}
          >
            {isDeleted ? 'Task Deleted' : 'Task Restored'}
          </p>

          <p className="mt-0.5 truncate text-[12px] font-medium text-[#64779D]">
            "{toast?.title}" {isDeleted ? 'was deleted' : 'was restored'}
          </p>
        </div>

        {isDeleted && (
          <button
            type="button"
            onClick={undoDelete}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#D7E4FA] bg-[#F5F8FF] px-2.5 py-2 text-[13px] font-semibold text-[#1769FF] shadow-[0_3px_10px_rgba(23,105,255,0.08)] transition-all duration-200 hover:border-[#C5D7F7] hover:bg-[#EEF4FF]"
          >
            <RotateCcw size={14} strokeWidth={2.3} />
            Undo
          </button>
        )}

        <button
          type="button"
          onClick={hideToast}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#8798B5] transition-all duration-200 hover:bg-[#F3F6FA] hover:text-[#243B70]"
        >
          <X size={16} strokeWidth={2} />
        </button>

      </div>
    </div>
  )
}

export default Toast