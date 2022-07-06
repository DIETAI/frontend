import styled, { css } from "styled-components";

import { IImageProps } from "./Image";

const ImageWrapper = styled.div<
  Pick<IImageProps, "roundedDataGrid" | "roundedSelect">
>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    roundedDataGrid,
    roundedSelect,
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
  `
);

export { ImageWrapper };
