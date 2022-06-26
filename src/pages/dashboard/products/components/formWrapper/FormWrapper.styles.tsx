import styled, { css } from "styled-components";

const FormWrapper = styled.div(
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
    width: 50rem;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 2px solid ${palette.common.border};
    gap: 2rem;
    padding: 4rem 2rem;
    border-radius: ${border.rounded.md};
    z-index: 10;
    margin-left: 3rem;
    margin-top: 3rem;

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 2rem;

      button {
        margin-top: 2rem;
      }
    }

    ${up(breakpoints.xs)} {
      padding: 6rem;
    }
  `
);

const FormHeading = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    margin-bottom: 2rem;

    h1 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }
  `
);

export { FormWrapper, FormHeading };
