import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Dialog, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function DialogForm({
  dialogItem,
  openDialog,
  setOpenDialog,
  additionClose = undefined,
}) {
  const navigate = useNavigate();
  const params = useParams();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (additionClose === "review") {
      navigate(`/employee/${params.id}/review`);
    }
    if (additionClose === "template") {
      navigate(`/template`);
    }
    if (additionClose === "paperwork") {
      navigate(`/employee/${params.id}/paperwork`);
    }
  };
  return (
    <>
      {dialogItem.button ? (
        dialogItem.button
      ) : (
        <IconButton
          onClick={() => setOpenDialog(!openDialog)}
          sx={{
            display: dialogItem.iconButton ? "block" : "none",
          }}
        >
          {dialogItem.iconButton}
        </IconButton>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xl">
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleCloseDialog}>
            <HighlightOffIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>

        <Container sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            color="secondary.dark"
            fontWeight="600"
            sx={{ mb: 4, textAlign: "center" }}
          >
            {dialogItem.title}
          </Typography>

          {dialogItem.component}
        </Container>
      </Dialog>
    </>
  );
}

export default DialogForm;
