import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TodoAction from "../pages/TodoAction";

function Routings() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoutes>
            <Home />
          </AuthRoutes>
        }
      />
      <Route
        path="/todo-crud"
        element={
          <AuthRoutes>
            <TodoAction />
          </AuthRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Routings;
