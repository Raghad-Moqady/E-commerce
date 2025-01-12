import React, { useContext, useEffect } from 'react'
import Navbar from '../components/web(user)/navbar/Navbar.jsx'
import Footer from '../components/web(user)/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
 
export default function WebLayout() {
  return (
    <>
     <Navbar/>
     <Outlet/> 
     {/* <Footer/> */}
    </>
  )
}
