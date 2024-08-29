import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    loadUsersFromStorage: (state) => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        state.users = JSON.parse(storedUsers);
      }
    },
    loadCurrentUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
      }
    },
  },
});

export const {
  addUser,
  loginUser,
  logoutUser,
  loadUsersFromStorage,
  loadCurrentUserFromStorage,
} = userSlice.actions;

export default userSlice.reducer;
