import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading';
import { CartContext } from '../context/CartFeatures';

export default function Product() {
  const token=localStorage.getItem('userToken');
  const navigate=useNavigate();
  const {addToCartContext}=useContext(CartContext);

  const addToCart=async(productId)=>{
   const response=await addToCartContext(productId); 
    navigate('/cart') ;  
  }
   
  const changeImg=(subSrc)=>{
    mainImg.setAttribute("src",subSrc);
  }
   const {productId}=useParams();

   const getProduct=async()=>{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
    return(data.product);
   }
   const{data,isLoading}=useQuery('productInfo',getProduct);
   if(isLoading){
    return<Loading/>
   }
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-lg-7 d-flex column-gap-5">
              <div className="col-lg-2">
              {data.subImages.map((image,index)=>
              <div className='mb-2' key={index}>
                  <img onClick={()=>changeImg(image.secure_url)} src={image.secure_url} alt="additional_images_about_this_product" className='img-fluid'/>
              </div>
               )}
              </div> 
               <div className="col-lg-6 d-flex justify-content-center align-items-center">
                 <img src={data.mainImage.secure_url } alt="main_img" className='w-100 ' id='mainImg' />
               </div>
            </div>
            <div className="col-lg-5 d-flex justify-content-center align-items-center ">
              <div >
                 <h3>{data.name}</h3>
                <h4>Price: <label className='text-decoration-line-through text-danger'>{data.price}$</label> </h4>
                <h4> Final Price: <label className='text-success' >{data.finalPrice}$</label> </h4>
                <p>{data.description}</p>
                <button className='btn btn-outline-success' onClick={()=>token?addToCart(data._id):navigate('/register')}  >Add To Catr</button>
              </div>
            </div>
        </div>
    </div>
  )
}
