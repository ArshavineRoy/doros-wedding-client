import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/doros-white-logo.png";

function Logo() {
  return (
    <div>
      <Link to="/"> 
        <img src={logo} alt="logo" className="h-20 w-20" />
      </Link>
    </div>
  );
}

export default Logo;
