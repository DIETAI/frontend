import styled, { css } from "styled-components";

const ColumnsModalWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-height: 25rem;
    overflow-y: auto;

    ${up(breakpoints.sm)} {
      width: 30rem;
      max-height: 40rem;
    }
  `
);

const ColumnsModalHeadingWrapper = styled.div(
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
    justify-content: flex-start;
    padding: 2rem 1rem;
    width: 100%;
    color: ${palette.common.text};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};
    border-bottom: 0.1rem dashed ${palette.primary.light};
  `
);

const ColumnsModalList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
`;

interface IColumnsPopup {
  disabledItem: boolean;
  offItem: boolean;
}

const ColumnsModalItem = styled.li<IColumnsPopup>(
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
    min-height: 5rem;
    color: ${palette.common.text};
    background: ${palette.common.main};
    width: 100%;

    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
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

    cursor: grab;
  `
);

export {
  ColumnsModalWrapper,
  ColumnsModalHeadingWrapper,
  ColumnsModalList,
  ColumnsModalItem,
};
