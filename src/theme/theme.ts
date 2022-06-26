import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  palette: {
    primary: {
      main: "#7722FF",
      light: "rgba(119, 34, 255, 0.1)",
      active: "#0050C8",
    },
    secondary: {
      main: "#202730",
      active: "#1F2830",
    },
    disabled: "rgba(255, 168, 0, 0.90)",
    common: {
      main: "white",
      contrast: "rgba(226, 208, 255, 0.14)",
      grey: "#E5E5E5",
      slate: "rgba(212, 221, 230, 1)",
      border: "rgba(212, 221, 230, 0.22)",
      backdrop: "rgba(171, 159, 191, 0.08)",
      error: "red",
      text: "#263656",
      paragraph: "rgba(0, 0, 0, 0.61)",
      background: "#fafafa",
      "box-shadow": "0px 4px 22px rgba(172, 172, 172, 0.26)",
      gradient:
        "radial-gradient(33.52% 329.87% at 64.61% 53.91%, rgba(255, 255, 255, 0) 0.33%, rgba(255, 255, 255, 0.91) 82.55%, #FFFFFF 100%)",
    },
  },
  media: {
    up: (breakpoint, vertical = false) =>
      `@media (min-${
        vertical ? "height" : "width"
      }: calc(${breakpoint} + 0.02px))`,
    down: (breakpoint, vertical = false) =>
      `@media (max-${vertical ? "height" : "width"}: ${breakpoint})`,

    breakpoints: {
      xs: "400px", //extra-small
      sm: "600px", //small
      md: "800px", //medium
      lg: "1200px", //large
      xl: "1536px", //extra large
    },
  },
  typography: {
    fontSize: {
      xs: "1.2rem",
      s: "1.6rem",
      m: "1.8rem",
      l: "2.2rem",
      xl: "3rem",
      xxl: "4.5rem",
    },
    fontWeight: {
      light: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 900,
    },
  },
  layout: {
    padding: {
      xs: "2rem", //extra-small
      sm: "4rem", //small
      md: "8rem", //medium
      lg: "10rem", //large
      xl: "20rem", //extra large
    },
    border: {
      rounded: {
        xs: "0.2rem", //extra-small
        sm: "0.4rem", //small
        md: "1rem", //medium
        lg: "3rem", //large
        xl: "10rem", //extra large
      },
      main: "0.4rem",
    },
  },
};

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      ...defaultTheme.palette.primary,
    },
    secondary: {
      ...defaultTheme.palette.secondary,
      main: "#181A20",
    },
    common: {
      ...defaultTheme.palette.common,
      main: "#181A20",
      grey: "#b7bdc6",
      // contrast: "#3E4045",
      text: "white",
      paragraph: "#b7bdc6",
      background: "black",
      gradient:
        "radial-gradient(33.52% 329.87% at 64.61% 53.91%, rgba(24, 26, 32, 0) 0.33%, rgba(24, 26, 32, 0.89) 82.55%, #181A20 100%)",
      "box-shadow": "0px 4px 22px #000000;",
    },
  },
};
