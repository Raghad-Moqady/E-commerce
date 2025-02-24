import React from 'react'
import Loading from '../../pages/loader/Loading'
import style from './Auth.module.css'
import { Link } from 'react-router-dom'
import { CircularProgress } from "@mui/material";

export default function SharedForm({title,formik_handelSubmit,renderInputs,secondaryAction,secondaryAction_targetComponent, mainAction,formik_isValid,loading,image,encType}) {
  return (
  <> 
    {/*encType="multipart/form-data">>>
      بالعادة الفورم لما يبعت البيانات بشفرها بطريقة معينة لا تتناسب مع الملفات عشان هيك لازم نضيف هاي الجملة 
    */}
  <div className={`p-3 mt-5 ${style.mainPage}`}>
      <div className="row justify-content-center">
      <div className="col-md-6"> 
      <form className=' mt-3' onSubmit={formik_handelSubmit} encType={encType} >
      <h2 className={`${style.mainTitle} text-center mb-4`}>{title}</h2>
      <div className="container-fluid">
        {renderInputs} 
        {secondaryAction&&(
          <div className='w-75 m-auto d-flex justify-content-end '>
        <Link className={` text-decoration-none ${style.LinkForget}`} to={secondaryAction_targetComponent}>{secondaryAction}</Link>
      </div>
        )}
      <div className='d-flex justify-content-center mt-3'>
        <button className={`${style.mainButton} rounded-5  w-50 btn`}  type='submit' disabled={!formik_isValid || loading}>
        {loading?<CircularProgress color="inherit" size={20} />: mainAction}
          </button> 
      </div>
      </div> 
      </form>
      </div>
       <div className="w-25 col-md-6">
         <img src={image} alt="" className="w-100" />
       </div>
      
      </div>
  
    </div>
  </>
  )
}
