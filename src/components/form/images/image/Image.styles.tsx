import styled, { css } from "styled-components";

import { IImageProps } from "./Image";

const ImageWrapper = styled.div<
  Pick<IImageProps, "roundedDataGrid" | "roundedSelect" | "roundedLarge">
>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    roundedDataGrid,
    roundedSelect,
    roundedLarge,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 25rem;
    border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm};

    svg {
      path {
        fill: ${palette.primary.light};
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${border.rounded.sm};
    }

    ${roundedDataGrid &&
    css`
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 50%;

      img {
        border-radius: 50%;
      }
    `}

    ${roundedSelect &&
    css`
      width: 8rem;
      height: 8rem;
      border: none;
      border-radius: 50%;

      img {
        border-radius: 50%;
      }
    `}

    ${roundedLarge &&
    css`
      width: 30rem;
      height: 30rem;
      border: none;
      border-radius: 50%;

      img {
        border-radius: 50%;
      }
    `}
  `
);

export { ImageWrapper };
