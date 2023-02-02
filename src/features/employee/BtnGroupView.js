import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { deleteEmployee } from "./employeeSlice";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmBox from "../../components/ConfirmBox";

function BtnGroupView({ isSubmitting, setError }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    try {
      dispatch(deleteEmployee(params.id));
      navigate("/employee", { replace: true });
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
        onClick={() => {
          setOpen(true);
        }}
      >
        <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
        Delete
      </LoadingButton>

      <ConfirmBox
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        text={
          "Do you want to delete this employee? This action can not be undo"
        }
      />
    </Stack>
  );
}

export default BtnGroupView;
