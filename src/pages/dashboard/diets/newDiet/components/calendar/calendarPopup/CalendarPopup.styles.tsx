import styled, { css } from "styled-components";

import { ICalendarProps } from "../Calendar.interfaces";

const CalendarWrapper = styled.div<Pick<ICalendarProps, "fullWidth">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    fullWidth,
  }) => css`
    display: flex;
    flex-direction: column;
    width: 40rem;
    background: ${palette.common.main};
    box-shadow: ${palette.common["box-shadow"]};
    padding: 2rem;
    border-radius: ${border.rounded.md};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    ${fullWidth &&
    css`
      width: 100%;
    `}
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
    justify-content: space-between;
    margin-bottom: 1rem;
    width: 100%;

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const ChevronWrapper = styled.div(
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
    gap: 1rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
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
        width: 60%;
        height: 60%;
      }
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
      font-variant: small-caps;
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
  `
);

interface ICurrentDay {
  currentDay?: boolean;
  notCurrentMonth: boolean;
  selectedDay?: boolean;
  selectedDayStart?: boolean;
  selectedDayEnd?: boolean;
  beforeDay: boolean;
  dayBetween?: boolean;
}

const CalendarDay = styled.div<ICurrentDay>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    currentDay,
    notCurrentMonth,
    selectedDayStart,
    selectedDayEnd,
    beforeDay,
    dayBetween,
    selectedDay,
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${palette.common.text};
    font-size: ${fontSize.xs};
    font-weight: ${fontWeight.medium};
    padding: 0.5rem;
    height: 4rem;
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }

    ${currentDay &&
    css`
      background: ${palette.common.contrast};
    `}

    ${(notCurrentMonth || beforeDay) &&
    css`
      /* background: ${palette.common.border}; */
      color: ${palette.common.slate};
      pointer-events: none;
    `}

    ${dayBetween &&
    css`
      background: ${palette.primary.light};
    `}
    
    ${selectedDay &&
    css`
      background: ${palette.primary.main};
      color: white;
      :hover {
        background: ${palette.primary.main};
      }
    `}
  `
);

export {
  CalendarWrapper,
  CalendarOptions,
  ChevronWrapper,
  GridCalendarInfo,
  GridCalendar,
  CalendarDay,
};
