import React from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import {
  FCheckbox,
  FDatePicker,
  FFileField,
  FRichTextEditor,
  FSelect,
  FTextField,
} from "../../components/form";
import { PAPERWORK_STATUS, PAPERWORK_TYPES } from "./config";
import useAuth from "../../hooks/useAuth";

function FormComponent({
  methods,
  templateList,
  employee,
  richTextOptions,
  type,
}) {
  const {
    formState: { errors },
  } = methods;
  const auth = useAuth();

  return (
    <>
      <Alert severity="info" variant="filled">
        Please ensure the employee information is update-to-date before creation
      </Alert>
      {!!errors.responseError && (
        <Alert severity="error">{errors.responseError.message}</Alert>
      )}
      <Stack direction={{ xs: "column", md: "row", mt: 2 }} spacing={2}>
        <FTextField
          label="Employee Name"
          name="employeeId"
          type="text"
          disabled
        />
        <FTextField label="Company" name="companyId" type="text" disabled />
      </Stack>

      <Typography
        variant="h6"
        fontWeight="600"
        color="success.darker"
        textAlign="center"
        width={1}
        sx={{ bgcolor: "success.lighter", py: 1, borderRadius: 1 }}
      >
        Paperwork information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FTextField name="paperworkTitle" label="Paperwork Title" />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FDatePicker name="startDate" label="Start Date" />
        <FDatePicker name="lastDate" label="Last Date" />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect label="Template" name="templateId">
          <option value={undefined}></option>;
          {templateList.map((template) => {
            return (
              <option key={template._id} value={template._id}>
                {template.templateName}
              </option>
            );
          })}
        </FSelect>

        <FSelect label="Paperwork Type" name="paperworkType">
          <option value={undefined}></option>;
          {PAPERWORK_TYPES.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </FSelect>

        <FSelect label="Paperwork Status" name="paperworkStatus">
          <option value={undefined}></option>;
          {PAPERWORK_STATUS.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </FSelect>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect label="Related Review" name="reviewId">
          <option value={undefined}></option>
          {employee?.review.map((review) => {
            return (
              <option key={review._id} value={review._id}>
                {review.reviewTitle}
              </option>
            );
          })}
        </FSelect>
        {auth.user.role === "Admin" && (
          <Box display="flex" flexGrow={1}>
            <FFileField name="file" label="Upload File" type={type} />
          </Box>
        )}
      </Stack>

      <Stack>
        <FRichTextEditor
          label="Paperwork Content"
          name="content"
          type={type}
          options={richTextOptions}
        />

        <FCheckbox name="reviewGenerated" label="Generated Review?" />
      </Stack>
    </>
  );
}

export default FormComponent;
