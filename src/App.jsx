import React from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import Deshboard from './pages/Deshboard'
import Alltask from './pages/Alltask'
import Setting from './pages/Setting'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Deshboard />} />
        <Route path="/Alltask" element={<Alltask />} />
        <Route path="/Setting" element={<Setting />} />
      </Route>
    </Routes>
  )
}

export default App