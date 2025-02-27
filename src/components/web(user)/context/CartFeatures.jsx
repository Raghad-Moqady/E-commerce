import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from './../../pages/toast/toast';


export const CartContext= createContext(null);// هاد المتغير اللي رح ابعت فيه المتغيرات اللي بدي تكون موجودة بالكمبوننتس ورح استخدمه بالكمبوننت برا

export function CartContextProvider({children}){//childern==component
    const [productCount,setProductCount]=useState(0);
    const token =localStorage.getItem("userToken");
    const [cartDataLoading,setCartDataLOading]=useState(true);
    const [CartData,setCartData]=useState(null);
//نريد التعامل مع الباك اند ==>post , productId(body)=>from product component, Authorization (HEADERS)=>'كلمة خاصة بتيجي من الباكإند'token
    const addToCartContext =async(productId)=>{
        try{
            const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers: 
               { Authorization :`Tariq__${token}`}
            }
            )
            if(data?.message=='success'){
                SuccessToast('Product Added Successfully');
                  
            }
        }catch(error){
            ErrorToast('product already exists'); 
        }
    }

    const getCartContextInfo=async()=>{//هاي الملعومات بدي اعرضهم بصفحة السلة عشان هيك بروح استدعي الفنكشن من صفحة الكارت 
         try{ 
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {
                headers: 
               { Authorization :`Tariq__${token}`}
            }
            );
            console.log(data);
            setProductCount(data?.count);
            //عشان الrefresh
            setCartDataLOading(false);
            setCartData(data);
            // return data;
         }catch(error){
            ErrorToast('Error');
          }
    }

    const removeItemFromCartContext=async(productId)=>{
        try{
          const {data} =await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
          {productId},
          {
            headers: 
            { Authorization :`Tariq__${token}`}
          }
          );
          if(data?.message=='success'){ 
            SuccessToast('Product deleated Successfully');
          }
        }catch(error){
            ErrorToast('Error');
        }
    

    } 
   useEffect(()=>{//بتشتغل لما نعمل ريفريش للصفحة +بتشتغل لما ما نكون عاملين تسجيل دخول ونكتب كارت بالرابط ونسجل دخولنا بشكل غير مباشر
    if(token!=null){
        getCartContextInfo();
    }
   },[token])
   
    return <CartContext.Provider value={{addToCartContext,getCartContextInfo,removeItemFromCartContext ,productCount,cartDataLoading,setCartDataLOading,token,CartData}}>
        {children}
    </CartContext.Provider>
}

