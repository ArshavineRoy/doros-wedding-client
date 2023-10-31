import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Checklist from "./pages/Checklist";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import EventProgram from "./pages/EventProgram";
import Create from "./pages/Create";
import Update from "./pages/Update"; // Remove the dot before "pages/Update"

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
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/planning-tools" element={<EventProgram />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit" element={<Update />} /> 
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
