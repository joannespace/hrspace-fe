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
          {/* <Box display="flex"  > */}
          <IconButton
            size="large"
            edge="start"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpenDrawer(!openDrawer)}
            color="inherit"
            sx={{ pb: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Logo sx={{ display: "flex", flexGrow: 1 }} />
          {/* </Box> */}

          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(!openDrawer)}
          >
            <TabSideBar />
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainSideBarSmall;
