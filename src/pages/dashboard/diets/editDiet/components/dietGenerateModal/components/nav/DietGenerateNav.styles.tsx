import styled, { css } from "styled-components";

const NavWrapper = styled.div(
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
    width: 100%;

    ${up(breakpoints.xs)} {
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  `
);

interface IActiveItem {
  active: boolean;
  valid: boolean;
}

const NavItem = styled.div<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    active,
    valid,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    background: transparent;
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;
    width: 100%;

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: ${palette.common.slate};
      }
    }

    h2 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }

    ${active &&
    css`
      background: ${palette.primary.main};
      svg {
        path {
          fill: white;
        }
      }
      h2 {
        color: white;
      }
    `}

    ${!valid &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}

    ${up(breakpoints.xs)} {
      width: auto;
      padding: 1.5rem;
    }
  `
);

export { NavWrapper, NavItem };
