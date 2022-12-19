import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const AddFileFormContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    backdrop-filter: blur(3px);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 100%;
  `
);

const AssetHeadingWrapper = styled.div(
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
  `
);

const AddFileFormWrapper = styled.form(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 60rem;
    height: 100%;
    overflow-y: auto;
    gap: 4rem;
    padding-left: 4rem;
    background: ${palette.common.main};
    border-left: 0.1rem solid ${palette.primary.light};

    img {
      width: 40rem;
      height: 40rem;
      object-fit: cover;
    }
  `
);

const ImagesSizeErrorWrapper = styled.div(
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

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: red;
    }
  `
);

const ImageWrapper = styled(motion.div)(
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
    padding: 2rem;
    position: relative;
    width: 100%;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    cursor: pointer;
    transition: 0.3s ease-out;

    .itemImg {
      width: 100%;
      max-width: 20rem;
      max-height: 20rem;
      object-fit: cover;
      z-index: 1;
      border-radius: ${border.rounded.md};
      transition: 0.3s ease-out;

      :hover {
        opacity: 0.7;
      }
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

    ${up(breakpoints.sm)} {
      width: 100%;
      height: 30rem;
    }
  `
);

const DeleteFileOptionWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 2rem;
    right: 2rem;
  `
);

export {
  AddFileFormContainer,
  AssetHeadingWrapper,
  AddFileFormWrapper,
  ImagesSizeErrorWrapper,
  ImageWrapper,
  DeleteFileOptionWrapper,
};
