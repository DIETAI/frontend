import styled, { css } from "styled-components";

const ProductsContainer = styled.div(
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
    min-height: 20rem;
  `
);

const Product = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    border: 0.1rem solid red;
    padding: 2rem;
    transition: 0.3s ease-out;
    cursor: pointer;
    margin: 2rem;
    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }
  `
);

const ProductModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `
);

const ButtonWrapper = styled.div(
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
    margin: 2rem 0;

    button {
      width: 50rem;
    }
  `
);

const RolesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
  `
);

interface ISelectedRole {
  selected: boolean;
}

const RoleItemWrapper = styled.div<ISelectedRole>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    selected,
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex-grow: 1;
    padding: 2rem;
    width: 25rem;
    /* height: 30rem; */
    border-radius: ${border.rounded.md};
    border: 0.2rem dashed ${palette.common.slate};
    transition: 0.3s ease-out;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
      height: 20rem;
      border-radius: ${border.rounded.md};
      object-fit: cover;
    }

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      text-align: center;
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      text-align: center;
    }

    span {
      position: absolute;
      left: 1rem;
      top: 1rem;
      background: ${palette.primary.main};
      border-radius: ${border.rounded.sm};
      padding: 1rem 2rem;

      color: white;
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }

    ${selected &&
    css`
      border: 0.2rem dashed ${palette.primary.main};
    `}

    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }
  `
);

export {
  ProductModalContainer,
  RolesWrapper,
  RoleItemWrapper,
  ButtonWrapper,
  ProductsContainer,
  Product,
};
