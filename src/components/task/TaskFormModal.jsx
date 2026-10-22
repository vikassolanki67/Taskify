import { X } from "lucide-react";
import { taskSchema } from "../../utils/taskSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useStore from "../../store/taskStore.js";

function TaskFormModal({ onClose, task }) {
  const createTask = useStore((state) => state.createTask);
  const updateTask = useStore((state) => state.updateTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || "medium",
      category: task?.category || "other",
      dueDate: task?.dueDate || "",
    },
  });

  function submitHandler(data) {
    if (task) {
      updateTask(task.id, data);
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date(),
        status: "active",
      };

      createTask(newTask);
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/45 backdrop-blur-[2px] transition-colors duration-300 dark:bg-black/65 min-[641px]:items-center min-[641px]:px-4">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex h-[80dvh] max-h-[86dvh] w-full max-w-none flex-col gap-5 overflow-hidden rounded-t-3xl border border-white/80 bg-white pt-7 shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-[641px]:h-auto min-[641px]:max-w-[500px] min-[641px]:max-h-[95vh] min-[641px]:gap-0 min-[641px]:rounded-2xl"
      >
        <div className="shrink-0 px-4 pt-3 sm:hidden">
          <div className="mx-auto h-1.5 w-11 rounded-full bg-[#9AAAC4] dark:bg-[#54758C]" />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E8EEF8] px-4 py-4 dark:border-[#31516A] sm:px-6">
          <div className="min-w-0">
            <h1 className="text-[20px] font-bold text-[#111A46] dark:text-[#F0F8FF] sm:text-[22px]">
              {task ? "Edit Task" : "Add New Task"}
            </h1>

            <p className="mt-1 text-[12px] text-[#7183A6] dark:text-[#B0C6D4] sm:text-[13px]">
              {task
                ? "Update your task details."
                : "Create a task and stay organized."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#58709D] transition-all duration-200 hover:bg-[#EEF3FB] hover:text-[#243B70] dark:text-[#B0C6D4] dark:hover:bg-[#25445D] dark:hover:text-[#55E4DB]"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
          <label className="block">
            <p className="mb-2 text-[13px] font-semibold text-[#243B70] dark:text-[#F0F8FF] sm:text-[14px]">
              Task Title<span className="ml-1 text-[#EF4444]">*</span>
            </p>

            <input
              {...register("title")}
              placeholder="What needs to be done?"
              className={`h-11 w-full rounded-xl border bg-[#F9FBFF] px-3 text-[14px] text-[#172554] outline-none transition-all duration-200 placeholder:text-[#91A2C2] focus:bg-white focus:ring-4 dark:bg-[#0B1F30] dark:text-[#F0F8FF] dark:placeholder:text-[#7894A8] dark:focus:bg-[#142E42] sm:h-12 sm:px-4 ${
                errors.title
                  ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/10 dark:border-[#FF7373]"
                  : "border-[#DCE6F7] focus:border-[#8B7CF6] focus:ring-[#6D3DF5]/10 dark:border-[#31516A] dark:focus:border-[#55E4DB] dark:focus:ring-[#55E4DB]/10"
              }`}
            />

            {errors.title && (
              <p className="mt-1.5 text-[12px] font-medium text-[#EF4444] dark:text-[#FF8585]">
                {errors.title.message}
              </p>
            )}
          </label>

          <label className="block">
            <p className="mb-2 text-[13px] font-semibold text-[#243B70] dark:text-[#F0F8FF] sm:text-[14px]">
              Description
            </p>

            <textarea
              {...register("description")}
              placeholder="Add more details about this task..."
              rows={3}
              className={`w-full resize-y rounded-xl border bg-[#F9FBFF] px-3 py-3 text-[14px] text-[#172554] outline-none transition-all duration-200 placeholder:text-[#91A2C2] focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10 dark:bg-[#0B1F30] dark:text-[#F0F8FF] dark:placeholder:text-[#7894A8] dark:focus:border-[#55E4DB] dark:focus:bg-[#142E42] dark:focus:ring-[#55E4DB]/10 sm:px-4 sm:py-3 ${
                errors.description
                  ? "border-[#EF4444] dark:border-[#FF7373]"
                  : "border-[#DCE6F7] dark:border-[#31516A]"
              }`}
            />

            {errors.description && (
              <p className="mt-1.5 text-[12px] font-medium text-[#EF4444] dark:text-[#FF8585]">
                {errors.description.message}
              </p>
            )}
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <label className="block">
              <p className="mb-2 text-[13px] font-semibold text-[#243B70] dark:text-[#F0F8FF] sm:text-[14px]">
                Priority
              </p>

              <select
                {...register("priority")}
                className="h-11 w-full cursor-pointer rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-3 text-[14px] font-medium text-[#243B70] outline-none transition-all duration-200 focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10 dark:border-[#31516A] dark:bg-[#0B1F30] dark:text-[#F0F8FF] dark:focus:border-[#55E4DB] dark:focus:bg-[#142E42] dark:focus:ring-[#55E4DB]/10 sm:h-12 sm:px-4"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label className="block">
              <p className="mb-2 text-[13px] font-semibold text-[#243B70] dark:text-[#F0F8FF] sm:text-[14px]">
                Category
              </p>

              <select
                {...register("category")}
                className="h-11 w-full cursor-pointer rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-3 text-[14px] font-medium text-[#243B70] outline-none transition-all duration-200 focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10 dark:border-[#31516A] dark:bg-[#0B1F30] dark:text-[#F0F8FF] dark:focus:border-[#55E4DB] dark:focus:bg-[#142E42] dark:focus:ring-[#55E4DB]/10 sm:h-12 sm:px-4"
              >
                <option value="study">Study</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <label className="block">
            <p className="mb-2 text-[13px] font-semibold text-[#243B70] dark:text-[#F0F8FF] sm:text-[14px]">
              Due Date
            </p>

            <input
              type="date"
              {...register("dueDate")}
              className="h-11 w-full min-w-0 cursor-pointer rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-3 text-[14px] font-medium text-[#243B70] outline-none transition-all duration-200 focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10 dark:border-[#31516A] dark:bg-[#0B1F30] dark:text-[#F0F8FF] dark:focus:border-[#55E4DB] dark:focus:bg-[#142E42] dark:focus:ring-[#55E4DB]/10 sm:h-12 sm:px-4"
            />
          </label>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-[#E8EEF8] bg-[#FBFCFF] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#0B1F30] sm:flex sm:justify-end sm:gap-3 sm:px-6 sm:py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full rounded-xl border border-[#DCE6F7] bg-white px-3 text-[13px] font-semibold text-[#536B9E] transition-all duration-200 hover:bg-[#F3F6FB] hover:text-[#243B70] dark:border-[#31516A] dark:bg-[#1C354D] dark:text-[#B0C6D4] dark:hover:bg-[#25445D] dark:hover:text-[#F0F8FF] sm:w-auto sm:px-5 sm:text-[14px]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 w-full rounded-xl bg-[#6D3DF5] px-3 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(109,61,245,0.28)] transition-all duration-200 hover:bg-[#5B2FE0] hover:shadow-[0_10px_22px_rgba(109,61,245,0.35)] dark:bg-[#6938EF] dark:hover:bg-[#7C50F5] sm:w-auto sm:px-6 sm:text-[14px]"
          >
            {task ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskFormModal;
