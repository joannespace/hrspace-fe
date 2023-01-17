import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import jwtDecode from "jwt-decode";

import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, Stack } from "@mui/system";

import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { GOOGLE_CLIENT_ID } from "../app/config";

const loginSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    function handleGoogleResponse(response) {
      const userObject = jwtDecode(response.credential);
      if (userObject.email_verified) {
        auth.loginWithGmail(userObject, () => {
          navigate("/employee", { replace: true });
        });
      }
    }

    const google = window.google;

    google?.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google?.accounts.id.prompt();
  }, [auth, navigate]);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = methods;

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      auth.login({ email, password }, () => {
        navigate("/employee", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs" sx={{ my: 4 }}>
      <Card
        sx={{
          m: "auto",
          p: 3,
          maxWidth: "100vh",
          boxShadow: "1px 0px 2px 2px #d1c4e9",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          color="primary.main"
        >
          Login
        </Typography>

        <Alert severity="info" sx={{ my: 2, fontSize: "1rem" }}>
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            sx={{
              textDecoration: "none",
              color: "secondary.main",
              fontWeight: "400",
              ":hover": {
                textDecoration: "underline",
                borderBottomColor: "secondary.main",
              },
            }}
          >
            Sign Up
          </Link>
        </Alert>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} alignItems="center">
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}

            <FTextField label="Email" name="email" type="email" />
            <FTextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{
                minWidth: "100%",
              }}
            >
              <Link component={RouterLink} to="/reset">
                Forget password?
              </Link>
            </Box>

            <LoadingButton
              variant="contained"
              type="submit"
              fullWidth
              sx={{ fontWeight: "600", fontSize: "1rem", p: 1 }}
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Stack>
        </FormProvider>

        <Stack flexGrow={1} alignItems="center">
          <Divider sx={{ my: 1 }} variant="fullWidth">
            or
          </Divider>
          <div id="signInDiv"></div>
        </Stack>
      </Card>
    </Container>
  );
}

export default LoginPage;
