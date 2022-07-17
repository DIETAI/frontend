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

const PaginateSelect = styled.div(
  ({
    theme: {
      media: { breakpoints, down },
      palette,
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    input {
      width: 4rem;
      height: 3rem;
      border: 0.1rem solid ${palette.primary.light};
      border-radius: ${border.rounded.sm} 0 0 ${border.rounded.sm};
      padding: 0.5rem;
      color: ${palette.common.text};
      font-size: 1.5rem;
      border-right: none;

      :disabled {
        background: transparent;
      }
    }

    input:focus {
      outline: none;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background: ${palette.common.contrast};
      border: 0.1rem solid ${palette.primary.light};
      border-radius: 0 ${border.rounded.sm} ${border.rounded.sm} 0;
      cursor: pointer;
      transition: 0.3s ease-out;

      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: ${palette.primary.main};
        }
      }

      :hover {
        opacity: 0.7;
      }
    }
  `
);

const PaginationSelectModal = styled.ul(
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
    flex-direction: column;
    max-height: 9rem;
    margin-bottom: 2rem;
    overflow-y: auto;
    gap: 1rem;
    width: 100%;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    background: ${palette.common.main};
    position: absolute;
    top: 105%;
    left: 0;
    list-style: none;

    li {
      transition: 0.3s ease-out;
      width: 100%;
      padding: 0.5rem 1rem;
      cursor: pointer;
      :not(:last-child) {
        border-bottom: 0.1rem solid ${palette.common.border};
      }

      :hover {
        background: ${palette.common.contrast};
      }
    }
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
  PaginateSelect,
  PaginationSelectModal,
  PaginationOptionsWrapper,
  PaginationOption,
};
