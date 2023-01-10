import React from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";

function BtnCreate({ isSubmitting }) {
  return (
    <Stack spacing={1} direction="row">
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{ fontWeight: "600", fontSize: "18px" }}
        loading={isSubmitting}
        style={{ flexGrow: 1 }}
      >
        Create paperwork
      </LoadingButton>
    </Stack>
  );
}

export default BtnCreate;
