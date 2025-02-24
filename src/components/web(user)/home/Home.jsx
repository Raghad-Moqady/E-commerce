import React from "react";
import Categories from "../categories/Categories";
import style from "./Home.module.css";
import headerImg from "../../img/shopping.jpg";

export default function Home() {
  return (
    <>
      {/* <div className={`${style.Home} position-relative  `}  > 
         <div className={`${style.header }  position-absolute `} >
           <h1 className={`${style.title }  text-white `}>Welcome to Raghad Store </h1>

         </div>
       </div> */}
      <div className={`${style.Home} container pt-5 `}>
        <div className={` row  `}>
          <div className="col-md-6">
            <h1 className={`${style.title}`}>Welcome to Raghad Store 🛒 </h1>
          </div>
          <div className="w-50 col-md-6">
            <img src={headerImg} alt="" className="w-100" />
          </div>
        </div>
      </div>
    
      <Categories />
    </>
  );
}
