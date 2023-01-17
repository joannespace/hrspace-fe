import React, { useContext } from "react";

import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { darkThemeOptions, lightThemeOptions } from "./colorPallete";
import { ColorContext } from "../contexts/ColorProvider";

function ThemeProvider({ children }) {
  const { mode } = useContext(ColorContext);

  const theme = createTheme(
    mode === "light" ? lightThemeOptions : darkThemeOptions
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
