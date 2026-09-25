import { X } from 'lucide-react'
import { taskSchema } from '../../utils/taskSchema.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useStore from '../../store/taskStore.js'

function TaskFormModal({ onClose }) {
  const createTask = useStore((state) => state.createTask)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      category: 'other',
      dueDate: '',
    },
  })

  function submitHandler(data) {
    console.log(data)

    const task = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
      status: 'active',
    }

    createTask(task)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full  max-w-[500px] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
      >
        <div className="flex items-center justify-between border-b border-[#E8EEF8] px-6 py-4">
          <div>
            <h1 className="text-[22px] font-bold text-[#111A46]">
              Add New Task
            </h1>
            <p className="mt-1 text-[13px] text-[#7183A6]">
              Create a task and stay organized.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#58709D] transition-all duration-200 hover:bg-[#EEF3FB] hover:text-[#243B70]"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-4">
          <label className="block">
            <p className="mb-2 text-[14px] font-semibold text-[#243B70]">
              Task Title<span className="ml-1 text-[#EF4444]">*</span>
            </p>

            <input
              {...register('title')}
              placeholder="What needs to be done?"
              className={`h-12 w-full rounded-xl border bg-[#F9FBFF] px-4 text-[14px] text-[#172554] outline-none transition-all duration-200 placeholder:text-[#91A2C2] focus:bg-white focus:ring-4 ${
                errors.title
                  ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/10'
                  : 'border-[#DCE6F7] focus:border-[#8B7CF6] focus:ring-[#6D3DF5]/10'
              }`}
            />

            {errors.title && (
              <p className="mt-1.5 text-[12px] font-medium text-[#EF4444]">
                {errors.title.message}
              </p>
            )}
          </label>

          <label className="block">
            <p className="mb-2 text-[14px] font-semibold text-[#243B70]">
              Description
            </p>

            <textarea
              {...register('description')}
              placeholder="Add more details about this task..."
              rows={4}
              className={`w-full resize-none rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-4 py-3 text-[14px] text-[#172554] outline-none transition-all duration-200 placeholder:text-[#91A2C2] focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10 ${
                errors.description ? 'border-[#EF4444]' : ''
              }`}
            />

            {errors.description && (
              <p className="mt-1.5 text-[12px] font-medium text-[#EF4444]">
                {errors.description.message}
              </p>
            )}
          </label>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <p className="mb-2 text-[14px] font-semibold text-[#243B70]">
                Priority
              </p>

              <select
                {...register('priority')}
                className="h-12 w-full cursor-pointer rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-4 text-[14px] font-medium text-[#243B70] outline-none transition-all duration-200 focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label className="block">
              <p className="mb-2 text-[14px] font-semibold text-[#243B70]">
                Category
              </p>

              <select
                {...register('category')}
                className="h-12 w-full cursor-pointer rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-4 text-[14px] font-medium text-[#243B70] outline-none transition-all duration-200 focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10"
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
            <p className="mb-2 text-[14px] font-semibold text-[#243B70]">
              Due Date
            </p>

            <input
              type="date"
              {...register('dueDate')}
              className="h-12 w-full cursor-pointer rounded-xl border border-[#DCE6F7] bg-[#F9FBFF] px-4 text-[14px] font-medium text-[#243B70] outline-none transition-all duration-200 focus:border-[#8B7CF6] focus:bg-white focus:ring-4 focus:ring-[#6D3DF5]/10"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#E8EEF8] bg-[#FBFCFF] px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-[#DCE6F7] bg-white px-5 text-[14px] font-semibold text-[#536B9E] transition-all duration-200 hover:bg-[#F3F6FB] hover:text-[#243B70]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 rounded-xl bg-[#6D3DF5] px-6 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(109,61,245,0.28)] transition-all duration-200 hover:bg-[#5B2FE0] hover:shadow-[0_10px_22px_rgba(109,61,245,0.35)]"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskFormModal