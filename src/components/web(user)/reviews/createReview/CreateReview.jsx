 
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useFormik } from 'formik';
import { CircularProgress, Rating } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ErrorToast, SuccessToast } from '../../../pages/toast/toast.js';
  
export default function CreateReview() { 
  let { userToken }=useContext(UserContext);
  const [loading,setLoading]=useState(false);
 const { productId } = useParams();
  const navigate = useNavigate();
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         comment:'',
         rating: 0,
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
    setLoading(true);
    try{
        const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,values,
            { headers: {Authorization:`Tariq__${userToken}`} }
        );
        setLoading(false);
        console.log(data);
        if(data?.message=='success'){//الباك اند رح يرجع token 
        SuccessToast("Done"); 
        formik.resetForm();
       }
    }catch(error){
        if (error.response) {
            ErrorToast(error.response.data.message);  
         }
         setLoading(false);
         formik.resetForm();
    }
  
}
   
  const formik =useFormik({
      initialValues, 
      onSubmit, 
  });
   

  return (
    <>
    <form onSubmit={formik.handleSubmit} className='mb-5'>
          <div className=" d-flex">
            <input placeholder='Add Comment' type="text" className="form-control rounded-5 shadow-none w-100 " id='comment' name="comment"    value={formik.values.comment}  onChange={formik.handleChange}/>
            <button type="submit" className="btn bg-success-subtle rounded-5 " hover  disabled={!formik.isValid}>
             {loading?<CircularProgress color="inherit" size={20} />:
             "send"
          }
            </button>
          </div>
            <span className=''>Rating</span>
                <Rating
                dir="ltr"
                name="rating"
                value={formik.values.rating}
                precision={1}
                onChange={(event, newValue) => {
                   formik.setFieldValue('rating', newValue);
                }}
              />
          </form>
    </>
  )
}
