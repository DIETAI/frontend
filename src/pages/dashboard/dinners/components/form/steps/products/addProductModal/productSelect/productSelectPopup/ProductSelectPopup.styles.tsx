import styled, { css } from "styled-components";

const SelectPopupWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    padding: 4rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    box-shadow: ${palette.common["box-shadow"]};
    width: 100%;
    max-height: 50rem;
    overflow-y: auto;
    position: absolute;
    top: 110%;
    left: 0;
    background: ${palette.common.main};
  `
);

const SelectPopupNav = styled.ul(
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
    margin-bottom: 2rem;
  `
);

interface IActiveOption {
  activeOption: boolean;
}

const SelectPopupNavItem = styled.li<IActiveOption>(
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

const SelectPopupItemList = styled.ul(
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
  `
);

const SelectPopupItem = styled.li(
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
    gap: 3rem;
    padding: 3rem 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }

    :not(:last-child) {
      border-bottom: 0.1rem dashed ${palette.primary.light};
    }
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

export {
  SelectPopupWrapper,
  SelectPopupNav,
  SelectPopupNavItem,
  SelectPopupItemList,
  SelectPopupItem,
  ItemContent,
  ItemFeaturesWrapper,
  ItemFeature,
};
