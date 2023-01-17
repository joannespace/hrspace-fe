import React, { useState } from "react";

import Button from "@mui/material/Button";

import { Box, Tooltip } from "@mui/material";

import DialogForm from "../../components/DialogForm";

import PasswordGeneration from "./PasswordGeneration";

function BtnGenerateReset({ type, employee }) {
  const [openDialog, setOpenDialog] = useState(false);
  const dialogItem = dialogItemsGenerate(type, setOpenDialog, employee);

  return (
    <Box>
      <Tooltip title="Generate password">
        <Button
          onClick={() => setOpenDialog(!openDialog)}
          sx={{ textTransform: "capitalize", width: "100px" }}
          variant="contained"
          color={type === "Generate" ? "primary" : "success"}
        >
          {type === "Generate" ? "Generate" : "Reset"}
        </Button>
      </Tooltip>

      <DialogForm
        dialogItem={dialogItem}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Box>
  );
}

export default BtnGenerateReset;

function dialogItemsGenerate(type, setOpenDialog, employee) {
  if (type === "Generate") {
    return {
      title: "Generate password",
      component: (
        <PasswordGeneration
          type="Generate"
          setOpenDialog={setOpenDialog}
          employee={employee}
        />
      ),
    };
  } else {
    return {
      title: "Reset password",
      component: (
        <PasswordGeneration
          type="Reset"
          setOpenDialog={setOpenDialog}
          employee={employee}
        />
      ),
    };
  }
}
