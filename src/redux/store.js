import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import meReducer from "./features/me/meSlice";
import todoReducer from "./features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    me: meReducer,
    todos: todoReducer,
  },
});
