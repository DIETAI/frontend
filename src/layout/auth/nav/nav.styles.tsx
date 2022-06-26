import styled, { css } from "styled-components";

const NavContainer = styled.nav(
  ({
    theme: {
      palette,
      media: { down, breakpoints },
    },
  }) => css`
    position: sticky;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 8rem;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border-bottom: 0.1rem solid ${palette.common.contrast};
  `
);

const NavWrapper = styled.nav(
  ({
    theme: {
      palette,
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 8rem;
    transition: 0.3s ease-out;
    padding: 1rem 0;
    background: ${palette.common.main};
    border-bottom: 0.1rem solid ${palette.common.contrast};
    max-width: ${breakpoints.xl};
    margin: auto;

    padding: 1rem 2rem;

    .logo {
      cursor: pointer;
      max-width: 12rem;
      height: 4rem;
      object-fit: contain;
    }

    ${up(breakpoints.sm)} {
      padding: 1rem 5rem;
    }
  `
);

const OptionsWrapper = styled.nav(
  ({
    theme: {
      palette,
      media: { down, breakpoints },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 3rem;

    ${down(breakpoints.md)} {
      display: none;
    }
  `
);

const Burger = styled.button(
  ({
    theme: {
      palette,
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: 0.3s ease-out;
    svg {
      width: 100%;
      height: 100%;
      path {
        fill: ${palette.common.grey};
      }
    }
    :hover {
      opacity: 0.8;
    }
    ${up(breakpoints.md)} {
      display: none;
    }
  `
);

export { NavContainer, NavWrapper, Burger, OptionsWrapper };
