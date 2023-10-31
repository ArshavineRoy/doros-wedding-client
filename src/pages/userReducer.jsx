import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";

const userSlice = createSlice({
  name: "users",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      // Implement the logic to update a user here
      const userIndex = state.findIndex((user) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state[userIndex] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      // Implement the logic to delete a user here
      const userIndex = state.findIndex((user) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.splice(userIndex, 1);
      }
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
