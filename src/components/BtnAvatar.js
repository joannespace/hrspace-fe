import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import useAuth from "../hooks/useAuth";

function BtnAvatar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    auth.logout(() => navigate("/"));
  };
  return (
    <>
      <StyledBox onClick={handleClick} id="positioned-button">
        <Avatar alt={auth.user.name} src={auth.user.picture} sizes="small" />

        <StyledStack>
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

          <Typography variant="subtitle2" sx={{ overflow: "hidden" }}>
            {auth.user.name}
          </Typography>
        </StyledStack>
      </StyledBox>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ margin: "0rem 1rem" }}
      >
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default BtnAvatar;

const StyledBox = styled("Box")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "2rem 1rem",
  cursor: "pointer",
});

const StyledStack = styled("Stack")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#ffcc80",
  margin: "0.5rem 0.2rem",
  padding: " 0.1rem 1rem",
  borderRadius: "1rem",
  minWidth: "80%",
});
