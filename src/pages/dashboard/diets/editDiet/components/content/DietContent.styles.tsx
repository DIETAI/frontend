import styled, { css } from "styled-components";

const DietContentWrapper = styled.div(
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
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    gap: 4rem;
    padding: 2rem;
    border-radius: ${border.rounded.md};
    margin-top: 2rem;
    min-height: 60rem;

    /* ${up(breakpoints.xs)} {
      padding: 6rem;
    } */
  `
);

export { DietContentWrapper };
