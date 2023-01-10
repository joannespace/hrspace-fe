import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Paper } from "@mui/material";
import { Stack } from "@mui/system";

import { useForm } from "react-hook-form";

import { FormProvider } from "../../components/form";
import { getEmployeeDetails } from "../employee/employeeSlice";
import BtnCreate from "./BtnCreate";
import { PAPERWORK_SCHEMA } from "./config";
import FormComponent from "./FormComponent";
import { createPaperwork } from "./paperworkSlice";

function CreatePaperwork() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { templateList } = useSelector((state) => state.template);

  const [employee, setEmployee] = useState();
  const [richTextOptions, setRichTextOptions] = useState([]);

  const methods = useForm({ resolver: yupResolver(PAPERWORK_SCHEMA) });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
  } = methods;

  useEffect(() => {
    try {
      const initialize = async () => {
        const response = await dispatch(getEmployeeDetails(params.id));
        setEmployee(response.data);

        reset({
          startDate: new Date(),
          lastDate: new Date(),
          paperworkType: "Probation",
          paperworkStatus: "Pending",
          employeeId: response.data?.name,
          reviewId: "",
          templateId: "",
          file: {},
          content: "",
          companyId: response.data.company.companyName,
        });

        setRichTextOptions(generateOptionsList(response.data));
      };
      initialize();
    } catch (error) {
      setError("responseError", error);
    }
  }, [dispatch, params, reset, setError]);

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
      setError("responseError", error);
    }
  };

  return (
    <Paper sx={{ padding: 4, mt: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormComponent
            methods={methods}
            templateList={templateList}
            employee={employee}
            richTextOptions={richTextOptions}
            type="newPaper"
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
