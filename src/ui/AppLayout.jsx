import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Outlet for rendering child components */}
    </div>
  );
};

export default AppLayout;
