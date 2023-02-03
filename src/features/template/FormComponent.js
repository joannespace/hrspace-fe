import React from "react";
import { Alert, Stack } from "@mui/material";
import { FRichTextEditor, FSelect, FTextField } from "../../components/form";
import { TEMPLATE_CATEGORY } from "./config";

function FormComponent({ methods, type }) {
  const {
    formState: { errors },
  } = methods;
  return (
    <Stack spacing={2}>
      {!!errors.responseError && (
        <Alert severity="error">{errors.responseError.message}</Alert>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FTextField name="templateName" label="Template Name" />
        <FTextField name="creator" label="Creator Name" disabled />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect name="category" label="Category">
          <option value={undefined}></option>
          {TEMPLATE_CATEGORY.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </FSelect>
      </Stack>

      <FRichTextEditor name="content" type="paperwork" invisibility={true} />
    </Stack>
  );
}

export default FormComponent;
