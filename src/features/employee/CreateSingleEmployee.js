import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Stack } from "@mui/material";
import { Container } from "@mui/system";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormProvider } from "../../components/form";
import useAuth from "../../hooks/useAuth";
import { EMPLOYEE_INFO_SCHEMA, maxBirthday } from "./config";
import { createEmployee, getEmployeeList } from "./employeeSlice";
import FormComponent from "./FormComponent";

function CreateSingleEmployee({ setOpenDialog }) {
  const dispatch = useDispatch();
  const auth = useAuth();

  let defaultValues = {
    name: "",
    email: "",
    role: "",
    company: auth.user.company.companyName,
    password: "",
    onboardDate: new Date(),
    title: "",
    employmentStatus: "Active",
    employmentType: "Intern",
    department: "",
    lineManager: "",
    grossSalary: 0,
    gender: "Female",
    birthday: maxBirthday,
    phone: "",
    personalEmail: "",
    permanentAdd: "",
    perAddCity: "",
  };

  const methods = useForm({
    resolver: yupResolver(EMPLOYEE_INFO_SCHEMA),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  useEffect(() => {
    dispatch(getEmployeeList({}));
  });

  const onSubmit = (data) => {
    try {
      const dataKeys = Object.keys(data);
      dataKeys.forEach((key) => {
        if (!data[key]) delete data[key];
      });
      data = { ...data, company: auth.user.company._id };

      dispatch(createEmployee(data));
      setOpenDialog(false);
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <FormComponent />

          {auth.user.role === "Admin" && (
            <LoadingButton
              variant="contained"
              type="submit"
              sx={{ fontWeight: "600", fontSize: "16px" }}
              loading={isSubmitting}
              style={{ flexGrow: 1 }}
            >
              Create New Employee
            </LoadingButton>
          )}
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default CreateSingleEmployee;
