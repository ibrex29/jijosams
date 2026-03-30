import { PaletteOptions } from "@mui/material";
import { common, grey } from "@mui/material/colors";

const palette: PaletteOptions = {
  mode: "light",
  background: {
    default: "#F4F6F8",  // standard academic SaaS off-white — lighter than #ececec
    paper: common.white,
  },
  text: {
    primary: grey[900],
    secondary: grey[600],
    disabled: grey[400],
  },
  divider: "rgba(145, 158, 171, 0.2)",
};

export default palette;
