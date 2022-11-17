import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ClientContentContainer = styled.div(
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
    flex-direction: column;
    gap: 4rem;
    position: relative;
    width: 100%;

    ${up(breakpoints.lg)} {
      /* width: auto; */
      width: 100%;
      flex-direction: row;
    }
  `
);

const ClientContentWrapper = styled(motion.div)(
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
    gap: 4rem;
    flex: 1;
    width: 100%;
    max-width: ${breakpoints.lg};
    position: relative;
    /* min-height: 400rem; */

    /* ${up(breakpoints.xl)} {
      width: 70rem;
      flex: none;
    } */
  `
);

const ClientLoadingStepsWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    /* z-index: 10; */
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;
    width: 100%;
    max-width: ${breakpoints.lg};
    transition: 0.3s ease-out;
  `
);

const SaveOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    width: 30rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: sticky;
    bottom: 1rem;
    left: 0;
    width: 100%;
    z-index: 10;
    padding: 2rem;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    border: 0.1rem solid ${palette.primary.light};

    button {
      width: 100%;
    }

    p {
      display: none;
    }

    span {
      margin: 0 1rem;
      border-radius: 0.4rem;
      padding: 0.5rem 1rem;
      background: ${palette.primary.light};
      color: ${palette.primary.main};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }

    ${up(breakpoints.lg)} {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      top: 14rem;
      left: 0;
      flex-direction: column;
      padding: 4rem;
      width: 30rem;

      p {
        display: block;
        font-size: ${fontSize.s};
        font-weight: ${fontWeight.light};
        color: ${palette.common.text};
      }
    }
  `
);

const ClientStepWrapper = styled(motion.section)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    gap: 2rem;
    flex-direction: column;
    width: 100%;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;
    padding: 4rem 2rem;
    border-radius: ${border.rounded.md};

    ${up(breakpoints.xs)} {
      padding: 4rem;
    }
  `
);

const StepHeadingWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 1rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }
  `
);

const ClientStepContentContainer = styled.div(
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
    gap: 3rem;
    width: 100%;
    /* padding: 2rem; */
    position: relative;
    min-height: 15rem;
    overflow-y: hidden;

    ${up(breakpoints.lg)} {
      flex-direction: row;
    }
  `
);

const ClientStepContentWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 3rem;
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
    width: 5rem;
    height: 5rem;
    border: 0.2rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    background: ${palette.primary.light};

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: ${palette.primary.main};
      }
    }
  `
);

const ClientItemsWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 3rem;
    padding: 1rem 0;
    button {
      margin-top: 1rem;
    }
  `
);

const ClientItem = styled.li(
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
    gap: 1rem;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const ClientEmptyItemWrapper = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4rem;
    gap: 3rem;
    width: 100%;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};

    img {
      width: 15rem;
      height: 12rem;
      object-fit: contain;
    }

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      text-align: center;
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

const ClientBoxWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
  `
);

const ClientInfoBox = styled.div(
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
    gap: 2rem;
    flex-direction: column;
    padding: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    width: 20rem;
    min-height: 20rem;
    border-radius: ${border.rounded.md};
    background: ${palette.common.contrast};

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }

    h3 {
      font-size: ${fontSize.xl};
      font-weight: ${fontWeight.bold};
      color: ${palette.primary.main};
    }
  `
);

const ClientLoadingWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    /* z-index: 10; */
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;
    width: 100%;
    transition: 0.3s ease-out;
  `
);

const ErrorWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 4rem;
    border: 0.1rem solid #ff000025;
    border-radius: ${border.rounded.md};
    background: #ff000019;

    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};

    svg {
      width: 2.5rem;
      height: 2.5rem;
      path {
        fill: red;
      }
    }

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

export {
  ClientContentContainer,
  ClientContentWrapper,
  ClientLoadingStepsWrapper,
  SaveOptionsWrapper,
  ClientStepWrapper,
  StepHeadingWrapper,
  IconWrapper,
  ClientItemsWrapper,
  ClientItem,
  ClientBoxWrapper,
  ClientInfoBox,
  ClientEmptyItemWrapper,
  ClientLoadingWrapper,
  ClientStepContentContainer,
  ClientStepContentWrapper,
  ErrorWrapper,
};
