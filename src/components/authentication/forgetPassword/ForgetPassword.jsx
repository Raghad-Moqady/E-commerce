import React, { useState } from 'react'
import { useFormik } from 'formik'
import Input from '../Input.jsx'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SuccessToast } from '../../pages/toast/toast.js';
import { forgetPasswordSchema } from '../validation/validate.js';
import forgetPassword from '../../img/forgetPassword.jpg';
import SharedForm from '../sharedForm/SharedForm.jsx';

export default function ForgetPassword() {
    const initialValues={
        email:'',
        password:'',
        code:''
    }
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const onSubmit= async values=>{
      setLoading(true);
         const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,values);
       setLoading(false); 

         if(data?.message=='success'){ 
          SuccessToast('Your password has been changed successfully');
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
    <SharedForm
       title='Reset Password'
       formik_handelSubmit={formik.handleSubmit}
       renderInputs={renderInputs}
       secondaryAction='LogIn'
       mainAction='Reset'
       formik_isValid={formik.isValid}
       secondaryAction_targetComponent={"/login"}
       loading={loading}
       image={forgetPassword}
       encType=''
     /> 
    
  )
}
