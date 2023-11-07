import { Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Checklist from "./pages/Checklist";
import Vendors from "./pages/Vendors";
import Dashboard from "./pages/Dashboard";
import Dashboardlayout from "./ui/Dashboardlayout";
import Runsheet from "./pages/Runsheet";
import EventForm from "./ui/Components/CreateEventForm";
import ImportantDatesForm from "./ui/Components/ImportantDatesForm";
import RegistrationForm from "./ui/Components/RegistrationForm";
import LoginForm from "./ui/Components/LoginForm";
import AppLayout from "./ui/AppLayout";
import Program from "./pages/Program";
import Home from "./pages/Home";
import MyEvents from "./ui/Components/MyEvents";
import Budget from "./ui/Components/Budget";
import Paywall from "./ui/Paywall";
// import ForgotPassword from "./ui/Components/ForgotPassword";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/events" element={<EventForm />} />
        <Route path="/important" element={<ImportantDatesForm />} /> {/*render in dashboard*/}
        <Route path="/pay" element={<Paywall />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      </Route>
      <Route element={<Dashboardlayout />}>
        <Route path="/dashboard/:eventId" element={<Dashboard />}></Route>
        <Route path="/dashboard/:eventId/program" element={<Program />} />
        <Route path="/dashboard/:eventId/checklist" element={<Checklist />}></Route>
        <Route path="/dashboard/:eventId/vendors" element={<Vendors />}></Route>
        <Route path="/dashboard/:eventId/runsheet" element={<Runsheet />}></Route>
        <Route path="/dashboard/budget/:event_id" element={<Budget />} />
      </Route>
    </Routes>
  );
};

export default App;
