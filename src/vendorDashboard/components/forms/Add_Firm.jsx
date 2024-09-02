import React, { useState } from 'react';
import { API_Url } from '../../API Integration/APIpaths';

const Add_Firm = ({ loginhandler,productHandler, handleFirmRegistration}) => {
  const [firm, setFirm] = useState({
    Restaurant_Name: "",
    Area: "",
    Category: [],
    Region: [],
    Offer: "",
    Restaurant_image: null,
  });

  const handleFirm = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox") {
      if (name === "Category") {
        let updatedCategory = [...firm.Category];
        if (checked) {
          updatedCategory.push(value);
        } else {
          updatedCategory = updatedCategory.filter((category) => category !== value);
        }
        setFirm({ ...firm, Category: updatedCategory });
      } else if (name === "Region") {
        let updatedRegion = [...firm.Region];
        if (checked) {
          updatedRegion.push(value);
        } else {
          updatedRegion = updatedRegion.filter((region) => region !== value);
        }
        setFirm({ ...firm, Region: updatedRegion });
      }
    } else if (type === "file") {
      setFirm({ ...firm, Restaurant_image: files[0] });
    } else {
      setFirm({ ...firm, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        alert("User Not Authenticated. Please Login");
        return;
      }

      const formData = new FormData();
      for (const key in firm) {
        formData.append(key, firm[key]);
      }
      
      const res = await fetch(`${API_Url}/firm/add-firm`, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${loginToken}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setFirm({ Restaurant_Name: "", Area: "", Category: [], Region: [], Offer: "", Restaurant_image: null });
        alert("Firm Added Successfully");
        localStorage.setItem('firmId',data.firmId)
        productHandler()
        handleFirmRegistration()
      } 
      else if(data.Message==="One Vendor One Firm")
      {
        alert("One Firm 🍜 for One Vendor 👦")
        setFirm({ Restaurant_Name: "", Area: "", Category: [], Region: [], Offer: "", Restaurant_image: null });
        productHandler()
      }
      else 
      {
        alert(data.Message || "User Not Authenticated. Please Login");
        loginhandler();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="firm">
      <form className="form-container2" onSubmit={handleSubmit}>
        <h4 className="text-primary text-center mb-4">Register Your Restaurant</h4>

        <div className="form-group">
          <label className="form-label">Restaurant Name:</label>
          <input type="text" placeholder="Restaurant Name" className="form-control" name="Restaurant_Name" value={firm.Restaurant_Name} onChange={handleFirm} required />
        </div>

        <div className="form-group">
          <label className="form-label">Area:</label>
          <input type="text" placeholder="Area" className="form-control" name="Area" value={firm.Area} onChange={handleFirm} required />
        </div>

        <div className="form-group">
          <label className="form-label">Category:</label>
          <div className="checkbox-group">
            <div>
              <input type="checkbox" id="veg" name="Category" value="Veg" className="form-check-input" checked={firm.Category.includes("Veg")} onChange={handleFirm} />
              <label htmlFor="veg">Veg</label>
            </div>
            <div>
              <input type="checkbox" id="non-veg" name="Category" value="Non-Veg" className="form-check-input" checked={firm.Category.includes("Non-Veg")} onChange={handleFirm} />
              <label htmlFor="non-veg">Non-Veg</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Region:</label>
          <div className="checkbox-group">
            <div>
              <input type="checkbox" id="south-india" name="Region" value="South-Indian" className="form-check-input" checked={firm.Region.includes("South-Indian")} onChange={handleFirm} />
              <label htmlFor="south-india">South India</label>
            </div>
            <div>
              <input type="checkbox" id="north-india" name="Region" value="North-Indian" className="form-check-input" checked={firm.Region.includes("North-Indian")} onChange={handleFirm} />
              <label htmlFor="north-india">North India</label>
            </div>
            <div>
              <input type="checkbox" id="chinese" name="Region" value="Chinese" className="form-check-input" checked={firm.Region.includes("Chinese")} onChange={handleFirm} />
              <label htmlFor="chinese">Chinese</label>
            </div>
            <div>
              <input type="checkbox" id="bakery" name="Region" value="Bakery" className="form-check-input" checked={firm.Region.includes("Bakery")} onChange={handleFirm} />
              <label htmlFor="bakery">Bakery</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Offer:</label>
          <input type="text" placeholder="Offer" className="form-control" name="Offer" value={firm.Offer} onChange={handleFirm} />
        </div>

        <div className="form-group">
          <label htmlFor="Restaurant_image" className="form-label">Restaurant Image:</label>
          <input type="file" className="form-control" name="Restaurant_image" onChange={handleFirm} required />
        </div>

        <button className="btn btn-primary w-100" type="submit">Add Firm</button>
      </form>
    </div>
  );
}

export default Add_Firm;
