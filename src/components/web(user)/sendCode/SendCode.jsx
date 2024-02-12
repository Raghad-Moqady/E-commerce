import React from 'react'
import style from '../Auth.module.css'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import { sendCodeSchema } from '../validation/validate'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SendCode() {
  const navigate=useNavigate();
    const initialValues={ 
        email:'',
     } 
    const onSubmit= async values =>{
       const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,values);
       if(data.message=='success'){
        toast.success('Check your email', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate('/forgetPassword');
       }
   }
    const formik =useFormik({
        initialValues, 
        onSubmit,
        validationSchema:sendCodeSchema
    }); 
  return (
    <div className={`container ${style.formDesign} p-3 mt-5 rounded-0`}>
    <h2 className='text-center mt-3 mb-4'>Verify Your Email</h2>
    <form  onSubmit={formik.handleSubmit} >
    <div className="container">
    <Input
       id='email'
       type='email'
       name='email'
       title='Email'
       value={formik.values.email}
       onChange={formik.handleChange}
       errors={formik.errors}   
       onBlur={formik.handleBlur}//لتتبع الحقول التي تمت زيارتها 
       touched={formik.touched}//لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت 
      />
        <div className='d-flex m-auto  justify-content-center w-75 '>
        <button className='rounded-0 border-1 w-50 btn btn-outline-light ' disabled={!formik.isValid}  type='submit'>Send Code</button> 
      </div>
      </div>
      
    </form>
    </div>
  )
}
