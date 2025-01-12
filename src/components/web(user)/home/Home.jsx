import React from 'react'
import Categories from '../categories/Categories'
import style from './Home.module.css'
 export default function Home() {
 
  return (
     <>
        <div className={`${style.Home} position-relative  `}  > 
         <div className={`${style.header }  position-absolute `} >
           <h1 className={`${style.title }  text-white `}>Welcome to Raghad Store </h1>
         </div>
       </div>
      <Categories/>  
     </> 
  )
}
