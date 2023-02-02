import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deletePaperwork } from "./paperworkSlice";

import StateToPdfMake from "draft-js-export-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ConfirmBox from "../../components/ConfirmBox";

function BtnGroupView({ setError, isSubmitting, content }) {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    try {
      dispatch(
        deletePaperwork({
          id: params.id,
          idPaper: params.idPaper,
        })
      );
      navigate(`/employee/${params.id}/paperwork`);
    } catch (error) {
      setError("responseError", error);
    }
  };

  const handleGeneratePDF = () => {
    const rawContent = JSON.parse(content);
    const stateToPdfMake = new StateToPdfMake(rawContent);
    const pdfmakeContents = stateToPdfMake.generate();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(pdfmakeContents).print();
  };
  return (
    <Stack spacing={2} direction={{ xs: "column", md: "row" }} flexGrow={1}>
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{ fontWeight: "600", fontSize: "18px" }}
        loading={isSubmitting}
        style={{ flexGrow: 1 }}
      >
        Update Paperwork
      </LoadingButton>

      <LoadingButton
        variant="contained"
        color="secondary"
        sx={{ fontWeight: "600", fontSize: "18px" }}
        loading={isSubmitting}
        style={{ flexGrow: 1 }}
        onClick={handleGeneratePDF}
      >
        Generate PDF
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
        text={
          "Do you want to delete this paperwork? This action can not be undo."
        }
        handleDelete={handleDelete}
      />
    </Stack>
  );
}

export default BtnGroupView;
