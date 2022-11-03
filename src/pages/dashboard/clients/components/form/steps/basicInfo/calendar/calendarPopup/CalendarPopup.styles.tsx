import styled, { css } from "styled-components";

import { ICalendarProps } from "../Calendar.interfaces";

const CalendarContainer = styled.div<Pick<ICalendarProps, "fullWidth">>(
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

const CalendarContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  `
);

const CalendarYearsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    /* display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    flex-wrap: wrap; */
    width: 100%;
    background: ${palette.common.main};
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    padding: 1rem;
  `
);

const CalendarYearItem = styled.div(
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
    padding: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
      p {
        color: ${palette.primary.main};
      }
    }

    p {
      transition: 0.3s ease-out;
      font-size: ${fontSize.s};
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
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

interface IActiveOption {
  active: boolean;
}

const CalendarYearOption = styled.div<IActiveOption>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
        transition: 0.3s ease-out;
        width: 60%;
        height: 60%;
      }
    }

    ${active &&
    css`
      button {
        svg {
          transform: rotate(180deg);
        }
      }
    `}
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
    },
    currentDay,
    currentMonth,
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

    ${currentMonth &&
    css`
      /* background: ${palette.common.border}; */
      color: ${palette.common.slate};
      pointer-events: none;
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
  CalendarContainer,
  CalendarContentWrapper,
  CalendarYearsWrapper,
  CalendarYearItem,
  CalendarOptions,
  CalendarYearOption,
  ChevronWrapper,
  GridCalendarInfo,
  GridCalendar,
  CalendarDay,
};
