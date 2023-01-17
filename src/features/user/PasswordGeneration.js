import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { activateUser, resetPassword } from "./userSlice";

function PasswordGeneration({ type, setOpenDialog, employee }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (type === "Generate") {
        dispatch(
          activateUser({
            id: employee._id,
            body: { email: employee.email, password },
          })
        );
      } else {
        dispatch(
          resetPassword({
            id: employee._id,
            body: { email: employee.email, password },
          })
        );
      }

      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="New Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoadingButton type="submit" variant="contained">
          {type}
        </LoadingButton>
      </Box>
    </form>
  );
}

export default PasswordGeneration;
