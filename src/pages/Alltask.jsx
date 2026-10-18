
import React, { useMemo, useState } from "react";
import banner from "../assets/banner2.png";
import TaskFormModal from "../components/task/TaskFormModal";
import FilterForm from "../components/filters/FilterForm";
import useStore from "../store/taskStore";
import TaskList from "../components/task/TaskList";
import { useLocation } from "react-router";

const Alltask = () => {
  const location = useLocation();

  const selectedTaskId = location.state?.selectedTaskId ?? null;
  const globalSearchQuery = location.state?.globalSearchQuery ?? "";

  const [openMenuId, setOpenMenuId] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    dueDate: "all",
    sort: "newest",
  });
  
  const isTaskModalOpen = useStore((state) => state.isTaskModalOpen);
  const openTaskModal = useStore((state) => state.openTaskModal);
  const closeTaskModal = useStore((state) => state.closeTaskModal);

  const tasks = useStore((state) => state.tasks);

  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    if (selectedTaskId) {
      result = result.filter((task) => task.id === selectedTaskId);
    } else if (globalSearchQuery.trim()) {
      const query = globalSearchQuery.trim().toLowerCase();

      result = result.filter((task) =>
        task.title.toLowerCase().includes(query),
      );
    }

    if (appliedFilters.status !== "all") {
      result = result.filter(
        (task) => task.status === appliedFilters.status,
      );
    }

    if (appliedFilters.priority !== "all") {
      result = result.filter(
        (task) => task.priority === appliedFilters.priority,
      );
    }

    if (appliedFilters.category !== "all") {
      result = result.filter(
        (task) => task.category === appliedFilters.category,
      );
    }

    if (appliedFilters.dueDate === "noDueDate") {
      result = result.filter((task) => !task.dueDate);
    }

    if (appliedFilters.dueDate === "overdue") {
      result = result.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) < new Date(),
      );
    }

    if (appliedFilters.dueDate === "today") {
      result = result.filter((task) => {
        if (!task.dueDate) return false;

        const today = new Date();
        const due = new Date(task.dueDate);

        return (
          due.getFullYear() === today.getFullYear() &&
          due.getMonth() === today.getMonth() &&
          due.getDate() === today.getDate()
        );
      });
    }

    if (appliedFilters.dueDate === "upcoming") {
      result = result.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) > new Date(),
      );
    }

    if (appliedFilters.sort === "newest") {
      result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    if (appliedFilters.sort === "oldest") {
      result.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
    }

    if (appliedFilters.sort === "dueAsc") {
      result.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      );
    }

    if (appliedFilters.sort === "dueDesc") {
      result.sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate),
      );
    }

    return result;
  }, [tasks, appliedFilters, selectedTaskId, globalSearchQuery]);

  return (
    <div className="min-h-[calc(100vh-55px)] w-full min-w-0 pb-24 lg:pb-0">
      <div
          className="relative ml-0 h-[330px] w-full overflow-hidden bg-cover bg-center bg-no-repeat sm:h-[320px] md:h-[290px] md:bg-[length:100%_100%] lg:ml-[260px] lg:h-[265px] lg:w-[calc(100%-260px)]"        style={{
          backgroundImage: `url(${banner})`
        }}
      >
        <div className="relative flex h-full flex-col justify-between gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:gap-0 md:px-8 lg:px-10">
          <div className="absolute bottom-4 left-4 z-10 shrink-0 min-[768px]:static min-[768px]:max-[1023px]:mt-[200px] lg:mt-[210px]">


            <button
              type="button"
              onClick={openTaskModal}
              className="flex h-[42px] items-center gap-2 rounded-xl bg-[#6246F5] px-4 text-[13px] font-semibold text-white 
                         shadow-[0_8px_20px_rgba(17,157,164,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3316ee] sm:h-[46px] sm:px-5 sm:text-[14px]"
            >
              <span className="text-[22px] leading-none">+</span>
              Add Task
            </button>
          </div>

          <div className="absolute right-3 top-5 max-w-[68%] px-0 py-0 text-right sm:right-5 sm:top-5 sm:max-w-[60%]  min-[300px]:max-[424px]:mt-[70px]  min-[424px]:max-[592px]:mt-[70px] min-[593px]:max-[639px]:mt-[80px] min-[640px]:max-[767px]:mt-[70px] md:static md:min-w-0 md:max-w-full md:px-2 md:py-2 min-[768px]:max-[1023px]:mt-[40px] lg:px-7 lg:py-5">
            <h1 className="mt-0 text-[25px] font-bold leading-tight text-[#111A46] sm:text-[28px] md:text-[30px] lg:mt-14 lg:text-[32px]">
              All Tasks
            </h1>

            <p className="mt-1 max-w-full text-[13px] font-medium text-[#303174] min-[424px]:max-[592px]:text-[#fff2f2] min-[300px]:max-[424px]:hidden sm:text-[14px]">
              Manage and organize all your tasks in one place.
            </p>

            <div className="relative right-0 mt-3 flex items-center justify-end gap-2 sm:mt-4 md:justify-end min-[424px]:max-[592px]:mt-[30px] min-[593px]:max-[639px]:mt-[50px] min-[768px]:max-[1023px]:top-4 lg:-right-[80px] lg:right-6 lg:mt-6">
              <p className="text-[13px] font-medium italic leading-[1.45] text-[#1f2e51] min-[300px]:max-[424px]:text-[#000000] sm:text-[14px] md:text-[15px]">
                Small steps
                <br />
                every day lead to
                <br />
                big progress.
              </p>

              <span className="relative top-3 text-[25px] leading-none text-[#5368A8] sm:top-5 sm:text-[27px]">
                ♡
              </span>
            </div>
          </div>
        </div>
      </div>

      {isTaskModalOpen && (
        <TaskFormModal
          onClose={closeTaskModal}
        />
      )}
      
      <FilterForm
        onApply={setAppliedFilters}
        onReset={setAppliedFilters}
      />

      <TaskList
        visibleTasks={visibleTasks}
        totalTasks={tasks}
        openMenuId={openMenuId}
        setOpenMenuId={setOpenMenuId}
      />
    </div>
  );
};

export default Alltask;
