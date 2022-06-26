import styled, { css } from "styled-components";
import { ISidebarView } from "../../context/sidebarView.context";

interface ILinkStyles {
  sidebarView: boolean;
  activeLink: boolean;
}

const LinkWrapper = styled.li<ILinkStyles>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { padding, border },
      media: { down, breakpoints },
    },
    sidebarView,
    activeLink,
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 1rem;
    transition: 0.3s ease-out;
    gap: 1.5rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.common.main};
    cursor: pointer;

    a {
      font-size: 1.5rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      transition: 0.3s ease-out;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      transition: 0.3s ease-out;
      svg {
        width: 40%;
        height: 40%;
        path {
          fill: #70809053;
        }
      }
    }

    span {
      border: 0.1rem solid transparent;
    }

    :hover {
      span {
        svg {
          path {
            fill: ${palette.primary.main};
          }
        }
      }
    }

    ${sidebarView &&
    css`
      ${activeLink &&
      css`
        background: ${palette.common.contrast};
        border: 0.1rem solid ${palette.primary.light};
        span {
          svg {
            path {
              fill: ${palette.primary.main};
            }
          }
        }

        a {
          color: ${palette.primary.main};
        }
      `}

      :hover {
        background: ${palette.common.contrast};
        border: 0.1rem solid ${palette.primary.light};
        a {
          color: ${palette.primary.main};
        }
      }
    `}

    ${!sidebarView &&
    css`
      a {
        opacity: 0;
        /* display: none; */
      }

      ${activeLink &&
      css`
        span {
          border-radius: ${border.rounded.md};
          background: ${palette.common.contrast};
          border: 0.1rem solid ${palette.primary.light};

          svg {
            path {
              fill: ${palette.primary.main};
            }
          }
        }
      `}

      :hover {
        span {
          border-radius: ${border.rounded.md};
          background: ${palette.common.contrast};
          border: 0.1rem solid ${palette.primary.light};
        }
      }
      /* width: 4rem;
      height: 4rem; */
    `}
  `
);

const LinkTitleWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s ease-out;
    cursor: pointer;
  `
);

const LinkTitle = styled.div<Pick<ISidebarView, "sidebarView">>(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
    sidebarView,
  }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      transition: 0.3s ease-out;
      svg {
        width: 50%;
        height: 50%;
        path {
          fill: #70809053;
        }
      }
    }

    p {
      font-size: 1.5rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      transition: 0.3s ease-out;
    }

    ${!sidebarView &&
    css`
      p {
        opacity: 0;
      }
    `}
  `
);

const LinkChevronWrapper = styled.span<Pick<ISidebarView, "sidebarView">>(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
    sidebarView,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.5rem;
    height: 2.5rem;

    svg {
      width: 50%;
      height: 50%;

      path {
        fill: #7e8299;
      }
    }

    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};
    color: ${palette.common.text};

    ${!sidebarView &&
    css`
      opacity: 0;
    `}
  `
);

export { LinkWrapper, LinkTitleWrapper, LinkTitle, LinkChevronWrapper };
