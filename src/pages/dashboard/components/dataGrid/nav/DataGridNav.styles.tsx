import styled, { css } from "styled-components";

const DataGridNavWrapper = styled.div(
  ({
    theme: {
      media: { breakpoints, down },
    },
  }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: ${breakpoints.lg};

    ${down(breakpoints.lg)} {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;

      gap: 2rem;
    }
  `
);

const SearchWrapper = styled.div(
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
    gap: 1rem;
    padding: 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.main};
    width: 25rem;
    min-height: 4.5rem;
    border: 0.1rem solid ${palette.primary.light};

    svg {
      width: 2rem;
      height: 2rem;
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
        color: ${palette.common.grey};
        font-size: ${fontSize.s};
        font-weight: ${fontWeight.light};
      }
    }

    ${down(breakpoints.lg)} {
      width: 100%;
    }
  `
);

const ButtonsWrapper = styled.div(
  ({
    theme: {
      media: { breakpoints, down },
    },
  }) => css`
    display: flex;
    gap: 2rem;

    ${down(breakpoints.lg)} {
      width: 100%;

      button {
        flex: 1;
      }
    }

    ${down(breakpoints.md)} {
      flex-wrap: wrap;
    }
  `
);

export { DataGridNavWrapper, SearchWrapper, ButtonsWrapper };
