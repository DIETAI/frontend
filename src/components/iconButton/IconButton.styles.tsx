import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { IIconButtonProps } from "./IconButton.interfaces";

const IconButtonWrapper = styled.button<
  Pick<IIconButtonProps, "iconReverse" | "active">
>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
    iconReverse,
    active,
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
    position: relative;

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

    ${active &&
    css`
      background: ${palette.primary.light};
      pointer-events: none;
      svg {
        path {
          fill: ${palette.primary.main};
        }
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

const IconButtonModal = styled(motion.div)(
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
    justify-content: center;
    position: absolute;
    top: 110%;
    right: 0;
    background: ${palette.common.main};
    box-shadow: ${palette.common["box-shadow"]};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    padding: 0.5rem;
    width: 15rem;

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
    }
  `
);

export { IconButtonWrapper, IconButtonModal };
