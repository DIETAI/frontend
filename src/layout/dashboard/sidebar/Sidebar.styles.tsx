import styled, { css } from "styled-components";
import { ISidebarView } from "../context/sidebarView.context";

const SidebarWrapper = styled.div<Pick<ISidebarView, "sidebarView">>(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, up, breakpoints },
    },
    sidebarView,
  }) => css`
    /* display: none; */
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    gap: 1.5rem;
    top: 0;
    left: 0;
    width: 30rem;
    padding: 0 2rem;
    min-height: 100vh;
    background: ${palette.common.main};
    transition: 0.3s ease-out;
    box-shadow: ${palette.common["box-shadow"]};

    ${!sidebarView &&
    css`
      transform: translateX(-30rem);
    `}

    ${up(breakpoints.md)} {
      display: flex;
      flex-direction: column;
      position: fixed;
      z-index: 10;
      transform: none;
    }

    a {
      text-decoration: none;
    }
  `
);

const LogoWrapper = styled.div<Pick<ISidebarView, "sidebarView">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { padding },
      media: { down, breakpoints },
    },
    sidebarView,
  }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
    padding: 2rem 0;
    min-height: 9rem;
    margin-left: 1rem;

    img {
      width: 4rem;
      height: 4rem;
      object-fit: contain;
    }

    h2 {
      font-size: 2.6rem;
      font-weight: ${fontWeight.semibold};
      letter-spacing: 0.05rem;
      transition: 0.3s ease-out;

      background: -webkit-linear-gradient(
        rgba(119, 34, 255, 1),
        rgba(204, 17, 187, 1)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    ${!sidebarView &&
    css`
      h2 {
        opacity: 0;
      }
    `}
  `
);

const MobileBarsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { padding },
      media: { down, up, breakpoints },
    },
  }) => css`
    position: absolute;
    right: 2.5rem;
    top: 2.5rem;

    ${up(breakpoints.md)} {
      display: none;
    }
  `
);

export { SidebarWrapper, LogoWrapper, MobileBarsWrapper };
