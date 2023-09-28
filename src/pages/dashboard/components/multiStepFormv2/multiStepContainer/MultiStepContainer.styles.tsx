import styled, { css } from "styled-components";

const FormContainer = styled.form(
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
    margin-top: 4rem;

    flex-direction: column;

    ${up(breakpoints.lg)} {
      position: relative;
    }

    ${up(breakpoints.xl)} {
      flex-direction: row;
      margin-top: 7.2rem;
    }
  `
);

export { FormContainer };
