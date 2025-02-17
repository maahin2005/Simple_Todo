import React, { useState } from "react";
import Toast from "../components/custom/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TodoAction() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const { token } = useSelector((state) => state.auth);

  const handleCloseToast = () => {
    setToast(null);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/todo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.data.success) {
        showToast(res.data.data.message, "success");
        setLoading(false);
        navigate("/");
      } else {
        showToast(res.data.data.message, "error");
      }
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
  return (
    <div className="h-fit flex justify-center">
      <div className="p-5 py-10 w-[95%] md:w-1/2 m-auto my-10 shadow-xl">
        <h1 className="text-center font-[Kanit] text-6xl font-semibold text-purple-800">
          Todo
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
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            className="p-3 w-full bg-purple-100/70 outline-none"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-purple-700 cursor-pointer hover:bg-purple-500 p-3 text-white text-xl"
          >
            {loading ? "Adding..." : "+ Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoAction;
