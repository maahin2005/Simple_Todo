import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { removeMyData } from "../redux/features/me/meSlice";
import { removeTodos } from "../redux/features/todos/todoSlice";

function Navbar() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(removeTodos());
    dispatch(removeMyData());
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="min-h-20 h-fit py-2 px-10 flex items-center justify-center bg-purple-100/40">
      <div className="w-[90%] m-auto gap-5 flex md:flex-row flex-col justify-between items-center">
        <Link to="/">
          <h1 className="text-5xl font-[Kanit] font-semibold text-purple-900">
            Todos
          </h1>
        </Link>
        {isAuth ? (
          <div className="flex gap-8 items-center">
            <Link
              className="bg-purple-200/50 py-2 px-5 hover:bg-purple-300/50 text-xl text-purple-800 font-semibold "
              to={"/todo-crud"}
            >
              + Add Todo
            </Link>

            <button
              className="bg-purple-600 text-white hover:bg-purple-500 px-5 py-2.5 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-8 items-center">
            <Link
              className="hover:underline text-purple-800 font-semibold "
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="hover:underline text-purple-800 font-semibold "
              to={"/signup"}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
