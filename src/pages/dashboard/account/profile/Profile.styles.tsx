import styled, { css } from "styled-components";

const AccountContainer = styled.div(
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
    width: 100%;
    max-width: ${breakpoints.lg};
    margin: auto;
    margin-top: 5rem;
    gap: 3rem;
    flex-direction: column;

    ${up(breakpoints.xl)} {
      flex-direction: row;
    }
  `
);

const AccountInfoWrapper = styled.div(
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
    padding: 4rem;
    width: 100%;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    max-width: ${breakpoints.lg};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;

    img {
      width: 15rem;
      height: 15rem;
      object-fit: cover;
      border-radius: ${border.rounded.md};
    }
  `
);

const BackgroundImg = styled.img(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    width: 100%;
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};
    object-fit: cover;
    min-height: 10rem;
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

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

export {
  AccountContainer,
  AccountInfoWrapper,
  BackgroundImg,
  PersonInfoWrapper,
};
