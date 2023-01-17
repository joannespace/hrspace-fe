import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Logo from "../components/Logo";

function MainHeader() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ display: "flex", flexGrow: 1 }} />

          <Button
            variant="contained"
            sx={{ py: 1, borderRadius: 2, textTransform: "none" }}
          >
            <Typography variant="h6" color="primary.lighter" sx={{ mr: 1 }}>
              Hi Joanne
            </Typography>

            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
              sizes="large"
            />
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
