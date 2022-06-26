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
    min-height: calc(100vh - 8rem);
    padding: 2rem;
    position: relative;

    .backgroundImg {
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

    .confetti {
      width: 100%;
      height: 100%;
    }

    ${up(breakpoints.lg)} {
      .backgroundImg {
        width: 100rem;
        height: 100%;
      }
    }
  `
);

export { Section };
