import React, { useState } from "react";
import { API_Url } from "../../API Integration/APIpaths";

const Add_Product = ({firmHandler}) => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    category: [],
    bestseller: "No",
    description: "",
    productImage: null,
  });

  const handleProduct = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox") {
      if (name === "category") {
        let updatedCategory = [...product.category];
        if (checked) {
          updatedCategory.push(value);
        } else {
          updatedCategory = updatedCategory.filter((Category) => Category !== value);
        }
        setProduct({ ...product, category: updatedCategory });
      }
    } else if (type === "radio") {
      setProduct({ ...product, [name]: value });
    } else if (type === "file") {
      setProduct({ ...product, productImage: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        alert(
          "User Not Authenticated or No Firm Found. Please Register Your Firm."
        );
        return;
      }

      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      const res = await fetch(`${API_Url}/product/add-product/${firmId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${loginToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProduct({
          productName: "",
          price: "",
          category: [],
          bestseller: "No",
          description: "",
          productImage: null,
        });
        alert("Product Added Successfully");
      } 
      else {
        alert(data.Message || "Failed to add product. Please try again.");
        firmHandler();
      }
    } catch (err) {
      console.error("Server Error:", err);
      alert("An error occurred while adding the product. Please try again.");
    }
  };

  return (
    <div className="product">
      <form className="form-container3" onSubmit={handleSubmit}>
        <h4 className="text-primary text-center mb-4">
          Register Your Products
        </h4>

        <div className="form-group">
          <label htmlFor="productName" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="form-control"
            name="productName"
            value={product.productName}
            onChange={handleProduct}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            placeholder="Price"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleProduct}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category:</label>
          <div className="checkbox-group">
            <div>
              <input
                type="checkbox"
                id="veg"
                name="category"
                value="Veg"
                className="form-check-input"
                checked={product.category.includes("Veg")}
                onChange={handleProduct}
              />
              <label htmlFor="veg">Veg</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="non-veg"
                name="category"
                value="Non-Veg"
                className="form-check-input"
                checked={product.category.includes("Non-Veg")}
                onChange={handleProduct}
              />
              <label htmlFor="non-veg">Non-Veg</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="productImage" className="form-label">
            Product Image:
          </label>
          <input
            type="file"
            className="form-control"
            name="productImage"
            onChange={handleProduct}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bestseller:</label>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                id="Yes"
                name="bestseller"
                value="Yes"
                className="form-check-input"
                checked={product.bestseller === "Yes"}
                onChange={handleProduct}
              />
              <label htmlFor="Yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="No"
                name="bestseller"
                value="No"
                className="form-check-input"
                checked={product.bestseller === "No"}
                onChange={handleProduct}
              />
              <label htmlFor="No">No</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            placeholder="Enter description"
            name="description"
            value={product.description}
            onChange={handleProduct}
          ></textarea>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add_Product;
