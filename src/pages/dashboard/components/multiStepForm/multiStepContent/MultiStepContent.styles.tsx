import styled, { css } from "styled-components";

const MultiStepContainer = styled.form(
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
    flex-direction: column;
    gap: 4rem;
    position: relative;
    width: 100%;

    ${up(breakpoints.lg)} {
      /* width: auto; */
      width: 100%;
      flex-direction: row;
    }
  `
);

const MultiStepContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;
    width: 100%;

    /* ${up(breakpoints.xl)} {
      width: 70rem;
      flex: none;
    } */
  `
);

const SaveOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    width: 30rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: sticky;
    bottom: 1rem;
    left: 0;
    width: 100%;
    z-index: 10;
    padding: 2rem;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};

    button {
      width: 100%;
    }

    p {
      display: none;
    }

    span {
      margin: 0 1rem;
      border-radius: 0.4rem;
      padding: 0.5rem 1rem;
      background: ${palette.primary.light};
      color: ${palette.primary.main};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }

    ${up(breakpoints.lg)} {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      top: 14rem;
      left: 0;
      flex-direction: column;
      padding: 4rem;
      width: 30rem;

      p {
        display: block;
        font-size: ${fontSize.s};
        font-weight: ${fontWeight.light};
        color: ${palette.common.text};
      }
    }
  `
);

export { MultiStepContainer, MultiStepContentWrapper, SaveOptionsWrapper };
