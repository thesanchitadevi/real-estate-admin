import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242933",
      paper: "#2E3440",
    },
    primary: {
      main: "#EBCB8B",
    },
    error: {
      main: "#d0736e",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: "bolder",
    },
  },
});

export default theme;
