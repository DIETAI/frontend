import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const NotValidPortionWrapper = styled.div(
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

    h3 {
      font-size: 1.5rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      margin-top: 1rem;
    }
  `
);

const CloseButtonWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 0;
    right: 0;
  `
);

const Container = styled.div(
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
    gap: 2rem;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    backdrop-filter: blur(2px);
    height: 100%;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  `
);
const RecommendDinnerPortionWrapper = styled.div(
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
    gap: 2rem;
    width: 90rem;
    height: 100%;
    background: ${palette.common.main};
    border-radius: 0 ${border.rounded.md} ${border.rounded.md} 0;
    padding: 4rem;
    box-shadow: ${palette.common["box-shadow"]};
    pointer-events: all;
  `
);

const FormWrapper = styled.form(
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
    height: 100%;
    gap: 2rem;
    position: relative;
  `
);

const ButtonWrapper = styled.div(
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
  `
);

const ProductsContainer = styled.div(
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
    /* padding: 2rem; */
    gap: 2rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /* height: 100%; */
  `
);

const ProductWrapper = styled.div(
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
    padding: 2rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};
    gap: 2rem;
    width: 100%;

    position: relative;
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
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    /* padding: 2rem; */
    gap: 1rem;

    width: 100%;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    h3 {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      margin-top: 1rem;
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
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
  `
);

const ProductPortionsWrapper = styled.ul(
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
  `
);

interface IActive {
  active: boolean;
}

const ProductPortionWrapper = styled.li<IActive>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem dashed ${palette.primary.main};
    /* background: ${palette.common.contrast}; */
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
    transition: 0.3s ease-out;
    cursor: pointer;
    :hover {
      opacity: 0.6;
    }

    ${active &&
    css`
      background: ${palette.primary.main};
      border: 0.1rem solid ${palette.primary.main};
      color: white;
    `}
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
    position: absolute;
    top: 2rem;
    right: 2rem;
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
    /* margin: 2rem 0; */
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
    background: ${palette.common.contrast};
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
  `
);

export {
  Container,
  RecommendDinnerPortionWrapper,
  FormWrapper,
  ProductsContainer,
  ButtonWrapper,
  ProductWrapper,
  ProductMainWrapper,
  ProductContentWrapper,
  ProductPortionsWrapper,
  ProductPortionWrapper,
  ProductPortionItem,
  ProductTotalFeaturesWrapper,
  ProductTotalFeature,
  NotValidPortionWrapper,
  CloseButtonWrapper,
};
