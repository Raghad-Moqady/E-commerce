import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartFeatures';
import Loading from '../../pages/loader/Loading.jsx'
import { UserContext } from '../context/UserContext.jsx';
import style from './Navbar.module.css';

export default function Navbar() {
  const {productCount}=useContext(CartContext);
  let {userToken,setUserToken,userData,setUserData,loading}=useContext(UserContext);
  let navigate=useNavigate();
  
  const logout=()=>{  
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    navigate('/'); 
  } 
  // if(userData==null && userToken!=null){
  //   return<Loading/>
  // }
  if(loading && userToken!=null){
    return<Loading/>
  }
  return ( 
    <nav className={`${style.navbar} navbar navbar-expand-lg`}>
      
      <div className="container">
      <a className="navbar-brand" href="#" style={{paddingTop: 0}}>
        <p className='m-0'>Raghad Store</p>
     {/* <img src='C:\Users\HP\Desktop\fullStack\FrontEnd\React\all\ecommerce\src\components\img/logo.png'></img>*/}
      </a>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto">
         
          <li className="nav-item ">
            <Link className="nav-link" to="/">Home</Link>
          </li>
 
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>


          <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        {userToken? <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart <label className='bg-success-subtle px-2'>{productCount}</label> </Link>
        </li>:null}
        
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         {userData!=null?
         <img src= {userData.image.secure_url} alt="userImage" style={{width:'2rem', height: '2rem', borderRadius: '50%', marginRight: '5%'}} />
          :''}
          {userData!=null?userData.userName:'Welcome'}
        </a>
        <ul className="dropdown-menu ">
          {userToken==null?
           <>
          <li><Link className="dropdown-item" to="/register">register</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" to="/login">login</Link></li>
           </>
          :
          <>
          <li><Link className="dropdown-item" to="/profile">profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>
          </>
          }
        </ul>
      </li>
        </ul>
     
      </div>
    </div>
  </nav>

  )
}
