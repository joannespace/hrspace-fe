import React, { useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Tooltip } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import DialogForm from "../../components/DialogForm";
import CreateSingleEmployee from "./CreateSingleEmployee";
import CreateManyEmployees from "./CreateManyEmployees";

function BtnAdd() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogItem, setDialogItem] = useState("");

  const dialogItems = dialogItemsGenerate(setOpenDialog);
  const handleClose = (e) => {
    setAnchorEl(null);

    dialogItems.forEach((item) => {
      if (e.target.id === item.value) {
        setOpenDialog(!openDialog);
        setDialogItem(item);
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Add new employee">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
        >
          <PersonAddAlt1Icon fontSize="large" />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} id="addOne">
          Add an employee
        </MenuItem>
        <MenuItem onClick={handleClose} id="addMany">
          Add in bulk
        </MenuItem>
      </Menu>

      <DialogForm
        dialogItem={dialogItem}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Box>
  );
}

export default BtnAdd;

function dialogItemsGenerate(setOpenDialog) {
  return [
    {
      title: "Create new employee",
      component: <CreateSingleEmployee setOpenDialog={setOpenDialog} />,
      value: "addOne",
    },
    {
      title: "Create employees",
      component: <CreateManyEmployees setOpenDialog={setOpenDialog} />,
      value: "addMany",
    },
  ];
}
