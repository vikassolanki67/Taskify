import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { Rocket, House, ListTodo, Settings, Plus } from 'lucide-react'
import TaskFormModal from '../task/TaskFormModal'
import logo from "../../assets/taskify-logo.png"

const Sidebar = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  const desktopNavClass = ({ isActive }) =>
    `flex h-[50px] items-center gap-3.5 rounded-2xl border px-4 text-base font-medium transition-all duration-200 ${
      isActive
        ? "border-[#2DD4BF] bg-[#0D9488]/80 text-white shadow-[0_0_8px_rgba(45,212,191,0.8),0_0_22px_rgba(20,184,166,0.45)] dark:border-[#55E4DB]/50 dark:bg-[#0B3A43] dark:text-[#55E4DB] dark:shadow-[0_0_18px_rgba(85,228,219,0.10)]"
        : "border-transparent text-[#B8D9D6] hover:bg-[rgba(20,184,166,0.10)] hover:text-white dark:text-[#B0C6D4] dark:hover:bg-[#102638] dark:hover:text-[#55E4DB]"
    }`

  const mobileNavClass = ({ isActive }) =>
    `flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium transition-colors duration-200 ${
      isActive
        ? "bg-[#0D9488]/30 text-[#A7F3D0] dark:bg-[#0B3A43] dark:text-[#55E4DB] dark:shadow-[0_0_14px_rgba(85,228,219,0.08)]"
        : "text-[#B8D9D6] dark:text-[#B0C6D4] dark:hover:text-[#55E4DB]"
    }`

  return (
    <>
     
      <aside className="fixed left-0 top-0 hidden h-screen w-[260px] flex-col bg-[#0F2D2D] shadow-xl transition-colors duration-200 dark:bg-[#06131F] lg:flex">

        
        <div className="flex h-[96px] items-center gap-3.5 px-6">
          <img
            src={logo}
            className="h-12 w-12 rounded-xl"
            alt="Taskify Logo"
          />

          <div>
            <div className="text-2xl font-bold text-white">
              <p>
                Task<span className="text-[#A7F3D0] dark:text-[#55E4DB]">ify</span>
              </p>
            </div>

            <p className="mt-1 text-[11px] font-normal tracking-wide text-[#14B8A6] dark:text-[#55E4DB]">
              Your Tasks, A Better You
            </p>
          </div>
        </div>

        
        <div className="mt-[42px] flex flex-col gap-1 px-4">
          <NavLink to="/" end className={desktopNavClass}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14B8A6]/20 dark:bg-[#08A99D]/15">
              <House size={22} />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/Alltask" className={desktopNavClass}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14B8A6]/20 dark:bg-[#08A99D]/15">
              <ListTodo size={22} />
            </span>
            <span>All Tasks</span>
          </NavLink>
        </div>

        
        <div className="mx-6 my-7 h-px bg-white/[0.13] dark:bg-[#25485A]" />

        
        <div className="px-4">
          <NavLink to="/Setting" className={desktopNavClass}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14B8A6]/20 dark:bg-[#08A99D]/15">
              <Settings size={22} />
            </span>
            <span>Settings</span>
          </NavLink>
        </div>

        
        <div className="mx-4 mb-5 mt-auto flex gap-5 rounded-2xl border border-[#14B8A6]/30 bg-[#14B8A6]/10 p-[18px] shadow-[0_0_20px_rgba(20,184,166,0.08)] dark:border-[#25485A] dark:bg-[#102638] dark:shadow-[0_0_24px_rgba(8,169,157,0.06)]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/20 dark:bg-[#08A99D]/15">
            <Rocket size={28} className="text-[#2DD4BF] dark:text-[#55E4DB]" />
          </div>

          <div>
            <div className="text-base font-semibold text-white">
              Stay Productive
            </div>

            <div className="mt-1 text-xs text-[#B8D9D6] dark:text-[#B0C6D4]">
              Small steps every day.
            </div>
          </div>
        </div>
      </aside>

      
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-[#0F2D2D] px-2 pt-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,45,45,0.18)] transition-colors duration-200 dark:border-[#25485A] dark:bg-[#071725] lg:hidden">
        <NavLink to="/" end className={mobileNavClass}>
          <House size={21} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/Alltask" className={mobileNavClass}>
          <ListTodo size={21} />
          <span>All Tasks</span>
        </NavLink>

        <NavLink to="/Setting" className={mobileNavClass}>
          <Settings size={21} />
          <span>Settings</span>
        </NavLink>
      </nav>

      
      <button
        type="button"
        onClick={() => setIsTaskModalOpen(true)}
        aria-label="Add task"
        className="fixed bottom-[88px] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0D9488] text-white shadow-[0_8px_22px_rgba(13,148,136,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 dark:bg-[#6938EF] dark:shadow-[0_8px_24px_rgba(105,56,239,0.35)] lg:hidden"
      >
        <Plus size={28} />
      </button>

      
      {isTaskModalOpen && (
        <TaskFormModal onClose={() => setIsTaskModalOpen(false)} />
      )}
    </>
  )
}

export default Sidebar
