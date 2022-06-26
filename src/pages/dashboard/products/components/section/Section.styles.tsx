import styled, { css } from "styled-components";

const SectionWrapper = styled.form(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    padding: 0 5rem;
  `
);

export { SectionWrapper };
