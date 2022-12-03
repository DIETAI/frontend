import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const LineViewWrapper = styled.ul(
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
    width: 100%;
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
    border-radius: ${border.rounded.sm};
    margin-bottom: 2rem;

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
      flex-direction: row;
    }
  `
);

interface ISelectedItem {
  selectedItem?: boolean;
}

const ItemWrapper = styled.li<ISelectedItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    selectedItem,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    border-bottom: 0.1rem solid ${palette.primary.light};
    padding: 1.5rem;
    transition: 0.3s ease-out;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }

    :first-of-type {
      border-top: 0.1rem solid ${palette.primary.light};
    }

    ${selectedItem &&
    css`
      background: ${palette.primary.light};
    `}

    ${up(breakpoints.sm)} {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `
);

const ItemTitleWrapper = styled.div(
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
    gap: 2rem;
    flex-grow: 1;
    width: 100%;

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
      width: auto;
    }
  `
);

const ImageWrapper = styled.div(
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
    padding: 1rem;
    position: relative;
    width: 100%;
    max-width: 8rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;

    .itemImg {
      /* width: 100%; */
      max-width: 7rem;
      max-height: 4rem;
      object-fit: cover;
      z-index: 1;
      border-radius: ${border.rounded.sm};
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
      border-radius: ${border.rounded.sm};
    }
  `
);

const ItemOptionsWrapper = styled.div(
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
  `
);

interface IOptionType {
  optionType: "edit" | "delete" | "info";
}

const ItemOptionWrapper = styled.div<IOptionType>(
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
    width: 3rem;
    height: 3rem;
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
  LineViewWrapper,
  ImageSelectWrapper,
  ItemWrapper,
  ItemTitleWrapper,
  ImageWrapper,
  ItemOptionsWrapper,
  ItemOptionWrapper,
};
