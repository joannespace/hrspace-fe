import React, { useState } from "react";
import { AppBar, Container, Drawer, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import TabSideBar from "../components/TabSideBar";

function MainSideBarSmall() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpenDrawer(!openDrawer)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Logo />
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(!openDrawer)}
        sx={{}}
      >
        <TabSideBar />
      </Drawer>
    </AppBar>
  );
}

export default MainSideBarSmall;
