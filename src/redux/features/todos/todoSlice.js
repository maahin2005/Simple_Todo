import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUsersTodo = createAsyncThunk("todo/getUsersTodo", async () => {
  const token = JSON.parse(localStorage.getItem("token")); // Retrieve token inside the function
  try {
    const res = await axios.get(`${BASE_URL}/todo/user/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      return res.data.data;
    } else {
      throw new Error(res.data.message || "Failed to fetch todos");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    removeTodos: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUsersTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { removeTodos } = todoSlice.actions;

export default todoSlice.reducer;
