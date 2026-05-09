import { PaletteOptions } from "@mui/material";
import { common, grey } from "@mui/material/colors";

const palette: PaletteOptions = {
  mode: "light",
  background: {
    default: "#f8f4ea",
    paper: "#fffdf7",
  },
  text: {
    primary: "#123727",
    secondary: "#40544a",
    disabled: grey[500],
  },
  divider: "rgba(4, 103, 55, 0.2)",
};

export default palette;
