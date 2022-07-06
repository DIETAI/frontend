import styled, { css } from "styled-components";

const DinnerProductFormWrapper = styled.div(
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
    gap: 2rem;
  `
);

const EmptyProductWrapper = styled.div(
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
    flex-direction: column;
    gap: 3rem;
    padding: 3rem;
    width: 100%;
    transition: 0.3s ease-out;
    min-height: 35rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};

    img {
      width: 15rem;
      height: 15rem;
      object-fit: contain;
    }

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.l};
    }
  `
);

const ItemWrapper = styled.div(
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
    gap: 3rem;
    padding: 3rem;
    width: 100%;
    transition: 0.3s ease-out;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};
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
    gap: 2rem;

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.l};
    }

    h3 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
      font-size: 1.4rem;
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
    background: ${palette.common.contrast};
    color: ${palette.primary.main};
    font-weight: ${fontWeight.light};
    font-size: 1.3rem;
  `
);

interface IPortion {
  selectedPortion?: boolean;
  defaultPortion?: boolean;
}

const Portion = styled.div<IPortion>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    selectedPortion,
    defaultPortion,
  }) => css`
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem dashed ${palette.primary.main};
    color: ${palette.primary.main};
    font-weight: ${fontWeight.light};
    font-size: 1.3rem;
    transition: 0.3s ease-out;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }

    ${defaultPortion &&
    css`
      background: ${palette.common.contrast};
    `}

    ${selectedPortion &&
    css`
      background: ${palette.primary.main};
      border: 0.1rem solid ${palette.primary.main};
      color: white;
    `}
  `
);

export {
  DinnerProductFormWrapper,
  EmptyProductWrapper,
  ItemWrapper,
  ItemContent,
  ItemFeaturesWrapper,
  ItemFeature,
  Portion,
};
