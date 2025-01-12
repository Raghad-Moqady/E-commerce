import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartFeatures'
import Loading from '../Loading.jsx'
import { Link, useNavigate } from 'react-router-dom';
import InputCreatOrder from '../../pages/InputCreatOrder.jsx';
import { useFormik } from 'formik';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import { CreateorderSchema } from '../validation/validate.js';

export default function CreateOrder() {
 
const {CartData,cartDataLoading,productCount}=useContext(CartContext);

const token =localStorage.getItem("userToken");
const navigate=useNavigate();
const initialValues ={
    couponName:'',
    address:'',
    phone:'',
}
const onSubmit=async values=>{
   try{
    const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/order` ,
    values,
    {
      headers: 
     { Authorization :`Tariq__${token}`}
     }
    );  
    console.log(values);
    if(data.message=='success'){ 
      toast.success('Operation accomplished Successfully', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
     navigate('/profile/orders');
    }
   }
   catch(error){
    toast.error('Error');
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
<InputCreatOrder
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

if(cartDataLoading ){
  return <Loading/>
}

  return (
    <div className='container'>
      <h1 className='text-center'>Create Order</h1>
      {productCount!=0?
      <>
       <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        {renderInputs} 
      </div>
       <button type="submit" className="btn btn-primary"  disabled={!formik.isValid}>Submit</button>
      </form>
      <h2 className='text-center'>Your Cart</h2>
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
