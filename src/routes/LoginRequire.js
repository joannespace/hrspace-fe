import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginRequire({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div>Not initialized</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default LoginRequire;
