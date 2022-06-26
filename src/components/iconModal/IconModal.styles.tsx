import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const IconModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    position: relative;
  `
);

const IconModalWrapper = styled.div(
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
    width: 3.5rem;
    height: 3.5rem;
    border-radius: ${border.rounded.sm};
    background: transparent;
    transition: 0.3s ease-out;
    cursor: pointer;
    z-index: 50;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${border.rounded.sm};
    }

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: ${palette.common.grey};
      }
    }

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

const ModalContentContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 100%;
    right: 0;
    gap: 1rem;
    background: transparent;
    padding: 2rem 0;
  `
);

const ModalContentWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: ${palette.common.main};
    padding: 3rem;
    border: 0.1rem solid ${palette.primary.light};
    box-shadow: ${palette.common["box-shadow"]};
    border-radius: ${border.rounded.md};
    /* min-height: 10rem;
    width: 25rem; */
  `
);

export {
  IconModalContainer,
  IconModalWrapper,
  ModalContentContainer,
  ModalContentWrapper,
};
