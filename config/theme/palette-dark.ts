import { PaletteOptions } from "@mui/material";
import { grey } from "@mui/material/colors";

const paletteDark: PaletteOptions = {
  mode: "dark",
  background: {
    default: "#0e2b1f",
    paper: "#143727",
  },
  text: {
    primary: "#f4f7f1",
    secondary: "#c9dccf",
    disabled: grey[400],
  },
};

export default paletteDark;
