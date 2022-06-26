import styled, { css } from "styled-components";

import { IImageSelectProps } from "./ImageSelect.interfaces";

const ImageSelectWrapper = styled.div<Pick<IImageSelectProps, "fullWidth">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    fullWidth,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    height: 25rem;
    width: 20rem;
    transition: 0.3s ease-out;
    padding: 2rem;
    cursor: pointer;
    border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm};

    ${fullWidth &&
    css`
      max-width: 100%;
      width: 100%;
    `}

    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 2.5rem;
        height: 2.5rem;
        path {
          fill: ${palette.common.slate};
        }
      }
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
    }
  `
);

export { ImageSelectWrapper };
