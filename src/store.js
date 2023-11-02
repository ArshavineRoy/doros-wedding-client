import authReducer from './redux/auth/authSlice'


import { configureStore } from "@reduxjs/toolkit"


export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})
