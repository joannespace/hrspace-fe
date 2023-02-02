import React from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";

function ConfirmBox({ open, setOpen, text, handleDelete }) {
  const handleConfirm = () => {
    setOpen(!open);
    handleDelete();
  };
  return (
    <Dialog open={open} onClose={() => setOpen(!open)} maxWidth="xl">
      <Container sx={{ my: 3 }}>
        <Typography>{text}</Typography>

        <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
          <Button variant="outlined" color="error" onClick={handleConfirm}>
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(!open);
            }}
          >
            No
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
}

export default ConfirmBox;
