import styled, { css } from "styled-components";

const HomeContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 3rem;

    ${up(breakpoints.sm)} {
      margin-top: 5rem;
    }
  `
);

export { HomeContainer };
