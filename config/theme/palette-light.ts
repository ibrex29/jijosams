import { PaletteOptions } from "@mui/material";
import { common, grey } from "@mui/material/colors";

const palette: PaletteOptions = {
  mode: "light",
  background: {
    default: "#ececec", //'#fdfdfd',
    paper: common.white,
  },
  text: {
    primary: grey[900],
    secondary: "#333", // grey[700],
    disabled: grey[500],
  },
};

export default palette;
