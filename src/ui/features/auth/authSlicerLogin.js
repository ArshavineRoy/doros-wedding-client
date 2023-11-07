import { createSlice } from "@reduxjs/toolkit";

// creating login slice
const authSlicerLogin = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// export the actions
export const { setCredentials, logout } = authSlicerLogin.actions;

// export the selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentrefreshToken = (state) => state.auth.refreshToken;

// export reducer
export default authSlicerLogin.reducer;
