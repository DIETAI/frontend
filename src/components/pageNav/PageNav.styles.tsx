import styled, { css } from "styled-components";

const PageNavContainer = styled.div(
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
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }

    ${up(breakpoints.lg)} {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  `
);

const HeadingWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    gap: 0.2rem;
    flex-direction: column;
    margin-bottom: 1rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    ${up(breakpoints.lg)} {
      margin-bottom: 1rem;
    }
  `
);

const NavItemsWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    width: 100%;
    border-bottom: 0.1rem solid ${palette.primary.light};
    list-style: none;
    display: none;

    a {
      text-decoration: none;
    }

    ${up(breakpoints.lg)} {
      display: flex;
    }
  `
);

interface ICurrentLocation {
  currentPath: boolean;
}

const PageNavItem = styled.li<ICurrentLocation>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
    currentPath,
  }) => css`
    padding: 1rem 2rem;
    cursor: pointer;
    border-bottom: 0.2rem solid ${palette.primary.light};
    transition: 0.3s ease-out;

    a {
      color: ${palette.common.text};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
    }

    :hover {
      border-bottom: 0.2rem solid ${palette.primary.main};

      a {
        color: ${palette.primary.main};
      }
    }

    ${currentPath &&
    css`
      border-bottom: 0.2rem solid ${palette.primary.main};
      a {
        color: ${palette.primary.main};
      }
    `}
  `
);

export { PageNavContainer, HeadingWrapper, NavItemsWrapper, PageNavItem };
