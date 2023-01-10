import { LoadingButton } from "@mui/lab";
import { Paper, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function VerificationPage() {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.verifyEmail({ confirmationCode: params.confirmationCode }, () => {
      navigate("/employee", { replace: true });
    });
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
        Email Verification
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
            <Typography textAlign="left" color="secondary" fontWeight={600}>
              Verification Code
            </Typography>
            <TextField
              name="confirmationCode"
              defaultValue={params?.confirmationCode}
            />
            <LoadingButton type="submit" variant="contained">
              Verify Email
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default VerificationPage;
