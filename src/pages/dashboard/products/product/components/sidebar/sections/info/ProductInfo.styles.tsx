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
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0;
    width: 100%;

    button {
      margin-top: 1rem;
    }
  `
);

const ProductInfoOptionsWrapper = styled.div(
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

interface IProductInfoOption {
  optionType: "edit" | "download" | "delete";
}

const ProductInfoOption = styled.button<IProductInfoOption>(
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

const ProductInfoItem = styled.div(
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
    gap: 2rem;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

export {
  ProductInfoWrapper,
  ProductInfoOptionsWrapper,
  ProductInfoOption,
  ProductInfoItem,
};
