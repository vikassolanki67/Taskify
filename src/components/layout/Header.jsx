import React, { useState } from "react";
import { Search, Sun, Moon } from "lucide-react";
import useStore from "../../store/taskStore";
import { useNavigate } from "react-router";

const Header = () => {
  const tasks = useStore((state) => state.tasks);
  const Name = useStore((state) => state.profile.name);
  const avatar = useStore((state) => state.profile.avatar);

  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const navigate = useNavigate();

  const avatarOptions = [
    {
      value: "Male",
      image:
        "https://api.dicebear.com/10.x/adventurer/svg?seed=TaskifyMale&backgroundColor=b6e3f4",
    },
    {
      value: "Female",
      image:
        "https://api.dicebear.com/10.x/adventurer/svg?seed=TaskifyFemale&backgroundColor=ffd5dc",
    },
    {
      value: "Neutral",
      image:
        "https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=TaskifyNeutral&backgroundColor=c0e8e8",
    },
  ];

  const selectedAvatar =
    avatarOptions.find((item) => item.value === avatar)?.image ??
    avatarOptions[2].image;

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setFilteredTasks([]);
      return;
    }

    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(value.trim().toLowerCase()),
    );
    setFilteredTasks(results);
  };

  const handleSearchSubmit = () => {
    const query = search.trim();

    if (!query) return;

    navigate("/Alltask", { state: { globalSearchQuery: query } });
    setSearch("");
    setFilteredTasks([]);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearch("");
      setFilteredTasks([]);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 sm:px-4 lg:-top-3 lg:left-[260px] lg:px-5 lg:pt-[18px]">
      <div className="flex h-[64px] w-full min-w-0 items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/90 px-2 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:h-[72px] sm:gap-3 sm:px-4 lg:h-[74px]">
        <div className="relative flex h-[44px] min-w-0 flex-1 items-center rounded-xl border border-[#DCE6F7] bg-[#F7F9FE] transition-all duration-200 focus-within:border-[#B9CFF5] focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] sm:h-[50px] lg:h-[54px]">
          <Search
            size={19}
            strokeWidth={2}
            className="absolute left-2.5 shrink-0 text-[#36558A] sm:left-4 lg:left-[18px]"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search tasks..."
            aria-label="Search tasks by title"
            className="h-full w-full min-w-0 rounded-xl bg-transparent pl-9 pr-1.5 text-[12px] text-[#172554] outline-none placeholder:text-[#58709D] sm:pl-12 sm:pr-3 sm:text-[14px] lg:pl-[62px] lg:pr-4 lg:text-[16px]"
          />

          {search.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[60] overflow-hidden rounded-xl border border-[#E2E9F5] bg-white shadow-[0_12px_30px_rgba(30,64,120,0.14)]">
              {filteredTasks.length > 0 ? (
                <div className="max-h-[min(280px,40vh)] overflow-y-auto py-1.5">
                  {filteredTasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={handleSearchSubmit}
                      className="block w-full min-w-0 border-b border-[#EEF1F7] px-3 py-3 text-left last:border-b-0 hover:bg-[#F4F7FF] sm:px-5 sm:py-3.5"
                    >
                      <p className="truncate text-[13px] font-medium text-[#172554] sm:text-[14px]">
                        {task.title}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-3 text-[12px] text-[#58709D] sm:px-5 sm:py-4 sm:text-[14px]">
                  No matching tasks found
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:ml-2">
          <button
            type="button"
            aria-label="Light theme"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#F59E0B] shadow-[0_3px_12px_rgba(245,158,11,0.18)] transition-all duration-200 hover:scale-105 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          >
            <Sun
              size={19}
              strokeWidth={2.2}
              className="sm:h-[22px] sm:w-[22px] lg:h-[25px] lg:w-[25px]"
            />
          </button>

          <button
            type="button"
            aria-label="Dark theme"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#263B69] text-white shadow-[0_4px_12px_rgba(38,59,105,0.25)] transition-all duration-200 hover:scale-105 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          >
            <Moon
              size={18}
              strokeWidth={2.2}
              className="sm:h-[21px] sm:w-[21px] lg:h-6 lg:w-6"
            />
          </button>
        </div>

        <div className="flex max-w-[82px] shrink-0 items-center gap-1.5 sm:max-w-[140px] sm:gap-2.5 lg:ml-2 lg:max-w-none lg:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#C4A1FF] to-[#6D3DE8] ring-2 ring-[#EEE7FF] sm:h-10 sm:w-10 lg:h-[52px] lg:w-[52px] lg:ring-4">
            <img
              src={selectedAvatar}
              alt="Profile avatar"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="min-w-0 truncate text-[11px] font-semibold text-[#10183D] sm:text-[13px] lg:text-[16px]">
            {Name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
