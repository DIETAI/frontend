import styled, { css } from "styled-components";

const PortionGroupsWrapper = styled.ul(
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
    width: 100%;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 2rem 0;
  `
);

export { PortionGroupsWrapper };
