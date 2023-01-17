import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Paper, Stack } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import BtnGroupView from "./BtnGroupView";
import FormComponent from "./FormComponent";
import { EMPLOYEE_INFO_SCHEMA } from "./config";
import {
  getEmployeeDetails,
  getEmployeeList,
  updateEmployee,
} from "./employeeSlice";
import { FormProvider } from "../../components/form";

function EmployeeInfo() {
  const params = useParams();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [employee, setEmployee] = useState();

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

      setEmployee(data);

      reset({
        ...data,
        company: data.company.companyName,
        lineManager: data.lineManager?._id || "",
      });
    };

    initial();
  }, [params, dispatch, reset]);

  const onSubmit = (data) => {
    try {
      const dataKeys = Object.keys(data);
      dataKeys.forEach((key) => {
        if (!data[key]) delete data[key];
      });
      if (data.password && data.password === employee.password)
        delete data.password;
      if (data.paperwork) delete data.paperwork;
      if (data.review) delete data.review;
      data = { ...data, company: auth.user.company._id };

      dispatch(updateEmployee({ id: params.id, update: data }));
    } catch (error) {
      setError("responseError", { message: error.message });
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
