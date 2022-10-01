import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const AddDinnerNavWrapper = styled.ul(
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
    gap: 1rem;
    width: 100%;
    margin-bottom: 2rem;
  `
);

interface IActiveOption {
  activeOption: boolean;
}

const AddDinnerNavItem = styled.li<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
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

    ${activeOption &&
    css`
      background: ${palette.primary.main};
      color: white;
    `}

    :hover {
      opacity: 0.7;
    }
  `
);

const DinnerList = styled.ul(
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
    position: relative;
    min-height: 20rem;
  `
);

interface IActiveItem {
  activeItem: boolean;
  disabled?: boolean;
}

const DinnerItem = styled(motion.li)<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    activeItem,
    disabled,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0.7rem;
    padding: 3rem 1rem;
    width: 100%;
    transition: 0.3s ease-out;

    p {
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
      font-size: 1.4rem;
      margin-top: 1.5rem;
    }

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
      font-size: ${fontSize.s};
    }

    :hover {
      background: ${palette.common.contrast};
    }

    :not(:last-child) {
      border-bottom: 0.1rem dashed ${palette.primary.light};
    }

    ${activeItem &&
    css`
      /* pointer-events: none; */
      background: ${palette.common.contrast};

      h2 {
        color: ${palette.primary.main};
      }
    `}

    ${disabled &&
    css`
      pointer-events: none;
    `}
  `
);

const DinnerItemContent = styled.div(
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
    width: 100%;
  `
);

const DinnerItemName = styled.div(
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
    gap: 1rem;
  `
);

const DinnerItemOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 1rem;
  `
);

interface IButtonVariant {
  buttonVariant: "edit" | "view" | "add";
}

const DinnerItemButton = styled.button<IButtonVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    buttonVariant,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;

    :disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    ${buttonVariant === "add" &&
    css`
      background: ${palette.primary.main};
      border: 0.1rem solid ${palette.primary.main};
      svg {
        path {
          fill: white;
        }
      }
    `}

    ${buttonVariant === "view" &&
    css`
      background: ${palette.common.contrast};
      border: 0.1rem solid ${palette.primary.light};
      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}

    ${buttonVariant === "edit" &&
    css`
      background: #ffa60028;
      border: 0.1rem solid #ffa6003a;
      svg {
        path {
          fill: orange;
        }
      }
    `}
  `
);

const ItemContent = styled.div(
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
    gap: 1rem;

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.m};
    }

    p {
      color: ${palette.common.text};
      font-weight: ${fontWeight.light};
      font-size: ${fontSize.s};
    }
  `
);

const ItemFeaturesWrapper = styled.div(
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

    p {
      color: red;
      font-weight: ${fontWeight.light};
      font-size: 1.4rem;
    }
  `
);

const ItemFeature = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
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

const AddDinnerNavFilterWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;
  `
);

const SearchWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, down },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.main};
    width: 25rem;
    min-height: 4.5rem;
    /* border: 0.1rem solid ${palette.primary.light}; */

    svg {
      width: 1.8rem;
      height: 1.8rem;
      path {
        fill: ${palette.common.slate};
      }
    }

    input {
      width: 100%;
      height: 100%;
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      outline: none;
      border: none;
      background: transparent;
      color: ${palette.common.text};

      ::placeholder {
        color: ${palette.common.slate};
        font-size: ${fontSize.s};
        font-weight: ${fontWeight.light};
      }
    }

    ${down(breakpoints.lg)} {
      width: 100%;
    }
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
    position: absolute;
    top: 0;
    left: 0;

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

const EmptyDataWrapper = styled(motion.div)(
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
    position: absolute;
    top: 0;
    left: 0;

    gap: 3rem;
    padding: 2rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.main};

    img {
      width: 10rem;
      height: 10rem;
      object-fit: contain;
    }

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
      font-size: ${fontSize.m};
    }
  `
);

export {
  AddDinnerNavWrapper,
  AddDinnerNavItem,
  DinnerList,
  DinnerItem,
  ItemContent,
  ItemFeaturesWrapper,
  ItemFeature,
  AddDinnerNavFilterWrapper,
  SearchWrapper,
  LoadingWrapper,
  EmptyDataWrapper,
  DinnerItemName,
  DinnerItemOptionsWrapper,
  DinnerItemButton,
  DinnerItemContent,
};
