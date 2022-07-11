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

    //w-fit flex flex-col 2xl:w-full
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
    /* border-top: 0.1rem solid ${palette.common.border}; */
    border-bottom: 0.1rem solid ${palette.common.border};

    //w-fit flex border-x border-b  2xl:w-full
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
    justify-content: flex-start;
    /* width: 16rem; */
    /* border-left: 0.1rem solid ${palette.common.border}; */
    padding: 2rem;
    /* flex: 1; */
    position: relative;
    width: 26rem;
    flex: 1;

    //w-40 border-r p-5 2xl:flex-auto relative
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
    /* width: 16rem; */
    /* border-right: 0.1rem solid ${palette.common.border}; */
    border-left: 0.1rem solid ${palette.common.border};

    //flex flex-col divide-y
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

    //flex
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
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem;
    width: 26rem;
    /* border-right: 0.1rem solid ${palette.common.border}; */

    //w-40 p-5 border-r 2xl:w-64
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
    /* border-right: 0.1rem solid ${palette.common.border}; */
    border-left: 0.1rem solid ${palette.common.border};

    //flex flex-col divide-y
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

    //flex flex-grow
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
    width: 12rem; //25rem przy nazwie produktu
    padding: 2rem;
    border-right: 0.1rem solid ${palette.common.border};
    /* border-bottom: 0.1rem solid ${palette.common.border}; */

    :last-of-type {
      border: none;
    }

    //w-40 p-5 border-r flex 2xl:w-64
    //w-20 p-5 border-r last-of-type:border-none 2xl:w-32
  `
);

export {
  MealWrapper,
  Meal,
  MealNameWrapper,
  MealDinnersWrapper,
  DinnerWrapper,
  DinnerNameWrapper,
  DinnerProductsWrapper,
  DinnerProduct,
  DinnerProductItem,
};
