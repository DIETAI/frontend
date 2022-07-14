import styled, { css } from "styled-components";

const DietGenerateNavWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  `
);

interface IActiveItem {
  active: boolean;
  valid: boolean;
}

const DietGenerateNavItem = styled.div<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
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
    border-radius: ${border.rounded.md};
    cursor: pointer;
    transition: 0.3s ease-out;

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
  `
);

export { DietGenerateNavWrapper, DietGenerateNavItem };
