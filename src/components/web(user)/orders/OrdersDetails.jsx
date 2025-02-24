import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartFeatures'
import Loading from '../../pages/loader/Loading';
import { date } from 'yup';

export default function OrdersDetails() {
  let {token}=useContext(CartContext);
  let [orderLoading,setOrderLoading]=useState(false);
   let[orders,setOrders]=useState([]);
  const getOrderDetails=async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,
    { 
      headers: 
      { Authorization :`Tariq__${token}`}
    }
    )
    setOrderLoading(false); 
    console.log(data.orders);
    setOrders(data.orders);
  }
  useEffect(()=>{
    setOrderLoading(true);
    getOrderDetails();
  },[])
  if(orderLoading){
    return <Loading/>
  }
  return (
    <>
    <h2 className='text-center'>Orders</h2>
     <table className="table table-striped">
  <thead>
    <tr className=' text-center'>
      <th scope="col">#</th>
      <th scope="col">Coupon Name</th>
      <th scope="col">Address</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Price</th>
      <th scope="col">Payment Type</th> 
      <th scope="col">Created At</th>
      <th scope="col">status</th> 
    </tr>
  </thead>
  <tbody>
    {orders&& orders.map((order,index)=>
    <tr key={order._id} className=' text-center'>
      <th scope="row">{index+1}</th>
      <td>{order.couponName?order.couponName:'____'}</td>
      <td>{order.address}</td>
      <td>{order.phoneNumber}</td>
      <td>{order.finalPrice}$</td>
      <td>{order.paymentType}</td>
      <td>{order.createdAt }</td>
      <td>{order.status}</td> 
    </tr> 
    )}
   
  </tbody>
</table>
    </>
   
  ) 
}
