import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Checklist from "./pages/Checklist";
import Vendors from "./pages/Vendors";
import Dashboard from "./pages/Dashboard";
import Dashboardlayout from "./ui/Dashboardlayout";
import Runsheet from "./pages/Runsheet";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<Dashboardlayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/dashboard/checklist" element={<Checklist />}></Route>
            <Route path="dashboard/vendors" element={<Vendors />}></Route>
            <Route path="dashboard/runsheet" element={<Runsheet />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        containerStyle={{ margin: "8px" }}
        gutter={12}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
