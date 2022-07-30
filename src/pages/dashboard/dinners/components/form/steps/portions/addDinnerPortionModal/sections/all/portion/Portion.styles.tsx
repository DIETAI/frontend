import styled, { css } from "styled-components";

interface IActivePortion {
  active: boolean;
}

const Portion = styled.div<IActivePortion>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    transition: 0.3s ease-out;
    cursor: pointer;
    padding: 2rem;
    :hover {
      background: ${palette.common.contrast};
    }

    ${active &&
    css`
      border: 0.1rem dashed ${palette.primary.main};
    `}
  `
);

const PortionHeading = styled.div(
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

    h3 {
      color: ${palette.common.text};
      font-size: 1.5rem;
      font-weight: ${fontWeight.medium};
    }
  `
);

const FieldNumberWrapper = styled.span<IActivePortion>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.primary.light};

    p {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }

    ${active &&
    css`
      background: ${palette.primary.main};
      border: 0.1rem solid ${palette.primary.main};

      p {
        color: white;
      }
    `}
  `
);

const PortionProductsWrapper = styled.ul(
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
    width: 100%;
    gap: 1rem;
  `
);

const PortionProduct = styled.li(
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
    gap: 1rem;
    padding: 1rem 0;

    :not(:last-of-type) {
      border-bottom: 0.1rem dashed ${palette.common.border};
    }
  `
);

const PortionProductHeading = styled.div(
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
    width: 100%;

    :not(:last-of-type) {
      border-bottom: 0.1rem dashed ${palette.common.border};
    }

    h3 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
  `
);

const ProductPortionItem = styled.div(
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
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid #90ee9095;
    background: #90ee901a;
    color: lightgreen;
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
    min-width: 8rem;
  `
);

export {
  Portion,
  PortionHeading,
  FieldNumberWrapper,
  PortionProductsWrapper,
  PortionProduct,
  PortionProductHeading,
  ProductPortionItem,
};
