import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { Rocket, House, ListTodo, Settings, Plus } from 'lucide-react'
import TaskFormModal from '../task/TaskFormModal'
import logo from "../../assets/taskify-logo.png";

const Sidebar = () => {

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  
  return (
    <>
      <div className="fixed left-0 top-0 hidden h-screen w-[260px] flex-col bg-[#0F2D2D] shadow-xl lg:flex">

        <div className="flex h-[96px] items-center gap-3.5 px-6">
          <img
            src={logo}
            className="h-12 w-12 rounded-xl"
            alt="Taskify Logo"
          />

          <div>
            <div className="text-2xl font-bold text-white">
              <p>
                Task<span className="text-[#A7F3D0]">ify</span>
              </p>
            </div>

            <p className="mt-1 text-[11px] font-normal tracking-wide text-[#14B8A6]">
              Your Tasks, A Better You
            </p>
          </div>
        </div>

        <div className="mt-[42px] flex flex-col gap-1 px-4">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex h-[50px] items-center gap-3.5 rounded-2xl border px-4 text-base font-medium transition-all duration-200 ${
                isActive
                  ? "border-[#2DD4BF] bg-[#0D9488]/80 text-white shadow-[0_0_8px_rgba(45,212,191,0.8),0_0_22px_rgba(20,184,166,0.45)]"
                  : "border-transparent text-[#B8D9D6] hover:bg-[rgba(20,184,166,0.10)] hover:text-white"
              }`
            }
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14B8A6]/20">
              <House size={22} />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/Alltask"
            className={({ isActive }) =>
              `flex h-[50px] items-center gap-3.5 rounded-2xl border px-4 text-base font-medium transition-all duration-200 ${
                isActive
                  ? "border-[#2DD4BF] bg-[#0D9488]/80 text-white shadow-[0_0_8px_rgba(45,212,191,0.8),0_0_22px_rgba(20,184,166,0.45)]"
                  : "border-transparent text-[#B8D9D6] hover:bg-[rgba(20,184,166,0.10)] hover:text-white"
              }`
            }
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14B8A6]/20">
              <ListTodo size={22} />
            </span>
            <span>All Tasks</span>
          </NavLink>

        </div>

        <div className="mx-6 my-7 h-px bg-white/[0.13]"></div>

        <div className="px-4">
          <NavLink
            to="/Setting"
            className={({ isActive }) =>
              `flex h-[50px] items-center gap-3.5 rounded-2xl border px-4 text-base font-medium transition-all duration-200 ${
                isActive
                  ? "border-[#2DD4BF] bg-[#0D9488]/80 text-white shadow-[0_0_8px_rgba(45,212,191,0.8),0_0_22px_rgba(20,184,166,0.45)]"
                  : "border-transparent text-[#B8D9D6] hover:bg-[rgba(20,184,166,0.10)] hover:text-white"
              }`
            }
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14B8A6]/20">
              <Settings size={22} />
            </span>
            <span>Settings</span>
          </NavLink>
        </div>

        <div className="mx-4 mb-5 mt-auto flex gap-5 rounded-2xl border border-[#14B8A6]/30 bg-[#14B8A6]/10 p-[18px] shadow-[0_0_20px_rgba(20,184,166,0.08)]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/20">
            <Rocket size={28} className="text-[#2DD4BF]" />
          </div>

          <div>
            <div className="text-base font-semibold text-white">
              Stay Productive
            </div>

            <div className="mt-1 text-xs text-[#B8D9D6]">
              Small steps every day.
            </div>
          </div>
        </div>

      </div>
      
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-[#0F2D2D] px-2 pt-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,45,45,0.18)] lg:hidden">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium ${
              isActive
                ? 'bg-[#0D9488]/30 text-[#A7F3D0]'
                : 'text-[#B8D9D6]'
            }`
          }
        >
          <House size={21} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/Alltask"
          className={({ isActive }) =>
            `flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium ${
              isActive
                ? 'bg-[#0D9488]/30 text-[#A7F3D0]'
                : 'text-[#B8D9D6]'
            }`
          }
        >
          <ListTodo size={21} />
          <span>All Tasks</span>
        </NavLink>

        <NavLink
          to="/Setting"
          className={({ isActive }) =>
            `flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium ${
              isActive
                ? 'bg-[#0D9488]/30 text-[#A7F3D0]'
                : 'text-[#B8D9D6]'
            }`
          }
        >
          <Settings size={21} />
          <span>Settings</span>
        </NavLink>

      </nav>

      
      <button
        type="button"
        onClick={() => setIsTaskModalOpen(true)}
        aria-label="Add task"
        className="fixed bottom-[88px] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0D9488] text-white shadow-[0_8px_22px_rgba(13,148,136,0.35)] transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        <Plus size={28} />
      </button>

     
      {isTaskModalOpen && (
        <TaskFormModal
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </>

  )
}

export default Sidebar