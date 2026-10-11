import React, { useEffect, useState } from "react";
import banner from "../assets/welcome-banner.png";
import useStore from "../store/taskStore";
import {
  ClipboardList,
  Check,
  ClockFading,
  ShieldAlert,
  ListIcon,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router";
import RecentTasks from "../components/dashboard/RecentTasks";
import TaskFormModal from "../components/task/TaskFormModal";
import TodaySection from "../components/dashboard/TodaySection";

const Deshboard = () => {
  const tasks = useStore((state) => state.tasks);
  const Name = useStore((state) => state.profile.name);
  const [greeting, setgreeting] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  let completedCount = 0;
  let overdueCount = 0;
  const currentdate = new Date().toISOString().split("T")[0];

  tasks.forEach((task) => {
    if (task.status === "completed") completedCount++;

    if (
      task.status === "active" &&
      task.dueDate &&
      task.dueDate < currentdate
    ) {
      overdueCount++;
    }
  });

  const totalCount = tasks.length;
  const remainingCount = totalCount - completedCount;
  const completedPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const remainingPercentage =
    totalCount > 0 ? (remainingCount / totalCount) * 100 : 0;
  const overduePercentage =
    totalCount > 0 ? (overdueCount / totalCount) * 100 : 0;

  function Greeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setgreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setgreeting("Good Afternoon");
    } else if (hour >= 17 && hour < 21) {
      setgreeting("Good Evening");
    } else {
      setgreeting("Good Night");
    }
  }

  useEffect(() => {
    Greeting();
    const timer = setInterval(Greeting, 60000);
    return () => clearInterval(timer);
  }, []);

  const sortTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const recentTasks = sortTasks.slice(0, 5);

  return (
    <div className="min-h-screen w-full min-w-0 pb-6 pt-[88px] lg:min-h-0 lg:pb-0 lg:pt-0">
      <section className="relative isolate ml-0 h-[250px] w-full overflow-hidden sm:h-[260px] lg:ml-[260px] lg:h-[250px] lg:w-[calc(100%-260px)]">
        <img
          src={banner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-left sm:object-[25%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAE8FF]/95 via-[#EAE8FF]/80 to-[#EAE8FF]/20 sm:from-[#EAE8FF]/90 sm:via-[#EAE8FF]/65 sm:to-transparent lg:from-[#EAE8FF]/35 lg:via-transparent lg:to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-start justify-center gap-3 px-4 py-4 sm:px-6 lg:justify-start lg:gap-3 lg:px-8 lg:pt-[82px]">
          <div className="flex max-w-full flex-wrap items-baseline gap-x-2 gap-y-1">
            <h1 className="text-[22px] font-bold leading-tight text-[#111A46] sm:text-[28px] lg:text-[30px]">
              {greeting},
            </h1>
            <span className="max-w-full break-words text-[22px] font-bold leading-tight text-[#6D3DF5] sm:text-[28px] lg:text-[30px]">
              {Name || "there"}
            </span>
          </div>

          <p className="max-w-[280px] text-[13px] font-normal text-[#16274b] sm:max-w-none sm:text-[15px]">
            Stay organized and get things done.
          </p>

          {isTaskModalOpen && (
            <TaskFormModal onClose={() => setIsTaskModalOpen(false)} />
          )}

          <button
            type="button"
            onClick={() => setIsTaskModalOpen(true)}
            className="relative z-10 flex h-[42px] w-fit items-center gap-2 rounded-xl bg-[#6D3DF5] px-4 text-[14px] font-semibold text-white 
                      shadow-[0_8px_18px_rgba(109,61,245,0.28)] transition-all duration-200 hover:bg-[#5B2FE0] hover:shadow-[0_10px_22px_rgba(109,61,245,0.35)] sm:absolute sm:bottom-2 sm:left-6 sm:h-[46px] sm:px-5 sm:text-[15px] lg:left-8"
          >
            <span className="text-[20px] leading-none">+</span>
            Add Task
          </button>

          <div className="absolute bottom-2 right-3 hidden max-w-[230px] items-center gap-2 sm:flex sm:bottom-2 sm:left-[212px] sm:right-auto sm:gap-3">
            <div className="h-10 w-[3px] shrink-0 rounded-full bg-[#7C3AED] sm:h-12" />
            <p className="text-[12px] font-medium leading-[1.45] text-[#243B70] sm:text-[13px] lg:text-[15px]">
              Small steps every day <br /> lead to big progress ......... ♡
            </p>
          </div>
        </div>
      </section>

      <section className="ml-0 grid w-full min-w-0 grid-cols-1 gap-3 bg-[#E1EBFE] px-3 py-3 sm:grid-cols-2 sm:gap-4 sm:px-5 lg:ml-[260px] lg:w-[calc(100%-260px)] xl:grid-cols-4 xl:gap-5">
        <div className="flex h-[93px] min-w-0 items-center gap-4 rounded-2xl border-2 border-white/80 bg-[#E6F2FE]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#E4F0FF]">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1478F2] text-white shadow-[0_0px_17px_rgba(20,120,242,0.75)]">
              <ClipboardList size={20} strokeWidth={2.4} />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#536B9E]">
              Total Tasks
            </p>
            <p className="mt-1 text-[26px] font-bold leading-none text-[#111A46]">
              {totalCount}
            </p>
          </div>
        </div>

        <div className="relative flex h-[93px] min-w-0 flex-col justify-center rounded-2xl border-2 border-white/80 bg-[#E6FAF4]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">
          <div className="flex items-center gap-3">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#DDF8ED]">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#12B981] text-white shadow-[0_0px_12px_rgba(18,185,129,0.50)]">
                <Check size={20} strokeWidth={2.8} />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#536B9E]">
                Completed
              </p>
              <p className="mt-1 text-[26px] font-bold leading-none text-[#111A46]">
                {completedCount}
              </p>
            </div>
          </div>
          <div className="relative mt-3 h-[6px] w-full rounded-full bg-[#D9F3E9]">
            <span className="absolute -top-[21px] right-0 text-[12px] font-semibold text-[#159B70]">
              {Math.round(completedPercentage)}%
            </span>
            <div
              className="h-full rounded-full bg-[#12B981] transition-all duration-500"
              style={{ width: `${completedPercentage}%` }}
            />
          </div>
        </div>

        <div className="relative flex h-[93px] min-w-0 flex-col justify-center rounded-2xl border-2 border-white/80 bg-[#FFF5E9]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">
          <div className="flex items-center gap-3">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#FFF0D9]">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#F5A623] text-white shadow-[0_0px_12px_rgba(245,166,35,0.56)]">
                <ClockFading size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#536B9E]">
                Remaining
              </p>
              <p className="mt-1 text-[26px] font-bold leading-none text-[#111A46]">
                {remainingCount}
              </p>
            </div>
          </div>
          <div className="relative mt-3 h-[6px] w-full rounded-full bg-[#FCE9C9]">
            <span className="absolute -top-[21px] right-0 text-[12px] font-semibold text-[#C48118]">
              {Math.round(remainingPercentage)}%
            </span>
            <div
              className="h-full rounded-full bg-[#F5A623] transition-all duration-500"
              style={{ width: `${remainingPercentage}%` }}
            />
          </div>
        </div>

        <div className="relative flex h-[93px] min-w-0 flex-col justify-center rounded-2xl border-2 border-white/80 bg-[#FEEBF0]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">
          <div className="flex items-center gap-3">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#FFE1E5]">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#EF4444] text-white shadow-[0_5px_15px_rgba(239,68,68,0.60)]">
                <ShieldAlert size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#536B9E]">Overdue</p>
              <p className="mt-1 text-[26px] font-bold leading-none text-[#111A46]">
                {overdueCount}
              </p>
            </div>
          </div>
          <div className="relative mt-3 h-[6px] w-full rounded-full bg-[#FBD5DA]">
            <span className="absolute -top-[21px] right-0 text-[12px] font-semibold text-[#DC3D48]">
              {Math.round(overduePercentage)}%
            </span>
            <div
              className="h-full rounded-full bg-[#EF4444] transition-all duration-500"
              style={{ width: `${overduePercentage}%` }}
            />
          </div>
        </div>
      </section>

      <section className="ml-0 flex w-full min-w-0 flex-col gap-4 bg-[#E1EBFE] px-3 pb-4 pt-2 sm:px-5 lg:ml-[260px] lg:w-[calc(100%-260px)]  lg:pb-0 lg:pt-2 xl:flex-row">
        <div className="h-[235px] w-full min-w-0 shrink-0 overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-[0_6px_22px_rgba(30,64,175,0.08)] xl:w-[62%]">
          <div className="flex h-[60px] items-center justify-between gap-2 border-b border-[#E7EEF9] px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <ListIcon
                size={24}
                strokeWidth={2.5}
                className="shrink-0 text-[#5B3DF5] sm:h-7 sm:w-7"
              />
              <p className="truncate text-[17px] font-bold text-[#111A46] sm:text-[20px] lg:text-[22px]">
                Recent Tasks
              </p>
            </div>
            <NavLink
              to="/Alltask"
              className="flex shrink-0 items-center gap-1 text-[12px] font-semibold text-[#1769FF] transition-all duration-200 hover:gap-2 sm:gap-1.5 sm:text-[14px]"
            >
              <span>View All</span>
              <ArrowRight size={17} strokeWidth={2.3} />
            </NavLink>
          </div>

          <div className="h-[175px] min-w-0 overflow-x-hidden overflow-y-auto">
            {recentTasks.length > 0 ? (
              recentTasks.map((task, index) => (
                <RecentTasks
                  key={task.id}
                  task={task}
                  taskIndex={index}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-3 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6D3DF5]">
                  <ClipboardList size={21} strokeWidth={2.2} />
                </div>
                <p className="mt-3 text-[14px] font-semibold text-[#243B70]">
                  No recent tasks
                </p>
                <p className="mt-1 text-[12px] text-[#7C8EAD]">
                  Your recent tasks will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 ">
          <TodaySection />
        </div>
      </section>
    </div>
  );
};

export default Deshboard;
