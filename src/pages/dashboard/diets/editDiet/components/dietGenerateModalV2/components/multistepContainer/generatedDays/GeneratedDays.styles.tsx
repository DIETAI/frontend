import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const DaysContainer = styled(motion.div)(
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
    position: relative;
    gap: 1.5rem;

    overflow-x: auto;
  `
);

const DayWrapper = styled.div(
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
    width: 30rem;
    min-height: 50rem;
    /* flex-grow: 1; */
    padding: 1rem;
    gap: 2rem;
    border: 0.1rem solid ${palette.common.border};
    border-radius: ${border.rounded.md};
    /* cursor: pointer;
    transition: 0.3s ease-out; */

    /* :hover {
      box-shadow: ${palette.common["box-shadow"]};
    } */
  `
);

const DayTotalWrapper = styled.div(
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
    padding: 1rem;
    gap: 1rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const DayHeading = styled.div(
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

    h2 {
      font-size: ${fontSize.m};
      color: ${palette.common.text};
    }
  `
);

const DayTotal = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    list-style: none;
    gap: 0.5rem;
  `
);

const DayTotalItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    font-size: ${fontSize.xs};
    flex-grow: 1;

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      text-align: center;
      padding: 0.5rem;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background: ${palette.primary.main};
      border-radius: ${border.rounded.sm} ${border.rounded.sm} 0 0;
      padding: 0.2rem;
      /* border-radius: ${border.rounded.sm}; */
      color: white;
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
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

const DayMealsWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  `
);

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
    /* min-height: 20rem; */
    padding: 1rem;
    gap: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
  `
);

const MealTotalWrapper = styled.div(
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
    padding: 1rem;
    gap: 1rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const MealHeading = styled.div(
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
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    padding: 1rem;

    h3 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

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
    /* background: ${palette.common.contrast}; */
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    position: relative;
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

export {
  DaysContainer,
  DayWrapper,
  DayTotalWrapper,
  DayHeading,
  DayTotal,
  DayTotalItem,
  SumItem,
  SumItemModal,
  DayMealsWrapper,
  MealWrapper,
  MealTotalWrapper,
  MealHeading,
  DietDinnerWrapper,
  DietDinner,
  DietDinnerTotalWrapper,
};
