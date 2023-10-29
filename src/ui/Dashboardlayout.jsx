import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardHero from "./DashboardHero";

function Dashboardlayout() {
  return (
    <>
      <Navbar />
      <DashboardHero />
      <Outlet />
    </>
  );
}

export default Dashboardlayout;
