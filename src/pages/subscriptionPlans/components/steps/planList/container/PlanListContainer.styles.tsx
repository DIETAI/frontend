import styled, { css } from "styled-components";

const PlanListContainer = styled.div(
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
    width: 100%;
    gap: 2rem;
    margin-top: 2rem;
  `
);

export { PlanListContainer };
