import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "../components/custom/Toast";
import { useDispatch, useSelector } from "react-redux";
import { storeMyData } from "../redux/features/me/meSlice";
import Todo from "../components/Todos/Todo";
import { getUsersTodo } from "../redux/features/todos/todoSlice";

function Home() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [toast, setToast] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId, email, fullName, username } = useSelector(
    (state) => state.me
  );

  const { data, loading, error } = useSelector((state) => state.todos);

  const updateCompletion = async (id, completed) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/todo/update/completion/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        dispatch(getUsersTodo());
      }
    } catch (error) {
      console.log(error);
      showToast(error.message, "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const getMyData = async () => {
    if (userId) {
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/auth/user/my/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res=?> ", res);
      if (res?.data?.success && res?.data?.data) {
        const {
          data: { id, email, fullName, username },
        } = res?.data;
        dispatch(
          storeMyData({
            userId: id,
            email,
            fullName,
            username,
          })
        );
      }
    } catch (error) {
      console.log(error);
      showToast(error.message, "error");
    }
  };

  useEffect(() => {
    getMyData();
    dispatch(getUsersTodo());
  }, [dispatch]);

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      {userId && (
        <div className="w-[90%] px-10 m-auto p-2 my-5">
          <h2 className="text-lg text-gray-500">@{username}</h2>
          <h1 className="text-4xl text-purple-800 font-semibold font-[Kanit]">
            Hello, {fullName}!
          </h1>
          <p className="text-lg text-purple-900">{email}</p>
        </div>
      )}
      {loading ? (
        <h1 className="text-center my-10 text-5xl font-[Kanit]">Loading...</h1>
      ) : error ? (
        <h1 className="text-center my-10 text-5xl font-[Kanit]">Error...</h1>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-[90%] m-auto">
          {data ? (
            data?.map((el) => (
              <Todo
                key={el.id}
                id={el.id}
                title={el.title}
                description={el.description}
                completed={el.completed}
                updateCompletion={updateCompletion}
              />
            ))
          ) : (
            <h1 className="text-center my-10 text-purple-800 text-3xl font-semibold font-[Kanit]">
              No Todos Added yet
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
