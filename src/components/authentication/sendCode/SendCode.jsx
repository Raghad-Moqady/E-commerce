import React, { useState } from 'react'
 import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import SharedForm from '../sharedForm/SharedForm'
import { SuccessToast } from '../../pages/toast/toast'
import { sendCodeSchema } from '../validation/validate'
import sendCodeImage from '../../img/sendCode.jpg'

export default function SendCode() {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
    const initialValues={ 
        email:'',
     } 
    const onSubmit= async values =>{
      setLoading(true);
       const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,values);
       setLoading(false);
       if(data?.message=='success'){
        SuccessToast('Check Your Email') ;
        navigate('/forgetPassword');
       }
   }
    const formik =useFormik({
        initialValues, 
        onSubmit,
        validationSchema:sendCodeSchema
    }); 
    const renderInputs=(
      <Input
                id="email"
                type="email"
                name="email"
                title="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errors={formik.errors}
                onBlur={formik.handleBlur} //لتتبع الحقول التي تمت زيارتها
                touched={formik.touched} //لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت
       />
    )  
  return (
    <SharedForm
    title='Verify Your Email'
    formik_handelSubmit={formik.handleSubmit}
    renderInputs={renderInputs}
    mainAction='Send Code'
    formik_isValid={formik.isValid} 
    loading={loading}
    image={sendCodeImage}
    encType=''
  />  
  )
}
