import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Stack alignItems="center" flexGrow={1} spacing={3}>
      <Typography fontSize="15rem" color="secondary.darker">
        404
      </Typography>

      <Typography fontSize="2rem" color="primary.main">
        Page not found
      </Typography>

      <Button onClick={() => navigate("/")} color="primary" variant="contained">
        Back to homepage
      </Button>
    </Stack>
  );
}

export default NotFoundPage;
