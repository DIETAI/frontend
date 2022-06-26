import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const CheckedPopupWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem 1rem 8rem;
    background: ${palette.common.main};
    width: 100%;
    min-height: 6rem;
    border-radius: ${border.main} ${border.main} 0 0;

    p {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      svg {
        width: 60%;
        height: 60%;
        path {
          fill: ${palette.common.grey};
        }
      }
    }

    ${down(breakpoints.sm)} {
      button {
        display: none;
      }
    }

    ${up(breakpoints.sm)} {
      span {
        display: none;
      }
    }
  `
);

const PhoneModal = styled(motion.div)(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    background: ${palette.common.main};
    width: 20rem;
    border-radius: ${border.main};
    box-shadow: ${palette.common["box-shadow"]};

    p {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
  `
);

export { CheckedPopupWrapper, PhoneModal };
