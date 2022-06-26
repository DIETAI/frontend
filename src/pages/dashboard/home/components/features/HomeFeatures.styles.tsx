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
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: ${breakpoints.lg};
    gap: 3rem;
    flex-wrap: wrap;
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
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 4rem;
    width: 25rem;
    min-height: 35rem;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    max-width: ${breakpoints.lg};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;
    flex-grow: 1;
  `
);

export { HomeFeaturesWrapper, HomeFeatureItem };
