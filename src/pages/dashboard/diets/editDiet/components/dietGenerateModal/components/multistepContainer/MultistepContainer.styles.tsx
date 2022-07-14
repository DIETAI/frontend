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
    background: ${palette.common.main};
    width: 100%;
    margin-top: 3rem;
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
    width: 100%;
    margin-top: 2rem;
  `
);

export { MultistepWrapper, MultistepContent };
