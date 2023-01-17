import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorContext } from "../contexts/ColorProvider";

function BtnToggle() {
  const colorContext = useContext(ColorContext);

  const handleToogle = () => {
    if (colorContext.mode === "light") {
      colorContext.toogleColorCode("dark");
    } else {
      colorContext.toogleColorCode("light");
    }
  };

  return (
    <IconButton
      sx={{ textAlign: "start", mx: 2 }}
      color={colorContext.mode === "dark" ? "default" : "inherit"}
      onClick={handleToogle}
    >
      {colorContext.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default BtnToggle;
