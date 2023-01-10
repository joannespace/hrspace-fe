import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function AdminRequire({ children }) {
  const auth = useAuth();

  if (auth.user.role !== "Admin") {
    toast.error("Only Admin Can Access");
    return <Navigate to="/employee" replace />;
  } else {
    return children;
  }
}

export default AdminRequire;
