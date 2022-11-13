import styled, { css } from "styled-components";

const DinnerContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 4rem;
    margin-top: 5rem;
    flex-direction: column;

    ${up(breakpoints.lg)} {
      position: relative;
      /* flex-direction: row; */
    }

    ${up(breakpoints.xl)} {
      flex-direction: row;
    }
  `
);

export { DinnerContainer };
