import React from 'react'

export default function Input({type='text',id,name,title,value ,onChange,errors,onBlur,touched}) {//Props:destructing==> const{name,type}=props
 //السطر 10 يعني ازا انا كنت عاملة زيارة لهاد الانبوت ومع هيك ضل في اخطاء اظهرلي اياها 
  return (
    <>
    <div className="input-group mb-3 w-100">
         <label htmlFor={id} >{title}</label>
         <input type={type} className="form-control me-5 ms-5 rounded-3 shadow-none border-0 " name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
         {touched[name]&&errors[name]&&<p className='text text-danger w-100'>{errors[name]}</p>} 
    </div>
    </>
  )
}
