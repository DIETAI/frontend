import styled, { css } from "styled-components";
import { ISidebarView } from "../context/sidebarView.context";

const Container = styled.div<Pick<ISidebarView, "sidebarView">>(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, up, breakpoints },
    },
    sidebarView,
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
    transition: 0.3s ease-out;
    background: ${palette.common.main};

    ${up(breakpoints.md)} {
      width: calc(100% - 30rem);
      padding-right: 3rem;
      margin-left: 30rem;

      ${!sidebarView &&
      css`
        width: calc(100% - 10rem);
      `}
    }
  `
);

const ContentWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding, border },
      media: { down, up, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 8rem);
    padding: 5rem 2rem;
    background: rgba(119, 34, 255, 0.03);
    background: rgba(132, 101, 182, 0.05);
    border: 0.1rem solid ${palette.primary.light};

    /* gap: 4rem; */

    ${up(breakpoints.md)} {
      border-radius: ${border.rounded.lg};
      padding: 6rem;
    }
  `
);

export { Container, ContentWrapper };
