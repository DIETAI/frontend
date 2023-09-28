import styled, { css } from "styled-components";

const GeneratedDietNavWrapper = styled.div(
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
    width: 100%;
    gap: 3.2rem;

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
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;

    ${up(breakpoints.lg)} {
      flex-direction: row;
      align-items: center;
    }
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
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;

    button {
      width: 100%;
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;

      button {
        min-width: 24rem;
      }
    }
  `
);

export {
  GeneratedDietNavWrapper,
  GeneratedDietLegendWrapper,
  GeneratedDietLegendItem,
  GeneratedDietNavButtonsWrapper,
};
