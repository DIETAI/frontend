import styled, { css } from "styled-components";

const MeasurementSidebarWrapper = styled.div(
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
    flex-direction: column;
    gap: 2rem;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 2px solid ${palette.common.border};
    padding: 4rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};
    position: static;
    width: 100%;
    height: 60rem;

    ${up(breakpoints.xl)} {
      position: sticky;
      top: 14rem;
      width: 50rem;
      height: auto;
      /* height: 70rem; */
    }
  `
);

const HeadingWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* padding: 0 2rem; */
    padding-top: 2rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }
  `
);

const IconWrapper = styled.div(
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
    width: 5rem;
    height: 5rem;
    border: 0.2rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    background: ${palette.primary.light};

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: ${palette.primary.main};
      }
    }
  `
);

const SidebarNav = styled.ul(
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
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    margin: 1rem 0;
    /* border-bottom: 0.1rem solid ${palette.primary.light}; */
  `
);

interface IActiveItem {
  activeItem: boolean;
}

const SidebarNavItem = styled.li<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    activeItem,
  }) => css`
    padding: 1rem 2rem;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    border-radius: ${border.rounded.md};
    color: ${palette.common.text};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    cursor: pointer;
    transition: 0.3s ease-out;
    border: 0.1rem solid ${palette.primary.light};

    :hover {
      background: ${palette.common.contrast};
      color: ${palette.primary.main};
    }

    ${activeItem &&
    css`
      background: ${palette.common.contrast};
      color: ${palette.primary.main};
    `}
  `
);

const Wrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    width: 100%;

    max-height: 55rem;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0.8rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${palette.common.contrast};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${palette.primary.light};
      border-radius: 0.4rem;
    }
  `
);

export {
  MeasurementSidebarWrapper,
  HeadingWrapper,
  SidebarNav,
  SidebarNavItem,
  Wrapper,
  IconWrapper,
};
