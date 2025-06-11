"use client";

import { createTheme as createMuiTheme, Theme } from "@mui/material/styles";

import paletteBase from "./palette-base";
import paletteDark from "./palette-dark";
import paletteLight from "./palette-light";
import shadows from "./shadows";
import typography from "./typography";

// default
const createTheme = (darkMode?: boolean): Theme => {
  const palette = darkMode
    ? { ...paletteBase, ...paletteDark }
    : { ...paletteBase, ...paletteLight };
  return createMuiTheme({
    palette,
    typography,
    shadows,
  });
};

const theme = createTheme(false);

export { paletteBase, paletteDark, paletteLight, shadows, typography };
export default theme;
