import styled, { css } from "styled-components";

const CalendarWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    flex-direction: column;
    background: ${palette.common.main};
    padding: 4rem;
    border-radius: ${border.rounded.md};
    width: 100%;
    max-width: ${breakpoints.lg};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;

    display: none;

    ${up(breakpoints.lg)} {
      display: flex;
    }
  `
);

const CalendarOptions = styled.div(
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
    margin: 1rem 0;
    width: 100%;
    gap: 1rem;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const ChevronWrapper = styled.button(
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
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${palette.common.text};
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }

    svg {
      width: 40%;
      height: 40%;
    }
  `
);

const GridCalendarInfo = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${border.rounded.sm};
      padding: 1rem 0.5rem;
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }
  `
);

const GridCalendar = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* grid-auto-rows: 5rem; */
    width: 100%;
    gap: 1rem;
  `
);

interface ICurrentDay {
  currentDay: boolean;
  currentMonth: boolean;
  selectedDay: boolean;
}

const CalendarDay = styled.div<ICurrentDay>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { up, breakpoints },
    },
    currentDay,
    currentMonth,
    selectedDay,
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${palette.common.text};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};
    padding: 0.5rem;
    height: 18rem;
    border-radius: ${border.rounded.sm};
    transition: 0.3s ease-out;
    padding: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    gap: 2rem;
    overflow-y: auto;

    :hover {
      background: ${palette.common.contrast};
    }

    ${currentDay &&
    css`
      background: ${palette.common.contrast};
    `}

    ${currentMonth &&
    css`
      /* background: ${palette.common.border}; */
      color: ${palette.common.slate};
      pointer-events: none;
    `}

    ${selectedDay &&
    css`
      background: ${palette.primary.light};
      color: white;
    `}
  `
);

const CalendarDayHeading = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

    color: ${palette.common.text};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${palette.primary.main};
      border-radius: ${border.rounded.sm};
      color: white;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      width: 3rem;
      height: 3rem;
      transition: 0.3s ease-out;

      :hover {
        opacity: 0.7;
      }
    }
  `
);

const CalendarNotesWrapper = styled.ul(
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
    gap: 1rem;
    width: 100%;
  `
);

const CalendarNote = styled.li(
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

    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }

    p {
      color: ${palette.primary.main};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      text-align: center;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  `
);

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

const NavOptionsWrapper = styled.ul(
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
  `
);

interface IActiveOption {
  active: boolean;
}

const NavOption = styled.li<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.5rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    color: ${palette.primary.main};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    background: ${palette.common.contrast};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.7;
    }

    ${active &&
    css`
      color: white;
      background: ${palette.primary.main};
    `}
  `
);

export {
  HomeCalendarWrapper,
  HomeCalendarHeadingWrapper,
  CalendarNavWrapper,
  CalendarNotesWrapper,
  CalendarNote,
  NavDisplayDaysOptionsWrapper,
  NavOptionsWrapper,
  NavOption,
  //
  CalendarWrapper,
  CalendarOptions,
  ChevronWrapper,
  CalendarDay,
  CalendarDayHeading,
  GridCalendar,
  GridCalendarInfo,
};
