import styled, { css } from "styled-components";

const FormContainer = styled.div(
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
    width: 70rem;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 1px solid ${palette.common.border};
    box-shadow: ${palette.common["box-shadow"]};
    gap: 2rem;
    padding: 4rem 2rem;
    border-radius: ${border.rounded.md};
    z-index: 10;

    form {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      width: 100%;
      gap: 2rem;

      button {
        margin-top: 2rem;
        width: 100%;
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
      font-size: ${fontSize.xl};
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

const SelectedRoleWrapper = styled.div(
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
    width: 100%;
    gap: 2rem;

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

const SelectedRole = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    gap: 2rem;
    flex-grow: 1;
    width: 100%;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      object-fit: cover;
    }

    h3 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.semibold};
      color: ${palette.primary.main};
      text-align: center;
    }
  `
);

export { FormContainer, FormHeading, SelectedRoleWrapper, SelectedRole };
