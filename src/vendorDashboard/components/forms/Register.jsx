import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from "react";
import { API_Url } from "../../API Integration/APIpaths";

const Register = ({loginhandler}) => {
  const [register, setregister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, seterr] = useState("");
  const [loading, setloading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRegister = (e) => {
    const { name, value } = e.target;
    setregister({
      ...register,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_Url}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });
      const data = await res.json();
      if (res.ok) {
        setregister({ username: "", email: "", password: "" });
        console.log(data);
        alert("Vendor Registered Successfully...");
        loginhandler()
      }
    } catch (err) {
      console.log("Registration Failed", err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register">
      <h2 className="text-primary text-center mb-3">Vendor Register</h2>
      <form className="form-container1" onSubmit={handleSubmit}>
        <div className="form-group mt-4 mb-4">
          <label htmlFor="Username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            placeholder="Enter the Username"
            className="form-control"
            name="username"
            value={register.username}
            onChange={handleRegister}
            required
          />
        </div>
        <div className="form-group mt-4 mb-4">
          <label htmlFor="Email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            placeholder="Enter the Email"
            className="form-control"
            name="email"
            value={register.email}
            onChange={handleRegister}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="Password" className="form-label">
            Password:
          </label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter the Password"
              className="form-control"
              name="password"
              value={register.password}
              onChange={handleRegister}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="password-toggle-icon"
            >
            <i className={showPassword ? 'fas fa-eye':'fas fa-eye-slash'}></i>
            </span>
          </div>
        </div>
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
