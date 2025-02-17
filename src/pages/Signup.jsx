import axios from "axios";
import React, { useState } from "react";
import Toast from "../components/custom/Toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Signup() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { isAuth } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/user/signup`, formData);
      if (res.data.data.success) {
        showToast(res.data.data.message, "success");
        navigate("/login");
      } else {
        showToast(res.data.data.message, "error");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      showToast(error.message, "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isAuth) return <Navigate to={"/"} />;

  return (
    <div className="h-fit flex justify-center">
      <div className="p-5 py-10 w-[95%] md:w-1/2 m-auto my-10 shadow-xl">
        <h1 className="text-center font-[Kanit] text-6xl font-semibold text-purple-800">
          Create a new account
        </h1>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full md:w-1/2 m-auto my-10"
        >
          <input
            type="text"
            className="p-3 w-full bg-purple-100/70 outline-none"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="p-3 w-full bg-purple-100/70 outline-none"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="p-3 w-full bg-purple-100/70 outline-none"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="p-3 w-full bg-purple-100/70 outline-none"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-purple-700 cursor-pointer hover:bg-purple-500 p-3 text-white text-xl"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
