import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const BackToDietWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 6rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    background: ${palette.common.main};
    position: sticky;
    top: 10rem;
    z-index: 10;
    padding: 2rem;
    box-shadow: ${palette.common["box-shadow"]};
  `
);
const DietNameWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.5rem;
      height: 3.5rem;
      border: 0.1rem solid ${palette.primary.light};
      border-radius: ${border.rounded.sm};
      background: ${palette.common.contrast};
      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: ${palette.primary.main};
        }
      }
    }

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }
  `
);

export { BackToDietWrapper, DietNameWrapper };
