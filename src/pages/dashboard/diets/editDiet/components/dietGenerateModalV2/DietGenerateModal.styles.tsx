import styled, { css } from "styled-components";

const DietGenerateModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 4rem;
  `
);

export { DietGenerateModalContainer };
