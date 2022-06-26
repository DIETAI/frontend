import "styled-components";

interface IPalette {
  main: string;
  light?: string;
  contrastText?: string;
  active?: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius?: string;
    palette: {
      common: {
        main: string;
        contrast: string;
        slate: string;
        grey: string;
        border: string;
        error: string;
        text: string;
        backdrop: string;
        paragraph: string;
        gradient: string;
        background: string;
        "box-shadow": string;
      };
      disabled: string;
      primary: IPalette;
      secondary: IPalette;
    };
    media: {
      up: (breakpoint: string) => string;
      down: (breakpoint: string) => string;
      breakpoints: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    typography: {
      fontSize: {
        s: string;
        xs: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
      };
      fontWeight: {
        light: number;
        medium: number;
        semibold: number;
        bold: number;
        extraBold: number;
      };
    };
    layout: {
      padding: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      border: {
        rounded: {
          xs: string;
          sm: string;
          md: string;
          lg: string;
          xl: string;
        };
        main: string;
      };
    };
  }
}
