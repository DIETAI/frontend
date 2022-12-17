import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const OneDayViewContainer = styled.div(
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
    flex-direction: column;
    width: 100%;
    overflow-x: auto;
  `
);

const OneDayViewNav = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    margin-bottom: 3rem;
    border-bottom: 0.1rem ${palette.primary.light};
    gap: 2rem;
    width: fit-content;

    ${up(breakpoints.xl)} {
      width: 100%;
    }
  `
);

interface INavItemActive {
  active: boolean;
}

const OneDayViewNavItem = styled.li<INavItemActive>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: 15rem;

    ${up(breakpoints.xl)} {
      flex-grow: 1;
      width: auto;
    }

    :hover {
      opacity: 0.7;
    }

    ${active &&
    css`
      background: ${palette.primary.main};
      color: white;
      border: 0.1rem solid ${palette.primary.main};
    `}
  `
);

const OneDayViewTotalWrapper = styled.ul(
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
    gap: 1rem;
    margin-bottom: 3rem;

    width: fit-content;

    ${up(breakpoints.xl)} {
      width: 100%;
    }
  `
);

interface ITotalVariant {
  variant?: "red" | "yellow" | "green";
}

const OneDayViewTotalItem = styled.li<ITotalVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, breakpoints },
    },
    variant,
  }) => css`
    display: flex;
    padding: 1rem 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    gap: 1rem;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    h2 {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    ${variant === "green" &&
    css`
      b {
        color: lightgreen;
      }
    `}

    ${variant === "yellow" &&
    css`
      b {
        color: orange;
      }
    `}

    ${variant === "red" &&
    css`
      b {
        color: red;
      }
    `}


    min-width: 15rem;

    ${up(breakpoints.xl)} {
      flex-grow: 1;
      width: auto;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  `
);

const OneDayViewTableWrapper = styled.div(
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
    flex-direction: column;
    position: relative;
    border-right: 0.1rem solid ${palette.common.border};
    border-left: 0.1rem solid ${palette.common.border};

    width: fit-content;

    ${up(breakpoints.xl)} {
      width: 100%;
    }
  `
);

const OneDayViewTableHeaderWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    border-top: 0.1rem solid ${palette.common.border};
    border-bottom: 0.1rem solid ${palette.common.border};
    width: fit-content;

    ${up(breakpoints.xl)} {
      width: 100%;
    }

    //w-fit flex border-x border-y 2xl:w-full
  `
);

const TableHeaderItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    color: ${palette.common.text};
    border-right: 0.1rem solid ${palette.common.border};
    width: 12rem;

    :last-of-type {
      border: none;
    }
  `
);

const TableHeaderMealItem = styled(TableHeaderItem)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    flex-grow: 1;
    min-width: 26rem;
  `
);

const TableHeaderDinnerItem = styled(TableHeaderItem)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 26rem;
  `
);

const TotalItem = styled.li<ITotalVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, breakpoints },
    },
    variant,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    gap: 0.5rem;
    flex-grow: 1;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 15rem;

    h2,
    h3 {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    ${variant === "green" &&
    css`
      h3 {
        color: lightgreen;
      }
    `}

    ${variant === "yellow" &&
    css`
      h3 {
        color: orange;
      }
    `}

    ${variant === "red" &&
    css`
      h3 {
        color: red;
      }
    `}

    ${up(breakpoints.xl)} {
      flex-grow: 1;
      width: auto;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  `
);

const TotalItemModal = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: ${palette.common.main};
    border-radius: ${border.rounded.sm};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    box-shadow: ${palette.common["box-shadow"]};

    p {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }
  `
);

export {
  OneDayViewContainer,
  OneDayViewNav,
  OneDayViewNavItem,
  OneDayViewTotalWrapper,
  OneDayViewTotalItem,
  OneDayViewTableWrapper,
  OneDayViewTableHeaderWrapper,
  TableHeaderItem,
  TableHeaderMealItem,
  TableHeaderDinnerItem,
  TotalItem,
  TotalItemModal,
};
