import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const MealToGenerateOptionsWrapper = styled.div(
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
    gap: 2rem;
  `
);

interface IActiveOption {
  active: boolean;
  type: "newMeal" | "changeAmountAddedMealDinners";
  disabled?: boolean;
}

const MealToGenerateOption = styled.div<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
    type,
    disabled,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    width: 25rem;
    min-height: 25rem;
    border: 0.2rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};
    cursor: pointer;
    transition: 0.3s ease-out;
    padding: 2rem;

    svg {
      width: 4rem;
      height: 4rem;
      path {
        fill: ${palette.primary.main};
      }
    }

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      text-align: center;
    }

    :hover {
      opacity: 0.7;
    }

    ${type === "changeAmountAddedMealDinners" &&
    css`
      svg {
        path {
          fill: orange;
        }
      }
    `}

    ${type === "newMeal" &&
    css`
      svg {
        path {
          fill: lightgreen;
        }
      }
    `}

    ${disabled &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}

    ${active &&
    css`
      border: 0.2rem dashed ${palette.primary.main};
    `}
  `
);

const ContentButtonsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 2rem;
  `
);

export {
  MealToGenerateOptionsWrapper,
  MealToGenerateOption,
  ContentButtonsWrapper,
};
