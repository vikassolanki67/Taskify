import React, { useState, useEffect, useRef } from "react";
import {
  CalendarDaysIcon,
  Flag,
  Square,
  SquareCheck,
  EllipsisVertical,
} from "lucide-react";
import useStore from "../../store/taskStore.js";
import TaskActionMenu from "../task/TaskActionMenu";

function RecentTasks({ task, taskIndex, openMenuId, setOpenMenuId }) {
  const toggle = useStore((state) => state.toggleTask);

  const priorityStyle =
    task.priority === "high"
      ? { flag: "text-[#EF4444]", bg: "bg-[#FFF0F1]" }
      : task.priority === "medium"
        ? { flag: "text-[#F5A623]", bg: "bg-[#FFF7E8]" }
        : { flag: "text-[#B9C6DA]", bg: "bg-[#F3F6FA]" };

  const categoryStyle =
    task.category === "work"
      ? "bg-[#FFE9EE] text-[#EF6477]"
      : task.category === "study"
        ? "bg-[#E8F2FF] text-[#2477F3]"
        : task.category === "personal"
          ? "bg-[#EFEAFF] text-[#6D3DF5]"
          : task.category === "shopping"
            ? "bg-[#EAF9F1] text-[#16A66E]"
            : "bg-[#EEF2F7] text-[#536B9E]";

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
    <div className="relative flex h-[62px] min-w-0 items-center gap-1.5 border-b border-[#E8EEF8] px-2 transition-all duration-200 hover:bg-[#FAFCFF] sm:gap-2 sm:px-3">
      <button
        type="button"
        onClick={() => toggle(task.id)}
        aria-label={task.status === "active" ? "Complete task" : "Reopen task"}
        className="flex shrink-0 items-center justify-center text-[#54709F] transition-all duration-200 hover:scale-105"
      >
        {task.status === "active" ? (
          <Square size={23} strokeWidth={1.8} />
        ) : (
          <SquareCheck size={24} strokeWidth={2} className="text-[#10B981]" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-[13px] font-medium sm:text-[14px] ${task.status === "completed" ? "text-[#7C8EAD] line-through" : "text-[#172554]"}`}
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

      <div className="hidden w-[125px] shrink-0 items-center gap-1.5 text-[#58709D] xl:flex 2xl:w-[150px]">
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
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#54709F] transition-all duration-200 hover:bg-[#EEF3FB] hover:text-[#243B70]"
        >
          <EllipsisVertical size={19} strokeWidth={2.2} />
        </button>
        {openMenuId === task.id && (
          <div className="absolute right-0 top-8 z-50">
            <TaskActionMenu task={task} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTasks;
