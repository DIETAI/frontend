import styled, { css } from "styled-components";

import { IIconButtonProps } from "./IconButton.interfaces";

const IconButtonWrapper = styled.button<Pick<IIconButtonProps, "iconReverse">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
    iconReverse,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: ${border.rounded.sm};
    background: transparent;
    transition: 0.3s ease-out;
    cursor: pointer;
    border: none;

    svg {
      width: 2rem;
      height: 2rem;
      transition: 0.3s ease-out;
      path {
        fill: ${palette.common.grey};
      }
    }

    ${iconReverse &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}

    :hover {
      background: ${palette.primary.light};

      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    }
  `
);

export { IconButtonWrapper };
