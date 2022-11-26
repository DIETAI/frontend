import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ListContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    /* padding: 2rem; */
    position: relative;
    min-height: 35rem;
    overflow-y: hidden;

    ${up(breakpoints.lg)} {
      flex-direction: row;
    }
  `
);

const LoadingWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    /* z-index: 10; */
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;
    width: 100%;
    transition: 0.3s ease-out;
  `
);

const ErrorWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 4rem;
    /* border: 0.1rem solid #ff000025; */
    border-radius: ${border.rounded.sm};
    /* background: #ff000019; */
    min-height: 20rem;

    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};

    svg {
      width: 3rem;
      height: 3rem;
      path {
        fill: red;
      }
    }

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      text-align: center;
    }
  `
);

export { ListContainer, LoadingWrapper, ErrorWrapper };
