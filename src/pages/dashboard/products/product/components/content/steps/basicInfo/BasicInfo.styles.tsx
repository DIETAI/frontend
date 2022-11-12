import styled, { css } from "styled-components";

const ProductInfoWrapper = styled.div(
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
    gap: 3rem;
    width: 100%;
    position: relative;
    /* min-height: 30rem; */
    overflow-y: hidden;

    ${up(breakpoints.lg)} {
      flex-direction: row;
    }
  `
);

interface IImageType {
  imageType?: "gif";
}

const ProductInfoImageWrapper = styled.div<IImageType>(
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
    padding: 2rem;
    position: relative;

    .productImg {
      /* width: 100%;
      height: 100%; */
      width: 100%;
      max-width: 40rem;
      max-height: 40rem;
      object-fit: contain;
      z-index: 1;
      border-radius: ${border.rounded.md};
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

const ProductInfoDescriptionWrapper = styled.div(
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
    gap: 2rem;
    width: 100%;
    /* border-top: 0.1rem dashed ${palette.primary.light};
    padding-top: 2rem; */

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const ProductInfoMacroWrapper = styled.ul(
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
    gap: 1rem;
    width: 100%;
    list-style: none;

    li {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

export {
  ProductInfoWrapper,
  ProductInfoDescriptionWrapper,
  ProductInfoMacroWrapper,
  ProductInfoImageWrapper,
};
