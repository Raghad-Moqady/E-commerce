import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loading from '../../pages/loader/Loading';
import Alert from '../../pages/alert/Alert';
import {Rating } from "@mui/material";
import style from './CategoriesDetails.module.css'
export default function CategoriesDetails() {
    const {categoryId}=useParams();
    
    const getProductsWithCategory=async()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
        return(data?.products);
    }
    const {data,isLoading}= useQuery('categoryDetails',getProductsWithCategory);

    if(isLoading){
       return <Loading/>
    }
  return (
    <div className='container mt-4 mb-4'>
     <div className='row row-gap-4 justify-content-center'>
        {data?.length?data?.map((product)=>
        // name,avgRating
          <div className='col-lg-3' key={product._id}>
           <div className="card overflow-hidden rounded-5 h-100">
               <img src={product.mainImage.secure_url} className={`${style.productImg} card-img-top rounded-5`} alt="product-img" />
               <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  {/* <p className="card-text">{product.description}</p> */}
                  {/* <p>{product.price}$</p> */}
                  <div>
                  <Rating name={`rating-${product._id}`} value={product.avgRating}  readOnly  precision={0.1}/>
                  </div> 
                  <Link to={`/product/${product._id}`} className={`btn rounded-5  mt-2 ${style.moreDetailsBtn}`}>Show More Details</Link>
                </div>
          </div>
        </div>
        ):<Alert message='No Products'/>}
        
     </div>
    </div>
  )
}
