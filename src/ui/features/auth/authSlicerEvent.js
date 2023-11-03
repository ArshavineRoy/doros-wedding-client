// signupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSliceEvent = createSlice({
  name: "event",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: null,
  },
  reducers: {
    startEvent: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    eventSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    eventFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { startEvent, eventSuccess, eventFailure } =
authSliceEvent.actions;
// create a selector
export const selectEvent = (state) => state.event;

export default authSliceEvent.reducer;
