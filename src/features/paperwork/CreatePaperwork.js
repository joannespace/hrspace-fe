import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";

import { useForm } from "react-hook-form";

import { FormProvider } from "../../components/form";
import { getEmployeeDetails } from "../employee/employeeSlice";
import BtnCreate from "./BtnCreate";
import { PAPERWORK_SCHEMA } from "./config";
import FormComponent from "./FormComponent";
import { createPaperwork } from "./paperworkSlice";
import { getTemplateList } from "../template/templateSlice";

function CreatePaperwork({ setOpenDialog }) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { templateList } = useSelector((state) => state.template);

  const [employee, setEmployee] = useState();
  const [richTextOptions, setRichTextOptions] = useState([]);

  let defaultValues = useMemo(() => {
    return {
      startDate: new Date(),
      lastDate: new Date(),
      paperworkTitle: "",
      paperworkType: "Probation",
      paperworkStatus: "Pending",
      employeeId: "",
      reviewId: "",
      templateId: "",
      file: {},
      content: "",
      companyId: "",
      reviewGenerated: true,
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(PAPERWORK_SCHEMA),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
    setValue,
    watch,
  } = methods;

  useEffect(() => {
    try {
      const initialize = async () => {
        dispatch(getTemplateList({}));
        const response = await dispatch(getEmployeeDetails(params.id));
        setEmployee(response.data);

        reset({
          ...defaultValues,
          employeeId: response.data?.name,
          companyId: response.data.company.companyName,
        });

        setRichTextOptions(generateOptionsList(response.data));
      };
      initialize();
    } catch (error) {
      setError("responseError", { message: error });
    }
  }, [dispatch, params, reset, setError, defaultValues]);

  const onSubmit = async (data) => {
    try {
      data = { ...data, employeeId: employee._id };
      const dataKeys = Object.keys(data);
      dataKeys.forEach((key) => {
        if (data[key] === "" || data[key] === undefined || key === "companyId")
          delete data[key];
      });

      dispatch(createPaperwork({ id: employee._id, data }));
      navigate(`/employee/${params.id}/paperwork`);
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };

  const watchTemplate = watch("templateId");

  useEffect(() => {
    const matchTemplate = templateList.find(
      (template) => template._id === watchTemplate
    );
    if (matchTemplate) {
      setValue("content", matchTemplate.content);
    }
  }, [watchTemplate, reset, setValue, templateList]);

  return (
    <Paper sx={{ padding: 3, mt: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormComponent
            methods={methods}
            templateList={templateList}
            employee={employee}
            richTextOptions={richTextOptions}
            type="paperwork"
          />

          <BtnCreate isSubmitting={isSubmitting} />
        </Stack>
      </FormProvider>
    </Paper>
  );
}

export default CreatePaperwork;

function generateOptionsList(currentEmployee) {
  const employeeKeys = Object.keys(currentEmployee);

  const richTextOptions = employeeKeys.map((key) => {
    return { label: key, value: currentEmployee[key] };
  });

  return richTextOptions;
}
