import { alpha } from "@mui/material";

export const PRIMARY = {
  lighter: "#ede7f6",
  light: "#b39ddb",
  main: "#673ab7",
  dark: "#512da8",
  darker: "#311b92",
  contrastText: "#FFF",
};

export const SECONDARY = {
  lighter: "#fff3e0",
  light: "#ffcc80",
  main: "#ff9800",
  dark: "#f57c00",
  darker: "#e65100",
  contrastText: "#FFF",
};

export const SUCCESS = {
  lighter: "#e0f2f1",
  light: "#80cbc4",
  main: "#009688",
  dark: "#00796b",
  darker: "#004d40",
  contrastText: "#FFF",
};

export const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

export const lightThemeOptions = {
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
    success: SUCCESS,
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: "#FFF",
      default: "#FFF",
      neutral: GREY[200],
    },
    action: {
      active: GREY[600],
      hover: GREY[500],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
    mode: "light",
  },
  shape: { borderRadius: 8 },
};

const PRIMARY_DARK = {
  main: "#919EAB",
  light: "#637381",
  dark: "#454F5B",
  contrastText: "#161C24",
};

const TEXT = {
  primary: GREY[300],
  secondary: GREY[400],
  disabled: GREY[500],
};

export const darkThemeOptions = {
  palette: {
    primary: PRIMARY_DARK,
    secondary: SECONDARY,
    success: SUCCESS,
    text: TEXT,
    mode: "dark",
  },
};

// primary: PRIMARY_DARK,
// secondary: SECONDARY,
// success: SUCCESS,
// text: TEXT,
// mode: "dark",
// background: {
//   paper: "#161C24",
//   default: "#FFF",
//   neutral: GREY[200],
// },
// action: {
//   active: GREY[600],
//   hover: GREY[200],
//   selected: GREY[500_16],
//   disabled: GREY[500_80],
//   disabledBackground: GREY[500_24],
//   focus: GREY[500_24],
//   hoverOpacity: 0.08,
//   disabledOpacity: 0.48,
// },
