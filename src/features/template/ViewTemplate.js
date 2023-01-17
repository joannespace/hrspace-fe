import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import BtnGroupReview from "./BtnGroupReview";
import FormComponent from "./FormComponent";
import { TEMPLATE_SCHEMA } from "./config";
import { getSingleTemplate, updateSingleTemplate } from "./templateSlice";
import { FormProvider } from "../../components/form";
import useAuth from "../../hooks/useAuth";
import PageNavigation from "../../components/PageNavigation";

function ViewTemplate({ setOpenDialog }) {
  const dispatch = useDispatch();
  const params = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(TEMPLATE_SCHEMA),
  });

  const { handleSubmit, reset, setError } = methods;

  useEffect(() => {
    const initialize = async () => {
      const response = await dispatch(getSingleTemplate(params.templateId));

      reset({ ...response.data, creator: response.data.creator?.name });
    };

    initialize();
  }, [dispatch, params, reset]);

  const onSubmit = async (data) => {
    try {
      data.creator = auth.user._id;
      data.company = auth.user.company._id;

      dispatch(
        updateSingleTemplate({ templateId: params.templateId, update: data })
      );

      navigate(`/template`);
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3" fontWeight="bold" color="success.dark">
        Template Details
      </Typography>

      <PageNavigation
        previousPageName="Template"
        hrefPrev={`/template`}
        currentPageName={`Review Details`}
      />

      <Paper sx={{ padding: 3, mt: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={3}>
            <FormComponent methods={methods} type="paperwork" />

            <BtnGroupReview methods={methods} setOpenDialog={setOpenDialog} />
          </Stack>
        </FormProvider>
      </Paper>
    </Stack>
  );
}

export default ViewTemplate;
