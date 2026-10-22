import React, { useEffect, useRef, useState } from "react";
import { CalendarDays, EllipsisVertical, Square } from "lucide-react";
import useStore from "../../store/taskStore";
import TaskActionMenu from "./TaskActionMenu";
import TaskFormModal from "./TaskFormModal";
import TaskDetails from "./TaskDetails";
import ConfirmDialog from "../common/ConfirmDialog";

const TaskList = ({ visibleTasks, totalTasks, openMenuId, setOpenMenuId }) => {
  const toggleTask = useStore((state) => state.toggleTask);
  const isTaskModalOpen = useStore((state) => state.isTaskModalOpen);
  const openTaskModal = useStore((state) => state.openTaskModal);
  const closeTaskModal = useStore((state) => state.closeTaskModal);
  const menuRef = useRef(null);

  const [shortcutAction, setShortcutAction] = useState(null);
  const [shortcutTask, setShortcutTask] = useState(null);

  const handleTaskShortcut = (event, task) => {
    const key = event.key.toLowerCase();

    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.target.isContentEditable) return;

    if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) {
      if (event.target.type !== "checkbox" || key !== "enter") return;
    }

    if (key === "enter") {
      event.preventDefault();
      toggleTask(task.id);
      return;
    }

    if (key === "e") {
      event.preventDefault();
      setShortcutTask(task);
      setShortcutAction("edit");
    }

    if (key === "v") {
      event.preventDefault();
      setShortcutTask(task);
      setShortcutAction("view");
    }

    if (key === "delete") {
      event.preventDefault();
      setShortcutTask(task);
      setShortcutAction("delete");
    }
  };

  useEffect(() => {
    if (!shortcutAction) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShortcutAction(null);
        setShortcutTask(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [shortcutAction]);

  useEffect(() => {
    if (!openMenuId) return;

    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenuId, setOpenMenuId]);

const containerClass =
  "ml-0 w-full min-w-0 bg-[#162C44] px-3 pb-6 transition-colors duration-300 dark:bg-[#162C44] sm:px-5 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:px-2";
  
  if (totalTasks.length === 0) {
    return (
      <div className={containerClass}>
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#E6EBF4] bg-white px-4 py-8 shadow-[0_5px_20px_rgba(44,62,120,0.07)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#0E1E2D] dark:shadow-[0_0_18px_rgba(8,169,157,0.06)]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0ECFF] text-3xl dark:bg-[#30294B]">
            📦
          </div>

          <h2 className="text-[20px] font-bold text-[#111A46] dark:text-[#F0F8FF] sm:text-[22px]">
            No Tasks Found
          </h2>

          <p className="mt-2 max-w-md text-[13px] text-[#5870A6] dark:text-[#B0C6D4] sm:text-[14px]">
            Create your first task and start getting things done.
          </p>

          {isTaskModalOpen && <TaskFormModal onClose={closeTaskModal} />}

          <button
            type="button"
            onClick={openTaskModal}
            className="mt-5 rounded-xl bg-[#6246F5] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(98,70,245,0.22)] transition hover:-translate-y-0.5 hover:bg-[#5539E9]"
          >
            + Add Task
          </button>
        </div>
      </div>
    );
  }

  if (visibleTasks.length === 0) {
    return (
      <div className={containerClass}>
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#E6EBF4] bg-white px-4 py-8 text-center shadow-[0_5px_20px_rgba(44,62,120,0.07)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_0_18px_rgba(8,169,157,0.06)]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0ECFF] text-3xl dark:bg-[#30294B]">
            🔍
          </div>

          <h2 className="text-[20px] font-bold text-[#111A46] dark:text-[#F0F8FF] sm:text-[22px]">
            No Matching Tasks
          </h2>

          <p className="mt-2 text-[13px] text-[#5870A6] dark:text-[#B0C6D4] sm:text-[14px]">
            No tasks match your current filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="overflow-x-auto overflow-y-visible rounded-2xl border border-[#E6EBF4] bg-white shadow-[0_5px_20px_rgba(44,62,120,0.07)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#0E1E2D] dark:shadow-[0_0_18px_rgba(8,169,157,0.06)]">
        <div className="min-h-[280px] min-w-[900px]">
          <div className="grid grid-cols-[50px_minmax(220px,2fr)_1fr_1fr_1.3fr_1fr_55px] items-center border-b border-[#E8EDF5] bg-[#F7F9FD] px-5 py-3.5 text-[13px] font-semibold text-[#4A6195] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:text-[#B0C6D4]">
            <div>
              <Square size={19} strokeWidth={1.8} />
            </div>
            <div>Task Title</div>
            <div>Category</div>
            <div>Priority</div>
            <div>Due Date</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>

          {visibleTasks.map((task, index) => {
            const openUp = index >= visibleTasks.length - 2;

            return (
              <div
                key={task.id}
                className="grid min-h-[62px] grid-cols-[50px_minmax(220px,2fr)_1fr_1fr_1.3fr_1fr_55px] items-center border-b border-[#E8EDF5] px-5 py-2.5 transition-colors duration-200 last:border-b-0 hover:bg-[#FAFBFE] dark:border-[#31516A]/70 dark:hover:bg-[#1C354D]"
              >
                <div>
                  <input
                    type="checkbox"
                    onKeyDown={(event) => handleTaskShortcut(event, task)}
                    checked={task.status === "completed"}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 cursor-pointer accent-[#6246F5]"
                  />
                </div>

                <div className="min-w-0 pr-5">
                  <p
                    title={task.title}
                    className={`truncate text-[14px] font-semibold ${
                      task.status === "completed"
                        ? "text-[#8B96AD] line-through dark:text-[#7894A8]"
                        : "text-[#111A46] dark:text-[#F0F8FF]"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>

                <div>
                  <span className="inline-flex rounded-md bg-[#E8F4FF] px-3 py-1 text-[12px] font-medium capitalize text-[#2878D7] dark:bg-[#203D58] dark:text-[#8CC8FF]">
                    {task.category}
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-[12px] font-semibold capitalize ${
                      task.priority === "high"
                        ? "bg-[#FFE5E7] text-[#FF3D52] dark:bg-[#482A38] dark:text-[#FF8585]"
                        : task.priority === "medium"
                          ? "bg-[#FFF0DC] text-[#E88A00] dark:bg-[#493B28] dark:text-[#FFD080]"
                          : "bg-[#DDF8ED] text-[#14945F] dark:bg-[#173F3A] dark:text-[#6EE7B7]"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div>
                  {task.dueDate ? (
                    <div className="flex items-center gap-2 text-[13px] text-[#4D628E] dark:text-[#B0C6D4]">
                      <CalendarDays size={16} />
                      <span>{task.dueDate}</span>
                    </div>
                  ) : (
                    <span className="text-[13px] text-[#8994A9] dark:text-[#7894A8]">
                      No due date
                    </span>
                  )}
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-[12px] font-semibold ${
                      task.status === "completed"
                        ? "bg-[#DCEBFF] text-[#2777D5] dark:bg-[#203D58] dark:text-[#8CC8FF]"
                        : "bg-[#DDF8ED] text-[#14945F] dark:bg-[#173F3A] dark:text-[#6EE7B7]"
                    }`}
                  >
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </div>

                <div
                  ref={openMenuId === task.id ? menuRef : null}
                  className="relative flex justify-center"
                >
                  <button
                    type="button"
                    onKeyDown={(event) => handleTaskShortcut(event, task)}
                    onClick={() =>
                      setOpenMenuId(openMenuId === task.id ? null : task.id)
                    }
                    className="rounded-lg p-2 text-[#40588D] transition-colors hover:bg-[#F0F3F9] dark:text-[#B0C6D4] dark:hover:bg-[#25445D] dark:hover:text-[#55E4DB]"
                  >
                    <EllipsisVertical size={20} strokeWidth={2.2} />
                  </button>

                  {openMenuId === task.id && (
                    <div
                      className={`absolute right-10 z-50 ${
                        openUp ? "bottom-1" : "top-1"
                      }`}
                    >
                      <TaskActionMenu task={task} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {shortcutTask && shortcutAction === "edit" && (
        <TaskFormModal
          task={shortcutTask}
          onClose={() => setShortcutAction(null)}
        />
      )}

      {shortcutTask && shortcutAction === "view" && (
        <TaskDetails
          task={shortcutTask}
          onClose={() => setShortcutAction(null)}
        />
      )}

      {shortcutTask && shortcutAction === "delete" && (
        <ConfirmDialog
          task={shortcutTask}
          onClose={() => {
            setShortcutAction(null);
            setShortcutTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
