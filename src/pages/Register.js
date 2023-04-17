import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_setup/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  REGISTER_FAILED,
  REGISTER_PROGRESS,
  REGISTER_SUCCESS,
} from "../redux/auth/auth.types";

import "../Loader.css";

export default function Register() {
  const { registerprogress } = useSelector((store) => store.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for redirecting
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = async (e) => {
    e.preventDefault();

    // dispatch register progress
    dispatch({ type: REGISTER_PROGRESS });

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("registered successfully");
        // dispatch register success
        dispatch({ type: REGISTER_SUCCESS });
        // redirect to login page
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("failed to register");
        // dispatch register failed
        dispatch({ type: REGISTER_FAILED });
        // ..
      });
  };

  if (registerprogress) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <div className="w-1/2 m-auto border border-1-black rounded-md p-3 text-center my-5">
        <h1 className="text-center text-3xl text-bold font-bold mt-5 my-10 ">
          Register
        </h1>

        <div>
          <form onSubmit={registerHandler}>
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
              className="bg-red-500 border-none rounded-xl mt-5 py-2 px-20 text-white mb-5"
            >
              Register
            </button>
            <div className="mb-5">
              <div>
                Already Registered?
                <span className=" font-bold text-blue-500 ml-1">
                  <Link to="/login">Login</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
