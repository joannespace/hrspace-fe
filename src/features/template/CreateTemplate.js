import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";

import { FormProvider } from "../../components/form";
import useAuth from "../../hooks/useAuth";
import { TEMPLATE_SCHEMA } from "./config";
import FormComponent from "./FormComponent";
import { createSingleTemplate } from "./templateSlice";

function CreateTemplate({ setOpenDialog }) {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let defaultValues = {
    templateName: "",
    category: "",
    creator: auth.user.name,
    content: "",
    company: auth.user.companyName,
  };

  const methods = useForm({
    resolver: yupResolver(TEMPLATE_SCHEMA),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      data.creator = auth.user._id;
      data.company = auth.user.company._id;
      let body = data;
      dispatch(createSingleTemplate(body));
      reset();
      setOpenDialog(false);
      navigate(`/template`);
    } catch (error) {
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
            sx={{ fontWeight: "600" }}
            loading={isSubmitting}
            style={{ flexGrow: 1 }}
          >
            Create Template
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default CreateTemplate;
