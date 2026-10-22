
import { CalendarDays, Check, Circle, Flag, Rose } from "lucide-react";
import useStore from "../../store/taskStore";

function TodaySection() {
  const tasks = useStore((state) => state.tasks);
  const toggleTask = useStore((state) => state.toggleTask);
  const today = new Date().toISOString().split("T")[0];
  const todayTasks = tasks.filter((task) => task.dueDate === today);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-[0_6px_22px_rgba(30,64,175,0.08)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_0_18px_rgba(8,169,157,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7EEF9] px-3 py-3 transition-colors duration-300 dark:border-[#31516A] sm:px-5 lg:py-[2px]">
        <div className="min-w-0">
          <h2 className="text-[19px] font-bold text-[#111A46] dark:text-[#F0F8FF] sm:text-[21px]">
            Today
          </h2>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#7183A6] dark:text-[#B0C6D4] sm:text-[13px]">
            <CalendarDays size={15} strokeWidth={2} className="shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <span className="shrink-0 rounded-lg bg-[#EEF2FF] px-2.5 py-1.5 text-[11px] font-semibold text-[#5B3DF5] dark:bg-[#6938EF]/20 dark:text-[#B6A3FF] sm:px-3 sm:text-[12px]">
          {todayTasks.length} {todayTasks.length === 1 ? "Task" : "Tasks"}
        </span>
      </div>

      <div className="h-[124px] min-w-0 overflow-x-hidden overflow-y-auto">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => {
            const priorityColor =
              task.priority === "high"
                ? "text-[#EF4444]"
                : task.priority === "medium"
                  ? "text-[#F5A623]"
                  : "text-[#94A3B8] dark:text-[#B0C6D4]";

            return (
              <div
                key={task.id}
                className="flex h-[62px] min-w-0 items-center gap-3 overflow-hidden border-b border-[#E8EEF8] px-3 transition-all duration-200 hover:bg-[#FAFCFF] dark:border-[#31516A]/70 dark:hover:bg-[#25445D] dark:bg-[#0E1E2D] sm:gap-4 sm:px-5"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.status === "completed"
                      ? "Reopen task"
                      : "Complete task"
                  }
                  className="shrink-0 text-[#54709F] transition-all duration-200 hover:scale-105 dark:text-[#B0C6D4] dark:hover:text-[#55E4DB]"
                >
                  {task.status === "completed" ? (
                    <Check
                      size={23}
                      strokeWidth={2.5}
                      className="text-[#10B981]"
                    />
                  ) : (
                    <Circle size={23} strokeWidth={1.8} />
                  )}
                </button>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <p
                    className={`truncate text-[13px] font-semibold sm:text-[14px] ${
                      task.status === "completed"
                        ? "text-[#7C8EAD] line-through dark:text-[#829CAF]"
                        : "text-[#172554] dark:text-[#F0F8FF]"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="mt-1 truncate text-[11px] font-medium capitalize text-[#7183A6] dark:text-[#B0C6D4] sm:text-[12px]">
                    {task.category}
                  </p>
                </div>

                <Flag
                  size={18}
                  strokeWidth={2.2}
                  className={`${priorityColor} shrink-0`}
                  fill="currentColor"
                />
              </div>
            );
          })
        ) : (
          <div className="flex min-h-[124px] flex-col items-center justify-center px-3 dark:bg-[#0E1E2D] text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6D3DF5] dark:bg-[#1C354D] dark:text-[#55E4DB]">
              <Check size={21} strokeWidth={2.2} />
            </div>
            <p className="mt-3 text-[14px] font-semibold text-[#243B70] dark:text-[#F0F8FF]">
              No tasks for today
            </p>
            <p className="mt-1 text-[12px] text-[#7C8EAD] dark:text-[#B0C6D4]">
              You're all caught up!
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[#E8FAF3] px-3 py-3 text-[#159B70] transition-colors duration-300 dark:bg-[#08A99D]/10 dark:text-[#55E4DB]">
        <Rose size={20} strokeWidth={2} className="shrink-0" />
        <p className="text-center text-[12px] font-medium sm:text-[14px]">
          Keep going! You&apos;re making progress.
        </p>
      </div>
    </section>
  );
}

export default TodaySection;
