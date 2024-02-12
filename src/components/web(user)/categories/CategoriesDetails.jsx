import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading';

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
    <div className='container mt-4'>
     <div className='row'>
        {data.length?data.map((product)=>
          <div className='col-lg-4' key={product._id}>
           <div className="card" style={{width: '18rem'}}>
               <img src={product.mainImage.secure_url} className="card-img-top" alt="product-img" />
               <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p>{product.price}$</p>
                  <Link to={`/product/${product._id}`} className="btn btn-primary">More Details</Link>
                </div>
          </div>
        </div>
        ):'No products'}
        
     </div>
    </div>
  )
}
