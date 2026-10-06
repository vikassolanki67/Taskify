import React, { useState } from "react"
import {
  CalendarDays,
  MoreVertical,
} from "lucide-react"

import useStore from "../../store/taskStore"
import TaskActionMenu from "./TaskActionMenu"
import TaskDetails from "./TaskDetails"
import TaskFormModal from "./TaskFormModal"
import ConfirmDialog from "../common/ConfirmDialog"

const TaskList = ({ visibleTasks, totalTasks, onAddTask }) => {
  const toggleTask = useStore((state) => state.toggleTask)
  const deleteTask = useStore((state) => state.deleteTask)
  const showToast = useStore((state) => state.showToast)

  const [selectedTask, setSelectedTask] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  
  function handleView(task) {
    setSelectedTask(task)
    setIsDetailsOpen(true)
  }

  
  function handleEdit(task) {
    setSelectedTask(task)
    setIsEditOpen(true)
  }

  
  function handleDelete(task) {
    setSelectedTask(task)
    setIsDeleteOpen(true)
  }

  
  function deleteHandle() {
    if (!selectedTask) return

    deleteTask(selectedTask.id)
    showToast("deleted", selectedTask.title)

    setSelectedTask(null)
    setIsDeleteOpen(false)
  }

 
  if (totalTasks.length === 0) {
    return (
      <>
        <div className="ml-[260px] w-[calc(100%-260px)] px-2 -mb-2.5 pb-6">
          <div className="flex h-[280px] flex-col items-center justify-center rounded-2xl border border-[#E6EBF4] bg-white shadow-[0_5px_20px_rgba(44,62,120,0.07)]">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0ECFF] text-3xl">
              📦
            </div>

            <h2 className="text-[22px] font-bold text-[#111A46]">
              No Tasks Found
            </h2>

            <p className="mt-2 text-[14px] text-[#5870A6]">
              Create your first task and start getting things done.
            </p>

            <button
              type="button"
              onClick={onAddTask}
              className="mt-5 rounded-xl bg-[#6246F5] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(98,70,245,0.22)] transition hover:-translate-y-0.5"
            >
              + Add Task
            </button>

          </div>
        </div>
      </>
    )
  }

  // NO MATCH
  if (visibleTasks.length === 0) {
    return (
      <div className="ml-[260px] w-[calc(100%-260px)] px-2 pb-6">
        <div className="flex h-[280px] flex-col items-center justify-center rounded-2xl border border-[#E6EBF4] bg-white shadow-[0_5px_20px_rgba(44,62,120,0.07)]">

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0ECFF] text-3xl">
            🔍
          </div>

          <h2 className="text-[22px] font-bold text-[#111A46]">
            No Matching Tasks
          </h2>

          <p className="mt-2 text-[14px] text-[#5870A6]">
            No tasks match your current filters.
          </p>

        </div>
      </div>
    )
  }

  return (
    <>
      <div className="ml-[260px] px-2 pb-6">
        <div className="overflow-hidden rounded-2xl border border-[#E6EBF4] bg-white shadow-[0_5px_20px_rgba(44,62,120,0.07)]">

          {/* HEADER */}
          <div className="grid grid-cols-[50px_minmax(220px,2fr)_1fr_1fr_1.3fr_1fr_55px] items-center border-b border-[#E8EDF5] bg-[#F7F9FD] px-5 py-3.5 text-[13px] font-semibold text-[#4A6195]">

            <div>
              <input
                type="checkbox"
                className="h-5 w-5 accent-[#6246F5]"
              />
            </div>

            <div>Task Title</div>
            <div>Category</div>
            <div>Priority</div>
            <div>Due Date</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>

          {/* TASK ROWS */}
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              className="grid min-h-[62px] grid-cols-[50px_minmax(220px,2fr)_1fr_1fr_1.3fr_1fr_55px] items-center border-b border-[#E8EDF5] px-5 py-2.5 last:border-b-0 hover:bg-[#FAFBFE]"
            >

              {/* CHECKBOX */}
              <div>
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 cursor-pointer accent-[#6246F5]"
                />
              </div>

              {/* TITLE */}
              <div className="min-w-0 pr-5">
                <p
                  title={task.title}
                  className={`truncate text-[14px] font-semibold ${
                    task.status === "completed"
                      ? "text-[#8B96AD] line-through"
                      : "text-[#111A46]"
                  }`}
                >
                  {task.title}
                </p>
              </div>

              {/* CATEGORY */}
              <div>
                <span className="inline-flex rounded-md bg-[#E8F4FF] px-3 py-1 text-[12px] font-medium capitalize text-[#2878D7]">
                  {task.category}
                </span>
              </div>

              {/* PRIORITY */}
              <div>
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-[12px] font-semibold capitalize ${
                    task.priority === "high"
                      ? "bg-[#FFE5E7] text-[#FF3D52]"
                      : task.priority === "medium"
                        ? "bg-[#FFF0DC] text-[#E88A00]"
                        : "bg-[#DDF8ED] text-[#14945F]"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {/* DUE DATE */}
              <div>
                {task.dueDate ? (
                  <div className="flex items-center gap-2 text-[13px] text-[#4D628E]">
                    <CalendarDays size={16} />
                    <span>{task.dueDate}</span>
                  </div>
                ) : (
                  <span className="text-[13px] text-[#8994A9]">
                    No due date
                  </span>
                )}
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-[12px] font-semibold ${
                    task.status === "completed"
                      ? "bg-[#DCEBFF] text-[#2777D5]"
                      : "bg-[#DDF8ED] text-[#14945F]"
                  }`}
                >
                  {task.status === "completed"
                    ? "Completed"
                    : "Pending"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center">
                <TaskActionMenu
                  task={task}
                  onView={() => handleView(task)}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => handleDelete(task)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW DETAILS */}
      {isDetailsOpen && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => {
            setIsDetailsOpen(false)
            setSelectedTask(null)
          }}
          onEdit={() => {
            setIsDetailsOpen(false)
            setIsEditOpen(true)
          }}
          onDelete={() => {
            setIsDetailsOpen(false)
            setIsDeleteOpen(true)
          }}
        />
      )}

      {/* EDIT */}
      {isEditOpen && selectedTask && (
        <TaskFormModal
          task={selectedTask}
          onClose={() => {
            setIsEditOpen(false)
            setSelectedTask(null)
          }}
        />
      )}

      {/* DELETE CONFIRM */}
      {isDeleteOpen && selectedTask && (
        <ConfirmDialog
          task={selectedTask}
          onClose={() => {
            setIsDeleteOpen(false)
            setSelectedTask(null)
          }}
          onConfirm={deleteHandle}
        />
      )}
    </>
  )
}

export default TaskList