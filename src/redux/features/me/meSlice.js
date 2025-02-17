import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  email: "",
  fullName: "",
  username: "",
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    storeMyData: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.username = action.payload.username;
    },

    removeMyData: () => initialState, // ✅ Correct way to reset state
  },
});

export const { storeMyData, removeMyData } = meSlice.actions;

export default meSlice.reducer;
