import { CalendarHeartIcon, X, Clock, CalendarPlus } from 'lucide-react'
import React, { useState } from 'react'
import TaskFormModal from './TaskFormModal'
import ConfirmDialog from '../common/ConfirmDialog'

function TaskDetails({ onClose, task }) {

  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]">
      <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.20)]">

        <div className="flex items-center justify-between border-b border-[#E8EEF8] px-6 py-5">
          <h1 className="text-[22px] font-bold text-[#111A46]">
            Task Details
          </h1>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#58709D] transition-all duration-200 hover:bg-[#EEF3FB] hover:text-[#243B70]"
          >
            <X size={21} strokeWidth={2.2} />
          </button>
        </div>

        <div className="px-6 py-5">

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[12px] font-bold capitalize ${
                task.priority === 'high'
                  ? 'bg-[#FFE5E8] text-[#EF4444]'
                  : task.priority === 'medium'
                    ? 'bg-[#FFF2D9] text-[#C48118]'
                    : 'bg-[#EEF2F7] text-[#536B9E]'
              }`}
            >
              {task.priority}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-[12px] font-bold capitalize ${
                task.category === 'study'
                  ? 'bg-[#EAE5FF] text-[#5B3DF5]'
                  : task.category === 'work'
                    ? 'bg-[#FFE9EE] text-[#EF6477]'
                    : task.category === 'personal'
                      ? 'bg-[#EFEAFF] text-[#6D3DF5]'
                      : task.category === 'shopping'
                        ? 'bg-[#EAF9F1] text-[#16A66E]'
                        : 'bg-[#EEF2F7] text-[#536B9E]'
              }`}
            >
              {task.category}
            </span>
          </div>

          <h2 className="mt-4 break-words text-[22px] font-bold leading-tight text-[#111A46]">
            {task.title}
          </h2>

          <p className="mt-2 break-words text-[14px] leading-6 text-[#7183A6]">
            {task.description || 'No description added.'}
          </p>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#536B9E]">
                <CalendarHeartIcon size={20} strokeWidth={2} />
                <p className="text-[14px] font-medium">Due Date</p>
              </div>

              <p className="text-[14px] font-semibold text-[#243B70]">
                {task.dueDate || 'No due date'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#536B9E]">
                <Clock size={20} strokeWidth={2} />
                <p className="text-[14px] font-medium">Status</p>
              </div>

              <p
                className={`text-[14px] font-semibold capitalize ${
                  task.status === 'completed'
                    ? 'text-[#10B981]'
                    : 'text-[#F5A623]'
                }`}
              >
                {task.status}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#536B9E]">
                <CalendarPlus size={20} strokeWidth={2} />
                <p className="text-[14px] font-medium">Created On</p>
              </div>

              <p className="text-[14px] font-semibold text-[#243B70]">
                {new Date(task.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#E8EEF8] bg-[#FBFCFF] px-6 py-4">
            {isEditModalOpen && (
                <TaskFormModal 
                task={task}
                onClose={() => setEditModalOpen(false)}
                />
            )}
          <button
            type="button"
            onClick={() => {
                setEditModalOpen(true)
                
            }}
            className="h-11 flex-1 rounded-xl border border-[#DCE6F7] bg-[#F4F7FC] text-[14px] font-semibold text-[#243B70] transition-all duration-200 hover:bg-[#EAF0F9]"
          >
            Edit
          </button>

          {isDeleteModalOpen && (
            <ConfirmDialog 
              task={task}
              onClose={() => setDeleteModalOpen(false)}
            />
          )}
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="h-11 flex-1 rounded-xl bg-[#EF4444] text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(239,68,68,0.22)] transition-all duration-200 hover:bg-[#DC3D48] hover:shadow-[0_10px_22px_rgba(239,68,68,0.30)]"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default TaskDetails