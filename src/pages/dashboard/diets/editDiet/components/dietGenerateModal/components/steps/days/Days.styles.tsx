import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const DietGenerateDaysContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    padding: 2rem;
  `
);

const DaysOptions = styled.div(
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
    justify-content: flex-start;
    gap: 1rem;
    padding: 2rem;

    span {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }
  `
);

const DaysWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;
  `
);

interface ISelectedDay {
  selectedDay: boolean;
}

const DayItem = styled.div<ISelectedDay>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
    selectedDay,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 12rem;
    height: 16rem;
    border-radius: ${border.rounded.md};
    border: 0.1rem dashed ${palette.primary.light};
    background: ${palette.common.contrast};
    padding: 2rem;
    cursor: pointer;
    transition: 0.3s ease-out;
    flex-grow: 1;
    gap: 2rem;

    h2 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }

    svg {
      width: 5rem;
      height: 5rem;
      path {
        fill: ${palette.primary.light};
      }
    }

    :hover {
      opacity: 0.6;
    }

    ${selectedDay &&
    css`
      h2 {
        color: ${palette.primary.main};
        font-weight: ${fontWeight.medium};
      }
      border: 0.1rem solid ${palette.primary.main};

      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}
  `
);

const LoadingWrapper = styled(motion.div)(
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
    width: 100%;
    min-height: 30rem;

    gap: 2rem;
    padding: 2rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.main};

    h2 {
      color: ${palette.primary.main};
      font-weight: ${fontWeight.medium};
      font-size: ${fontSize.m};
    }
  `
);

const EmptyDataWrapper = styled(motion.div)(
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
    width: 100%;
    min-height: 30rem;

    gap: 2rem;
    padding: 2rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.main};

    h2 {
      color: ${palette.primary.main};
      font-weight: ${fontWeight.medium};
      font-size: ${fontSize.m};
    }
  `
);

export {
  DietGenerateDaysContainer,
  DaysWrapper,
  DaysOptions,
  DayItem,
  LoadingWrapper,
  EmptyDataWrapper,
};
