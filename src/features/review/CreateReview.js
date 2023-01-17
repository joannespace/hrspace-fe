import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";

import { FormProvider } from "../../components/form";
import { getEmployeeDetails } from "../employee/employeeSlice";
import FormComponent from "./FormComponent";
import { REVIEW_SCHEMA } from "./config";
import { createReview } from "./reviewSlice";

function CreateReview({ setOpenDialog }) {
  const dispatch = useDispatch();
  const params = useParams();

  const [employee, setEmployee] = useState();

  const methods = useForm({ resolver: yupResolver(REVIEW_SCHEMA) });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = methods;

  useEffect(() => {
    try {
      const initialize = async () => {
        const response = await dispatch(getEmployeeDetails(params.id));
        setEmployee(response.data);

        reset({
          reviewTitle: "",
          reviewer: response.data.lineManager?._id || "",
          reviewee: response.data.name,
          reviewDate: new Date(),
          paperworkId: "",
          attitude: undefined,
          workQuality: undefined,
          reviewDecision: "Pending",
          extendTime: "",
          improvement: "",
        });
      };
      initialize();
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  }, [dispatch, params, reset, setError]);

  const onSubmit = async (data) => {
    try {
      const dataKeys = Object.keys(data);
      dataKeys.forEach((key) => {
        if (key === "companyId") delete data.companyId;
        if (data[key] === "" || data[key] === undefined) delete data[key];
      });
      data.reviewee = employee._id;
      data.reviewer = employee.lineManager?._id;

      dispatch(createReview({ id: params.id, body: data }));
      reset();
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      setError("responseError", { message: error.message });
    }
  };
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormComponent methods={methods} />

          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ fontWeight: "600", fontSize: "18px" }}
            loading={isSubmitting}
            style={{ flexGrow: 1 }}
            fullWidth
          >
            CREATE NEW REVIEW
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default CreateReview;
