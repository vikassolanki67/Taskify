import React, { useState } from 'react'
import banner from "../assets/banner2.png"
import TaskFormModal from '../components/task/TaskFormModal'

const Alltask = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  return (
    <div>
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
              className="flex h-[46px] items-center gap-2 rounded-xl bg-[#119DA4] px-5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(17,157,164,0.25)] transition-all duration-200 hover:bg-[#0D8990] hover:-translate-y-0.5"
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
    </div>
  )
}

export default Alltask