import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";
import logoImage from "../logo.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box
      sx={{
        width: 100,
        height: 40,
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <img src={logoImage} alt="logo-color" width="150%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
