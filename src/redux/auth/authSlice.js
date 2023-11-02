import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = localStorage.getItem("user");
const initialState = {
  user: user || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};


export const login = createAsyncThunk("/login", async (user, thunkAPI) => { // this is like a middleware
  try {
    return authService.login(user); // should return what we have fetched
  } catch (err) {
    console.log(err);
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
    });
  },
});


export const {reset} = authSlice.actions;

export default authSlice.reducer