import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateReview from "./CreateReview";
import DialogForm from "../../components/DialogForm";

function BtnAddReview({ openDialog, setOpenDialog }) {
  const auth = useAuth();

  const dialogItem = dialogItemsGenerate(openDialog, setOpenDialog);

  if (auth.user.role === "Admin") {
    return (
      <Box>
        <IconButton onClick={() => setOpenDialog(true)}>
          <Tooltip title="Create new template">
            <NoteAddIcon fontSize="large" color="primary" />
          </Tooltip>
        </IconButton>

        <DialogForm
          dialogItem={dialogItem}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </Box>
    );
  } else {
    return <></>;
  }
}

export default BtnAddReview;

function dialogItemsGenerate(openDialog, setOpenDialog) {
  return {
    title: "Create new review",
    component: (
      <CreateReview openDialog={openDialog} setOpenDialog={setOpenDialog} />
    ),
  };
}
