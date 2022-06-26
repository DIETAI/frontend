import styled, { css } from "styled-components";

const NavWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 8rem;
    padding: 0 3rem;
    background: ${palette.common.main};
    position: sticky;
    top: 0;
    z-index: 10;

    .sidebar-button {
      display: none;
    }

    ${up(breakpoints.md)} {
      .sidebar-button {
        display: flex;
      }
    }
  `
);

const NavOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 1.5rem;
    background: ${palette.common.main};
  `
);

const MobileNavOptions = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    img {
      width: 4rem;
      height: 4rem;
      object-fit: contain;
    }

    ${up(breakpoints.md)} {
      display: none;
    }
  `
);

export { NavWrapper, NavOptionsWrapper, MobileNavOptions };
