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
  GeneratedDietNavButtonsWrapper,
};
