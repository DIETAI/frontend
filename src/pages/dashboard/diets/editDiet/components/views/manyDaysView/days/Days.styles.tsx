import styled, { css } from "styled-components";

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

const DaysContentWrapper = styled.div(
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
    flex-wrap: wrap;
    /* gap: 2rem; */
  `
);

export { DaysContainer, DaysNav, DaysContentWrapper };
