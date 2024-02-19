import React from 'react'
 
export default function InputCreatOrder({id,type='text',name,title,value,errors,onChange,onBlur,touched}) {
  return (
    <>
    <div className={` mb-2 `}>
         <label htmlFor={id} className='pb-1' >{title}</label>
         <input placeholder={title} type={type} className="form-control rounded-0 shadow-none border-0 " name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
         {touched[name]&&errors[name]&&<p className='text text-danger w-100'>{errors[name]}</p>} 
    </div>
    </>
  )
}
