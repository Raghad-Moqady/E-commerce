// import axios from 'axios';
// import React, { useContext } from 'react'
// import { useQuery } from 'react-query';
// import { useNavigate, useParams } from 'react-router-dom'
// import Loading from '../../pages/loader/Loading';
// import { CartContext } from '../context/CartFeatures';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination,Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import Alert from '../../pages/alert/Alert';

// export default function Product() {
//   const token=localStorage.getItem('userToken');/*???? لي ما اجيبها من الكونتكست*/
//   const navigate=useNavigate();
//   const {addToCartContext ,setCartDataLOading}=useContext(CartContext);

//   const addToCart=async(productId)=>{
//    const response=await addToCartContext(productId); 
//     setCartDataLOading(true);
//     navigate('/cart') ;  
//   }
   
//   const changeImg=(subSrc)=>{
//     mainImg.setAttribute("src",subSrc);
//   }
  
//    const {productId}=useParams();

//    const getProduct=async()=>{
//     const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
//     return(data?.product);
//    }
//    const{data,isLoading}=useQuery('productInfo',getProduct);
//    if(isLoading){
//     return<Loading/>
//    }
//   return (
   
//     // <div className="container mt-5">
//     //     <div className="row">
//     //         <div className="col-lg-7 d-flex column-gap-5">
//     //           <div className="col-lg-2">
//     //           {data.subImages.map((image,index)=>
//     //           <div className='mb-2' key={index}>
//     //               <img onClick={()=>changeImg(image.secure_url)} src={image.secure_url} alt="additional_images_about_this_product" className='img-fluid'/>
//     //           </div>
//     //            )}
//     //           </div> 
//     //            <div className="col-lg-6 d-flex justify-content-center align-items-center">
//     //              <img src={data.mainImage.secure_url } alt="main_img" className='w-100 ' id='mainImg' />
//     //            </div>
//     //         </div>
//     //         <div className="col-lg-5 d-flex justify-content-center align-items-center ">
//     //           <div >
//     //              <h3>{data.name}</h3>
//     //             <h4>Price: <label className='text-decoration-line-through text-danger'>{data.price}$</label> </h4>
//     //             <h4> Final Price: <label className='text-success' >{data.finalPrice}$</label> </h4>
//     //             <p>{data.description}</p>
//     //             <button className='btn btn-outline-success' onClick={()=>token?addToCart(data._id):navigate('/register')} >Add To Catr</button>
//     //           </div>
//     //         </div>
//     //     </div>
//     // </div>
  
//     <div className="container mt-5">
//         <Swiper
//       modules={[Navigation, Pagination ,Autoplay ]}
//       spaceBetween={100}
//       slidesPerView={4.5}
//       navigation
//       loop={true}
//       autoplay={{
//         delay:2000
//       }}
//       pagination={{
//          clickable: true ,
//       }} 
      
//     >
//          <SwiperSlide>   
//          <img src={data.mainImage.secure_url } alt="main_img" className='w-100 ' id='mainImg' />
//          </SwiperSlide>
//      {data.subImages.map((image,index)=>
//               <SwiperSlide key={index}>   
//                   <img onClick={()=>changeImg(image.secure_url)} src={image.secure_url} alt="additional_images_about_this_product" className='img-fluid'/>
//              </SwiperSlide>
//       ):<Alert message='Categories Not Found'/>}
//        </Swiper>   
          
              


//             <div className="  d-flex justify-content-center align-items-center ">
//               <div >
//                  <h3>{data.name}</h3>
//                 <h4>Price: <label className='text-decoration-line-through text-danger'>{data.price}$</label> </h4>
//                 <h4> Final Price: <label className='text-success' >{data.finalPrice}$</label> </h4>
//                 <p>{data.description}</p>
//                 <button className='btn btn-outline-success' onClick={()=>token?addToCart(data._id):navigate('/register')} >Add To Catr</button>
//               </div>
//             </div>
      
