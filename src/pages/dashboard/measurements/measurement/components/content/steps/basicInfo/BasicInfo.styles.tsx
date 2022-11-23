import styled, { css } from "styled-components";

const MeasurementInfoWrapper = styled.div(
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

    /* ${up(breakpoints.lg)} {
      flex-direction: row;
    } */
  `
);

interface IImageType {
  imageType?: "gif";
}

const MeasurementInfoImageWrapper = styled.div<IImageType>(
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

    .measurementImg {
      /* width: 100%;
      height: 100%; */
      width: 100%;
      max-width: 15rem;
      max-height: 15rem;
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

const MeasurementInfoDescriptionWrapper = styled.div(
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

const MeasurementInfoMacroWrapper = styled.ul(
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

const MeasurementListNavItem = styled.span(
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
    padding: 0.2rem 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    color: ${palette.primary.main};
  `
);

const MeasurementInfoDescriptionItem = styled.span(
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
    gap: 1.5rem;
    /* border-bottom: 0.1rem dashed ${palette.primary.light};
    padding-bottom: 1.5rem; */
    width: 100%;

    li,
    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const MeasurementInfoDescriptionNavItem = styled.span(
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
    padding: 0.2rem 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    color: ${palette.primary.main};
  `
);

const GalleryWrapper = styled.div(
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
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
    padding: 2rem 0;
  `
);

const GalleryImage = styled.img(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    border-radius: ${border.rounded.md};
    object-fit: cover;
    width: 100%;
    height: 20rem;

    ${up(breakpoints.xs)} {
      width: 15rem;
      height: 15rem;
    }
  `
);

export {
  MeasurementInfoWrapper,
  MeasurementInfoDescriptionWrapper,
  MeasurementInfoMacroWrapper,
  MeasurementInfoImageWrapper,
  MeasurementListNavItem,
  MeasurementInfoDescriptionItem,
  MeasurementInfoDescriptionNavItem,
  GalleryWrapper,
  GalleryImage,
};
