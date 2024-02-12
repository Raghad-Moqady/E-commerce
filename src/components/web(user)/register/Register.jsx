import React from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import { validationSchema } from '../validation/validate'
import axios from 'axios'
import {toast} from 'react-toastify';
import style from '../Auth.module.css'
import { Link } from 'react-router-dom'

export default function Register() {
  
  const handleFieldChange=(event)=>{
      formik.setFieldValue('image',event.target.files[0]);
  }
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         userName:'',
         email:'',
         password:'',
         image:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit=async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
 
    const formData = new FormData();
    formData.append("userName",values.userName);
    formData.append("email",values.email);
    formData.append("password",values.password);
    formData.append("image",values.image);
    
    const {data}= await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData);
    if(data.message=='success'){
     formik.resetForm();
     toast.success('account created successfully, please verify your email to login', {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
}
 
  const formik =useFormik({
      initialValues, 
      onSubmit,
      validationSchema
  });
 
  const inputs=[  
    {
      id:'User Name',//lable لربط الليبل مع الانبوت 
      type:'text',
      name:'userName',//بنكتبهم متل اسماء المتغيرات الي جاي من البلاك اند  
                      //وعشان نحط فيهم البيانات اللي رح تيجي من اليوزر ونبعتها للباك اند
      title:'Name'   ,   
      value:formik.values.userName,      
    },
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
    {
      id:'Image',//lable لربط الليبل مع الانبوت 
      type:'file',
      name :'image',
      title:'Image',
      onChange:handleFieldChange,
    }  
  ]

  const renderInputs= inputs.map((input,index)=>//array
  <Input
   id={input.id}
   type={input.type}
   name={input.name}
   title={input.title}
   value={input.value} 
   errors={formik.errors} 
   onChange={input.onChange ||formik.handleChange}
   onBlur={formik.handleBlur}//لتتبع الحقول التي تمت زيارتها 
   touched={formik.touched}//لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت 
   key={index} />
   )
  return (
    <>
    <div className={`container ${style.formDesign} p-3 mt-5 rounded-0 `}>
    <h2 className='text-center mt-3 mb-4'>Create Account</h2>
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" >
      <div className="container">
          {renderInputs}
      <div className='w-75 m-auto d-flex justify-content-end '>
        <Link className={` text-decoration-none ${style.logIn}`} to="/logIn">LogIn</Link>
      </div>
      <div className='d-flex justify-content-center mt-3'>
         <button className='rounded-5 border-1 w-50 btn btn-outline-light  ' type='submit' disabled={!formik.isValid}>Register</button> 
      </div>
      </div>
    
    </form>
    </div>
    </>
  )
}
