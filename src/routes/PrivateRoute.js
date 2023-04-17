import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((store) => store.auth);

  // if not logged in send user to login page
  if (token === null) {
    return <Navigate to="/login" />;
  }
  // if logged in send the child component
  return children;
}
