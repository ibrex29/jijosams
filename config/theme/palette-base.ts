import { PaletteOptions } from "@mui/material";

const paletteBase: Partial<PaletteOptions> = {
  primary: {
    light: "#D78A25",
    main: "#C88532",
    dark: "#8D4F19",
    contrastText: "#ffffff",
  },
  secondary: {
    light: "#6B7FD7",  // indigo-blue — functional contrast to the warm primary
    main: "#4C63C9",
    dark: "#3349A8",
    contrastText: "#ffffff",
  },
  info: {
    light: "#60A5FA",
    main: "#2563EB",
    dark: "#1D4ED8",
    contrastText: "#ffffff",
  },
  warning: {
    light: "#FCD34D",
    main: "#F59E0B",
    dark: "#D97706",
    contrastText: "#ffffff",
  },
  error: {
    light: "#FCA5A5",
    main: "#EF4444",
    dark: "#DC2626",
    contrastText: "#ffffff",
  },
  success: {
    light: "#6EE7B7",
    main: "#10B981",
    dark: "#059669",
    contrastText: "#ffffff",
  },
};

export default paletteBase;
