import React, { useEffect, useState } from 'react';
import { API_Url } from '../../API Integration/APIpaths';

const All_Products = () => {
  const [firmname, setFirmName] = useState("");
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const res = await fetch(`${API_Url}/product/${firmId}/get-products`);
      const data = await res.json();
      setProducts(data.products || []);
      setFirmName(data.Restaurant_Name || "No Firm Added");
    } catch (err) {
      console.log(err);
      setProducts([])
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById=async(productID)=>
  {
    try
    {
      const res=await fetch(`${API_Url}/product/delete-product/${productID}`,{method:"DELETE"})
      if(res.ok)
      {
        setProducts( products.filter(product=>product._id !== productID))
        confirm("Please Conform to delete this product")
        alert("Product Deleted Successfully")
      }

    }
    catch(err)
    {
      console.log(err)
      alert("Something Wrong Product Not Deleted")
    } 
  }
  return (
    <div className="products-container">
      <h2 className="firmname-container text-center">{firmname}</h2>
      <div className="table-container">
        {!products || products.length === 0 ? (
          <h2 className="text-danger text-center">No Products Found</h2>
        ) : (
          <table className="product-table table table-bordered ">
            <thead className="table-primary">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Product Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((ele, index) => (
                <tr key={index}>
                  <td>{ele.productName}</td>
                  <td>{ele.price}</td>
                  <td>
                    {ele.productImage && (
                      <img
                        src={`${API_Url}/uploads/${ele.productImage}`}
                        alt={ele.productName}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    )}
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>deleteProductById(ele._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default All_Products;
