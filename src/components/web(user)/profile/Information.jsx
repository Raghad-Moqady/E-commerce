import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

export default function Information() {
  let {userData }=useContext(UserContext);
  return (
    <div className='d-flex gap-3 pb-3' >
        <img src={userData.image.secure_url} alt="profile-Img" style={{width:'12rem', height:'12rem' }}/> 
        <div className=' d-flex align-items-center'>
        <p style={{margin: 0, fontSize: 'x-large'}}>{userData.userName}</p>
        </div>
    </div>
  )
}
