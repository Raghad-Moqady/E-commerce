//بنعملها عشان اليوزر اللي مش عامل تسجيل دخول لسا نمنعه من الوصول لصفحات خاصة بالمسجلين وذلك عند كتابتها فوق بالرابط 
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
 
export default function ProtectedRoute({children} ) {//هون بدي أتأكد هل اليوزر مسجل دخوله؟عن طريق التوكن +هون متل الشرطي بمنع وصول اشخاص معينين للمكان المطلوب 
     if(localStorage.getItem("userToken")== null){//(لا يوجد لديه صلاحية)اذاً اليوزر عامل تسجيل خروج وممنوع يدخل على الراوت اللي كتبه
        return <Navigate to='/login'/>
    }  
   return children
}
