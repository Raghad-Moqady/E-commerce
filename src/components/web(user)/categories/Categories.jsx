import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import Loading from '../../pages/loader/Loading';
import Alert from '../../pages/alert/Alert';
import style from './categories.module.css'
import Title from '../../pages/title/Title';

export default function Categories() {
   const getCategories=async()=>{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=10`);
    return(data);
   }

   const {data,isLoading}=useQuery('web_categories',getCategories);
  
   if(isLoading){
   return <Loading/>
   }
   return (
     <div className='container mt-4'>
      <Title title="Categories"/>
      <Swiper
      modules={[Navigation, Pagination ,Autoplay ]}
      spaceBetween={100}
      slidesPerView={4.5}
      navigation
      loop={true}
      autoplay={{
        delay:2000
      }}
      // pagination={{
      //    clickable: true ,
      // }} 
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
     
    >
     {data?.categories.length ? data?.categories.map((category)=>
              <SwiperSlide key={category._id}>   
                <Link className='w-25' to={`/products/category/${category._id}`}>{/* هون بنكتب المسار اللي بدنا اياه مش شرط يكون متل الباكإند بس اهم اشي ابعت فيه الآي دي عشان بلزمني فيما بعد برابط الباكإند*/}
                 <img className='w-100' src={category.image.secure_url} alt="category_img" />
                </Link> 
              </SwiperSlide>
      ):<Alert message='Categories Not Found'/>}
       </Swiper>   
      {/* <div className='swiper-custom-pagination'></div> */}
     </div>  
   )
}
