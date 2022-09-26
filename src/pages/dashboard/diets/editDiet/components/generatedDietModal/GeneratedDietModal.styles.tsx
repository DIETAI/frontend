import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const GeneratedDietModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 4rem;
  `
);

const LoadingWrapper = styled(motion.div)(
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
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: 60rem;

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
    }
  `
);

const DaysContainer = styled(motion.div)(
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
    position: relative;
    gap: 1.5rem;

    overflow-x: auto;
  `
);

const DayWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 30rem;
    min-height: 50rem;
    /* flex-grow: 1; */
    padding: 1rem;
    gap: 2rem;
    border: 0.1rem solid ${palette.common.border};
    border-radius: ${border.rounded.md};
    /* cursor: pointer;
    transition: 0.3s ease-out; */

    /* :hover {
      box-shadow: ${palette.common["box-shadow"]};
    } */
  `
);

const GeneratedDietNavWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h3 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.light};
      font-size: ${fontSize.m};
    }
  `
);

const GeneratedDietLegendWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
  `
);

interface IMealGeneratedType {
  generatedType: "added" | "new" | "addedChangePortion";
}

const GeneratedDietLegendItem = styled.div<IMealGeneratedType>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    generatedType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    span {
      width: 3rem;
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${generatedType === "added" &&
    css`
      span {
        border-bottom: 0.2rem dashed ${palette.primary.main};
      }
    `}

    ${generatedType === "new" &&
    css`
      span {
        border-bottom: 0.2rem dashed lightgreen;
      }
    `}

    ${generatedType === "addedChangePortion" &&
    css`
      span {
        border-bottom: 0.2rem dashed orange;
      }
    `}
  `
);

const GeneratedDietNavButtonsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
  `
);

export {
  GeneratedDietModalContainer,
  DaysContainer,
  DayWrapper,
  LoadingWrapper,
  GeneratedDietNavWrapper,
  GeneratedDietLegendWrapper,
  GeneratedDietLegendItem,
  GeneratedDietNavButtonsWrapper,
};
