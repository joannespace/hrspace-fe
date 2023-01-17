import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Paper, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordViaEmail } from "../features/user/userSlice";

function ForgetPassPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordViaEmail({ email }));
    navigate("/", { replace: true });
  };
  return (
    <Container maxWidth="xs" sx={{ my: 4 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        mb={3}
        textAlign="center"
        color="primary.main"
      >
        Reset Password
      </Typography>
      <Paper
        sx={{
          m: "auto",
          p: 3,
          boxShadow: "1px 0px 2px 2px #d1c4e9",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography
              textAlign="left"
              color="secondary"
              fontWeight={600}
              type="email"
            >
              Enter your email
            </Typography>
            <TextField
              name="email"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoadingButton type="submit" variant="contained">
              Reset password
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default ForgetPassPage;
