import styled, { css } from "styled-components";

const GeneratedDietWrapper = styled.div(
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
    justify-content: flex-start;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
  `
);

export { GeneratedDietWrapper };
