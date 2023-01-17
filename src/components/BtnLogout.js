import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function BtnLogout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    auth.logout(() => navigate("/"));
  };
  return (
    <Button color="error" variant="contained" onClick={handleLogOut}>
      Logout
    </Button>
  );
}

export default BtnLogout;
