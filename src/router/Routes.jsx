import React, { useContext } from 'react'
import WebLayout from '../layouts/WebLayout.jsx';
import Home from '../components/web(user)/home/Home.jsx';
import Categories from '../components/web(user)/categories/Categories.jsx';
import Products from '../components/web(user)/products/Products.jsx';
import Register from '../components/authentication/register/Register.jsx';
import Login from '../components/authentication/login/Login.jsx';
import CategoriesDetails from '../components/web(user)/categories/CategoriesDetails.jsx';
import Product from '../components/web(user)/products/Product.jsx';
import Cart from '../components/web(user)/cart/Cart.jsx';
import SendCode from '../components/authentication/sendCode/SendCode.jsx';
import ForgetPassword from '../components/authentication/forgetPassword/ForgetPassword.jsx';
import Profile from '../components/web(user)/profile/Profile.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import DashboardHome from '../components/dashboard(admin)/Home.jsx';
import DashboardCategories from '../components/dashboard(admin)/Categories.jsx';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/web(user)/protectedRoute/ProtectedRoute.jsx';
import Loading from '../components/pages/loader/Loading.jsx';
import Auth from '../components/web(user)/authRouts/Auth.jsx';
import Information from '../components/web(user)/profile/Information.jsx';
import Contact from '../components/web(user)/profile/Contact.jsx';
import AccountDetails from '../components/web(user)/profile/AccountDetails.jsx';
import OrdersDetails from '../components/web(user)/orders/OrdersDetails.jsx';
 import CreateOrder from '../components/web(user)/orders/CreateOrder.jsx';
 

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
        </ProtectedRoute>,
        children:[
          {
            index:true,
            element:<Information/>
          },
          {
            path:'contact',
            element:<Contact/>
          },
          {
            path:'accountDetails',
            element:<AccountDetails/>
          },
          {
            path:'orders',
            element:<OrdersDetails/>
          },
        ]
      },
      {
        path:'createOrder',
        element:
        <ProtectedRoute> 
          <CreateOrder/>
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
