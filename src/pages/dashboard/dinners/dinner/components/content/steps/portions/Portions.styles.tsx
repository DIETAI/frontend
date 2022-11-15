import styled, { css } from "styled-components";

const FieldWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;
    padding: 2rem;
    border-radius: 0.4rem;
    border: 0.2rem dashed ${palette.primary.light};

    ${up(breakpoints.sm)} {
      padding: 4rem;
    }
  `
);

const FieldHeadWrapper = styled.div(
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
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.m};
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
  iconType: "delete" | "edit";
}

const FieldItemsWrapper = styled.div(
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
    gap: 1rem;
  `
);

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
    padding: 1rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 1.6rem;
      height: 1.6rem;
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
  `
);

interface IImageType {
  imageType?: "gif";
}

const FieldImageWrapper = styled.div<IImageType>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    imageType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 30rem;
    height: 30rem; */
    /* background: ${palette.common.contrast}; */
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    padding: 1rem;
    position: relative;

    .productImg {
      /* width: 100%;
      height: 100%; */
      width: 100%;
      max-width: 4rem;
      max-height: 4rem;
      object-fit: contain;
      z-index: 1;
      border-radius: ${border.rounded.sm};
    }

    .backgroundImg {
      /* width: 100%
      height: 100%; */
      width: 100%;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.08;
      filter: blur(3px);

      object-fit: cover;
      border-radius: ${border.rounded.md};
    }

    /* ${imageType === "gif" &&
    css`
      position: relative;
      img {
        position: absolute;
        width: 10rem;
        height: 10rem;
      }
    `} */
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
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin: 2rem 0;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      flex-wrap: wrap;
    }
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
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    /* background: ${palette.common.contrast}; */
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
    flex-grow: 1;
    width: 100%;

    ${up(breakpoints.sm)} {
      width: auto;
      align-items: center;
      justify-content: center;
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
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1.5rem;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }
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
      media: { up, breakpoints },
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

export {
  FieldWrapper,
  FieldHeadWrapper,
  FieldNumberWrapper,
  FieldItemsWrapper,
  IconOptionsWrapper,
  IconButtonWrapper,
  FieldImageWrapper,
  PortionTotalWrapper,
  PortionTotalFeaturesWrapper,
  PortionTotalFeature,
  ProductsWrapper,
  ProductWrapper,
  ProductMainWrapper,
  ProductContentWrapper,
  ProductPortionItem,
};
