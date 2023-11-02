import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import NavBar from "./Navbar";

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Outlet for rendering child components */}
    </div>
  );
};

export default AppLayout;
