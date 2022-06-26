import React, { useState } from "react";
import * as Styled from "./HomeCalendar.styles";
import styled from "styled-components";

//image
import GoogleCalendarImg from "assets/google-calendar.svg";

//components
import Heading from "components/heading/Heading";

//icons
import { FaCalendar } from "icons/icons";

//date-fns
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import pl from "date-fns/locale/pl";

import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays,
  isSameDay,
  isSameMonth,
} from "date-fns";
import Button from "components/form/button/Button";

const HomeCalendar = () => {
  const startDate = addMonths(new Date(), 0);
  const date = startOfMonth(startDate);
  const startWeek = startOfWeek(date, { weekStartsOn: 1 });
  const endMonth = endOfMonth(date);
  const endWeek = endOfWeek(endMonth, { weekStartsOn: 1 });

  const [calendarValues, setCalendarValues] = useState({
    startDay: new Date(),
    endDay: new Date(),
    month: startDate,
    year: startDate,
    daysArray: eachDayOfInterval({
      start: startWeek,
      end: endWeek,
    }),
  });

  const [currentMonth, setCurrentMonth] = useState(0);

  const nextMonth = () => {
    const month = currentMonth + 1;
    handleOwnCalendar(month);
  };

  const prevMonth = () => {
    const month = currentMonth - 1;
    handleOwnCalendar(month);
  };

  const handleOwnCalendar = (month: number) => {
    setCurrentMonth(month);
    const startDate = addMonths(new Date(), month);
    const date = startOfMonth(startDate);
    const startWeek = startOfWeek(date, { weekStartsOn: 1 });
    const endMonth = endOfMonth(date);
    const endWeek = endOfWeek(endMonth, { weekStartsOn: 1 });

    const eachDaysInMonth = eachDayOfInterval({
      start: startWeek,
      end: endWeek,
    });

    setCalendarValues({
      ...calendarValues,
      startDay: startWeek,
      endDay: endWeek,
      month: date,
      year: date,
      daysArray: eachDaysInMonth,
    });
  };

  return (
    <Styled.HomeCalendarWrapper>
      <Styled.HomeCalendarHeadingWrapper>
        <Heading title="Kalendarz" icon={<FaCalendar />} />
        <Button variant="secondary">
          <img src={GoogleCalendarImg} /> połącz z kalendarzem google
        </Button>
        {/* <button>
          <img src={GoogleCalendarImg} /> połącz z kalendarzem google
        </button> */}
      </Styled.HomeCalendarHeadingWrapper>

      <Styled.CalendarNavWrapper>
        <Styled.NavOptionsWrapper>
          <p>ogólne informacje</p>
          <p>jadłospisy</p>
          <p>raporty</p>
        </Styled.NavOptionsWrapper>
        <Styled.NavDisplayDaysOptionsWrapper>
          <p>dzien</p>
          <p>tydzien</p>
          <p>miesiąc</p>
        </Styled.NavDisplayDaysOptionsWrapper>
      </Styled.CalendarNavWrapper>
      <StyledCalendarOptions>
        <div></div>
        <div>
          <button type="button" onClick={prevMonth}>
            -
          </button>
          {calendarValues.month && calendarValues.year ? (
            <h2>
              {format(calendarValues.month, "MMMM", { locale: pl })}{" "}
              {format(calendarValues.year, "yyyy", { locale: pl })}
            </h2>
          ) : (
            <h2>-</h2>
          )}
          <button type="button" onClick={nextMonth}>
            +
          </button>
        </div>
        <div></div>
      </StyledCalendarOptions>
      <StyledGridCalendarInfo>
        <div>
          <p>Pon</p>
        </div>
        <div>
          <p>Wt</p>
        </div>
        <div>
          <p>Śr</p>
        </div>
        <div>
          <p>Czw</p>
        </div>
        <div>
          <p>Pt</p>
        </div>
        <div>
          <p>Sob</p>
        </div>
        <div>
          <p>Niedz</p>
        </div>
      </StyledGridCalendarInfo>
      <StyledGridCalendar>
        {calendarValues.daysArray.map((day, index) => (
          <StyledDivCalendar
            key={index}
            currentDay={isSameDay(day, new Date())}
            currentMonth={!isSameMonth(day, calendarValues.month)}
          >
            {format(day, "dd")}
          </StyledDivCalendar>
        ))}
      </StyledGridCalendar>
    </Styled.HomeCalendarWrapper>
  );
};

const StyledCalendarOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  width: 100%;
  height: 4rem;
  border-radius: 0.5rem;
  /* margin: 0.5rem 0; */
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: calc(100% / 3);
  }
  div :nth-child(2) {
    h2 {
      color: black;
      font-size: 1.3rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    button {
      width: 2rem;
      height: 2rem;
      margin: 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const StyledGridCalendarInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 2.5rem;
  width: 100%;
  margin: 0.5rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background: pink;
    border-radius: 0.5rem;
    margin: 0 0.1rem;
  }
`;

const StyledGridCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 10rem;
  width: 100%;
  min-height: 39rem;
`;

interface ICurrentDay {
  currentDay: boolean;
  currentMonth: boolean;
}

const StyledDivCalendar = styled.div<ICurrentDay>`
  border: 2px solid red;
  background: salmon;
  background: ${({ currentDay }) => currentDay && "blue"};
  color: black;
  color: ${({ currentMonth }) => currentMonth && "white"};
  background: ${({ currentMonth }) => currentMonth && "grey"};
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 400;
`;

export default HomeCalendar;
