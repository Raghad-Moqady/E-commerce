import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import style from './Profile.module.css'
import Loading from '../../pages/loader/Loading'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Profile() {
  let {userData,loading,setUserData,setUserToken}=useContext(UserContext);
  let navigate=useNavigate();
  
  const logout=()=>{  
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    navigate('/'); 
  } 

  if(loading){
    return <Loading/>
  }
   return (
    //  <div className="container mt-4">
    //    <h2 >Profile </h2><hr></hr> 
    //    <div className='d-flex gap-3 pb-3' >
    //     <img src={userData.image.secure_url} alt="profile-Img" style={{width:'8rem', height:'8rem', borderRadius: '50%'}}/> 
    //    <div className=' d-flex align-items-center'>
    //     <p style={{margin: 0, fontSize: 'x-large'}}>{userData.userName}</p>
    //    </div>
    //    </div> 
    //    <h2 >UserName</h2><hr></hr>
    //    <div className='pb-3'>
    //     {userData&&<p style={{margin: 0, fontSize: 'large'}}>{userData.userName}</p>} 
    //    </div>
    //    <h2 >Email Address</h2><hr></hr>
    //    <div className='pb-3'>
    //     {userData&&<p style={{margin: 0, fontSize: 'large'}}>{userData.email}</p>} 
    //    </div>
    //    <h2 >Account Details</h2><hr></hr>
    //    <div className='pb-3'>
    //     <p style={{margin: 0, fontSize: 'large'}}><b>Created At:</b> {userData.createdAt}<br></br><b>Updated At:</b> {userData.updatedAt}<br></br><b>Password Changed At:</b> {userData.changePasswordTime}</p>
    //    </div>
    //  </div>
    // <div className="profile d-flex gap-3">
    //   <div className='profileLinks'>
    //    <Link>Information</Link>
    //    <Link></Link>
    //   </div>
    //   <div className='ShowProfileInfo'>

    //   </div>
    // </div>
    <div className="container-fluid">
    <div className="row flex-nowrap">
      <div className="col-auto col-md-5 col-xl-2 px-sm-2 px-0 bg-black">
        <div className={`${style.leftSide} d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white `}>
          <Link to='/profile' className="d-flex gap-3 align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
           <img src={userData.image.secure_url} alt="profile-Img" style={{width:'4rem', height:'4rem', borderRadius: '50%'}}/> 
           <span className="fs-5 d-none d-sm-inline">Profile</span>
          </Link>
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" >
            <li className="nav-item">
              <Link to='/' className="nav-link align-middle px-0">
                <i className="fs-4 bi-house" /> <span className="ms-1 d-none d-sm-inline">Home</span>
              </Link>
            </li>   
            <li>
              <Link to='' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Information</span></Link>
            </li>
            <li>
              <Link to='contact' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Contact</span></Link>
            </li>
            <li>
              <Link to='orders' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Orders</span></Link>
            </li>
            <li>
              <Link to='accountDetails' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Account Details</span></Link>
            </li>
          </ul>
          <hr />
          <div className="dropdown pb-4">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
             <img src={userData.image.secure_url} alt="profile-Img" style={{width:'2rem', height:'2rem', borderRadius: '50%'}}/> 
              <span className="d-none d-sm-inline mx-1">{userData.userName}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><Link className="dropdown-item"  onClick={logout}>Sign out</Link></li>
            </ul>
          </div>
        </div>
      </div>
 
      <div className="col py-3">
      <Outlet/> 
      </div>
    </div>
  </div>
  )
}
