import styled, { css } from "styled-components";

const MultiStepSidebarWrapper = styled.div(
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
    gap: 2.4rem;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 2px solid ${palette.common.border};
    padding: 1.6rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};
    position: static;
    width: 100%;
    height: 30rem;

    ${up(breakpoints.xl)} {
      position: sticky;
      top: 14rem;
      width: 48rem;
      height: 100%;
    }
  `
);

const HeadingWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.8rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }
  `
);

const IconWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.8rem;
    height: 4.8rem;
    border: 0.2rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    background: ${palette.primary.light};

    svg {
      width: 1.8rem;
      height: 1.8rem;
      path {
        fill: ${palette.primary.main};
      }
    }
  `
);

const SidebarNav = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    margin: 1rem 0;
  `
);

interface IActiveItem {
  activeItem: boolean;
}

const SidebarNavItem = styled.li<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    activeItem,
  }) => css`
    padding: 1rem 2rem;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    border-radius: ${border.rounded.md};
    color: ${palette.common.text};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    cursor: pointer;
    transition: 0.3s ease-out;
    border: 0.1rem solid ${palette.primary.light};

    :hover {
      background: ${palette.common.contrast};
      color: ${palette.primary.main};
    }

    ${activeItem &&
    css`
      background: ${palette.common.contrast};
      color: ${palette.primary.main};
    `}
  `
);

const Wrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    width: 100%;

    max-height: 55rem;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0.8rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${palette.common.contrast};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${palette.primary.light};
      border-radius: 0.4rem;
    }
  `
);

const StepsContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
    position: relative;
    width: 90%;
    border-right: 0.1rem dashed ${palette.primary.light};
    height: 100%;
  `
);

const StepWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    border-radius: ${border.rounded.md};
    transition: 0.3s ease-out;
    cursor: pointer;
    position: relative;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    .step-cursor {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: ${palette.primary.main};
      position: absolute;
      right: -1.5rem;

      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: white;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    :hover {
      background: ${palette.common.contrast};
    }
  `
);

const StepInfo = styled.span(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    padding: 0.7rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};

    font-size: 1.1rem;
    font-weight: ${fontWeight.medium};
    color: ${palette.primary.main};
    letter-spacing: 0.05rem;
    font-style: normal;
  `
);

const ShadowWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    height: 8rem;
    bottom: 0;
    left: 0;
    background: ${palette.common.main};
    background: red;
    position: absolute;
  `
);

const Overlay = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 10;
  `
);

export {
  MultiStepSidebarWrapper,
  HeadingWrapper,
  SidebarNav,
  SidebarNavItem,
  Wrapper,
  StepsContainer,
  IconWrapper,
  StepWrapper,
  StepInfo,
  ShadowWrapper,
  Overlay,
};
