import React, { useContext } from 'react'
import WebLayout from '../layouts/WebLayout.jsx';
import Home from '../components/web(user)/home/Home.jsx';
import Categories from '../components/web(user)/categories/Categories.jsx';
import Products from '../components/web(user)/products/Products.jsx';
import Register from '../components/web(user)/register/Register.jsx';
import Login from '../components/web(user)/login/Login.jsx';
import CategoriesDetails from '../components/web(user)/categories/CategoriesDetails.jsx';
import Product from '../components/web(user)/products/Product.jsx';
import Cart from '../components/web(user)/cart/Cart.jsx';
import SendCode from '../components/web(user)/sendCode/SendCode.jsx';
import ForgetPassword from '../components/web(user)/forgetPassword/ForgetPassword.jsx';
import Profile from '../components/web(user)/profile/Profile.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import DashboardHome from '../components/dashboard(admin)/Home.jsx';
import DashboardCategories from '../components/dashboard(admin)/Categories.jsx';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/web(user)/protectedRoute/ProtectedRoute.jsx';
import Loading from '../components/web(user)/Loading.jsx';
import Auth from '../components/web(user)/authRouts/Auth.jsx';

 

export const router = createBrowserRouter([
  {
    path :'/',
    element : <WebLayout />,
    children :[
      {
      // path :'/',
        index:true,
        element :<Home/>
      },
      {
        path:'categories',
        element :<Categories/>
      },
      {
        path:'products',
        element:<Products/>
      },
      {
      path:'register',
      element:<Register/>
      },
      {
        path:'login',
        element: 
        <Auth>
           <Login/>
        </Auth>
      },
      {
        path:'products/category/:categoryId',
        element:<CategoriesDetails/>
      },
      {
        path:'product/:productId',
        element:<Product/>
      },
      {
        path:'cart',
        element:
        <ProtectedRoute>
            <Cart/>
        </ProtectedRoute>
      },
      {
        path:'sendCode',
        element:<SendCode/>
      },
      {
        path:'forgetPassword',
        element:<ForgetPassword/>
      },
      {
        path:'profile',
        element:
        <ProtectedRoute>
           <Profile/>
        </ProtectedRoute>
      },
      {
        path :'*',
        element:<h2>404 Not Found</h2>
      }
  ]
  },
  {
  path :'/dashboard',
  element :<DashboardLayout/>,
  children:[
    {
      path:'home',
      element :<DashboardHome/>
    },
    {
      path:'categories',
      element :<DashboardCategories/>
    },
    {
      path:'*',
      element:<h2>404 Not Found</h2>
    }
  
  ]
  },
  ]);
