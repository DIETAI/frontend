import styled, { css } from "styled-components";

const PreferencesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    margin-top: 2rem;
  `
);

const OptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  `
);

const Option = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;

    span {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }
  `
);

const BoxWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;
  `
);

const BoxContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.light};
    }
  `
);

const Box = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};
  `
);

const BoxItem = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    padding: 1rem;
    background: ${palette.common.contrast};
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};
    color: ${palette.common.text};
    font-size: 1.4rem;
    font-weight: ${fontWeight.light};
  `
);

export {
  PreferencesWrapper,
  OptionsWrapper,
  Option,
  BoxWrapper,
  BoxContentWrapper,
  Box,
  BoxItem,
};
