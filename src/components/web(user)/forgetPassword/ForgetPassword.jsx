import React from 'react'
import style from '../Auth.module.css'
import { useFormik } from 'formik'
import Input from '../../pages/Input.jsx';
import { forgetPasswordSchema } from '../validation/validate';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
    const initialValues={
        email:'',
        password:'',
        code:''
    }
    const navigate=useNavigate();
    const onSubmit= async values=>{
         const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,values);
     
         if(data.message=='success'){
            
            toast.success('Your password has been changed successfully', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
             navigate('/login') ;  
         }
    }
    const formik =useFormik({
        initialValues, 
        onSubmit,
        validationSchema:forgetPasswordSchema
    });
    
    const inputs=[
        {
           id:'Email',//lable لربط الليبل مع الانبوت 
           type:'email',
           name:'email',
           title:'Email',
           value:formik.values.email
        },
        {
            id:'Password',//lable لربط الليبل مع الانبوت 
            type:'password',
            name:'password',
            title:'New Password',
            value: formik.values.password,
        },
        {
            id:'Code',//lable لربط الليبل مع الانبوت 
            name:'code',
            title:'Code',
            value: formik.values.code,
        }
    ]

    const renderInputs= inputs.map((input,index)=>
        <Input
          type={input.type}
          id={input.id}
          name={input.name}
          title={input.title}
          value={input.value}
          onChange={formik.handleChange}
          errors={formik.errors} 
          onBlur={formik.handleBlur}
          touched={formik.touched}
          key={index}
        />
   )
  return (
    <div className={`container ${style.formDesign} p-3 mt-5 rounded-0`}>
    <h2 className='text-center mt-3 mb-4'>Reset Password</h2>
    <form onSubmit={formik.handleSubmit}>
    <div className="container">
        {renderInputs}
        <div className='d-flex m-auto  justify-content-center w-75 '>
        <button className='rounded-0 border-1 w-50 btn btn-outline-light' disabled={!formik.isValid}  type='submit'>Reset</button> 
      </div>
      <div className='d-flex justify-content-center mt-2 '>
        <Link to='/login' className={`${style.ForgetPasswordLogin} btn`}  disabled={!formik.isValid}  type='submit'>LogIn</Link> 
      </div>
      </div>
      
    </form>
    </div>
  )
}
