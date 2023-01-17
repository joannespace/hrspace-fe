import React from "react";
import { Outlet } from "react-router-dom";

import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import AlertMsg from "../components/AlertMsg";
import HomeHeader from "./HomeHeader";
import MainFooter from "./MainFooter";

function HomeLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <HomeHeader />

      <AlertMsg />

      <Outlet />

      <Box sx={{ display: "flex", flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default HomeLayout;
