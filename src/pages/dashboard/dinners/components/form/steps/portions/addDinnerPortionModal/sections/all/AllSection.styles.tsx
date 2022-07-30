import styled, { css } from "styled-components";

const PortionGroupsNav = styled.ul(
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
    gap: 2rem;
    padding: 1rem 0;
    position: relative;

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    }
  `
);

const PortionGroupsFilterButton = styled.button(
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
    padding: 0.8rem 3rem;
    background: ${palette.primary.main};
    color: white;
    font-size: 1.3rem;
    font-weight: ${fontWeight.medium};
    border: none;
    transition: 0.3s ease-out;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }

    svg {
      width: 1.1rem;
      height: 1.1rem;
      path {
        fill: white;
      }
    }
  `
);

const PortionGroupsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    /* display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 2rem 0; */

    display: grid;
    width: 100%;
    /* padding: 2rem 0; */
    grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
    grid-gap: 2rem;
    /* @media (max-width: 450px) {
      grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    } */
  `
);

const PaginationOptionsWrapper = styled.div(
  ({
    theme: {
      media: { breakpoints, down },
      palette,
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
    margin: 2rem 0;
  `
);

interface IActiveOption {
  active?: boolean;
}

const PaginationOption = styled.button<IActiveOption>(
  ({
    theme: {
      media: { breakpoints, down },
      palette,
      layout: { border },
      typography: { fontSize, fontWeight },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.contrast};
    border-radius: ${border.rounded.sm};
    color: ${palette.primary.main};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};
    cursor: pointer;
    transition: 0.3s ease-out;
    margin: 0 !important;

    :hover {
      opacity: 0.7;
    }

    :disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    ${active &&
    css`
      background: ${palette.primary.main};
      color: white;
      border: 0.1rem solid ${palette.primary.main};
    `}
  `
);

export {
  PortionGroupsNav,
  PortionGroupsFilterButton,
  PortionGroupsWrapper,
  PaginationOptionsWrapper,
  PaginationOption,
};
