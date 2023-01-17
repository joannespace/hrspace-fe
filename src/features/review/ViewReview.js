import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Paper } from "@mui/material";
import { Stack } from "@mui/system";

import FormComponent from "./FormComponent";
import BtnGroupView from "./BtnGroupView";
import { REVIEW_SCHEMA } from "./config";
import { getReviewList, getSingleReview, updateReview } from "./reviewSlice";
import { getEmployeeDetails } from "../employee/employeeSlice";
import { FormProvider } from "../../components/form";
import PageNavigation from "../../components/PageNavigation";
import useAuth from "../../hooks/useAuth";

function ViewReview() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
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
        dispatch(getReviewList({ id: params.id }));
        const response = await dispatch(getEmployeeDetails(params.id));
        const responseReview = await dispatch(
          getSingleReview({ id: params.id, reviewId: params.reviewId })
        );
        setEmployee(response.data);

        reset({
          ...responseReview.data,
          reviewee: response.data.name,
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
      if (data.reviewDecision !== "Extend") {
        data.extendTime = undefined;
      }

      dispatch(
        updateReview({ id: params.id, reviewId: params.reviewId, body: data })
      );
      navigate(`/employee/${params.id}/review`);
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };
  return (
    <Stack mt={2}>
      <PageNavigation
        previousPageName="Review"
        hrefPrev={`/employee/${params.id}/review`}
        currentPageName={`Review Details`}
      />
      <Paper sx={{ padding: 3, mt: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormComponent methods={methods} />
            {auth.user.role !== "Employee" && (
              <BtnGroupView isSubmitting={isSubmitting} setError={setError} />
            )}
          </Stack>
        </FormProvider>
      </Paper>
    </Stack>
  );
}

export default ViewReview;
