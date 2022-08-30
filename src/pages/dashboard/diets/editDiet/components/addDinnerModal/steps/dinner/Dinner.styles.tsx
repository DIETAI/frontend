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
  `
);

interface IActiveItem {
  activeItem: boolean;
}

const DinnerItem = styled(motion.li)<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    activeItem,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding: 3rem 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease-out;

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
      pointer-events: none;
      background: ${palette.common.contrast};

      h2 {
        color: ${palette.primary.main};
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
};
