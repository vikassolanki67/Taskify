
import React, { useEffect, useRef } from "react";
import {
  CalendarDaysIcon,
  Flag,
  Square,
  SquareCheck,
  EllipsisVertical,
} from "lucide-react";
import useStore from "../../store/taskStore.js";
import TaskActionMenu from "../task/TaskActionMenu";

function RecentTasks({ task, taskIndex, totalTasks, openMenuId, setOpenMenuId }) {
  const toggle = useStore((state) => state.toggleTask);

  const openUp = taskIndex >= totalTasks -1;

  const priorityStyle =
    task.priority === "high"
      ? {
          flag: "text-[#EF4444]",
          bg: "bg-[#FFF0F1] dark:bg-[#EF4444]/15",
        }
      : task.priority === "medium"
        ? {
            flag: "text-[#F5A623]",
            bg: "bg-[#FFF7E8] dark:bg-[#F5A623]/15",
          }
        : {
            flag: "text-[#B9C6DA] dark:text-[#B0C6D4]",
            bg: "bg-[#F3F6FA] dark:bg-[#29445B]",
          };

  const categoryStyle =
    task.category === "work"
      ? "bg-[#FFE9EE] text-[#EF6477] dark:bg-[#EF6477]/15 dark:text-[#FF9BAA]"
      : task.category === "study"
        ? "bg-[#E8F2FF] text-[#2477F3] dark:bg-[#2477F3]/15 dark:text-[#7DB5FF]"
        : task.category === "personal"
          ? "bg-[#EFEAFF] text-[#6D3DF5] dark:bg-[#6D3DF5]/20 dark:text-[#B6A3FF]"
          : task.category === "shopping"
            ? "bg-[#EAF9F1] text-[#16A66E] dark:bg-[#16A66E]/15 dark:text-[#65DDA5]"
            : "bg-[#EEF2F7] text-[#536B9E] dark:bg-[#29445B] dark:text-[#B0C6D4]";

  const handleMenuToggle = () => {
    setOpenMenuId(openMenuId === task.id ? null : task.id);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    if (openMenuId !== task.id) return;

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openMenuId, task.id, setOpenMenuId]);

  return (
    <div className="relative flex h-[62px] min-w-0 items-center gap-1.5 border-b border-[#E8EEF8] bg-white px-2 transition-all duration-200 hover:bg-[#FAFCFF] dark:border-[#31516A]/70 dark:bg-[#0e1e2d] dark:hover:bg-[#25445D] sm:gap-2 sm:px-3">      
      <button
        type="button"
        onClick={() => toggle(task.id)}
        aria-label={task.status === "active" ? "Complete task" : "Reopen task"}
        className="flex shrink-0 items-center justify-center text-[#54709F] transition-all duration-200 hover:scale-105 dark:text-[#B0C6D4] dark:hover:text-[#55E4DB]"
      >
        {task.status === "active" ? (
          <Square size={23} strokeWidth={1.8} />
        ) : (
          <SquareCheck
            size={24}
            strokeWidth={2}
            className="text-[#10B981]"
          />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-[13px] font-medium sm:text-[14px] ${
            task.status === "completed"
              ? "text-[#7C8EAD] line-through dark:text-[#829CAF]"
              : "text-[#172554] dark:text-[#F0F8FF]"
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="hidden w-[82px] shrink-0 sm:block xl:w-[95px]">
        <span
          className={`inline-flex max-w-full truncate rounded-lg px-2 py-1 text-[10px] font-semibold capitalize sm:text-[11px] ${categoryStyle}`}
        >
          {task.category}
        </span>
      </div>

      <div className="hidden w-[125px] shrink-0 items-center gap-1.5 text-[#58709D] dark:text-[#B0C6D4] xl:flex 2xl:w-[150px]">
        <CalendarDaysIcon size={17} strokeWidth={2} className="shrink-0" />
        <p className="truncate text-[11px] font-medium 2xl:text-[12px]">
          {task.dueDate || "No due date"}
        </p>
      </div>

      <div className="flex w-[30px] shrink-0 justify-center sm:w-[38px]">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${priorityStyle.bg}`}
        >
          <Flag
            size={17}
            strokeWidth={2.2}
            className={priorityStyle.flag}
            fill="currentColor"
          />
        </span>
      </div>

      <div ref={menuRef} className="relative ml-auto shrink-0">
        <button
          type="button"
          onClick={handleMenuToggle}
          aria-label="Task actions"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#54709F] transition-all duration-200 hover:bg-[#EEF3FB] hover:text-[#243B70] dark:text-[#B0C6D4] dark:hover:bg-[#31516A] dark:hover:text-[#F0F8FF]"
        >
          <EllipsisVertical size={19} strokeWidth={2.2} />
        </button>

        {openMenuId === task.id && (
          <div
            className={`absolute right-10 z-50 ${
              openUp ? "-bottom-1" : "-top-2"
            }`}
          >
            <TaskActionMenu task={task} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTasks;
