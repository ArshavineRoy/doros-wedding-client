// store the fetched api and the reducers
import { apiSlice } from "./api/apiSlice";
import signupReducer from "../features/auth/authSlicerRegister";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/auth/authSlicerLogin";

// create the store

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: loginReducer,
    signup: signupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});
