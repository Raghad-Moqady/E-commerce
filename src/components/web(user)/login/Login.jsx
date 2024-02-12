import React, { useEffect } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik'
import { loginSchema } from '../validation/validate.js'
import axios from 'axios'
import {toast} from 'react-toastify';
import style from '../Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
 import Loading from '../Loading.jsx'
 
 

export default function Login() { 
  let { setUserToken }=useContext(UserContext);
  const navigate =useNavigate();
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         email:'',
         password:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
 
    const {data}= await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,values);
   

    if(data.message=='success'){//الباك اند رح يرجع token 
     localStorage.setItem("userToken",data.token);
     setUserToken(data.token);//بدل الداتا ديكريبشن اللي كان وجود بالآب
     toast.success('Done', {  
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
      navigate('/');
    }
}
   
  const formik =useFormik({
      initialValues, 
      onSubmit,
      validationSchema:loginSchema
  });
 
   const inputs=[  
    {
      id:'Email',//lable لربط الليبل مع الانبوت 
      type:'email',
      name:'email',
      title:'Email',
      value: formik.values.email,
    },
    {
      id:'Password',//lable لربط الليبل مع الانبوت 
      type:'password',
      name :'password',
      title:'Password',
      value: formik.values.password,
    },
  ]

  const renderInputs= inputs.map((input,index)=>//array
  <Input
   id={input.id}
   type={input.type}
   name={input.name}
   title={input.title}
   value={input.value} 
   errors={formik.errors} 
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}//لتتبع الحقول التي تمت زيارتها 
   touched={formik.touched}//لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت 
   key={index} />
   )

  return (
    <>
    <div className={`container ${style.formDesign} p-3 mt-5 rounded-0`}>
    <h2 className='text-center mt-3 mb-4'>Login</h2>
    <form onSubmit={formik.handleSubmit} >
      <div className="container-fluid">
        {renderInputs}
        
      <div className='w-75 m-auto d-flex justify-content-end '>
        <Link className={` text-decoration-none ${style.LinkForget}`} to="/sendCode">Forgot Password?</Link>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button className='rounded-5 border-1 w-50 btn btn-outline-light  '  type='submit' disabled={!formik.isValid}>Login</button> 
      </div>
      </div>
      
    </form>
    </div>
    </>
  )
}