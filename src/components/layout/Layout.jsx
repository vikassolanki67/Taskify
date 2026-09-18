import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout