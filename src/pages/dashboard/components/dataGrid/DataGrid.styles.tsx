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
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 12rem;
    gap: 3rem;
  `
);

export { DataGridWrapper };
