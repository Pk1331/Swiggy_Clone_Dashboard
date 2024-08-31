import React from 'react'

const Navbar = ({loginhandler,registerhandler,logout,logoutHandler}) => 
{
  const firmName=localStorage.getItem('firmName')
  return (
    <div className="navbar">
        <div className="Vendor_dash">
            Vendor Dashboard
        </div>
        <div>
            <h3>{firmName}</h3>
        </div>
        <div className="userAuth">
          {
            (!logout? <>
              <span onClick={registerhandler}>Register</span>
              <span onClick={loginhandler}>/Login</span>  
             </> :  <span onClick={logoutHandler}>Logout</span> )
          }
        </div>
    </div>
  )
}

export default Navbar