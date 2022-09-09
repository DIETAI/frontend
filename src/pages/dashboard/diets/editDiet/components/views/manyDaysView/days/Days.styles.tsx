import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const DaysContainer = styled.div(
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
    /* overflow: hidden; */
    overflow-x: auto;
  `
);

const DaysNav = styled.div(
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
    width: 100%;
    padding: 2rem;
    border-bottom: 0.1rem ${palette.primary.light};
    gap: 2rem;
  `
);

const DaysContentContainer = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    /* cursor: grab; */
    /* border: 0.1rem solid red;
    background: red; */
    /* width: 100%; */
    /* overflow: hidden; */
    overflow-x: scroll;
  `
);

const DaysContentWrapper = styled(motion.div)(
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

    /* width: 100%; */
    /* border: 0.1rem solid red; */
    /* width: 100%; */
    /* overflow-x: auto; */
    /* flex-wrap: wrap; */
    gap: 1.5rem;
    /* background: white; */
    /* cursor: grab;
    overflow: hidden; */
    /* gap: 2rem; */

    overflow-x: auto;
  `
);

export { DaysContainer, DaysNav, DaysContentContainer, DaysContentWrapper };
