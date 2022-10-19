import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const TotalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    flex-grow: 1;

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }
  `
);

const TotalHeadingWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${palette.common.contrast};

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }
  `
);

const TotalWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
    padding-bottom: 0;

    h3 {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const TotalMacroItemsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
    padding-bottom: 1rem;

    :nth-last-of-type(2) {
      border-bottom: 0.1rem dashed ${palette.primary.light};
    }

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

interface ISumItemVariant {
  variant?: "red" | "yellow" | "green";
}

const SumItem = styled.div<ISumItemVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    variant,
  }) => css`
    /* display: flex; */
    /* width: 12rem; */
    /* padding: 2rem;
    border-right: 0.1rem solid ${palette.common.border}; */
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.2rem;

    /* span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
    } */

    /* :last-of-type {
      border: none;
    } */

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${variant === "green" &&
    css`
      b {
        color: lightgreen;
      }
    `}

    ${variant === "yellow" &&
    css`
      b {
        color: orange;
      }
    `}

    ${variant === "red" &&
    css`
      b {
        color: red;
      }
    `}
  `
);

const SumItemModal = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    left: 0;
    top: 110%;
    /* width: 100%; */
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    z-index: 10;
    padding: 1rem 2rem;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    box-shadow: ${palette.common["box-shadow"]};
    gap: 2rem;
    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }
  `
);

const SumItemNav = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }
  `
);

const SumItemNavOption = styled(motion.div)(
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
    gap: 1rem;

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }
  `
);

const PerfectProcent = styled(motion.div)<ISumItemVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    variant,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${variant === "green" &&
    css`
      b {
        color: lightgreen;
      }
    `}

    ${variant === "yellow" &&
    css`
      b {
        color: orange;
      }
    `}

    ${variant === "red" &&
    css`
      b {
        color: red;
      }
    `}
  `
);

const PercentageRangeWrapper = styled(motion.div)<ISumItemVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    variant,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 10rem;

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${variant === "green" &&
    css`
      b {
        color: lightgreen;
      }
    `}

    ${variant === "yellow" &&
    css`
      b {
        color: orange;
      }
    `}

    ${variant === "red" &&
    css`
      b {
        color: red;
      }
    `}
  `
);

const PercentageRangeItem = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

export {
  TotalContainer,
  TotalHeadingWrapper,
  TotalWrapper,
  TotalMacroItemsWrapper,
  SumItem,
  SumItemModal,
  PerfectProcent,
  PercentageRangeWrapper,
  PercentageRangeItem,
};
