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
    <div>
      <Sidebar />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {toast && <Toast />}
    </div>
  )
}

export default Layout