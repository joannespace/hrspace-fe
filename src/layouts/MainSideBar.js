import React from "react";
import { Box } from "@mui/system";
import Logo from "../components/Logo";
import TabSideBar from "../components/TabSideBar";

function MainSideBar() {
  return (
    <Box
      minHeight={{ xs: 1, md: "100%" }}
      sx={{
        backgroundColor: "primary.main",
        pt: { xs: 1, md: 5 },
      }}
    >
      <Logo
        sx={{
          width: "5rem",
          display: "flex",
          justifyContent: "center",
          m: "auto",
        }}
      />

      <TabSideBar />
    </Box>
  );
}

export default MainSideBar;
