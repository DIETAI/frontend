import styled, { css } from "styled-components";

const HomeFeaturesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    width: 100%;
    max-width: ${breakpoints.lg};
    gap: 3rem;
    flex-direction: column;

    ${up(breakpoints.md)} {
      flex-direction: row;
      flex-wrap: wrap;
    }
  `
);

const HomeFeatureItem = styled.div(
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
    justify-content: flex-start;
    flex-direction: column;
    padding: 4rem;

    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    max-width: ${breakpoints.lg};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;
    flex-grow: 1;
    cursor: pointer;
    transition: 0.3s ease-out;
    width: 100%;

    :hover {
      border: 0.1rem dashed ${palette.primary.main};
    }

    img {
      width: 6rem;
      height: 6rem;
      object-fit: contain;
    }

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.m};
    }

    ${up(breakpoints.lg)} {
      flex-direction: row;
      width: 25rem;
    }
  `
);

export { HomeFeaturesWrapper, HomeFeatureItem };
