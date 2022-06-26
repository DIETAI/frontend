import styled, { css } from "styled-components";

const FooterWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    background: ${palette.common.main};

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      letter-spacing: 0.05rem;
    }
  `
);

export { FooterWrapper };
