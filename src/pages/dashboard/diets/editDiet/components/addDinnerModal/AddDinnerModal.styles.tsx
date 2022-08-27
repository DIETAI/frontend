import styled, { css } from "styled-components";
import { motion } from "framer-motion";

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

const AddDinnerNavWrapper = styled.ul(
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
    width: 100%;
    margin-bottom: 2rem;
  `
);

interface IActiveOption {
  activeOption: boolean;
}

const AddDinnerNavItem = styled.li<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    activeOption,
  }) => css`
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.contrast};
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.4rem;
    transition: 0.3s ease-out;
    cursor: pointer;

    ${activeOption &&
    css`
      background: ${palette.primary.main};
      color: white;
    `}

    :hover {
      opacity: 0.7;
    }
  `
);

const AddDinnerSidebarList = styled.ul(
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
    flex-direction: column;
    position: relative;
    min-height: 30rem;
  `
);

const AddDinnerSidebarItem = styled(motion.li)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 3rem;
    padding: 3rem 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }

    :not(:last-child) {
      border-bottom: 0.1rem dashed ${palette.primary.light};
    }
  `
);

export {
  DinnerModalContainer,
  DinnerModalContentWrapper,
  DinnerModalSidebar,
  DinnerModalSidebarItem,
  DinnerSidebarItemPortion,
  AddDinnerNavWrapper,
  AddDinnerNavItem,
  AddDinnerSidebarList,
  AddDinnerSidebarItem,
};
