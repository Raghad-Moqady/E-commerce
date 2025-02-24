import React, { useEffect, useState } from 'react'
import Categories from '../categories/Categories'
import axios from 'axios';
import Loading from '../../pages/loader/Loading';
import style from './Products.module.css';
import { Link } from 'react-router-dom';

export default function Products() {
  const [data,setData]=useState(null);
  const [loading,setLoding]=useState(false); 
  const getAllProduct=async(page=1,limit=4)=>{
    setLoding(true);
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`);
    setLoding(false);
    setData(data);
    console.log(data); 
  }
  const renderLI=()=>{
    let li=[];
    let size=(data&&(data.total/data.page));
    console.log(size);
    for(let i=1;i<=size;i++){
    li.push( <li key={i}  className="page-item"><a className="page-link" href="#" onClick={()=>{getAllProduct(i)}} >{i}</a></li> )
    }
    return li;
  }
  useEffect(()=>{
    getAllProduct(); 
  },[])
  if(loading){
    return <Loading/>
  }
  return (
   <>
   <Categories/>
   <div className='container mt-5'>
    <div className="row  row-gap-5">
    {data?.products.length?data.products.map((product,index)=>
     <div className="col-md-3 " key={index}>
       <div className={`${style.productImg} h-100 `} >
           <Link to='/'>
           <img src={product.mainImage.secure_url} className="card-img-top img-fluid" style={{height:'100%'}} alt="product-img" />
           </Link>
       </div> 
       <div></div>
     </div> 
    ) 
    :'No Products Found'}  
    </div>
    <nav aria-label="Page navigation example " className=' d-flex justify-content-center mt-4'>
  <ul className="pagination">
    <li className="page-item"  >
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </a>
    </li>
     {renderLI()} 
    <li className="page-item" >
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">»</span>
      </a>
    </li>
  </ul>
    </nav> 
   </div>
  
   </>
  )
}
