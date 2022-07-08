import styled, { css } from "styled-components";

const DataGridPaginationWrapper = styled.div(
  ({
    theme: {
      media: { breakpoints, down },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
    width: 100%;
    gap: 2rem;
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
  DataGridPaginationWrapper,
  PaginationOptionsWrapper,
  PaginationOption,
};
