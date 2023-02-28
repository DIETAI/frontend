import styled, { css } from "styled-components";
import { motion } from "framer-motion";

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

export { DaysContainer, DayWrapper };
