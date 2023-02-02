import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const DefaultMealsWrapper = styled(motion.ul)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  `
);

interface IActiveItem {
  active: boolean;
}

const MealItem = styled(motion.li)<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
    active,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 1.6rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    transition: 0.3s ease-out;

    ${active &&
    css`
      border: 0.1rem solid ${palette.primary.main};

      h2 {
        color: ${palette.primary.main};
      }
    `}
  `
);

const MealItemHeader = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column-reverse;
    gap: 1.6rem;

    ${up(breakpoints.xs)} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `
);

const MealHeading = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;

    h2 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: ${border.rounded.sm};
      color: white;
      background: ${palette.primary.main};
      font-size: 1.4rem;
      font-weight: ${fontWeight.light};
    }
  `
);

const MealOptions = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
  `
);

interface IOptionType {
  optionType: "add" | "remove" | "more";
  open?: boolean;
}

const MealOption = styled.button<IOptionType>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
    optionType,
    open,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    border-radius: 50%;
    transition: 0.3s ease-out;
    :hover {
      opacity: 0.7;
    }

    svg {
      transition: 0.3s ease-out;
    }

    ${optionType === "add" &&
    css`
      background: #90ee9028;
      color: lightgreen;
      border: 0.1rem solid lightgreen;
    `};
    ${optionType === "remove" &&
    css`
      background: #ff000023;
      color: red;
      border: 0.1rem solid red;
    `};
    ${optionType === "more" &&
    css`
      background: ${palette.primary.main};
      color: white;
      border: 0.1rem solid ${palette.primary.main};
    `};

    ${open &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `};
  `
);

const DinnerTypesWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    /* min-height: 10rem; */
    border-left: 0.1rem dashed ${palette.primary.light};
    margin-left: 1rem;
  `
);

const DinnerType = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    span {
      width: 2rem;
      border-bottom: 0.1rem dashed ${palette.primary.light};
    }
  `
);

export {
  DefaultMealsWrapper,
  MealItem,
  MealItemHeader,
  MealHeading,
  MealOptions,
  MealOption,
  DinnerTypesWrapper,
  DinnerType,
};
