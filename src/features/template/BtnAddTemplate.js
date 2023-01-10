import { Button } from "@mui/material";
import React, { useState } from "react";
import DialogForm from "../../components/DialogForm";
import CreateTemplate from "./CreateTemplate";
import PostAddIcon from "@mui/icons-material/PostAdd";

function BtnAddTemplate() {
  const [openDialog, setOpenDialog] = useState(false);
  const dialogItem = dialogItemsGenerate(openDialog, setOpenDialog);

  return (
    <DialogForm
      dialogItem={dialogItem}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    />
  );
}

export default BtnAddTemplate;

function dialogItemsGenerate(openDialog, setOpenDialog) {
  return {
    title: "Create new review",
    component: (
      <CreateTemplate openDialog={openDialog} setOpenDialog={setOpenDialog} />
    ),
    button: (
      <Button
        onClick={() => setOpenDialog(!openDialog)}
        variant="contained"
        sx={{
          backgroundColor: "success.main",
          ":hover": { backgroundColor: "success.darker" },
        }}
      >
        <PostAddIcon fontSize="large" />
      </Button>
    ),
  };
}
