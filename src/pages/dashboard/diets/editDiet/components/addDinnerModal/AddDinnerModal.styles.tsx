import styled, { css } from "styled-components";

const DinnerModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `
);

const DinnerModalContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 2rem;
  `
);

const DinnerModalSidebar = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    width: 40rem;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow-y: auto;
  `
);

const DinnerModalSidebarItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    border: 0.1rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    transition: 0.3s ease-out;
    cursor: pointer;

    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const DinnerSidebarItemPortion = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    padding: 2rem;
    border: 0.1rem solid blue;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }
  `
);

export {
  DinnerModalContainer,
  DinnerModalContentWrapper,
  DinnerModalSidebar,
  DinnerModalSidebarItem,
  DinnerSidebarItemPortion,
};
