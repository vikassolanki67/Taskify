import React from 'react'
import { Trash } from 'lucide-react'
import useStore from '../../store/taskStore'


function ConfirmDialog({ task, onClose }) {

  const deleteTask = useStore((state) => state.deleteTask)
  const showToast = useStore((state) => state.showToast)

  function deleteHandle(task) {
    deleteTask(task.id)
    showToast("deleted", task.title)
    onClose();
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/35 px-4 backdrop-blur-[3px]">

      <div className="w-full max-w-[315px] rounded-2xl border border-[#DCE5F3] bg-white px-6 py-5 text-center shadow-[0_20px_50px_rgba(30,64,175,0.18)]">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F1]">
          <Trash
            size={27}
            strokeWidth={2.4}
            className="text-[#EF4444]"
          />
        </div>

        
        <h1 className="text-[20px] font-bold text-[#172B5B]">
          Delete Task?
        </h1>

       
        <p className="mt-1.5 text-[15px] leading-6 text-[#536B9E]">
          Are you sure you want to
          <br />
          delete this task?
        </p>

       
        <div className="mt-5 flex gap-3">

          
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-[#D9E2F0] bg-white text-[15px] font-medium text-[#243B70] transition-all duration-200 hover:bg-[#F5F8FC] hover:border-[#C8D4E6] active:scale-[0.98]"
          >
            Cancel
          </button>

          
          <button
            type="button"
            onClick={() => deleteHandle(task)}
            className="h-11 flex-1 rounded-lg bg-[#EF3F35] text-[15px] font-semibold text-white shadow-[0_5px_12px_rgba(239,68,68,0.25)] transition-all duration-200 hover:bg-[#DC3028] hover:shadow-[0_7px_16px_rgba(239,68,68,0.32)] active:scale-[0.98]"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  )
}

export default ConfirmDialog