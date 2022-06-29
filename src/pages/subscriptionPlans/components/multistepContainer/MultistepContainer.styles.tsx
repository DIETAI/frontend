import styled, { css } from "styled-components";

const MultistepWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5rem;
    max-width: ${breakpoints.lg};
    margin: auto;
    /* border: 0.1rem solid blue; */

    background: ${palette.common.main};
  `
);

const MultistepContent = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `
);

export { MultistepWrapper, MultistepContent };
