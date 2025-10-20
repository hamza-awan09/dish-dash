// src/theme.js
import { createTheme } from "@mui/material/styles";

const getCssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const theme = createTheme({
  palette: {
    primary: {
      main: getCssVar("--color-brandPink") || "#E91E63",
    },
    secondary: {
      main: getCssVar("--color-brandBlack") || "#2E3138",
    },
    background: {
      default: getCssVar("--color-brandWhite") || "#ffffff",
    },
    text: {
      primary: getCssVar("--color-brandBlack") || "#212121",
      secondary: getCssVar("--color-brandGray") || "#9e9e9e",
    },
  },
  typography: {
    fontFamily: '"Poppins", system-ui, sans-serif',
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 600, fontSize: "2rem" },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded buttons
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#E91E63", // dishDash pink navbar
        },
      },
    },
  },
});

export default theme;