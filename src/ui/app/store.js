
// store the fetched api and the reducers
import { apiSlice } from "./api/apiSlice";
import loginReducer from "../features/auth/authSlicerLogin"
import signupReducer from "../features/auth/authSlicerRegister"
import { configureStore } from "@reduxjs/toolkit"

// create the store

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:loginReducer,
        signup: signupReducer
  },
  middleware:getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:false
    
})
