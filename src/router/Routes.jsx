import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import WebLayout from '../layouts/WebLayout.jsx'
import Home from '../components/web(user)/Home.jsx'
import Categories from '../components/web(user)/Categories.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import DashboardHome from '../components/dashboard(admin)/Home.jsx'
import DashboardCategories from '../components/dashboard(admin)/Categories.jsx'
import Register from '../components/web(user)/Register.jsx';
import Products from '../components/web(user)/Products.jsx';

export const router = createBrowserRouter([
{
  path :'/',
  element : <WebLayout/>,
  children :[
    {
      path :'home',
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
