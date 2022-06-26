import styled, { css } from "styled-components";

const DayWrapper = styled.div(
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
    width: 30rem;
    min-height: 50rem;
    flex-grow: 1;
    padding: 2rem;
    gap: 2rem;
    border: 0.1rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
  `
);

export { DayWrapper };
