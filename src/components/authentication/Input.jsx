import React from 'react'
import style from './sharedForm/Auth.module.css'
export default function Input({type='text',id,name,title,value ,onChange,errors,onBlur,touched}) {//Props:destructing==> const{name,type}=props
 //السطر 10 يعني ازا انا كنت عاملة زيارة لهاد الانبوت ومع هيك ضل في اخطاء اظهرلي اياها 
  return (
    <>
    <div className={` mb-2 w-75 ${style.InputDesign}`}>
         <label htmlFor={id} className='pb-1' >{title}</label>
         <input placeholder={title} type={type} className="form-control rounded-5 shadow-none " name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
         {touched[name]&&errors[name]&&<p className='text text-danger w-100'>{errors[name]}</p>} 
    </div>
    </>
  )
}
