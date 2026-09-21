import React from "react";
import { Search, Sun, Moon, ChevronDown, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed  -top-3 right-0 z-40 h-[100px] w-[calc(100%-260px)] px-5 pt-[18px] md:px-5">
      <div className="flex h-18.5 w-full items-center rounded-2xl border
       border-slate-200/80 bg-white/90 px-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">

        <div className="relative flex h-[54px] flex-1 items-center rounded-xl
           border border-[#DCE6F7] bg-[#F7F9FE] transition-all duration-200 focus-within:border-[#B9CFF5] focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.06)]">
          <Search size={25} strokeWidth={2} className="absolute left-[18px] text-[#36558A]" />

          <input
            type="search"
            placeholder="Search tasks, categories..."
            className="h-[90%] w-full rounded-xl bg-transparent pl-[62px] pr-4 
            text-[16px] text-[#172554] outline-none placeholder:text-[#58709D]"
          />
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
                👩🏻
              </div>
            </div>

            <span className="text-[16px] font-semibold text-[#10183D]">
              Tamanna
            </span>

            <ChevronDown size={20} strokeWidth={2.4} className="ml-1 text-[#233D70]" />
          </button>

        </div>

      </div>
    </header>
  );
};

export default Header;