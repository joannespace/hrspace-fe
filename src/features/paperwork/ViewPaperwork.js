import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Paper } from "@mui/material";
import { Stack } from "@mui/system";

import { FormProvider } from "../../components/form";
import { getEmployeeDetails } from "../employee/employeeSlice";
import { getSinglePaperwork, updatePaperwork } from "./paperworkSlice";
import { generateOptionsList } from "./config";
import FormComponent from "./FormComponent";
import BtnGroupView from "./BtnGroupView";
import PageNavigation from "../../components/PageNavigation";
import useAuth from "../../hooks/useAuth";

function ViewPaperwork() {
  const methods = useForm();
  const params = useParams();
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState();
  const [paperwork, setPaperwork] = useState();
  const [richTextOptions, setRichTextOptions] = useState([]);

  const { templateList } = useSelector((state) => state.template);
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
    watch,
  } = methods;

  const watchContent = watch("content");

  useEffect(() => {
    try {
      const initialize = async () => {
        const response = await dispatch(getEmployeeDetails(params.id));
        const responsePaper = await dispatch(
          getSinglePaperwork({ id: params.id, idPaper: params.idPaper })
        );
        setEmployee(response.data);
        setPaperwork(paperwork);

        reset({
          startDate: responsePaper.data.startDate,
          lastDate: responsePaper.data.lastDate,
          paperworkType: responsePaper.data.paperworkType,
          paperworkStatus: responsePaper.data.paperworkStatus,
          employeeId: responsePaper.data.employeeId?.name,
          reviewId: responsePaper.data.reviewId?._id,
          templateId: responsePaper.data.templateId?._id || undefined,
          file: responsePaper.data.file || "",
          content: responsePaper.data.content || "",
          companyId: response.data.company.companyName,
        });

        setRichTextOptions(generateOptionsList(response.data));
      };
      initialize();
    } catch (error) {
      setError("responseError", error);
    }
  }, [dispatch, params, paperwork, reset, setError]);

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
      setError("responseError", error);
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
              type="updatePaper"
            />

            {auth.user.role === "Admin" && (
              <BtnGroupView
                paperwork={paperwork}
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
