import React, { useState } from "react";
import { Search, Sun, Moon, ChevronDown, Menu } from "lucide-react";
import useStore from "../../store/taskStore";
import { useNavigate } from "react-router";
const Header = () => {
    const tasks = useStore((state) => state.tasks)

  
  const avatarOptions = [
    {
      value: 'Male',
      label: 'Male',
      image:
        'https://api.dicebear.com/10.x/adventurer/svg?seed=TaskifyMale&backgroundColor=b6e3f4',
    },
    {
      value: 'Female',
      label: 'Female',
      image:
        'https://api.dicebear.com/10.x/adventurer/svg?seed=TaskifyFemale&backgroundColor=ffd5dc',
    },
    {
      value: 'Neutral',
      label: 'Neutral',
      image:
        'https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=TaskifyNeutral&backgroundColor=c0e8e8',
    },
  ]

  const Name  = useStore((state) => state.profile.name)
  const avatar  = useStore((state) => state.profile.avatar)

  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([])

  const navigate = useNavigate()

  const handleSelectTask = (task) => {
    navigate("/Alltask", {
      state: {
        selectedTaskId: task.id,
      },
    })

    setSearch("")
    setFilteredTasks([])
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearch("")
      setFilteredTasks([])
      return
    }

    if (e.key === "Enter" && search.trim()) {
      e.preventDefault()

      navigate("/Alltask", {
        state: {
          globalSearchQuery: search.trim(),
        },
      })

      setSearch("")
      setFilteredTasks([])
    }
  }
  const handleSearch = (value) => {
    setSearch(value)

    if (!value.trim()) {
      setFilteredTasks([])
      return
    }

    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(value.trim().toLowerCase())
    )

    setFilteredTasks(results)
  }
  return (
    <header className="fixed  -top-3 right-0 z-40 h-[100px] w-[calc(100%-260px)] px-5 pt-[18px] md:px-5">
      <div className="flex h-18.5 w-full items-center rounded-2xl border
       border-slate-200/80 bg-white/90 px-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">

        <div className="relative flex h-[54px] flex-1 items-center rounded-xl
           border border-[#DCE6F7] bg-[#F7F9FE] transition-all duration-200 focus-within:border-[#B9CFF5] focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.06)]">
          <Search size={25} strokeWidth={2} className="absolute left-[18px] text-[#36558A]" />

          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search tasks..."
            value={search}
            onKeyDown={handleSearchKeyDown}
            onClick={() => handleSelectTask(task)}
            className="h-[90%] w-full rounded-xl bg-transparent pl-[62px] pr-4 
            text-[16px] text-[#172554] outline-none placeholder:text-[#58709D]"
          />
          {search.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[60] overflow-hidden rounded-xl border border-[#E2E9F5] bg-white shadow-[0_12px_30px_rgba(30,64,120,0.14)]">

              {filteredTasks.length > 0 ? (
                <div className="max-h-[280px] overflow-y-auto py-1.5">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleSelectTask(task)}
                      className="cursor-pointer border-b border-[#EEF1F7] px-5 py-3.5 last:border-b-0 hover:bg-[#F4F7FF]"
                    >
                      <p className="truncate text-[14px] font-medium text-[#172554]">
                        {task.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="px-5 py-4 text-[14px] text-[#58709D]">
                  No matching tasks found
                </p>
              )}

            </div>
          )}
        </div>

        <div className="ml-7 hidden items-center lg:flex">

          <button
            type="button"
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full
             bg-white text-[#F59E0B] shadow-[0_3px_12px_rgba(245,158,11,0.18)] transition-all duration-200 hover:scale-105"
          >
            <Sun size={27} strokeWidth={2.2} />
          </button>

          <button
            type="button"
            className="ml-3 flex h-[48px] w-[48px] items-center justify-center 
            rounded-full bg-[#263B69] text-white shadow-[0_4px_12px_rgba(38,59,105,0.25)] transition-all duration-200 hover:scale-105"
          >
            <Moon size={25} strokeWidth={2.2} />
          </button>

          <div className="mx-6 h-12 w-px bg-slate-200" />

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-slate-50"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#C4A1FF] to-[#6D3DE8] ring-4 ring-[#EEE7FF]">
              <div className="flex h-full w-full items-center justify-center text-[27px]">
                <img
                  src={
                    avatarOptions.find(
                      (item) => item.value === avatar
                    )?.image
                  }
                  alt="Selected avatar"
                  className="object-contain"
                />
              </div>
            </div>

            <span className="text-[16px] font-semibold text-[#10183D]">
              {Name}
            </span>

            <ChevronDown size={20} strokeWidth={2.4} className="ml-1 text-[#233D70]" />
          </button>

        </div>

      </div>
    </header>
  );
};

export default Header;