import React from 'react'
import Navbar from '../components/web(user)/Navbar.jsx'
import Footer from '../components/web(user)/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function WebLayout() {
  return (
    <>
     <Navbar/>
     <Outlet/> 
     <Footer/>
    </>
  )
}
