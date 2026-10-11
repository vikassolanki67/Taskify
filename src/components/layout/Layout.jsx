import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import Toast from '../common/Toast'
import useStore from '../../store/taskStore'

const Layout = () => {
  const toast = useStore((state) => state.toast)

  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar />
      <Header />

    <main className="w-full min-w-0 flex-1">
      <Outlet />
    </main>
      <Footer />

      {toast && <Toast />}
    </div>
  )
}

export default Layout