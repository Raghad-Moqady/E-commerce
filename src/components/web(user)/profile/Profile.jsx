import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function Profile() {
  let {userData}=useContext(UserContext)
   return (
     <div className='container mt-4'>
       <h2 >Profile </h2><hr></hr> 
       <div className='d-flex gap-3 pb-3' >
       {userData&&<img src={userData.image.secure_url} alt="profile-Img" style={{width:'8rem', height:'8rem', borderRadius: '50%'}}/>}
       <div className=' d-flex align-items-center'>
        {userData&&<p style={{margin: 0, fontSize: 'x-large'}}>{userData.userName}</p>}
       </div>
       </div> 
       <h2 >UserName</h2><hr></hr>
       <div className='pb-3'>
        {userData&&<p style={{margin: 0, fontSize: 'large'}}>{userData.userName}</p>} 
       </div>
       <h2 >Email Address</h2><hr></hr>
       <div className='pb-3'>
        {userData&&<p style={{margin: 0, fontSize: 'large'}}>{userData.email}</p>} 
       </div>
       <h2 >Account Details</h2><hr></hr>
       <div className='pb-3'>
        {userData&&<p style={{margin: 0, fontSize: 'large'}}><b>Created At:</b> {userData.createdAt}<br></br><b>Updated At:</b> {userData.updatedAt}<br></br><b>Password Changed At:</b> {userData.changePasswordTime}</p>} 
       </div>
     </div>
  )
}
