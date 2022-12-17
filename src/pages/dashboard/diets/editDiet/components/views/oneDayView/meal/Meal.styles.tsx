import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const MealWrapper = styled.div(
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
    color: ${palette.common.text};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
  `
);

const Meal = styled.div(
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
    border-bottom: 0.1rem solid ${palette.common.border};
  `
);

const MealNameWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 2rem;
    position: relative;
    flex-grow: 1;
    min-width: 26rem;
    gap: 2rem;
  `
);

const MealNameHeading = styled.div(
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
    position: relative;
    width: 100%;
    gap: 2rem;
    position: relative;
  `
);

const MealDinnersWrapper = styled.div(
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
  `
);

const DinnerWrapper = styled.div(
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

    :not(:last-child) {
      border-bottom: 0.1rem solid ${palette.common.border};
    }
  `
);

const DinnerNameWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    gap: 2rem;
    padding: 2rem;
    width: 26rem;
    border-left: 0.1rem solid ${palette.common.border};

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
    }
  `
);

const AddDinnerButtonWrapper = styled.button(
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
    padding: 1rem 2rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    background: transparent;
    color: ${palette.primary.main};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    cursor: pointer;
    transition: 0.3s ease-out;

    svg {
      width: 1.2rem;
      height: 1.2rem;

      path {
        fill: ${palette.primary.main};
      }
    }

    :hover {
      background: ${palette.primary.main};
      color: white;

      svg {
        path {
          fill: white;
        }
      }
    }
  `
);

const DinnerProductsWrapper = styled.div(
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
    border-left: 0.1rem solid ${palette.common.border};
  `
);

const DinnerProduct = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-grow: 1;
    border-bottom: 0.1rem solid ${palette.common.border};

    :last-of-type {
      border: none;
    }
  `
);

const DinnerProductItem = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    width: 12rem;
    padding: 2rem;
    border-right: 0.1rem solid ${palette.common.border};

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
    }

    :first-of-type {
      width: 26rem;
    }

    :last-of-type {
      border: none;
    }
  `
);

const EmptyMealWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    padding: 4rem;
    width: 112rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    border-left: 0.1rem solid ${palette.common.border};
  `
);

const EmptyMealContent = styled.div(
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
    border: 0.1rem dashed ${palette.primary.light};
    min-height: 22rem;
    background: ${palette.common.contrast};
    border-radius: ${border.rounded.md};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.6;
    }

    svg {
      width: 4rem;
      height: 4rem;
      path {
        fill: ${palette.primary.light};
      }
    }
  `
);

const SumWrapper = styled.div(
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
  `
);

interface ISumHeadingVariant {
  variant: "mealSum" | "dinnerSum";
}

const SumHeadingWrapper = styled.div<ISumHeadingVariant>(
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
    align-self: stretch;
    gap: 2rem;
    padding: 2rem;

    border-right: 0.1rem solid ${palette.common.border};

    ${variant === "mealSum" &&
    css`
      width: 52.1rem;
      border-left: 0.1rem solid ${palette.common.border};
    `}

    ${variant === "dinnerSum" &&
    css`
      width: 26rem;
    `}
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
    display: flex;
    width: 12rem;
    padding: 2rem;
    border-right: 0.1rem solid ${palette.common.border};
    position: relative;

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
    }

    :last-of-type {
      border: none;
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
    top: 105%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 1rem 2rem;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    box-shadow: ${palette.common["box-shadow"]};
    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
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
  MealWrapper,
  Meal,
  MealNameWrapper,
  MealNameHeading,
  MealDinnersWrapper,
  DinnerWrapper,
  DinnerNameWrapper,
  DinnerProductsWrapper,
  DinnerProduct,
  DinnerProductItem,
  AddDinnerButtonWrapper,
  EmptyMealWrapper,
  EmptyMealContent,
  SumWrapper,
  SumHeadingWrapper,
  SumItem,
  SumItemModal,
  DietDinnerOptionsWrapper,
  OptionWrapper,
};
