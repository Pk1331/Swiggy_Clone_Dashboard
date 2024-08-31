import React from 'react'

const SideBar = ({firmHandler,productHandler,allproHandler,firmregister}) => {
  return (
    <div className="sidebar">
      <ul>
        {firmregister ? ( <li onClick={firmHandler}>Add Firm</li>): ""}     
        <li onClick={productHandler}>Add Product</li>
        <li onClick={allproHandler} >All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  )
}

export default SideBar