import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  isAuth: token ? true : false,
  token: token ?? null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
