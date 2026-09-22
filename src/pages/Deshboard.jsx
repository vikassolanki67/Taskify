import React, { useEffect, useState } from 'react'
import banner from "../assets/welcome-banner.png"
import useStore from '../store/taskStore'
import { ClipboardList, Check, ClockFading, ShieldAlert } from 'lucide-react'

const Deshboard = () => {

  const tasks = useStore((state) => state.tasks)
  const [greeting, setgreeting] = useState()

  let completedCount = 0
  let overdueCount = 0

  const currentdate = new Date().toISOString().split("T")[0]

  tasks.forEach(task => {
    if (task.status === "completed") {
      completedCount++
    }

    if (
      task.status === "active" &&
      task.dueDate &&
      task.dueDate < currentdate
    ) {
      overdueCount++
    }
  })

  const totalCount = tasks.length
  const remainingCount = totalCount - completedCount

  const completedPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const remainingPercentage =
    totalCount > 0 ? (remainingCount / totalCount) * 100 : 0

  const overduePercentage =
    totalCount > 0 ? (overdueCount / totalCount) * 100 : 0

  function Greeting() {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      setgreeting("Good Morning")
    } else if (hour >= 12 && hour < 17) {
      setgreeting("Good Afternoon")
    } else if (hour >= 17 && hour < 21) {
      setgreeting("Good Evening")
    } else {
      setgreeting("Good Night")
    }
  }

  useEffect(() => {
    Greeting()

    const timer = setInterval(() => {
      Greeting()
    }, 60000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>

      <div
        className="ml-[260px] h-[250px] w-[calc(100%-260px)] overflow-hidden  bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="relative flex h-full flex-col justify-center gap-[55px] px-8">

          <div className="relative mt-[70px] flex items-center gap-2">
            <h1 className="text-[30px] font-bold leading-tight text-[#111A46]">
              {greeting},
            </h1>

            <span className="text-[30px] font-bold text-[#6D3DF5]">
              User!
            </span>
          </div>

          <p className="-mt-13 text-[15px] font-normal text-[#16274b]">
            Stay organized and get things done.
          </p>

          <button
            type="button"
            className="flex h-[46px] w-fit items-center gap-2 rounded-xl bg-[#6D3DF5] px-5 text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(109,61,245,0.28)] transition-all duration-200 hover:bg-[#5B2FE0] hover:shadow-[0_10px_22px_rgba(109,61,245,0.35)]"
          >
            <span className="text-[20px] leading-none">+</span>
            Add Task
          </button>

          <div className="absolute bottom-1 left-53 flex items-center gap-3">
            <div className="h-12 w-[3px] rounded-full bg-[#7C3AED]" />

            <p className="text-[15px] font-medium leading-[1.45] text-[#243B70]">
              Small steps
              <br />
              every day lead to big progress. ♡
            </p>
          </div>

        </div>
      </div>

    <div className="ml-[260px] grid w-[calc(100%-260px)] grid-cols-4 gap-6 bg-[#E1EBFE] px-5 py-2">

      <div className="flex h-[95px] items-center gap-4 rounded-2xl border-2 border-white/80 bg-[#E6F2FE]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">

        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#E4F0FF]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1478F2] text-white shadow-[0_0px_17px_rgba(20,120,242,0.95)]">
            <ClipboardList size={20} strokeWidth={2.4} />
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-[#536B9E]">
            Total Tasks
          </p>

          <p className="mt-1 text-[26px] font-bold leading-none text-[#111A46]">
            {totalCount}
          </p>
        </div>

      </div>


      <div className="relative flex h-[95px] flex-col justify-center rounded-2xl border-2 border-white/80 bg-[#E6FAF4]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">

        <div className="flex items-center gap-3">

          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#DDF8ED]">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#12B981] text-white shadow-[0_0px_12px_rgba(18,185,129,0.50)]">
              <Check size={20} strokeWidth={2.8} />
            </div>
          </div>

          <div>
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


      <div className="relative flex h-[95px] flex-col justify-center rounded-2xl border-2 border-white/80 bg-[#FFF5E9]/80 px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">

        <div className="flex items-center gap-3">

          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#FFF0D9]">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#F5A623] text-white shadow-[0_0px_12px_rgba(245,166,35,0.56)]">
              <ClockFading size={20} strokeWidth={2.5} />
            </div>
          </div>

          <div>
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


      <div className="relative flex h-[95px]  bg-[#FEEBF0]/80  flex-col justify-center rounded-2xl border-2 border-white/80  px-4 shadow-[0_5px_18px_rgba(30,64,175,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)]">

        <div className="flex items-center gap-3">

          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#FFE1E5]">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#EF4444] text-white shadow-[0_5px_15px_rgba(239,68,68,0.60)]">
              <ShieldAlert size={20} strokeWidth={2.5} />
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium text-[#536B9E]">
              Overdue
            </p>

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

    </div>

    </div>
  )
}

export default Deshboard