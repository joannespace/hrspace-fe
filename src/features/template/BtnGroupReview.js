import React from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTemplate } from "./templateSlice";

function BtnGroupReview({ methods }) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting },
  } = methods;

  const handleDelete = () => {
    dispatch(deleteTemplate({ templateId: params.templateId }));
    navigate(`/template`);
  };
  return (
    <Stack spacing={1} direction="row">
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{ fontWeight: "600" }}
        loading={isSubmitting}
        style={{ flexGrow: 1 }}
      >
        Update Template
      </LoadingButton>

      <LoadingButton
        variant="outlined"
        sx={{
          borderColor: "secondary.main",
          color: "secondary.main",
          fontWeight: 600,
          ":hover": { backgroundColor: "secondary.lighter" },
        }}
        onClick={handleDelete}
      >
        Delete
      </LoadingButton>
    </Stack>
  );
}

export default BtnGroupReview;
