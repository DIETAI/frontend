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
    gap: 1rem;
    width: 100%;

    img {
      width: 20rem;
      height: 20rem;
      object-fit: contain;
    }

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    button {
      margin-top: 2rem;
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
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem dashed ${palette.primary.light};
    transition: 0.3s ease-out;
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
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding: 1rem 0;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
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
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    gap: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
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
    min-width: 8rem;
  `
);

const ProductTotalFeaturesWrapper = styled.ul(
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
    margin-right: 4rem;
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
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.light};
      font-size: ${fontSize.m};
    }
  `
);

const GeneratedMealNavButtonsWrapper = styled.div(
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
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    margin-bottom: 3rem;
    width: 100%;
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

export {
  GenerateMealModalContainer,
  ContentWrapper,
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
};
