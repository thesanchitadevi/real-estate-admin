import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#04070f",
      paper: "#070f1f",
    },
    primary: {
      main: "#0b162e",
    },
    error: {
      main: "#de1f51",
    },
  },
  typography: {
    fontFamily: "Montserrat,sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: "bolder",
    },
  },
});

export default theme;
