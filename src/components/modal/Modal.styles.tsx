import styled, { css } from "styled-components";

const ModalContainer = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, up },
    },
  }) => css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: ${palette.common.backdrop};
    z-index: 30;
    padding: 0 2rem;
    backdrop-filter: blur(0.2rem);
    overflow-y: auto;
  `
);

interface IModalContentWidth {
  modalWidth?: string;
}

const ModalContentWrapper = styled.div<IModalContentWidth>(
  ({
    theme: {
      palette,
      layout: { border },
      media: { breakpoints, up },
    },
    modalWidth,
  }) => css`
    max-width: ${breakpoints.lg};
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    box-shadow: ${palette.common["box-shadow"]};
    padding: 3rem;
    z-index: 40;
    position: relative;
    margin: 2rem 0;
    ${modalWidth &&
    css`
      max-width: ${modalWidth};
    `}

    ${up(breakpoints.md)} {
      padding: 5rem;
      margin: 10rem auto;
    }
  `
);

export { ModalContainer, ModalContentWrapper };
