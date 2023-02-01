import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const GenerateMealModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `
);

const ContentWrapper = styled.div(
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
    flex-direction: column;
    gap: 4rem;
    width: 100%;
  `
);

const MealToGenerateOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 2rem;

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
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
      media: { up, down, breakpoints },
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
    width: 100%;
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

    ${up(breakpoints.sm)} {
      width: 25rem;
    }
  `
);

const ContentButtonsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

const PortionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  `
);

const PortionWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem dashed ${palette.primary.light};
    transition: 0.3s ease-out;

    ${up(breakpoints.md)} {
      padding: 3rem;
    }
  `
);

const PortionHeadingWrapper = styled.div(
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
    gap: 2rem;
  `
);

const PortionHeading = styled.div(
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
    gap: 2rem;
    padding: 1rem 0;
    flex-direction: column;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    ${up(breakpoints.md)} {
      flex-direction: row;
    }
  `
);

const FieldNumberWrapper = styled.span(
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
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.primary.light};

    p {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
  `
);

const PortionTotalWrapper = styled.div(
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
    width: 100%;
    transition: 0.3s ease-out;
    /* border: 0.1rem dashed ${palette.primary.light}; */
    border-radius: ${border.rounded.md};
    flex-direction: column;

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.l};
    }
  `
);

const PortionTotalFeaturesWrapper = styled.ul(
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
    width: 100%;
    flex-wrap: wrap;
    margin: 2rem 0;
  `
);

const PortionTotalFeature = styled.li(
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
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    /* background: ${palette.common.contrast}; */
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
  `
);

const ProductsWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  `
);

const ProductWrapper = styled.li(
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
    padding: 2rem;
    gap: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};

    ${up(breakpoints.sm)} {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
    }
  `
);

const ProductMainWrapper = styled.div(
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
    gap: 2rem;
  `
);

const ProductContentWrapper = styled.div(
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
    gap: 2rem;

    h3 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
      font-size: ${fontSize.s};
    }
  `
);

const ProductPortionItem = styled.div(
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
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid #90ee9095;
    background: #90ee901a;
    color: lightgreen;
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
    width: 100%;

    ${up(breakpoints.sm)} {
      min-width: 8rem;
      width: auto;
    }
  `
);

const ProductTotalFeaturesWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: none;

    ${up(breakpoints.sm)} {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      width: 100%;
      flex-wrap: wrap;
      margin-right: 4rem;
    }
  `
);

const ProductTotalFeature = styled.li(
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
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    /* background: ${palette.common.contrast}; */
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.1rem;
  `
);

const MealGenerateContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 30rem;
    width: 100%;
    gap: 2rem;
  `
);

const LoadingWrapper = styled(motion.div)(
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
    min-height: 30rem;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;

    gap: 2rem;
    padding: 2rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.main};

    h2 {
      color: ${palette.primary.main};
      font-weight: ${fontWeight.medium};
      font-size: ${fontSize.m};
    }
  `
);

const GeneratedMealNavWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 2rem;

    h3 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.light};
      font-size: ${fontSize.m};
    }

    ${up(breakpoints.xl)} {
      flex-direction: row;
      justify-content: space-between;
    }
  `
);

const GeneratedMealNavButtonsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 2rem;

    ${up(breakpoints.lg)} {
      flex-direction: row;
    }
  `
);

const GeneratedMealTotalWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
  `
);

const OneDayViewTotalWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 2rem;

    flex-wrap: wrap;
  `
);

interface ITotalVariant {
  variant?: "red" | "yellow" | "green";
}

const OneDayViewTotalItem = styled.li<ITotalVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    variant,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    gap: 1rem;
    flex-grow: 1;

    h2 {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
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

const TotalItem = styled.li<ITotalVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    variant,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    gap: 0.5rem;
    flex-grow: 1;
    position: relative;

    h2,
    h3 {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    ${variant === "green" &&
    css`
      h3 {
        color: lightgreen;
      }
    `}

    ${variant === "yellow" &&
    css`
      h3 {
        color: orange;
      }
    `}

    ${variant === "red" &&
    css`
      h3 {
        color: red;
      }
    `}
  `
);

const TotalItemModal = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: ${palette.common.main};
    border-radius: ${border.rounded.sm};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: ${palette.common["box-shadow"]};

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }
  `
);

const SelectedGroupInfo = styled.div(
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
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};
    padding: 2rem;

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.light};
    }

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    }
  `
);

export {
  GenerateMealModalContainer,
  ContentWrapper,
  MealToGenerateOptionsWrapper,
  MealToGenerateOption,
  ContentButtonsWrapper,
  PortionsWrapper,
  PortionWrapper,
  PortionHeadingWrapper,
  PortionHeading,
  FieldNumberWrapper,
  PortionTotalWrapper,
  PortionTotalFeaturesWrapper,
  PortionTotalFeature,
  ProductsWrapper,
  ProductWrapper,
  ProductMainWrapper,
  ProductContentWrapper,
  ProductPortionItem,
  ProductTotalFeaturesWrapper,
  ProductTotalFeature,
  MealGenerateContentWrapper,
  LoadingWrapper,
  GeneratedMealNavWrapper,
  GeneratedMealNavButtonsWrapper,
  GeneratedMealTotalWrapper,
  OneDayViewTotalWrapper,
  OneDayViewTotalItem,
  TotalItem,
  TotalItemModal,
  SelectedGroupInfo,
};
