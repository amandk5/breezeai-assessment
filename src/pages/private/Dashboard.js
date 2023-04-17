import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/auth.action";

export default function Dashboard() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1 className="text-center text-3xl text-bold font-bold mt-5 mt-10 ">
        Dashboard
      </h1>
      <div className="my-0 text-right">
        <button
          className="bg-red-500 border-none rounded-xl mt-5 py-1 px-3 text-md text-white font-bold mb-5 mr-3"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <br />
      <br />
      <h3 className=" text-center text-3xl text-bold text-blue-500 font-bold mt-5 my-10 ">
        Hello World
      </h3>
    </div>
  );
}
