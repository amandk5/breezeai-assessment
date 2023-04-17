import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/auth.action";

import "../Loader.css";

export default function Login() {
  // get token from redux auth store
  const { token, loginprogress } = useSelector((store) => store.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // to dispatch redux action
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  // if token is present take user to dashboard
  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }

  if (loginprogress) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <div className="w-1/2 m-auto border border-1-black rounded-md p-3 text-center my-5">
        <h1 className="text-center text-3xl text-bold font-bold mt-5 my-10 ">
          Login
        </h1>
        <form onSubmit={loginHandler}>
          <input
            className="box-border border px-2 py-2 w-full mb-3 rounded-md"
            type="email"
            placeholder="email"
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <br />
          <input
            className="box-border border px-2 py-2 w-full rounded-md"
            type="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 border-none rounded-xl mt-5 py-2 px-20 text-white mb-5"
          >
            Login
          </button>
          <div className="mb-5">
            <div>
              Don't have an Account?
              <span className=" font-bold text-red-500 ml-1">
                <Link to="/register">Register</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
