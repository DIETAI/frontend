import styled, { css } from "styled-components";

const HomeCalendarWrapper = styled.div(
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
    padding: 4rem;
    width: 100%;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    max-width: ${breakpoints.lg};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;
    min-height: 50rem;

    /* ${up(breakpoints.lg)} {
      flex-direction: row;
      justify-content: space-between;
    } */
  `
);

const HomeCalendarHeadingWrapper = styled.div(
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
    justify-content: space-between;
    width: 100%;
    gap: 2rem;

    /* ${up(breakpoints.lg)} {
      flex-direction: row;
      justify-content: space-between;
    } */
  `
);

const CalendarNavWrapper = styled.div(
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
    justify-content: space-between;
    gap: 2rem;
    width: 100%;

    /* ${up(breakpoints.lg)} {
      flex-direction: row;
      justify-content: space-between;
    } */
  `
);

const NavDisplayDaysOptionsWrapper = styled.div(
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
    justify-content: flex-start;
    gap: 1rem;

    /* ${up(breakpoints.lg)} {
      flex-direction: row;
      justify-content: space-between;
    } */
  `
);

const NavOptionsWrapper = styled.div(
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
    justify-content: flex-start;
    gap: 1rem;
    border: 0.1rem solid red;

    /* ${up(breakpoints.lg)} {
      flex-direction: row;
      justify-content: space-between;
    } */
  `
);

export {
  HomeCalendarWrapper,
  HomeCalendarHeadingWrapper,
  CalendarNavWrapper,
  NavDisplayDaysOptionsWrapper,
  NavOptionsWrapper,
};
