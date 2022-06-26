import styled, { css } from "styled-components";

const ImageWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 20rem;
    height: 25rem;
    border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${border.rounded.sm};
    }
  `
);

export { ImageWrapper };
