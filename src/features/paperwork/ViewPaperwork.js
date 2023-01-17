import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Paper } from "@mui/material";
import { Stack } from "@mui/system";

import { FormProvider } from "../../components/form";
import { getEmployeeDetails } from "../employee/employeeSlice";
import { getSinglePaperwork, updatePaperwork } from "./paperworkSlice";
import { generateOptionsList, PAPERWORK_SCHEMA } from "./config";
import FormComponent from "./FormComponent";
import BtnGroupView from "./BtnGroupView";
import PageNavigation from "../../components/PageNavigation";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTemplateList } from "../template/templateSlice";

function ViewPaperwork() {
  const params = useParams();
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState();
  const [paperwork, setPaperwork] = useState();

  const [richTextOptions, setRichTextOptions] = useState([]);

  const { templateList } = useSelector((state) => state.template);

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
    watch,
    setValue,
  } = methods;

  useEffect(() => {
    try {
      const initialize = async () => {
        await dispatch(getTemplateList({}));
        const response = await dispatch(getEmployeeDetails(params.id));
        const responsePaper = await dispatch(
          getSinglePaperwork({ id: params.id, idPaper: params.idPaper })
        );
        setEmployee(response.data);

        reset({
          ...responsePaper.data,
          employeeId: responsePaper.data.employeeId?.name,
          templateId: responsePaper.data.templateId?._id || "",
          file: responsePaper.data.file || {},
          content: responsePaper.data.content || "",
          companyId: response.data.company?.companyName,
        });

        setRichTextOptions(generateOptionsList(response.data));

        setPaperwork(responsePaper.data);
      };
      initialize();
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  }, [dispatch, params, reset, setError]);

  const watchContent = watch("content");
  const watchTemplate = watch("templateId");

  useEffect(() => {
    const matchTemplate = templateList.find(
      (template) => template._id === watchTemplate
    );
    if (matchTemplate && paperwork.content === undefined) {
      setValue("content", matchTemplate.content);
    }
  }, [setValue, templateList, watchTemplate, paperwork]);

  const onSubmit = (data) => {
    try {
      data = { ...data, employeeId: employee._id };
      const dataKeys = Object.keys(data);

      dataKeys.forEach((key) => {
        if (data[key] === "" || data[key] === undefined || key === "companyId")
          delete data[key];
      });

      dispatch(
        updatePaperwork({
          id: params.id,
          idPaper: params.idPaper,
          update: data,
        })
      );
      navigate(`/employee/${params.id}/paperwork`);
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };

  return (
    <Stack mt={2}>
      <PageNavigation
        previousPageName="Paperwork"
        hrefPrev={`/employee/${params.id}/paperwork`}
        currentPageName={`Paperwork Details`}
      />
      <Paper sx={{ padding: 3, mt: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormComponent
              methods={methods}
              templateList={templateList}
              employee={employee}
              richTextOptions={richTextOptions}
              type="paperwork"
            />

            {auth.user.role === "Admin" && (
              <BtnGroupView
                setError={setError}
                isSubmitting={isSubmitting}
                content={watchContent}
              />
            )}
          </Stack>
        </FormProvider>
      </Paper>
    </Stack>
  );
}

export default ViewPaperwork;
