import styled, { css } from "styled-components";

const HomeInfoWrapper = styled.div(
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
    padding: 4rem;
    width: 100%;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    max-width: ${breakpoints.lg};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;

    img {
      width: 19rem;
      height: 19rem;
      object-fit: contain;
    }

    ${up(breakpoints.lg)} {
      flex-direction: row;
      justify-content: space-between;
    }
  `
);

const InfoHeading = styled.div(
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
    gap: 3rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      max-width: 40rem;
    }
  `
);

const ButtonWrapper = styled.div(
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
    gap: 1rem;

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

export { HomeInfoWrapper, InfoHeading, ButtonWrapper };
