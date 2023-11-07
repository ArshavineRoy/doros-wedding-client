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

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/events" element={<EventForm />} />
        <Route path="/important" element={<ImportantDatesForm />} />{" "}
        {/*render in dashboard*/}
      </Route>
      <Route element={<Dashboardlayout />}>
        <Route path="/dashboard/:event_id" element={<Dashboard />}></Route>
        <Route path="/dashboard/program" element={<Program />} />
        <Route
          path="/dashboard/:event_id/checklist/"
          element={<Checklist />}
        ></Route>
        <Route
          path="/dashboard/:event_id/vendors/"
          element={<Vendors />}
        ></Route>
        <Route
          path="/dashboard/:event_id/runsheet/"
          element={<Runsheet />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
