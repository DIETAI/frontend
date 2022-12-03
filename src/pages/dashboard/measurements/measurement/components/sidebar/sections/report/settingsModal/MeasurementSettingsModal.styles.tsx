import styled, { css } from "styled-components";

const ModalContentWrapper = styled.div(
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
    width: 100%;
  `
);

const ContentWrapper = styled.div(
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
    gap: 1rem;
    width: 100%;

    img {
      width: 20rem;
      height: 20rem;
      object-fit: contain;
    }

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      text-align: center;
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      text-align: center;
    }

    input {
      padding: 0.7rem;
      border-radius: ${border.rounded.sm};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      border: 0.1rem solid ${palette.common.slate};
      letter-spacing: 0.05rem;
      background: transparent;
      transition: 0.1s ease-out;
      width: 100%;
      max-width: 40rem;
    }

    input:focus {
      outline: none;
      border: 0.1rem solid ${palette.primary.main};
    }

    button {
      margin-top: 2rem;
    }

    ${up(breakpoints.sm)} {
      input {
        max-width: 25rem;
      }
    }
  `
);

export { ModalContentWrapper, ContentWrapper };
