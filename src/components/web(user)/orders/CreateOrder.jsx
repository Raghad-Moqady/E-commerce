import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartFeatures'
import Loading from '../../pages/loader/Loading.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import { CreateorderSchema } from '../../authentication/validation/validate.js';
import Input from '../../authentication/Input.jsx';
import { SuccessToast } from '../../pages/toast/toast.js';
import { CircularProgress } from '@mui/material';
import Title from '../../pages/title/Title.jsx';

export default function CreateOrder() {
 
const {CartData,cartDataLoading,productCount}=useContext(CartContext);

const token =localStorage.getItem("userToken");
const navigate=useNavigate();
const [loading,setLoading]=useState(false);

const initialValues ={
    couponName:'',
    address:'',
    phone:'',
}
const onSubmit=async values=>{
   try{
    setLoading(true);
    const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/order` ,
    values,
    {
      headers: 
     { Authorization :`Tariq__${token}`}
     }
    );  
    console.log(values);
    if(data.message=='success'){ 
      SuccessToast('Operation accomplished Successfully');
      setLoading(false);
     navigate('/profile/orders');
    }
   }
   catch(error){
    toast.error('Error');
    setLoading(false);
   }
}
const formik =useFormik({
  initialValues,
  onSubmit,
  validationSchema:CreateorderSchema
});
const inputs=[
{
  id:'couponName',//lable لربط الليبل مع الانبوت 
  type:'text',
  name:'couponName',
  title:'Coupon Name',
  value: formik.values.couponName,
},
{
  id:'address',//lable لربط الليبل مع الانبوت 
  type:'text',
  name:'address',
  title:'Address',
  value: formik.values.address,
},
{
  id:'phone',//lable لربط الليبل مع الانبوت 
  type:'text',
  name:'phone',
  title:'Phone',
  value: formik.values.phone,
}]
 
const renderInputs=inputs.map((input ,index)=>
<Input
   id={input.id}
   type={input.type}
   name={input.name}
   title={input.title}
   value={input.value} 
   errors={formik.errors} 
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}//لتتبع الحقول التي تمت زيارتها 
   touched={formik.touched}
   key={index}
/>
)

// if(cartDataLoading ){
//   return <Loading/>
// }

  return (
    <div className='container'>
      <Title title="Create Order"/>
       {productCount!=0?
      <>
       <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        {renderInputs} 
      </div>
      <div className="text-center"> 
       <button type="submit" className="btn bg-success-subtle w-50 rounded-5 "  disabled={!formik.isValid}>
         {loading?<CircularProgress color="inherit" size={20} />:
        "Submit"
      }
        </button>
       </div>
      </form>
      <Title title="Your Cart"/>
  <table className="table mt-3 ">
  <thead>
    <tr className='text-center'> 
      <th scope="col">Products</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Edit</th> 
    </tr>
  </thead>
  <tbody>
  {CartData?CartData.products.map((product )=>
      <tr key={product._id} className=' text-center'> 
      <td  style={{width:'8rem' }}>
        <img src={product.details.mainImage.secure_url } className="card-img-top  " alt='productImage' />
        </td> 
      <td  style={{width:'15rem'}}>{product.details.name}</td>
      <td >{product.quantity}</td> 
      <td ><Link to='/cart'><button className='btn btn-outline-danger ps-4 pe-4'>Edit</button></Link> </td>
    </tr>
    )  
    :<Loading/>}
  </tbody>
 
  </table> 
      </>
      :<p className='text-center mt-5'>You Haven't Shopped Yet!</p>} 
    </div>
  )
}
