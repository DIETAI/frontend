import styled, { css } from "styled-components";

const DeleteDinnerPortionModalWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
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
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    button {
      margin-top: 2rem;
    }
  `
);

const DietsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    h3 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin: 1rem 0;
    }
  `
);

const List = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin: 1rem 0;
  `
);

const Diet = styled.li(
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
    gap: 1rem;
    width: 100%;
    padding: 2rem;
    background: ${palette.common.contrast};
    border-radius: ${border.rounded.md};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
    color: ${palette.common.text};

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background: ${palette.primary.light};
      border: 0.1rem solid ${palette.primary.light};

      svg {
        width: 2rem;
        height: 2rem;
        path {
          fill: ${palette.primary.main};
        }
      }
    }
  `
);

export {
  DeleteDinnerPortionModalWrapper,
  ContentWrapper,
  DietsWrapper,
  List,
  Diet,
};
