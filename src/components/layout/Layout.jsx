import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import Toast from '../common/Toast'
import useStore from '../../store/taskStore'
import { useCallback, useState ,useEffect } from "react";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts.js";
import { useNavigate } from "react-router";

const Layout = () => {

  const toast = useStore((state) => state.toast)

  const [focusSearch, setFocusSearch] = useState(() => () => {});
  const openTaskModal = useStore((state) => state.openTaskModal);
  const closeTaskModal = useStore((state) => state.closeTaskModal);

  const handleSearchReady = useCallback((focusFunction) => {
    setFocusSearch(() => focusFunction);
  }, []);

  const navigate = useNavigate();


  useKeyboardShortcuts({
    onSearch: focusSearch,
    onNewTask: openTaskModal,
    onClose: closeTaskModal,
    onDashboard: () => navigate("/"),
    onAllTasks: () => navigate("/Alltask"),
    onSettings: () => navigate("/setting"),
  });

  const theme = useStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  
  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar />
     <Header onSearchReady={handleSearchReady} />

    <main className="w-full min-w-0 flex-1">
      <Outlet />
    </main>
      <Footer />

      {toast && <Toast />}
    </div>
  )
}

export default Layout