import styled, { css } from "styled-components";

const AuthOptionWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
  `
);

const PersonWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding, border },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      width: 4rem;
      height: 4rem;
      object-fit: cover;
      border-radius: ${border.rounded.sm};
    }
  `
);

const PersonInfoWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const ListWrapper = styled.ul(
  ({
    theme: {
      palette,
      layout: { padding, border },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
    list-style: none;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding: 1rem;
      border-radius: ${border.rounded.sm};
      transition: 0.3s ease-out;
      cursor: pointer;

      :hover {
        background: ${palette.common.contrast};
      }

      a {
        font-size: 1.4rem;
        font-weight: ${fontWeight.medium};
        color: ${palette.common.text};
      }
    }
  `
);

const SignoutButton = styled.button(
  ({
    theme: {
      palette,
      layout: { padding, border },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    width: 100%;
    padding: 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.primary.main};

    color: ${palette.primary.main};
    border: 0.1rem solid ${palette.primary.light};
    margin: 1rem 0;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    color: white;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }
  `
);

const Divider = styled.span(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    width: 100%;
    border-bottom: 0.1rem dashed ${palette.primary.light};
  `
);

export {
  AuthOptionWrapper,
  PersonWrapper,
  PersonInfoWrapper,
  ListWrapper,
  Divider,
  SignoutButton,
};
