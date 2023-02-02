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
    width: 100%;
    position: relative;
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
    width: 100%;
    position: relative;
  `
);

const ButtonsWrapper = styled.div(
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
    width: 100%;
    margin: 3rem 0;
    gap: 1rem;
    position: sticky;
    bottom: 1rem;
    background: ${palette.common.main};
    padding: 2rem 0;
    z-index: 1;
    /* border: 0.1rem solid ${palette.primary.light}; */
    flex-direction: column;

    button {
      width: 100%;
    }

    ${up(breakpoints.md)} {
      flex-direction: row;
      button {
        width: auto;
      }
    }
  `
);

export { MultistepWrapper, MultistepContent, ButtonsWrapper };
