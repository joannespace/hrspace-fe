import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function ReviewPage() {
  return (
    <Box sx={{ mb: 5 }}>
      <Outlet />
    </Box>
  );
}

export default ReviewPage;
