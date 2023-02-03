// import { createMuiTheme } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      500: "#780000",
    },
    action: {
      disabledBackground: "#A1A1A1",
      disabled: {
        color: "#fff",
      },
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
        textTransform: "initial",
      },
    },
    MuiTextField: {
      root: {
        "& fieldset": {
          borderRadius: 8,
        },
        "& label": {
          transform: "translate(14px, 18px) scale(1)",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        height: 50,
        "&.Mui-disabled": {
          color: "#000",
        },
      },
    },
    MuiListItem: {
      root: {
        color: "#000",
        "&$selected": {
          backgroundColor: "#780000",
          color: "#fefefe",
        },
        "&$selected:hover": {
          backgroundColor: "#780000",
          color: "#fefefe",
        },
      },
    },
  },
});
