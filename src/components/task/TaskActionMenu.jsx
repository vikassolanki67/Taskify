import React, { useState } from "react";
import { Eye, PencilSparkles, Trash } from "lucide-react";
import TaskDetails from "./TaskDetails";
import TaskFormModal from "./TaskFormModal";
import ConfirmDialog from "../common/ConfirmDialog";

function TaskActionMenu({ task }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="w-[190px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#E2E9F5] bg-white p-1.5 shadow-[0_10px_30px_rgba(30,64,175,0.14)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      {isTaskModalOpen && (
        <TaskDetails
          task={task}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => setIsTaskModalOpen(true)}
        className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium text-[#243B70] transition-all duration-200 hover:bg-[#EEF4FF] hover:text-[#1769FF] dark:text-[#F0F8FF] dark:hover:bg-[#25445D] dark:hover:text-[#55E4DB] sm:h-10"
      >
        <Eye size={18} strokeWidth={2} />
        <span>View Details</span>
      </button>

      {isEditModalOpen && (
        <TaskFormModal
          task={task}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => setEditModalOpen(true)}
        className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium text-[#243B70] transition-all duration-200 hover:bg-[#F2EEFF] hover:text-[#6D3DF5] dark:text-[#F0F8FF] dark:hover:bg-[#30294B] dark:hover:text-[#B6A3FF] sm:h-10"
      >
        <PencilSparkles size={18} strokeWidth={2} />
        <span>Edit Task</span>
      </button>

      <div className="my-1 h-px bg-[#E8EEF8] dark:bg-[#31516A]" />

      {isDeleteModalOpen && (
        <ConfirmDialog
          task={task}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => setDeleteModalOpen(true)}
        className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium text-[#EF4444] transition-all duration-200 hover:bg-[#FFF1F2] dark:text-[#FF7373] dark:hover:bg-[#482A38] sm:h-10"
      >
        <Trash size={18} strokeWidth={2} />
        <span>Delete Task</span>
      </button>
    </div>
  );
}

export default TaskActionMenu;