import styled, { css } from "styled-components";

const FilesLibraryNavWrapper = styled.div(
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
    gap: 2rem;
    width: 100%;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      justify-content: space-between;
    }
  `
);

const FilesLibraryNavSearchWrapper = styled.div(
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
    border: 0.1rem solid ${palette.common.slate};

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

const FilesLibraryNavOptionsWrapper = styled.div(
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
  `
);

interface IActiveOption {
  active?: boolean;
}

const FilesLibraryNavOption = styled.button<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    background: transparent;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.7;
    }

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: ${palette.primary.main};
      }
    }

    ${active &&
    css`
      background: ${palette.primary.main};
      border: 0.1rem solid ${palette.primary.main};
      svg {
        path {
          fill: white;
        }
      }
    `}
  `
);

export {
  FilesLibraryNavWrapper,
  FilesLibraryNavSearchWrapper,
  FilesLibraryNavOptionsWrapper,
  FilesLibraryNavOption,
};
