import React from 'react'
import logo from "../../assets/taskify-logo.png";
import { NavLink } from "react-router";
import { Rocket } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-[260px] bg-[#0F2D2D] shadow-xl">

      {/* Brand */}
      <div className="h-[96px] px-6 flex items-center gap-3.5">

        <img
          src={logo}
          className="h-12 w-12 rounded-xl"
          alt="Taskify Logo"
        />

        <div>
          <div className="text-2xl font-bold text-white">
            <p>
              Task<span>ify</span>
            </p>
          </div>

          <p className="mt-1 text-[11px] font-normal tracking-wide text-[#B8D9D6]">
            Your Tasks, A Better You
          </p>
        </div>

      </div>


      {/* Navigation */}
      <div>
        <NavLink to="/">
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/Alltask">
          <span>All Tasks</span>
        </NavLink>
      </div>


      {/* Divider */}
      <div></div>


      {/* Settings */}
      <NavLink to="/Setting">
        <span>Settings</span>
      </NavLink>


      {/* Productivity Card */}
      <div>
        <div>
          <Rocket />
        </div>

        <div>Stay Productive</div>

        <div>
          Small steps every day.
        </div>
      </div>

    </div>
  )
}

export default Sidebar