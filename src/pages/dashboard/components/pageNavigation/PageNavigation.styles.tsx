import styled, { css } from "styled-components";

const PageNavigationWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;

    a {
      font-size: 1.3rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
    }
  `
);

export { PageNavigationWrapper };
