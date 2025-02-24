import React from 'react'

export default function Alert({message}) {
  return (
    <div className="alert alert-info text-center mt-2 w-100" role="alert">
     {message}
  </div>
  )
}
