import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ImagesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
  `
);

const ImageSelectWrapper = styled.div(
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
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    transition: 0.3s ease-out;
    padding: 2rem;
    cursor: pointer;
    border: 0.1rem dashed ${palette.primary.main};
    border-radius: ${border.rounded.md};

    :hover {
      opacity: 0.7;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 3rem;
        height: 3rem;
        path {
          fill: ${palette.primary.main};
        }
      }
    }

    p {
      font-size: 1.5rem;
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
      text-align: center;
    }

    ${up(breakpoints.sm)} {
      width: 20rem;
      height: 20rem;
    }
  `
);

interface ISelectedImage {
  selectedImage?: boolean;
}

const ImageWrapper = styled(motion.div)<ISelectedImage>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    selectedImage,
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
      max-width: 15rem;
      max-height: 15rem;
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

    ${selectedImage &&
    css`
      background: ${palette.primary.light};
    `}

    ${up(breakpoints.sm)} {
      width: 20rem;
    }
  `
);

const ImageOptionsWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1.5rem;
    background: ${palette.common.main};
    padding: 1rem;
    border-radius: ${border.rounded.lg} ${border.rounded.lg} 0 0;
    z-index: 1;
    border-top: 0.1rem solid ${palette.primary.light};

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

interface IOptionType {
  optionType: "edit" | "delete" | "info";
}

const ImageOptionWrapper = styled.div<IOptionType>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    optionType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: ${border.rounded.sm};
    transition: 0.3s ease-out;

    cursor: pointer;
    :hover {
      opacity: 0.6;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    ${optionType === "edit" &&
    css`
      background: #ffcf752f;
      svg {
        path {
          fill: orange;
        }
      }
    `}

    ${optionType === "delete" &&
    css`
      background: #ff000029;
      svg {
        path {
          fill: red;
        }
      }
    `}
  
      ${optionType === "info" &&
    css`
      background: #0000ff30;
      svg {
        path {
          fill: blue;
        }
      }
    `}
  `
);

export {
  ImagesWrapper,
  ImageSelectWrapper,
  ImageWrapper,
  ImageOptionsWrapper,
  ImageOptionWrapper,
};
