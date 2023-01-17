import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function AdminRequire({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user.role !== "Admin") {
    toast.error(`Only admin can access ${location.pathname.slice(1)} section`);
    return <Navigate to="/employee" replace />;
  } else {
    return children;
  }
}

export default AdminRequire;
