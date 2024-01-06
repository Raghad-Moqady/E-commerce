import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard(admin)/Navbar.jsx'
import Footer from '../components/dashboard(admin)/Footer.jsx'

export default function DashboardLayout() {
  return (
  <>
  <Navbar/>
  <Outlet/>
  <Footer/>
  </>
  )
}
