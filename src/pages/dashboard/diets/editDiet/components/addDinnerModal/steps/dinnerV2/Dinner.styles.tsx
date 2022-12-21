import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const AddDinnerNavWrapper = styled.ul(
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
    margin-bottom: 2rem;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      justify-content: space-between;
    }
  `
);

const SearchWrapper = styled.div(
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
    gap: 1.5rem;
    padding: 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.main};
    width: 100%;
    min-height: 4.5rem;
    border: 0.1rem solid ${palette.common.slate};
    max-width: 40rem;

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

    ${up(breakpoints.sm)} {
      max-width: 25rem;
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
  dinnerDietKindCheck?: boolean;
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
    dinnerDietKindCheck,
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
    `} /* ${!dinnerDietKindCheck &&
    css`
      background: #ff00001f;
    `} */
  `
);

const DinnerItemContent = styled.div(
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
    flex-direction: column-reverse;
    gap: 2rem;
    width: 100%;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `
);

const ErrorNameWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    p {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: red;
    }
  `
);

const DinnerItemName = styled.div(
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
    flex-grow: 1;
    width: 100%;

    ${up(breakpoints.md)} {
      flex-direction: row;
      align-items: center;
    }
  `
);

const OptionsContainer = styled.div(
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

    ${up(breakpoints.sm)} {
      align-items: flex-end;
    }
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

interface ICheckProductDietKind {
  checkDietKindProduct?: boolean;
}

const ProductWrapper = styled.div<ICheckProductDietKind>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    checkDietKindProduct,
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

    ${!checkDietKindProduct &&
    css`
      background: #ff000019;
      border: 0.1rem solid #ff00005e;
      color: red;
    `}
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

//new
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

//new
const RecommendItem = styled.span(
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
    gap: 1rem;
    padding: 0.7rem 1rem;
    color: white;
    font-size: 1.4rem;
    font-weight: ${fontWeight.light};
    border-radius: ${border.rounded.sm};

    svg {
      width: 1.6rem;
      height: 1.6rem;
      path {
        fill: white;
      }
    }

    /* background: radial-gradient(
        ellipse farthest-corner at right bottom,
        #fedb37 0%,
        #fdb931 8%,
        #9f7928 30%,
        #8a6e2f 40%,
        transparent 80%
      ),
      radial-gradient(
        ellipse farthest-corner at left top,
        #ffffff 0%,
        #ffffac 8%,
        #d1b464 25%,
        #5d4a1f 62.5%,
        #5d4a1f 100%
      ); //gold */

    background: #d4af37;
    /* background: #ffd700; */

    //https://www.htmlcsscolor.com/hex/D4AF37
  `
);

const EmptyWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    padding: 1rem;
    min-height: 30rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};

    img {
      width: 10rem;
      height: 10rem;
    }

    h3 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      text-align: center;
    }
  `
);

const ErrorWrapper = styled(motion.div)(
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
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    min-height: 30rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};

    svg {
      width: 4rem;
      height: 4rem;
      path {
        fill: red;
      }
    }

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      text-align: center;
    }
  `
);

export {
  AddDinnerNavWrapper,
  DinnerList,
  DinnerItem,
  ItemContent,
  ItemFeaturesWrapper,
  ItemFeature,
  ProductWrapper,
  AddDinnerNavFilterWrapper,
  SearchWrapper,
  LoadingWrapper,
  EmptyDataWrapper,
  DinnerItemName,
  DinnerItemOptionsWrapper,
  DinnerItemButton,
  DinnerItemContent,
  ErrorNameWrapper,
  //new
  ImageWrapper,
  RecommendItem,
  OptionsContainer,
  EmptyWrapper,
  ErrorWrapper,
};
