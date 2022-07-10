import styled, { css } from "styled-components";

const DietNavWrapper = styled.div(
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
    justify-content: space-between;
    width: 100%;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    gap: 4rem;
    padding: 2rem;
    border-radius: ${border.rounded.md};
    margin-top: 2rem;
  `
);

const OptionsWrapper = styled.div(
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
    gap: 1rem;
  `
);

export { DietNavWrapper, OptionsWrapper };
