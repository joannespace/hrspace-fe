import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "./employeeSlice";
import { useNavigate, useParams } from "react-router-dom";

function BtnGroupView({ isSubmitting, setError }) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    try {
      const confirmation = window.confirm(
        "Do you want to delete this employee? This action can not be undo"
      );
      if (confirmation) {
        dispatch(deleteEmployee(params.id));
        navigate("/employee", { replace: true });
      }
    } catch (error) {
      setError("responseError", error);
    }
  };

  return (
    <Stack spacing={1} direction={{ xs: "column", md: "row" }} flexGrow={1}>
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{ fontWeight: "600", fontSize: "16px" }}
        loading={isSubmitting}
        style={{ flexGrow: 1 }}
      >
        Update Information
      </LoadingButton>

      <LoadingButton
        variant="outlined"
        sx={{
          borderColor: "secondary.main",
          color: "secondary.darker",
          fontWeight: 600,
          ":hover": { backgroundColor: "secondary.lighter" },
        }}
        onClick={handleDelete}
      >
        <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
        Delete
      </LoadingButton>
    </Stack>
  );
}

export default BtnGroupView;
