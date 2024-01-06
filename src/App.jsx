import React from 'react'
import {RouterProvider,} from "react-router-dom";
import {router} from './router/Routes.jsx'

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
