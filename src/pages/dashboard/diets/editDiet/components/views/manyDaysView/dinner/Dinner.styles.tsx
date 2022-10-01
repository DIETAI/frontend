import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const DietDinnerWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    position: relative;
    cursor: grab;
  `
);

const DietDinner = styled.div(
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
    width: 100%;
    gap: 1.5rem;
    padding: 1.5rem 1rem;

    h4 {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const DietDinnerTotalWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    background: ${palette.common.contrast};
    padding: 1rem;
    border-radius: ${border.rounded.lg} ${border.rounded.lg} 0 0;

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const DietDinnerOptionsWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1.5rem;
    background: ${palette.common.main};
    padding: 1rem;
    border-radius: ${border.rounded.lg} ${border.rounded.lg} 0 0;

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

interface IOptionType {
  optionType: "edit" | "delete" | "info";
}

const OptionWrapper = styled.div<IOptionType>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    optionType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: ${border.rounded.sm};
    transition: 0.3s ease-out;

    cursor: pointer;
    :hover {
      opacity: 0.6;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    ${optionType === "edit" &&
    css`
      background: #ffcf752f;
      svg {
        path {
          fill: orange;
        }
      }
    `}

    ${optionType === "delete" &&
    css`
      background: #ff000029;
      svg {
        path {
          fill: red;
        }
      }
    `}

    ${optionType === "info" &&
    css`
      background: #0000ff30;
      svg {
        path {
          fill: blue;
        }
      }
    `}
  `
);

export {
  DietDinnerWrapper,
  DietDinner,
  DietDinnerTotalWrapper,
  DietDinnerOptionsWrapper,
  OptionWrapper,
};
