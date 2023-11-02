import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/doros-white-logo.png";

function Logo() {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="logo" className=" h-36 w-36" />
      </Link>
    </div>
  );
}

export default Logo;
