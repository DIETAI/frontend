import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./HomeCalendar.styles";

import { useFormContext } from "react-hook-form";

//icons
import { FaCalendar, FaChevronRight, FaChevronLeft } from "icons/icons";

//components
import Heading from "components/heading/Heading";

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

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

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

  const handleChangeDay = (day: Date) => {
    const newDay = new Date(day);
    const newDayFormat = newDay.toJSON();

    console.log(newDayFormat);

    setSelectedDay(day);
  };

  if (!open) return null;

  return (
    <Styled.CalendarWrapper>
      <Styled.HomeCalendarHeadingWrapper>
        <Heading title="Kalendarz" icon={<FaCalendar />} />
        {/* <Button variant="secondary">
          <img src={GoogleCalendarImg} /> połącz z kalendarzem google
        </Button> */}
        {/* <button>
          <img src={GoogleCalendarImg} /> połącz z kalendarzem google
        </button> */}
      </Styled.HomeCalendarHeadingWrapper>
      <Styled.CalendarNavWrapper>
        <Styled.NavOptionsWrapper>
          <Styled.NavOption active={true}>wydarzenia</Styled.NavOption>
          <Styled.NavOption active={false}>jadłospisy</Styled.NavOption>
          <Styled.NavOption active={false}>raporty</Styled.NavOption>
        </Styled.NavOptionsWrapper>
        <Styled.NavDisplayDaysOptionsWrapper>
          <Styled.NavOption active={false}>dzień</Styled.NavOption>
          <Styled.NavOption active={true}>tydzień</Styled.NavOption>
          <Styled.NavOption active={false}>miesiąc</Styled.NavOption>
        </Styled.NavDisplayDaysOptionsWrapper>
      </Styled.CalendarNavWrapper>
      <Styled.CalendarOptions>
        <Styled.ChevronWrapper type="button" onClick={prevMonth}>
          <FaChevronLeft />
        </Styled.ChevronWrapper>
        {calendarValues.month && calendarValues.year ? (
          <h2>
            {format(calendarValues.month, "LLLL", { locale: pl })}{" "}
            {format(calendarValues.year, "yyyy", { locale: pl })}
          </h2>
        ) : (
          <h2>-</h2>
        )}

        <Styled.ChevronWrapper type="button" onClick={nextMonth}>
          <FaChevronRight />
        </Styled.ChevronWrapper>
      </Styled.CalendarOptions>
      <Styled.GridCalendarInfo>
        <li>pon</li>
        <li>wt</li>
        <li>śr</li>
        <li>czw</li>
        <li>pt</li>
        <li>sob</li>
        <li>niedz</li>
      </Styled.GridCalendarInfo>
      <Styled.GridCalendar>
        {calendarValues.daysArray.map((day, index) => (
          <Styled.CalendarDay
            key={index}
            currentDay={isSameDay(day, new Date())}
            currentMonth={!isSameMonth(day, calendarValues.month)}
            selectedDay={isSameDay(day, selectedDay)}
            onClick={() => handleChangeDay(day)}
          >
            {format(day, "dd")}
            <button>generuj dietę</button>
          </Styled.CalendarDay>
        ))}
      </Styled.GridCalendar>
    </Styled.CalendarWrapper>
  );
};

export default Calendar;
