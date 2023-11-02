import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Checklist from "./pages/Checklist";
import Vendors from "./pages/Vendors";
import Dashboard from "./pages/Dashboard";
import Dashboardlayout from "./ui/Dashboardlayout";
import Runsheet from "./pages/Runsheet";
import Events from "./ui/Components/Events";
import RegistrationForm from "./ui/Components/RegistrationForm";
import LoginForm from "./ui/Components/LoginForm";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/events" element={<Events />} />
      <Route element={<Dashboardlayout />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/checklist" element={<Checklist />}></Route>
        <Route path="dashboard/vendors" element={<Vendors />}></Route>
        <Route path="dashboard/runsheet" element={<Runsheet />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
