import styled, { css } from "styled-components";
import { motion } from "framer-motion";

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
  `
);
const PortionsMacroContainer = styled.div(
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
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    ${up(breakpoints.md)} {
      flex-direction: row;
    }
  `
);

const PortionFilterWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin: 2rem 0;

    ${up(breakpoints.sm)} {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      gap: 2rem;
    }
  `
);

const PortionFilterActions = styled.div(
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
    gap: 2rem;
    margin: 2rem 0;
    flex-direction: column;
    width: 100%;

    ${up(breakpoints.sm)} {
      align-items: center;
      flex-direction: row;
      width: auto;
    }
  `
);

interface IActiveOption {
  activeOption: boolean;
}

const PortionNavItem = styled.li<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    activeOption,
  }) => css`
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.contrast};
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.4rem;
    transition: 0.3s ease-out;
    cursor: pointer;
    width: 100%;

    ${activeOption &&
    css`
      background: ${palette.primary.main};
      color: white;
    `}

    :hover {
      opacity: 0.7;
    }

    ${up(breakpoints.sm)} {
      width: auto;
    }
  `
);
const PortionsListWrapper = styled.ul(
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
    width: 100%;
  `
);

interface IActivePortion {
  active: boolean;
}

const PortionWrapper = styled.div<IActivePortion>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem dashed ${palette.common.slate};
    cursor: pointer;
    transition: 0.3s ease-out;
    width: 100%;

    ${active &&
    css`
      pointer-events: none;
      border: 0.1rem dashed ${palette.primary.main};
    `}
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
      media: { up, breakpoints },
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
    width: 100%;

    ${up(breakpoints.sm)} {
      width: auto;
    }
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
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};

    ${up(breakpoints.sm)} {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      gap: 1rem;
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
    /* position: absolute; */
    /* top: 0;
    left: 0; */

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

export {
  PortionsWrapper,
  PortionsMacroContainer,
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
  PortionFilterWrapper,
  PortionFilterActions,
  PortionNavItem,
  LoadingWrapper,
  PortionsListWrapper,
};
