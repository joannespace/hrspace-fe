import React from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteReview, shareReview } from "./reviewSlice";
import useAuth from "../../hooks/useAuth";

function BtnGroupView({ isSubmitting, setError }) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const locations = useLocation();
  const auth = useAuth();

  const handleDelete = () => {
    try {
      const confirmation = window.confirm(
        "Do you want to delete this review? This action can not be undo"
      );
      if (confirmation) {
        dispatch(
          deleteReview({
            id: params.id,
            reviewId: params.reviewId,
          })
        );
      }
      navigate(`/employee/${params.id}/review`);
    } catch (error) {
      setError("responseError", error);
    }
  };

  const handleSharing = async () => {
    try {
      const body = { path: locations.pathname };

      dispatch(
        shareReview({
          id: params.id,
          reviewId: params.reviewId,
          body,
        })
      );
    } catch (error) {
      setError("responseError", error);
    }
  };

  return (
    <Stack spacing={2} direction={{ xs: "column", md: "row" }} flexGrow={1}>
      {auth.user.role !== "Employee" && (
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ fontWeight: "600", fontSize: "15px" }}
          loading={isSubmitting}
          style={{ flexGrow: 1 }}
        >
          UPDATE REVIEW
        </LoadingButton>
      )}

      {auth.user.role === "Admin" && (
        <>
          <LoadingButton
            variant="contained"
            sx={{ fontWeight: "600", fontSize: "15px" }}
            onClick={handleSharing}
          >
            <SendIcon fontSize="small" sx={{ marginRight: 1 }} />
            Share
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
        </>
      )}
    </Stack>
  );
}

export default BtnGroupView;
