import React, { useEffect, useState } from 'react'
import Input from '../Input.jsx'
import { useFormik } from 'formik' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react' 
import loginImg from '../../img/LoginPhoto.jpg'
import SharedForm from '../sharedForm/SharedForm.jsx'
import { SuccessToast } from '../../pages/toast/toast.js'
import { UserContext } from '../../web(user)/context/UserContext.jsx'
import { loginSchema } from '../validation/validate.js'

export default function Login() { 
  let { setUserToken }=useContext(UserContext);
  const [loading,setLoading]=useState(false);
  const navigate =useNavigate();
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         email:'',
         password:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
    setLoading(true);
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,values);
    setLoading(false);
    if(data?.message=='success'){//الباك اند رح يرجع token 
     localStorage.setItem("userToken",data?.token);
     setUserToken(data?.token);//بدل الداتا ديكريبشن اللي كان وجود بالآب 
      SuccessToast("The login process was completed successfully");
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
    <SharedForm
    title='Login'
    formik_handelSubmit={formik.handleSubmit}
    renderInputs={renderInputs}
    secondaryAction='Forgot Password?'
    secondaryAction_targetComponent={"/sendCode"}
    mainAction='Login'
    formik_isValid={formik.isValid} 
    loading={loading}
    image={loginImg}
    encType=''
   />  
    </>
  )
}