import { CalendarDaysIcon,Flag,Square,SquareCheck,EllipsisVertical } from 'lucide-react'
import React from 'react'
import useStore from '../store/taskStore'

function RecentTasks({ task, taskIndex }) {

  const toggle = useStore((state) => state.toggleTask)

  const ToggleTask = () => {
    toggle(task.id)
  }

  const priorityStyle =
    task.priority === "high"
      ? {
          flag: "text-[#EF4444]",
          bg: "bg-[#FFF0F1]"
        }
      : task.priority === "medium"
      ? {
          flag: "text-[#F5A623]",
          bg: "bg-[#FFF7E8]"
        }
      : {
          flag: "text-[#B9C6DA]",
          bg: "bg-[#F3F6FA]"
        }

  const categoryStyle =
    task.category === "work"
      ? "bg-[#FFE9EE] text-[#EF6477]"
      : task.category === "study"
      ? "bg-[#E8F2FF] text-[#2477F3]"
      : task.category === "personal"
      ? "bg-[#EFEAFF] text-[#6D3DF5]"
      : task.category === "shopping"
      ? "bg-[#EAF9F1] text-[#16A66E]"
      : "bg-[#EEF2F7] text-[#536B9E]"

  return (
    <div className="flex h-[62px] -mt-1 items-center border-b border-[#E8EEF8] px-6 transition-all duration-200 hover:bg-[#FAFCFF]">

      <button
        type="button"
        onClick={ToggleTask}
        className="mr-5 flex shrink-0 items-center justify-center text-[#54709F] transition-all duration-200 hover:scale-105"
      >
        {task.status === "active" ? (
          <Square size={26} strokeWidth={1.8} />
        ) : (
          <SquareCheck
            size={27}
            strokeWidth={2}
            className="text-[#10B981]"
          />
        )}
      </button>

      <div className="w-[225px] min-w-0">
        <p
          className={`truncate text-[15px] font-medium ${
            task.status === "completed"
              ? "text-[#7C8EAD] line-through"
              : "text-[#172554]"
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="w-[110px]">
        <span
          className={`inline-flex rounded-lg px-3 py-1 text-[11px] font-semibold capitalize ${categoryStyle}`}
        >
          {task.category}
        </span>
      </div>

      <div className="flex w-[150px] items-center gap-2 text-[#58709D]">
        <CalendarDaysIcon size={19} strokeWidth={2} />

        <p className="text-[13px] font-medium">
          {task.dueDate || "No due date"}
        </p>
      </div>

      <div className="flex w-[70px] justify-center">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${priorityStyle.bg}`}
        >
          <Flag
            size={21}
            strokeWidth={2.2}
            className={priorityStyle.flag}
            fill="currentColor"
          />
        </span>
      </div>

      <button
        type="button"
        className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-[#54709F] transition-all duration-200 hover:bg-[#EEF3FB] hover:text-[#243B70]"
      >
        <EllipsisVertical size={20} strokeWidth={2.2} />
      </button>

    </div>
  )
}

export default RecentTasks