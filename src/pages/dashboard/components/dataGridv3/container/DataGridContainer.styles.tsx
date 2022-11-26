import styled, { css } from "styled-components";

const DataGridWrapper = styled.div(
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
    align-self: center;
    flex-direction: column;
    width: 100%;

    /* gap: 3rem; */
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    padding: 2rem;
    max-width: ${breakpoints.lg};

    ${up(breakpoints.xs)} {
      padding: 4rem;
      margin-top: 5rem;
    }
  `
);

export { DataGridWrapper };
