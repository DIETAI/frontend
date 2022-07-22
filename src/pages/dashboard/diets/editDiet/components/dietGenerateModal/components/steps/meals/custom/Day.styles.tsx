import styled, { css } from "styled-components";

const DayWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    width: 20rem;
    min-height: 30rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
  `
);

export { DayWrapper };
