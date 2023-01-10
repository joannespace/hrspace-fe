import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Paper, Stack } from "@mui/material";
import { FormProvider } from "../../components/form";

import useAuth from "../../hooks/useAuth";
import BtnGroupView from "./BtnGroupView";
import FormComponent from "./FormComponent";
import { EMPLOYEE_INFO_SCHEMA } from "./config";
import {
  getEmployeeDetails,
  getEmployeeList,
  updateEmployee,
} from "./employeeSlice";

function EmployeeInfo() {
  const params = useParams();
  const dispatch = useDispatch();
  const auth = useAuth();
  const currentUser = auth.user;
  const methods = useForm({ resolver: yupResolver(EMPLOYEE_INFO_SCHEMA) });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  useEffect(() => {
    const initial = async () => {
      dispatch(getEmployeeList({}));

      const res = await dispatch(getEmployeeDetails(params.id));
      const data = res.data;

      reset({
        ...data,
        company: data.company.companyName,
        lineManager: data.lineManager ? data.lineManager._id : "",
      });
    };

    initial();
  }, [params, dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      const dataKeys = Object.keys(data);
      dataKeys.forEach((key) => {
        if (!data[key]) delete data[key];
      });
      if (data.paperwork) delete data.paperwork;
      if (data.review) delete data.review;
      data = { ...data, company: currentUser.company._id };

      dispatch(updateEmployee({ id: params.id, update: data }));
    } catch (error) {
      setError("responseError", error);
    }
  };

  return (
    <Paper sx={{ padding: 3, mt: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <FormComponent />

          {auth.user.role === "Admin" && (
            <BtnGroupView isSubmitting={isSubmitting} setError={setError} />
          )}
        </Stack>
      </FormProvider>
    </Paper>
  );
}

export default EmployeeInfo;
