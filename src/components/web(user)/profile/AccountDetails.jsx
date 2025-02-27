import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

export default function AccountDetails() {
  let {userData }=useContext(UserContext);

  return (
    <>
      <h2 >Account Details</h2><hr></hr>
      <div className='pb-3'>
      <p style={{margin: 0, fontSize: 'large'}}><b>Created At:</b> {userData.createdAt}<br></br><b>Updated At:</b> {userData.updatedAt}<br></br></p>
      </div>
    </>
  )
}
