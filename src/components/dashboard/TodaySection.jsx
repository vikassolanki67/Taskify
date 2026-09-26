import { CalendarDays, Check, Circle, Flag, Rose } from 'lucide-react'
import useStore from '../../store/taskStore'

function TodaySection({ onAddQuickTask }) {
  const tasks = useStore((state) => state.tasks)
  const toggleTask = useStore((state) => state.toggleTask)

  const today = new Date().toISOString().split('T')[0]

  const todayTasks = tasks.filter(
    (task) => task.dueDate === today
  )

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section className="rounded-2xl border w-[135%] border-white/80 bg-white/90 shadow-[0_6px_22px_rgba(30,64,175,0.08)]">
      <div className="flex items-center justify-between border-b border-[#E7EEF9] px-5 py-[3px]">
        <div>
          <h2 className="text-[21px] font-bold text-[#111A46]">
            Today
          </h2>

          <div className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-[#7183A6]">
            <CalendarDays size={15} strokeWidth={2} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <span className="rounded-lg bg-[#EEF2FF] px-3 py-1.5 text-[12px] font-semibold text-[#5B3DF5]">
          {todayTasks.length} {todayTasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>

      <div className="h-[124px] overflow-y-auto">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => {
            const priorityColor =
              task.priority === 'high'
                ? 'text-[#EF4444]'
                : task.priority === 'medium'
                  ? 'text-[#F5A623]'
                  : 'text-[#94A3B8]'

            return (
              <div
                key={task.id}
                className="flex min-h-[62px] items-center gap-4 border-b border-[#E8EEF8] px-5 transition-all duration-200 hover:bg-[#FAFCFF]"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="shrink-0 text-[#54709F] transition-all duration-200 hover:scale-105"
                >
                  {task.status === 'completed' ? (
                    <Check
                      size={23}
                      strokeWidth={2.5}
                      className="text-[#10B981]"
                    />
                  ) : (
                    <Circle
                      size={23}
                      strokeWidth={1.8}
                    />
                  )}
                </button>

                <div className="min-w-0 -p-[2px] flex-1">
                  <p
                    className={`truncate text-[14px] font-semibold ${
                      task.status === 'completed'
                        ? 'text-[#7C8EAD] line-through'
                        : 'text-[#172554]'
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-[12px] font-medium capitalize text-[#7183A6]">
                    {task.category}
                  </p>
                </div>

                <Flag
                  size={19}
                  strokeWidth={2.2}
                  className={priorityColor}
                  fill="currentColor"
                />
              </div>
            )
          })
        ) : (
          <div className="flex min-h-[124px] flex-col items-center justify-center px-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6D3DF5]">
              <Check size={21} strokeWidth={2.2} />
            </div>

            <p className="mt-3 text-[14px] font-semibold text-[#243B70]">
              No tasks for today
            </p>

            <p className="mt-1 text-[12px] text-[#7C8EAD]">
              You're all caught up!
            </p>
          </div>
        )}
      </div>

      {/* <button
        type="button"
        onClick={onAddQuickTask}
        className="flex w-full items-center justify-center gap-2 border-t border-[#E7EEF9] px-5 py-3.5 text-[13px] font-semibold text-[#6D3DF5] transition-all duration-200 hover:bg-[#F8F6FF]"
      >
        <span className="text-[19px] leading-none">+</span>
        Add quick task
      </button> */}
      <div className="flex justify-center gap-2 rounded-xl bg-[#E8FAF3]  py-[13px] text-[#159B70]">
        <Rose size={22} strokeWidth={2} />

        <p className="text-[14px]  font-medium">
          Keep going! You&apos;re making progress.
        </p>
      </div>
    </section>
  )
}

export default TodaySection