import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function AccountPage() {
  return (
    <Stack spacing={3}>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h3" fontWeight="bold" color="secondary.darker">
          Account Details
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AccountPage;
