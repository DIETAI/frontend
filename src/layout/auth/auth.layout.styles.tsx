import styled, { css } from "styled-components";

const MainLayoutContainer = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, breakpoints },
    },
  }) => css`
    /* display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    transition: 0.3s ease-out;
    padding: 0 ${padding.xl};
    position: relative;
    background: ${palette.common.main};
    ${down(breakpoints.lg)} {
      padding: 0 ${padding.lg};
    }
    ${down(breakpoints.md)} {
      padding: 0 ${padding.md};
    }
    ${down(breakpoints.sm)} {
      padding: 0 ${padding.sm};
    }
    ${down(breakpoints.xs)} {
      padding: 0 ${padding.xs};
    } */
  `
);

export { MainLayoutContainer };
