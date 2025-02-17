import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersTodo } from "./../../redux/features/todos/todoSlice";

function Todo({ id, title, description, completed, updateCompletion }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ title, description });
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditableMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`${BASE_URL}/todo/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoading(false);
      setIsEditMode(false);
      dispatch(getUsersTodo());
    } catch (error) {
      console.error("Error updating todo:", error);
      setLoading(false);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${BASE_URL}/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(getUsersTodo());
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      {isEditMode ? (
        <div className="flex flex-col justify-between p-3 min-h-[250px] shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              className="p-3 w-full bg-purple-100/70 outline-none"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <div className="flex gap-5">
              <button
                type="submit"
                className="w-full bg-purple-700/70 cursor-pointer hover:bg-purple-500/70 p-2 text-white text-xl"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
          <button
            onClick={handleEditableMode}
            className="my-2 w-full bg-red-400/70 cursor-pointer hover:bg-purple-400/70 p-2 text-white text-xl"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-between min-h-[250px] gap-5 p-3 shadow-xl ${
            completed ? "bg-green-100/50" : "bg-red-100/50"
          }`}
        >
          <h1 className="line-clamp-1 text-3xl font-[Kanit] font-semibold text-purple-800">
            {title}
          </h1>
          <h1 className="line-clamp-2">{description}</h1>
          <div>
            <button
              onClick={() => updateCompletion(id, completed)}
              className="w-full my-2 hover:scale-105 transition-all bg-purple-700/80 text-white p-2 cursor-pointer"
            >
              {completed ? "Mark as Incomplete" : "Mark as Completed"}
            </button>
            <div className="flex gap-5">
              <button
                onClick={handleEditableMode}
                className="w-full hover:scale-105 transition-all bg-orange-500/70 text-white p-2 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={deleteTodo}
                className="w-full hover:scale-105 transition-all bg-red-500/70 text-white p-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Todo;
