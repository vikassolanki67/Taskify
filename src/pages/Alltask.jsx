import React, { useMemo, useState } from 'react'
import banner from "../assets/banner2.png"
import TaskFormModal from '../components/task/TaskFormModal'
import FilterForm from '../components/filters/FilterForm'
import useStore from '../store/taskStore'
import TaskList from '../components/task/TaskList'
import { useLocation, useNavigate } from "react-router";
const Alltask = () => {
  const location = useLocation()

  const selectedTaskId = location.state?.selectedTaskId ?? null
  const globalSearchQuery = location.state?.globalSearchQuery ?? ""
 
  const [openMenuId, setOpenMenuId] = useState(null)
  const [appliedFilters, setAppliedFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    dueDate: "all",
    sort: "newest",
  })
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  const tasks = useStore((state) => state.tasks)
  
  const visibleTasks = useMemo(() => {
    let result = [...tasks]
    
    if (selectedTaskId) {
      result = result.filter(
        (task) => task.id === selectedTaskId
      )
    } else if (globalSearchQuery.trim()) {
      const query = globalSearchQuery.trim().toLowerCase()

      result = result.filter((task) =>
        task.title.toLowerCase().includes(query)
      )
    }
    // Status
    if (appliedFilters.status !== "all") {
      result = result.filter(
        (task) => task.status === appliedFilters.status
      )
    }

    // Priority
    if (appliedFilters.priority !== "all") {
      result = result.filter(
        (task) => task.priority === appliedFilters.priority
      )
    }

    // Category
    if (appliedFilters.category !== "all") {
      result = result.filter(
        (task) => task.category === appliedFilters.category
      )
    }

    // Due Date
    if (appliedFilters.dueDate === "noDueDate") {
      result = result.filter((task) => !task.dueDate)
    }

    if (appliedFilters.dueDate === "overdue") {
      result = result.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) < new Date()
      )
    }

    if (appliedFilters.dueDate === "today") {
      result = result.filter((task) => {
        if (!task.dueDate) return false

        const today = new Date()
        const due = new Date(task.dueDate)

        return (
          due.getFullYear() === today.getFullYear() &&
          due.getMonth() === today.getMonth() &&
          due.getDate() === today.getDate()
        )
      })
    }

    if (appliedFilters.dueDate === "upcoming") {
      result = result.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) > new Date()
      )
    }

    // Sort
    if (appliedFilters.sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
    }

    if (appliedFilters.sort === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt) - new Date(b.createdAt)
      )
    }

    if (appliedFilters.sort === "dueAsc") {
      result.sort(
        (a, b) =>
          new Date(a.dueDate) - new Date(b.dueDate)
      )
    }

    if (appliedFilters.sort === "dueDesc") {
      result.sort(
        (a, b) =>
          new Date(b.dueDate) - new Date(a.dueDate)
      )
    }

    return result
  }, [tasks, appliedFilters, selectedTaskId,globalSearchQuery])


 
  return (
    <div className="min-h-[calc(100vh-55px)]">
      <div
        className="  ml-[260px] h-[265px] w-[calc(100%-260px)] overflow-hidden bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex h-full items-center justify-between px-10">
          <div className='mt-[210px]'>
            {isTaskModalOpen && (
              <TaskFormModal
                onClose={() => setIsTaskModalOpen(false)}
              />
            )}

            <button
              type="button"
              onClick={() => setIsTaskModalOpen(true)}
              className="flex h-[46px] items-center gap-2 rounded-xl bg-[#6246F5] px-5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(17,157,164,0.25)] transition-all duration-200 hover:bg-[#3316ee] hover:-translate-y-0.5"
            >
              <span className="text-[22px] leading-none">+</span>
              Add Task
            </button>
          </div>

          <div className="px-7 py-5 text-right ">
            <h1 className="text-[32px] mt-14 font-bold leading-tight text-[#111A46]">
              All Tasks
            </h1>

            <p className="  mt-1 text-[14px] font-medium text-[#41557D]">
              Manage and organize all your tasks in one place.
            </p>

            <div className="  relative -right-[80px] mt-6 flex items-center  gap-2">
              <p className="text-[15px] font-medium italic leading-[1.45] text-[#1F2E51]">
                Small steps
                <br />
                every day lead to
                <br />
                big progress.
              </p>

              <span className="relative top-5 text-[27px] leading-none text-[#5368A8]">
                ♡
              </span>
            </div>
          </div>
        </div>
      </div>

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
  )
}

export default Alltask