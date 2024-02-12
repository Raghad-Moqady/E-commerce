import React, { Profiler, useContext, useEffect } from 'react'
import {RouterProvider,} from "react-router-dom";
 import { CartContextProvider } from './components/web(user)/context/CartFeatures.jsx';
  import {router} from './router/Routes.jsx'
import { UserContext } from './components/web(user)/context/UserContext.jsx';
 
export default function App() {
    let {setUserToken}=useContext(UserContext);
     useEffect(()=>{
      if(localStorage.getItem("userToken")!=null){//اليوزر مسجل دخوله
         setUserToken(localStorage.getItem("userToken"));
      }
   },[])
    return (
      //ننظر من الداخل الى الخارج 
      //ثم نقوم بتنفيذ   صفحة الخارج ثم نعود لتنفيذ صفحة الداخل 
      //الابن ينظر الى الاب وليس العكس 
      // الابن بشوف كل شيء موجود بالاب والعكس غير صحيح
      //عندما يتم تشغيل البرنامج يتم تنفيذ الاب ثم الابناء 
        <CartContextProvider>
           <RouterProvider router={router} />
        </CartContextProvider>
   )
}
