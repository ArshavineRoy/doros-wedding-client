import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from 'react-redux';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
         <Provider store={store}>
      {/* <ReactQueryDevtools /> */}
      <BrowserRouter>
      <App />
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
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
        

        </Provider>
    
  </React.StrictMode>
);