//     </div>
//   )
// }
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../pages/loader/Loading';
import { CartContext } from '../context/CartFeatures';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Alert from '../../pages/alert/Alert';
import {Avatar, Rating } from "@mui/material";
import style from './Product.module.css'
import { UserContext } from '../context/UserContext';
import CreateReview from '../reviews/createReview/CreateReview';

export default function Product() {
  const { addToCartContext, setCartDataLOading } = useContext(CartContext); 
  const { userToken } = useContext(UserContext); 
  const navigate = useNavigate();
  const { productId } = useParams();
  const token = localStorage.getItem('userToken'); // Consider retrieving from context if available
  
  // State for the main image
  const [mainImg, setMainImg] = useState('');

  const addToCart = async (productId) => {
    await addToCartContext(productId);
    // setCartDataLOading(true);
    navigate('/cart');
  };

  const changeImg = (subSrc) => {
    setMainImg(subSrc);
  };

  // Fetch product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
      return data?.product; 

    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  };

  const { data, isLoading, error } = useQuery('productInfo' , getProduct);
  console.log(data);
  if (isLoading) return <Loading />;
  if (error) return <Alert message="Failed to load product data" />;

  return (
    <div className="container ">
      <div className='mb-5 pt-5'>
        <div className=''>
        <h3>{data?.name}</h3>
          {data?.price != data?.finalPrice ?
          (
            <>
           <h4>
            Price: <span className="text-decoration-line-through text-danger">{data?.price}$</span>
          </h4>
          <h4>
            Final Price: <span className="text-success">{data?.finalPrice}$</span>
          </h4>
            </> 
          )
          :  
          <h4>
          Final Price: <span className="text-success">{data?.finalPrice}$</span>
          </h4>}
          <button
            className={`${style.btn} btn`}
            onClick={() => (token ? addToCart(data?._id) : navigate('/register'))}
          >
            Add To Cart
          </button>
        </div>
      <div className='w-25 m-auto pb-5'>
      <img
            src={mainImg||data.mainImage.secure_url}
            alt="Main product"
            className="w-100"
          />
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={1}
        slidesPerView={3}
        navigation 
       >  
         <SwiperSlide >
              <div className='w-25 m-auto'>
              <img
                onClick={() => changeImg(data?.mainImage.secure_url)}
                src={data.mainImage.secure_url}
                alt="Additional product view"
                className="img-fluid w-75"
              />
              </div> 
            </SwiperSlide>
        {data?.subImages?.length > 0 ? (
          data.subImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='w-25 m-auto'>
              <img
                onClick={() => changeImg(image.secure_url)}
                src={image.secure_url}
                alt="Additional product view"
                className="img-fluid w-75"
              />
              </div> 
            </SwiperSlide>
          ))
        ) : (
          <Alert message="No additional images available" />
        )}
      </Swiper> 
      </div>
      
      <div className=" mt-4">
        <div>
        <h4>Description:  </h4> 
          <p>{data?.description}</p>
        <h4>Feedbacks: </h4>  
        {data?.reviews.length?data?.reviews.map((review,index)=>
          <div className='mb-3' key={index}>
          <div className='d-flex mb-1'>
          <Avatar>{review.createdBy.userName.charAt(0)}</Avatar>
          <h5 className='ms-2 mt-1'>{ review.createdBy.userName}</h5>
          </div>
          <div className='d-flex'>
          <div className=' bg-body-secondary py-2 px-2 w-100 rounded-2 me-2'> {review.comment} </div>
          <Rating className='mt-1' name={`rating-${index}`} value={review.rating}  readOnly  precision={0.1}/>
          </div>
          </div>
      ):<Alert message='There are no comments yet'/>} 
       {/* فقط يسمح باضافة تعليق اذا كان مسجل دخوله + المنتج واصل للمستخدم  */}
        {userToken && 
        <>
          <hr />
          <CreateReview/>
        </> 
        }
        </div>
      </div>
    </div>
  );
}
