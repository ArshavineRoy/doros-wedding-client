// signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSliceRegister = createSlice({
  name: 'signup',
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: null,
  },
  reducers: {
    startSignup: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { startSignup, signupSuccess, signupFailure } = authSliceRegister.actions;
// create a selector
export const selectsignUp = (state) => state.signup

export default authSliceRegister.reducer;
