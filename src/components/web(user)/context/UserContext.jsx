import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let UserContext =createContext();
 

export default function UserContextProvider({children}) {
    const [userToken,setUserToken]= useState(null);//login متغير بدي أحط فيه معلومات اليوزر المفكوك تشفيرها في حال عمل :user
    const [userData,setUserData]=useState(null);
    const [loading,setLoading]=useState(true);
    const getUserData=async()=>{ 
       if(userToken){
         const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
         { headers: {Authorization:`Tariq__${userToken}`} } )   
        // console.log(data);
         setUserData(data?.user); 
         setLoading(false);
       } 
    }
    useEffect(()=>{
     getUserData();
    },[userToken])
   
  return (<UserContext.Provider value={{userToken,setUserToken,getUserData,userData,setUserData,loading}} >
    {children}
  </UserContext.Provider>
  )
}
