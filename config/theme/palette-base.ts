import { PaletteOptions } from "@mui/material";

const paletteBase: Partial<PaletteOptions> = {
  primary: {
    light: "#D78A25", // Warm orange-brown from the logo
    main: "#C88532", // Deep orange-brown
    dark: "#8D4F19", // Dark brown from the logo
    contrastText: "#fbfbfb", // White contrast
  },
  secondary: {
    light: "#CAA460", // Light yellow-gold from the logo
    main: "#CFA869", // Gold tone from the logo
    dark: "#D19F53", // Darker gold from the logo
    contrastText: "#fbfbfb", // White contrast
  },
  warning: {
    light: "#FFC107",
    main: "#FFA000",
    dark: "#FF6F00",
    contrastText: "#FFF7DB",
  },
  error: {
    light: "#EF9A9A",
    main: "#F44336",
    dark: "#D32F2F",
    contrastText: "#FFE8EC",
  },
  success: {
    light: "#81C784",
    main: "#388E3C",
    dark: "#2E7D32",
    contrastText: "#E6F4EA",
  },
};

export default paletteBase;
