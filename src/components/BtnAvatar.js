import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import useAuth from "../hooks/useAuth";

function BtnAvatar() {
  const auth = useAuth();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem 1rem",
        }}
      >
        <Avatar alt={auth.user.name} src={auth.user.picture} sizes="small" />

        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffcc80",
            margin: "0.5rem 0.2rem",
            padding: " 0.1rem 1rem",
            borderRadius: "1rem",
            minWidth: "80%",
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" fontWeight={600}>
              {auth.user.role}{" "}
            </Typography>
            {auth.user.role === "Admin" ? (
              <VpnKeyIcon sx={{ ml: 1 }} color="success" />
            ) : (
              ""
            )}
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              whiteSpace: "wrap",
              overflow: "hidden",
              width: "12vh",
              textOverflow: "clip",
              textAlign: "center",
            }}
          >
            {auth.user.name}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default BtnAvatar;
