import styled, { css } from "styled-components";

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

interface IIconButton {
  iconType: "delete" | "edit" | "info";
}

const IconOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    gap: 1rem;
  `
);

const IconButtonWrapper = styled.button<IIconButton>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    iconType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    ${iconType === "delete" &&
    css`
      background: #ff000018;
      border: 0.1rem solid #ff000024;
      svg {
        path {
          fill: red;
        }
      }
    `}

    ${iconType === "edit" &&
    css`
      background: #ffa6001e;
      border: 0.1rem solid #ffa60039;
      svg {
        path {
          fill: orange;
        }
      }
    `}

    ${iconType === "info" &&
    css`
      background: ${palette.common.contrast};
      border: 0.1rem solid ${palette.primary.light};
      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}
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
      font-weight: ${fontWeight.semibold};
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

export {
  PortionsWrapper,
  PortionWrapper,
  PortionHeadingWrapper,
  PortionHeading,
  FieldNumberWrapper,
  IconOptionsWrapper,
  IconButtonWrapper,
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
};
