import styled, { css } from "styled-components";

const DataGridListContainer = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    /* width: 100%; */
    position: relative;
    z-index: 1;
    max-width: ${breakpoints.lg};
  `
);

const DataGridListWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${down(breakpoints.xl)} {
      overflow-x: scroll;
    }
  `
);

const DataGridListHeader = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    padding: 1rem 0;

    width: fit-content;

    ${up(breakpoints.xl)} {
      width: 100%;
    }
  `
);

const DataGridListHeaderItem = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    width: 30rem;

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.paragraph};
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

const DataGridListConfig = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    z-index: 2;
  `
);

const DataGridListRowsWrapper = styled.div(
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
    z-index: 2;
    width: 100%;

    ${down(breakpoints.xl)} {
      width: fit-content;
    }
  `
);

const DataGridListRow = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    border-bottom: 1px solid ${palette.common.contrast};
    padding: 1rem 0;
    min-height: 7rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }
  `
);

const DataGridListRowItem = styled.div(
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

const DataGridListPopup = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: white;
  width: 30rem;
  border-radius: 1rem;
  min-height: 50rem;
  box-shadow: 0px 4px 4px rgba(197, 197, 197, 0.25);
  padding: 2rem;
  z-index: 2;
`;

export {
  DataGridListContainer,
  DataGridListWrapper,
  DataGridListHeader,
  DataGridListHeaderItem,
  DataGridListConfig,
  DataGridListRowsWrapper,
  DataGridListRow,
  DataGridListRowItem,
  DataGridListPopup,
};
