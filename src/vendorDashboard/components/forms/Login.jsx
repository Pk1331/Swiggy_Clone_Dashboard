import React, { useState } from "react";
import { API_Url } from "../../API Integration/APIpaths";
const Login = ({ welcomeHandler, registerhandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (event) => {
    const { name, value } = event.target;
    setlogin({
      ...login,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_Url}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await res.json();
      if (res.ok) {
        setlogin({ email: "", password: "" });
        alert("Vendor Login Successfully");
        localStorage.setItem("loginToken", data.token);
        welcomeHandler();
        console.log(data);
      } else {
        alert("User Not Registered or  Please check your email and password.");
      }
      const vendorId = data.vendorId;
      const vendorre = await fetch(`${API_Url}/vendor/${vendorId}`);
      const vendordata = await vendorre.json();
      if (vendorre.ok) {
        if(vendordata.vendorFirmId)
        {
          const vendorFirmId = vendordata.vendorFirmId;
          const firmName=vendordata.Singlevendor.firm[0].Restaurant_Name
          localStorage.setItem("firmId", vendorFirmId);
          localStorage.setItem("firmName",firmName)
          localStorage.removeItem("hasFirm")
          window.location.reload()
        }
        else
        {
          alert("No Firm Added Please Register Your Firm")
          localStorage.setItem('hasFirm',"false")
          window.location.reload()
        }
      }
    } catch (err) {
      console.log(err);
      alert("User Not Registered Please Register First....");
    }
  };
  return (
    <div className="login">
      <h2 className="text-primary text-center mb-3">Vendor Login</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group mt-4 mb-4">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            placeholder="Enter the Email"
            className="form-control"
            name="email"
            value={login.email}
            onChange={handleLogin}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter the Password"
              className="form-control"
              name="password"
              value={login.password}
              onChange={handleLogin}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="password-toggle-icon"
            >
              <i
                className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </span>
          </div>
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
