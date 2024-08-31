import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1 className=" text-center mt-5">404</h1>
        <h2 className='text-center mt-2'>Page Not Found</h2>
        <Link to="/">
              <h4 className="text-center text-success mt-2 text-decoration-none">Click Here</h4>
        </Link>
    </div>
  )
}

export default NotFound