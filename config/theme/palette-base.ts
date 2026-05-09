import { PaletteOptions } from "@mui/material";

const paletteBase: Partial<PaletteOptions> = {
  primary: {
    light: "#26b567",
    main: "#039447",
    dark: "#046737",
    contrastText: "#ffffff",
  },
  secondary: {
    light: "#e1c58f",
    main: "#d3ae66",
    dark: "#b89246",
    contrastText: "#1f1f1f",
  },
  info: {
    light: "#8ec5b0",
    main: "#4f9f80",
    dark: "#2c6f58",
    contrastText: "#ffffff",
  },
  warning: {
    light: "#f4cf7e",
    main: "#d3ae66",
    dark: "#9b7530",
    contrastText: "#ffffff",
  },
  error: {
    light: "#ef8c78",
    main: "#c0391b",
    dark: "#90280f",
    contrastText: "#ffffff",
  },
  success: {
    light: "#5ec684",
    main: "#2f9d5f",
    dark: "#1f7244",
    contrastText: "#ffffff",
  },
};

export default paletteBase;
