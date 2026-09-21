import React from 'react'
import banner from "../assets/welcome-banner.png"
import useStore from '../store/taskStore'
import { ClipboardList } from 'lucide-react';

const Deshboard = () => {

  const tasks = useStore((state) => state.tasks);
  function Greeting() {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      return "Good Morning"
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon"
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening"
    } else {
      return "Good Night"
    }
  }

  return (
    <div>
          <div
            className="ml-[260px] h-[252px] w-[calc(100%-260px)] overflow-hidden rounded-b-2xl bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "100% 100%",
            }}
          >

            <div className="relative flex h-full gap-[55px] flex-col justify-center px-8">

              <div className="flex relative items-center mt-[70px] gap-2">
                <h1 className="text-[30px] font-bold  leading-tight text-[#111A46]">
                  <Greeting />,
                </h1>

                <span className="text-[30px] font-bold text-[#6D3DF5]">
                  User! 
                </span>
              </div>

              <p className=" -mt-13 text-[15px] font-normal text-[#16274b]">
                Stay organized and get things done.
              </p>

              <button
                type="button"
                className="  flex h-[46px] w-fit items-center gap-2 rounded-xl bg-[#6D3DF5] px-5 text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(109,61,245,0.28)] transition-all duration-200 hover:bg-[#5B2FE0] hover:shadow-[0_10px_22px_rgba(109,61,245,0.35)]"
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
        <div>
          <div>
            <ClipboardList/>

            <p>Total Tasks</p>

            <p>{tasks.length}</p>

          </div>

          <div>
            
          </div>

          <div></div>

          <div></div>
        </div>
    </div>

  )
}

export default Deshboard