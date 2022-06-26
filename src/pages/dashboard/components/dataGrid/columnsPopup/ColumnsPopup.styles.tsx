import styled, { css } from "styled-components";

interface IColumnsPopup {
  disabledItem: boolean;
  offItem: boolean;
}

const ColumnsPopupWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background: ${palette.common.main};
    width: 30rem;
    border-radius: ${border.main};
    box-shadow: ${palette.common["box-shadow"]};
    z-index: 2;
    max-height: 60rem;
    overflow-y: auto;

    ${down(breakpoints.sm)} {
      width: 100%;
      max-height: 25rem;
    }
  `
);

const ColumnPopupHeading = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    background: ${palette.common.contrast};
    min-height: 5rem;
    padding: 0 2rem;
    color: ${palette.common.text};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};
  `
);

const ColumnsPopupList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const ColumnsPopupItem = styled.li<IColumnsPopup>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, down },
      layout: { border },
    },
    disabledItem,
    offItem,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    min-height: 4rem;
    color: ${palette.common.text};
    background: ${palette.common.main};
    width: 100%;
    cursor: grab;
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
    transition: background 0.3s ease-out;
    border-bottom: 0.1rem solid ${palette.common.contrast};

    :hover {
      background: ${palette.common.contrast};
    }

    div {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    ${disabledItem &&
    css`
      background: ${palette.common.contrast};
      pointer-events: none;
    `}

    ${offItem &&
    css`
      display: none;
    `}
  `
);

export {
  ColumnsPopupWrapper,
  ColumnPopupHeading,
  ColumnsPopupList,
  ColumnsPopupItem,
};
