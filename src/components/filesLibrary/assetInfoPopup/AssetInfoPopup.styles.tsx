import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const AssetInfoContainer = styled.div(
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

const AssetContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 40rem;
    min-height: 100%;
    gap: 4rem;
    padding-left: 4rem;
    background: ${palette.common.main};
    border-left: 0.1rem solid ${palette.primary.light};

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }

    /* img {
      width: 40rem;
      height: 40rem;
      object-fit: cover;
    } */
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

const AssetInfoOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

interface IAssetInfoOption {
  optionType: "edit" | "download" | "delete";
}

const AssetInfoOption = styled.button<IAssetInfoOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    optionType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-grow: 1;
    padding: 0.8rem 1rem;
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;
    font-size: 1.5rem;
    font-weight: ${fontWeight.medium};
    width: 100%;
    max-width: 30rem;

    :hover {
      opacity: 0.7;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    ${(optionType === "edit" || optionType === "download") &&
    css`
      background: ${palette.common.contrast};
      color: ${palette.primary.main};

      border: 0.1rem solid ${palette.primary.main};

      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}

    ${optionType === "delete" &&
    css`
      background: #ff00001d;
      border: 0.1rem solid #ff00004c;
      color: red;

      svg {
        path {
          fill: red;
        }
      }
    `}
  `
);

export {
  AssetInfoContainer,
  AssetContentWrapper,
  AssetHeadingWrapper,
  ImageWrapper,
  AssetInfoOptionsWrapper,
  AssetInfoOption,
};
