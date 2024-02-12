import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
 

export default function Auth({children}) {
   let navigate=useNavigate();    
   if(localStorage.getItem("userToken")!=null){
    return navigate(-1 );
   } 
  return children
}
