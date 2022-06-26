import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const BurgerOverlay = styled(motion.div)(
  () => css`
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 20;
  `
);

const BurgerContent = styled(motion.div)(
  ({ theme: { palette } }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50rem;
    min-height: 100vh;
    background: ${palette.common.main};
    padding: 12rem 5rem;
  `
);

const Close = styled.button(
  ({ theme: { palette } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: 0.3s ease-out;
    position: absolute;
    right: 3rem;
    top: 3rem;
    svg {
      width: 100%;
      height: 100%;
      path {
        fill: ${palette.common.grey};
      }
    }
  `
);

const BurgerItems = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    list-style: none;
    height: 100%;
    gap: 4rem;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      color: ${palette.common.paragraph};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 5rem;
        border: 0.1rem solid ${palette.primary.main};
        border-radius: ${border.main};
        font-size: ${fontSize.s};
        font-weight: ${fontWeight.medium};
        color: ${palette.primary.main};
        text-decoration: none;
        transition: 0.3s ease-out;
        :hover {
          color: ${palette.primary.main};
        }
      }
    }
    li:last-child {
      a {
        background: ${palette.primary.main};
        color: white;
      }
    }
  `
);

const BurgerSocial = styled.div(
  ({
    theme: {
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    height: 100%;
    ${down(breakpoints.md)} {
      display: none;
    }
  `
);

export { BurgerOverlay, BurgerContent, Close, BurgerItems, BurgerSocial };
