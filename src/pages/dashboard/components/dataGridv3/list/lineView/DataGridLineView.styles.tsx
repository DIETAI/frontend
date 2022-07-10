import styled, { css } from "styled-components";

const ListConfig = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 8rem;
    :last-of-type {
      justify-content: flex-end;
    }
    /* z-index: 2; */
  `
);

const RowsWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    border-radius: ${border.main};
    background: ${palette.common.main};
    /* z-index: 2; */
    width: 100%;

    ${down(breakpoints.xl)} {
      width: fit-content;
    }
  `
);

const Row = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    border-bottom: 1px dashed ${palette.common.contrast};
    padding: 1.5rem 0;
    min-height: 7rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }
  `
);

const RowItem = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, up },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    width: 30rem;

    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      max-width: 100%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    ${up(breakpoints.xl)} {
      flex: 1;
      max-width: 40rem;
    }
  `
);

export { ListConfig, RowsWrapper, Row, RowItem };
