import styled, { css } from "styled-components";

const Section = styled.section(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, down, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    /* max-width: 1536px; */
    margin: auto;
    background: ${palette.common.main};
    padding: 2rem;
    min-height: calc(100vh - 8rem);
    position: relative;

    img {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    ${up(breakpoints.lg)} {
      img {
        width: 100rem;
      }
    }
  `
);

export { Section };
