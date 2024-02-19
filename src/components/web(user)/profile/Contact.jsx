import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

export default function Contact() {
  let {userData }=useContext(UserContext);

  return (
    <>
    <h2 >Email Address</h2><hr></hr>
    <div className='pb-3'>
    {userData&&<p style={{margin: 0, fontSize: 'large'}}>{userData.email}</p>} 
    </div>
    </>
  )
}
