import React, { useEffect, useState } from 'react'
import Categories from '../categories/Categories'
import axios from 'axios';
import Loading from '../../pages/loader/Loading';
import style from './Products.module.css';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import Title from '../../pages/title/Title';
 
export default function Products() {
  const [data,setData]=useState(null);
  const [loading,setLoding]=useState(false); 
 

  const getAllProducts=async(page=1,limit=5)=>{
    setLoding(true);
    //&search=""
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`);
    setLoding(false);
    setData(data);
    console.log(data); 
  }
  const renderLI=()=>{
    let li=[];
    let size=(data&&(data?.total/data?.page));
    console.log(size);
    for(let i=1;i<=size;i++){
    li.push( <li key={i}  className="page-item"><a className="page-link" href="#" onClick={()=>{getAllProducts(i)}} >{i}</a></li> )
    }
    return li;
  }
  useEffect(()=>{
    getAllProducts(); 
  },[]) 
  
  return (
   <>
   <Categories/>
   {/* title */}
   <div className="container">
    <Title title="Products"/> 
   </div> 
{/* Get Products */}
   {loading? <Loading/>:<div className='container mt-5'>
    <div className="row  row-gap-5">
    {data?.products.length?data?.products.map((product)=>
      <div className='col-lg-2 m-auto' key={product._id}>
      <div className="card  rounded-5 ">
      <Link to={`/product/${product._id}`}>
          <img src={product.mainImage.secure_url} className={` card-img-top rounded-5 img-fluid`} alt="product-img" />
      </Link>
     </div>
   </div> 
    ) 
    :<Alert message='No Products'/>}  
    </div>
    <nav aria-label="Page navigation example " className=' d-flex justify-content-center mt-4'>
  <ul className="pagination">
    {/* <li className="page-item"  >
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </a>
    </li> */}
     {renderLI()} 
    {/* <li className="page-item" >
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">»</span>
      </a>
    </li> */}
  </ul>
    </nav> 
   </div>
  }
   </>
  )
}
