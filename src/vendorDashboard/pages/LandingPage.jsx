import React, { useEffect, useState } from "react";
import Add_Firm from "../components/forms/Add_Firm";
import Add_Product from "../components/forms/Add_Product";
import All_Products from "../components/forms/All_Products";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import WelcomePage from "../components/WelcomePage";

const LandingPage = () => {
  const [login, setlogin] = useState(false);
  const [register, setregister] = useState(false);
  const [addfirm, setfirm] = useState(false);
  const [addproduct, setproduct] = useState(false);
  const [welcome, setwelcome] = useState(false);
  const [allproducts, setallproducts] = useState(false);
  const [logout, setlogout] = useState(false);
  const [firmregister,setfirmregister]=useState(true)
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const firmName = localStorage.getItem("firmName");
    const hasFirm=localStorage.getItem("hasFirm")
    if (loginToken) {
      setlogout(true);
    }
    
    if (firmName) {
      setfirmregister(false)   
      
    }else if(hasFirm===null || hasFirm==="false")
    {
        setfirmregister(true)
    }

  }, []);
 
  const loginhandler = () => {
    setlogin(true);
    setregister(false);
    setfirm(false);
    setproduct(false);
    setwelcome(false);
    setallproducts(false);
  };

  const registerhandler = () => {
    setregister(true);
    setlogin(false);
    setfirm(false);
    setproduct(false);
    setwelcome(false);
    setallproducts(false);
  };
  const logoutHandler = () => {
    confirm("Confirm Your Logout");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    localStorage.removeItem("hasFirm")
    setlogout(false);
    setfirmregister(true);
  };

  const firmHandler = () => {
    if(logout)
    {
      setfirm(true);
      setproduct(false);
      setlogin(false);
      setregister(false);
      setwelcome(false);
      setallproducts(false);
    }
    else
    {
      alert("Please Login")
      setlogin(true)
    }
  };

  const productHandler = () => {
    if(logout)
    {
      setproduct(true);
      setfirm(false);
      setlogin(false);
      setregister(false);
      setwelcome(false);
      setallproducts(false); 
    }
    else
    {
      alert("Please Login")
      setlogin(true)
    }

  };
  const welcomeHandler = () => {
    setwelcome(true);
    setproduct(false);
    setfirm(false);
    setlogin(false);
    setregister(false);
    setallproducts(false);
  };
  const allproHandler = () => {
    if(logout)
    {
      setallproducts(true);
      setwelcome(false);
      setproduct(false);
      setfirm(false);
      setlogin(false);
      setregister(false);
    }
    else
    {
      alert("Please Login")
      setlogin(true)
    }
  };
  const handleFirmRegistration = () => {
    setfirmregister(false);
    setfirm(false); 
  };
  return (
    <>
      <section className="landingPage">
        <Navbar
          loginhandler={loginhandler}
          registerhandler={registerhandler}
          logout={logout}
          logoutHandler={logoutHandler}

        />
        <div className="Menu">
          <SideBar
            firmHandler={firmHandler}
            productHandler={productHandler}
            allproHandler={allproHandler}
            firmregister={firmregister}
          />
          {login && (
            <Login
              welcomeHandler={welcomeHandler}
              registerhandler={registerhandler}
            />
          )}
          {register && <Register loginhandler={loginhandler} />}
          {addfirm && logout && (
            <Add_Firm
              loginhandler={loginhandler}
              productHandler={productHandler}
              handleFirmRegistration={handleFirmRegistration}
            />
          )}
          {addproduct && logout && <Add_Product firmHandler={firmHandler} />}
          {welcome && <WelcomePage />}
          {allproducts && logout && <All_Products />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
