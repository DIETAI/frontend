import styled, { css } from "styled-components";

const MealWrapper = styled.div(
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
    width: 100%;
    min-height: 20rem;
    padding: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
  `
);

export { MealWrapper };
