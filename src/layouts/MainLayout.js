import { Grid, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";

import MainSideBar from "./MainSideBar";
import MainSideBarSmall from "./MainSideBarSmall";

function MainLayout() {
  const gridItems = [
    {
      name: "MainSideBarSmall",
      component: <MainSideBarSmall />,
      xs: 12,
      md: 0,
      display: { xs: "block", md: "none" },
    },
    {
      name: "MainSideBar",
      component: <MainSideBar />,
      xs: 0,
      md: 1,
      display: { xs: "none", md: "block" },
    },
    {
      name: "Outlet",
      component: (
        <Container sx={{ pt: { xs: 2, md: 5 } }}>
          <Outlet />
        </Container>
      ),
      xs: 12,
      md: 11,
    },
  ];
  return (
    <Stack sx={{ minHeight: "100vh", backgroundColor: "#f8f9fd" }}>
      <AlertMsg />

      <Grid
        container
        direction={{
          xs: "column",
          md: "row",
        }}
        flexWrap="nowrap"
      >
        {gridItems.map((item) => {
          return (
            <Grid
              key={item.name}
              item
              xs={item.xs}
              md={item.md}
              sx={{
                display: { ...item.display },
                minHeight: { xs: "100%", md: "100vh" },
              }}
            >
              {item.component}
            </Grid>
          );
        })}
      </Grid>

      {/* <Box sx={{ display: "flex", flexGrow: 1, height: 20 }} /> */}

      {/* <MainFooter /> */}
    </Stack>
  );
}

export default MainLayout;
