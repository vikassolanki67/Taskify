import React from 'react'
import { Eye, PencilSparkles, Trash } from 'lucide-react'

function TaskActionMenu() {
  return (
    <div className="w-[190px] overflow-hidden rounded-xl border border-[#E2E9F5] bg-white p-1.5 shadow-[0_10px_30px_rgba(30,64,175,0.14)]">
      <button
        type="button"
        className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium text-[#243B70] transition-all duration-200 hover:bg-[#EEF4FF] hover:text-[#1769FF]"
      >
        <Eye size={18} strokeWidth={2} />
        <span>View Details</span>
      </button>

      <button
        type="button"
        className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium text-[#243B70] transition-all duration-200 hover:bg-[#F2EEFF] hover:text-[#6D3DF5]"
      >
        <PencilSparkles size={18} strokeWidth={2} />
        <span>Edit Task</span>
      </button>

      <div className="my-1 h-px bg-[#E8EEF8]" />

      <button
        type="button"
        className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium text-[#EF4444] transition-all duration-200 hover:bg-[#FFF1F2]"
      >
        <Trash size={18} strokeWidth={2} />
        <span>Delete Task</span>
      </button>
    </div>
  )
}

export default TaskActionMenu