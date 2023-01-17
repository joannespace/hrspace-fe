import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { Container, Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { GOOGLE_CLIENT_ID } from "../app/config";

import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const signUpSchema = yup.object({
  name: yup
    .string("Invalid Fullname")
    .required("Fullname is required")
    .max(20, "Name can not exceed 20 characters long"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: yup
    .string("Invalid Password")
    .oneOf([yup.ref("password")], "Password must match")
    .required("Please confirm your password")
    .min(8, "Password must be at least 8 characters long"),
  companyName: yup
    .string("Invalid Company Name")
    .required("Company name is required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  companyName: "",
};

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const auth = useAuth();

  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = methods;

  useEffect(() => {
    function handleGoogleResponse(response) {
      const userObject = jwtDecode(response.credential);
      if (userObject.email_verified) {
        const { name, email } = userObject;
        reset({
          name,
          email,
          password: "",
          passwordConfirmation: "",
          companyName: "",
        });
      }
    }

    const google = window.google;
    google?.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
      text: "Sign up with Google",
    });
  }, [reset]);

  const onSubmit = async (data) => {
    const { name, email, password, companyName } = data;
    try {
      await auth.register({ name, email, password, companyName }, () => {
        navigate("/", { replace: true });
        toast.success(
          "Your account was registered. Please check mailbox for email verification"
        );
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
          maxWidth: "70vh",
          boxShadow: "1px 0px 2px 2px #d1c4e9",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          color="primary.main"
        >
          Sign Up
        </Typography>

        <Alert severity="info" sx={{ my: 2, fontSize: "1rem" }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
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
            Login
          </Link>
        </Alert>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} alignItems="center">
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            <FTextField label="Fullname" name="name" type="text" />
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
            <FTextField
              label="Password Confirmation"
              name="passwordConfirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                      edge="end"
                    >
                      {showPasswordConfirmation ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              label="Current Company"
              name="companyName"
              type="text"
            />

            <Box>
              <Divider sx={{ mb: 1 }} variant="fullWidth">
                or
              </Divider>
              <div id="signUpDiv"></div>
            </Box>

            <Typography fontSize="13px">
              By signing up, I agree to all website's{" "}
              <Link component={RouterLink}>Terms and conditions</Link>
            </Typography>

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
      </Card>
    </Container>
  );
}

export default SignUpPage;
